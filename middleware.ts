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

  // Flash is ALWAYS allowed
  if (pathname === "/flash") {
    return NextResponse.next();
  }

  // Public auth routes
  const publicRoutes = [
    "/login",
    "/auth/register",
    "/welcome",
    "/success",
    "/cancel"
  ];

  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Read auth cookie
  const accessToken =
    req.cookies.get("sb-access-token")?.value ||
    req.cookies.get("sb-access-token.0")?.value;

  // Not logged in → flash
  if (!accessToken) {
    return NextResponse.redirect(new URL("/flash", req.url));
  }

  // Authenticated client
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

  // Fetch onboarding status
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_complete")
    .eq("id", user.id)
    .single();

  // Allow creator setup before onboarding
  if (
    !profile?.onboarding_complete &&
    pathname.startsWith("/profile-setup")
  ) {
    return NextResponse.next();
  }

  // Force onboarding
  if (!profile?.onboarding_complete) {
    return NextResponse.redirect(
      new URL("/profile-setup/creator", req.url)
    );
  }

  // Allow creator area after onboarding
  if (pathname.startsWith("/creator")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
