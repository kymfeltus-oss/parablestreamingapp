import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { streamId } = await req.json();

    if (!streamId) {
      return NextResponse.json({ error: "Missing streamId" }, { status: 400 });
    }

    const { data: stream, error: fetchError } = await supabase
      .from("live_streams")
      .select("*")
      .eq("id", streamId)
      .single();

    if (fetchError || !stream) {
      return NextResponse.json(
        { error: "Stream not found" },
        { status: 404 }
      );
    }

    // If Cloudflare live input already exists, just return it
    if (stream.cloudflare_input_id && stream.rtmp_url && stream.stream_key) {
      return NextResponse.json({ stream });
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const token = process.env.CLOUDFLARE_STREAM_TOKEN;

    if (!accountId || !token) {
      return NextResponse.json(
        { error: "Missing Cloudflare credentials" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/live_inputs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meta: {
            name: stream.title || "Parable Live",
          },
        }),
      }
    );

    const json = await res.json();

    if (!json.success) {
      return NextResponse.json(
        { error: "Failed to create Cloudflare live input", detail: json },
        { status: 500 }
      );
    }

    const liveInput = json.result;
    const rtmpUrl =
      liveInput.rtmps?.url || liveInput.rtmp?.url || "rtmp://live.cloudflare.com/live";
    const streamKey =
      liveInput.rtmps?.streamKey || liveInput.rtmp?.streamKey || "";

    const cloudflareInputId = liveInput.uid;

    const { data: updated, error: updateError } = await supabase
      .from("live_streams")
      .update({
        rtmp_url: rtmpUrl,
        stream_key: streamKey,
        cloudflare_input_id: cloudflareInputId,
      })
      .eq("id", streamId)
      .select("*")
      .single();

    if (updateError || !updated) {
      return NextResponse.json(
        { error: "Failed to update live_streams row" },
        { status: 500 }
      );
    }

    return NextResponse.json({ stream: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
