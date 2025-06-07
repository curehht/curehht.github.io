import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import * as icons from 'react-bootstrap-icons'

import classes from './TiptapEditor.module.css'

export const TiptapEditor = ({
  content,
  onChange,
}: {
  content: string
  onChange: (html: string) => void
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: classes.editor,
      },
    },
  })

  return (
    <div className={classes.component}>
      <section className={classes.toolbar}>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <icons.TypeH1 />
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <icons.TypeH2 />
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <icons.TypeH3 />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <icons.ListUl />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <icons.ListOl />
        </button>
        <button onClick={() => editor?.chain().focus().toggleBold().run()}>
          <icons.TypeBold />
        </button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <icons.TypeItalic />
        </button>
      </section>
      <EditorContent editor={editor} />
    </div>
  )
}
