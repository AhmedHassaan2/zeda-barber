---
name: error-tracking
description: Error tracking implementation, Sentry integration, and error categorization
category: observability
level: framework
priority: high
dependencies: []
related_skills: ["structured-logging", "monitoring-observability"]
related_agents: ["devops", "backend"]
activation_rules:
  - keywords: ["error", "Sentry", "exception", "crash", "tracking"]
---

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
