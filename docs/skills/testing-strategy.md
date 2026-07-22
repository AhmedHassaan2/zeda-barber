---
title: Test planning, unit testing with Vitest, E2E with Playwright, mocking, and coverage analysis
description: Test planning, unit testing with Vitest, E2E with Playwright, mocking, and coverage analysis
---

# Test planning, unit testing with Vitest, E2E with Playwright, mocking, and coverage analysis

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>testing-strategy</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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
