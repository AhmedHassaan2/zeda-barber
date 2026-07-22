---
name: clean-architecture
description: Clean architecture patterns, separation of concerns, dependency inversion, and domain modeling
category: architecture
level: concept
priority: high
dependencies: []
related_skills: ["solid-principles", "design-patterns"]
related_agents: ["architect"]
activation_rules:
  - keywords: ["architecture", "clean", "domain", "repository", "service", "layer"]
---

# Clean Architecture

## Purpose

Guide clean architecture implementation for maintainable, testable systems.

## When to Use

- Designing new features
- Refactoring existing code
- Structuring applications
- Planning for scalability

## Core Concepts

### Layer Structure

```
src/
├── domain/           # Business logic (entities, value objects)
├── application/      # Use cases (orchestration)
├── infrastructure/   # External integrations (DB, APIs, storage)
└── presentation/     # UI components, API routes
```

### Dependency Rule

```
presentation → application → domain
infrastructure → application → domain

Domain layer has NO external dependencies.
```

### Repository Pattern

```typescript
// Domain: Define interface
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// Infrastructure: Implement
class SupabaseUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const { data } = await supabase.from('users').select('*').eq('id', id).single();
    return data ? toDomainUser(data) : null;
  }
}
```

### Use Cases

```typescript
// Application: Use cases
class CreateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) throw new Error('Email already exists');
    const user = User.create(input);
    await this.userRepo.save(user);
    return user;
  }
}
```

## Best Practices

- Keep domain pure (no framework dependencies)
- Use interfaces for external dependencies
- Inject dependencies, don't import directly
- Keep use cases focused (single responsibility)
- Document architectural decisions

## Anti-Patterns

- Domain depending on infrastructure
- Business logic in UI components
- God objects/classes
- Circular dependencies
- Not using dependency injection
