---
name: bundle-optimization
description: JavaScript bundle analysis, code splitting, tree shaking, and dependency optimization
category: quality
level: concept
priority: high
dependencies: []
related_skills: ["web-performance", "image-optimization"]
related_agents: ["performance"]
activation_rules:
  - keywords: ["bundle", "chunk", "split", "tree shake", "import", "dynamic"]
---

# Bundle Optimization

## Purpose

Guide JavaScript bundle optimization for faster page loads.

## When to Use

- Analyzing bundle size
- Implementing code splitting
- Optimizing imports
- Reducing bundle weight

## Core Concepts

### Code Splitting

```tsx
// Route-based splitting (Next.js App Router does this automatically)
// Component-based splitting
const HeavyChart = dynamic(() => import('./HeavyChart'), { ssr: false });

// Conditional imports
const AdminPanel = lazy(() => import('./AdminPanel'));
```

### Import Optimization

```typescript
// Bad: Imports entire library
import _ from 'lodash';
import { format } from 'date-fns';

// Good: Import specific functions
import debounce from 'lodash/debounce';
import { format } from 'date-fns/format';
```

### Bundle Analysis

```bash
# Analyze bundle
npx @next/bundle-analyzer

# Check specific package size
npx source-map-explorer '.next/static/**/*.js'
```

### Tree Shaking

- Use ES modules (import/export)
- Avoid side effects in modules
- Use `package.json` `sideEffects: false`

## Best Practices

- Analyze bundle regularly
- Use dynamic imports for heavy components
- Import specific functions, not entire libraries
- Remove unused dependencies
- Use Next.js automatic code splitting
- Set bundle size budgets

## Anti-Patterns

- Importing entire libraries
- Not using dynamic imports for heavy components
- Including dev dependencies in production
- Not analyzing bundle after adding dependencies
- Using require() instead of import
