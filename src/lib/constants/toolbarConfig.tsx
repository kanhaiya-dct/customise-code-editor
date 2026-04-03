import React from 'react';
import { Editor } from '@tiptap/react';
import {
    Bold, Italic, Underline, Strikethrough, List, ListOrdered,
    Quote, Heading1, Heading2, Heading3, Palette, Link as LinkIcon,
    Minus, Highlighter, Code, Terminal, Undo, Redo
} from 'lucide-react';

export interface ToolbarButtonConfig {
    name: string;
    icon: React.ReactNode;
    action: (editor: Editor) => void;
    isActive: (editor: Editor) => boolean;
    disabled?: (editor: Editor) => boolean;
}

export const getToolbarButtons = (editor: Editor): ToolbarButtonConfig[] => [
    {
        name: 'bold',
        icon: <Bold size={18} />,
        action: (e) => e.chain().focus().toggleBold().run(),
        isActive: (e) => e.isActive('bold')
    },
    {
        name: 'italic',
        icon: <Italic size={18} />,
        action: (e) => e.chain().focus().toggleItalic().run(),
        isActive: (e) => e.isActive('italic')
    },
    {
        name: 'underline',
        icon: <Underline size={18} />,
        action: (e) => e.chain().focus().toggleUnderline().run(),
        isActive: (e) => e.isActive('underline')
    },
    {
        name: 'strike',
        icon: <Strikethrough size={18} />,
        action: (e) => e.chain().focus().toggleStrike().run(),
        isActive: (e) => e.isActive('strike')
    },
    {
        name: 'heading1',
        icon: <Heading1 size={18} />,
        action: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: (e) => e.isActive('heading', { level: 1 })
    },
    {
        name: 'heading2',
        icon: <Heading2 size={18} />,
        action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: (e) => e.isActive('heading', { level: 2 })
    },
    {
        name: 'heading3',
        icon: <Heading3 size={18} />,
        action: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: (e) => e.isActive('heading', { level: 3 })
    },
    {
        name: 'bulletList',
        icon: <List size={18} />,
        action: (e) => e.chain().focus().toggleBulletList().run(),
        isActive: (e) => e.isActive('bulletList')
    },
    {
        name: 'orderedList',
        icon: <ListOrdered size={18} />,
        action: (e) => e.chain().focus().toggleOrderedList().run(),
        isActive: (e) => e.isActive('orderedList')
    },
    {
        name: 'blockquote',
        icon: <Quote size={18} />,
        action: (e) => e.chain().focus().toggleBlockquote().run(),
        isActive: (e) => e.isActive('blockquote')
    },
    {
        name: 'code',
        icon: <Code size={18} />,
        action: (e) => e.chain().focus().toggleCode().run(),
        isActive: (e) => e.isActive('code')
    },
    {
        name: 'codeBlock',
        icon: <Terminal size={18} />,
        action: (e) => e.chain().focus().toggleCodeBlock().run(),
        isActive: (e) => e.isActive('codeBlock')
    },
    {
        name: 'color',
        icon: (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Palette size={18} />
                <input
                    type="color"
                    onInput={(event) => {
                        const color = (event.target as HTMLInputElement).value;
                        editor.chain().focus().setColor(color).run();
                    }}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                />
            </div>
        ),
        action: () => { },
        isActive: (e) => e.isActive('textStyle')
    },
    {
        name: 'highlight',
        icon: (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Highlighter size={18} />
                <input
                    type="color"
                    onInput={(event) => {
                        const color = (event.target as HTMLInputElement).value;
                        editor.chain().focus().toggleHighlight({ color }).run();
                    }}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                />
            </div>
        ),
        action: () => { },
        isActive: (e) => e.isActive('highlight')
    },
    {
        name: 'link',
        icon: <LinkIcon size={18} />,
        action: (e) => {
            if (e.isActive('link')) {
                e.chain().focus().unsetLink().run();
                return;
            }
            let url = window.prompt('Enter URL');
            if (url) {
                if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('mailto:')) {
                    url = 'https://' + url;
                }
                e.chain().focus().setLink({ href: url }).run();
            }
        },
        isActive: (e) => e.isActive('link')
    },
    {
        name: 'horizontalRule',
        icon: <Minus size={18} />,
        action: (e) => e.chain().focus().setHorizontalRule().run(),
        isActive: () => false
    },
    {
        name: 'undo',
        icon: <Undo size={18} />,
        action: (e) => e.chain().focus().undo().run(),
        isActive: () => false,
        disabled: (e) => !e.can().undo()
    },
    {
        name: 'redo',
        icon: <Redo size={18} />,
        action: (e) => e.chain().focus().redo().run(),
        isActive: () => false,
        disabled: (e) => !e.can().redo()
    }
];
