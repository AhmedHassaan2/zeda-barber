---
date: 2026-07-19
category: preferences
tags: [typescript, naming, conventions, types, style]
project: shared
severity: none
---

# TypeScript Conventions

## Context

Consistent TypeScript conventions across the workspace reduce cognitive load and make code review faster. These are the agreed-upon patterns.

## Content

**Naming Conventions:**
| Element | Convention | Example |
|---|---|---|
| Variables | camelCase | `userName`, `isActive` |
| Functions | camelCase | `getUserById()`, `formatCurrency()` |
| Components | PascalCase | `UserProfile`, `NavBar` |
| Types/Interfaces | PascalCase | `UserProfile`, `ApiResponse` |
| Files | kebab-case | `user-profile.tsx`, `api-helpers.ts` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRIES` |
| Enums | PascalCase | `UserRole.Admin` |
| Type files | `types.ts` or `*.types.ts` | `user.types.ts` |

**Type Patterns:**
```typescript
// Prefer interfaces for objects
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// Use type for unions and intersections
type UserRole = "admin" | "editor" | "viewer";

// Use Zod for runtime validation, derive types
const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
type User = z.infer<typeof UserSchema>;

// API responses use consistent type
interface ApiResponse<T> {
  data: T;
  error?: string;
}
```

**Rules:**
- No `any` — use `unknown` and narrow
- No `enum` for simple strings — use union types
- Export types alongside their implementations
- Prefix boolean variables with `is`, `has`, `should`, `can`
- Use `readonly` for arrays and objects that shouldn't mutate

## Application

Follow these conventions in all new code. When editing existing code, match the file's current style.

## Related

- `2026-07-19_typescript-strict-mode.md` — Strict mode decision
- `2026-07-19_file-structure.md` — File organization
