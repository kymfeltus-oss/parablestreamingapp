// app/auth/confirm/route.ts (Final, Cleaned Script)
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
// FIX: Use the dedicated route handler helper for reliability
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'; 

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    
    // FIX: Use createRouteHandlerClient for automatic cookie management
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // SUCCESS: Redirect to the intermediate client page to stabilize the session
      return NextResponse.redirect(new URL('/auth/landing', requestUrl));
    }
  }

  // FAILURE: Redirect to login with error
  // FIX: Use the request URL's origin for a clean, reliable redirect
  return NextResponse.redirect(new URL('/login?error=verification_failed', requestUrl.origin));
}