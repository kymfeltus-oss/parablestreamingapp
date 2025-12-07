import { createServerClient, type CookieOptions, type SetAllCookiesOptions } from "@supabase/ssr"; // Import SetAllCookiesOptions
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Aligns with modern interface
        getAll() {
          return cookieStore.getAll();
        },
        // Aligns with modern interface and uses correct type for cookiesToSet parameter
        setAll(cookiesToSet: SetAllCookiesOptions[]) { 
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set({ name, value, ...options });
            });
          } catch (error) {
            console.error("Failed to set cookies:", error);
          }
        },
      },
    }
  );

  // Rest of your logic remains the same
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, visibility } = body;

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
