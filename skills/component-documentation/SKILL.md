---
name: component-documentation
description: Component documentation, Storybook patterns, usage guidelines, and design system docs
category: documentation
level: concept
priority: medium
dependencies: ["design-systems"]
related_skills: ["design-systems", "api-documentation"]
related_agents: ["docs-writer", "designer"]
activation_rules:
  - keywords: ["component documentation", "Storybook", "usage", "guidelines", "design system"]
---

# Component Documentation

## Purpose

Guide component documentation for design system consistency.

## When to Use

- Documenting new components
- Creating usage guidelines
- Writing component stories
- Maintaining design system docs

## Core Concepts

### Component Documentation Template

```markdown
# Button

## Description
A button component for user actions.

## Import
```tsx
import { Button } from '@/components/ui/button';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' | 'primary' | Button style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| loading | boolean | false | Show loading state |

## Usage
```tsx
<Button variant="primary" size="md">Click me</Button>
<Button loading>Processing...</Button>
```

## Accessibility
- Uses `<button>` element
- Supports keyboard navigation
- Includes loading state announcement
```

### Storybook Stories

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Click me', variant: 'primary' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Submit' },
};
```

## Best Practices

- Document every component
- Include usage examples
- Provide do/don't guidelines
- Include accessibility notes
- Keep documentation updated
- Use consistent format

## Anti-Patterns

- Missing documentation
- Outdated examples
- Not including accessibility notes
- Inconsistent documentation format
