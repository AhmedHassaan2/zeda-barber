# Component Refactoring: Before / After

## Before (Anti-pattern)

```tsx
// Single 200-line component with `any` types, inline styles
export function UserCard(props: any) {
  return (
    <div style={{ display: "flex", ... }}>
      {/* Everything inline, no composition, no types */}
    </div>
  );
}
```

**Problems:**
- `any` prop type — no compile-time safety
- Inline styles — inconsistent design system, hard to maintain
- Role badge logic duplicated inline — not reusable
- Confirm logic mixed with rendering — hard to test
- Single monolithic component — violates SRP

## After (Preferred)

```tsx
// Small, typed, composable components with separated concerns
function RoleBadge({ role }: { role: UserCardProps["role"] }) {
  const colors: Record<UserCardProps["role"], string> = {
    admin: "bg-red-100 text-red-800",
    member: "bg-blue-100 text-blue-800",
    viewer: "bg-gray-100 text-gray-800",
  };
  return <span className={...}>{role}</span>;
}

export function UserCard({ name, email, role, onRemove }: UserCardProps) {
  // ... extracted logic, typed props, composable sub-components
}
```

**Improvements:**
1. `UserCardProps` interface — full type safety and autocompletion
2. `RoleBadge` extracted — reusable across the app
3. `useCallback` — stable callback reference prevents child re-renders
4. Tailwind classes — consistent with design system
5. Confirmation logic isolated — easy to unit test
