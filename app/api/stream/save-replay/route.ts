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

    const { error } = await supabase
      .from("live_streams")
      .update({
        replay_url: replayUrl,
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
      { error: err.message || "Replay save failed" },
      { status: 500 }
    );
  }
}
