---
title: Architecture Decision Records (ADRs), decision documentation, and technical decision tracking
description: Architecture Decision Records (ADRs), decision documentation, and technical decision tracking
---

# Architecture Decision Records (ADRs), decision documentation, and technical decision tracking

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>architecture-decisions</code> | <strong>Category:</strong> documentation | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

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
