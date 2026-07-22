---
date: 2026-07-19
category: mistakes
tags: [auth, security, server-side, middleware, session]
project: shared
severity: critical
---

# Always Validate Auth Server-Side

## Context

An admin panel was protected only with client-side `localStorage` checks. Any user could bypass the check by manipulating the DOM or calling API routes directly, gaining admin access.

## Content

**The Mistake:**
```typescript
// Client-side only — easily bypassed
function AdminPage() {
  const role = localStorage.getItem("userRole");
  if (role !== "admin") return <Redirect to="/login" />;
  return <AdminDashboard />;
}

// API route with no server auth
export async function POST(request: NextRequest) {
  const body = await request.json();
  // No auth check — anyone can call this
  await deleteAllUsers();
}
```

**The Fix:**
```typescript
// Server-side auth — cannot be bypassed
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await deleteAllUsers();
}
```

**Defense in Depth:**
1. Middleware checks — route-level auth guard
2. Server Component checks — user session validation
3. API route checks — every endpoint verifies auth
4. Database checks — RLS policies enforce row-level access
5. Client checks — UX only, never security

## Application

Every API route and Server Component must validate auth independently. Client-side checks are for UX, never for security.

## Related

- `2026-07-19_hardcoded-credentials.md` — Credential security
- `2026-07-19_no-rls-policies.md` — Database-level security
