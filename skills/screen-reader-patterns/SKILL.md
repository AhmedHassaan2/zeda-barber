---
name: screen-reader-patterns
description: Screen reader testing, ARIA live regions, announcements, and accessible names
category: quality
level: concept
priority: medium
dependencies: ["wcag-checklist"]
related_skills: ["wcag-checklist", "keyboard-navigation"]
related_agents: ["accessibility"]
activation_rules:
  - keywords: ["screen reader", "ARIA", "live", "announce", "accessible name"]
---

# Screen Reader Patterns

## Purpose

Guide screen reader compatibility and ARIA implementation.

## When to Use

- Implementing dynamic content updates
- Adding ARIA attributes
- Testing with screen readers
- Building accessible custom components

## Core Concepts

### ARIA Live Regions

```tsx
{/* Announce dynamic updates */}
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

{/* For urgent announcements */}
<div role="alert">
  {errorMessage}
</div>

{/* For status updates */}
<div role="status">
  {loadingText}
</div>
```

### Accessible Names

```tsx
{/* Visible label */}
<label htmlFor="email">Email</label>
<input id="email" type="email" />

{/* Hidden label */}
<label htmlFor="search" className="sr-only">Search</label>
<input id="search" type="search" />

{/* Icon button */}
<button aria-label="Close dialog">
  <CloseIcon />
</button>
```

### ARIA Roles

```tsx
{/* Tab component */}
<div role="tablist">
  <button role="tab" aria-selected={true}>Tab 1</button>
  <button role="tab" aria-selected={false}>Tab 2</button>
</div>
<div role="tabpanel">Content 1</div>

{/* Progress */}
<div role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
  Loading...
</div>
```

## Best Practices

- Use semantic HTML before ARIA
- Provide accessible names for all interactive elements
- Use live regions for dynamic content updates
- Test with NVDA (Windows) or VoiceOver (Mac)
- Include screen reader users in testing
- Document accessibility considerations

## Anti-Patterns

- ARIA on non-interactive elements
- Missing accessible names
- Not announcing state changes
- Using ARIA to fix bad HTML
- Overusing live regions (causes fatigue)
