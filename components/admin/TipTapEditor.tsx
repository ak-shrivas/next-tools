import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import History from '@tiptap/extension-history';

interface TipTapEditorProps {
  initialTitle: string;
  initialSlug: string;
  initialContent: string;
  onSave: (payload: { title: string; slug: string; content: string }) => Promise<void>;
  saving: boolean;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  initialTitle,
  initialSlug,
  initialContent,
  onSave,
  saving,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: {},
        orderedList: {},
        blockquote: {},
      }),
      History.configure({
        depth: 100, // optional, sets max undo steps
        newGroupDelay: 500 // optional, delay before grouping undo
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialContent || "<p>Start writing your blog...</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && initialContent && editor.getHTML() !== initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  if (!editor) return null;

  const toolbarButton = (label: string, onClick: () => void, isActive?: boolean) => (
    <button
      onClick={onClick}
      type="button"
      className={`px-2 py-1 border rounded text-sm ${
        isActive ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Title input */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />

      {/* Slug input */}
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug"
        className="w-full border p-2 rounded"
      />

      {/* Toolbar */}
      <div className="border border-gray-300 rounded-md">
        <div className="flex flex-wrap gap-2 p-2 border-b border-gray-300 bg-gray-50">
          {toolbarButton("↩", () => editor.chain().focus().undo().run())}
          {toolbarButton("↪", () => editor.chain().focus().redo().run())}
          {toolbarButton("B", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
          {toolbarButton("I", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}
          {toolbarButton("U", () => editor.chain().focus().toggleUnderline().run(), editor.isActive("underline"))}
          {toolbarButton("S", () => editor.chain().focus().toggleStrike().run(), editor.isActive("strike"))}
          {toolbarButton("P", () => editor.chain().focus().setParagraph().run(), editor.isActive("paragraph"))}
          {toolbarButton("H1", () => editor.chain().focus().toggleHeading({ level: 1 }).run(), editor.isActive("heading", { level: 1 }))}
          {toolbarButton("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }))}
          {toolbarButton("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }))}
          {toolbarButton("• List", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
          {toolbarButton("1. List", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"))}
          {toolbarButton("❝", () => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote"))}
          {toolbarButton("</>", () => editor.chain().focus().toggleCodeBlock().run(), editor.isActive("codeBlock"))}
          {toolbarButton("—", () => editor.chain().focus().setHorizontalRule().run())}
          {toolbarButton("Clear", () => editor.chain().focus().unsetAllMarks().clearNodes().run())}
        </div>

        {/* Editor */}
        <div className="tiptap-editor border rounded p-2">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={() => onSave({ title, slug, content })}
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default TipTapEditor;
