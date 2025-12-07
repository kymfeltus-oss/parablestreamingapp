// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Use createServerClient instead of createMiddlewareClient
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
        },
        removeAll: (cookiesToRemove) => {
          cookiesToRemove.forEach(({ name, options }) => res.cookies.set(name, '', options));
        },
      },
    }
  );

  // Refresh session if expired - required for Server Components
  // This call reads the cookie from the request and sets the cookie on the response
  await supabase.auth.getSession();

  const publicPaths = ['/login', '/signup', '/auth/confirm', '/auth/landing'];

  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there is no session AND they are trying to access a protected route
  if (!session && !isPublicPath) {
    // Redirect them to the login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // If they are logged in and trying to access a public path (like login/signup), but not the landing page
  if (session && isPublicPath && req.nextUrl.pathname !== '/auth/landing') {
    // Redirect them to the profile setup/dashboard
    return NextResponse.redirect(new URL('/profile-setup', req.url));
  }

  return res;
}

export const config = {
  matcher:,
};
