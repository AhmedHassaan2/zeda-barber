---
date: 2026-07-19
category: mistakes
tags: [security, secrets, env-vars, credentials, git]
project: shared
severity: critical
---

# Never Hardcode Credentials

## Context

API keys, database URLs, and secrets were hardcoded in source files during early development. This is a critical security violation that can expose credentials in version control permanently.

## Content

**The Mistake:**
```typescript
// NEVER DO THIS
const supabaseUrl = "https://xyz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIs...";
const stripeKey = "sk_live_abc123...";
```

**The Fix:**
```typescript
// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const stripeKey = process.env.STRIPE_SECRET_KEY;
```

**Prevention Checklist:**
- `.env.local` in `.gitignore` — always
- Never commit `.env` files, even with fake values
- Use `NEXT_PUBLIC_` prefix only for client-safe values
- Service role keys stay server-side only
- Rotate any key that was ever committed

**Validation at Startup:**
```typescript
if (!process.env.SUPABASE_URL) {
  throw new Error("Missing SUPABASE_URL environment variable");
}
```

## Application

Before writing any credential or secret, check: is it in an environment variable? If not, stop and use `process.env`.

## Related

- `2026-07-19_client-side-only-auth.md` — Auth security
- `2026-07-19_no-rls-policies.md` — Database security
