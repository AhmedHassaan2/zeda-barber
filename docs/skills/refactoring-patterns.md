---
title: Refactoring techniques, code smell identification, and improvement strategies
description: Refactoring techniques, code smell identification, and improvement strategies
---

# Refactoring techniques, code smell identification, and improvement strategies

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>refactoring-patterns</code> | <strong>Category:</strong> architecture | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

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
