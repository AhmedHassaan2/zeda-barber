# Good: Flat, Convention-Based Project Structure

```
src/
  app/
    layout.tsx           # Root layout (providers, fonts, metadata)
    page.tsx             # Home page
    dashboard/
      layout.tsx         # Dashboard layout (sidebar, nav)
      page.tsx           # Dashboard home
      settings/
        page.tsx         # Settings page
    api/
      users/
        route.ts         # GET/POST /api/users
      users/[id]/
        route.ts         # GET/PUT/DELETE /api/users/:id
  components/
    ui/
      button.tsx         # Reusable primitives
      input.tsx
      card.tsx
    dashboard/
      sidebar.tsx        # Domain-specific components
      stats-card.tsx
  lib/
    supabase/
      client.ts          # Browser client
      server.ts          # Server client
    utils.ts             # Pure utility functions
    validations.ts       # Zod schemas
  hooks/
    use-user.ts          # Custom React hooks
    use-theme.ts
  types/
    index.ts             # Shared TypeScript types
public/
  images/
  fonts/
```

## Key Principles

1. **Flat component tree** — no `components/shared/ui/common/` nesting
2. **Route colocation** — page files next to their route
3. **`lib/` for utilities** — server code, helpers, schemas
4. **`types/` for shared types** — single source of truth
5. **PascalCase for components**, camelCase for utilities
6. **No orphan files** — every file has a clear purpose
