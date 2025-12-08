// middleware.ts (Final, Stabilized Script)
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';

export const runtime = 'nodejs'; 

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          res.cookies.set({ name, value, ...options });
        },
        remove: (name: string, options: CookieOptions) => { 
          res.cookies.delete(name); 
        },
      },
    }
  );

  await supabase.auth.getSession(); 
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // FIX: Ensure all authentication routes are public
  const publicPaths = [
    '/', '/login', '/signup', '/auth/confirm', '/auth/landing', 
    '/auth/register', 
    '/welcome', '/flash', '/discover', '/streamers',
  ];
  
  const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path));

  // 1. If UNAUTHENTICATED and trying to access a PROTECTED page, redirect to login.
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // 2. If AUTHENTICATED and trying to access a PUBLIC page, redirect to the next REQUIRED step.
  // FIX: Redirect logged-in users to the mandatory /profile-setup page.
  if (session && isPublicPath && req.nextUrl.pathname !== '/auth/landing') {
    return NextResponse.redirect(new URL('/profile-setup', req.url)); // <-- FINAL CRITICAL FIX
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};