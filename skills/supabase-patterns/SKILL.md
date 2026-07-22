---
name: supabase-patterns
description: Supabase client setup, database queries, authentication, storage, RLS policies, and real-time patterns
category: database
level: framework
priority: high
dependencies: ["database-design"]
related_skills: ["database-design", "authentication-patterns"]
related_agents: ["database", "backend"]
activation_rules:
  - keywords: ["supabase", "RLS", "auth", "storage", "realtime", "subscription"]
  - file_pattern: "src/lib/supabase*"
---

# Supabase Patterns

## Purpose

Guide Supabase usage for database, authentication, storage, and real-time features.

## When to Use

- Setting up Supabase clients
- Writing database queries
- Implementing authentication
- Using Supabase Storage
- Adding real-time subscriptions

## Core Concepts

### Client Setup

```typescript
// Server-side admin client (route handlers only)
import { createClient } from '@supabase/supabase-js';
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Browser client
import { createBrowserClient } from '@supabase/ssr';
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### Database Queries

```typescript
// Simple select
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('status', 'active')
  .order('created_at', { ascending: false });

// With joins
const { data, error } = await supabase
  .from('orders')
  .select('*, items:order_items(*, product:products(name, price))');

// Insert
const { data, error } = await supabase
  .from('products')
  .insert({ name: 'New Product', price: 9.99 })
  .select();
```

### RLS Policies

```sql
-- Users can read active products
CREATE POLICY "Public products" ON products
  FOR SELECT USING (status = 'active');

-- Users can only update their own orders
CREATE POLICY "Own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);
```

### Storage

```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('uploads')
  .upload(`images/${filename}`, file);

// Get public URL
const { data } = supabase.storage
  .from('uploads')
  .getPublicUrl(`images/${filename}`);
```

### Real-time

```typescript
const channel = supabase
  .channel('messages')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
    console.log('New message:', payload.new);
  })
  .subscribe();
```

## Best Practices

- Use admin client only in server-side route handlers
- Never expose service role key to client
- Always handle errors from Supabase
- Use RLS policies for data security
- Index columns used in RLS policies
- Use `.select()` after mutations to get returned data

## Anti-Patterns

- Using admin client in client components
- Not checking for errors
- Exposing service role key
- Bypassing RLS in client code
- Fetching more data than needed
