export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";
import { randomUUID } from "crypto";

export async function POST() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const streamKey = randomUUID().replace(/-/g, "");

  await supabase
    .from("profiles")
    .update({ stream_key: streamKey })
    .eq("id", user.id);

  return NextResponse.json({ ok: true, streamKey });
}
