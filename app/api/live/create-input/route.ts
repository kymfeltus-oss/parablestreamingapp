import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// Add this import if you get a type error:
import type { SerializeOptions } from 'cookie'; 

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
        // Explicitly define the parameter type if the build fails:
        setAll(cookiesToSet: Array<{ name: string; value: string; options: SerializeOptions }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // ...
          }
        },
      },
    }
  );

  // ... rest of the logic
}
