---
title: RTL (Right-to-Left) layout engineering, CSS logical properties, and bidirectional design
description: RTL (Right-to-Left) layout engineering, CSS logical properties, and bidirectional design
---

# RTL (Right-to-Left) layout engineering, CSS logical properties, and bidirectional design

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>rtl-engineering</code> | <strong>Category:</strong> i18n | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# RTL Engineering

## Purpose

Guide RTL layout implementation for Arabic/English bilingual applications.

## When to Use

- Implementing RTL layouts
- Converting to logical properties
- Testing bidirectional content
- Handling mixed LTR/RTL content

## Core Concepts

### CSS Logical Properties

```css
/* Instead of margin-left/right */
margin-inline-start: 16px;
margin-inline-end: 16px;

/* Instead of padding-left/right */
padding-inline-start: 16px;
padding-inline-end: 16px;

/* Instead of border-left/right */
border-inline-start: 1px solid;
border-inline-end: 1px solid;

/* Instead of text-align: left/right */
text-align: start;
text-align: end;

/* Instead of float: left/right */
float: inline-start;
float: inline-end;
```

### Tailwind RTL Classes

```tsx
{/* Logical properties in Tailwind */}
<div className="ms-4 me-4 ps-8 pe-8 border-s border-e">

{/* Direction-aware spacing */}
<div className="ms-auto"> {/* margin-inline-start: auto */}

{/* RTL-aware positioning */}
<div className="start-0"> {/* left: 0 in LTR, right: 0 in RTL */}
```

### HTML Direction

```tsx
// Root element
<html lang="ar" dir="rtl">

// Specific section (e.g., code block)
<div dir="ltr" className="font-mono">
  const code = 'always LTR';
</div>
```

### Flexbox and Grid RTL

```tsx
{/* Flexbox - automatically RTL-aware */}
<div className="flex gap-4">
  <span>A</span>
  <span>B</span>
  {/* In RTL: B appears first (reversed visual order) */}
</div>

{/* Use order if you need specific visual ordering */}
<div className="flex gap-4">
  <span className="order-2">A</span>
  <span className="order-1">B</span>
</div>
```

## Best Practices

- Use CSS logical properties exclusively
- Set `dir="rtl"` on `<html>` element
- Test both LTR and RTL layouts
- Use logical Tailwind classes (`ms-`, `me-`, `ps-`, `pe-`)
- Handle mixed content (code blocks, numbers)
- Consider cultural differences in UI
- Use `start`/`end` instead of `left`/`right`

## Anti-Patterns

- Using `margin-left` instead of `margin-inline-start`
- Hardcoding `left`/`right` values
- Not testing RTL layout
- Ignoring mixed LTR/RTL content
- Using directional utilities (`ml-`, `mr-`, `pl-`, `pr-`)

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
