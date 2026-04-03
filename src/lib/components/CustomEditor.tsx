import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import FontFamily from '@tiptap/extension-font-family';
import CharacterCount from '@tiptap/extension-character-count';
import { Toolbar } from './Toolbar';
import type { EditorConfig } from '../types';
import { useEditorTheme } from '../hooks/useEditorTheme';
import '../styles/editor.css';

const DEFAULT_FEATURES = [
  'bold', 'italic', 'underline', 'strike',
  'heading1', 'heading2', 'heading3',
  'bulletList', 'orderedList', 'blockquote',
  'code', 'codeBlock', 'link', 'color', 'highlight',
  'horizontalRule', 'undo', 'redo'
];

export const CustomEditor = React.forwardRef<HTMLDivElement, { config?: EditorConfig }>(({ config }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = React.useState(config?.initialContent?.length || 0);

  // Combine refs
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  // Inject CSS automatically for "plug and play" experience
  React.useLayoutEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('cte-styles')) {
      const style = document.createElement('style');
      style.id = 'cte-styles';
      style.textContent = `
:root {
  --cte-primary: #3b82f6;
  --cte-primary-foreground: #ffffff;
  --cte-background: #ffffff;
  --cte-foreground: #0f172a;
  --cte-muted: #f1f5f9;
  --cte-muted-foreground: #64748b;
  --cte-border: #e2e8f0;
  --cte-accent: #f8fafc;
  --cte-accent-foreground: #0f172a;
  --cte-radius: 0.75rem;
  --cte-font-family: 'Inter', system-ui, sans-serif;
}
.cte-editor-container {
  display: flex;
  flex-direction: column;
  background-color: var(--cte-background);
  color: var(--cte-foreground);
  border: 1px solid var(--cte-border);
  border-radius: var(--cte-radius);
  font-family: var(--cte-font-family);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}
.cte-toolbar {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid var(--cte-border);
  background-color: var(--cte-background);
  gap: 0.25rem;
  overflow-x: auto;
}
.cte-toolbar-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-right: 0.5rem;
  border-right: 1px solid var(--cte-border);
}
.cte-toolbar-group:last-child { border-right: none; }
.cte-toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  color: var(--cte-foreground);
  cursor: pointer;
  transition: all 0.2s;
}
.cte-toolbar-btn:hover { background-color: var(--cte-accent); }
.cte-toolbar-btn.is-active {
  background-color: var(--cte-primary);
  color: var(--cte-primary-foreground);
}
.cte-content-area {
  padding: 1rem;
  min-height: 150px;
  outline: none;
}
.ProseMirror { outline: none; }
.cte-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  border-top: 1px solid var(--cte-border);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--cte-muted-foreground);
  background-color: #f8fafc;
  border-bottom-left-radius: var(--cte-radius);
  border-bottom-right-radius: var(--cte-radius);
  z-index: 10;
}
            `;
      document.head.appendChild(style);
    }
  }, []);

  useEditorTheme(containerRef as React.RefObject<HTMLDivElement>, config);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      FontFamily,
      Placeholder.configure({
        placeholder: config?.placeholder || 'Write here...',
      }),
      CharacterCount.configure({
        limit: config?.maxLength,
      }),
    ],
    content: config?.initialContent || '',
    onUpdate: ({ editor }) => {
      const content = config?.outputFormat == 'text' ? editor.getText() : editor.getHTML();
      config?.onChange?.(content);
      // Synchronize character count
      const count = content.length;
      setCharCount(count);
      config?.onCharacterCountChange?.(count);
    },
  });

  const isBottomBar = config?.layout === 'bottom-bar';
  const activeFeatures = config?.features || DEFAULT_FEATURES;

  const getAlignmentStyles = (): React.CSSProperties => {
    if (!config?.align) return {};
    switch (config.align) {
      case 'left': return { marginLeft: '0', marginRight: 'auto' };
      case 'center': return { marginLeft: 'auto', marginRight: 'auto' };
      case 'right': return { marginLeft: 'auto', marginRight: '0' };
      default: return {};
    }
  };

  const containerStyle: React.CSSProperties = {
    width: typeof config?.width === 'number' ? `${config.width}px` : config?.width || '100%',
    margin: config?.margin || '0 auto',
    ...getAlignmentStyles(),
  };

  return (
    <div
      {...config?.containerProps}
      className={`cte-editor-container ${config?.containerProps?.className || ''}`}
      ref={containerRef}
      style={{ ...containerStyle, ...config?.containerProps?.style }}
    >
      {config?.showTitle && config.title && (
        <div className="cte-title-bar">{config.title}</div>
      )}
      {!isBottomBar && <Toolbar editor={editor} features={activeFeatures} />}
      <EditorContent editor={editor} className="cte-content-area" />
      {isBottomBar && <Toolbar editor={editor} features={activeFeatures} className="cte-bottom" />}

      {config?.maxLength && (
        <div className="cte-footer">
          {charCount} / {config.maxLength} characters
        </div>
      )}
    </div>
  );
});
