---
name: architecture-decisions
description: Architecture Decision Records (ADRs), decision documentation, and technical decision tracking
category: documentation
level: concept
priority: medium
dependencies: []
related_skills: ["clean-architecture", "component-documentation"]
related_agents: ["architect", "docs-writer"]
activation_rules:
  - keywords: ["ADR", "architecture decision", "decision record", "technical decision"]
---

# Architecture Decisions

## Purpose

Guide architecture decision documentation for team alignment and historical context.

## When to Use

- Making significant technical decisions
- Documenting architectural choices
- Onboarding new team members
- Reviewing past decisions

## Core Concepts

### ADR Template

```markdown
# ADR-001: Use Supabase as Primary Database

## Status
Accepted

## Context
We need a database solution that supports:
- PostgreSQL with full SQL support
- Real-time subscriptions
- Built-in authentication
- File storage

## Decision
We will use Supabase as our primary database, leveraging:
- PostgreSQL for data storage
- Supabase Auth for authentication
- Supabase Storage for file uploads
- Realtime for live updates

## Consequences
### Positive
- Single platform for multiple services
- Built-in auth reduces development time
- Real-time capabilities out of the box

### Negative
- Vendor lock-in to Supabase
- Limited control over infrastructure
- Pricing may increase with scale
```

### Decision Categories

| Category | Examples |
|----------|----------|
| Technology | Framework, database, hosting |
| Architecture | Patterns, structure, layers |
| Process | Code review, testing, deployment |
| Design | UI patterns, components, styling |

### Decision Log

```typescript
// decisions/README.md
| # | Decision | Status | Date |
|---|----------|--------|------|
| 1 | Use Supabase | Accepted | 2026-01 |
| 2 | Use Next.js App Router | Accepted | 2026-01 |
| 3 | Implement RTL-first design | Accepted | 2026-01 |
```

## Best Practices

- Document decisions when made
- Include context and alternatives
- Record consequences (positive and negative)
- Keep decisions reversible when possible
- Review decisions periodically
- Share decisions with team

## Anti-Patterns

- Not documenting decisions
- Making decisions without context
- Not recording consequences
- Ignoring decision history
- Not updating decisions when context changes
