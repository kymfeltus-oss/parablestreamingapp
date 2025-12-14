import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { title, category, thumbnailUrl } = await req.json();

    if (!title)
      return NextResponse.json({ ok: false, error: "Title required" });

    // AUTH USER
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return NextResponse.json({ ok: false, error: "Not authenticated" });

    // CREATE STREAM ID
    const streamId = randomUUID();

    // GENERATE SLUG
    const slugBase = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const slug = `${slugBase}-${streamId.substring(0, 6)}`;

    // INSERT STREAM
    const { error } = await supabase.from("live_streams").insert({
      id: streamId,
      creator_id: user.id,
      title,
      category,
      thumbnail_url: thumbnailUrl || "",
      slug,
      is_live: true,
      viewer_count: 0,
      started_at: new Date().toISOString()
    });

    if (error)
      return NextResponse.json({ ok: false, error: error.message });

    return NextResponse.json({
      ok: true,
      streamId,
      slug
    });

  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message });
  }
}
