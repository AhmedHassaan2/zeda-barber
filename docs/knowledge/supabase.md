---
title: Supabase
description: Supabase reference documentation
---

# Supabase

# Supabase Knowledge Document

## Purpose

Supabase is an open-source Firebase alternative built on PostgreSQL. It provides a database (PostgreSQL), authentication, real-time subscriptions, edge functions, file storage, and vector embeddings — all with a unified API. It is the default backend for Ahmed's workspace projects, offering rapid development with production-grade capabilities.

## Core Concepts

### Architecture

Supabase layers services on top of PostgreSQL:
- **PostgreSQL Database** — Full SQL with extensions (pgvector, PostGIS, pgcrypto)
- **PostgREST** — Auto-generates REST API from database schema
- **GoTrue** — Authentication service (email, OAuth, magic links, phone)
- **Realtime** — WebSocket broadcasts for database changes
- **Storage** — S3-compatible file storage with image transformations
- **Edge Functions** — Deno-based serverless functions at the edge
- **GraphQL** — (Beta) Auto-generated GraphQL API from schema

### Client Libraries

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Service Role vs Anon Key

- **Anon key:** Public, used client-side. Respects Row Level Security (RLS). Never bypasses RLS.
- **Service role key:** Admin, used server-side only. Bypasses all RLS. Never expose to the client or commit to source control.

### Row Level Security (RLS)

RLS is PostgreSQL's native security layer. When enabled on a table, every query is filtered by policy. Without active RLS policies, all queries return empty results. RLS policies are SQL expressions that evaluate to `true` or `false`.

```sql
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

### Edge Functions

Deployed to Deno Deploy, close to users. Written in TypeScript, access Supabase services via service role key. Use for: webhook handlers, scheduled tasks, AI inference, payment processing, and operations requiring elevated privileges.

## Best Practices

1. **Always enable RLS on every table** — Never leave tables accessible without RLS policies. Even for public data, create an explicit `SELECT` policy with `true` as the condition.

2. **Use the anon key client-side, service role server-side** — Never mix them. The service role key bypasses ALL security checks and must never appear in client bundles.

3. **Write RLS policies with `auth.uid()` and `auth.jwt()`** — These functions evaluate at query time. `auth.uid()` returns the authenticated user's ID; `auth.jwt()` returns the full JWT payload.

4. **Use Supabase Storage for files, not the database** — Store file metadata (URL, size, type) in the database. Use Storage buckets with RLS for access control.

5. **Create database functions for complex logic** — Use `CREATE FUNCTION` with `SECURITY DEFINER` for operations requiring elevated access. Call them via `supabase.rpc('function_name')`.

6. **Use `select()` to limit returned columns** — Never call `.select()` without specifying columns on sensitive tables. Always return only what the client needs.

7. **Set up webhooks for async workflows** — Use Supabase webhooks or database webhooks to trigger Edge Functions on data changes (e.g., send email after user signup).

8. **Use `maybeSingle()` over `single()` when expecting null** — `single()` throws an error if no row is found. `maybeSingle()` returns `null`, which is often the expected behavior.

## Anti-Patterns

1. **Exposing the service role key to the client** — This completely disables all security. The service role key should only exist in server-side code (API routes, Edge Functions).

2. **Disabling RLS for "simplicity"** — RLS is your security layer. Without it, any authenticated or unauthenticated user can read/modify all data.

3. **Using RLS policies with subqueries that scan large tables** — RLS runs on every query. A policy with `USING (id IN (SELECT user_id FROM permissions))` scans the permissions table on every row access.

4. **Creating too many Supabase clients** — Instantiate one client per request. Use `createClient` at the top level of API routes, not inside loops or handlers.

5. **Ignoring Supabase's TypeScript types** — Generate types with `supabase gen types typescript --project-id your-project > database.types.ts`. Use them for type-safe queries.

6. **Using Edge Functions for everything** — Edge Functions have cold start times and limited execution. Use database webhooks or pg_cron for database-side automation.

7. **Not using Storage image transformations** — Supabase Storage provides on-the-fly image resizing. Use it instead of storing multiple sizes of the same image.

## Common Mistakes

1. **RLS returns empty results without errors** — When RLS is enabled but no policy matches, queries return empty arrays, not errors. Use `supabase.auth.getUser()` to verify authentication.

2. **Forgetting `WITH CHECK` on INSERT/UPDATE policies** — `USING` controls read access; `WITH CHECK` controls write access. You need both for UPDATE policies.

3. **Not using `eq()` filter on mutations** — Always add `.eq('id', specificId)` to UPDATE and DELETE operations. Without it, they affect all rows.

4. **Ignoring the 1MB Edge Function body limit** — Edge Functions have a 6MB request/response limit. For larger payloads, use Storage or direct database access.

5. **Using `insert()` without handling conflicts** — Use `.upsert()` or `.insert({ onConflict: 'column' })` to handle duplicate key errors gracefully.

6. **Not setting up email templates** — Default Supabase emails have generic branding. Customize them in Authentication > Email Templates for production.

7. **Using Realtime for critical data delivery** — Realtime is eventually consistent. For critical notifications, use webhooks or polling with confirmation.

## Decision Guidelines

- **Use Supabase when:** You need a PostgreSQL backend with auth, storage, and real-time in a TypeScript project. It eliminates boilerplate for common backend needs.
- **Use Edge Functions when:** You need server-side logic with service role access, webhook handling, or operations that can't be done client-side.
- **Use database functions when:** The logic must be atomic with the database operation (triggers, complex validations, computed fields).
- **Use Storage when:** You need file uploads, images, or documents. It handles access control via bucket policies.

## References

- Supabase Docs: https://supabase.com/docs
- Supabase GitHub: https://github.com/supabase/supabase
- Supabase Examples: https://github.com/supabase/supabase/tree/master/examples
- RLS Guide: https://supabase.com/docs/guides/auth/row-level-security
- Edge Functions: https://supabase.com/docs/guides/functions

## Practical Notes

- Generate TypeScript types: `npx supabase gen types typescript --project-id YOUR_PROJECT > src/types/database.types.ts`
- The Supabase CLI handles local development (`supabase start`), migrations, and deployment.
- Use `supabase db reset` to reset your local database to a clean state.
- Realtime requires enabling on specific tables: `ALTER PUBLICATION supabase_realtime ADD TABLE tablename;`
- For Next.js, use `@supabase/ssr` package for server-side rendering with cookie-based auth.
- Supabase free tier includes 500MB database, 1GB file storage, 500K Edge Function invocations.

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
