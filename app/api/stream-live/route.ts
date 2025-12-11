import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { title, category, thumbnailUrl } = await req.json();

    if (!title) {
      return NextResponse.json(
        { ok: false, error: "Title is required" },
        { status: 400 }
      );
    }

    // Get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Create stream ID
    const streamId = randomUUID();

    // Create slug
    const slug =
      title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") +
      "-" +
      streamId.substring(0, 6);

    // Insert row
    const { error } = await supabase.from("live_streams").insert({
      id: streamId,
      creator_id: user.id,
      title,
      category,
      thumbnail_url: thumbnailUrl || "",
      is_live: true,
      slug,
      viewer_count: 0,
      started_at: new Date().toISOString(),
    });

    if (error)
      return NextResponse.json({ ok: false, error: error.message });

    return NextResponse.json({
      ok: true,
      streamId,
      slug,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
