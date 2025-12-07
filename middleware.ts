// middleware.ts (Final Corrected Script with ALL Public Routes)
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';

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
        delete: (name: string, options: CookieOptions) => {
          res.cookies.delete(name, options); 
        },
      },
    }
  );

  await supabase.auth.getSession(); 
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ⚠️ FIX: ADDED all essential public paths here
  const publicPaths = [
    '/',               // Home/Root page
    '/login',          // Login page
    '/signup',         // Sign up page
    '/auth/confirm',   // Email verification handler
    '/auth/landing',   // Intermediate session stabilizer
    '/welcome',        // Your Welcome page
    '/flash',          // Your Flash page
    '/discover',       // Discovery page (if public)
    '/streamers',      // Streamers list (if public)
  ];
  
  // Use startsWith for better matching if paths include dynamic segments, but includes() works for exact matches
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  // --- Redirection Logic ---

  // A. Redirect unauthorized users away from protected paths
  if (!session && !isPublicPath) {
    // If the root path ('/') is missing, this will catch unauthorized users trying to access it
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // B. Redirect authorized users away from login/signup/landing
  if (session && isPublicPath && req.nextUrl.pathname !== '/auth/landing') {
    return NextResponse.redirect(new URL('/profile-setup', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};