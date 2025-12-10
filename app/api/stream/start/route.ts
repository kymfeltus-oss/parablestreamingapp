import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const body = await req.json();

    const {
      streamId,
      creatorId,
      title,
      category,
      thumbnail_url,
      slug,
    } = body;

    if (!creatorId || !title) {
      return NextResponse.json(
        { error: "creatorId and title are required" },
        { status: 400 }
      );
    }

    const payload = {
      id: streamId || crypto.randomUUID(),
      creator_id: creatorId,
      title,
      category: category || null,
      thumbnail_url: thumbnail_url || null,
      slug: slug || null,
      is_live: true,
      viewer_count: 0,
      started_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("live_streams")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, streamId: payload.id });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Stream start failed" },
      { status: 500 }
    );
  }
}
