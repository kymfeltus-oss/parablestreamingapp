import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const supabase = createClient();
  const { streamId } = await req.json();

  if (!streamId)
    return NextResponse.json({ error: "Missing streamId" }, { status: 400 });

  const { data, error } = await supabase
    .from("chat")
    .select("message, user_id, created_at")
    .eq("stream_id", streamId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, messages: data });
}
