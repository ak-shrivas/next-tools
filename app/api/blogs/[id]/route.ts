// app/api/blogs/[id]/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const { title, slug, content } = await req.json();
  
    const { data, error } = await supabase
      .from("blogs")
      .update({ title, slug, content })
      .eq("id", params.id)
      .select()
      .single();
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  
    return NextResponse.json(data);
  }
  
