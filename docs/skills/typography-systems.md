---
title: Typography hierarchy, font selection, Arabic/English font pairing, and responsive type
description: Typography hierarchy, font selection, Arabic/English font pairing, and responsive type
---

# Typography hierarchy, font selection, Arabic/English font pairing, and responsive type

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>typography-systems</code> | <strong>Category:</strong> design | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Typography Systems

## Purpose

Guide typography system design for clear, readable, and culturally appropriate text.

## When to Use

- Setting up font systems
- Creating typography scales
- Implementing bilingual typography
- Optimizing font loading

## Core Concepts

### Type Scale

```typescript
const typeScale = {
  'display-lg': { size: '4.5rem', lineHeight: 1.1, weight: 700 },
  'display': { size: '3.5rem', lineHeight: 1.1, weight: 700 },
  'h1': { size: '2.5rem', lineHeight: 1.2, weight: 600 },
  'h2': { size: '2rem', lineHeight: 1.3, weight: 600 },
  'h3': { size: '1.5rem', lineHeight: 1.4, weight: 600 },
  'body-lg': { size: '1.125rem', lineHeight: 1.6, weight: 400 },
  'body': { size: '1rem', lineHeight: 1.6, weight: 400 },
  'body-sm': { size: '0.875rem', lineHeight: 1.5, weight: 400 },
  'caption': { size: '0.75rem', lineHeight: 1.4, weight: 400 },
};
```

### Arabic/English Font Pairing

```css
/* Arabic: Cairo for body, Tajawal for display */
/* English: Inter for body, Playfair Display for serif */

.font-body {
  font-family: var(--font-cairo), var(--font-inter), sans-serif;
}

[dir="rtl"] .font-body {
  font-family: var(--font-cairo), sans-serif;
}

[dir="ltr"] .font-body {
  font-family: var(--font-inter), sans-serif;
}
```

### Font Loading

```tsx
// next.config.ts
const config = {
  fonts: {
    cairo: [{ source: 'local("Cairo")', weight: '400 700' }],
    inter: [{ source: 'local("Inter")', weight: '400 700' }],
  },
};
```

## Best Practices

- Use maximum 3 font families
- Establish clear hierarchy (display, heading, body, caption)
- Test readability at all sizes
- Consider Arabic/English switching
- Optimize font loading (preload, subset)
- Ensure sufficient contrast
- Use relative units (rem) for scalability

## Anti-Patterns

- Using too many font families
- Inconsistent type scale
- Small body text (< 14px)
- Poor contrast ratios
- Not considering RTL layout
- Blocking rendering with font loading

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
