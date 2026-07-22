// WHY: Input validation, structured error responses, auth check,
// and proper HTTP status codes make APIs reliable and secure.

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(["admin", "member", "viewer"]),
});

interface ApiResponse<T> {
  data: T | null;
  error: { code: string; message: string } | null;
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<unknown>>> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ data: null, error: { code: "UNAUTHORIZED", message: "Authentication required" } }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ data: null, error: { code: "INVALID_BODY", message: "Request body must be valid JSON" } }, { status: 400 });
  }

  const parsed = CreateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ data: null, error: { code: "VALIDATION_ERROR", message: parsed.error.issues.map((i) => i.message).join(", ") } }, { status: 422 });
  }

  const { data, error } = await supabase.from("users").insert(parsed.data).select().single();
  if (error) {
    return NextResponse.json({ data: null, error: { code: "DB_ERROR", message: "Failed to create user" } }, { status: 500 });
  }

  return NextResponse.json({ data, error: null }, { status: 201 });
}
