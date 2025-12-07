// Corrected Imports: Use createClient from @supabase/ssr
import { createClient } from "@supabase/ssr"; 
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Use the standard Next.js method to get cookies and create the client
  const cookieStore = cookies();
  // Call createClient from @supabase/ssr with the necessary cookie wrappers
  const supabase = createClient({
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  });

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
