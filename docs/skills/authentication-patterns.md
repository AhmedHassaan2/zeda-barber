---
title: Authentication implementation with Supabase Auth, JWT handling, session management, and OAuth
description: Authentication implementation with Supabase Auth, JWT handling, session management, and OAuth
---

# Authentication implementation with Supabase Auth, JWT handling, session management, and OAuth

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>authentication-patterns</code> | <strong>Category:</strong> security | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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

## When to Use

- File patterns match the skill's activation rules
- Keywords in the conversation match the skill's domain
- A related agent delegates to this skill

## When NOT to Use

- When the task falls outside this skill's domain
- When a more specific skill exists for the task
- When the skill's dependencies are not met

## Related Agents

See [Agents Registry](/agents/) for agents that use this skill.

## Related Skills

See [Skills Registry](/skills/) for related skills in the same cluster.

## Customization Guide

1. Copy the skill to `.opencode/skills/` in your project
2. Modify the activation rules to match your project patterns
3. Add project-specific examples and templates
4. Update the related agents and skills references

## Extension Guide

1. Add new sections to the SKILL.md file
2. Include code examples for new patterns
3. Update anti-patterns with new findings
4. Maintain cross-references to related skills
5. Keep the skill focused on its core purpose
