---
name: agent-design
description: AI agent design patterns, tool use, multi-step reasoning, and autonomous workflows
category: ai
level: concept
priority: medium
dependencies: ["llm-integration", "prompt-engineering"]
related_skills: ["llm-integration", "prompt-engineering", "context-engineering"]
related_agents: ["ai-engineer"]
activation_rules:
  - keywords: ["agent", "tool", "function calling", "autonomous", "workflow"]
---

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
