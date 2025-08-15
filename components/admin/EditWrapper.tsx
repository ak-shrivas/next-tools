// components/admin/EditWrapper.tsx
"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React from "react";
import TipTapEditor from "./TipTapEditor"; 

export default function EditWrapper({ id, initialTitle, initialSlug, initialContent }: any) {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);

  const handleSave = async (payload: { title: string; slug: string; content: string }) => {
    setSaving(true);
    const { error } = await supabase.from("blogs").update({
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
    //   updated_at: new Date().toISOString(),
    }).eq("id", id);
    setSaving(false);
    if (error) alert("Update failed: " + error.message);
    else router.push("/admin/blogs");
  };

  return <TipTapEditor initialTitle={initialTitle} initialSlug={initialSlug} initialContent={initialContent} onSave={handleSave} saving={saving} />;
}
