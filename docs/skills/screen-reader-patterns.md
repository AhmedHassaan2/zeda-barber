---
title: Screen reader testing, ARIA live regions, announcements, and accessible names
description: Screen reader testing, ARIA live regions, announcements, and accessible names
---

# Screen reader testing, ARIA live regions, announcements, and accessible names

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>screen-reader-patterns</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

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
