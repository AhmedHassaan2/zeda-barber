---
name: solid-principles
description: SOLID principles application, code smells identification, and refactoring patterns
category: architecture
level: concept
priority: high
dependencies: []
related_skills: ["clean-architecture", "refactoring-patterns"]
related_agents: ["architect", "reviewer"]
activation_rules:
  - keywords: ["SOLID", "single responsibility", "open closed", "dependency inversion"]
---

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
