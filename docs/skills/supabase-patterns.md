---
title: Supabase client setup, database queries, authentication, storage, RLS policies, and real-time patterns
description: Supabase client setup, database queries, authentication, storage, RLS policies, and real-time patterns
---

# Supabase client setup, database queries, authentication, storage, RLS policies, and real-time patterns

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>supabase-patterns</code> | <strong>Category:</strong> database | <strong>Priority:</strong> high | <strong>Level:</strong> framework
</div>

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
