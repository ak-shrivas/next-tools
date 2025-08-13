import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        history: true,
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: true,
        orderedList: true,
        blockquote: true,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "<p>Start writing your blog...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const toolbarButton = (label: string, onClick: () => void, isActive?: boolean) => (
    <button
      onClick={onClick}
      className={`px-2 py-1 border rounded text-sm ${
        isActive ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-md">
      {/* Toolbar */}
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
  );
};

export default TipTapEditor;
