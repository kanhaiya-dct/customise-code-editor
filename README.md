<div align="center">

  # 💎 Customise-Text-Editor

  [![NPM Version](https://img.shields.io/npm/v/customise-text-editor?style=for-the-badge&logo=npm&color=2e2e2e&logoColor=CB3837)](https://www.npmjs.com/package/customise-text-editor)
  [![License: MIT](https://img.shields.io/badge/License-MIT-2e2e2e?style=for-the-badge&logo=github&color=2e2e2e)](https://opensource.org/licenses/MIT)
  [![Bundle Size](https://img.shields.io/bundlephobia/min/customise-text-editor?style=for-the-badge&color=2e2e2e)](https://bundlephobia.com/package/customise-text-editor)

  **A highly customizable, production-ready Rich Text Editor for React, built on the solid foundation of Tiptap.**

  ---
</div>

## ✨ Features at a Glance

| Feature | Description |
| :--- | :--- |
| 🎨 **Premium UI** | Modern, sleek design with smooth transitions and glassmorphism support. |
| 🔢 **Real-time Stats** | Automatic footer with character counting when `maxLength` is enabled. |
| 📝 **Dual Output** | Seamlessly switch between `HTML` and clean `Plain Text` exports. |
| 🔗 **Hooks-First** | First-class support for `react-hook-form` via standard `Controller` APIs. |
| 💅 **Total Control** | Custom width, alignment, margins, and branding-specific themes. |
| ⚡ **Ultra-Light** | Meticulously optimized bundle (only **~11KB**) with zero bloated dependencies. |

---

## 📦 Installation

Get started in seconds:

```bash
npm install customise-text-editor
```

> [!IMPORTANT]
> Since this is a library, ensure you import the CSS in your main entry file (e.g., `App.tsx` or `main.tsx`) to enable the premium aesthetics.

```tsx
import 'customise-text-editor/style.css';
```

---

## 🚀 Quick Start

Creating a powerful editor has never been easier:

```tsx
import { CustomEditor } from 'customise-text-editor';
import 'customise-text-editor/style.css';

function App() {
  const handleSave = (content) => {
    console.log('Editor Content:', content);
  };

  return (
    <div className="container">
      <CustomEditor 
        config={{
          width: '800px',
          align: 'center',
          placeholder: 'Start writing your story...',
          maxLength: 1000, 
          outputFormat: 'html',
          onChange: handleSave,
          theme: {
            primaryColor: '#6366f1',
            borderRadius: '12px'
          }
        }} 
      />
    </div>
  );
}
```

---

## 🏗️ Advanced Integration: React Hook Form

We built this editor with form libraries in mind. It integrates perfectly with `Controller` and validation rules.

```tsx
import { useForm, Controller } from 'react-hook-form';
import { CustomEditor } from 'customise-text-editor';

const BlogEditor = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { postContent: '' }
  });

  const onSubmit = (data) => console.log('Payload:', data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="postContent"
        control={control}
        rules={{ 
          required: 'Please write something before publishing',
          minLength: { value: 50, message: 'Your post is too short (min 50 chars)' }
        }}
        render={({ field }) => (
          <CustomEditor
            config={{
              initialContent: field.value,
              onChange: (val) => field.onChange(val),
              maxLength: 5000,
              placeholder: 'Write your masterpiece...'
            }}
          />
        )}
      />
      {errors.postContent && <p className="error">{errors.postContent.message}</p>}
      <button type="submit">Publish Masterpiece</button>
    </form>
  );
};
```

---

## 📑 Detailed API Configuration

### `EditorConfig` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `string \| number` | `'100%'` | Width of the editor (e.g., `'800px'`, `'100%'`). |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Alignment of the editor container. |
| `outputFormat` | `'html' \| 'text'` | `'html'` | Content format sent to the `onChange` callback. |
| `maxLength` | `number` | - | Character limit. Enables the live-counter footer auto-magically. |
| `placeholder` | `string` | `'Write here...'` | Placeholder text when the editor is empty. |
| `theme` | `ThemeConfig` | - | Custom theme object for colors and styling (see below). |
| `features` | `string[]` | All | Array of enabled toolbar features (bold, italic, etc.). |

### `ThemeConfig` Options

```typescript
{
  primaryColor: string;    // Accent color for icons & progress
  borderRadius: string;   // Control the "roundness" (e.g., '16px')
  backgroundColor: string; // Background of the editor area
  textColor: string;       // Color of the content text
}
```

---

## 🛠️ Troubleshooting: Vite Configuration

If you encounter issues like **"Outdated Optimize Dep"** or React version mismatches while using this package, you must add the following aliases to your **consumer project's** `vite.config.ts`. This ensures that both your project and the editor use the same instance of React.

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
});
```

---

## 📄 License
Proudly open-source under the **MIT License**. Created by [kanhaiya-dct](https://github.com/kanhaiya-dct).

---

<div align="center">
  <h3>Show your support! ⭐</h3>
  <p>If you find this editor useful, please consider giving it a star on GitHub!</p>
</div>