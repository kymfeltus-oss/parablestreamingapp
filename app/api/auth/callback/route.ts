import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: error?.message || "No user found" }, { status: 400 });
  }

  // check if profile exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // if profile does not exist, create it
  if (!existingProfile) {
    await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      display_name: user.email?.split("@")[0] || "User",
      role: "user"
    });
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
