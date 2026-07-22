---
title: Ddd
description: Ddd reference documentation
---

# Ddd

# Domain-Driven Design — Knowledge Base

## Purpose

Domain-Driven Design (DDD) is an approach to software development that centers the implementation on a model of the core business domain. It bridges the gap between technical implementation and business requirements through collaborative modeling and strategic design patterns.

## Core Concepts

### Strategic Design

**Bounded Contexts**
A bounded context defines a boundary within which a particular domain model applies. Different contexts may use the same terms with different meanings (e.g., "Product" in Sales vs Inventory).

**Ubiquitous Language**
A shared language between developers and domain experts that is used consistently in code, documentation, and conversation. Every term maps directly to code artifacts.

**Context Mapping**
Defines relationships between bounded contexts:
- **Shared Kernel** — Two contexts share a common model
- **Customer-Supplier** — Upstream context provides; downstream context consumes
- **Anti-Corruption Layer (ACL)** — Translates between incompatible models
- **Open Host Service** — One context exposes a public API for others
- **Published Language** — Standard format for cross-context communication

### Tactical Design

**Entities**
Objects defined by their identity, not their attributes. Two entities with different data but the same ID are the same entity.

**Value Objects**
Immutable objects defined by their attributes, not identity. `Money(100, 'USD')` equals `Money(100, 'USD')` regardless of which instance.

**Aggregates**
Clusters of entities and value objects treated as a single unit for data changes. The aggregate root is the only entry point for modifications.

**Repositories**
Abstract the data access layer for aggregates. Each aggregate type has one repository that handles persistence.

**Domain Services**
Operations that don't naturally belong to any entity or value object. They encapsulate domain logic that spans multiple aggregates.

**Domain Events**
Records of something meaningful happening in the domain. `OrderPlaced`, `PaymentReceived`, `InventoryDepleted`.

**Factories**
Encapsulate complex object creation logic, especially when constructing aggregates with many invariants.

### Aggregate Design Rules

1. Protect business invariants within aggregate boundaries
2. Design small aggregates — reference other aggregates by identity, not by direct object reference
3. One transaction modifies one aggregate only
4. Use eventual consistency between aggregates
5. The aggregate root is the only entry point for state changes

## Best Practices

1. **Start with domain modeling** — Before writing code, map the domain with stakeholders; identify bounded contexts and ubiquitous language
2. **Keep aggregates small** — Small aggregates reduce contention and improve performance; reference other aggregates by ID
3. **Use value objects liberally** — Replace primitive types with meaningful value objects (`Email`, `Money`, `Address`); they enforce invariants
4. **Implement domain events for decoupling** — When a state change affects other contexts, emit a domain event; let subscribers react independently
5. **Use the anti-corruption layer for external systems** — Never let external API models leak into your domain; translate at the boundary
6. **Persist aggregates through repositories** — Repositories abstract persistence; domain code never calls database directly
7. **Write domain logic in entities and services, not use cases** — Use cases orchestrate; entities enforce invariants; services handle cross-aggregate logic
8. **Refactor toward deeper insight** — DDD is iterative; as understanding grows, refactor the model to reflect new insights

## Anti-Patterns

1. **Anemic domain model** — Entities with only getters/setters and all logic in services; business rules belong in entities
2. **God aggregate** — An aggregate containing too many entities creates contention; split into smaller, focused aggregates
3. **Direct database access in domain code** — Domain entities calling Supabase or Prisma directly breaks the abstraction; use repositories
4. **Leaking infrastructure into domain** — Importing HTTP libraries, database clients, or UI frameworks in domain code couples it to infrastructure
5. **Ignoring bounded contexts** — Applying a single model across the entire application creates confusion; context boundaries separate concerns
6. **Over-engineering simple domains** — Not every application needs full DDD; apply tactics proportionally to domain complexity
7. **Using ORM models as domain entities** — Database models should not be domain entities; map between them at repository boundaries
8. **Missing ubiquitous language** — Using technical jargon instead of domain terms creates misalignment between code and business understanding

## Common Mistakes

1. **Modeling database tables as aggregates** — Database structure differs from domain structure; design aggregates based on business invariants, not tables
2. **Creating aggregates without clear invariants** — An aggregate should protect at least one invariant; if it doesn't, it may not need to be an aggregate
3. **Using value objects for everything** — Some things genuinely have identity (users, orders); forcing value object semantics causes problems
4. **Ignoring event sourcing implications** — Domain events are not audit logs; they represent facts that trigger reactions, not just records
5. **Over-relying on domain services** — If a domain service has no state and just coordinates entities, it may belong in the use case layer
6. **Not updating the model** — DDD is iterative; as understanding deepens, the model should evolve; stale models cause misalignment
7. **Applying DDD to all layers** — DDD is most valuable in the domain layer; UI and infrastructure benefit from other patterns
8. **Forgetting that aggregates enforce invariants synchronously** — If an invariant requires cross-aggregate checks, use eventual consistency

## Decision Guidelines

| Domain Complexity | Recommendation |
|---|---|
| Simple CRUD (blog, portfolio) | MVC pattern; DDD overhead is unnecessary |
| Moderate business logic (e-commerce) | Tactical DDD: value objects, repositories, domain events |
| Complex domain (fintech, healthcare) | Full DDD: bounded contexts, aggregates, ubiquitous language |
| Multiple teams | Strategic DDD: context mapping, bounded contexts per team |
| Legacy modernization | Strangler fig pattern with DDD bounded contexts |

## References

- "Domain-Driven Design" by Eric Evans (the blue book)
- "Implementing Domain-Driven Design" by Vaughn Vernon
- "Domain-Driven Design Distilled" by Vaughn Vernon
- Martin Fowler's DDD resources: https://martinfowler.com/tags/domain%20driven%20design.html
- ddd-crew resources: https://github.com/ddd-crew

## Practical Notes

- **TypeScript value objects:** Use readonly classes or branded types for value objects with validation in constructors
- **Supabase repositories:** Implement repository interfaces with Supabase client; map between database rows and domain entities
- **Domain events in Next.js:** Use event emitters for in-process events; use message queues (Supabase Edge Functions) for async cross-context events
- **Aggregates and RLS:** Aggregate boundaries can map to RLS policies; the aggregate root's ID becomes the access control anchor
- **Modeling sessions:** Schedule domain modeling sessions with stakeholders quarterly; the model should evolve with business understanding

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
