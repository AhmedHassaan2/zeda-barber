---
name: database-design
description: PostgreSQL schema design, normalization, indexing, relationships, and migration strategies
category: database
level: concept
priority: high
dependencies: []
related_skills: ["supabase-patterns", "prisma-patterns", "sql-optimization"]
related_agents: ["database"]
activation_rules:
  - keywords: ["database", "schema", "table", "column", "index", "migration", "PostgreSQL"]
  - file_pattern: "supabase/**/*"
  - file_pattern: "prisma/**/*"
---

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
