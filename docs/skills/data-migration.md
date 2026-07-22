---
title: Data migration patterns, schema evolution, and zero-downtime migrations
description: Data migration patterns, schema evolution, and zero-downtime migrations
---

# Data migration patterns, schema evolution, and zero-downtime migrations

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>data-migration</code> | <strong>Category:</strong> database | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

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
