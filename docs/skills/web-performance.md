---
title: Core Web Vitals, Lighthouse optimization, lazy loading, and performance budgets
description: Core Web Vitals, Lighthouse optimization, lazy loading, and performance budgets
---

# Core Web Vitals, Lighthouse optimization, lazy loading, and performance budgets

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>web-performance</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Web Performance

## Purpose

Guide web performance optimization for Core Web Vitals and overall speed.

## When to Use

- Optimizing page load performance
- Analyzing Core Web Vitals
- Setting performance budgets
- Implementing lazy loading

## Core Concepts

### Core Web Vitals

| Metric | Target | What it Measures |
|--------|--------|------------------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |
| TTFB | < 800ms | Time to First Byte |
| INP | < 200ms | Interaction to Next Paint |

### Optimization Strategies

```tsx
// Dynamic imports for code splitting
const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// Lazy loading images
<img loading="lazy" src="/image.jpg" alt="..." />

// Preload critical resources
<link rel="preload" href="/fonts/main.woff2" as="font" />
```

### Performance Budget

```json
{
  "budgets": [
    { "type": "initial", "maximumWarning": "200kb", "maximumError": "300kb" },
    { "type": "bundle", "name": "vendor", "maximumWarning": "100kb" }
  ]
}
```

## Best Practices

- Measure before optimizing
- Use dynamic imports for heavy components
- Lazy load images and non-critical content
- Minimize JavaScript bundle size
- Use CDN for static assets
- Implement proper caching headers
- Optimize fonts (subsetting, preload)

## Anti-Patterns

- Loading everything upfront
- Using large hero images without optimization
- Blocking rendering with scripts
- Not setting performance budgets
- Ignoring mobile performance

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
