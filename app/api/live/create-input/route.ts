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
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // FIX: Explicitly type 'options' to resolve TypeScript error
        set(name: string, value: string, options: { path: string; maxAge?: number; expires?: Date; httpOnly: boolean; secure?: boolean; sameSite: 'lax' | 'strict' | 'none'; }) { 
          try {
              cookieStore.set({ name, value, ...options });
          } catch (error) {
              // Handle cases where cookies might not be writable (e.g. static export)
          }
        },
        remove(name: string, options: { path: string }) { // FIX: Explicitly type 'options' as string
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
