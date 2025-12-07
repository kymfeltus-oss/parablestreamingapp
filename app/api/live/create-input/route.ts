// Corrected Imports: Use createServerClient from @supabase/ssr
import { createServerClient } from "@supabase/ssr"; 
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Use the standard Next.js method to get cookies and create the client
  const cookieStore = cookies();
  // Call createServerClient from @supabase/ssr with the necessary cookie wrappers
  const supabase = createServerClient({
    // You must provide your Supabase URL and Anon Key here as arguments to createServerClient
    // Example (replace with your actual env variables if they exist in this scope):
    // process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        // Error handling for when cookies aren't available
        try {
            cookieStore.set({ name, value, ...options });
        } catch (error) {
            throw new Error("Cookies are not available");
        }
      },
      remove(name, options) {
        // Error handling for when cookies aren't available
         try {
            cookieStore.set({ name, value: "", ...options });
        } catch (error) {
            throw new Error("Cookies are not available");
        }
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
