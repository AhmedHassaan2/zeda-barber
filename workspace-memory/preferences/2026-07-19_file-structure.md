---
date: 2026-07-19
category: preferences
tags: [structure, organization, nextjs, files, architecture]
project: shared
severity: none
---

# Project File Structure

## Context

Every project in this workspace follows the same file structure. This makes it easy to navigate any project without learning its layout first.

## Content

**Standard Next.js App Router Structure:**
```
project/
├── src/
│   ├── app/
│   │   ├── (routes)/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   └── not-found.tsx
│   │   ├── api/
│   │   │   └── [endpoint]/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/           # Reusable primitives (Button, Input, Card)
│   │   ├── layout/       # Layout components (Header, Sidebar)
│   │   └── features/     # Feature-specific components
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts  # Browser client
│   │   │   └── server.ts  # Server client
│   │   ├── utils.ts       # Pure utility functions
│   │   └── constants.ts   # App constants
│   ├── hooks/            # Custom React hooks
│   ├── types/            # Shared TypeScript types
│   ├── contexts/         # React Context providers
│   └── styles/           # Global styles only
├── public/               # Static assets
├── supabase/
│   └── migrations/       # Database migrations
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

**Rules:**
- Components: flat `src/components/` — no deep nesting
- One component per file, file name matches component name
- `lib/` for utilities, hooks, contexts — never `utils/` folder
- API routes mirror URL structure in `src/app/api/`
- Types in `src/types/` for shared, co-located for component-specific

## Application

Every new project uses this structure. When in doubt, check existing projects for reference.

## Related

- `2026-07-19_typescript-conventions.md` — Naming conventions
- `2026-07-19_component-composition.md` — Component organization
