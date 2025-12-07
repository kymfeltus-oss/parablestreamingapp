import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
// Import the basic SerializeOptions type from the 'cookie' package
import type { SerializeOptions } from 'cookie'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Use getAll() as required by v0.5.0+
        getAll() {
          // Returns an array of { name, value } which satisfies the required type
          return cookieStore.getAll() 
        },
        // Use setAll() and explicitly cast the options to satisfy the type checker
        setAll(cookiesToSet: Array<{ name: string; value: string; options: SerializeOptions }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // These errors are expected if setting cookies in a Server Component context
            console.error("Failed to set cookies:", error);
          }
        },
      },
    }
  )
}
