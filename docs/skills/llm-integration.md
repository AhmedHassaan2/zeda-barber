---
title: LLM API integration, prompt management, streaming responses, and error handling
description: LLM API integration, prompt management, streaming responses, and error handling
---

# LLM API integration, prompt management, streaming responses, and error handling

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>llm-integration</code> | <strong>Category:</strong> ai | <strong>Priority:</strong> high | <strong>Level:</strong> framework
</div>

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
