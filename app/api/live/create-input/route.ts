import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Imported for type clarity if using setAll options

export async function POST(req: Request) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // Added to satisfy the modern interface requirements
        getAll() {
          return cookieStore.getAll();
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Can be ignored if you have middleware refreshing user sessions
            console.error("Failed to set cookie:", error);
          }
        },
        // Added to satisfy the modern interface requirements
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set({ name, value, ...options });
            });
          } catch (error) {
            // Can be ignored if you have middleware refreshing user sessions
            console.error("Failed to set all cookies:", error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            // Using maxAge: 0 to force expiration
            cookieStore.set({ name, value: "", ...options, maxAge: 0 });
          } catch (error) {
            console.error("Failed to remove cookie:", error);
          }
        },
      },
    }
  );

  // Authentication check
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Parse body
  const body = await req.json();
  const { title, description, visibility } = body;

  // Database insertion
  const { data, error } = await supabase
    .from("live_inputs")
    .insert({
      user_id: user.id,
      title,
      description,
      visibility,
    })
    .select()
    .single();

  if (error) {
    console.error("Database insertion error:", error);
    return NextResponse.json({ error: "Failed to insert data" }, { status: 400 });
  }

  return NextResponse.json({ input: data }, { status: 200 });
}
