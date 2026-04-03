import React from 'react';
import type { EditorConfig } from '../types';

export const useEditorTheme = (
    containerRef: React.RefObject<HTMLDivElement>,
    config?: EditorConfig
) => {
    React.useEffect(() => {
        if (!containerRef.current || !config?.theme) return;

        const { theme } = config;
        const root = containerRef.current;

        const mapping: Record<string, string | undefined> = {
            '--cte-primary': theme.primaryColor,
            '--cte-primary-foreground': theme.primaryForegroundColor,
            '--cte-background': theme.backgroundColor,
            '--cte-text': theme.textColor,
            '--cte-accent': theme.accentColor,
            '--cte-toolbar-btn-bg': theme.toolbarButtonBackgroundColor,
            '--cte-border': theme.borderColor,
            '--cte-radius': theme.borderRadius
        };

        Object.entries(mapping).forEach(([key, value]) => {
            if (value) root.style.setProperty(key, value);
        });
    }, [config, containerRef]);
};
