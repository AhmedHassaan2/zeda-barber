---
title: Tailwind Css
description: Tailwind Css reference documentation
---

# Tailwind Css

# Tailwind CSS 3.4+ — Knowledge Reference

## Purpose

Reference for Tailwind CSS development covering utility-first CSS, responsive design, dark mode, custom themes, plugins, JIT compilation, content configuration, design tokens, and CSS variables integration. Focused on production patterns for scalable design systems.

## Core Concepts

### Utility-First Approach

Tailwind provides low-level utility classes that compose directly in HTML/JSX. Instead of writing custom CSS, you apply pre-built classes like `flex`, `items-center`, `text-lg`, `bg-primary`. This eliminates naming debates, reduces CSS bundle size, and keeps styles co-located with markup.

### JIT (Just-In-Time) Mode

JIT is the default engine since Tailwind 3.0. It generates styles on-demand by scanning template files for class usage. Only used utilities are included in the final CSS. Enables arbitrary values (`[value]`), modifiers, and instant purging without configuration.

### Content Configuration

`tailwind.config.js` requires a `content` array specifying file paths to scan for class usage. Missing paths result in purged styles. Include all template files: `src/**/*.{ts,tsx,js,jsx}`.

### Responsive Design

Tailwind uses mobile-first breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px). Apply base styles for mobile, override at larger screens: `md:grid-cols-2 lg:grid-cols-3`.

### Dark Mode

Two strategies: `class` (toggled via a class on `<html>`, preferred for manual control) and `media` (follows OS preference). Use the `dark:` modifier: `dark:bg-gray-900 dark:text-white`.

### Custom Themes

Extend or override the default theme in `tailwind.config.js`. Customize colors, spacing, fonts, breakpoints, shadows, and more. Use `theme.extend` to merge with defaults rather than replacing entirely.

### Design Tokens

Map your design system tokens to Tailwind theme values. Use CSS variables for runtime theming: define tokens in `:root`, reference them in `tailwind.config.js` via `theme('colors.primary')` or CSS `var()` for dynamic theming.

### CSS Variables Integration

Define custom properties in `:root` or a theme provider, then reference them in Tailwind config: `colors: { primary: 'rgb(var(--color-primary) / <alpha-value>)' }`. Enables runtime theme switching without rebuilding CSS.

### Plugins

Extend Tailwind with custom utilities, components, or preflight modifications. Use `@tailwindcss/forms` for form reset, `@tailwindcss/typography` for prose, `@tailwindcss/container-queries` for container queries. Write custom plugins with `plugin()` API.

## Best Practices

1. **Use `@apply` sparingly and only for repeated patterns** — utilities in markup are the primary pattern; `@apply` is for extracted component classes that repeat across many elements
2. **Extract components via `@layer components`** — define reusable component classes in a dedicated layer to avoid specificity issues with utilities
3. **Use design tokens as CSS variables** — enables runtime theme switching, reduces config duplication, and integrates with other CSS tools
4. **Configure `content` correctly** — missing file paths cause missing styles; use glob patterns and include all template directories
5. **Use `safelist` for dynamic classes** — when class names are constructed at runtime (e.g., `bg-${color}-500`), safelist them to prevent purging
6. **Leverage `theme()` function in CSS** — access Tailwind config values in regular CSS: `color: theme('colors.primary.500')`
7. **Use `preflight` reset wisely** — Tailwind's preflight normalizes browser defaults; disable if it conflicts with third-party UI libraries
8. **Organize utilities logically** — follow a consistent ordering: layout → positioning → spacing → typography → visual → interactive

## Anti-Patterns

1. **Using `@apply` for everything** — defeats the purpose of utility-first CSS; creates large CSS bundles with duplicated utilities
2. **Hardcoding colors in components** — use theme tokens instead; `bg-blue-500` should be `bg-primary` mapped in the theme
3. **Ignoring the content configuration** — uncanned files produce empty CSS; always verify content paths
4. **Overriding default theme values** — use `theme.extend` to keep defaults available; direct overrides lose the entire default palette
5. **Using arbitrary values excessively** — `[width: 237px]` indicates the design system is incomplete; add a theme value instead
6. **Not using responsive prefixes** — desktop-only CSS breaks mobile; design mobile-first and enhance
7. **Mixing Tailwind with inline styles** — use one approach consistently; inline styles override Tailwind and cannot be purged
8. **Using `!important` via `!` prefix** — `!important` overrides specificity intentionally; use only when overriding third-party styles

## Common Mistakes

1. **Forgetting that Tailwind is JIT by default** — no need to configure purge; just ensure content paths are correct
2. **Confusing `sm:` with small screens** — `sm:` means 640px and above, not small screens; it's the smallest breakpoint, not a mobile override
3. **Not understanding class order sensitivity** — `p-4 m-4` vs `m-4 p-4` produce different results; follow the recommended order
4. **Using `dark:` without a dark mode strategy** — must configure `darkMode: 'class'` or `'media'` in `tailwind.config.js`
5. **Not purging unused utilities** — without JIT or purging, the full Tailwind CSS is ~3MB; JIT eliminates this by default
6. **Ignoring the `preflight` layer** — base styles reset browser defaults; styles that look wrong may be preflight interactions
7. **Using `gap` with old browsers** — `gap` in flexbox requires modern browsers; check caniuse.com for support
8. **Not leveraging `group` and `peer` modifiers** — `group-hover:` enables parent-triggered child styling without JavaScript

## Decision Guidelines

| Scenario | Approach |
|---|---|
| One-off custom value | Arbitrary value `[value]` |
| Repeated component pattern | `@layer components` + `@apply` |
| Dynamic class names | `safelist` in config |
| Runtime theme switching | CSS variables + `darkMode: 'class'` |
| Form styling | `@tailwindcss/forms` plugin |
| Rich text content | `@tailwindcss/typography` plugin |
| Container-aware layouts | `@tailwindcss/container-queries` plugin |
| Design system tokens | CSS variables in `:root` + theme config |
| Legacy CSS migration | Incremental `@apply` extraction |
| Responsive grid layout | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Playground](https://tailwindcss.com/playground)
- [Headless UI](https://headlessui.com) — accessible unstyled components for Tailwind
- [Tailwind UI](https://tailwindui.com) — official component library
- [daisyUI](https://daisyui.com) — Tailwind component plugin

## Practical Notes

- Tailwind CSS 4.0 uses a new Oxide engine with even faster build times and new features; check compatibility before upgrading
- `tailwind.config.js` supports `theme()` function in CSS for accessing config values
- Use `tailwindcss-animate` plugin for animation utilities beyond Tailwind's built-in transitions
- VS Code extension `Tailwind CSS IntelliSense` provides autocompletion and linting for class names
- For RTL support, combine Tailwind with logical properties (`ms-`/`me-` instead of `ml-`/`mr-`)
- PostCSS plugins run after Tailwind; configure ordering in `postcss.config.js` if needed

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
