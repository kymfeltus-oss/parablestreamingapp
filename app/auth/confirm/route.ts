// app/auth/confirm/route.ts (Final, Compiling Script)
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
// FIX: Use createServerClient from the reliable @supabase/ssr package
import { createServerClient } from '@supabase/ssr'; 

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    
    // FIX: Use the reliable createServerClient pattern for Route Handlers
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
      return NextResponse.redirect(new URL('/auth/landing', requestUrl));
    }
  }

  // FAILURE: Redirect to login with error
  // Use the request URL's origin for a clean, reliable redirect
  return NextResponse.redirect(new URL('/login?error=verification_failed', requestUrl.origin));
}