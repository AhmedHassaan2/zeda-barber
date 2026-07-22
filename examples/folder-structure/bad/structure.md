# Bad: Deep Nesting, Inconsistent Naming

```
src/
  components/
    shared/
      common/
        ui/
          buttons/
            PrimaryButton.tsx
            SecondaryButton.tsx
            ButtonStyles.ts
            index.ts
        forms/
          inputs/
            TextInput.tsx
            EmailInput.tsx
            PasswordInput.tsx
            index.ts
          FormContainer.tsx
          FormProvider.tsx
          index.ts
    features/
      dashboard/
        components/
          cards/
            StatsCard.tsx
            UserCard.tsx
            index.ts
        hooks/
          useStats.ts
          useUsers.ts
          useDashboardData.ts
          index.ts
  utils/
    helpers/
      common.ts
      formatting.ts
      validation.ts
    constants/
      colors.ts
      urls.ts
  services/
    api/
      client.ts
      endpoints/
        users.ts
        posts.ts
        comments.ts
  types/
    dashboard/
      index.ts
    shared/
      index.ts
  assets/
    images/
      icons/
        home.svg
        settings.svg
```

## Problems

1. **8 levels deep** — `components/shared/common/ui/buttons/`
2. **Inconsistent casing** — `PrimaryButton.tsx` (PascalCase) vs `common.ts` (camelCase)
3. **Barrel file bloat** — `index.ts` files everywhere for re-exports
4. **Premature abstraction** — "shared/common/ui" catches everything
5. **Feature duplication** — hooks in `features/dashboard/hooks/` vs `hooks/`
6. **No clear entry points** — hard to find the home page
