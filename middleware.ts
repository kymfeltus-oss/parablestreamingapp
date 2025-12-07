// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 1. Create the Supabase server client using the modern cookie handling pattern
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            // CRITICAL: Set the cookies on the response object to maintain the session
            response.cookies.set(name, value, options) 
          )
        },
      },
    }
  )

  // 2. Refresh the session: This updates cookies on the response if the access token is near expiration.
  const { data: { user } } = await supabase.auth.getUser()
  
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/profile-setup');

  // 3. Protection Logic
  if (!user && isProtectedRoute) {
    // A. Redirect unauthenticated users away from protected routes
    const url = new URL('/login', request.url);
    // Add redirect path to query string so user can return here after login
    url.searchParams.set('redirect_to', pathname); 
    return NextResponse.redirect(url);
  }
  
  if (user && isAuthRoute) {
    // B. Redirect authenticated users away from login/signup pages
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 4. Return the response with updated cookies
  return response
}

// 5. Specify which paths the middleware should run on
export const config = {
  matcher: [
    /* * Match all paths except those that Next.js handles automatically:
     * - API routes (/api/...)
     * - Static files (/_next/static, /_next/image)
     * - Public files (e.g., /favicon.ico)
     * - The /auth/confirm handler (already handles its own redirection logic)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth/confirm).*)',
  ],
}