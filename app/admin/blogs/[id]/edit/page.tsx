"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TipTapEditor from "@/components/admin/TipTapEditor";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Load existing blog
  useEffect(() => {
    if (!id) return;

    fetch(`/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
      })
      .catch((err) => {
        console.error(err);
        router.push("/"); // redirect if not found
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleUpdate = async () => {
    const res = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title,slug, content }),
    });

    if (res.ok) {
      router.push(`/admin/blogs`);
    } else {
      alert("Failed to update blog");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Blog Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <TipTapEditor content={content} onChange={setContent} />
      <button
        onClick={handleUpdate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Update Blog
      </button>
    </div>
  );
}
