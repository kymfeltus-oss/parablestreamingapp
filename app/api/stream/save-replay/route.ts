import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { streamId, replayUrl } = await req.json();

    if (!streamId || !replayUrl) {
      return NextResponse.json(
        { error: "streamId and replayUrl are required" },
        { status: 400 }
      );
    }

    // Update stream with replay URL and mark as ended
    const { error } = await supabase
      .from("live_streams")
      .update({
        replay_url: replayUrl,
        is_live: false,
        ended_at: new Date().toISOString(),
      })
      .eq("id", streamId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to save replay" },
      { status: 500 }
    );
  }
}
