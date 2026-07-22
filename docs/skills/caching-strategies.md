---
title: Multi-layer caching with HTTP headers, ISR, CDN, client-side (SWR/React Query), and edge caching
description: Multi-layer caching with HTTP headers, ISR, CDN, client-side (SWR/React Query), and edge caching
---

# Multi-layer caching with HTTP headers, ISR, CDN, client-side (SWR/React Query), and edge caching

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>caching-strategies</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Caching Strategies

## Purpose

Guide multi-layer caching implementation for optimal performance — covering server-side, CDN, and client-side caching.

## When to Use

- Setting cache headers for API responses
- Implementing ISR for content pages
- Configuring CDN caching (Vercel/Cloudflare)
- Adding client-side data caching (SWR/React Query)
- Designing cache invalidation strategies

## Cache Layers

```
Client Browser Cache
    ↓ (miss)
Edge/CDN Cache (Vercel, Cloudflare)
    ↓ (miss)
Server Cache (ISR, in-memory)
    ↓ (miss)
Database (Supabase)
```

## Layer 1: HTTP Cache Headers

### Cache-Control Directives

```typescript
// Static assets (images, fonts, CSS, JS)
'Cache-Control: public, max-age=31536000, immutable'  // 1 year

// API responses (semi-dynamic)
'Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400'
// s-maxage = CDN cache time (1 hour)
// stale-while-revalidate = serve stale while fetching fresh (24 hours)

// Dynamic API responses (never cache)
'Cache-Control: no-store, no-cache, must-revalidate'

// Private user data
'Cache-Control: private, no-cache'
```

### Next.js Route Handler Caching

```typescript
// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await getProducts();

  return NextResponse.json(products, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'ETag': generateETag(products),
    },
  });
}
```

### ETag Validation

```typescript
import { createHash } from 'crypto';

function generateETag(data: unknown): string {
  const hash = createHash('md5').update(JSON.stringify(data)).digest('hex');
  return `"${hash}"`;
}

// Client sends If-None-Match header
// Server compares ETag — returns 304 Not Modified if unchanged
```

## Layer 2: ISR (Incremental Static Regeneration)

### Time-Based Revalidation

```typescript
// src/app/products/page.tsx
export const revalidate = 3600; // Revalidate every hour

async function ProductsPage() {
  const products = await fetchProducts(); // Cached for 1 hour
  return <ProductGrid products={products} />;
}
```

### On-Demand Revalidation

```typescript
// src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const { path, tag } = await request.json();

  if (path) revalidatePath(path);
  if (tag) revalidateTag(tag);

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
```

### Tag-Based Revalidation

```typescript
// Fetch with tag
const products = await fetch('https://api.example.com/products', {
  next: { tags: ['products'] },
});

// Revalidate by tag
revalidateTag('products');
```

## Layer 3: Client-Side Caching (SWR)

```tsx
'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function ProductList() {
  const { data, error, isLoading, mutate } = useSWR('/api/products', fetcher, {
    revalidateOnFocus: true,      // Refresh when tab focused
    revalidateOnReconnect: true,  // Refresh on reconnect
    dedupingInterval: 5000,       // Dedupe requests within 5s
    staleTime: 30000,             // Consider data fresh for 30s
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage />;

  return (
    <ul>
      {data.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// Mutate to revalidate
mutate('/api/products'); // Refetch
```

## Cache Patterns

| Pattern | Use Case | TTL | Example |
|---------|----------|-----|---------|
| **Cache-First** | Static assets, fonts | 1 year | Images, CSS, JS |
| **Stale-While-Revalidate** | Product listings, blog posts | 1h fresh + 24h stale | ISR pages |
| **Network-First** | User-specific data | None | Dashboard data |
| **No Cache** | Real-time data | None | Chat messages, live prices |
| **Incremental** | Large datasets | Varies | Search results |

## Cache Invalidation Strategies

### 1. Time-Based (Simplest)

```typescript
// Set TTL and let it expire
export const revalidate = 3600; // 1 hour
```

### 2. On-Demand (Most Precise)

```typescript
// Triggered by content change
await revalidatePath('/products');
await revalidateTag('products');
```

### 3. Event-Driven (Most Sophisticated)

```typescript
// After admin updates product
await fetch('/api/revalidate', {
  method: 'POST',
  body: JSON.stringify({ tag: 'products' }),
});
```

## Vercel Edge Caching

```json
// vercel.json — custom caching rules
{
  "headers": [
    {
      "source": "/api/products",
      "headers": [
        { "key": "Cache-Control", "value": "s-maxage=3600, stale-while-revalidate=86400" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

## Best Practices

- Use CDN for all static assets (s-maxage)
- Implement stale-while-revalidate for semi-dynamic content
- Use on-demand revalidation for content management
- Cache at the edge, invalidate centrally
- Monitor cache hit rates (Vercel Analytics)
- Set appropriate TTLs based on data freshness needs
- Use tags for granular invalidation
- Never cache POST/PUT/DELETE responses
- Always set Cache-Control on API responses
- Use `immutable` for fingerprinted assets

## Anti-Patterns

- Caching sensitive/user-specific data publicly
- Never invalidating caches (stale data forever)
- Caching POST/PUT/DELETE responses
- Using long TTLs for frequently changing data
- Not considering cache stampede (thundering herd)
- Caching at the wrong layer (client-side for public data)
- Missing Cache-Control headers on API responses
- Not using ETags for conditional requests
- Inconsistent cache key naming

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
