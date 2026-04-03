import React from 'react';
import type { Editor } from '@tiptap/react';
import type { ToolbarButtonConfig } from '../../constants/toolbarConfig';

interface ToolbarButtonProps {
    editor: Editor;
    config: ToolbarButtonConfig;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ editor, config }) => {
    const isActive = config.isActive(editor);
    const isDisabled = config.disabled ? config.disabled(editor) : false;

    return (
        <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => config.action(editor)}
            disabled={isDisabled}
            className={`cte-toolbar-btn ${isActive ? 'is-active' : ''}`}
            title={config.name.charAt(0).toUpperCase() + config.name.slice(1)}
        >
            {config.icon}
        </button>
    );
};
