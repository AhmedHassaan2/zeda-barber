# LLM Tool/Function Calling — Knowledge Base

## Purpose

Tool calling enables LLMs to invoke external functions and APIs, bridging the gap between language understanding and real-world actions. This knowledge base covers schema definition, execution patterns, error handling, and safety considerations for implementing reliable tool calling in AI applications.

## Core Concepts

### How Tool Calling Works

1. **Define tools** — Describe available functions with names, descriptions, and JSON Schema parameters
2. **Send tools with prompt** — Include tool definitions in the API request alongside the user message
3. **Model decides** — LLM analyzes the request and decides which tool(s) to call, generating structured arguments
4. **Execute tools** — Application executes the requested function and returns results to the model
5. **Model generates response** — LLM incorporates tool results into its final response

### Tool Schema Definition

```typescript
const tools = [
  {
    type: "function",
    function: {
      name: "search_products",
      description: "Search for products in the catalog by name or category",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search term for product name or description"
          },
          category: {
            type: "string",
            enum: ["electronics", "clothing", "home"],
            description: "Product category filter"
          },
          max_price: {
            type: "number",
            description: "Maximum price filter in USD"
          }
        },
        required: ["query"]
      }
    }
  }
];
```

### Parallel Tool Calls

Models can request multiple tool calls simultaneously when they're independent:

```json
{
  "tool_calls": [
    { "id": "call_1", "function": { "name": "get_weather", "arguments": {"city": "Cairo"} } },
    { "id": "call_2", "function": { "name": "get_exchange_rate", "arguments": {"from": "USD", "to": "EGP"} } }
  ]
}
```

Execute independent calls in parallel for better performance.

### Tool Chaining

Complex tasks may require sequential tool calls where each result feeds the next:

1. User: "Find the cheapest flight to Paris"
2. Model calls `search_flights(destination: "Paris")`
3. Model calls `sort_by_price(flights: [results])`
4. Model calls `get_booking_details(flight_id: cheapest.id)`
5. Model responds with final answer

### Streaming with Tool Calls

When streaming, tool calls are delivered as part of the stream:
- Tool call arguments stream token by token
- Application must buffer arguments until complete
- Execute tool after receiving complete arguments
- Continue streaming for model's final response

### Response Format

Tool call results should be returned as strings (JSON-serialized):

```typescript
const result = await searchProducts({ query: "laptop" });
return JSON.stringify(result); // Return as string, not object
```

## Best Practices

1. **Write clear tool descriptions** — LLMs choose tools based on descriptions; describe what each tool does, when to use it, and what it returns
2. **Use strict JSON Schema** — Define required fields, types, enums, and constraints; prevents the model from generating invalid arguments
3. **Implement comprehensive error handling** — Tools should return meaningful error messages that help the model understand what went wrong
4. **Validate all tool arguments** — Never trust model-generated arguments; validate types, ranges, and business rules before execution
5. **Limit available tools** — Don't expose every possible function; give the model only the tools relevant to the current task
6. **Implement tool result caching** — Cache results for identical tool calls; same query within minutes should return cached results
7. **Set appropriate timeouts** — Tools should have timeouts (10-60 seconds); long-running tasks should return a job ID for polling
8. **Log all tool invocations** — Record tool name, arguments, result, and latency for debugging, monitoring, and improvement

## Anti-Patterns

1. **Exposing database as a tool** — Giving the LLM raw database access is dangerous; create focused tools with business logic
2. **Returning unstructured data** — Tool results should be structured (JSON) and concise; dumping raw database rows overwhelms the context
3. **Not handling tool failures** — Tools will fail; implement retry logic, graceful degradation, and informative error messages
4. **Exposing too many tools** — 50+ tools confuse the model; limit to 5-10 tools per context and increase as needed
5. **Trusting model arguments blindly** — Model may generate invalid, malicious, or out-of-range arguments; always validate
6. **Missing tool descriptions** — Tools without descriptions are invisible to the model; always provide clear, detailed descriptions
7. **Executing destructive operations without confirmation** — Delete, send, publish actions should require user confirmation before execution
8. **Ignoring rate limits** — Tool calls may hit external API rate limits; implement rate limiting and backoff

## Common Mistakes

1. **Returning complex nested objects** — Flatten tool results; models parse simple structures better than deeply nested JSON
2. **Not handling concurrent tool calls** — Models may request 2-5 tools simultaneously; implement parallel execution
3. **Forgetting to serialize results** — Tool results must be JSON strings, not raw objects; `JSON.stringify()` before returning
4. **Overusing tool calls** — Some questions don't need tools; if the model can answer directly, don't force tool usage
5. **Not providing tool call feedback** — If a tool call produces unexpected results, explain why in the result so the model can adjust
6. **Missing input validation** — Model-generated arguments may include SQL injection, path traversal, or other malicious patterns
7. **Not handling partial tool calls** — Streamed tool calls may be incomplete; buffer until the full argument is received
8. **Ignoring token costs** — Tool definitions consume tokens in every request; keep schemas concise and descriptions brief

## Decision Guidelines

| Task Type | Tool Design |
|---|---|
| Data retrieval | Read-only tool with query parameters and result limit |
| Data modification | Write tool with confirmation requirement |
| External API integration | Wrapper tool with error handling and rate limiting |
| Complex workflow | Multiple focused tools, let model chain them |
| File operations | Scoped tools with path validation and size limits |
| Real-time data | Streaming tool or polling tool with status updates |

| Argument Type | Validation |
|---|---|
| String (free text) | Sanitize, length limit, encoding check |
| Enum/selection | Validate against allowed values |
| Number | Range validation, type check |
| Date/time | Format validation, timezone handling |
| ID/reference | Existence check, access control |

## References

- OpenAI Function Calling: https://platform.openai.com/docs/guides/function-calling
- Anthropic Tool Use: https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview
- Vercel AI SDK Tools: https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling
- JSON Schema: https://json-schema.org/
- LangChain Tools: https://js.langchain.com/docs/concepts/tools/

## Practical Notes

- **Vercel AI SDK:** Use `tool()` helper for type-safe tool definitions; automatic streaming support for tool call arguments
- **Supabase tools:** Create MCP tools that wrap Supabase queries; validate RLS policies apply even through tool calls
- **Testing tool calls:** Mock tool implementations for unit tests; use integration tests with real tools in staging
- **Arabic support:** Tool descriptions work in any language; test tool calling with Arabic queries to ensure model selects correct tools
- **Monitoring:** Track tool call frequency, success rate, latency, and cost; optimize most-called tools first
