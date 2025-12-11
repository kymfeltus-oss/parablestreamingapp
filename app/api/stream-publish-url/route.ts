import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("stream_key")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.stream_key)
    return NextResponse.json({ error: "No stream key set" }, { status: 400 });

  const rtmpUrl = `rtmp://live.cloudflare.com:1935/live/${profile.stream_key}`;

  return NextResponse.json({ ok: true, rtmpUrl });
}
