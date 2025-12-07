// utils/supabase/client.ts

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // This function returns an instance of the Supabase client
  // and does *not* contain any React/JSX syntax like <></> or <div>.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
