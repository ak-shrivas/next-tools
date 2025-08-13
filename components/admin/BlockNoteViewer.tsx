"use client";

import React from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

function safeParse(content: string) {
  try {
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export default function BlockNoteViewer({ content }: { content: string }) {
  const editor = useCreateBlockNote({
    initialContent: safeParse(content),
    editable: false,
  });

  return <BlockNoteView editor={editor} />;
}
