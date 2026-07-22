---
title: Playwright E2E testing setup, page objects, fixtures, and CI integration
description: Playwright E2E testing setup, page objects, fixtures, and CI integration
---

# Playwright E2E testing setup, page objects, fixtures, and CI integration

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>playwright-e2e</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> framework
</div>

# Playwright E2E Testing

## Purpose

Guide Playwright E2E test implementation for critical user flows.

## When to Use

- Writing end-to-end tests
- Testing critical user journeys
- Visual regression testing
- Cross-browser testing

## Core Concepts

### Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});
```

### Page Object Pattern

```typescript
class BookingPage {
  constructor(private page: Page) {}

  async goto() { await this.page.goto('/booking'); }
  async selectService(name: string) { await this.page.click(`text=${name}`); }
  async nextStep() { await this.page.click('text=Next'); }
  async expectStep(step: number) {
    await expect(this.page.locator(`text=Step ${step}`)).toBeVisible();
  }
}

test('complete booking flow', async ({ page }) => {
  const booking = new BookingPage(page);
  await booking.goto();
  await booking.selectService('Haircut');
  await booking.nextStep();
  await booking.expectStep(2);
});
```

### Assertions

```typescript
// Visibility
await expect(page.locator('.error')).toBeVisible();
await expect(page.locator('.loading')).toBeHidden();

// Text content
await expect(page.locator('h1')).toHaveText('Welcome');

// URL
await expect(page).toHaveURL('/dashboard');

// Count
await expect(page.locator('.item')).toHaveCount(5);
```

## Best Tests

- Test critical paths only (booking, checkout, login)
- Use data-testid for reliable selectors
- Handle async operations properly
- Take screenshots on failure
- Run in CI with headed mode off
- Clean up test data after tests

## Anti-Patterns

- Testing every UI element
- Using fragile CSS selectors
- Not handling network requests
- Ignoring flaky tests
- Testing third-party functionality

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
