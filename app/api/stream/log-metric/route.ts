import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const supabase = createClient();
  const { streamId, viewerCount } = await req.json();

  const { error } = await supabase.from("stream_metrics").insert({
    stream_id: streamId,
    viewer_count: viewerCount,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
