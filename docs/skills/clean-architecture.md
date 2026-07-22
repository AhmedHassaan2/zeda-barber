---
title: Clean architecture patterns, separation of concerns, dependency inversion, and domain modeling
description: Clean architecture patterns, separation of concerns, dependency inversion, and domain modeling
---

# Clean architecture patterns, separation of concerns, dependency inversion, and domain modeling

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>clean-architecture</code> | <strong>Category:</strong> architecture | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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
