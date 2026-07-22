---
title: Ai Engineering
description: Ai Engineering reference documentation
---

# Ai Engineering

# AI Engineering — Knowledge Base

## Purpose

AI Engineering covers the integration of Large Language Models (LLMs) into applications. This knowledge base addresses LLM API patterns, streaming, function calling, guardrails, evaluation, cost management, and error handling for building reliable AI-powered features in Next.js applications.

## Core Concepts

### LLM API Integration

**Completion APIs** — Send prompts, receive text responses. The fundamental interaction pattern with models like GPT-4, Claude, Gemini.

**Chat APIs** — Structured conversation with system, user, and assistant messages. Maintains context through message history.

**Streaming** — Token-by-token response delivery via Server-Sent Events (SSE). Reduces perceived latency and enables real-time display.

**Embeddings** — Convert text to numerical vectors for semantic search, clustering, and similarity comparison.

### Prompt Architecture

**System prompts** — Define model behavior, personality, and constraints. Set once per conversation.
**User prompts** — The actual query or instruction from the user.
**Assistant prompts** — Model responses, either pre-filled or from previous turns.

### Function Calling / Tool Use

LLMs can invoke external functions by generating structured JSON arguments. The model decides which function to call based on the prompt and available tools.

**Flow:**
1. Define available functions with JSON Schema parameters
2. Send prompt with function definitions
3. Model responds with function call request
4. Execute function, return result to model
5. Model generates final response incorporating function results

### Guardrails

Safety and quality controls that constrain LLM behavior:

**Input guardrails** — Validate, sanitize, and filter user inputs before sending to LLM
**Output guardrails** — Validate LLM responses for correctness, safety, and format compliance
**Content moderation** — Detect and block harmful, offensive, or inappropriate content

### Evaluation

**Automated metrics** — Accuracy, relevance, format compliance, latency, and cost per request
**Human evaluation** — Expert review of response quality, helpfulness, and safety
**A/B testing** — Compare different prompts, models, or configurations with real users
**Regression testing** — Ensure changes don't degrade existing functionality

### Cost Management

**Token-based pricing** — Most providers charge per input and output tokens
**Caching** — Store and reuse responses for repeated queries
**Model tiering** — Use cheaper models for simple tasks, expensive models for complex reasoning
**Rate limiting** — Prevent abuse and control costs per user or per feature

## Best Practices

1. **Stream all LLM responses** — Use streaming for any user-facing LLM interaction; it reduces perceived latency and improves user experience dramatically
2. **Implement structured output** — Use JSON mode or function calling to enforce response format; don't rely on free-form text parsing
3. **Add comprehensive error handling** — LLM APIs fail with rate limits, timeouts, and model errors; implement retry logic with exponential backoff
4. **Cache responses aggressively** — For deterministic queries, cache results with TTL; use semantic similarity for near-duplicate detection
5. **Validate all LLM outputs** — Never trust LLM responses blindly; validate format, content, and business rules before using results
6. **Monitor costs per feature** — Track token usage and costs for each AI feature; set alerts for unexpected cost increases
7. **Use system prompts to constrain behavior** — Clearly define what the model should and shouldn't do; include output format instructions
8. **Test with diverse inputs** — LLMs behave differently with various phrasings; test with edge cases, adversarial inputs, and multilingual queries

## Anti-Patterns

1. **Sending raw user input to LLM** — User prompts may contain prompt injection attacks; sanitize and validate all inputs before sending
2. **Trusting LLM output without validation** — LLMs hallucinate; always validate responses against business logic and data sources
3. **Using free-form text parsing** — Parsing LLM output with regex is fragile; use function calling or JSON mode for structured data
4. **Ignoring rate limits** — Not implementing retry logic causes feature failures; use exponential backoff and circuit breakers
5. **Storing API keys in client-side code** — LLM API keys must only be used server-side; route all requests through API routes
6. **Over-relying on one model** — Different tasks suit different models; build abstractions that allow model switching
7. **Skipping evaluation** — Deploying AI features without measuring quality leads to silent degradation; establish baselines and monitor
8. **Not handling streaming errors** — Stream interruptions happen; implement fallback to non-streaming on stream failure

## Common Mistakes

1. **Not setting max_tokens** — Unbounded responses can be extremely expensive and slow; always set appropriate token limits
2. **Including too much context** — Longer prompts cost more and may confuse the model; be concise and relevant
3. **Using GPT-4 for simple tasks** — Classification, extraction, and simple transformations work well with cheaper models (GPT-4o-mini, Claude Haiku)
4. **Not handling model updates** — Providers update models frequently; pin specific model versions or test thoroughly when updating
5. **Ignoring latency requirements** — LLM responses take 1-10+ seconds; design UIs with loading states and streaming
6. **Missing content moderation** — User-facing AI features must filter harmful content; use provider moderation APIs
7. **Not versioning prompts** — Prompts are code; version them, track changes, and test modifications before deploying
8. **Forgetting about multilingual support** — Test LLM features with Arabic and English inputs; model performance varies by language

## Decision Guidelines

| Scenario | Recommended Approach |
|---|---|
| Simple text classification | GPT-4o-mini with structured output |
| Complex reasoning task | GPT-4 or Claude Sonnet with chain-of-thought |
| Real-time chat | Streaming with conversation history management |
| Data extraction | Function calling with strict JSON schema |
| Content generation | System prompt + user context + streaming |
| Search/RAG | Embeddings for retrieval + LLM for answer generation |
| Cost-sensitive features | Model tiering + caching + token limits |

## References

- OpenAI API Documentation: https://platform.openai.com/docs
- Anthropic API Documentation: https://docs.anthropic.com/
- Vercel AI SDK: https://sdk.vercel.ai/
- LangChain.js: https://js.langchain.com/
- LLM Evaluation Frameworks: https://github.com/openai/evals
- Prompt Engineering Guide: https://www.promptingguide.ai/

## Practical Notes

- **Vercel AI SDK:** Use for streaming, tool calling, and structured output in Next.js; provides React hooks for streaming UI
- **Supabase for AI:** Store conversation history, user preferences, and cached responses in Supabase tables
- **Environment variables:** Store API keys as `OPENAI_API_KEY`, `ANTHROPIC_API_KEY` etc. in `.env.local`; never expose to client
- **Monitoring:** Log token usage per request; set up alerts for cost anomalies; track latency percentiles
- **Graceful degradation:** When LLM services are unavailable, provide fallback responses or queue requests for later processing

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
