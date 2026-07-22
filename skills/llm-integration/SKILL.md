---
name: llm-integration
description: LLM API integration, prompt management, streaming responses, and error handling
category: ai
level: framework
priority: high
dependencies: []
related_skills: ["prompt-engineering", "rag-patterns", "context-engineering"]
related_agents: ["ai-engineer"]
activation_rules:
  - keywords: ["LLM", "GPT", "Claude", "Gemini", "AI", "chat", "completion"]
---

# LLM Integration

## Purpose

Guide LLM API integration for AI-powered features.

## When to Use

- Integrating LLM APIs
- Building chat interfaces
- Implementing streaming responses
- Adding AI-powered features

## Core Concepts

### Basic Integration

```typescript
// src/lib/ai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResponse(prompt: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1000,
  });

  return completion.choices[0].message.content ?? '';
}
```

### Streaming Response

```typescript
// API Route with streaming
export async function POST(request: Request) {
  const { prompt } = await request.json();

  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? '';
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
```

### Error Handling

```typescript
try {
  const response = await generateResponse(prompt);
} catch (error) {
  if (error instanceof openai.APIError) {
    if (error.status === 429) {
      // Rate limited - implement backoff
    }
    if (error.status === 500) {
      // Server error - retry or fallback
    }
  }
}
```

## Best Practices

- Implement retry logic with exponential backoff
- Use streaming for better UX
- Set appropriate max_tokens
- Handle rate limits gracefully
- Log API usage for cost monitoring
- Use environment variables for API keys
- Implement fallback responses

## Anti-Patterns

- Not handling API errors
- Exposing API keys to client
- Not implementing rate limiting
- Using max_tokens too high
- Not streaming long responses
