-- WHY WRONG: No constraints means any data gets inserted, no indexes
-- means slow queries, no RLS means any authenticated user reads everything.

create table public.profiles (
  id text,
  full_name text,
  email text,
  role text,
  avatar_url text,
  created_at timestamp,
  updated_at timestamp
);

-- No indexes, no constraints, no RLS, no triggers
-- This is a data integrity nightmare.
