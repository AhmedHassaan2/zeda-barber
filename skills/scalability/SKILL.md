---
name: scalability
description: System scalability patterns, performance under load, and infrastructure planning
category: architecture
level: concept
priority: medium
dependencies: ["clean-architecture"]
related_skills: ["caching-strategies", "database-design"]
related_agents: ["architect", "cloud"]
activation_rules:
  - keywords: ["scale", "scalability", "load", "capacity", "horizontal", "vertical"]
---

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
