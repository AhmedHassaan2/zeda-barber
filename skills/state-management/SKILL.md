---
name: state-management
description: React state management patterns including useState, useReducer, Context, and when to use external stores
category: frontend
level: concept
priority: high
dependencies: ["react-patterns"]
related_skills: ["react-patterns", "nextjs-app-router"]
related_agents: ["frontend"]
activation_rules:
  - keywords: ["state", "useState", "useReducer", "Context", "Redux", "Zustand", "global state"]
---

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
