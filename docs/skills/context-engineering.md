---
title: Context window management, prompt assembly, memory systems, and context optimization
description: Context window management, prompt assembly, memory systems, and context optimization
---

# Context window management, prompt assembly, memory systems, and context optimization

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>context-engineering</code> | <strong>Category:</strong> ai | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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
