---
title: Error tracking implementation, Sentry integration, and error categorization
description: Error tracking implementation, Sentry integration, and error categorization
---

# Error tracking implementation, Sentry integration, and error categorization

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>error-tracking</code> | <strong>Category:</strong> observability | <strong>Priority:</strong> high | <strong>Level:</strong> framework
</div>

# Error Tracking

## Purpose

Guide error tracking implementation for production monitoring.

## When to Use

- Setting up error tracking
- Categorizing errors
- Implementing error boundaries
- Debugging production issues

## Core Concepts

### Sentry Setup

```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
```

### Error Boundary

```tsx
// src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Error Categories

| Category | Level | Action |
|----------|-------|--------|
| Network | warning | Retry logic |
| Validation | info | Show user message |
| Auth | warning | Redirect to login |
| Server | error | Alert team |
| Critical | fatal | Page down alert |

## Best Practices

- Track all errors in production
- Add context (user, request, state)
- Categorize errors by severity
- Set up alerts for critical errors
- Use error boundaries in React
- Don't swallow errors silently
- Clean up old error data

## Anti-Patterns

- Not tracking errors in production
- Swallowing errors silently
- Not adding context to errors
- Using alerts for non-critical errors
- Ignoring error trends

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
