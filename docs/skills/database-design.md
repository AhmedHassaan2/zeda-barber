---
title: PostgreSQL schema design, normalization, indexing, relationships, and migration strategies
description: PostgreSQL schema design, normalization, indexing, relationships, and migration strategies
---

# PostgreSQL schema design, normalization, indexing, relationships, and migration strategies

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>database-design</code> | <strong>Category:</strong> database | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Database Design

## Purpose

Guide database schema design for PostgreSQL with proper normalization, indexing, and migration strategies.

## When to Use

- Designing new database schemas
- Adding tables or columns
- Optimizing query performance
- Planning data migrations

## Core Concepts

### Naming Conventions

```
Tables:      snake_case, plural (users, order_items)
Columns:     snake_case (created_at, user_id)
Primary Keys: id (auto-generated UUID or bigint)
Foreign Keys: {table}_singular_id (user_id, order_id)
Indexes:     idx_{table}_{column} (idx_users_email)
```

### Schema Design Principles

```sql
-- Good: Proper types, constraints, and indexes
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_status ON products(status) WHERE status = 'active';
```

### Relationship Patterns

```sql
-- One-to-many
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total DECIMAL(10,2) NOT NULL
);

-- Many-to-many
CREATE TABLE product_categories (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);
```

### Migration Strategy

1. Create migration files in order
2. Test against production-like data
3. Ensure backward compatibility
4. Plan rollback for every migration
5. Use transactions for multi-step migrations

## Best Practices

- Always use UUID or bigint for primary keys
- Add indexes on foreign keys and frequently queried columns
- Use CHECK constraints for data validation
- Add created_at/updated_at to all tables
- Use RLS policies in Supabase
- Document schema decisions
- Never modify production schema directly

## Anti-Patterns

- Using TEXT for IDs
- Missing indexes on foreign keys
- Storing computed values instead of computing them
- No constraints (letting invalid data in)
- Using reserved words as column names
- Storing arrays in columns (use junction tables)

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
