---
title: Solid
description: Solid reference documentation
---

# Solid

# SOLID Principles — Knowledge Base

## Purpose

SOLID is a mnemonic acronym for five object-oriented design principles that make software more understandable, flexible, and maintainable. This knowledge base provides practical TypeScript/React examples for each principle and common violations to avoid.

## Core Concepts

### Single Responsibility Principle (SRP)

A module should have one, and only one, reason to change. Each class, function, or module should encapsulate a single piece of functionality.

**Why it matters:** Changes to one concern don't ripple into unrelated code. Testing is focused. Code is easier to understand.

### Open/Closed Principle (OCP)

Software entities should be open for extension but closed for modification. You should be able to add new behavior without changing existing code.

**Why it matters:** Adding new features doesn't risk breaking existing functionality. Existing tests remain valid.

### Liskov Substitution Principle (LSP)

Objects of a supertype should be replaceable with objects of a subtype without altering the correctness of the program. Subtypes must be substitutable for their base types.

**Why it matters:** Polymorphism works correctly. Code that uses a base type works identically with any derived type.

### Interface Segregation Principle (ISP)

Clients should not be forced to depend on interfaces they don't use. Prefer small, specific interfaces over large, general-purpose ones.

**Why it matters:** Reduces unnecessary coupling. Changes to unused methods don't affect clients. Easier to mock for testing.

### Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces). Abstractions should not depend on details; details should depend on abstractions.

**Why it matters:** Business logic is independent of infrastructure. Swapping implementations (Supabase → Prisma) requires changing only adapter code.

## Best Practices

1. **Apply SRP at the function level** — Each function should do one thing; if a function does input validation AND database insertion, split it
2. **Use TypeScript interfaces for extension points** — Define interfaces at module boundaries; new implementations can extend without modifying existing code
3. **Verify LSP with behavioral tests** — Write tests that operate on base types and pass derived types; any failure indicates LSP violation
4. **Prefer multiple small interfaces over one large** — Split `UserRepository` into `UserReader` and `UserWriter` if clients need different operations
5. **Inject dependencies through constructors** — Pass dependencies as constructor parameters; never instantiate concrete classes inside business logic
6. **Use composition over inheritance** — Compose behaviors with small modules rather than creating deep inheritance trees
7. **Extract strategies for varying behavior** — When behavior varies, use the Strategy pattern (interface + implementations) rather than conditionals
8. **Refactor toward SOLID incrementally** — Don't rewrite existing code; refactor toward principles one function at a time during feature work

## Anti-Patterns

1. **God class** — A single class handling user management, email sending, and payment processing violates SRP; split into focused modules
2. **Switch statements for type dispatch** — Large switch/case blocks that add new branches for each type violate OCP; use polymorphism instead
3. **Type narrowing with `as` casts** — Using type assertions to force compatibility violates LSP; redesign the type hierarchy instead
4. **Fat interfaces with unused methods** — An interface with 20 methods where clients use 2 violates ISP; split into focused interfaces
5. **Instantiating dependencies inside business logic** — `const repo = new SupabaseRepo()` inside a use case violates DIP; inject the dependency
6. **Deep inheritance hierarchies** — `BaseService → CrudService → UserService → AdminUserService` is fragile; use composition instead
7. **Return type violations** — A subtype returning a more restrictive type than the parent violates LSP; return types must be covariant or identical
8. **Framework dependencies in domain code** — Importing `next/navigation` in entity classes couples business logic to Next.js; use abstractions

## Common Mistakes

1. **Applying all five principles simultaneously** — Over-application leads to over-engineering; apply proportionally to the complexity of each module
2. **Confusing SRP with "one method per class"** — SRP means one reason to change, not extreme decomposition; cohesive related methods are fine
3. **Creating interfaces for everything** — Not every class needs an interface; add abstractions only when you have multiple implementations or need testability
4. **Using inheritance when composition suffices** — `class AdminUser extends User` seems natural but `class User { role: Role }` is more flexible
5. **Ignoring principle interactions** — SRP and DIP work together; well-separated responsibilities make dependency inversion natural
6. **Over-abstracting simple modules** — A utility function that formats dates doesn't need an interface and implementation; keep it simple
7. **Applying OCP to every conditional** — Not every `if` statement needs the Strategy pattern; OCP applies to stable interfaces with changing implementations
8. **Forgetting that SOLID applies to modules, not just classes** — File-level module organization should follow SOLID; one module per concern

## Decision Guidelines

| Scenario | Primary Principle | Application |
|---|---|---|
| Feature has multiple reasons to change | SRP | Split into separate modules per concern |
| New variants of a behavior expected | OCP | Define interface; new variants implement without modifying |
| Polymorphic code has bugs | LSP | Review subtype contracts; ensure substitutability |
| Module changes ripple across codebase | ISP + DIP | Narrow interfaces; inject dependencies |
| Testing requires extensive mocking | ISP + DIP | Smaller interfaces; dependency injection |
| Refactoring legacy code | All (incremental) | Extract methods → extract classes → introduce interfaces |

## References

- "Clean Architecture" by Robert C. Martin
- "Agile Software Development: Principles, Patterns, and Practices" by Robert C. Martin
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- Refactoring Guru — SOLID: https://refactoring.guru/design-patterns/solid
- Martin Fowler's blog: https://martinfowler.com/

## Practical Notes

- **TypeScript advantages:** TypeScript's type system makes SOLID violations visible at compile time; leverage interfaces and generics
- **React hooks:** Custom hooks naturally support DIP by abstracting state logic; components depend on hook interfaces, not implementations
- **Next.js patterns:** Route Handlers are presentation layer; extract business logic into use cases; use Supabase through repository interfaces
- **Testing impact:** SOLID code is dramatically easier to test; if testing requires elaborate setup, the code likely violates a principle
- **Team adoption:** Introduce SOLID through code review; point out violations and refactor together rather than mandating upfront

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
