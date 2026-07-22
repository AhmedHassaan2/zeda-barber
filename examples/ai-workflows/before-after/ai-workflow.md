# AI Workflow Refactoring: Before / After

## Before (Anti-pattern)

```ts
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateContent(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
}
```

**Problems:**
- Hardcoded API key
- No input validation or length limits
- No guardrails for harmful content
- No streaming — blocks client for seconds
- No error handling — any API error crashes
- No abort support — can't cancel long generations
- No token tracking — costs invisible

## After (Preferred)

```ts
export async function generateContent(input: GenerateRequest, signal?: AbortSignal) {
  // 1. Validate input
  if (input.prompt.length > 10000) throw new Error("PROMPT_TOO_LONG");

  // 2. Check guardrails
  for (const pattern of GUARDRAILS.blockedPatterns) {
    if (pattern.test(input.prompt)) throw new Error("CONTENT_POLICY_VIOLATION");
  }

  // 3. Stream with abort support
  const stream = await openai.chat.completions.create({ stream: true, ... }, { signal });

  // 4. Process chunks, track tokens
  for await (const chunk of stream) { ... }

  // 5. Structured response with finish reason
  return { content, tokensUsed, finishReason };
}
```

**Improvements:**
1. **Input validation** — length limits and empty checks
2. **Guardrails** — block harmful content patterns
3. **Streaming** — progressive response delivery
4. **Abort support** — cancelable generations
5. **Error boundaries** — graceful failure handling
6. **Token tracking** — cost monitoring
