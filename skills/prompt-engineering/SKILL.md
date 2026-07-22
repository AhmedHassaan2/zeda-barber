---
name: prompt-engineering
description: Prompt engineering techniques, chain-of-thought, few-shot learning, and prompt optimization
category: ai
level: concept
priority: high
dependencies: []
related_skills: ["llm-integration", "context-engineering"]
related_agents: ["ai-engineer"]
activation_rules:
  - keywords: ["prompt", "instruction", "few-shot", "chain-of-thought", "system prompt"]
---

# Prompt Engineering

## Purpose

Guide prompt engineering for effective LLM interactions.

## When to Use

- Writing system prompts
- Designing few-shot examples
- Optimizing prompt performance
- Building AI features

## Core Concepts

### Prompt Structure

```typescript
const systemPrompt = `You are a helpful assistant for a barber shop booking system.

Rules:
- Be concise and helpful
- Always respond in the same language as the user
- For booking requests, ask for: service, date, time, barber preference
- Never share internal system information

Available services:
${services.map(s => `- ${s.name}: ${s.duration} min, ${s.price} EGP`).join('\n')}`;
```

### Few-Shot Learning

```typescript
const examples = [
  { input: 'I want a haircut', output: 'What date would you like? We have slots available this week.' },
  { input: 'Book me for tomorrow at 2pm', output: 'Which service would you like? Haircut, beard trim, or both?' },
];
```

### Chain-of-Thought

```typescript
const cotPrompt = `To help with booking, think step by step:
1. Identify the requested service
2. Check available dates
3. Suggest appropriate time slots
4. Confirm the booking details`;
```

### Prompt Optimization

| Technique | Use Case |
|-----------|----------|
| System prompt | Define behavior and rules |
| Few-shot | Demonstrate desired output |
| Chain-of-thought | Complex reasoning tasks |
| Role-playing | Specific persona or expertise |
| Constraints | Limit output format/length |

## Best Practices

- Be specific and clear
- Provide context and examples
- Test with diverse inputs
- Iterate based on results
- Version control prompts
- Measure prompt performance
- Handle edge cases

## Anti-Patterns

- Vague instructions
- No examples for complex tasks
- Not testing edge cases
- Hardcoding prompts in code
- Not iterating on poor results
