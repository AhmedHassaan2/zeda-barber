---
name: context-engineering
description: Context window management, prompt assembly, memory systems, and context optimization
category: ai
level: concept
priority: high
dependencies: ["llm-integration", "prompt-engineering"]
related_skills: ["llm-integration", "prompt-engineering", "rag-patterns"]
related_agents: ["ai-engineer", "context-engineer"]
activation_rules:
  - keywords: ["context", "window", "token", "memory", "conversation"]
---

# Context Engineering

## Purpose

Guide context engineering for effective LLM interactions.

## When to Use

- Managing context windows
- Implementing conversation memory
- Optimizing prompt assembly
- Building multi-turn conversations

## Core Concepts

### Context Window Management

```typescript
// Token counting and management
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4); // Approximate
}

function buildContext(messages: Message[], maxTokens = 4000): Message[] {
  let totalTokens = 0;
  const context: Message[] = [];

  // Add system message first
  context.push({ role: 'system', content: systemPrompt });
  totalTokens += estimateTokens(systemPrompt);

  // Add recent messages (most recent first)
  for (let i = messages.length - 1; i >= 0; i--) {
    const msgTokens = estimateTokens(messages[i].content);
    if (totalTokens + msgTokens > maxTokens) break;
    context.unshift(messages[i]);
    totalTokens += msgTokens;
  }

  return context;
}
```

### Memory Systems

```typescript
// Short-term: Conversation history
// Long-term: Persistent user preferences
// Episodic: Past interactions summary

interface MemorySystem {
  shortTerm: Message[];      // Current conversation
  longTerm: UserPreferences; // User settings
  episodic: Summary[];       // Past interactions
}
```

### Context Assembly

```typescript
function assembleContext(userMessage: string, userId: string) {
  const userPrefs = getUserPreferences(userId);
  const relevantDocs = retrieveRelevantDocuments(userMessage);
  const conversationHistory = getConversationHistory(userId);

  return {
    system: buildSystemPrompt(userPrefs),
    context: relevantDocs,
    history: conversationHistory,
    current: userMessage,
  };
}
```

## Best Practices

- Prioritize recent context
- Include relevant documents
- Manage token budget carefully
- Implement memory consolidation
- Test context quality
- Monitor token usage
- Optimize for cost and quality

## Anti-Patterns

- Exceeding context window
- Not prioritizing relevant context
- Ignoring token limits
- Not implementing memory
- Static context assembly
