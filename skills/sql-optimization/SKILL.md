---
name: sql-optimization
description: Query performance analysis, index optimization, EXPLAIN plans, and query rewriting
category: database
level: concept
priority: medium
dependencies: ["database-design"]
related_skills: ["database-design", "supabase-patterns"]
related_agents: ["database", "performance"]
activation_rules:
  - keywords: ["query", "performance", "index", "EXPLAIN", "slow", "optimization"]
---

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
