---
name: rtl-engineering
description: RTL (Right-to-Left) layout engineering, CSS logical properties, and bidirectional design
category: i18n
level: concept
priority: high
dependencies: ["i18n-architecture"]
related_skills: ["i18n-architecture", "tailwind-css"]
related_agents: ["i18n", "frontend"]
activation_rules:
  - keywords: ["RTL", "right-to-left", "bidirectional", "dir", "logical properties"]
---

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
