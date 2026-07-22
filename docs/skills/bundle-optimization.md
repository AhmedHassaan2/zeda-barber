---
title: JavaScript bundle analysis, code splitting, tree shaking, and dependency optimization
description: JavaScript bundle analysis, code splitting, tree shaking, and dependency optimization
---

# JavaScript bundle analysis, code splitting, tree shaking, and dependency optimization

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>bundle-optimization</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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
