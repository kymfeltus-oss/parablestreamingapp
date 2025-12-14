import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const publicRoutes = [
    "/login",
    "/auth/register",
    "/profile-setup",
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

  if (!accessToken) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
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

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_complete")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_complete) {
    if (!pathname.startsWith("/profile-setup")) {
      return NextResponse.redirect(new URL("/profile-setup", req.url));
    }
    return NextResponse.next();
  }

  // ✅ ALLOW CREATOR ROUTES AFTER ONBOARDING
  if (pathname.startsWith("/creator")) {
    return NextResponse.next();
  }

  // ❌ BLOCK RETURNING TO PROFILE SETUP
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
