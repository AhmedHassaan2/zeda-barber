---
name: prisma-patterns
description: Prisma ORM schema design, queries, migrations, and integration with Next.js
category: database
level: framework
priority: medium
dependencies: ["database-design"]
related_skills: ["database-design", "supabase-patterns"]
related_agents: ["database"]
activation_rules:
  - keywords: ["prisma", "schema.prisma", "findMany", "findFirst", "upsert"]
  - file_pattern: "prisma/**/*"
---

# Prisma Patterns

## Purpose

Guide Prisma ORM usage for type-safe database queries and schema management.

## When to Use

- Setting up Prisma schema
- Writing database queries
- Managing migrations
- Integrating with Next.js

## Core Concepts

### Schema Design

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  orders    Order[]
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}
```

### Queries

```typescript
// Find many with filters
const users = await prisma.user.findMany({
  where: { email: { contains: query } },
  orderBy: { createdAt: 'desc' },
  take: 20,
});

// Find with relations
const order = await prisma.order.findUnique({
  where: { id: orderId },
  include: { items: { include: { product: true } } },
});

// Upsert
const user = await prisma.user.upsert({
  where: { email: data.email },
  update: { name: data.name },
  create: { email: data.email, name: data.name },
});
```

### Transactions

```typescript
const result = await prisma.$transaction(async (tx) => {
  const order = await tx.order.create({ data: orderData });
  await tx.orderItem.createMany({ data: items.map(i => ({ ...i, orderId: order.id })) });
  return order;
});
```

## Best Practices

- Use `@map` and `@@map` for snake_case database columns
- Handle errors at every call site
- Use transactions for multi-step operations
- Keep Prisma client singleton in Next.js
- Use select to fetch only needed fields

## Anti-Patterns

- Using `any` with Prisma results
- Not using transactions for related writes
- Fetching all columns when only a few are needed
- Creating Prisma client on every request in Next.js
