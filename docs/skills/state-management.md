---
title: React state management patterns including useState, useReducer, Context, and when to use external stores
description: React state management patterns including useState, useReducer, Context, and when to use external stores
---

# React state management patterns including useState, useReducer, Context, and when to use external stores

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>state-management</code> | <strong>Category:</strong> frontend | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# State Management

## Purpose

Guide React state management decisions — when to use which pattern, how to structure state, and how to avoid common pitfalls.

## When to Use

- Choosing a state management approach
- Lifting state between components
- Sharing state across component trees
- Managing complex form state
- Deciding when to reach for external stores

## State Decision Tree

```
Is the state local to one component?
  YES → useState
  NO ↓

Is it used by 2-5 nearby components?
  YES → Lift state up + prop drilling (acceptable for shallow trees)
  NO ↓

Is it used across distant parts of the component tree?
  YES → React Context
  NO ↓

Is it complex async state with caching needs?
  YES → SWR or React Query (server state)
  NO ↓

Is it complex client state with many actions?
  YES → useReducer + Context, or Zustand
  NO ↓

Is it truly global (theme, auth, language)?
  YES → React Context with Provider
```

## Pattern 1: useState (Local State)

```tsx
// Best for: simple, local state in one component
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Best for: form inputs
function NameInput() {
  const [name, setName] = useState('');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

## Pattern 2: useReducer (Complex Local State)

```tsx
// Best for: state with multiple sub-values and complex transitions
type State = { step: number; data: FormData; errors: Record<string, string> };
type Action =
  | { type: 'NEXT_STEP' }
  | { type: 'SET_DATA'; payload: Partial<FormData> }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'SET_DATA':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'RESET':
      return { step: 1, data: initialData, errors: {} };
  }
}

function BookingWizard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {state.step === 1 && <Step1 />}
      {state.step === 2 && <Step2 />}
    </WizardContext.Provider>
  );
}
```

## Pattern 3: React Context (Shared State)

```tsx
// Best for: theme, language, auth — low-frequency updates

// 1. Create context
type LanguageContextType = { lang: 'ar' | 'en'; setLang: (l: 'ar' | 'en') => void };
const LanguageContext = createContext<LanguageContextType | null>(null);

// 2. Create provider
function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. Consume with hook
function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

// 4. Use in components
function Header() {
  const { lang, setLang } = useLanguage();
  return <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>{lang}</button>;
}
```

## Pattern 4: Server State (SWR / React Query)

```tsx
// Best for: data from API/DB — async, cacheable, refreshable
import useSWR from 'swr';

function ProductList() {
  // SWR handles caching, revalidation, loading, error states
  const { data: products, error, isLoading } = useSWR('/api/products', fetcher);

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage />;

  return products.map(p => <ProductCard key={p.id} product={p} />);
}
```

## Pattern 5: URL State (For Filters/Search)

```tsx
// Best for: filters, pagination, search — shareable via URL
'use client';
import { useSearchParams, useRouter } from 'next/navigation';

function ProductFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category') ?? 'all';

  function setCategory(cat: string) {
    const params = new URLSearchParams(searchParams);
    params.set('category', cat);
    router.push(`?${params.toString()}`);
  }

  return (
    <select value={category} onChange={e => setCategory(e.target.value)}>
      <option value="all">All</option>
      <option value="haircut">Haircut</option>
    </select>
  );
}
```

## Anti-Patterns

### 1. Over-Provider (Context Everywhere)

```tsx
// BAD: Wrapping entire app in too many providers
<AuthProvider>
  <ThemeProvider>
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
</AuthProvider>

// GOOD: Only use Context for truly global state
// Keep most state local or lifted
```

### 2. Storing Derived State

```tsx
// BAD: Storing computed values
const [filteredProducts, setFilteredProducts] = useState(products);
const [filter, setFilter] = useState('');

// GOOD: Compute during render
const filteredProducts = products.filter(p => p.name.includes(filter));
```

### 3. Prop Drilling Too Deep

```tsx
// BAD: Passing through 4+ levels
<A data={x}> → <B data={x}> → <C data={x}> → <D data={x} />

// GOOD: Use Context for deep trees, or restructure components
```

### 4. Mutating State Directly

```tsx
// BAD
state.items.push(newItem);
setState(state);

// GOOD
setState({ ...state, items: [...state.items, newItem] });
```

## Best Practices

- Start with useState, upgrade only when needed
- Keep state as close to where it's used as possible
- Use URL state for shareable filters and pagination
- Separate server state (SWR) from client state (useState/Context)
- Avoid putting rapidly-updating data in Context (causes re-renders)
- Use useReducer for complex state transitions
- Derive computed values, don't store them
- Never store React elements or functions in state
- Split large Contexts into smaller, focused ones
- Memoize Context values to prevent unnecessary re-renders

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
