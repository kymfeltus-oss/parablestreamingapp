import { createServerClient } from "@supabase/ssr"; 
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { // FIX: Explicitly type 'name' as string
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) { // FIX: Explicitly type 'name' and 'value' as string
          try {
              cookieStore.set({ name, value, ...options });
          } catch (error) {
              // Handle cases where cookies might not be writable (e.g. static export)
          }
        },
        remove(name: string, options) { // FIX: Explicitly type 'name' as string
           try {
              cookieStore.set({ name, value: "", ...options });
          } catch (error) {
              // Handle cases where cookies might not be writable
          }
        },
      },
    }
  );

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
