import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const supabase = createClient();
  const { streamId, replayUrl } = await req.json();

  if (!streamId || !replayUrl) {
    return NextResponse.json(
      { ok: false, error: "Missing streamId or replayUrl" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("live_streams")
    .update({
      replay_url: replayUrl,
      is_live: false,
      ended_at: new Date().toISOString(),
    })
    .eq("id", streamId);

  if (error)
    return NextResponse.json({ ok: false, error: error.message });

  return NextResponse.json({ ok: true });
}
