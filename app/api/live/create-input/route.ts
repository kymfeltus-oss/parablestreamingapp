import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"; // Use this
import { cookies } from "next/headers"; // Use this
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Use the standard Next.js method to get cookies and create the client
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  
  const body = await req.json();

  const { title, description, visibility } = body;

  const { data, error } = await supabase.from("live_inputs").insert({
    user_id: user.id,
    title,
    description,
    visibility,
  }).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ input: data }, { status: 200 });
}
