---
name: web-performance
description: Core Web Vitals, Lighthouse optimization, lazy loading, and performance budgets
category: quality
level: concept
priority: high
dependencies: []
related_skills: ["image-optimization", "bundle-optimization", "caching-strategies"]
related_agents: ["performance"]
activation_rules:
  - keywords: ["performance", "Core Web Vitals", "LCP", "FID", "CLS", "Lighthouse"]
---

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
