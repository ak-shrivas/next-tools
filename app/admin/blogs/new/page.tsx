// app/admin/blogs/new/page.tsx
"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TipTapEditor = dynamic(() => import("@/components/admin/TipTapEditor"), { ssr: false });

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      alert("Title and slug required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), slug: slug.trim(), content }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Save failed");
      }

      alert("Blog published!");
      router.push("/admin/blogs");
    } catch (err: any) {
      console.error(err);
      alert("Failed to save blog: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create New Blog</h1>

      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
        }}
        placeholder="Title"
        className="w-full border rounded px-3 py-2"
      />

      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug"
        className="w-full border rounded px-3 py-2"
      />

      <TipTapEditor content={content} onChange={setContent} />

      <div>
        <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">
          {saving ? "Saving..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
