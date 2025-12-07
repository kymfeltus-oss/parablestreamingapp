// middleware.ts (Final Corrected Script - Fixes all Type Errors)
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // 1. Create Supabase client using createServerClient (correct method for middleware)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // FIX: Only include supported methods (get, set, delete) for middleware
        get: (name) => req.cookies.get(name)?.value,
        
        // Correctly set cookies on the response
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options });
        },
        // Correctly delete cookies on the response (using name: 'delete')
        delete: (name, options) => {
          // Setting value to '' and adding options effectively removes the cookie
          res.cookies.delete(name, options); 
        },
      },
    }
  );

  // 2. Refresh session if expired and set cookie on response
  await supabase.auth.getSession(); 
  
  // 3. Get the session status after refresh
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 4. Define public paths (including the new landing page to fix the mobile loop)
  const publicPaths = ['/login', '/signup', '/auth/confirm', '/auth/landing'];

  // Check if the current path is protected or public
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  // --- Redirection Logic ---

  // If there is no session AND they are trying to access a protected route
  if (!session && !isPublicPath) {
    // Redirect them to the login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // If they are logged in and trying to access a public path (like login/signup)
  // We allow access to /auth/landing for the client-side script to run
  if (session && isPublicPath && req.nextUrl.pathname !== '/auth/landing') {
    // Redirect them away from login/signup/landing to profile setup
    return NextResponse.redirect(new URL('/profile-setup', req.url));
  }

  // Allow the request to proceed if no redirects are needed
  return res;
}

export const config = {
  // FIX: Complete the matcher array to resolve the syntax error
  matcher: [
    /*
    * Match all request paths except for Next.js internal files and APIs
    */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};