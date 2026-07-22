# Next.js App Router — Knowledge Reference

## Purpose

Comprehensive reference for Next.js 14+ App Router development, covering server/client component architecture, data fetching patterns, routing conventions, and deployment optimization. This guide targets production applications using the App Router paradigm.

## Core Concepts

### App Router Architecture

The App Router uses a file-system based router built on React Server Components. Every folder under `src/app/` becomes a route segment. The special `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` files define route behavior.

```
src/app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── about/
│   └── page.tsx        # /about
├── dashboard/
│   ├── layout.tsx      # Dashboard layout
│   ├── page.tsx        # /dashboard
│   └── settings/
│       └── page.tsx    # /dashboard/settings
└── api/
    └── users/
        └── route.ts    # API route
```

### Server Components (Default)

All components in the App Router are Server Components by default. They execute on the server, have zero client-side JavaScript, and can directly access databases, file systems, and backend services.

### Client Components

Mark components with `'use client'` directive at the top of the file. Client Components are pre-rendered on the server (SSR) and then hydrated on the client. They support `useState`, `useEffect`, event handlers, and browser APIs.

### Layouts

Layouts wrap pages and persist across navigations. They do not re-render on route changes. Nested layouts compose hierarchically — each `layout.tsx` receives `children` and its own `params`.

### Data Fetching

Native `fetch()` in Server Components is automatically deduplicated and cached. Use `cache: 'force-cache'` (static) or `cache: 'no-store'` (dynamic) to control behavior. Route Segment Config (`export const dynamic = 'force-dynamic'`) overrides per-route.

### Server Actions

Server Actions are async functions marked with `'use server'` that run on the server. They can be called from Client Components via form submissions or event handlers. They return plain serializable data.

### Middleware

Middleware runs before a request is completed. Place `middleware.ts` at the project root. It can modify the request `NextResponse`, rewrite URLs, redirect, set headers, and read cookies/headers.

### Metadata API

Export a `metadata` object or `generateMetadata` function from `layout.tsx` or `page.tsx`. Supports static metadata, dynamic metadata via functions, and parent metadata inheritance via `generateMetadata`.

### Caching Strategies

- **Static Rendering**: Content generated at build time, served from CDN
- **Dynamic Rendering**: Content generated at request time
- **ISR (Incremental Static Regeneration)**: `revalidate` option on `fetch` or route segment
- **Streaming**: `loading.tsx` + `Suspense` for progressive rendering

## Best Practices

1. **Keep Server Components as the default** — only add `'use client'` when you need interactivity, browser APIs, or React hooks that require client state
2. **Push Client Components to leaf nodes** — create small interactive components and compose them inside Server Components rather than making entire pages client-rendered
3. **Use parallel routes for complex layouts** — `@slot` routes allow independent loading states and error boundaries for split-view UIs
4. **Colocate data fetching with components** — fetch data in the component that needs it, not in parent layouts unless shared
5. **Use `React.cache()` for request-level deduplication** — when the same data is needed in multiple Server Components during a single request
6. **Define TypeScript types for params and searchParams** — always type `params: { slug: string }` and `searchParams: { [key: string]: string | string[] | undefined }`
7. **Use `next/image` for all images** — it handles lazy loading, responsive sizing, format conversion, and prevents layout shift
8. **Prefer Route Handlers over API routes for external consumers** — keep data fetching in Server Components for internal use, use Route Handlers for public APIs

## Anti-Patterns

1. **Making entire layout files client components** — layouts should be Server Components; extract interactive sections into child Client Components
2. **Passing non-serializable props to Server Components** — no functions, classes, or Date objects across server/client boundary
3. **Using `useRouter` in Server Components** — use `redirect()` from `next/navigation` instead
4. **Fetching data in `useEffect` for initial loads** — use Server Components for initial data; reserve `useEffect` for client-only updates
5. **Ignoring the hydration boundary** — when mixing server and client, ensure the client component tree is properly bounded with `'use client'`
6. **Using `force-dynamic` as a blanket solution** — this disables all caching; be specific with per-fetch options instead
7. **Writing large Server Actions as monoliths** — decompose into focused actions with clear input/output contracts
8. **Overusing `next/dynamic` without fallbacks** — always provide `loading` or `ssr: false` for dynamic imports

## Common Mistakes

1. **Forgetting `'use client'` on components using hooks** — runtime error when a client-only hook runs in a Server Component
2. **Passing async functions as props** — Server Components can be async, but their children receiving async props cannot serialize them
3. **Using `window`/`document` in Server Components** — these are browser-only globals; guard with `typeof window !== 'undefined'` or keep in Client Components
4. **Not typing route params** — `params` comes as `Promise<{}>` in Next.js 15+; always await and type explicitly
5. **Mutating URL state without `useRouter`** — use `router.push()` or `router.replace()` for navigation, not direct URL manipulation
6. **Ignoring `Suspense` boundaries for streaming** — without them, the entire page blocks on slow data fetches
7. **Hardcoding environment variables** — use `NEXT_PUBLIC_` prefix for client-exposed vars, server-only for secrets
8. **Not using `loading.tsx` for slow routes** — users see a blank screen during slow navigations without loading states

## Decision Guidelines

| Scenario | Approach |
|---|---|
| Needs `useState`/`useEffect` | Client Component |
| Accesses database directly | Server Component |
| Handles user interaction | Client Component |
| Shared layout with persistence | Layout (Server) |
| One-time data fetch | Page-level Server Component |
| Real-time updates (WebSocket) | Client Component |
| SEO-critical content | Server Component + Metadata API |
| Form with server mutation | Server Action + Client form |
| Progressive loading | `Suspense` + `loading.tsx` |
| Conditional client/server rendering | Compose Server parent → Client children |

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components RFC](https://github.com/reactjs/rfcs/pull/188)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Server Actions Reference](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## Practical Notes

- Server Components cannot be tested with standard React Testing Library — test the Server Component's output through integration tests or extract logic into testable utility functions
- Layouts do not receive `searchParams` in Next.js 15+; pass them through `children` props if needed
- When deploying to Vercel, ISR revalidation happens at the edge; self-hosted requires a CDN or polling strategy
- Use `after()` API (Next.js 15+) for non-blocking post-response work like analytics and logging
- Cache invalidation uses `revalidateTag()` and `revalidatePath()` — tag your fetches for granular control
