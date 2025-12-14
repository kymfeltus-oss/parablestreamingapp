import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Public routes – ALWAYS allowed
  const publicRoutes = [
    "/",
    "/flash",
    "/login",
    "/auth/register",
    "/welcome",
    "/success",
    "/cancel"
  ];

  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  // Read Supabase auth cookie (generic allow)
  const hasSession =
    req.cookies.get("sb-access-token") ||
    req.cookies.get("sb-access-token.0") ||
    req.cookies.get("supabase-auth-token");

  if (!hasSession) {
    return NextResponse.redirect(new URL("/flash", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
