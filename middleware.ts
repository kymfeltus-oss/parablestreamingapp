import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  const publicRoutes = [
    "/login",
    "/auth/register",
    "/profile-setup",
    "/success",
    "/cancel",
    "/welcome"
  ];

  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(route + "/")
  );

  if (!session) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return res;
  }

  const userId = session.user.id;

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_complete")
    .eq("id", userId)
    .single();

  if (!profile || profile.onboarding_complete !== true) {
    if (!pathname.startsWith("/profile-setup")) {
      return NextResponse.redirect(new URL("/profile-setup", req.url));
    }
    return res;
  }

  if (pathname.startsWith("/profile-setup")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
