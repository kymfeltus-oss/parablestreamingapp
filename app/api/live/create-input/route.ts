import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// Import SerializeOptions from the 'cookie' package (a dev dependency that should be available)
import type { CookieSerializeOptions as SerializeOptions } from 'cookie'; 

export async function POST(req: Request) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        // Use the exact inline type definition required by the library's interface
        setAll(cookiesToSet: { name: string; value: string; options: SerializeOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // The Next.js cookieStore.set method accepts the combined options
              cookieStore.set(name, value, options); 
            });
          } catch (error) {
            // This can be ignored if you have middleware refreshing user sessions
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
