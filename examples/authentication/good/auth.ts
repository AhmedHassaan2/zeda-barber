// WHY: httpOnly cookies prevent XSS token theft, server-side validation
// ensures every request is authenticated, and refresh tokens extend sessions.

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getSession() {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  return {
    user: {
      id: session.user.id,
      email: session.user.email!,
      role: session.user.user_metadata.role as string,
    },
    expiresAt: session.expires_at,
  };
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function signIn(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false as const, error: error.message };
  }

  return { success: true as const, user: data.user };
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL));
}

// Middleware helper: refresh session before expiry
export async function refreshSession() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session && session.expires_at - Date.now() / 1000 < 300) {
    await supabase.auth.refreshSession();
  }
}
