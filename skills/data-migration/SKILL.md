---
name: data-migration
description: Data migration patterns, schema evolution, and zero-downtime migrations
category: database
level: concept
priority: medium
dependencies: ["database-design"]
related_skills: ["database-design", "sql-optimization"]
related_agents: ["database"]
activation_rules:
  - keywords: ["migration", "schema change", "data migration", "zero downtime"]
---

# Data Migration

## Purpose

Guide data migration implementation for schema evolution.

## When to Use

- Adding new columns or tables
- Restructuring data
- Migrating between systems
- Performing schema changes

## Core Concepts

### Migration Steps

1. **Plan**: Document what changes and why
2. **Backup**: Always backup before migration
3. **Test**: Test against production-like data
4. **Execute**: Run migration in maintenance window
5. **Verify**: Confirm data integrity
6. **Monitor**: Watch for issues post-migration

### Zero-Downtime Pattern

```sql
-- Step 1: Add new column (nullable)
ALTER TABLE users ADD COLUMN display_name TEXT;

-- Step 2: Backfill data
UPDATE users SET display_name = name WHERE display_name IS NULL;

-- Step 3: Add NOT NULL constraint (after backfill)
ALTER TABLE users ALTER COLUMN display_name SET NOT NULL;

-- Step 4: Drop old column (after code deployed)
ALTER TABLE users DROP COLUMN name;
```

### Supabase Migrations

```bash
# Create migration
supabase migration new add_user_display_name

# Apply migrations
supabase db push

# Reset database (development only)
supabase db reset
```

## Best Practices

- Always backup before migration
- Test against production-like data
- Use transactions for multi-step migrations
- Plan rollback for every migration
- Communicate maintenance windows
- Monitor post-migration
- Document migration decisions

## Anti-Patterns

- Running migrations directly in production
- Not testing migrations
- Skipping backups
- No rollback plan
- Migrating during peak hours
