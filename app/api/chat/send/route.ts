import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const supabase = createClient();
  const { streamId, message } = await req.json();

  if (!streamId || !message)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { error } = await supabase.from("chat").insert({
    stream_id: streamId,
    user_id: user.id,
    message,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
