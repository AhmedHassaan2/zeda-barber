---
title: Mobile-first responsive design strategies, fluid typography, container queries, and breakpoint patterns
description: Mobile-first responsive design strategies, fluid typography, container queries, and breakpoint patterns
---

# Mobile-first responsive design strategies, fluid typography, container queries, and breakpoint patterns

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>responsive-design</code> | <strong>Category:</strong> frontend | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Responsive Design

## Purpose

Guide responsive design implementation for optimal user experience across all device sizes.

## When to Use

- Creating new layouts or pages
- Implementing responsive components
- Adding responsive typography
- Adapting navigation for mobile

## Core Concepts

### Mobile-First Strategy

```tsx
// Start with mobile, enhance for larger screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Breakpoint System

| Breakpoint | Width | Typical Use |
|---|---|---|
| Default | < 768px | Mobile phones |
| `md:` | >= 768px | Tablets |
| `lg:` | >= 1024px | Small desktops |
| `xl:` | >= 1280px | Large desktops |
| `2xl:` | >= 1536px | Extra large screens |

### Fluid Typography

```tsx
// Responsive text sizing
<h1 className="text-3xl md:text-5xl lg:text-6xl">
<p className="text-sm md:text-base lg:text-lg">
```

### Container Patterns

```tsx
// Standard page container
<div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">

// Full-width section with constrained content
<section className="w-full">
  <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
```

### Responsive Navigation

```tsx
// Mobile hamburger, desktop inline nav
<nav className="hidden md:flex gap-8">
  {/* Desktop nav */}
</nav>
<button className="md:hidden">
  {/* Mobile hamburger */}
</button>
```

## Best Practices

- Always design mobile-first — add complexity for larger screens
- Use Tailwind responsive prefixes consistently
- Test on real devices, not just browser resize
- Ensure touch targets are >= 44px on mobile
- Use responsive images with srcset
- Consider content flow, not just layout changes
- Hide non-essential elements on small screens

## Anti-Patterns

- Desktop-first design with mobile breakpoints
- Using fixed pixel values for widths
- Ignoring landscape orientation
- Touch targets smaller than 44px
- Horizontal scrolling on mobile
- Text too small to read on mobile

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
