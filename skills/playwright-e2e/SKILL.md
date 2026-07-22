---
name: playwright-e2e
description: Playwright E2E testing setup, page objects, fixtures, and CI integration
category: quality
level: framework
priority: high
dependencies: ["testing-strategy"]
related_skills: ["testing-strategy", "vitest-unit"]
related_agents: ["tester"]
activation_rules:
  - keywords: ["playwright", "E2E", "browser", "page", "screenshot", "test"]
  - file_pattern: "**/e2e/**/*"
  - file_pattern: "playwright.config.*"
---

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
