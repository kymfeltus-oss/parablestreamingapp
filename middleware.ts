// middleware.ts (Final, Compiling, Runtime-Fixed Script)
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';

// FIX 1: Force Node.js runtime to resolve persistent package/type conflicts
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
        // FIX 2: Use 'remove' as the method name and the single-argument 'delete' for implementation
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

  // FIX 3: Include all essential public paths
  const publicPaths = [
    '/', '/login', '/signup', '/auth/confirm', '/auth/landing', 
    '/welcome', '/flash', '/discover', '/streamers',
  ];
  
  // FIX 4: Use startsWith to check if the URL begins with any public path
  // This ensures paths like /flash/123 or /welcome/ are allowed.
  const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path));

  // --- Redirection Logic ---
  
  // A. Redirect unauthorized users away from protected paths
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // B. Redirect authorized users away from login/signup/landing
  if (session && isPublicPath && req.nextUrl.pathname !== '/auth/landing') {
    return NextResponse.redirect(new URL('/profile-setup', req.url));
  }

  return res;
}

export const config = {
  // FIX 5: Complete the matcher array
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};