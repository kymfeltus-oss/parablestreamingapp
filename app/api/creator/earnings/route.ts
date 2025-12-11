import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const supabase = createClient();
  const { creatorId, amount, source } = await req.json();

  const { error } = await supabase.from("earnings").insert({
    creator_id: creatorId,
    amount,
    source,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
