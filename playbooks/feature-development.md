# Playbook: Feature Development

**Purpose:** Standard procedure for developing a new feature from requirements to deployment.

## Workflow

### Phase 1: Requirements (5 min)

1. Clarify the feature requirement
2. Identify affected components
3. Check if existing skills/patterns apply
4. Estimate complexity (simple / moderate / complex)

### Phase 2: Planning (10 min)

1. Load relevant skill: `@skill [relevant-skill]`
2. Check existing patterns in the codebase
3. Plan file changes (which files to create/modify)
4. Identify dependencies on other features

### Phase 3: Implementation (varies)

1. **Create files** following naming conventions
2. **Follow patterns** from loaded skills
3. **Write code** adhering to Professional Layer standards
4. **Add types** — no `any`, explicit interfaces
5. **Handle errors** — every async operation, every boundary
6. **Add i18n** — translation keys for user-facing text

### Phase 4: Quality Check (10 min)

1. Run `npm run build` — must pass
2. Run `npm run lint` — no errors (if configured)
3. Test the feature manually
4. Run `/review` on changed files
5. Check accessibility (keyboard, screen reader)

### Phase 5: Documentation (5 min)

1. Update project AGENTS.md if new patterns established
2. Add JSDoc to complex functions
3. Update README if user-facing changes

### Phase 6: Deployment

1. Create feature branch: `git checkout -b feat/feature-name`
2. Commit with conventional format: `feat(scope): description`
3. Push and create PR
4. Vercel auto-deploys preview
5. Test preview deployment
6. Merge to main (auto-deploys to production)

## File Structure Convention

```
src/
├── app/
│   └── [feature]/
│       ├── page.tsx          # Route page
│       ├── layout.tsx        # Optional nested layout
│       ├── loading.tsx       # Loading state
│       ├── error.tsx         # Error boundary
│       └── components/       # Feature-specific components
│           ├── FeatureMain.tsx
│           └── FeatureItem.tsx
├── components/
│   └── ui/                   # Shared UI primitives
└── lib/
    └── [feature].ts          # Feature utilities (if needed)
```

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Component file | PascalCase.tsx | `BookingForm.tsx` |
| Utility file | camelCase.ts | `formatDate.ts` |
| API route | kebab-case | `api/booking/route.ts` |
| Page | kebab-case | `app/booking/page.tsx` |
| CSS class | Tailwind utilities | `className="..."` |
| Translation key | dot notation | `booking.title` |
| Variable | camelCase | `bookingDate` |
| Type/Interface | PascalCase | `BookingFormData` |

## Code Review Checklist

Before pushing, verify:

- [ ] No `any` types
- [ ] All async operations have error handling
- [ ] i18n keys for all user-facing text
- [ ] Responsive on mobile
- [ ] Keyboard accessible
- [ ] Loading and error states handled
- [ ] No hardcoded values (use constants or env vars)
- [ ] Build passes
