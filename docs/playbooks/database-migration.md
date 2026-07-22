---
title: Database Migration Playbook
description: Engineering playbook for database migration workflow
---

# Database Migration Playbook

# Playbook: Database Migration

**Goal:** Safely modify database schema with zero data loss and minimal downtime.

**Trigger:** New table, column change, index creation, data migration, schema redesign.

**Inputs:**
- Schema change requirements
- Current database state
- Data volume
- Downtime tolerance

**Outputs:**
- Migration SQL file
- Rollback plan
- Data migration script (if needed)
- Updated types

----|------|
| `database` | Primary — schema design, query writing |
| `backend` | Impact on existing queries |
| `security` | RLS policies, access control |
| `reviewer` | Migration safety review |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `database-design` | Always — schema patterns |
| `supabase-patterns` | Supabase-specific migrations |
| `database-security` | RLS, access control |
| `query-optimization` | Index strategy |
| `postgresql-advanced` | PostgreSQL-specific features |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/review` | Review migration safety |

---

## Process

### Step 1: Plan (15 min)

1. **Define the change** — What table/column/index?
2. **Check dependencies** — What code uses this table?
3. **Assess risk** — Data loss? Downtime? Performance?
4. **Plan rollback** — How to undo if needed?
5. **Plan data migration** — If existing data affected?

Migration safety levels:
- **Safe:** Add column (nullable), add index, add table
- **Caution:** Drop column, rename column, change type
- **Dangerous:** Drop table, merge tables, large data migration

### Step 2: Write Migration (15 min)

```sql
-- Supabase migration: YYYYMMDD_description.sql

-- 1. Create table
CREATE TABLE IF NOT EXISTS new_table (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- columns
);

-- 2. Add RLS policies
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON new_table FOR SELECT
  USING (auth.uid() = user_id);

-- 3. Add indexes
CREATE INDEX idx_new_table_user_id ON new_table(user_id);

-- 4. Add triggers (if needed)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_updated_at
  BEFORE UPDATE ON new_table
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### Step 3: Test (10 min)

1. **Apply to dev** — Test migration applies cleanly
2. **Test queries** — Existing queries still work
3. **Test RLS** — Policies enforce correctly
4. **Test rollback** — Migration can be undone
5. **Check performance** — No slow queries introduced

### Step 4: Deploy (10 min)

1. **Backup data** — Before applying
2. **Apply migration** — `supabase db push` or CLI
3. **Verify** — Tables, columns, indexes exist
4. **Test application** — Features still work
5. **Monitor** — Check for errors

### Step 5: Update Types (5 min)

1. **Generate types** — `supabase gen types typescript`
2. **Update code** — Use new types
3. **Update queries** — Reference new columns

---

## Validation Steps

- [ ] Migration applies cleanly
- [ ] No data loss
- [ ] Existing queries still work
- [ ] RLS policies are correct
- [ ] Indexes are created
- [ ] Rollback plan exists
- [ ] Types are updated
- [ ] Performance is acceptable

## Success Criteria

- Schema change applied successfully
- No data loss
- No downtime (or minimal, planned)
- Application works correctly
- Rollback plan is ready

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| No rollback plan | Stuck if migration fails | Always plan rollback |
| Dropping columns without backup | Data loss | Backup before destructive changes |
| Missing indexes | Slow queries | Add indexes for WHERE/JOIN columns |
| No RLS policies | Data exposure | Enable RLS, add policies |
| Large batch operations | Locks table, slow | Use chunked operations |
| Not testing rollback | Can't undo | Test rollback before production |
| Ignoring foreign keys | Referential integrity issues | Handle FK constraints |

## Related Commands

See [Commands Registry](/commands/) for commands used in this playbook.

## Related Agents

See [Agents Registry](/agents/) for agents involved in this playbook.
