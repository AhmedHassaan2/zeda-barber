---
date: 2026-07-19
category: decisions
tags: [supabase, prisma, orm, database, architecture]
project: shared
severity: none
---

# Supabase Direct Client for Simple Projects

## Context

The workspace needs a default database approach. After evaluating Supabase client vs Prisma for different project complexities, this decision establishes a clear rule.

## Content

**Decision:** Use Supabase direct client by default. Use Prisma only for complex projects.

**Use Supabase Client when:**
- Simple CRUD operations
- Projects using Supabase Auth and Storage
- Real-time subscriptions needed
- RLS provides sufficient access control
- Team is familiar with SQL/PostgreSQL

**Use Prisma when:**
- Complex relational queries (many-to-many, aggregations)
- Multi-database support needed
- Schema is large (50+ tables) with complex migrations
- Need type-safe query builder with deep relations
- Team prefers ORM workflow

**Migration Path:**
Start with Supabase client. If queries become complex (deep nesting, complex joins), migrate to Prisma — the PostgreSQL schema remains the same.

```typescript
// Supabase — simple, direct
const { data } = await supabase.from("orders").select("*, items(*)").eq("user_id", userId);

// Prisma — for complex relations
const orders = await prisma.order.findMany({
  where: { userId },
  include: { items: { include: { product: true } } },
});
```

## Application

Default to Supabase client. Only introduce Prisma when query complexity demands it. Never use both in the same project.

## Related

- `2026-07-19_database-query-pattern.md` — Supabase query patterns
- `2026-07-19_no-rls-policies.md` — Always enable RLS
