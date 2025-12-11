import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const supabase = createClient();
  const { email, password, displayName, username } = await req.json();

  const streamKey = randomUUID().replace(/-/g, "");

  // AUTO-GENERATE SLUG
  const safeSlug =
    username
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `user-${Date.now()}`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://studio.parablestreaming.com/auth/confirm",
      data: {
        displayName,
        username,
        slug: safeSlug,
        accountType: "creator",
        streamKey,
      },
    },
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const user = data?.user;
  if (!user) return NextResponse.json({ error: "User creation failed" }, { status: 500 });

  // Insert profile row
  await supabase.from("profiles").insert({
    id: user.id,
    display_name: displayName,
    username,
    slug: safeSlug,
    bio: "",
    avatar_url: "",
    stream_key: streamKey,
  });

  return NextResponse.json({ ok: true });
}
