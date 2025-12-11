import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const supabase = createClient();
  const { amount, description } = await req.json();

  if (!amount || amount <= 0) {
    return NextResponse.json(
      { ok: false, error: "Invalid seeds amount" },
      { status: 400 }
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  // Get current profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("seeds")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return NextResponse.json(
      { ok: false, error: profileError?.message || "Profile missing" },
      { status: 500 }
    );
  }

  const newBalance = (profile.seeds || 0) + amount;

  // Update profile balance
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ seeds: newBalance })
    .eq("id", user.id);

  if (updateError) {
    return NextResponse.json(
      { ok: false, error: updateError.message },
      { status: 500 }
    );
  }

  // Insert transaction
  await supabase.from("seeds_transactions").insert({
    user_id: user.id,
    amount,
    description: description || "Manual seeds credit (demo)",
  });

  return NextResponse.json({ ok: true, balance: newBalance });
}
