---
title: Environment variable management, secrets storage, validation, key rotation, and credential security
description: Environment variable management, secrets storage, validation, key rotation, and credential security
---

# Environment variable management, secrets storage, validation, key rotation, and credential security

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>environment-secrets</code> | <strong>Category:</strong> devops | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Environment & Secrets Management

## Purpose

Guide secure environment variable management, secrets handling, validation, and key rotation for production applications.

## When to Use

- Setting up new projects
- Adding new environment variables or API keys
- Configuring multi-environment setups (dev/staging/prod)
- Validating required variables at startup
- Implementing key rotation
- Auditing credential exposure

## Core Concepts

### Environment Variable Naming

```bash
# Client-side (exposed to browser — NEVER secrets)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Server-side only (never exposed to client)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_live_...
SMTP_PASSWORD=your_password
DATABASE_URL=postgresql://...
CRON_SECRET=your_cron_secret
```

### Environment Files

```
.env.example      # Committed — template with keys, no values (documentation)
.env.local         # Gitignored — local development overrides
.env.development   # Development defaults (can be committed)
.env.production    # Production defaults (can be committed)
```

### Validation at Startup (Critical)

```typescript
// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  // Client-safe ( NEXT_PUBLIC_ )
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

  // Server-only
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  RESEND_API_KEY: z.string().startsWith('re_'),
});

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  return parsed.data;
}

export const env = validateEnv();
```

```typescript
// src/lib/supabase.ts — Use validated env
import { env } from '@/lib/env';
import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);
```

### Key Rotation Procedure

```
1. Generate new key (provider dashboard)
2. Update all systems using the old key
   - Vercel environment variables
   - Supabase dashboard settings
   - Any other services
3. Deploy with new key
4. Verify everything works
5. Revoke old key after grace period (24-48 hours)
6. Document rotation in DECISIONS.md
```

### Secret Scanning

```bash
# Pre-commit hook (using husky + secretlint)
# package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "secretlint \"**/*\""
    }
  }
}

# Manual scan
npx secretlint "**/*"
npx gitleaks detect --source .
```

### Platform-Specific Secrets

| Platform | Where to Set | Notes |
|----------|-------------|-------|
| Vercel | Dashboard → Settings → Environment Variables | Set per environment (Preview/Production) |
| Supabase | Dashboard → Settings → API | Service role key in Settings → API |
| GitHub Actions | Repository → Settings → Secrets | Use `${{ secrets.KEY_NAME }}` |
| Docker | `.env` file or Docker secrets | Never in Dockerfile |

### Type-Safe Access Pattern

```typescript
// Safe access anywhere in the app
import { env } from '@/lib/env';

// Server components and route handlers
const apiKey = env.STRIPE_SECRET_KEY;

// Client components — only NEXT_PUBLIC_ vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
```

## Best Practices

- Validate ALL required variables at startup (fail fast)
- Use `.env.example` as living documentation
- Never commit actual secret values
- Use platform-specific secret storage (Vercel, Supabase dashboard)
- Rotate keys on a schedule (quarterly minimum)
- Audit who has access to production secrets
- Use least-privilege API keys (restrict scopes)
- Scan repos for leaked secrets (pre-commit hooks)
- Different keys for different environments
- Document every variable's purpose and source

## Anti-Patterns

- Not validating environment variables (silent failures)
- Using `NEXT_PUBLIC_` prefix for secrets (exposed to browser)
- Committing `.env` files to version control
- Hardcoding credentials in source code
- Using the same API key across dev/staging/prod
- Not rotating compromised keys
- Sharing secrets over chat/email
- Storing secrets in database without encryption
- Using production keys in development
- Not documenting what each variable is for

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
