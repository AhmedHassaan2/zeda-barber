---
date: 2026-07-19
category: patterns
tags: [react, composition, components, props, architecture]
project: shared
severity: none
---

# React Component Composition Patterns

## Context

Components in this workspace follow composition over configuration. Avoid prop-heavy "god components" — prefer small, focused pieces that compose together.

## Content

**Pattern 1: Compound Components**
```typescript
function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border p-4">{children}</div>;
}
Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b pb-2 font-semibold">{children}</div>;
};
Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="py-2">{children}</div>;
};
```

**Pattern 2: Render Props for Logic Sharing**
```typescript
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).catch(e => setError(e.message));
  }, [url]);
  return { data, error, loading: !data && !error };
}
```

**Pattern 3: Layout Components**
```typescript
function DashboardLayout({ children, sidebar }: { children: React.ReactNode; sidebar: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[240px_1fr] min-h-screen">
      <aside className="border-e">{sidebar}</aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
```

## Application

- Use compound components for related UI (cards, modals, forms)
- Use render props or custom hooks for logic sharing
- Use layout components for page structure
- Keep components under 150 lines; split when larger

## Related

- `2026-07-19_state-management-pattern.md` — When to use Context vs local state
- `2026-07-19_file-structure.md` — Where to place components
