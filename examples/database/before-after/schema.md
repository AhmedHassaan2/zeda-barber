# Database Schema Refactoring: Before / After

## Before (Anti-pattern)

```sql
create table public.profiles (
  id text,
  full_name text,
  email text,
  role text,
  avatar_url text,
  created_at timestamp,
  updated_at timestamp
);
```

**Problems:**
- `id` is text — no referential integrity, no UUID type
- No `NOT NULL` constraints — incomplete data accepted
- No `CHECK` constraints — any string in `role`
- No indexes — full table scans on every query
- No RLS — any user reads all profiles
- No `DEFAULT` values — timestamps must be provided manually
- No trigger — `updated_at` never auto-updates

## After (Preferred)

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (length(full_name) between 1 and 100),
  email text not null unique,
  role text not null default 'member' check (role in ('admin', 'member', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_profiles_email on public.profiles(email);
alter table public.profiles enable row level security;
-- + RLS policies + update trigger
```

**Improvements:**
1. UUID primary key linked to `auth.users`
2. `NOT NULL` + `CHECK` constraints enforce valid data
3. `UNIQUE` index on email prevents duplicates
4. Indexes on queried columns for fast lookups
5. RLS policies restrict data access per user role
6. Trigger auto-updates `updated_at` on modification
