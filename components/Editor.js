import { useEditor, EditorContent } from '@tiptap/react'
import ListItem from '@tiptap/extension-ordered-list';
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div>
      <ul>
        <li>
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            Bold
          </button>
        </li>
        <li>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            H1
          </button>
        </li>
      </ul>

      <EditorContent editor={editor} />
    </div>
  )
}