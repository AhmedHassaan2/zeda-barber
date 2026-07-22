---
date: 2026-07-19
category: decisions
tags: [typescript, strict, any, conventions, type-safety]
project: shared
severity: none
---

# TypeScript Strict Mode — Always

## Context

Early projects in this workspace used TypeScript without strict mode, leading to `any` leakage and runtime errors that types should have caught. This decision was made to enforce strict mode in every project.

## Content

**Decision:** All TypeScript projects use `strict: true` in tsconfig.json.

**Rules:**
- `noImplicitAny: true` — never allow implicit `any`
- `strictNullChecks: true` — always handle null/undefined
- `noUncheckedIndexedAccess: true` — array/object access returns `T | undefined`
- `exactOptionalPropertyTypes: true` — distinguish `undefined` from missing

**Never use `any`.** Alternatives:
```typescript
// Bad
function process(data: any) { return data.value; }

// Good
function process(data: Record<string, unknown>) {
  return (data as { value: string }).value;
}

// Better — use a type
interface ProcessInput { value: string; }
function process(data: ProcessInput) { return data.value; }
```

**When `unknown` is appropriate:**
- External API responses before validation
- Dynamic imports
- User input before Zod parsing

## Application

Every new project starts with strict mode. If you find `any` in existing code, replace it during your next edit to that file.

## Related

- `2026-07-19_typescript-conventions.md` — Naming conventions
- `2026-07-19_missing-error-handling.md` — TypeScript catches many errors at compile time
