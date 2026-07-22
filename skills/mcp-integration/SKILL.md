---
name: mcp-integration
description: Model Context Protocol server/client setup, tool definitions, and resource management
category: ai
level: framework
priority: medium
dependencies: ["llm-integration"]
related_skills: ["llm-integration", "agent-design"]
related_agents: ["ai-engineer"]
activation_rules:
  - keywords: ["MCP", "Model Context Protocol", "server", "tool", "resource"]
---

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
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["./mcp-server.js"],
      "env": {
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
