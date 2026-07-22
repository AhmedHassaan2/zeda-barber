---
name: vitest-unit
description: Vitest unit testing setup, configuration, mocking, and best practices
category: quality
level: framework
priority: high
dependencies: ["testing-strategy"]
related_skills: ["testing-strategy", "playwright-e2e"]
related_agents: ["tester"]
activation_rules:
  - keywords: ["vitest", "describe", "it", "expect", "mock", "vi.fn"]
  - file_pattern: "**/*.test.ts"
---

# Vitest Unit Testing

## Purpose

Guide Vitest unit test implementation with proper configuration and patterns.

## When to Use

- Writing unit tests
- Setting up Vitest configuration
- Mocking modules and dependencies
- Testing utility functions

## Core Concepts

### Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/app/'],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

### Mocking Patterns

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getUser } from './getUser';
import { supabase } from '@/lib/supabase';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  },
}));

describe('getUser', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns user when found', async () => {
    supabase.from().select().eq().single.mockResolvedValue({
      data: { id: '1', name: 'Test' },
      error: null,
    });

    const user = await getUser('1');
    expect(user).toEqual({ id: '1', name: 'Test' });
  });
});
```

## Best Practices

- Use `vi.mock()` for external dependencies
- Clear mocks between tests
- Use `beforeEach` for setup
- Test edge cases and error paths
- Keep tests under 30 lines
- Use `expect.assertions` for async tests

## Anti-Patterns

- Testing implementation details
- Not clearing mocks between tests
- Using `any` type in assertions
- Writing integration tests in unit test files
