---
name: input-validation
description: Input validation patterns, sanitization, and protection against injection attacks
category: security
level: concept
priority: high
dependencies: []
related_skills: ["api-design", "form-engineering"]
related_agents: ["security", "backend"]
activation_rules:
  - keywords: ["validation", "sanitization", "Zod", "Yup", "escape", "injection"]
---

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
