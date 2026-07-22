# Playbook: Frontend Feature

**Goal:** Build a complete frontend feature with components, styling, state, and accessibility.

**Trigger:** New UI feature, page, component, or interaction pattern.

**Inputs:**
- Feature requirements and design
- Existing component library
- State management approach
- Responsive breakpoints

**Outputs:**
- React components with types
- Tailwind CSS styling
- Responsive design
- Accessibility (keyboard, ARIA)
- i18n translation keys

---

## Required Agents

| Agent | Role |
|-------|------|
| `frontend` | Primary builder — React, components, styling |
| `accessibility` | WCAG compliance, keyboard navigation |
| `performance` | Bundle impact, render optimization |
| `i18n` | Translation keys, RTL support |
| `reviewer` | Code quality review |
| `designer` | Design system compliance |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `react-patterns` | Always — component architecture |
| `nextjs-app-router` | Routing, layouts, pages |
| `tailwind-css` | Styling approach |
| `responsive-design` | Mobile-first responsive |
| `form-engineering` | If feature includes forms |
| `state-management` | If feature needs complex state |
| `css-motion-design` | If feature includes animations |
| `accessibility-patterns` | WCAG compliance |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/new-component` | Create new component |
| `/new-page` | Create new page/route |
| `/a11y-audit` | Verify accessibility |
| `/review` | Code quality review |

---

## Process

### Step 1: Plan (10 min)

1. **Define components** — What components are needed?
2. **Define hierarchy** — Parent-child relationships
3. **Define state** — What state is needed, where?
4. **Define API** — What data does it need?
5. **Check existing components** — What can be reused?

### Step 2: Create Components (varies)

1. **Create page** — `src/app/[route]/page.tsx`
2. **Create layout** — If nested layout needed
3. **Create components** — Feature-specific components
4. **Add types** — TypeScript interfaces for props
5. **Add i18n** — Translation keys for all text

Component structure:
```typescript
// ComponentName.tsx
interface ComponentNameProps {
  title: string;
  onAction: () => void;
}

export function ComponentName({ title, onAction }: ComponentNameProps) {
  return (
    <div className="...">
      {/* Content */}
    </div>
  );
}
```

### Step 3: Style (varies)

1. **Mobile-first** — Base styles for mobile
2. **Responsive** — `md:` breakpoints for larger screens
3. **Dark mode** — `dark:` variants if needed
4. **RTL** — Logical properties (`ms-`, `me-`, not `ml-`, `mr-`)
5. **Animations** — Tailwind transitions, not heavy libraries

### Step 4: Add State (if needed)

1. **Local state** — `useState` for component state
2. **Shared state** — React Context for cross-component
3. **Server state** — Fetch in Server Component, pass as props
4. **Form state** — Controlled components with validation

### Step 5: Add Accessibility (10 min)

1. **Semantic HTML** — `nav`, `main`, `section`, `article`
2. **ARIA labels** — Interactive elements labeled
3. **Keyboard navigation** — Tab order, Enter/Space handlers
4. **Focus management** — Focus trap in modals
5. **Color contrast** — WCAG AA minimum

### Step 6: Verify (10 min)

1. **Build check** — `npm run build` passes
2. **Responsive test** — Mobile, tablet, desktop
3. **Keyboard test** — Tab through all interactive elements
4. **Screen reader test** — VoiceOver/NVDA basics
5. **Run `/a11y-audit`** — Accessibility verification
6. **Run `/review`** — Code quality

---

## Validation Steps

- [ ] Components have TypeScript types (no `any`)
- [ ] Mobile-first responsive design
- [ ] RTL support via logical properties
- [ ] i18n keys for all user-facing text
- [ ] Keyboard accessible
- [ ] ARIA labels on interactive elements
- [ ] Loading and error states handled
- [ ] Build passes
- [ ] No console errors

## Success Criteria

- Feature works on all screen sizes
- Accessible to keyboard and screen reader users
- Bilingual support included
- Code follows existing patterns
- No performance regressions

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Desktop-first design | Broken on mobile | Mobile-first with md: breakpoints |
| Missing loading state | Poor UX | Always show loading indicator |
| No error boundary | App crashes on error | Add error.tsx boundary |
| Hardcoded strings | Can't translate | Use i18n translation keys |
| `ml-`/`mr-` instead of `ms-`/`me-` | Broken in RTL | Use logical properties |
| Missing keyboard support | Excludes keyboard users | Add tabIndex and handlers |
| Inline styles | Can't respond to theme | Use Tailwind classes |
