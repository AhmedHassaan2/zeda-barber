---
date: 2026-07-19
category: mistakes
tags: [supabase, rls, security, database, row-level]
project: shared
severity: critical
---

# Always Enable RLS on Supabase Tables

## Context

A Supabase table was created without Row Level Security enabled. Any authenticated user could read, modify, or delete any row in the table — including other users' data.

## Content

**The Mistake:**
```sql
-- Table created without RLS
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT,
  email TEXT
);
-- RLS is OFF by default — everyone can access everything
```

**The Fix:**
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read their own profile
CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only update their own profile
CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can only insert their own profile
CREATE POLICY "Users insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Prevention:**
- Every table creation migration must include `ENABLE ROW LEVEL SECURITY`
- Every table must have at least SELECT, INSERT, UPDATE policies
- Use `supabase db diff` to verify policies before deploying
- Never use service role for user-facing operations

**Testing RLS:**
```sql
-- Test as authenticated user
SET request.jwt.claims = '{"sub": "user-uuid-here"}';
SELECT * FROM profiles; -- Should only return own rows
```

## Application

Before any table goes to production: RLS enabled, policies defined, policies tested with different user roles.

## Related

- `2026-07-19_database-query-pattern.md` — Query patterns with RLS
- `2026-07-19_client-side-only-auth.md` — Defense in depth
