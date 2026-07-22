---
name: nextjs-app-router
description: Next.js 16 App Router patterns including server/client components, layouts, route handlers, metadata, ISR, and streaming
category: frontend
level: framework
priority: high
dependencies: ["react-patterns"]
related_skills: ["api-design", "nextjs-route-handlers"]
related_agents: ["frontend", "backend"]
activation_rules:
  - file_pattern: "src/app/**/*"
  - file_pattern: "next.config.*"
  - keywords: ["Next.js", "App Router", "layout", "page", "route", "metadata", "generateMetadata"]
---

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
