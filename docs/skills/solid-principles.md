---
title: SOLID principles application, code smells identification, and refactoring patterns
description: SOLID principles application, code smells identification, and refactoring patterns
---

# SOLID principles application, code smells identification, and refactoring patterns

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>solid-principles</code> | <strong>Category:</strong> architecture | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# SOLID Principles

## Purpose

Guide SOLID principles application for maintainable code.

## When to Use

- Designing classes and modules
- Refactoring code
- Reviewing code quality
- Teaching best practices

## Core Concepts

### Single Responsibility Principle

```typescript
// Bad: Multiple responsibilities
class UserService {
  createUser(data: UserInput) { /* ... */ }
  sendWelcomeEmail(user: User) { /* ... */ }
  generateReport(users: User[]) { /* ... */ }
}

// Good: Separated concerns
class UserService {
  createUser(data: UserInput) { /* ... */ }
}
class EmailService {
  sendWelcomeEmail(user: User) { /* ... */ }
}
class ReportService {
  generateUserReport(users: User[]) { /* ... */ }
}
```

### Open/Closed Principle

```typescript
// Bad: Modifying existing code for new types
function getDiscount(user: User) {
  if (user.type === 'regular') return 0.05;
  if (user.type === 'premium') return 0.10;
  // Must modify for each new type
}

// Good: Open for extension
interface DiscountStrategy {
  getDiscount(user: User): number;
}
class RegularDiscount implements DiscountStrategy { /* ... */ }
class PremiumDiscount implements DiscountStrategy { /* ... */ }
```

### Liskov Substitution Principle

```typescript
// Subtypes must be substitutable for base types
// If a function works with Base, it must work with Derived
```

### Interface Segregation Principle

```typescript
// Bad: Fat interface
interface Manager {
  manageTeam(): void;
  writeCode(): void;
  designUI(): void;
}

// Good: Segregated interfaces
interface TeamLead { manageTeam(): void; }
interface Developer { writeCode(): void; }
interface Designer { designUI(): void; }
```

### Dependency Inversion Principle

```typescript
// High-level modules depend on abstractions
class OrderService {
  constructor(private repo: OrderRepository) {} // Dependency injected
}
```

## Best Practices

- Apply principles contextually, not dogmatically
- Refactor toward SOLID when touching code
- Use composition over inheritance
- Prefer small, focused interfaces
- Document when deviating from principles

## Anti-Patterns

- Applying all principles to every class
- Over-engineering simple solutions
- Using SOLID as justification for excessive abstraction

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
