import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Root always goes to flash
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/flash", req.url));
  }

  // Public routes
  const publicRoutes = [
    "/flash",
    "/login",
    "/auth/register",
    "/welcome",
    "/success",
    "/cancel"
  ];

  const isPublicRoute = publicRoutes.some(
    route => pathname === route || pathname.startsWith(route + "/")
  );

  const accessToken =
    req.cookies.get("sb-access-token")?.value ||
    req.cookies.get("sb-access-token.0")?.value;

  // Not logged in
  if (!accessToken) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/flash", req.url));
    }
    return NextResponse.next();
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  });

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/flash", req.url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_complete")
    .eq("id", user.id)
    .single();

  // Logged in but not onboarded
  if (!profile?.onboarding_complete) {
    if (!pathname.startsWith("/profile-setup")) {
      return NextResponse.redirect(new URL("/profile-setup", req.url));
    }
    return NextResponse.next();
  }

  // ✅ ALLOW CREATOR ROUTES AFTER LOGIN
  if (pathname.startsWith("/creator")) {
    return NextResponse.next();
  }

  // Prevent going back to profile setup
  if (pathname.startsWith("/profile-setup")) {
    return NextResponse.redirect(new URL("/creator/ministry", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
