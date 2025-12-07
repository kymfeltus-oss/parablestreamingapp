// middleware.ts (Updated Logic)
import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // IMPORTANT: Add /auth/landing to public paths to allow the client to stabilize the session
  const publicPaths = ['/login', '/signup', '/auth/confirm', '/auth/landing'];

  const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path));

  // If there is no session AND they are trying to access a protected route
  if (!session && !isPublicPath) {
    // Redirect them to the login page
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If they are logged in and trying to access a public path (like login/signup)
  if (session && isPublicPath && req.nextUrl.pathname !== '/auth/landing') {
    // Redirect them to the profile setup/dashboard
    return NextResponse.redirect(new URL('/profile-setup', req.url));
  }

  return res;
}

// Configuration to apply middleware to most paths
export const config = {
  matcher: [
    /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico (favicon file)
    */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};