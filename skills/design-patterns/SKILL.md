---
name: design-patterns
description: Software design patterns catalog with TypeScript/React examples and anti-pattern identification
category: architecture
level: concept
priority: medium
dependencies: ["clean-architecture", "solid-principles"]
related_skills: ["clean-architecture", "solid-principles"]
related_agents: ["architect"]
activation_rules:
  - keywords: ["pattern", "factory", "singleton", "observer", "strategy", "adapter"]
---

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
