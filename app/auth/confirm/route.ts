// app/auth/confirm/route.ts (Final, Stabilized Script)
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr'; 

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  // Define the known, reliable host for external redirects
  const LIVE_HOST = 'https://main.dqugj22h6x51v.amplifyapp.com';

  if (code) {
    const cookieStore = cookies();
    
    // Use the reliable createServerClient pattern for Route Handlers
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => cookieStore.getAll(),
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                },
            },
        }
    );

    // Exchange the verification code for a user session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // SUCCESS: Redirect to the intermediate client page to stabilize the session
      // This redirect is internal and safe to use with requestUrl
      return NextResponse.redirect(new URL('/auth/landing', requestUrl));
    }
  }

  // FAILURE: Redirect to login with error
  // FIX: Use the hardcoded LIVE_HOST URL for guaranteed reliability upon failure
  return NextResponse.redirect(new URL(`${LIVE_HOST}/login?error=verification_failed`));
}