# Vercel Knowledge Document

## Purpose

Vercel is a frontend cloud platform optimized for Next.js and modern web frameworks. It provides zero-configuration deployments, serverless/edge functions, ISR/SSR/SSG support, image optimization, analytics, and global CDN. Vercel is the default deployment target for Ahmed's workspace projects, offering seamless integration with Next.js App Router and Git-based workflows.

## Core Concepts

### Deployment Model

Vercel deploys from Git repositories (GitHub, GitLab, Bitbucket). Pushing to the main branch triggers a production deployment. Every push creates a unique deployment URL for preview. Vercel builds, optimizes, and distributes your application to its global edge network automatically.

### Rendering Strategies

- **SSG (Static Site Generation)** — Pages are pre-rendered at build time. Fastest possible performance. Use for: marketing pages, blog posts, documentation.
- **SSR (Server-Side Rendering)** — Pages are rendered on every request at the edge. Use for: personalized content, user-specific data.
- **ISR (Incremental Static Regeneration)** — Pages are statically generated but revalidated periodically or on-demand. Use for: product pages, content that changes infrequently.
- **Edge Rendering** — Pages rendered on Vercel's edge network (V8 isolates, ~50ms cold start). Use for: latency-sensitive dynamic content.

### Edge Functions vs Serverless Functions

- **Edge Functions:** Run on V8 isolates at the edge. Cold start <50ms. Limited APIs (no Node.js `fs`, limited crypto). Use for: middleware, A/B testing, geolocation, auth checks.
- **Serverless Functions:** Run on Node.js in AWS Lambda. Cold start 100-500ms. Full Node.js API. Use for: database queries, heavy computation, file processing.

### Middleware

Middleware runs before a request is completed. It can modify headers, redirect, rewrite URLs, and implement authentication. Middleware runs at the edge globally. Place it at `src/middleware.ts` or `middleware.ts`.

### Image Optimization

`next/image` with Vercel automatically optimizes images: format conversion (WebP/AVIF), responsive resizing, lazy loading, and CDN caching. Configure remote patterns in `next.config.js`.

```javascript
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  }
}
```

### Analytics and Speed Insights

Vercel Analytics tracks Web Vitals (LCP, FID, CLS, TTFB) and custom metrics. Speed Insights provides real-user performance data. Both are privacy-focused and don't use cookies.

## Best Practices

1. **Use ISR over SSR for most dynamic pages** — ISR gives you static performance with dynamic content. Set `revalidate: 60` for pages that update every minute. Use `revalidatePath()` for on-demand revalidation.

2. **Place authentication in Middleware** — Middleware runs before any page or API route. Check auth tokens, redirect unauthorized users, and set request headers in `src/middleware.ts`.

3. **Use Edge Runtime for API routes when possible** — Edge API routes have <50ms cold starts and run globally. Use `export const runtime = 'edge'` for routes that don't need Node.js APIs.

4. **Configure `next.config.js` for Vercel optimization** — Enable `output: 'standalone'` for smaller builds. Configure image domains, redirects, and rewrites in `next.config.js`.

5. **Use Environment Variables correctly** — Prefix public variables with `NEXT_PUBLIC_`. Server-only variables are automatically excluded from the client bundle. Configure in Vercel Dashboard or `.env` files.

6. **Use Vercel CLI for local development** — `vercel dev` replicates the Vercel environment locally, including edge functions, serverless functions, and environment variables.

7. **Leverage preview deployments for PRs** — Every pull request gets a unique preview URL. Use this for visual regression testing, stakeholder review, and integration testing.

8. **Set up domain configuration early** — Add custom domains in the Vercel Dashboard. Vercel handles SSL certificates automatically. Use `vercel domains add` via CLI.

## Anti-Patterns

1. **Using `getServerSideProps` for everything** — `getServerSideProps` runs on every request and defeats caching. Use ISR (`getStaticProps` with `revalidate`) or Edge Runtime when possible.

2. **Ignoring bundle size** — Vercel deploys the entire bundle to the edge. Use dynamic imports (`next/dynamic`), tree shaking, and the `@next/bundle-analyzer` to keep bundles small.

3. **Hardcoding environment-specific URLs** — Use environment variables for API endpoints, database URLs, and service URLs. Never hardcode production URLs in code.

4. **Not using `next/image` for images** — Raw `<img>` tags bypass Vercel's optimization pipeline. Always use `next/image` for performance benefits.

5. **Deploying without running `next build` locally** — Test builds locally before pushing. `next build` catches TypeScript errors, missing dependencies, and configuration issues.

6. **Ignoring Edge Runtime limitations** — Edge Runtime doesn't support all Node.js APIs. Test edge-compatible code locally with `vercel dev --edge`.

7. **Using `fetch` without caching configuration** — Next.js 15+ caches fetch by default. Use `{ cache: 'no-store' }` for real-time data or `{ next: { revalidate: 60 } }` for ISR.

## Common Mistakes

1. **Forgetting `NEXT_PUBLIC_` prefix for client-side env vars** — Variables without this prefix are not exposed to the client bundle. This causes undefined values in browser code.

2. **Not handling deployment failures** — Vercel sends deployment notifications. Set up Slack/Discord notifications and check build logs for failed deployments.

3. **Using `res.json()` in Edge Runtime** — Edge functions use Web APIs: `Response.json()`, not `res.json()`. The `res` object is only available in Node.js runtime.

4. **Missing `export const dynamic = 'force-dynamic'`** — Next.js 15+ statically renders by default. Add this export to pages that need dynamic rendering.

5. **Not configuring `rewrites` for API proxying** — Use `rewrites` in `next.config.js` to proxy API calls to external services. This avoids CORS issues and keeps API keys server-side.

6. **Ignoring Vercel's function timeout limits** — Free tier: 10s (Serverless), 30s (Edge). Pro tier: 300s (Serverless), 30s (Edge). Design functions to complete within limits.

7. **Not using `vercel pull` to sync env vars** — `vercel pull` downloads environment variables from Vercel to your local `.env.local`. This keeps local and production environments in sync.

## Decision Guidelines

- **Use Vercel when:** Your project is Next.js-based, you want zero-config deployment, or you need global edge performance with minimal infrastructure management.
- **Use SSR when:** Content changes per-request and requires real-time data (user dashboards, admin panels).
- **Use ISR when:** Content updates periodically but should serve from cache (product pages, blog posts, documentation).
- **Use SSG when:** Content rarely changes (landing pages, about pages, legal pages).
- **Use Edge Functions when:** You need low-latency logic at the edge (auth, A/B testing, geolocation).
- **Use Serverless Functions when:** You need Node.js APIs, database access, or heavy computation.

## References

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Blog: https://vercel.com/blog
- Vercel CLI: https://vercel.com/docs/cli
- Vercel Templates: https://vercel.com/templates
- Next.js Learn: https://nextjs.org/learn

## Practical Notes

- `vercel` deploys to preview; `vercel --prod` deploys to production.
- `vercel env add` adds environment variables; `vercel env pull` downloads them locally.
- `vercel logs <deployment-url>` streams real-time logs for a deployment.
- `vercel inspect <deployment-url>` shows deployment details and function logs.
- Vercel automatically detects the framework (Next.js, Remix, Astro, etc.) from `package.json`.
- Use `vercel.json` for advanced configuration: redirects, rewrites, headers, functions config.
- Vercel's free tier: 100GB bandwidth, 1000 build minutes/month, unlimited deployments.
- For monorepos, configure `vercel.json` with `buildCommand` and `outputDirectory` per package.
