import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Always allow public and onboarding routes
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

  // For everything else, require session cookie
  const hasSession =
    req.cookies.get("sb-access-token") ||
    req.cookies.get("sb-access-token.0") ||
    req.cookies.get("supabase-auth-token");

  if (!hasSession) {
    // Send unauthenticated users to login (NOT flash)
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
