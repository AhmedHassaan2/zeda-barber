---
date: 2026-07-19
category: decisions
tags: [tailwind, css, styling, design, responsive]
project: shared
severity: none
---

# Tailwind CSS as Default Styling

## Context

Multiple styling approaches appeared across projects: CSS Modules, styled-components, Tailwind. This creates inconsistency and makes code harder to share. Tailwind won as the standard.

## Content

**Decision:** All new projects use Tailwind CSS. No CSS Modules, no styled-components, no inline styles.

**Why Tailwind:**
- Consistent design system via utility classes
- Responsive design built-in with `md:`, `lg:` prefixes
- Dark mode via `dark:` prefix (class-based)
- RTL support via `ms-`, `me-`, `ps-`, `pe-` logical properties
- No CSS file management overhead
- Works perfectly with Next.js App Router

**Design Tokens (Material Design 3):**
```typescript
// tailwind.config.ts
colors: {
  primary: "var(--primary)",
  "on-primary": "var(--on-primary)",
  surface: "var(--surface)",
  "surface-variant": "var(--surface-variant)",
}
```

**Class Organization:**
```html
<div className="flex items-center gap-4 p-6 rounded-xl bg-surface shadow-sm
                md:flex-row md:gap-6 md:p-8
                dark:bg-surface-variant">
```

**Never:**
- Write CSS Modules (`.module.css`)
- Use `style={{ }}` inline for layout
- Import global CSS for component-specific styles
- Use `@apply` excessively (max 3 per class)

## Application

Every component uses Tailwind utilities. If a style isn't available as a utility, add it to `tailwind.config.ts` as a design token.

## Related

- `2026-07-19_rtl-logical-properties.md` — RTL with Tailwind
- `2026-07-19_mobile-first-responsive.md` — Responsive patterns
