// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // 1. Initialize Response Object that captures headers
  // We use this response object to handle redirects and setting cookies.
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  
  // 2. Create Supabase client using the modern getAll/setAll cookie methods
  // Note: We use an immediately invoked function to manage the cookie synchronization
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Read all cookies from the incoming request object
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write all updated cookies to the *outgoing response* object
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
        // The 'delete' equivalent is handled by setAll when value is an empty string
      },
    }
  );

  // 3. Refresh session and update cookies on the response
  await supabase.auth.getSession(); 
  
  // 4. Get the session status after refresh for redirection logic
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 5. Define public paths
  const publicPaths = ['/login', '/signup', '/auth/confirm', '/auth/landing'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // --- Redirection Logic ---

  // A. Redirect unauthorized users away from protected paths
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // B. Redirect authorized users away from login/signup/landing
  if (session && isPublicPath && request.nextUrl.pathname !== '/auth/landing') {
    return NextResponse.redirect(new URL('/profile-setup', request.url));
  }

  // C. Allow the request to proceed if no redirects are needed
  // This 'response' object carries the correct cookie headers now.
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
