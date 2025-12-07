// middleware.ts (Final Corrected Script for older package versions)
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  // 1. Initialize Response Object
  const res = NextResponse.next();
  
  // 2. Create Supabase client using the correct minimal cookie methods
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read cookie value from the request object
        get: (name: string) => req.cookies.get(name)?.value,
        
        // Write/Update cookies on the response object
        set: (name: string, value: string, options: CookieOptions) => {
          res.cookies.set({ name, value, ...options });
        },
        // FIX: Renamed 'remove' to 'delete' to match the deprecated interface requirement
        delete: (name: string, options: CookieOptions) => {
          res.cookies.delete(name, options); 
        },
      },
    }
  );

  // 3. Refresh session and update cookies on the response
  await supabase.auth.getSession(); 
  
  // 4. Get the session status after refresh
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 5. Define public paths
  const publicPaths = ['/login', '/signup', '/auth/confirm', '/auth/landing'];
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  // --- Redirection Logic ---

  // A. Redirect unauthorized users away from protected paths
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // B. Redirect authorized users away from login/signup/landing
  if (session && isPublicPath && req.nextUrl.pathname !== '/auth/landing') {
    return NextResponse.redirect(new URL('/profile-setup', req.url));
  }

  // C. Allow the request to proceed if no redirects are needed
  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
