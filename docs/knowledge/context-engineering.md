---
title: Context Engineering
description: Context Engineering reference documentation
---

# Context Engineering

# Context Engineering — Knowledge Base

## Purpose

Context engineering is the discipline of designing, managing, and optimizing the information fed to LLMs to produce high-quality outputs. It encompasses context window management, retrieval strategies, conversation history, and context prioritization for building reliable AI systems.

## Core Concepts

### Context Window

The context window is the maximum number of tokens an LLM can process in a single request, including system prompt, conversation history, retrieved context, and user input.

**Token budget allocation (typical):**
- System prompt: 10-15%
- Retrieved context (RAG): 40-50%
- Conversation history: 20-30%
- User query + output space: 15-20%

### Context Types

**System context** — Persistent instructions defining model behavior, constraints, and output format. Loaded once per conversation.

**Conversational context** — Message history from the current session. Provides continuity for multi-turn interactions.

**Retrieved context (RAG)** — Documents or data fetched from external sources based on query relevance. Dynamic and query-specific.

**Tool context** — Results from function calls or tool executions. Generated during the conversation.

**User context** — User profile, preferences, and metadata that inform personalized responses.

### Context Management Strategies

**Sliding window** — Keep the last N messages; drop oldest when context exceeds budget. Simple but loses early context.

**Summarization** — Periodically summarize older conversation turns to reduce token count while preserving key information.

**Priority-based selection** — Rank context pieces by relevance and importance; include only the highest-priority items.

**Hierarchical context** — Layer context from general (system prompt) to specific (recent messages, retrieved documents).

### Context Compression

**Extractive compression** — Select and return the most relevant portions of documents without modification.

**Abstractive compression** — Generate a condensed summary that captures key information from multiple sources.

**Query-specific filtering** — Filter retrieved documents based on query terms, metadata, or semantic relevance.

### Context Prioritization

**Relevance scoring** — Rank context by semantic similarity to the query using embedding-based search.

**Recency weighting** — More recent information may be more relevant; apply time-based decay to older context.

**Authority scoring** — Trusted sources get higher priority; verified data ranks above unverified.

**Diversity control** — Ensure context covers multiple perspectives; avoid redundant information from similar sources.

## Best Practices

1. **Plan token budget carefully** — Allocate specific token budgets for each context type; don't let any single section dominate
2. **Prioritize recent and relevant context** — Sliding windows lose early context; use summarization or retrieval to preserve important information
3. **Compress conversation history** — Summarize older turns into condensed context; keep the last 3-5 turns in full detail
4. **Use structured context format** — Organize context with clear delimiters and labels; help the model distinguish between different information types
5. **Implement context relevance filtering** — Don't dump all retrieved documents into context; filter by relevance score threshold
6. **Handle context overflow gracefully** — When approaching token limits, truncate lower-priority context rather than failing
7. **Cache and reuse context** — For repeated queries, cache retrieved context with TTL; avoid redundant retrieval
8. **Monitor context quality** — Track which context sections contribute to good outputs; refine retrieval and prioritization

## Anti-Patterns

1. **Ignoring token limits** — Sending context that exceeds the model's window causes truncation or errors; always stay within limits
2. **Including irrelevant context** — Irrelevant documents confuse the model and waste tokens; filter aggressively
3. **Losing important early context** — Sliding windows discard the first messages; system-critical information from early conversation may be lost
4. **Duplicating information across context sources** — Same information in system prompt and retrieved context wastes tokens; deduplicate
5. **Treating all context equally** — Not all information is equally important; prioritize based on relevance, recency, and authority
6. **Forgetting to update context** — Stale context produces outdated responses; refresh retrieved context periodically
7. **Overstuffing context to "help"** — More context doesn't always help; focused, relevant context outperforms comprehensive dumps
8. **Not handling multi-language context** — Mixing Arabic and English context may confuse models; clearly label language and separate if needed

## Common Mistakes

1. **Not tracking token usage** — Blindly building context without counting tokens leads to overflow; always monitor token count per request
2. **Using only raw documents** — Raw documents are verbose; extract and compress key information before including in context
3. **Ignoring conversation length** — Long conversations accumulate context; implement automatic summarization or sliding window
4. **Including sensitive data unnecessarily** — Only include PII or sensitive data when strictly necessary for the task
5. **Not testing with realistic context sizes** — Development uses small contexts; production may have much larger; test at scale
6. **Forgetting system prompt tokens** — System prompts are part of the context budget; large system prompts leave less room for user content
7. **Using wrong delimiter format** — Inconsistent delimiters make it hard for models to parse context sections; use XML tags or markdown headers
8. **Not accounting for model-specific tokenization** — Different models tokenize differently; a 4K token context may be 3K or 5K depending on the tokenizer

## Decision Guidelines

| Context Need | Strategy |
|---|---|
| Multi-turn conversation | Sliding window (last 10 turns) + periodic summarization |
| Large document retrieval | Chunk documents, retrieve top-k by relevance, compress |
| Personalized responses | User profile context + preference history |
| Tool-heavy workflows | Include only tool results relevant to current step |
| Multi-language context | Label language, separate sections, test with both languages |
| Cost-sensitive features | Minimize context length, cache aggressively, use smaller models |

## References

- Anthropic Context Engineering: https://docs.anthropic.com/
- OpenAI Context Window Guide: https://platform.openai.com/docs/
- LangChain Context Management: https://js.langchain.com/
- Vercel AI SDK Context Patterns: https://sdk.vercel.ai/
- "Building LLM Applications" — Various community resources

## Practical Notes

- **Token counting:** Use `tiktoken` or provider-specific tokenizers to count tokens accurately before sending requests
- **Supabase for context storage:** Store conversation history, user preferences, and cached context in Supabase tables
- **Arabic tokenization:** Arabic text often tokenizes to more tokens than English equivalent; budget extra tokens for Arabic content
- **Monitoring:** Track context size, retrieval quality, and output quality metrics; alert on degraded context quality
- **Iterative refinement:** Context engineering is experimental; test different context strategies and measure output quality

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
