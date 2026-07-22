---
date: 2026-07-19
category: patterns
tags: [react, error-boundary, fallback, recovery, nextjs]
project: shared
severity: none
---

# Error Boundary and Fallback Patterns

## Context

Errors happen. This workspace handles them at every boundary: server errors in API routes, component errors via boundaries, async errors via error.tsx, and not-found via not-found.tsx.

## Content

**Client Error Boundary (class component):**
```typescript
"use client";
interface Props { children: React.ReactNode; fallback?: React.ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

function ErrorFallback({ error }: { error: Error | null }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground mt-2">{error?.message}</p>
    </div>
  );
}
```

**Next.js Route-Level Error Handling:**
```
app/
  error.tsx      — client component for runtime errors
  not-found.tsx  — 404 page
  loading.tsx    — Suspense fallback
  api/.../
    route.ts     — try/catch in every handler
```

**Async Error Pattern:**
```typescript
async function safeAction<T>(fn: () => Promise<T>): Promise<{ data: T | null; error: string | null }> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (e) {
    console.error("Action failed:", e);
    return { data: null, error: "An unexpected error occurred" };
  }
}
```

## Application

- Wrap each route segment in error.tsx
- Use ErrorBoundary for widget-level isolation
- Never expose stack traces to users
- Log errors to console for debugging, return generic messages

## Related

- `2026-07-19_missing-error-handling.md` — Critical mistake to avoid
- `2026-07-19_api-route-pattern.md` — API-level error handling
