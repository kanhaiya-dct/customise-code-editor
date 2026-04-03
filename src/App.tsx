import { useForm, Controller } from 'react-hook-form';
import { CustomEditor } from './lib';
import { useRef } from 'react';

interface FormData {
  postTitle: string;
  editorContent: string;
}

function App() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      postTitle: '',
      editorContent: '<p>Initial content for <strong>demo</strong>!</p>'
    }
  });

  const editorRef = useRef<HTMLDivElement>(null);

  const onSubmit = (data: FormData) => {
    console.log('Form Submitted Data:', data);
    alert('Form submitted successfully! \n\nCheck the browser console for the JSON data.');
  };

  return (
    <div style={{
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "'Inter', system-ui, sans-serif",
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      color: '#1e293b'
    }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          Form Integration Demo
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Testing <strong>react-hook-form</strong> with <strong>Customise-Text-Editor</strong>
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        border: '1px solid #e2e8f0'
      }}>
        {/* Title Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: '600', fontSize: '0.9rem', color: '#475569' }}>BLOG POST TITLE</label>
          <input
            placeholder="Enter a catchy title..."
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: `1px solid ${errors.postTitle ? '#ef4444' : '#e2e8f0'}`,
              outline: 'none',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
            {...control.register('postTitle', { required: 'Title is required' })}
          />
          {errors.postTitle && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>{errors.postTitle.message}</span>}
        </div>

        {/* Rich Text Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: '600', fontSize: '0.9rem', color: '#475569' }}>CONTENT AREA</label>
          <Controller
            name="editorContent"
            control={control}
            rules={{
              required: 'Content cannot be empty',
              minLength: { value: 20, message: 'Please write at least 20 characters' }
            }}
            render={({ field }) => (
              <CustomEditor
                ref={editorRef}
                config={{
                  width: '100%',
                  align: 'left',
                  maxLength: 1000,
                  placeholder: 'Start writing your amazing story...',
                  initialContent: field.value,
                  outputFormat: 'text',
                  onChange: (val) => field.onChange(val),
                  theme: {
                    primaryColor: '#6366f1',
                    borderRadius: '12px'
                  }
                }}
              />
            )}
          />
          {errors.editorContent && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>{errors.editorContent.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: '#6366f1',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            transition: 'all 0.2s',
            boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
        </button>
      </form>

      <section style={{ marginTop: '40px', padding: '24px', backgroundColor: '#f1f5f9', borderRadius: '12px', border: '1px dotted #cbd5e1' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#334155' }}>💡 Developer Note</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.6' }}>
          <li>The Editor is integrated via <strong>React Hook Form Controller</strong>.</li>
          <li><strong>maxLength</strong> is enforced by Tiptap, and the footer shows live updates.</li>
          <li><strong>Alignment</strong> and <strong>Width</strong> are handled via stable inline styles to prevent flashes.</li>
          <li>Validation errors (like "Required") will appear below the editor automatically.</li>
        </ul>
      </section>
    </div>
  )
}

export default App
