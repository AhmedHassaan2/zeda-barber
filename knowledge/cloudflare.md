# Cloudflare Knowledge Document

## Purpose

Cloudflare provides a comprehensive edge computing and security platform. Its ecosystem includes CDN, DNS, WAF, DDoS protection, serverless compute (Workers), object storage (R2), relational database (D1), key-value storage (KV), durable state (Durable Objects), and AI inference (Workers AI). Cloudflare's edge network spans 300+ cities globally, enabling low-latency compute close to users.

## Core Concepts

### Cloudflare Workers

Workers run JavaScript/TypeScript at the edge using V8 isolates. They cold-start in under 5ms (vs. 100ms+ for Lambda). Workers have a 10ms CPU time limit on the free plan (50ms on paid). They use the Web Standards API (Request, Response, fetch, crypto, etc.).

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return new Response('Hello from the edge!')
  }
}
```

### Workers KV

A globally distributed key-value store with eventual consistency. Write propagation takes ~60 seconds. Optimized for read-heavy workloads. Maximum value size: 25MB (free) / 128MB (paid). Use for: configuration, feature flags, cached data, session storage.

### Workers R2

S3-compatible object storage with zero egress fees. Supports multipart uploads, lifecycle rules, and direct access via Workers. Ideal for: file uploads, static assets, backups, media storage. Integrated with Workers for application-level access control.

### Workers D1

SQLite-based relational database at the edge. Serverless with automatic replication. Use for: structured data requiring SQL queries, user data, transactional workloads. Supports prepared statements and batch operations.

### Durable Objects

Strongly consistent, single-threaded stateful objects at the edge. Each Durable Object has a unique ID, runs in a single location, and maintains in-memory state. Use for: real-time collaboration, game state, rate limiting, WebSocket management.

### Cloudflare Pages

JAMstack hosting with automatic deployments from Git. Supports Next.js, Remix, Astro, and other frameworks. Free tier includes 500 builds/month and unlimited bandwidth. Server-side rendering via Functions (same runtime as Workers).

## Best Practices

1. **Use Workers for latency-sensitive API routes** — Workers execute in 300+ edge locations. Route user-facing API calls through Workers for sub-50ms response times globally.

2. **Use R2 over external object storage** — R2 has zero egress fees and S3-compatible API. Use `@aws-sdk/client-s3` with R2 endpoints for easy migration from AWS S3.

3. **Batch KV reads with `KV.getWithMetadata()`** — Individual KV reads are fast but batch operations reduce round-trips. Cache frequently accessed KV data in Worker memory.

4. **Use D1 for relational data at the edge** — D1 replicates to edge locations near your users. Use prepared statements and batch operations for performance.

5. **Implement Durable Objects for WebSocket management** — Durable Objects provide single-point-of-contact WebSocket handling. Each user can connect to a Durable Object instance for real-time updates.

6. **Use Cloudflare Pages for static + SSR hybrid** — Pages handles static assets with CDN caching and routes dynamic requests to Functions. Best of both worlds.

7. **Set appropriate cache TTLs** — Use `Cache-Control` headers with `s-maxage` for CDN caching. Use `stale-while-revalidate` for serving cached content during revalidation.

8. **Use Wrangler for local development** — `wrangler dev` provides a local development environment that emulates Workers, KV, D1, and R2. Test edge behavior locally before deploying.

## Anti-Patterns

1. **Using Workers for long-running tasks** — Workers have execution time limits (10ms-30ms CPU). Use Queues or external services for background processing.

2. **Assuming KV consistency** — KV is eventually consistent (~60s propagation). Never use KV for data that requires immediate consistency across regions.

3. **Storing large objects in KV** — KV is optimized for small values (<1MB). Use R2 for files, images, and large data. KV is for configuration and metadata.

4. **Hardcoding secrets in Workers** — Use `wrangler secret put` or environment variables via `wrangler.toml`. Never commit secrets to source control.

5. **Ignoring Worker size limits** — Workers have a 1MB (free) / 10MB (paid) size limit. Keep code minimal and externalize large data to KV or R2.

6. **Using D1 for analytics workloads** — D1 is optimized for transactional queries. For analytics, use ClickHouse or a dedicated analytics service.

7. **Not using Cloudflare's WAF rules** — Enable managed WAF rules and set up custom rules for API protection. The free plan includes basic WAF rules.

## Common Mistakes

1. **Using `fetch()` inside Workers without handling errors** — Always wrap external fetch calls in try/catch. Network errors in Workers don't automatically retry.

2. **Forgetting CORS headers in API Workers** — Workers don't automatically set CORS headers. Add them explicitly: `Access-Control-Allow-Origin: *`.

3. **Not using `ctx.waitUntil()` for async operations** — Background tasks (logging, analytics) must use `ctx.waitUntil()`. Without it, the Worker may terminate before the task completes.

4. **Assuming Workers have filesystem access** — Workers run in V8 isolates with no filesystem. Use R2, KV, or D1 for data persistence.

5. **Not configuring `wrangler.toml` bindings** — Bindings (KV, D1, R2) must be declared in `wrangler.toml`. Without bindings, Workers can't access storage resources.

6. **Ignoring rate limiting** — Workers don't have built-in rate limiting. Use Durable Objects or a third-party service to implement rate limiting.

7. **Using `new Date()` without timezone handling** — Workers run in UTC by default. Use `Intl.DateTimeFormat` or explicit timezone handling for user-facing dates.

## Decision Guidelines

- **Use Workers when:** You need edge compute, API routing, request transformation, or low-latency responses globally.
- **Use KV when:** You need eventually-consistent configuration, feature flags, or cached data with high read volume.
- **Use R2 when:** You need file/object storage with zero egress fees. It's S3-compatible, so migration is straightforward.
- **Use D1 when:** You need a relational database at the edge with SQL support. For complex queries or analytics, use PostgreSQL on Supabase instead.
- **Use Durable Objects when:** You need strongly consistent state, WebSocket management, or real-time collaboration at the edge.
- **Use Pages when:** You have a JAMstack or hybrid static/dynamic site. It's simpler than managing Workers for web applications.

## References

- Cloudflare Workers Docs: https://developers.cloudflare.com/workers/
- Workers KV: https://developers.cloudflare.com/kv/
- R2: https://developers.cloudflare.com/r2/
- D1: https://developers.cloudflare.com/d1/
- Durable Objects: https://developers.cloudflare.com/durable-objects/
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler/
- Cloudflare Discord: https://discord.cloudflare.com

## Practical Notes

- `wrangler init` scaffolds a new Workers project with TypeScript support.
- `wrangler dev` starts a local development server emulating the edge runtime.
- `wrangler deploy` deploys to Cloudflare's edge network in seconds.
- `wrangler r2 bucket create bucket-name` creates an R2 bucket.
- `wrangler d1 create database-name` creates a D1 database.
- Use `wrangler.toml` to configure bindings, routes, and environment variables.
- For Next.js on Cloudflare, use `@cloudflare/next-on-pages` adapter.
- Cloudflare's free tier includes: 100K Workers requests/day, 10GB KV storage, 10GB R2 storage, 5GB D1 storage.
