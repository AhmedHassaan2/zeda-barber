---
date: 2026-07-19
category: lessons
tags: [react, performance, state, re-render, optimization]
project: shared
severity: none
---

# Batch React State Updates

## Context

Multiple `setState` calls in sequence caused 3-4 unnecessary re-renders per user action. This was visible as UI lag during form submissions and data loading.

## Content

**The Problem:**
```typescript
function handleSubmit() {
  setLoading(true);     // Re-render 1
  setError(null);       // Re-render 2
  setData(result);      // Re-render 3
  setLoading(false);    // Re-render 4
}
```

**The Fix — Use Functional Updates:**
```typescript
function handleSubmit() {
  // React 18+ automatically batches these
  setLoading(true);
  setError(null);
  // Only 1 re-render happens
}
```

**UseReducer for Complex State:**
```typescript
type State = { loading: boolean; error: string | null; data: User[] | null };
type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; data: User[] }
  | { type: "ERROR"; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOADING": return { ...state, loading: true, error: null };
    case "SUCCESS": return { loading: false, data: action.data, error: null };
    case "ERROR": return { loading: false, error: action.error, data: null };
  }
}

// Single state update, single re-render
dispatch({ type: "LOADING" });
const result = await fetchData();
dispatch(result ? { type: "SUCCESS", data: result } : { type: "ERROR", error: "Failed" });
```

**Rules:**
- React 18+ batches all updates automatically (even in async)
- Use `useReducer` when state has 3+ related fields
- Avoid spreading state into multiple `useState` calls for related data

## Application

When a user action triggers multiple state changes, verify they're batched. Use reducer pattern for any state with loading/data/error triplet.

## Related

- `2026-07-19_state-management-pattern.md` — When to use Context vs useState
- `2026-07-19_server-component-data-fetching.md` — Server Components avoid client state
