import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ ok: false, error: "Missing stream ID" });

  const { data, error } = await supabase
    .from("live_streams")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data)
    return NextResponse.json({
      ok: false,
      error: error?.message || "Stream not found",
    });

  return NextResponse.json({ ok: true, stream: data });
}
