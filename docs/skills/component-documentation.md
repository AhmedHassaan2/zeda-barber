---
title: Component documentation, Storybook patterns, usage guidelines, and design system docs
description: Component documentation, Storybook patterns, usage guidelines, and design system docs
---

# Component documentation, Storybook patterns, usage guidelines, and design system docs

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>component-documentation</code> | <strong>Category:</strong> documentation | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

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
