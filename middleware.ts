import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Always allow public + onboarding routes
  const allowedRoutes = [
    "/",
    "/flash",
    "/login",
    "/auth/register",
    "/welcome",
    "/success",
    "/cancel",
    "/profile-setup"
  ];

  if (
    allowedRoutes.some(
      route => pathname === route || pathname.startsWith(route + "/")
    )
  ) {
    return NextResponse.next();
  }

  // Check for Supabase session cookie
  const hasSession =
    req.cookies.get("sb-access-token") ||
    req.cookies.get("sb-access-token.0") ||
    req.cookies.get("supabase-auth-token");

  // Allow creator pages if session exists
  if (pathname.startsWith("/creator") && hasSession) {
    return NextResponse.next();
  }

  // Otherwise redirect to login
  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
