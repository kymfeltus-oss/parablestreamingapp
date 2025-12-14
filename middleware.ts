import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1️⃣ Root always goes to flash
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/flash", req.url));
  }

  // 2️⃣ Always allow static public pages
  const publicRoutes = [
    "/flash",
    "/login",
    "/auth/register",
    "/welcome",
    "/success",
    "/cancel"
  ];

  if (publicRoutes.some(route => pathname === route)) {
    return NextResponse.next();
  }

  // 3️⃣ Read auth cookie
  const accessToken =
    req.cookies.get("sb-access-token")?.value ||
    req.cookies.get("sb-access-token.0")?.value;

  // 4️⃣ Not logged in → flash
  if (!accessToken) {
    return NextResponse.redirect(new URL("/flash", req.url));
  }

  // 5️⃣ Authenticated client
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

  // 6️⃣ Get onboarding status
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_complete")
    .eq("id", user.id)
    .single();

  // 🔴 CRITICAL FIX
  // Allow creator setup BEFORE onboarding
  if (
    !profile?.onboarding_complete &&
    pathname === "/profile-setup/creator"
  ) {
    return NextResponse.next();
  }

  // 7️⃣ Not onboarded → force creator setup
  if (!profile?.onboarding_complete) {
    return NextResponse.redirect(
      new URL("/profile-setup/creator", req.url)
    );
  }

  // 8️⃣ Onboarded users
  if (pathname.startsWith("/creator")) {
    return NextResponse.next();
  }

  // 9️⃣ Block returning to setup
  if (pathname.startsWith("/profile-setup")) {
    return NextResponse.redirect(
      new URL("/creator/ministry", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
