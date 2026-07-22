---
date: 2026-07-19
category: lessons
tags: [nextjs, server-components, data-fetching, performance, architecture]
project: shared
severity: none
---

# Fetch Data in Server Components

## Context

Client-side data fetching with `useEffect` + loading states created waterfall requests and poor UX. Server Components fetch data before rendering, eliminating client-side loading spinners for data.

## Content

**The Problem (Client Component):**
```typescript
"use client";
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/users/${userId}`).then(r => r.json()).then(setUser).finally(() => setLoading(false));
  }, [userId]);
  if (loading) return <Skeleton />;
  return <div>{user?.name}</div>;
}
```

**The Fix (Server Component):**
```typescript
// No "use client" — this runs on the server
async function UserProfile({ userId }: { userId: string }) {
  const user = await getUser(userId);
  if (!user) notFound();
  return <div>{user.name}</div>;
}
```

**When to Use Client Components:**
- Interactive elements (forms, buttons, modals)
- Browser APIs (localStorage, geolocation)
- State that changes on user interaction
- Event handlers

**When to Use Server Components:**
- Data fetching and display
- Static content
- SEO-critical content
- Layout structure

**Pattern: Server fetch → Client interaction:**
```typescript
// Server: fetch data
async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return <ProductDetail product={product} />; // Client component for interactions
}

// Client: handle interactions
"use client";
function ProductDetail({ product }: { product: Product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton productId={product.id} />
    </div>
  );
}
```

## Application

Default to Server Components. Only add "use client" when the component needs interactivity, browser APIs, or event handlers.

## Related

- `2026-07-19_state-management-pattern.md` — State in Server vs Client Components
- `2026-07-19_batch-state-updates.md` — Client state optimization
