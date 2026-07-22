---
title: Rate limiting implementation, throttling strategies, and abuse prevention
description: Rate limiting implementation, throttling strategies, and abuse prevention
---

# Rate limiting implementation, throttling strategies, and abuse prevention

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>rate-limiting</code> | <strong>Category:</strong> security | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# Rate Limiting

## Purpose

Guide rate limiting implementation to prevent abuse and ensure service availability.

## When to Use

- Protecting API endpoints
- Preventing brute force attacks
- Managing resource-intensive operations
- Implementing tier-based limits

## Core Concepts

### Rate Limit Headers

```typescript
// Response headers
X-RateLimit-Limit: 100        // Max requests per window
X-RateLimit-Remaining: 95     // Remaining in window
X-RateLimit-Reset: 1640995200 // Window reset timestamp
Retry-After: 60               // Seconds to wait (429 response)
```

### Implementation Patterns

```typescript
// Simple in-memory (single instance)
const rateLimit = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string, limit = 100, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}
```

### Tier-Based Limits

```typescript
const limits = {
  free: { requests: 100, window: '1h' },
  pro: { requests: 1000, window: '1h' },
  enterprise: { requests: 10000, window: '1h' },
};
```

## Best Practices

- Apply rate limiting at the edge (middleware/CDN)
- Use Redis for distributed rate limiting
- Set different limits per endpoint sensitivity
- Return clear rate limit headers
- Implement progressive delays for repeated violations
- Whitelist trusted IPs for internal services

## Anti-Patterns

- No rate limiting on authentication endpoints
- Rate limiting by IP only (behind NAT)
- In-memory only in distributed systems
- Not handling rate limit responses on client

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
