---
title: Vitest unit testing setup, configuration, mocking, and best practices
description: Vitest unit testing setup, configuration, mocking, and best practices
---

# Vitest unit testing setup, configuration, mocking, and best practices

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>vitest-unit</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> framework
</div>

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
