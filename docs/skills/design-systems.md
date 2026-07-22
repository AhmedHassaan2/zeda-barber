---
title: Design system creation, component documentation, token management, and design guidelines
description: Design system creation, component documentation, token management, and design guidelines
---

# Design system creation, component documentation, token management, and design guidelines

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>design-systems</code> | <strong>Category:</strong> design | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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

## When to Use

- File patterns match the skill's activation rules
- Keywords in the conversation match the skill's domain
- A related agent delegates to this skill

## When NOT to Use

- When the task falls outside this skill's domain
- When a more specific skill exists for the task
- When the skill's dependencies are not met

## Related Agents

See [Agents Registry](/agents/) for agents that use this skill.

## Related Skills

See [Skills Registry](/skills/) for related skills in the same cluster.

## Customization Guide

1. Copy the skill to `.opencode/skills/` in your project
2. Modify the activation rules to match your project patterns
3. Add project-specific examples and templates
4. Update the related agents and skills references

## Extension Guide

1. Add new sections to the SKILL.md file
2. Include code examples for new patterns
3. Update anti-patterns with new findings
4. Maintain cross-references to related skills
5. Keep the skill focused on its core purpose
