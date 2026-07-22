import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

const ADMIN_USER = process.env.ADMIN_USER || "zeda";
const ADMIN_PASS = process.env.ADMIN_PASS || "zeda2026";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (entry && now < entry.resetAt) {
    if (entry.count >= 5) return false;
    entry.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
  }
  return true;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "محاولات كثيرة جداً. حاول بعد ١٥ دقيقة." },
        { status: 429, headers: { "Retry-After": "900" } }
      );
    }

    const { username, password } = await req.json();
    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json({ success: false, error: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }

    const token = await createToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: "خطأ في الطلب" }, { status: 400 });
  }
}
