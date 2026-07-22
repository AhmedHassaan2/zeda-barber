import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const tokenCookie = req.cookies.get("admin_token")?.value;

  if (pathname.startsWith("/admin/dashboard")) {
    if (!tokenCookie || !(await verifyToken(tokenCookie))) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (pathname.startsWith("/api/admin/") && pathname !== "/api/admin/login") {
    if (!tokenCookie || !(await verifyToken(tokenCookie))) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }
  }

  const response = NextResponse.next();
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://kydsogldwxnzberharst.supabase.co",
    "frame-src 'self' https://www.facebook.com https://www.youtube.com",
    "connect-src 'self' https://kydsogldwxnzberharst.supabase.co",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
