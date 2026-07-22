# Folder Structure Refactoring: Before / After

## Before (Anti-pattern)

```
src/components/shared/common/ui/buttons/PrimaryButton.tsx
src/components/features/dashboard/hooks/useDashboardData.ts
src/services/api/endpoints/users.ts
src/types/dashboard/index.ts
```

**Problems:**
- 6+ levels of nesting
- Feature code scattered across `components`, `services`, `types`
- "shared/common" catches unrelated code
- Hard to delete a feature — files are everywhere

## After (Preferred)

```
src/app/dashboard/page.tsx          # Route owns the feature
src/components/dashboard/stats-card.tsx  # Co-located by domain
src/components/ui/button.tsx        # Shared primitives in one place
src/lib/supabase/server.ts          # Infrastructure in lib/
src/hooks/use-user.ts               # Hooks in dedicated folder
src/types/index.ts                  # One types file
```

**Migration Steps:**

1. **Flatten component tree** — Move from `shared/common/ui/` to `components/ui/`
2. **Co-locate by domain** — Dashboard components in `components/dashboard/`
3. **Move API clients** — From `services/api/` to `lib/supabase/`
4. **Consolidate types** — One `types/index.ts` unless >100 exports
5. **Delete barrel files** — Import directly from component files
6. **Rename** — `PrimaryButton` → `button.tsx` (kebab-case files, PascalCase exports)

**Result:** 3 levels max, clear ownership, easy to navigate.
