---
title: Software design patterns catalog with TypeScript/React examples and anti-pattern identification
description: Software design patterns catalog with TypeScript/React examples and anti-pattern identification
---

# Software design patterns catalog with TypeScript/React examples and anti-pattern identification

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>design-patterns</code> | <strong>Category:</strong> architecture | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# Design Patterns

## Purpose

Guide software design pattern application with practical examples.

## When to Use

- Solving common design problems
- Improving code structure
- Communicating solutions
- Refactoring toward better patterns

## Core Concepts

### Creational Patterns

```typescript
// Factory Pattern
class NotificationFactory {
  static create(type: 'email' | 'sms' | 'push'): Notification {
    switch (type) {
      case 'email': return new EmailNotification();
      case 'sms': return new SMSNotification();
      case 'push': return new PushNotification();
    }
  }
}

// Builder Pattern
const query = new QueryBuilder()
  .select('name', 'email')
  .from('users')
  .where('active', '=', true)
  .orderBy('name')
  .build();
```

### Structural Patterns

```typescript
// Adapter Pattern
class SupabaseAdapter {
  constructor(private supabase: SupabaseClient) {}
  
  async findAll(table: string): Promise<any[]> {
    const { data } = await this.supabase.from(table).select('*');
    return data;
  }
}

// Decorator Pattern
function withLogging<T>(fn: T): T {
  return (...args: any[]) => {
    console.log('Calling:', args);
    return fn(...args);
  };
}
```

### Behavioral Patterns

```typescript
// Observer Pattern (React hooks)
function useEventEmitter() {
  const listeners = useRef<Map<string, Function[]>>(new Map());
  
  const on = useCallback((event: string, fn: Function) => {
    listeners.current.get(event)?.push(fn);
    return () => { /* cleanup */ };
  }, []);
  
  const emit = useCallback((event: string, data: any) => {
    listeners.current.get(event)?.forEach(fn => fn(data));
  }, []);
  
  return { on, emit };
}

// Strategy Pattern
interface SortStrategy<T> {
  compare(a: T, b: T): number;
}
```

## Best Practices

- Use patterns to solve problems, not for elegance
- Prefer simple solutions over pattern-heavy ones
- Document why a pattern is used
- Consider refactoring toward patterns when code smells appear
- Know when NOT to use a pattern

## Anti-Patterns

- Using patterns for the sake of patterns
- Over-engineering simple problems
- God objects
- Spaghetti code
- Golden hammer (one pattern everywhere)

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
