import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/lib'],
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'CustomiseTextEditor',
      fileName: (format) => `customise-text-editor.${format}.js`,
    },
    rollupOptions: {
      external: (id) => {
        const dependencies = [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react/jsx-dev-runtime',
          '@tiptap/react',
          '@tiptap/starter-kit',
          '@tiptap/extension-underline',
          '@tiptap/extension-link',
          '@tiptap/extension-highlight',
          '@tiptap/extension-text-style',
          '@tiptap/extension-color',
          '@tiptap/extension-character-count',
          '@tiptap/extension-placeholder',
          '@tiptap/extension-font-family',
          '@tiptap/pm',
          'lucide-react',
          'clsx',
          'tailwind-merge',
          'react-hook-form'
        ];
        return dependencies.some((dep) => id === dep || id.startsWith(`${dep}/`));
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tiptap/react': 'TiptapReact',
          '@tiptap/starter-kit': 'TiptapStarterKit',
          'lucide-react': 'LucideReact',
        },
      },
    },
    copyPublicDir: false
  },
});
