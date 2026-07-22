---
name: rate-limiting
description: Rate limiting implementation, throttling strategies, and abuse prevention
category: security
level: concept
priority: medium
dependencies: []
related_skills: ["api-design", "input-validation"]
related_agents: ["security", "backend"]
activation_rules:
  - keywords: ["rate limit", "throttle", "abuse", "flood", "429"]
---

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
