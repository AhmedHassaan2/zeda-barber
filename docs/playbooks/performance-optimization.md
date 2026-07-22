---
title: Performance Optimization Playbook
description: Engineering playbook for performance optimization workflow
---

# Performance Optimization Playbook

# Playbook: Performance Optimization

**Goal:** Identify and resolve performance bottlenecks in frontend, backend, or database.

**Trigger:** Slow page load, high API latency, large bundle size, poor Core Web Vitals.

**Inputs:**
- Performance metric or complaint
- Affected area (page, API endpoint, database query)
- Baseline measurement (if available)

**Outputs:**
- Performance analysis report
- Optimizations implemented
- Before/after measurements
- Prevention guidelines

----|------|
| `performance` | Primary analyst — bundle, Core Web Vitals, caching |
| `frontend` | Client-side optimization — components, rendering |
| `backend` | Server-side optimization — API, processing |
| `database` | Query optimization — indexing, N+1, joins |
| `architect` | Structural optimization — architecture decisions |
| `reviewer` | Verify optimizations don't break functionality |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `web-performance` | Always — Core Web Vitals, metrics |
| `caching-strategies` | Caching layer optimization |
| `image-optimization` | Image-related performance |
| `bundle-optimization` | Bundle size reduction |
| `nextjs-performance` | Next.js-specific optimizations |
| `react-patterns` | React rendering optimization |
| `database-performance` | Query optimization |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/performance-check` | Always — full performance audit |
| `/review` | After optimization — verify no regressions |

---

## Process

### Step 1: Measure (10 min)

1. **Establish baseline** — Current metrics
2. **Identify bottleneck** — Where is time spent?
3. **Categorize** — Frontend? Backend? Database? Network?

```bash
# Build analysis
npm run build 2>&1 | tail -20

# Check bundle size
npx next build --analyze

# Network timing
# Browser DevTools → Network tab → Waterfall
```

Key metrics:
- **LCP** (Largest Contentful Paint) — < 2.5s
- **FID** (First Input Delay) — < 100ms
- **CLS** (Cumulative Layout Shift) — < 0.1
- **TTFB** (Time to First Byte) — < 200ms
- **Bundle size** — < 200KB initial JS

### Step 2: Analyze (15 min)

**Frontend analysis:**
- Large components → Extract, lazy load
- Unnecessary re-renders → Memoize, optimize state
- Large images → Optimize, lazy load, use next/image
- Missing code splitting → Dynamic imports
- Unused code → Tree shaking, remove dead code

**Backend analysis:**
- Slow API routes → Profile, optimize logic
- Missing caching → Add response caching
- Large payloads → Paginate, filter fields
- Synchronous operations → Parallelize
- N+1 queries → Batch or join

**Database analysis:**
- Slow queries → EXPLAIN ANALYZE
- Missing indexes → Add targeted indexes
- Full table scans → Add WHERE clauses, indexes
- Large result sets → Paginate
- Missing connection pooling → Add pool

### Step 3: Optimize (varies)

1. **Start with highest impact** — Biggest bottleneck first
2. **One optimization at a time** — Measure after each
3. **Verify behavior** — Same result, faster
4. **Don't over-optimize** — Stop at "good enough"

### Step 4: Measure Again (10 min)

1. **Compare metrics** — Before vs after
2. **Verify improvement** — Measurable gain
3. **Check regressions** — Nothing got worse
4. **Document results** — What worked, what didn't

### Step 5: Prevent (5 min)

1. **Add performance budgets** — Prevent regression
2. **Document patterns** — What optimization worked
3. **Update project AGENTS.md** — Performance guidelines
4. **Consider CI checks** — Bundle size limits

---

## Validation Steps

- [ ] Baseline measured before optimization
- [ ] Bottleneck identified with evidence
- [ ] Optimization applied to highest impact first
- [ ] Metrics improved after optimization
- [ ] No functional regressions
- [ ] Build still passes
- [ ] Results documented

## Success Criteria

- Measurable performance improvement
- No regressions in functionality or other metrics
- Optimization is maintainable
- Prevention measures in place

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Optimizing without measuring | Wastes time on non-issues | Measure first, optimize bottlenecks |
| Premature optimization | Adds complexity for negligible gain | Only optimize when needed |
| Over-memoizing | Adds memory overhead, complexity | Memoize only expensive computations |
| Lazy loading everything | Adds loading complexity | Lazy load only large, non-critical components |
| Ignoring server-side | Client optimization has limits | Consider SSR/SSG optimizations |
| Optimizing for wrong metric |改善了不重要的指标 | Focus on user-facing metrics |
| Not testing after optimization | Optimizations break things | Always verify functionality |

## Related Commands

See [Commands Registry](/commands/) for commands used in this playbook.

## Related Agents

See [Agents Registry](/agents/) for agents involved in this playbook.
