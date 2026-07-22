---
name: design-systems
description: Design system creation, component documentation, token management, and design guidelines
category: design
level: concept
priority: high
dependencies: ["tailwind-css", "react-patterns"]
related_skills: ["tailwind-css", "typography-systems", "motion-design"]
related_agents: ["designer", "frontend"]
activation_rules:
  - keywords: ["design system", "component library", "tokens", "Figma", "design tokens"]
---

# Design Systems

## Purpose

Guide design system creation and maintenance for consistent UI/UX.

## When to Use

- Creating new design systems
- Documenting existing components
- Managing design tokens
- Ensuring consistency across features

## Core Concepts

### Design Tokens

```typescript
// tokens.ts
export const tokens = {
  colors: {
    primary: { DEFAULT: '#e9c176', light: '#f0d4a0', dark: '#d4a84e' },
    surface: { DEFAULT: '#121414', variant: '#1a1c1c', container: '#232626' },
    'on-surface': { DEFAULT: '#e2e2e2', variant: '#c7c7c7' },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    section: '160px',
  },
  typography: {
    h1: { size: '3.5rem', weight: 700, lineHeight: 1.1 },
    h2: { size: '2.5rem', weight: 600, lineHeight: 1.2 },
    body: { size: '1rem', weight: 400, lineHeight: 1.6 },
  },
};
```

### Component Documentation

```tsx
// Component story/documentation
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

// Usage examples
// <Button variant="primary" size="md">Click me</Button>
// <Button variant="outline" loading>Processing...</Button>
```

### Design Principles

1. **Consistency** — Same patterns for same problems
2. **Accessibility** — WCAG 2.1 AA compliance
3. **Responsiveness** — Mobile-first design
4. **Performance** — Fast loading, smooth interactions
5. **Scalability** — Easy to extend and maintain

## Best Practices

- Document every component
- Provide usage examples
- Include do/don't guidelines
- Version the design system
- Automate token synchronization
- Include accessibility notes
- Test components in isolation

## Anti-Patterns

- Inconsistent spacing/sizing
- Not documenting components
- Hardcoding values instead of using tokens
- Creating components without accessibility
- Not versioning changes
