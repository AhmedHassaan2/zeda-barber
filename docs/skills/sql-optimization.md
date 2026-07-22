---
title: Query performance analysis, index optimization, EXPLAIN plans, and query rewriting
description: Query performance analysis, index optimization, EXPLAIN plans, and query rewriting
---

# Query performance analysis, index optimization, EXPLAIN plans, and query rewriting

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>sql-optimization</code> | <strong>Category:</strong> database | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# SQL Optimization

## Purpose

Guide query performance analysis and optimization for PostgreSQL.

## When to Use

- Investigating slow queries
- Adding or redesigning indexes
- Rewriting inefficient queries
- Analyzing EXPLAIN plans

## Core Concepts

### EXPLAIN Analysis

```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 'abc123' AND status = 'pending';
```

Key metrics:
- **Seq Scan** → missing index
- **Index Scan** → good
- **Nested Loop** with high rows → potential issue
- **Actual vs Estimated rows** → statistics may be stale

### Index Strategy

```sql
-- Single column index (most common filters)
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Composite index (multi-column filters)
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index (filtered subset)
CREATE INDEX idx_orders_pending ON orders(created_at) WHERE status = 'pending';

-- GIN index for full-text search
CREATE INDEX idx_products_search ON products USING GIN(to_tsvector('english', name || ' ' || description));
```

### Common Optimizations

```sql
-- Instead of:
SELECT * FROM orders WHERE EXTRACT(YEAR FROM created_at) = 2024;
-- Use:
SELECT * FROM orders WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';

-- Instead of:
SELECT * FROM users WHERE LOWER(email) = 'test@example.com';
-- Use:
CREATE INDEX idx_users_email_lower ON users(LOWER(email));
```

## Best Practices

- Always run EXPLAIN ANALYZE before optimizing
- Add indexes based on actual query patterns
- Monitor slow query logs
- Use connection pooling
- Batch inserts instead of single row inserts
- Use pagination with cursor-based approach for large datasets

## Anti-Patterns

- SELECT * in production queries
- Missing indexes on foreign keys
- N+1 queries (use JOINs or eager loading)
- Using OFFSET for deep pagination
- Not analyzing query plans

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
