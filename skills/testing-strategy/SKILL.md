---
name: testing-strategy
description: Test planning, unit testing with Vitest, E2E with Playwright, mocking, and coverage analysis
category: quality
level: concept
priority: high
dependencies: []
related_skills: ["vitest-unit", "playwright-e2e"]
related_agents: ["tester"]
activation_rules:
  - keywords: ["test", "coverage", "mock", "assert", "spec", "vitest", "playwright"]
  - file_pattern: "**/*.test.*"
  - file_pattern: "**/*.spec.*"
---

# Testing Strategy

## Purpose

Guide testing strategy across unit, integration, and E2E levels with appropriate tool selection.

## When to Use

- Planning test approach for a feature
- Setting up test infrastructure
- Deciding what to test at which level
- Analyzing test coverage

## Core Concepts

### Test Pyramid

```
        E2E Tests (critical paths only)
       ┌─────────────────────────┐
      │   Integration Tests      │
     │   (API routes, DB queries)  │
    │      Unit Tests               │
   │    (pure functions, utils)      │
  └──────────────────────────────────┘
```

### What to Test at Each Level

| Level | Tool | What | Count |
|-------|------|------|-------|
| Unit | Vitest | Pure functions, utilities, hooks | Many |
| Integration | Vitest | API routes, DB queries, components | Some |
| E2E | Playwright | Critical user flows | Few |

### Unit Testing (Vitest)

```typescript
import { describe, it, expect } from 'vitest';
import { calculateTotal } from './cart';

describe('calculateTotal', () => {
  it('should sum item prices', () => {
    const items = [{ price: 10 }, { price: 20 }];
    expect(calculateTotal(items)).toBe(30);
  });

  it('should apply discount', () => {
    const items = [{ price: 100 }];
    expect(calculateTotal(items, 0.1)).toBe(90);
  });
});
```

### E2E Testing (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('booking flow', async ({ page }) => {
  await page.goto('/booking');
  await page.click('text=Select Service');
  await page.click('text=Next');
  await expect(page.locator('text=Step 2')).toBeVisible();
});
```

## Best Practices

- Test behavior, not implementation
- Each test should be independent
- Use descriptive test names
- Mock external dependencies
- Keep tests fast (< 100ms for unit, < 5s for E2E)
- Test error paths, not just happy path
- Review coverage gaps, but don't chase 100%

## Anti-Patterns

- Testing implementation details
- Sharing state between tests
- Writing tests after bugs (write before)
- Mocking everything
- Testing framework features
- Ignoring flaky tests
