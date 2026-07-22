# Web Performance — Knowledge Base

## Purpose

Web performance directly impacts user experience, conversion rates, and SEO rankings. This knowledge base covers Core Web Vitals, optimization strategies, and practical techniques for building fast Next.js applications that score well on Lighthouse and provide excellent user experiences.

## Core Concepts

### Core Web Vitals

Google's Core Web Vitals are the primary metrics for measuring user experience:

**Largest Contentful Paint (LCP)**
Measures loading performance. The largest visible element should render within 2.5 seconds of page load.
- Target: ≤ 2.5 seconds
- Factors: server response time, resource load speed, render delay

**First Input Delay (FID) / Interaction to Next Paint (INP)**
Measures interactivity. FID measures time from first interaction to browser response. INP (replacing FID in 2024) measures responsiveness throughout the session.
- Target: INP ≤ 200ms
- Factors: main thread blocking time, JavaScript execution time

**Cumulative Layout Shift (CLS)**
Measures visual stability. Unexpected layout shifts that occur during page lifecycle.
- Target: ≤ 0.1
- Factors: images without dimensions, dynamically injected content, web fonts causing FOIT/FOUT

### Loading Optimization

**Code Splitting**
Breaking JavaScript bundles into smaller chunks loaded on demand. Next.js does this automatically per route with App Router.

**Lazy Loading**
Deferring loading of non-critical resources until they're needed. Images, below-the-fold content, and non-essential components.

**Prefetching**
Loading resources before they're needed. Next.js Link component prefetches pages by default. Use `next/dynamic` for component-level code splitting.

### Caching Strategies

**Browser Cache:** HTTP cache headers (`Cache-Control`, `ETag`, `Last-Modified`)
**CDN Cache:** Edge caching for static assets and server-rendered pages
**Application Cache:** In-memory or Redis caching for database queries
**Service Worker Cache:** Offline-first caching for progressive web apps

### Image Optimization

**Next.js Image component** provides:
- Automatic WebP/AVIF conversion
- Responsive sizes with `srcset`
- Lazy loading by default (except above-the-fold)
- Blur placeholder for perceived performance
- Prevention of Cumulative Layout Shift with automatic sizing

### Compression

**Brotli** — Better compression ratio than gzip; supported by all modern browsers
**Gzip** — Universal fallback; supported everywhere
**Static asset optimization** — Minification, tree-shaking, dead code elimination

## Best Practices

1. **Use Next.js Image component** — Always use `next/image` instead of `<img>`; it handles optimization, lazy loading, and prevents CLS automatically
2. **Implement dynamic imports for heavy components** — Use `next/dynamic` with `{ ssr: false }` for components that don't need server rendering
3. **Optimize fonts with next/font** — Use `next/font` for automatic font optimization; it self-hosts fonts and preloads them, eliminating FOUT/FOIT
4. **Minimize JavaScript bundle size** — Analyze with `@next/bundle-analyzer`; remove unused dependencies; prefer lightweight alternatives
5. **Use Server Components by default** — React Server Components send zero JavaScript to the client; only use `"use client"` when interactivity is needed
6. **Implement proper caching headers** — Set `Cache-Control: s-maxage=31536000, immutable` for static assets; shorter TTLs for dynamic content
7. **Preload critical resources** — Use `<link rel="preload">` for above-the-fold images, critical CSS, and fonts
8. **Monitor performance continuously** — Use Vercel Analytics, Lighthouse CI, and real user monitoring (RUM) to track Core Web Vitals

## Anti-Patterns

1. **Using `<img>` instead of `next/image`** — Loses automatic optimization, lazy loading, and CLS prevention; always use the Image component
2. **Importing entire libraries for one function** — `import _ from 'lodash'` imports all functions; use `lodash-es` or `lodash/functionName` for tree-shaking
3. **Client-side rendering everything** — Using `"use client"` on every component defeats Server Components; keep server rendering as the default
4. **Ignoring large bundle sizes** — Not monitoring bundle growth allows gradual performance degradation; track bundle size in CI
5. **Unoptimized images** — Serving original-resolution PNGs wastes bandwidth; always compress and serve modern formats
6. **Synchronous heavy computations on main thread** — Long tasks block interactivity; use Web Workers, `requestIdleCallback`, or server-side processing
7. **Missing loading states** — No loading indicators during navigation or data fetching makes the app feel slow; add skeleton screens and transitions
8. **Not using streaming SSR** — Next.js supports streaming; returning large responses blocks rendering for all content

## Common Mistakes

1. **Not setting image width and height** — Causes Cumulative Layout Shift; always specify dimensions or use `fill` with a container
2. **Loading third-party scripts synchronously** — Analytics, chat widgets, and ads block rendering; use `next/script` with `strategy="lazyOnload"`
3. **Ignoring Core Web Vitals in development** — Performance issues compound; measure early and fix regressions immediately
4. **Over-caching dynamic content** — CDN caching user-specific content serves stale data to wrong users; use `Cache-Control: private` for personalized pages
5. **Not using Suspense boundaries** — Without Suspense, the entire page blocks until all data loads; wrap slow components in Suspense with fallbacks
6. **Excessive state management** — Large global stores cause re-renders; minimize state scope and use React.memo for expensive components
7. **Forgetting about mobile performance** — Mobile devices have slower CPUs and networks; test on throttled connections and low-end devices
8. **Not implementing pagination** — Loading thousands of records at once kills performance; paginate all list endpoints

## Decision Guidelines

| Metric Concern | Optimization Strategy |
|---|---|
| Slow LCP | Optimize server response, compress images, preload critical resources |
| High CLS | Add image dimensions, stabilize dynamic content, use font-display: swap |
| Poor INP | Reduce JavaScript execution, code-split heavy components, use Web Workers |
| Large bundles | Remove unused code, use dynamic imports, analyze with bundle analyzer |
| Slow API responses | Add database indexes, implement caching, use streaming responses |
| Slow mobile experience | Optimize for low-end devices, reduce JavaScript, use responsive images |

## References

- Web Vitals: https://web.dev/vitals/
- Next.js Performance: https://nextjs.org/docs/app/building-your-application/optimizing
- Lighthouse: https://developer.chrome.com/docs/lighthouse/
- Vercel Analytics: https://vercel.com/analytics
- Bundle Analyzer: https://www.npmjs.com/package/@next/bundle-analyzer
- React.dev Performance: https://react.dev/learn

## Practical Notes

- **Lighthouse CI:** Integrate into GitHub Actions; set performance budget (score ≥ 90) and fail builds on regression
- **Vercel Analytics:** Automatically tracks Core Web Vitals; monitor trends and set alerts for degradation
- **Image pipeline:** Use Supabase Storage for image hosting; generate multiple sizes on upload; serve via CDN
- **Font strategy:** Use `next/font` with Google Fonts; self-host for performance; limit to 2 font families maximum
- **Performance budget:** Set bundle size limits in CI: 200KB initial JS, 50KB per route chunk, 100KB total CSS
