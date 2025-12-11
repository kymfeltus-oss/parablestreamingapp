import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const supabase = createClient();
  const { sessionId } = await req.json();

  const end = new Date().toISOString();

  const { data: session } = await supabase
    .from("viewer_sessions")
    .select("started_at")
    .eq("id", sessionId)
    .maybeSingle();

  const started = new Date(session?.started_at || end).getTime();
  const ended = new Date(end).getTime();
  const duration = Math.floor((ended - started) / 1000);

  const { error } = await supabase
    .from("viewer_sessions")
    .update({
      ended_at: end,
      duration_seconds: duration,
    })
    .eq("id", sessionId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
