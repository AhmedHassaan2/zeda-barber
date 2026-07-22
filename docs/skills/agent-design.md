---
title: AI agent design patterns, tool use, multi-step reasoning, and autonomous workflows
description: AI agent design patterns, tool use, multi-step reasoning, and autonomous workflows
---

# AI agent design patterns, tool use, multi-step reasoning, and autonomous workflows

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>agent-design</code> | <strong>Category:</strong> ai | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# Agent Design

## Purpose

Guide AI agent design for autonomous task execution.

## When to Use

- Building AI agents
- Implementing tool use
- Designing multi-step workflows
- Creating autonomous systems

## Core Concepts

### Agent Architecture

```
User Request → Agent → Tool Selection → Execution → Observation → Response
                     ↑                              |
                     └──────────────────────────────┘
```

### Tool Definition

```typescript
const tools = [
  {
    type: 'function',
    function: {
      name: 'search_products',
      description: 'Search for products in the catalog',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search query' },
          category: { type: 'string', description: 'Product category' },
        },
        required: ['query'],
      },
    },
  },
];
```

### Tool Execution

```typescript
async function executeTool(name: string, args: Record<string, any>) {
  switch (name) {
    case 'search_products':
      return await searchProducts(args.query, args.category);
    case 'create_booking':
      return await createBooking(args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
```

## Best Practices

- Define clear tool schemas
- Handle tool errors gracefully
- Implement proper validation
- Log agent decisions
- Set execution limits
- Provide human oversight
- Test edge cases thoroughly

## Anti-Patterns

- Unlimited tool execution
- Not validating tool outputs
- Exposing internal tools to users
- Missing error handling
- Not logging agent actions

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
