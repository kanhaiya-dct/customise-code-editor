import React from 'react';

export interface ThemeConfig {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    primaryForegroundColor?: string;
    toolbarButtonBackgroundColor?: string;
    borderColor?: string;
    fontFamily?: string;
    borderRadius?: string;
}

export interface EditorConfig {
    theme?: ThemeConfig;
    layout?: 'top-bar' | 'bottom-bar';
    width?: string | number;
    align?: 'left' | 'center' | 'right';
    margin?: string;
    placeholder?: string;
    title?: string;
    showTitle?: boolean;
    maxLength?: number;
    initialContent?: string;
    outputFormat?: 'html' | 'text';
    onChange?: (content: string) => void;
    onCharacterCountChange?: (count: number) => void;
    features?: string[];
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}
