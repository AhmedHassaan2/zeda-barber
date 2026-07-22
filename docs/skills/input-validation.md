---
title: Input validation patterns, sanitization, and protection against injection attacks
description: Input validation patterns, sanitization, and protection against injection attacks
---

# Input validation patterns, sanitization, and protection against injection attacks

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>input-validation</code> | <strong>Category:</strong> security | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Input Validation

## Purpose

Guide input validation and sanitization to prevent injection attacks and ensure data integrity.

## When to Use

- Validating API input
- Validating form data
- Sanitizing user content
- Protecting against injection

## Core Concepts

### Schema Validation with Zod

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase(),
  age: z.number().int().min(0).max(150).optional(),
});

// Validate at API boundary
const result = UserSchema.safeParse(body);
if (!result.success) {
  return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
}
```

### Sanitization

```typescript
// HTML sanitization
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);

// SQL injection prevention (Supabase handles this)
// Never use string interpolation in queries

// XSS prevention
// Escape output, use React's automatic escaping
```

### Validation Layers

1. **Client-side**: UX feedback (optional, not security)
2. **API boundary**: Security validation (required)
3. **Database**: Constraints as final safety net

## Best Practices

- Validate at every entry point
- Use schema validation libraries (Zod)
- Whitelist allowed input, reject everything else
- Sanitize HTML content
- Limit input length
- Log validation failures for monitoring

## Anti-Patterns

- Client-side only validation
- Using regex for complex validation (use libraries)
- Not validating file uploads
- Trimming input only on client
- Accepting any input and filtering later

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
