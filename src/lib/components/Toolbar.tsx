import React from 'react';
import { Editor } from '@tiptap/react';
import { getToolbarButtons } from '../constants/toolbarConfig';
import { ToolbarButton } from './Toolbar/ToolbarButton';

interface ToolbarProps {
    editor: Editor | null;
    features?: string[];
    className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
    editor,
    features = ['bold', 'italic', 'underline', 'undo', 'redo'],
    className = ''
}) => {
    // Force re-render on selection/transaction updates
    const [, setTick] = React.useState(0);

    React.useEffect(() => {
        if (!editor) return;
        const handler = () => setTick(t => t + 1);
        editor.on('transaction', handler);
        return () => { editor.off('transaction', handler); };
    }, [editor]);

    if (!editor) return null;

    const allButtons = getToolbarButtons(editor);

    const groups = [
        { name: 'formatting', features: ['bold', 'italic', 'underline', 'strike', 'color', 'highlight'] },
        { name: 'blocks', features: ['heading1', 'heading2', 'heading3', 'bulletList', 'orderedList', 'blockquote', 'code', 'codeBlock'] },
        { name: 'actions', features: ['link', 'horizontalRule'] },
        { name: 'history', features: ['undo', 'redo'] }
    ];

    return (
        <div className={`cte-toolbar ${className}`}>
            {groups.map(group => {
                const groupButtons = allButtons.filter(btn =>
                    group.features.includes(btn.name) && features.includes(btn.name)
                );
                if (groupButtons.length === 0) return null;
                return (
                    <div key={group.name} className="cte-toolbar-group">
                        {groupButtons.map(btn => (
                            <ToolbarButton key={btn.name} editor={editor} config={btn} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};
