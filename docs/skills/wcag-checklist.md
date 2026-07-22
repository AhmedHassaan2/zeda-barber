---
title: WCAG 2.1 AA compliance checklist, semantic HTML, and accessibility audit
description: WCAG 2.1 AA compliance checklist, semantic HTML, and accessibility audit
---

# WCAG 2.1 AA compliance checklist, semantic HTML, and accessibility audit

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>wcag-checklist</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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
