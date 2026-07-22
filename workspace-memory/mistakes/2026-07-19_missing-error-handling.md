---
date: 2026-07-19
category: mistakes
tags: [error-handling, boundaries, logging, catch]
project: shared
severity: high
---

# Always Handle Errors at Boundaries

## Context

Multiple incidents where unhandled promise rejections or missing try/catch blocks caused silent failures. Users saw blank screens or incomplete data with no error message.

## Content

**The Mistake:**
```typescript
// Fire and forget — errors vanish
fetch("/api/data").then(res => res.json());

// Missing catch on async
async function loadData() {
  const data = await fetchData(); // If this throws, component crashes
  setState(data);
}
```

**The Fix:**
```typescript
// Always handle both success and error
try {
  const res = await fetch("/api/data");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  setData(data);
} catch (err) {
  console.error("Failed to load data:", err);
  setError("Unable to load data. Please try again.");
}
```

**Boundaries That Need Error Handling:**
1. API routes — try/catch around every handler
2. Server Components — error.tsx for each segment
3. Client Components — ErrorBoundary wrapper
4. Form submissions — loading/error states
5. External API calls — timeout + retry logic

**Never do:**
- `.then()` without `.catch()`
- `async` functions without try/catch
- `void` async calls without error observation
- Swallowing errors with empty catch blocks

## Application

Every external call (fetch, database, filesystem) must have error handling. Check console for unhandled rejections regularly.

## Related

- `2026-07-19_error-boundary-pattern.md` — Error boundary patterns
- `2026-07-19_api-route-pattern.md` — API error handling
