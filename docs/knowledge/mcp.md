---
title: Mcp
description: Mcp reference documentation
---

# Mcp

# Model Context Protocol (MCP) — Knowledge Base

## Purpose

Model Context Protocol (MCP) is an open protocol that standardizes how AI applications connect to external data sources and tools. It provides a universal interface for LLMs to access context, execute tools, and interact with external systems through a client-server architecture.

## Core Concepts

### Architecture

**MCP Host** — The AI application that initiates connections (e.g., OpenCode, Claude Desktop, custom AI apps).

**MCP Client** — Protocol client within the host that maintains 1:1 connections with MCP servers.

**MCP Server** — Lightweight program that exposes specific capabilities (tools, resources, prompts) to clients.

**Communication flow:** Host → Client → Transport → Server → External system

### Protocol Primitives

**Tools** — Functions that the LLM can invoke to perform actions or retrieve data. Defined with JSON Schema parameters.
- Example: `search_docs(query: string)`, `create_issue(title: string, body: string)`

**Resources** — Data that the server exposes for reading. URI-based, similar to GET endpoints.
- Example: `file:///path/to/doc`, `db://table/rows`

**Prompts** — Reusable prompt templates that the server provides. Structured templates with arguments.
- Example: `code_review(language: string, file_path: string)`

### Transports

**stdio** — Standard input/output transport for local processes. Server runs as a subprocess.

**SSE (Server-Sent Events)** — HTTP-based transport for remote servers. Server sends events, client sends messages via HTTP POST.

**Streamable HTTP** — Newer HTTP transport supporting bidirectional streaming. Preferred for new implementations.

### Lifecycle

1. **Initialize** — Client sends `initialize` with protocol version and capabilities
2. **Capability negotiation** — Server responds with its supported capabilities
3. **Operation** — Client and server exchange messages using agreed capabilities
4. **Shutdown** — Clean disconnection with `shutdown` and `close`

### Security Model

**Tool consent** — Users should approve tool execution before it happens. MCP hosts should implement confirmation dialogs.

**Data privacy** — Servers should not send sensitive data without user consent. Clients should handle data securely.

**Access control** — Servers should implement appropriate authentication and authorization for the systems they access.

**Transport security** — Remote transports should use TLS/HTTPS. Local stdio transport inherits process security.

## Best Practices

1. **Design focused servers** — Each MCP server should do one thing well; separate documentation search, issue creation, and database access into different servers
2. **Define clear tool schemas** — Use descriptive names, detailed descriptions, and strict JSON Schema for all tool parameters; LLMs rely on these to choose tools
3. **Implement error handling gracefully** — Return meaningful error messages from tools; LLMs can use error information to adjust their approach
4. **Add user confirmation for destructive operations** — Tools that modify data (create, update, delete) should require user confirmation before execution
5. **Use structured resource URIs** — Design intuitive URI schemes for resources; `file://`, `db://`, `api://` prefixes clarify data source
6. **Version your protocol** — Support multiple protocol versions for backward compatibility; version in capability negotiation
7. **Implement rate limiting** — Prevent abuse of tools and resources; set per-tool and per-session limits
8. **Log tool invocations** — Track which tools are called, with what parameters, and what results; essential for debugging and auditing

## Anti-Patterns

1. **Exposing raw database access** — MCP tools should be high-level operations, not raw SQL queries; implement business logic in tools
2. **Returning unfiltered data** — Resources should respect access control; don't expose data the user shouldn't see
3. **Missing error handling** — Tools that crash or return cryptic errors confuse the LLM; handle all errors and return informative messages
4. **Ignoring transport security** — Never transmit sensitive data over unencrypted channels; always use TLS for remote transports
5. **Hardcoding credentials** — API keys and tokens should be provided by the host environment, not embedded in server code
6. **Overly broad tools** — A single tool that does everything is hard for LLMs to use correctly; break into focused, specific tools
7. **Not implementing tool timeouts** — Long-running tools block the conversation; implement timeouts and support cancellation
8. **Skipping capability negotiation** — Always negotiate capabilities during initialization; don't assume server features

## Common Mistakes

1. **Not providing tool descriptions** — LLMs choose tools based on descriptions; missing or vague descriptions lead to incorrect tool selection
2. **Ignoring parameter validation** — Validate all tool inputs server-side; LLMs can generate malformed parameters
3. **Returning massive payloads** — Large resource contents overwhelm the LLM context window; paginate or summarize large data
4. **Not handling concurrent tool calls** — LLMs may request multiple tools simultaneously; server must handle concurrent execution
5. **Forgetting about idempotency** — Tool calls may be retried; ensure repeated calls produce the same result for read operations
6. **Missing resource change notifications** — When resources change, notify clients with `notifications/resources/updated`
7. **Not implementing progress reporting** — Long-running tools should report progress; use `notifications/progress` to keep users informed
8. **Using stdio for remote servers** — stdio is designed for local processes; use HTTP-based transports for remote access

## Decision Guidelines

| Scenario | Transport | Tool Design |
|---|---|---|
| Local CLI tool | stdio | Single-purpose tools with clear parameters |
| Remote API integration | Streamable HTTP | High-level operations, rate-limited |
| Database access | stdio or HTTP | Read-only resources, parameterized queries |
| File system access | stdio | Scoped to specific directories, read/write tools |
| Real-time data | HTTP + SSE | Resources with change notifications |

| Tool Type | Confirmation Required | Timeout |
|---|---|---|
| Read/search | No | 5-30 seconds |
| Create/update | Yes (or auto-confirm with warning) | 10-60 seconds |
| Delete/destructive | Always | 10-60 seconds |
| External API call | Depends on action | 30-120 seconds |

## References

- MCP Specification: https://spec.modelcontextprotocol.io/
- MCP GitHub Organization: https://github.com/modelcontextprotocol
- MCP TypeScript SDK: https://github.com/modelcontextprotocol/typescript-sdk
- MCP Servers Repository: https://github.com/modelcontextprotocol/servers
- Anthropic MCP Documentation: https://docs.anthropic.com/en/docs/agents-and-tools/mcp

## Practical Notes

- **Building MCP servers:** Use the TypeScript or Python SDK; start with stdio transport for local development, add HTTP for remote deployment
- **Testing:** Use the MCP Inspector tool to test servers interactively; verify tool schemas and resource access
- **Integration with OpenCode:** MCP servers are configured in opencode.json under the `mcp` section; specify command, args, and environment
- **Deployment:** Package MCP servers as npm packages or Docker containers; distribute through standard package managers
- **Arabic content:** MCP tools handling Arabic text should document encoding requirements and RTL support

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
