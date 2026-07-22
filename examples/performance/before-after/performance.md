# Performance Refactoring: Before / After

## Before (Anti-pattern)

```tsx
export function ProductList({ products, sortBy }: any) {
  const sorted = [...products].sort((a, b) => ...); // Re-sorts on every render
  return (
    <div>
      {sorted.map((p) => (
        <div key={p.id}>
          <img src={p.image} alt={p.name} />  {/* Unoptimized */}
        </div>
      ))}
      <HeavyChart data={sorted} />  {/* Loaded eagerly */}
    </div>
  );
}
```

**Problems:**
- Sort recalculated every render — no `useMemo`
- All `ProductCard`s re-render when any changes — no `memo`
- `<img>` tags — no lazy loading, no size hints, no blur placeholder
- `HeavyChart` loaded eagerly — blocks initial render
- Inline styles — no Tailwind utilities

## After (Preferred)

```tsx
const sorted = useMemo(() => [...products].sort(...), [products, sortBy]);
const MemoizedProductCard = memo(ProductCard);
const HeavyChart = lazy(() => import("./heavy-chart"));

// <Image> with sizes, blur placeholder, priority hints
// <Suspense> with skeleton fallback
```

**Improvements:**
1. **`useMemo`** — sort only recalculates when inputs change
2. **`memo`** — card re-renders only when its props change
3. **`lazy` + `Suspense`** — HeavyChart code-split into separate chunk
4. **`next/image`** — responsive sizing, blur placeholders, WebP conversion
5. **Skeleton fallback** — visual stability during lazy load
