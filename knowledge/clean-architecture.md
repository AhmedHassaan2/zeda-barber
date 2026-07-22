# Clean Architecture — Knowledge Base

## Purpose

Clean Architecture, introduced by Robert C. Martin, organizes code into concentric layers with clear boundaries and dependency rules. It ensures business logic is isolated from infrastructure concerns, making systems testable, maintainable, and adaptable to changing requirements.

## Core Concepts

### The Dependency Rule

Dependencies only point inward. Inner layers know nothing about outer layers. The core business logic (entities) is at the center and depends on nothing external.

```
Framework & Drivers (UI, DB, External APIs)
    ↓ depends on
Interface Adapters (Controllers, Gateways, Presenters)
    ↓ depends on
Application Business Rules (Use Cases)
    ↓ depends on
Enterprise Business Rules (Entities)
```

### Layer Responsibilities

**Entities (Domain Layer)**
Business objects with enterprise-wide rules. Contains data structures and business logic that rarely changes.
- Example: `User`, `Order`, `Product` entities with validation rules and business methods

**Use Cases (Application Layer)**
Orchestrates entities to fulfill specific business operations. Contains application-specific business rules.
- Example: `CreateOrder`, `RegisterUser`, `ProcessPayment` use cases

**Interface Adapters (Adapter Layer)**
Converts data between layers. Controllers receive HTTP requests, gateways interface with databases, presenters format responses.
- Example: `UserController`, `SupabaseUserRepository`, `UserPresenter`

**Frameworks & Drivers (Infrastructure Layer)**
External tools: databases, HTTP frameworks, UI libraries. This is where framework-specific code lives.
- Example: Next.js route handlers, Supabase client configuration, Tailwind components

### Ports and Adapters

**Ports** are interfaces defined by inner layers describing what they need. **Adapters** are implementations of those interfaces in outer layers.

```typescript
// Port (interface in domain layer)
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// Adapter (implementation in infrastructure layer)
class SupabaseUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const { data } = await supabase.from('users').select('*').eq('id', id).single();
    return data ? UserMapper.toDomain(data) : null;
  }
}
```

### Boundaries

Boundaries are where one layer communicates with another. At each boundary, data is converted to a format the receiving layer understands.

**Dependency Injection** passes adapters through constructors, allowing use cases to depend on interfaces rather than implementations.

### SOLID Principles Integration

Clean Architecture naturally enforces SOLID:
- **SRP:** Each layer has one reason to change
- **OCP:** New implementations can be added without modifying existing code
- **LSP:** Adapters implement port interfaces correctly
- **ISP:** Ports define minimal, focused interfaces
- **DIP:** High-level modules depend on abstractions (ports), not implementations

## Best Practices

1. **Define entities first** — Start with domain entities and their business rules; infrastructure adapts to the domain, not the reverse
2. **Use dependency injection** — Pass repository interfaces through use case constructors; never import concrete implementations directly
3. **Keep entities pure** — Entities should not import from infrastructure, UI frameworks, or external libraries; only pure business logic
4. **Map data at boundaries** — Convert between database records and domain entities at adapter boundaries; never expose database models to business logic
5. **Write use cases as plain functions** — Use cases should be framework-agnostic; they accept inputs and return results without HTTP awareness
6. **Test at every layer** — Unit test entities and use cases in isolation; integration test adapters; end-to-end test complete flows
7. **Extract shared utilities into lib/** — Common validation, date handling, and formatting belong in shared utilities, not tied to any layer
8. **Document boundaries and data flow** — When a system is complex, draw diagrams showing how data moves through layers

## Anti-Patterns

1. **Entities importing from infrastructure** — Domain entities must never import database clients, HTTP libraries, or UI frameworks; this breaks the dependency rule
2. **Fat controllers** — Business logic in route handlers makes code untestable and framework-dependent; extract into use cases
3. **Anemic domain model** — Entities with only data and no behavior push all logic into services; entities should contain business rules
4. **God objects** — Large classes doing everything violate SRP; split into focused entities, use cases, and adapters
5. **Direct database access in controllers** — Controllers should call use cases; use cases call repositories; never bypass the architecture
6. **Circular dependencies** — If A depends on B and B depends on A, the architecture has broken boundaries; introduce interfaces
7. **Over-engineering simple features** — Not every CRUD operation needs the full architecture; apply proportionally to complexity
8. **Leaking presentation logic into domain** — HTML formatting, status labels, and UI concerns must stay in the adapter/presentation layer

## Common Mistakes

1. **Applying full architecture to prototypes** — Clean Architecture adds overhead; for MVPs, a simpler MVC structure is more pragmatic
2. **Creating too many layers** — Each layer should add clear value; excessive abstraction makes navigation difficult without benefit
3. **Ignoring framework conventions** — Next.js has established patterns (App Router, Route Handlers); fight the framework only when necessary
4. **Over-abstracting repositories** — Generic repository patterns add complexity; only abstract when you genuinely need multiple implementations
5. **Passing domain entities to the UI** — Map domain entities to DTOs or view models before sending to the presentation layer
6. **Mixing validation and business rules** — Input validation (format checks) differs from business rules (state transitions); separate concerns
7. **Not handling errors at boundaries** — Each layer should handle its own error types; infrastructure errors should be translated at adapter boundaries
8. **Creating use cases that are too granular** — One use case per HTTP endpoint is excessive; group related operations

## Decision Guidelines

| Scenario | Recommendation |
|---|---|
| Simple CRUD application | MVC pattern; clean architecture is overkill |
| Complex business logic | Full clean architecture with entities, use cases, adapters |
| Rapid prototype | Start simple; refactor to layers when complexity grows |
| Microservices | Each service owns its domain; shared kernel for common entities |
| Team scaling | Enforce boundaries more strictly as team size grows |
| Library/SDK | Ports and adapters pattern; clean public API surface |

## References

- "Clean Architecture" by Robert C. Martin
- "Clean Code" by Robert C. Martin
- Domain-Driven Design by Eric Evans (complementary approach)
- Hexagonal Architecture (Alistair Cockburn) — precursor to ports and adapters
- Next.js App Router documentation for framework-specific patterns

## Practical Notes

- **TypeScript mapping:** Use TypeScript interfaces for ports and type guards for boundary validation
- **Supabase integration:** Supabase client is an adapter; create repository interfaces and implement them with Supabase queries
- **File organization:** `src/domain/` for entities, `src/application/` for use cases, `src/infrastructure/` for adapters, `src/presentation/` for UI
- **Testing strategy:** Entities and use cases get unit tests with no mocking; adapters get integration tests with real databases; UI gets component tests
- **Refactoring path:** Start with route handler → extract to use case → extract to entity → add repository interface when multiple data sources emerge
