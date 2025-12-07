// middleware.ts (Final Corrected Script)
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
        // Correctly read cookies from the request
        get: (name) => req.cookies.get(name)?.value,
        getAll: () => req.cookies.getAll(),
        
        // Correctly set cookies on the response
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options });
        },
        // Correctly remove cookies on the response
        remove: (name, options) => {
          res.cookies.set({ name, value: '', ...options });
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

  // 4. Define public paths (including the new landing page)
  const publicPaths = ['/login', '/signup', '/auth/confirm', '/auth/landing'];

  // Check if the current path starts with any of the public paths
  // Using includes() is fine if the path is an exact match like '/login'
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
  matcher: [
    /*
    * Match all request paths except for Next.js internal files and APIs
    */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};