---
name: performance-check
description: Performance analysis including Core Web Vitals, bundle size, and optimization opportunities
allowed_tools: ["Read", "Grep", "Glob", "Bash"]
agent: performance
---

# /performance-check — Performance Analysis

Analyze project performance and identify optimization opportunities.

## Usage

```
/performance-check           # Full project analysis
/performance-check src/      # Analyze specific directory
```

## Analysis Areas

### 1. Core Web Vitals
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)

### 2. Bundle Analysis
- JavaScript bundle size
- Code splitting opportunities
- Unused dependencies
- Dynamic imports

### 3. Image Optimization
- Image formats (WebP, AVIF)
- Lazy loading implementation
- Responsive images (srcset)
- Missing width/height attributes

### 4. Caching
- Cache headers configuration
- CDN utilization
- ISR implementation
- Static asset caching

### 5. Code Optimization
- Server vs Client components
- Unnecessary re-renders
- Missing memoization
- Database query optimization

## Output Format

```
## Performance Report

### Core Web Vitals
- LCP: Xs (Target: < 2.5s)
- FID: Xms (Target: < 100ms)
- CLS: X (Target: < 0.1)

### Bundle Size
- Total: Xkb
- First Load: Xkb
- Shared: Xkb

### Optimization Opportunities
1. [High Impact] Description
2. [Medium Impact] Description
3. [Low Impact] Description

### Recommendations
- Priority actions with expected impact
```

## Execution

1. Analyze bundle composition
2. Check image optimization
3. Review caching strategy
4. Identify code splitting opportunities
5. Check server/client component usage
6. Generate performance report
