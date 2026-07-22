---
title: Prisma ORM schema design, queries, migrations, and integration with Next.js
description: Prisma ORM schema design, queries, migrations, and integration with Next.js
---

# Prisma ORM schema design, queries, migrations, and integration with Next.js

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>prisma-patterns</code> | <strong>Category:</strong> database | <strong>Priority:</strong> medium | <strong>Level:</strong> framework
</div>

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
