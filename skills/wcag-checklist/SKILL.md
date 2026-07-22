---
name: wcag-checklist
description: WCAG 2.1 AA compliance checklist, semantic HTML, and accessibility audit
category: quality
level: concept
priority: high
dependencies: []
related_skills: ["keyboard-navigation", "screen-reader-patterns"]
related_agents: ["accessibility"]
activation_rules:
  - keywords: ["accessibility", "a11y", "WCAG", "ARIA", "screen reader", "semantic"]
---

# WCAG Checklist

## Purpose

Guide WCAG 2.1 AA compliance for accessible web applications.

## When to Use

- Auditing existing pages
- Implementing new features
- Setting up accessibility testing
- Training team on accessibility

## Core Concepts

### WCAG 2.1 AA Requirements

**Perceivable**
- Text alternatives for images (`alt` attribute)
- Captions for video content
- Sufficient color contrast (4.5:1 minimum)
- Content adaptable to different presentations
- Keyboard and screen reader accessible

**Operable**
- All functionality available via keyboard
- No keyboard traps
- Skip navigation links
- Page titles are descriptive
- Focus order is logical

**Understandable**
- Language attribute on `<html>`
- Consistent navigation
- Error identification and suggestions
- Labels for form inputs

**Robust**
- Valid HTML
- Proper ARIA attributes
- Name, role, value for custom components

### Semantic HTML

```tsx
// Good: Semantic
<header>
  <nav aria-label="Main">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>

// Bad: Non-semantic
<div class="header">
  <div class="nav">
    <div class="link">Home</div>
  </div>
</div>
```

### Color Contrast

```css
/* Minimum ratios */
/* Normal text: 4.5:1 */
/* Large text: 3:1 */
/* UI components: 3:1 */
```

## Best Practices

- Use semantic HTML first, ARIA only when needed
- Test with screen readers (NVDA, VoiceOver)
- Ensure keyboard navigation works
- Add skip navigation links
- Provide text alternatives for non-text content
- Use proper heading hierarchy
- Test color contrast

## Anti-Patterns

- Using ARIA to fix non-semantic HTML
- Missing alt text on images
- Low color contrast
- Keyboard traps
- No focus indicators
- Missing form labels
