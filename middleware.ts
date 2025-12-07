// middleware.ts (The only correct structure for Middleware)
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
        // We use 'delete' to ensure compilation in your environment
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

  const publicPaths = ['/login', '/signup', '/auth/confirm', '/auth/landing'];
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
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};