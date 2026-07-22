---
title: React component patterns, hooks, composition, performance optimization, and modern React 19 features
description: React component patterns, hooks, composition, performance optimization, and modern React 19 features
---

# React component patterns, hooks, composition, performance optimization, and modern React 19 features

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>react-patterns</code> | <strong>Category:</strong> frontend | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# React Patterns

## Purpose

Guide the creation of well-structured, performant, and maintainable React components using modern patterns and React 19 features.

## When to Use

- Creating new React components
- Refactoring existing components
- Implementing complex UI interactions
- Optimizing component performance

## Core Concepts

### Component Organization

```
src/components/
├── ui/              # Primitives (Button, Input, Badge)
├── layout/          # Layout components (Header, Footer, Container)
├── features/        # Feature-specific components
└── shared/          # Cross-feature shared components
```

### Server vs Client Components (React 19 / Next.js 16)

```tsx
// Server Component (default) — use for static content, data fetching
async function ProductList() {
  const products = await fetchProducts();
  return <ProductGrid products={products} />;
}

// Client Component — use only when interactivity is needed
'use client';
function SearchFilter({ onFilter }) {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

### Composition Patterns

```tsx
// Compound Components
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

// Render Props (when needed)
<DataList items={items} renderItem={(item) => <ListItem key={item.id} {...item} />} />

// Custom Hooks for logic reuse
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
```

### Performance Optimization

```tsx
// Memoization
const MemoizedChild = React.memo(ChildComponent);

// Callback stability
const handleSubmit = useCallback((data: FormData) => {
  submitToApi(data);
}, []);

// Expensive computation
const sorted = useMemo(() => items.sort(compareFn), [items]);
```

## Best Practices

- Use TypeScript interfaces for all props
- Keep components under 200 lines
- One component per file
- Extract logic into custom hooks
- Avoid inline object/array definitions in JSX
- Use `key` prop correctly (stable, unique IDs)
- Handle loading and error states
- Prefer controlled components for forms

## Anti-Patterns

- Using `any` type for props
- Mutating state directly
- Using index as key for dynamic lists
- Creating new objects/arrays in render
- Deep component nesting (use composition)
- Inline function definitions causing re-renders

## Example

```tsx
// Good: Well-typed, composable, performant
interface UserCardProps {
  user: User;
  onSelect: (userId: string) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = useCallback(() => {
    onSelect(user.id);
  }, [user.id, onSelect]);

  return (
    <button onClick={handleClick} className="flex items-center gap-4 p-4">
      <Avatar src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
    </button>
  );
}
```

## Related Resources

- React 19 docs: https://react.dev
- React patterns: https://reactpatterns.com

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
