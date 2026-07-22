---
name: tailwind-css
description: Tailwind CSS utility patterns, custom configuration, responsive design, dark mode, and component styling
category: frontend
level: framework
priority: high
dependencies: []
related_skills: ["responsive-design", "css-animation", "design-systems"]
related_agents: ["frontend", "designer"]
activation_rules:
  - file_pattern: "tailwind.config.*"
  - file_pattern: "src/**/*.tsx"
  - file_pattern: "postcss.config.*"
  - keywords: ["tailwind", "className", "bg-", "text-", "flex", "grid", "px-", "py-"]
---

# Tailwind CSS

## Purpose

Guide Tailwind CSS usage for consistent, maintainable styling following utility-first principles.

## When to Use

- Styling any component or page
- Customizing the Tailwind config
- Adding responsive breakpoints
- Implementing dark mode
- Creating reusable style patterns

## Core Concepts

### Utility-First Approach

```tsx
// Good: Composable, maintainable, predictable
<div className="flex items-center gap-4 p-6 bg-surface rounded-lg border border-outline-variant/30">

// Bad: Custom CSS, harder to maintain
<div className="card">
```

### Responsive Design

```tsx
// Mobile-first: base = mobile, md: = tablet, lg: = desktop
<div className="px-4 md:px-8 lg:px-16">
  <h1 className="text-2xl md:text-4xl lg:text-6xl">
```

### Dark Mode

```tsx
// Class-based dark mode (darkMode: "class" in config)
<div className="bg-white dark:bg-surface text-black dark:text-on-surface">
```

### Custom Config Extensions

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: '#e9c176',
        surface: '#121414',
        'on-surface': '#e2e2e2',
      },
      fontFamily: {
        'body': ['var(--font-cairo)', 'sans-serif'],
      },
      spacing: {
        'section': '160px',
        'gutter': '32px',
      },
    },
  },
};
```

## Best Practices

- Use project color tokens (surface, primary, on-surface)
- Follow the spacing scale (multiples of 4px or 8px)
- Use opacity modifiers for transparent colors: `bg-primary/10`
- Extract repeated patterns into components, not @apply
- Use Tailwind's built-in animation utilities
- Keep className strings readable with logical grouping

## Anti-Patterns

- Using `@apply` excessively (use components instead)
- Inline styles alongside Tailwind
- Custom CSS for things Tailwind handles
- Random spacing values not in the scale
- Hardcoded colors instead of tokens

## Example

```tsx
// Well-structured Tailwind usage
<button className="
  px-6 py-3
  bg-primary text-surface
  font-button text-button
  uppercase tracking-wider
  rounded-lg
  hover:opacity-90
  transition-opacity duration-300
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Click Me
</button>
```
