import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const supabase = createClient();
  const { category } = await req.json();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, creator_category")
    .eq("creator_category", category)
    .limit(10);

  return NextResponse.json({ ok: true, creators: data || [] });
}
