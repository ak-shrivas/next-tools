// app/blog/[slug]/page.tsx
import { supabase } from "@/lib/supabase";
import type { BlogRow } from "@/types/blogs";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default async function BlogPage({ params }: Props) {
  const slug = params.slug;
  const { data: blog, error } = await supabase.from("blogs").select("*").eq("slug", slug).single();

  if (error || !blog) return notFound();

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-6">{new Date(blog.created_at).toLocaleDateString()}</div>
      <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
  );
}
