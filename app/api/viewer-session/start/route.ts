import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const supabase = createClient();
  const { streamId } = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const viewerId = user?.id || null;

  const { data, error } = await supabase
    .from("viewer_sessions")
    .insert({
      stream_id: streamId,
      viewer_id: viewerId,
    })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, sessionId: data.id });
}
