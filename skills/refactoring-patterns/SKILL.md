---
name: refactoring-patterns
description: Refactoring techniques, code smell identification, and improvement strategies
category: architecture
level: concept
priority: medium
dependencies: ["clean-architecture", "solid-principles"]
related_skills: ["clean-architecture", "solid-principles", "code-review-standards"]
related_agents: ["architect", "reviewer"]
activation_rules:
  - keywords: ["refactor", "code smell", "technical debt", "improvement"]
---

# Refactoring Patterns

## Purpose

Guide refactoring techniques for code quality improvement.

## When to Use

- Identifying code smells
- Planning refactoring
- Improving code structure
- Reducing technical debt

## Core Concepts

### Common Code Smells

| Smell | Description | Refactoring |
|-------|-------------|-------------|
| Long Method | Too many lines | Extract Function |
| Large Class | Too many responsibilities | Extract Class |
| Duplicated Code | Same logic in multiple places | Extract Function |
| Primitive Obsession | Using primitives for complex data | Introduce Value Object |
| Switch Statements | Multiple conditionals | Replace with Polymorphism |
| Dead Code | Unused code | Delete it |

### Extract Function

```typescript
// Before
function processOrder(order: Order) {
  // Validation
  if (!order.items.length) throw new Error('No items');
  if (order.total < 0) throw new Error('Invalid total');
  
  // Processing
  const discount = calculateDiscount(order);
  const total = order.total - discount;
  
  // Notification
  sendEmail(order.email, `Order total: ${total}`);
}

// After
function validateOrder(order: Order) {
  if (!order.items.length) throw new Error('No items');
  if (order.total < 0) throw new Error('Invalid total');
}

function processOrder(order: Order) {
  validateOrder(order);
  const total = calculateTotal(order);
  notifyCustomer(order, total);
}
```

### Extract Class

```typescript
// Before
class UserManager {
  createUser() { /* ... */ }
  sendEmail() { /* ... */ }
  generateReport() { /* ... */ }
}

// After
class UserService {
  createUser() { /* ... */ }
}
class EmailService {
  sendEmail() { /* ... */ }
}
class ReportService {
  generateReport() { /* ... */ }
}
```

## Best Practices

- Refactor in small steps
- Keep tests passing
- Commit frequently during refactoring
- Review refactoring with team
- Document complex refactoring
- Use tooling to assist (IDE refactorings)

## Anti-Patterns

- Refactoring without tests
- Large-scale refactoring in one commit
- Not communicating refactoring plans
- Mixing refactoring with feature work
- Ignoring team conventions
