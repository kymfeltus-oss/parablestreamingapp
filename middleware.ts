import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/admin")) {
    // Example: look for a cookie flag; real check should be JWT / Supabase
    const isAdmin = req.cookies.get("is_admin")?.value === "true";
    if (!isAdmin) {
      url.pathname = "/"; // redirect home
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
