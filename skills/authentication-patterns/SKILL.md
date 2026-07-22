---
name: authentication-patterns
description: Authentication implementation with Supabase Auth, JWT handling, session management, and OAuth
category: security
level: concept
priority: high
dependencies: ["jwt-security"]
related_skills: ["jwt-security", "authorization-patterns", "supabase-patterns"]
related_agents: ["security", "backend"]
activation_rules:
  - keywords: ["auth", "login", "session", "JWT", "token", "OAuth", "Supabase Auth"]
  - file_pattern: "src/**/auth*"
  - file_pattern: "src/**/login*"
---

# Authentication Patterns

## Purpose

Guide authentication implementation with secure session management, OAuth, and multi-tenant patterns.

## When to Use

- Implementing login/logout
- Adding OAuth providers
- Managing session tokens
- Implementing protected routes

## Core Concepts

### Supabase Auth Flow

```typescript
// Sign in with email
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// Sign in with OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: `${window.location.origin}/auth/callback` },
});

// Sign out
await supabase.auth.signOut();
```

### Route Protection

```typescript
// Middleware (Next.js)
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(...);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
}
```

### Token Management

```typescript
// Server-side: Use cookies (httpOnly, secure, sameSite)
// Client-side: Use Supabase session (auto-refresh)

// Avoid: localStorage for tokens (XSS vulnerable)
```

## Best Practices

- Use httpOnly cookies for server-side auth
- Never store tokens in localStorage
- Implement proper logout (clear all sessions)
- Validate tokens server-side on every request
- Use middleware for route protection
- Handle token expiration gracefully
- Log auth events for security auditing

## Anti-Patterns

- Storing tokens in localStorage
- Not validating tokens server-side
- Hardcoded credentials
- Missing rate limiting on login
- Not implementing account lockout
