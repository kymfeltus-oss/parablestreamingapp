import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const supabase = supabaseServer();

  // Read the URL, Supabase sends access_token, refresh_token, etc.
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/auth?error=missing_code");
  }

  // Exchange the code for a session
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`/auth?error=${encodeURIComponent(error.message)}`);
  }

  // Now user is authenticated in server-side session
  const { user } = data;

  if (!user) {
    return NextResponse.redirect("/auth?error=no_user");
  }

  // OPTIONAL: Ensure user profile exists
  await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
  });

  // Redirect to dashboard or onboarding
  return NextResponse.redirect("/dashboard");
}
