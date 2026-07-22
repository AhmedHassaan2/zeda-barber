# React 19 Patterns — Knowledge Reference

## Purpose

Reference for modern React 19 development covering hooks, component patterns, composition strategies, render optimization, concurrent features, and Server Components. Focused on production-quality patterns that scale.

## Core Concepts

### React 19 Evolution

React 19 introduces significant improvements: Server Components (stable), Actions for form handling, `use()` hook for reading promises/context in render, improved ref forwarding, document metadata, and stylesheet support. The concurrent rendering engine enables priority-based rendering and Suspense for data fetching.

### Hooks Ecosystem

- **`useState`** — local state with lazy initialization; returns `[value, setter]`
- **`useEffect`** — side effects with cleanup; runs after render, dependency array controls re-execution
- **`useCallback`** — memoizes function references; prevents unnecessary re-renders of child components
- **`useMemo`** — memoizes computed values; avoids expensive recalculations
- **`useRef`** — mutable container that persists across renders without triggering re-renders
- **`useContext`** — subscribes to context values; re-renders when context changes
- **`use()` (React 19)** — reads promises or context during render; enables async component patterns
- **`useActionState`** (React 19) — manages form action state with pending/error/success states
- **`useFormStatus`** (React 19) — reads parent form submission status from child components
- **`useOptimistic`** (React 19) — provides optimistic state updates during async transitions
- **`useTransition`** — marks state updates as non-urgent transitions; keeps UI responsive

### Component Patterns

- **Functional Components** — the standard; always prefer over class components
- **Compound Components** — share implicit state via Context between related components
- **Render Props** — pass render functions for flexible composition (largely replaced by hooks)
- **HOCs** — wrap components for cross-cutting concerns (largely replaced by hooks)
- **Container/Presentational** — separate data fetching from display logic
- **Controlled/Uncontrolled** — form input patterns; controlled via state, uncontrolled via refs

### Composition over Inheritance

React favors composition. Use `children` prop, render props, and Context to share behavior rather than creating deep inheritance hierarchies. Wrapping components with HOCs or hooks is preferred over extending component classes.

### Server Components

Components that run only on the server. They can directly access databases, file systems, and backend services. They produce zero client-side JavaScript. They cannot use hooks, event handlers, or browser APIs.

### Concurrent Features

React 18+ introduced concurrent rendering. `startTransition` marks updates as low priority. `Suspense` boundaries allow progressive loading. `useDeferredValue` defers expensive re-renders. These features enable responsive UIs during heavy computation.

## Best Practices

1. **Extract custom hooks for reusable logic** — when you see `useEffect` + `useState` patterns repeated, encapsulate them into a named custom hook with clear semantics
2. **Use `useCallback` and `useMemo` strategically** — only memoize values passed to memoized children or used as dependency array items; over-memoization adds overhead
3. **Lift state to the lowest common ancestor** — only lift state as high as needed; avoid "state drilling" by using Context or composition
4. **Use `useTransition` for non-urgent updates** — filtering, tab switching, and navigation should be transitions to keep input responsive
5. **Prefer controlled components for forms** — controlled forms are predictable and testable; use uncontrolled only for performance-critical inputs
6. **Keep components small and focused** — if a component handles multiple concerns, split it into focused subcomponents with clear responsibilities
7. **Use `key` correctly for lists** — use stable, unique identifiers, never array indices for dynamic lists
8. **Handle loading and error states explicitly** — every async-driven component should have loading, error, and empty states

## Anti-Patterns

1. **Overusing `useEffect` for derived state** — if state can be computed from props or other state during render, use `useMemo` or compute directly; `useEffect` for derivation causes extra renders
2. **Mutating state directly** — always use the setter from `useState`; direct mutations do not trigger re-renders
3. **Creating new objects/arrays in render without memoization** — passing new references as props causes child re-renders; use `useMemo` for expensive objects
4. **Using `useEffect` with missing or incorrect dependencies** — stale closures and infinite loops; use exhaustive-deps lint rule
5. **Passing inline functions to memoized children** — destroys the benefit of `React.memo`; use `useCallback` for handler props
6. **Using context for frequently changing values** — every consumer re-renders; split into granular contexts or use state management for high-frequency updates
7. **Not cleaning up subscriptions in `useEffect`** — return cleanup functions for timers, event listeners, and subscriptions to prevent memory leaks
8. **Using `index` as `key` for dynamic lists** — causes reconciliation bugs when items are reordered, inserted, or removed

## Common Mistakes

1. **Forgetting that `useState` triggers re-render** — setting the same value still triggers a render (React 18+ skips it for primitives, but not for objects)
2. **Calling hooks conditionally** — hooks must be called in the same order every render; never inside loops, conditions, or nested functions
3. **Not using `useRef` for DOM access** — `document.querySelector` bypasses React's rendering; always use refs
4. **Treating `useEffect` cleanup as optional** — missing cleanup causes memory leaks and stale state
5. **Over-memoizing simple values** — `useMemo(() => a + b, [a, b])` adds overhead worse than recalculating; only memoize expensive computations
6. **Creating context for single-consumer values** — prop drilling for 1-2 levels is simpler than context setup
7. **Ignoring React DevTools Profiler** — performance issues are invisible without measuring; use the profiler before optimizing
8. **Not handling asynchronous errors** — `Error Boundaries` do not catch async errors; use `Suspense` with fallback or handle in effects

## Decision Guidelines

| Scenario | Approach |
|---|---|
| Component needs local state | `useState` |
| Expensive computation from state | `useMemo` |
| Expensive function passed as prop | `useCallback` |
| DOM element access | `useRef` |
| Shared state across tree | `useContext` or state management |
| Async data fetching | Server Component or `use()` in React 19 |
| Form with server mutation | `useActionState` |
| Non-urgent state update | `useTransition` + `useDeferredValue` |
| Optimistic UI | `useOptimistic` |
| Complex reusable logic | Custom hook |

## References

- [React 19 Documentation](https://react.dev)
- [React Hooks Reference](https://react.dev/reference/react/hooks)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [React Performance Guide](https://react.dev/learn)

## Practical Notes

- React 19's `use()` hook is experimental in some environments; check framework support before adopting
- `React.memo` is rarely needed with proper hook usage; prefer component composition to avoid re-renders
- Error Boundaries must be class components (no hook equivalent yet); wrap them in layout files
- React Strict Mode double-invokes effects in development to catch missing cleanup; this does not happen in production
- Use `React.lazy` + `Suspense` for code splitting at the route or component level
