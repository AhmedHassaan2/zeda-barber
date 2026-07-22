---
name: responsive-design
description: Mobile-first responsive design strategies, fluid typography, container queries, and breakpoint patterns
category: frontend
level: concept
priority: high
dependencies: ["tailwind-css"]
related_skills: ["tailwind-css", "design-systems"]
related_agents: ["frontend", "accessibility"]
activation_rules:
  - file_pattern: "src/**/*.tsx"
  - keywords: ["responsive", "mobile", "breakpoint", "media query", "container", "viewport"]
---

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
