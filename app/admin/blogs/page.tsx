// app/admin/blogs/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type BlogRow = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
};

export default function AdminBlogList() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBlogs(data || []);
    } catch (err) {
      console.error(err);
      alert("Could not load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setBlogs((b) => b.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link href="/admin/blogs/new" className="bg-green-600 text-white px-3 py-1 rounded">
          + New Blog
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul className="space-y-3">
          {blogs.map((b) => (
            <li key={b.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <Link href={`/blog/${b.slug}`} className="text-blue-600 font-semibold">
                  {b.title}
                </Link>
                <div className="text-sm text-gray-500">{new Date(b.created_at).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/blogs/${b.id}/edit`} className="text-sm px-2 py-1 border rounded">
                  Edit
                </Link>
                <button onClick={() => handleDelete(b.id)} className="text-sm px-2 py-1 border rounded text-red-600">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
