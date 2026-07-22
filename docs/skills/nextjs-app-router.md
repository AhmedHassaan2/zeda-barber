---
title: Next.js 16 App Router patterns including server/client components, layouts, route handlers, metadata, ISR, and streaming
description: Next.js 16 App Router patterns including server/client components, layouts, route handlers, metadata, ISR, and streaming
---

# Next.js 16 App Router patterns including server/client components, layouts, route handlers, metadata, ISR, and streaming

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>nextjs-app-router</code> | <strong>Category:</strong> frontend | <strong>Priority:</strong> high | <strong>Level:</strong> framework
</div>

# Next.js App Router

## Purpose

Guide Next.js 16 App Router development including server/client component patterns, layouts, route handlers, metadata, and performance features.

## When to Use

- Creating new pages or layouts
- Implementing data fetching
- Setting up API routes
- Configuring metadata and SEO
- Implementing ISR or streaming

## Core Concepts

### File Structure

```
src/app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page
├── loading.tsx         # Loading UI (Suspense boundary)
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── globals.css         # Global styles
├── route.ts            # API route (co-located)
└── [dynamic]/
    ├── page.tsx        # Dynamic page
    └── layout.tsx      # Nested layout
```

### Data Fetching Patterns

```tsx
// Server Component with async/await (default)
async function ProductsPage() {
  const products = await fetchProducts(); // Direct fetch in server component
  return <ProductGrid products={products} />;
}

// Client Component with SWR/React Query
'use client';
function ProductList() {
  const { data, isLoading } = useSWR('/api/products', fetcher);
  if (isLoading) return <Skeleton />;
  return <ProductGrid products={data} />;
}
```

### Layout Pattern

```tsx
// Root layout — wraps entire app
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className="dark">
      <body>{children}</body>
    </html>
  );
}

// Nested layout — wraps specific section
export default function AdminLayout({ children }) {
  return <div className="admin-shell">{children}</div>;
}
```

### Metadata API

```tsx
// Static metadata
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};

// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  return {
    title: product.name,
    openGraph: { images: [product.image] },
  };
}
```

### Route Handlers

```tsx
// app/api/example/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ data: 'value' });
}

export async function POST(request: Request) {
  const body = await request.json();
  // Process...
  return NextResponse.json({ success: true }, { status: 201 });
}
```

### Streaming and Suspense

```tsx
// Streaming with Suspense
export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<ProductSkeleton />}>
        <ProductList />  {/* Server component that streams */}
      </Suspense>
      <Footer />
    </>
  );
}
```

## Best Practices

- Default to server components — only add `'use client'` when needed
- Use layouts for persistent UI (headers, sidebars)
- Colocate API routes with their pages
- Use `loading.tsx` for automatic Suspense boundaries
- Prefer server-side data fetching over client-side when possible
- Use `generateMetadata` for dynamic SEO

## Anti-Patterns

- Adding `'use client'` to entire page files
- Fetching data in useEffect when server component would work
- Using `router.push()` for simple navigation (use `<Link>`)
- Not handling loading and error states
- Hardcoding metadata that should be dynamic

## Example

```tsx
// Complete page with server data, metadata, and client interaction
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Professional barber services',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="min-h-screen">
      <h1>Our Services</h1>
      <Suspense fallback={<ServicesSkeleton />}>
        <ServiceGrid services={services} />
      </Suspense>
    </main>
  );
}
```

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
