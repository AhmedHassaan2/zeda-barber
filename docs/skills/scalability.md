---
title: System scalability patterns, performance under load, and infrastructure planning
description: System scalability patterns, performance under load, and infrastructure planning
---

# System scalability patterns, performance under load, and infrastructure planning

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>scalability</code> | <strong>Category:</strong> architecture | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# Scalability

## Purpose

Guide system scalability planning and implementation.

## When to Use

- Planning for growth
- Designing high-traffic features
- Optimizing for performance under load
- Infrastructure planning

## Core Concepts

### Scaling Strategies

| Strategy | How | Trade-off |
|----------|-----|-----------|
| Vertical | Bigger server | Limited by hardware |
| Horizontal | More servers | Complex state management |
| Caching | Reduce DB load | Cache invalidation complexity |
| CDN | Edge delivery | Dynamic content limitations |
| Database | Read replicas | Write still single point |
| Queue | Async processing | Eventual consistency |

### Application-Level Scaling

```typescript
// Stateless services (easy to scale)
class ProductService {
  // No local state - can run on any instance
  async getProducts() {
    return await this.db.select().from('products');
  }
}

// Shared state via Redis
class CartService {
  async getCart(userId: string) {
    return await redis.get(`cart:${userId}`);
  }
}
```

### Database Scaling

```sql
-- Read replicas for read-heavy workloads
-- Connection pooling (Supabase handles this)
-- Query optimization (indexes, EXPLAIN)
-- Partitioning for large tables
```

## Best Practices

- Measure before optimizing
- Design for statelessness
- Use caching aggressively
- Implement proper monitoring
- Plan for 10x current load
- Use async processing where possible
- Document scaling decisions

## Anti-Patterns

- Premature optimization
- Single point of failure
- Not monitoring metrics
- Scaling database before application
- Ignoring connection limits

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
