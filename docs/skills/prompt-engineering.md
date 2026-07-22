---
title: Prompt engineering techniques, chain-of-thought, few-shot learning, and prompt optimization
description: Prompt engineering techniques, chain-of-thought, few-shot learning, and prompt optimization
---

# Prompt engineering techniques, chain-of-thought, few-shot learning, and prompt optimization

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>prompt-engineering</code> | <strong>Category:</strong> ai | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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
