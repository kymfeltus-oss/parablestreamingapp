// app/auth/confirm/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// This handler will intercept the link clicked in the verification email.
export async function GET(request: Request) { 
  const { searchParams } = new URL(request.url); 
  const code = searchParams.get('code');
  // Removed unnecessary 'next' variable

  if (code) {
    const cookieStore = cookies();
    
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

    // Exchange the verification code for a user session (logs the user in)
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Success! Redirect directly to the mandatory profile setup page
      return NextResponse.redirect(new URL('/profile-setup', request.url));
    }
  }

  // Handle error or missing code by redirecting to the login page
  return NextResponse.redirect(new URL(`/login?error=verification_failed`, request.url));
}