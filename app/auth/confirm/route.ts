// app/auth/confirm/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// This handler will intercept the link clicked in the verification email.
export async function GET(request: NextRequest) { 
  const { searchParams } = new URL(request.url); 
  const code = searchParams.get('code');

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

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // SUCCESS: Redirect to an intermediate client page to stabilize the session
      return NextResponse.redirect(new URL('/auth/landing', request.url));
    }
  }

  // FAILURE: Use the hardcoded host fix
  const liveHost = 'https://main.dqugj22h6x51v.amplifyapp.com';
  return NextResponse.redirect(new URL(`${liveHost}/login?error=verification_failed`));
}