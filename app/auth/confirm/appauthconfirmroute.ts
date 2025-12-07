// app/auth/confirm/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// This handler will intercept the link clicked in the verification email.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/'; // Fallback path

  if (code) {
    const cookieStore = cookies();
    
    // Create the server client using the modern cookie handling pattern
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
      // Success! Redirect to the profile setup page
      return NextResponse.redirect(new URL('/profile-setup', request.url));
    }
  }

  // Handle error or missing code by redirecting to the login page or home
  return NextResponse.redirect(new URL(`/login?error=verification_failed`, request.url));
}