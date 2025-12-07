import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const supabase = await supabaseServer();

  const { searchParams } = new URL(req.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (!token_hash || !type) {
    return NextResponse.redirect(new URL("/auth?error=missing_token", req.url));
  }

  // Supabase expects a specific literal type
  const otpType = type === "magiclink" ? "magiclink" : "email";

  const { error } = await supabase.auth.verifyOtp({
    token_hash,
    type: otpType,
  });

  if (!error) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.redirect(
    new URL(`/auth?error=${encodeURIComponent(error.message)}`, req.url)
  );
}
