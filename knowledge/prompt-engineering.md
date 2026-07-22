# Prompt Engineering — Knowledge Base

## Purpose

Prompt engineering is the practice of designing inputs to LLMs that produce desired outputs consistently and reliably. This knowledge base covers prompt design principles, patterns, optimization techniques, and testing strategies for building AI features with predictable quality.

## Core Concepts

### Prompt Structure

**System prompt** — Sets the model's role, behavior, constraints, and output format. This is the foundation of consistent behavior.

**User prompt** — The actual task or query. Should be specific, contextual, and unambiguous.

**Context window** — Limited token budget for the entire conversation; prioritize the most relevant information.

### Prompt Patterns

**Zero-shot** — Give the task directly without examples. Works for simple, well-defined tasks.

**Few-shot** — Provide 2-5 input/output examples demonstrating the desired behavior. Essential for complex formatting or nuanced tasks.

**Chain-of-thought (CoT)** — Ask the model to reason step-by-step before providing an answer. Improves accuracy for reasoning tasks.

**Role prompting** — Assign a specific role to the model ("You are a senior TypeScript developer..."). Focuses domain expertise.

**Self-consistency** — Generate multiple responses and select the most common answer. Improves reliability for critical decisions.

### Structured Output

**JSON mode** — Force responses in valid JSON format. Use for data extraction and API integration.

**Function calling** — Define expected output as a function schema. Model generates structured arguments matching the schema.

**Template-based** — Provide output templates with placeholders for the model to fill.

### Token Management

- **Input tokens** — Text in prompts (system + user + context). Charged per token.
- **Output tokens** — Model's response. Usually more expensive than input tokens.
- **Context window limit** — Maximum tokens per request (4K to 200K depending on model).
- **Tokenization** — Text is split into tokens; words may be multiple tokens; Arabic tokenization differs from English.

## Best Practices

1. **Be specific and explicit** — Vague prompts produce vague outputs; state exactly what you want, the format, length, and constraints
2. **Use structured output consistently** — Always define expected output format with JSON schema or function calling; never parse free-form text for critical data
3. **Provide few-shot examples for complex tasks** — Show 2-3 input/output pairs for tasks with specific formatting, tone, or reasoning patterns
4. **Use chain-of-thought for reasoning** — Ask "think step by step" for math, logic, comparison, and multi-step reasoning tasks
5. **Separate instructions from data** — Keep system prompts for behavior rules; user prompts for task-specific data; don't mix concerns
6. **Version and test prompts** — Treat prompts as code; version them in Git, test with representative inputs, and track quality metrics
7. **Implement output validation** — Always validate LLM output against expected schema; retry on invalid responses
8. **Optimize for cost and latency** — Shorter prompts cost less and respond faster; remove unnecessary context while maintaining quality

## Anti-Patterns

1. **Vague instructions** — "Make it good" is unactionable; specify criteria, format, and constraints explicitly
2. **Overloading context window** — Filling the entire context with irrelevant information degrades performance; include only necessary context
3. **Ignoring model limitations** — LLMs don't have real-time data, can't access external systems (without tools), and may hallucinate
4. **Using the same prompt for all models** — Different models respond differently; optimize prompts per model family
5. **Not handling format failures** — LLMs sometimes produce invalid JSON or miss format requirements; implement retry with format correction
6. **Hardcoded prompts in code** — Prompts scattered across codebase are hard to manage; store in dedicated config or database
7. **Skipping edge case testing** — Prompts that work for normal input may fail for empty, malicious, or unusual input
8. **Not setting temperature** — Temperature controls randomness; use 0 for factual tasks, 0.7-1.0 for creative tasks

## Common Mistakes

1. **Not defining output format upfront** — Adding format requirements after development causes inconsistency; define format in system prompt from the start
2. **Ignoring token costs** — Long prompts with few-shot examples multiply costs; optimize prompt length for production
3. **Using "please" and politeness markers** — They waste tokens without improving output quality; be direct and technical
4. **Not handling model updates** — Model behavior changes with updates; pin model versions and test when updating
5. **Including sensitive data in prompts** — User data in prompts may be stored by providers; sanitize PII before sending
6. **Forgetting Arabic/English differences** — LLMs perform differently across languages; test prompts in both languages
7. **Not retrying on format failures** — First attempt may produce malformed output; implement retry loop with format validation
8. **Using max tokens as a safety net** — Setting very high max tokens wastes budget; estimate appropriate limits per task type

## Decision Guidelines

| Task Type | Recommended Pattern |
|---|---|
| Classification | Few-shot with 3-5 examples, structured output |
| Data extraction | Function calling with strict JSON schema |
| Summarization | System prompt with length/format constraints |
| Creative writing | Higher temperature, minimal constraints |
| Code generation | Role prompting + few-shot + chain-of-thought |
| Q&A / Research | Chain-of-thought, cite sources, temperature 0 |
| Translation | System prompt with target language, few-shot pairs |

## References

- OpenAI Prompt Engineering Guide: https://platform.openai.com/docs/guides/prompt-engineering
- Anthropic Prompt Engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering
- Prompt Engineering Guide: https://www.promptingguide.ai/
- Google Vertex AI Prompt Design: https://cloud.google.com/vertex-ai/docs/generative-ai/prompt-design
- LangChain Prompt Templates: https://js.langchain.com/docs/concepts/prompt-templates/

## Practical Notes

- **System prompt template:** Start with role definition, then constraints, then output format, then examples
- **Testing framework:** Create a test suite with representative inputs; measure accuracy, format compliance, and latency
- **Production prompts:** Store in database or config files; enable A/B testing without code deployments
- **Arabic prompts:** Test with Arabic inputs separately; model performance may vary; consider translation for critical tasks
- **Cost optimization:** Use shorter prompts for high-volume features; cache responses for repeated queries
