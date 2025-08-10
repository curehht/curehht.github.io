'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

// Dynamically import TinyMCE to avoid SSR issues
const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse rounded border border-gray-300 flex items-center justify-center">
        <span className="text-gray-500">Loading editor...</span>
      </div>
    ),
  }
)

interface TinyMCEEditorProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  label: string
  rows?: number
}

export const TinyMCEEditor = ({
  id,
  name,
  value,
  onChange,
  label,
  rows = 10,
}: TinyMCEEditorProps) => {
  const editorRef = useRef<any>(null)

  const handleEditorChange = (content: string) => {
    onChange(content)
  }

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <Editor
        id={id}
        value={value}
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'your-api-key-here'}
        init={{
          height: Math.max(300, rows * 20),
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | link image | table | code | help',
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              font-size: 14px; 
              line-height: 1.6;
              color: #333;
            }
            h1, h2, h3, h4, h5, h6 { 
              margin-top: 1em; 
              margin-bottom: 0.5em; 
              font-weight: 600; 
            }
            p { margin-bottom: 1em; }
            ul, ol { margin-bottom: 1em; padding-left: 2em; }
            img { max-width: 100%; height: auto; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          `,
          language: 'ru', // Russian language support
          branding: false,
          elementpath: false,
          resize: true,
          paste_data_images: true, // Allow pasting images
          images_upload_handler: (blobInfo, progress) => {
            // Handle image uploads here if needed
            return new Promise((resolve) => {
              // For now, just return a placeholder
              resolve(
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAffFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
              )
            })
          },
        }}
      />
    </div>
  )
}
