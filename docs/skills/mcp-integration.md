---
title: Model Context Protocol server/client setup, tool definitions, and resource management
description: Model Context Protocol server/client setup, tool definitions, and resource management
---

# Model Context Protocol server/client setup, tool definitions, and resource management

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>mcp-integration</code> | <strong>Category:</strong> ai | <strong>Priority:</strong> medium | <strong>Level:</strong> framework
</div>

# MCP Integration

## Purpose

Guide Model Context Protocol integration for standardized AI tool access.

## When to Use

- Setting up MCP servers
- Defining MCP tools
- Managing MCP resources
- Integrating with OpenCode

## Core Concepts

### MCP Server Setup

```typescript
// mcp-server.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const server = new McpServer({
  name: 'my-server',
  version: '1.0.0',
});

// Define tool
server.tool(
  'search_products',
  'Search for products',
  {
    query: { type: 'string', description: 'Search query' },
  },
  async ({ query }) => {
    const results = await searchProducts(query);
    return { content: [{ type: 'text', text: JSON.stringify(results) }] };
  }
);
```

### MCP Resource

```typescript
// Expose data as resources
server.resource(
  'products',
  'products://list',
  async () => {
    const products = await getProducts();
    return { contents: [{ uri: 'products://list', text: JSON.stringify(products) }] };
  }
);
```

### OpenCode Integration

```json
// opencode.json
{
  "mcp": {
    "my-server": {
      "type": "local",
      "command": ["node", "./mcp-server.js"],
      "environment": {
        "API_KEY": "${MY_API_KEY}"
      }
    }
  }
}
```

## Best Practices

- Follow MCP specification
- Provide clear tool descriptions
- Validate all tool inputs
- Handle errors properly
- Document available tools
- Use appropriate resource URIs
- Implement proper authentication

## Anti-Patterns

- Not validating tool inputs
- Exposing sensitive data as resources
- Missing error handling
- Not documenting tools
- Hardcoding credentials

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
