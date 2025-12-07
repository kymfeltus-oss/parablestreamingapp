import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
        set(name: string, value: string, options: CookieOptions) {
          try {
            // The cookieStore.set method handles all options correctly
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cases where cookies might not be writable (e.g., after headers sent)
            console.error("Failed to set cookie:", error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            // Use the delete method or set maxAge to 0 for explicit removal/expiration
            cookieStore.set({ name, value: "", ...options, maxAge: 0 });
            // Alternatively: cookieStore.delete(name); (if all options are handled internally or not needed for delete)
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
  } = await supabase.auth.getUser(); // getUser() revalidates the auth token

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Parse body (consider Zod validation for robust input checks)
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
    // Log the detailed error internally but return a generic message to the client
    console.error("Database insertion error:", error); 
    return NextResponse.json({ error: "Failed to insert data" }, { status: 400 });
  }

  return NextResponse.json({ input: data }, { status: 200 });
}
