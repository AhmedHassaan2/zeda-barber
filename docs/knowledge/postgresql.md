---
title: Postgresql
description: Postgresql reference documentation
---

# Postgresql

# PostgreSQL Knowledge Document

## Purpose

PostgreSQL is a powerful, open-source relational database known for its extensibility, standards compliance, and advanced features. It supports complex queries, JSONB storage, full-text search, geospatial data, and custom extensions. Understanding PostgreSQL deeply is essential for building performant, reliable applications on Supabase or any self-hosted deployment.

## Core Concepts

### Data Types

PostgreSQL offers rich data types: `serial`/`bigserial` for auto-incrementing IDs, `uuid` for distributed IDs, `jsonb` for structured semi-schema data, `text` over `varchar` (no performance difference, more flexible), `timestamptz` over `timestamp` (timezone-aware), and `numeric` over `float` for exact arithmetic.

### Indexing

- **B-tree:** Default index. Efficient for equality and range queries. Use for most WHERE clauses.
- **GIN (Generalized Inverted Index):** Optimized for containment queries on arrays, JSONB, and full-text search vectors.
- **GiST (Generalized Search Tree):** Used for geospatial data (PostGIS), range types, and fuzzy text search.
- **BRIN (Block Range Index):** Compact index for physically ordered data. Ideal for large time-series tables.
- **Partial Index:** Index only rows matching a condition. Smaller and faster than full-table indexes.

### Query Execution

`EXPLAIN ANALYZE` shows the actual execution plan with timing and row estimates. Key things to look for: sequential scans on large tables (missing index), nested loops vs hash joins, and actual vs estimated row counts (statistics accuracy).

### Common Table Expressions (CTEs)

CTEs with `WITH` clauses improve readability for complex queries. PostgreSQL 12+ optimizes CTEs as optimization fences by default — use `MATERIALIZED` or `NOT MATERIALIZED` to control behavior.

### Window Functions

`ROW_NUMBER()`, `RANK()`, `LAG()`, `LEAD()`, `SUM() OVER(PARTITION BY ... ORDER BY ...)` enable analytical queries without subqueries. Essential for pagination, ranking, and running totals.

## Best Practices

1. **Use `timestamptz` everywhere** — Always store timezone-aware timestamps. PostgreSQL stores them in UTC and converts on display. Using `timestamp` loses timezone context.

2. **Prefer `text` over `varchar(n)`** — There is no performance difference. `text` is more flexible and PostgreSQL-specific. Use `CHECK` constraints if you need length limits.

3. **Create indexes on foreign keys** — PostgreSQL does not auto-index foreign key columns. Every FK column used in JOINs should have an index.

4. **Use `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)` for query debugging** — This shows actual execution time, buffer usage, and the full plan. Always use it when optimizing slow queries.

5. **Partition large tables by range or hash** — Tables over 100M rows benefit from partitioning. Range partition by date for time-series; hash partition for even distribution.

6. **Use connection pooling (PgBouncer)** — PostgreSQL forks a process per connection. PgBouncer or PgCat multiplexes connections, essential for serverless environments.

7. **Set `statement_timeout` and `idle_in_transaction_session_timeout`** — Prevent long-running queries from consuming resources. Set `statement_timeout` to 30s for OLTP workloads.

8. **Use `jsonb` over `json`** — `jsonb` is binary, supports indexing (GIN), supports containment operators (`@>`), and is significantly faster for querying.

## Anti-Patterns

1. **Using `SELECT *` in application queries** — Always specify columns. `SELECT *` fetches unnecessary data, breaks on schema changes, and prevents index-only scans.

2. **Running migrations against production without staging** — Test every migration against a production-like dataset first. Migrations are not reversible by default.

3. **Over-normalizing data** — Splitting every attribute into a separate table creates JOIN-heavy queries. Denormalize when read performance matters more than write flexibility.

4. **Ignoring `ANALYZE` statistics** — PostgreSQL uses statistics to choose query plans. Run `ANALYZE` after large data changes or enable `autoanalyze`.

5. **Using `LIKE '%pattern%'` for search** — Prefix wildcards prevent index usage. Use full-text search (`tsvector` + GIN index) or trigram indexes (`pg_trgm`) for substring matching.

6. **Storing computed values without triggers** — If a derived column is frequently queried, compute it on write (via trigger) rather than on every read.

7. **Using `BIGSERIAL` without thinking** — UUIDs or ULIDs are often better for distributed systems. Sequential IDs create write contention and expose business metrics.

## Common Mistakes

1. **Not using `COALESCE` for nullable aggregates** — `SUM()` returns `NULL` when no rows match. Use `COALESCE(SUM(amount), 0)` to get a default.

2. **Forgetting `GROUP BY` with aggregate functions** — PostgreSQL enforces strict SQL standard: all non-aggregated columns must appear in `GROUP BY`.

3. **Using `OFFSET` for deep pagination** — `OFFSET 100000` scans and discards 100k rows. Use cursor-based pagination with `WHERE id > last_seen_id`.

4. **Not vacuuming after bulk deletes** — Deleted rows are dead tuples that consume space until vacuumed. Run `VACUUM` or ensure `autovacuum` is enabled.

5. **Assuming `NOW()` is monotonic** — Clock adjustments can cause `NOW()` to return earlier values. Use `clock_timestamp()` when you need actual wall-clock time.

6. **Using `NOT IN` with subqueries containing NULLs** — `NOT IN (SELECT ...)` returns empty if any subquery result is NULL. Use `NOT EXISTS` instead.

7. **Ignoring connection limits** — Default `max_connections` is 100. Exceeding it causes connection refused errors. Use PgBouncer to manage connection pool.

## Decision Guidelines

- **Use PostgreSQL when:** You need ACID compliance, complex joins, JSONB storage, full-text search, geospatial queries, or extensibility via extensions.
- **Use JSONB columns when:** Your data has variable structure or you need flexible schemas within a relational model. Prefer columns for frequently queried fields.
- **Partition when:** Tables exceed 100M rows or you need data lifecycle management (archival, deletion by date range).
- **Choose UUID vs BIGSERIAL:** Use UUID for distributed systems, microservices, or when IDs are exposed publicly. Use BIGSERIAL for internal high-performance OLTP.

## References

- PostgreSQL Official Docs: https://www.postgresql.org/docs/15/
- PostgreSQL Wiki: https://wiki.postgresql.org
- Use The Index, Luke (Indexing Guide): https://use-the-index-luke.com
- pgMustard (EXPLAIN visualizer): https://www.pgmustard.com
- PgBouncer: https://www.pgbouncer.org

## Practical Notes

- `pg_dump` and `pg_restore` are your backup/restore tools. Use `--no-owner --no-privileges` for portability.
- Enable `pg_stat_statements` for query performance monitoring in production.
- Use `\d+ table_name` in psql to see table size, indexes, and storage parameters.
- Set `log_min_duration_statement = 250` to log queries taking over 250ms.
- For Supabase, access PostgreSQL via the connection string in Settings > Database.
- PostgreSQL 15 introduced `MERGE` statement for upsert-like operations at the SQL level.

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
