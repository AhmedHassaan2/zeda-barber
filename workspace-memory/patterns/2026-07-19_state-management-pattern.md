---
date: 2026-07-19
category: patterns
tags: [react, context, state, hooks, performance]
project: shared
severity: none
---

# React Context vs useState Decision Pattern

## Context

State management decisions in this workspace follow a clear hierarchy: useState for local state, Context for shared state, never Redux or Zustand unless complexity demands it.

## Content

**Use useState when:**
- State belongs to a single component or its children
- State is form input, toggles, local UI state
- State doesn't need to survive page navigation

```typescript
function SearchFilter() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  return <div>{/* filter UI */}</div>;
}
```

**Use Context when:**
- State is needed across 3+ components at different tree levels
- State represents user session, language, theme
- State needs to persist across route changes

```typescript
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
```

**Never use State for:**
- Derived data (compute during render)
- URL state (use search params)
- Server state (use React Query or Server Components)

## Application

Before adding state, ask: "Who needs this?" One component = useState. Multiple distant components = Context. Server data = Server Components.

## Related

- `2026-07-19_batch-state-updates.md` — Performance: batching updates
- `2026-07-19_server-component-data-fetching.md` — Prefer Server Components for data
