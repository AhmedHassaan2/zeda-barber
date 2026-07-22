---
title: Prisma
description: Prisma reference documentation
---

# Prisma

# Prisma ORM Knowledge Document

## Purpose

Prisma is a next-generation TypeScript ORM that provides type-safe database access, automated migrations, and an intuitive schema definition language. It eliminates raw SQL for common operations while keeping SQL accessible when needed. Prisma generates a fully typed client from your schema, catching errors at compile time rather than runtime.

## Core Concepts

### Schema Definition (`schema.prisma`)

The schema is the single source of truth for your database structure. It defines models, fields, relations, enums, and composite types. The schema uses its own DSL (not TypeScript) but generates TypeScript types.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
  @@index([email])
}
```

### Relations

Prisma supports one-to-one, one-to-many, and many-to-many relations. Implicit many-to-many creates a join table automatically; explicit many-to-many gives you full control over the join model.

### Client Generation

`npx prisma generate` produces the typed client. The client mirrors your schema models as TypeScript types and provides CRUD methods with full type inference.

### Migrations

`npx prisma migrate dev` creates and applies migrations during development. `npx prisma migrate deploy` applies pending migrations in production. Migrations are plain SQL files stored in `prisma/migrations/`.

### Transactions

Prisma supports interactive transactions (`$transaction(async (tx) => { ... })`) for multi-step operations that must succeed or fail atomically. Batch operations use `prisma.$transaction([...queries])`.

## Best Practices

1. **Use `cuid()` or `uuid()` for primary keys** — Auto-incrementing integers leak record counts and create hot spots in distributed systems. CUIDs are collision-resistant and sort chronologically.

2. **Always use `@@map` and `@map`** — Map Prisma naming (camelCase) to database naming (snake_case) explicitly. This prevents accidental naming mismatches when introspecting.

3. **Add indexes for frequently queried fields** — Use `@@index([field])` for single fields and `@@index([field1, field2])` for composite queries. Add `@unique` for fields that must be distinct.

4. **Use `select` and `include` deliberately** — Never fetch entire relations with `include` when you only need a subset of fields. Use `select` to pick specific fields and reduce data transfer.

5. **Prefer interactive transactions over raw SQL** — Use `$transaction` for multi-model operations instead of manual BEGIN/COMMIT. Prisma handles connection management and rollback automatically.

6. **Use `@default(dbgenerated("gen_random_uuid()"))` for PostgreSQL UUIDs** — Let the database generate UUIDs rather than the application layer for consistency across services.

7. **Keep migrations small and atomic** — One migration per logical change. Never modify a migration file after it has been applied to production.

8. **Use `prisma migrate resolve` for production issues** — When migrations fail in production, resolve them with `--rolled-back` or `--applied` before attempting new migrations.

## Anti-Patterns

1. **N+1 queries without batching** — Loading a list of items then individually fetching relations for each creates O(n) queries. Use `include` or `findMany` with nested selects instead.

2. **Storing large blobs in the database** — Prisma handles blob fields poorly at scale. Use Supabase Storage or S3 and store only the URL/reference in the database.

3. **Using `any` types to bypass Prisma's type system** — The entire value of Prisma is type safety. Using `any` defeats the purpose and reintroduces runtime errors.

4. **Modifying production databases outside migrations** — Manual SQL changes bypass Prisma's migration tracking and create drift between schema and database.

5. **Over-indexing tables** — Every index slows writes. Only add indexes for fields that appear in WHERE, ORDER BY, or JOIN clauses in actual queries.

6. **Using `findUnique` with non-unique fields** — Always query unique fields with `findUnique` and non-unique with `findMany`. Misusing these creates confusing behavior.

7. **Ignoring connection pool settings** — Default pool size is 10. For high-concurrency apps, configure `connection_limit` in the database URL or via pool settings.

## Common Mistakes

1. **Forgetting `@updatedAt`** — Without it, the `updatedAt` field never updates automatically. Always add it to mutable models.

2. **Circular relations without back-references** — If model A references model B, model B must also reference A in the schema. Prisma requires explicit back-references.

3. **Using `create` inside loops** — Each `create` is a separate database round-trip. Batch with `createMany` or `$transaction` instead.

4. **Not using `@@index` on foreign keys** — Prisma does not auto-index foreign key fields. Add explicit indexes on all relation fields.

5. **Assuming `null` and `undefined` are equivalent** — In Prisma filters, `null` means "is null" and `undefined` means "omit this filter." They produce different SQL.

6. **Running `migrate deploy` with pending dev migrations** — Development migrations may contain breaking changes. Always test with `migrate deploy` in a staging environment first.

7. **Not using `select` for list endpoints** — Returning all fields on list pages wastes bandwidth. Use `select` to return only what the UI needs.

## Decision Guidelines

- **Use Prisma when:** Your project is TypeScript-first, you want type-safe queries, you need automated migrations, or your team prefers an ORM over raw SQL.
- **Use raw SQL when:** You need complex analytical queries, CTEs, window functions, or database-specific features Prisma's query API doesn't support. Prisma supports `$queryRaw` and `$executeRaw` for these cases.
- **Use Prisma with Supabase:** Connect Prisma to Supabase's PostgreSQL but manage RLS at the database level. Prisma doesn't natively handle RLS — use database roles or middleware.

## References

- Prisma Docs: https://www.prisma.io/docs
- Prisma Examples: https://github.com/prisma/prisma-examples
- Prisma Data Platform: https://www.prisma.io/data-platform
- Prisma Migrate Reference: https://www.prisma.io/docs/orm/prisma-migrate

## Practical Notes

- Run `npx prisma studio` to visually browse and edit your database.
- Use `npx prisma introspect` to generate a schema from an existing database.
- The generated client is in `node_modules/.prisma/client` — never edit it manually.
- Prisma supports `@prisma/client` versioning; pin it in `package.json` to avoid surprises.
- For connection pooling in serverless (Vercel/Supabase Edge), use PgBouncer or Prisma Accelerate.
- Use `prisma generate` in your `postinstall` script to keep the client in sync after `npm install`.

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
