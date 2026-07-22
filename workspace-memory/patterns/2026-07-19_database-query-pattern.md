---
date: 2026-07-19
category: patterns
tags: [supabase, queries, rls, database, typescript]
project: shared
severity: none
---

# Supabase Query Patterns with RLS

## Context

Supabase queries in this workspace always respect Row Level Security. RLS is the primary access control — never bypass it with service role unless absolutely necessary.

## Content

**Basic Query with Type Safety:**
```typescript
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Failed to fetch profile:", error.message);
    return null;
  }
  return data;
}
```

**Insert with Validation:**
```typescript
export async function createPost(title: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("posts")
    .insert({ title, content, author_id: user.id })
    .select()
    .single();

  if (error) throw new Error(`Create failed: ${error.message}`);
  return data;
}
```

**Key Rules:**
- Always use `.single()` when expecting one row
- Always check `error` before using `data`
- Always type responses using generated database types
- Use RLS policies — never service role for user operations

## Application

Use these patterns for all Supabase interactions. Always create the client from the server utility, never import a global instance.

## Related

- `2026-07-19_no-rls-policies.md` — Critical mistake: missing RLS
- `2026-07-19_supabase-over-prisma.md` — Decision: why Supabase
