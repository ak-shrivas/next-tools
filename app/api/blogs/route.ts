// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * GET /api/blogs
 * - returns list of blogs (id, title, slug, created_at)
 *
 * POST /api/blogs
 * - body: { title, slug, content }
 *
 * DELETE /api/blogs?id=...  (query param)
 */

export async function GET() {
  const { data, error } = await supabase
    .from("blogs")
    .select("id, title, slug, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, content } = body ?? {};

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("blogs")
      .insert([{ title, slug, content }])
      .select()
      .single();

    if (error) {
      console.error("POST /api/blogs error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/blogs uncaught:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/blogs uncaught:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
