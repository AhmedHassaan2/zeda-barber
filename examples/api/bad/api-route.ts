// WHY WRONG: No auth check, no validation, hardcoded secret,
// generic error handling leaks internals. Attackers love these.

import { NextRequest, NextResponse } from "next/server";

const API_SECRET = "sk-live-super-secret-key-12345";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = await fetch(`https://api.internal.com/users?secret=${API_SECRET}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: body.name,
      email: body.email,
      role: body.role,
    }),
  });

  if (!result.ok) {
    const error = await result.text();
    return NextResponse.json(
      { error: `Internal API failed: ${error}`, secret: API_SECRET },
      { status: 500 }
    );
  }

  const data = await result.json();
  return NextResponse.json(data);
}
