// middleware.ts (Final, Compiling, Runtime-Fixed Script)
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';

// FIX: Force Node.js runtime to resolve package/type conflicts
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
        // FIX: MUST use 'remove' as the method name to match the conflicting interface
        remove: (name: string, options: CookieOptions) => { 
          res.cookies.delete(name, options); // Correct implementation
        },
      },
    }
  );

  await supabase.auth.getSession(); 
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Including all essential public paths:
  const publicPaths = [
    '/', '/login', '/signup', '/auth/confirm', '/auth/landing', 
    '/welcome', '/flash', '/discover', '/streamers',
  ];
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  if (session && isPublicPath && req.nextUrl.pathname !== '/auth/landing') {
    return NextResponse.redirect(new URL('/profile-setup', req.url));
  }

  return res;
}

export const config = {
  // FIX: Complete the matcher array to resolve the Syntax Error
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};