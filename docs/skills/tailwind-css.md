---
title: Tailwind CSS utility patterns, custom configuration, responsive design, dark mode, and component styling
description: Tailwind CSS utility patterns, custom configuration, responsive design, dark mode, and component styling
---

# Tailwind CSS utility patterns, custom configuration, responsive design, dark mode, and component styling

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>tailwind-css</code> | <strong>Category:</strong> frontend | <strong>Priority:</strong> high | <strong>Level:</strong> framework
</div>

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
