---
title: Structured logging patterns, log levels, context enrichment, and log management
description: Structured logging patterns, log levels, context enrichment, and log management
---

# Structured logging patterns, log levels, context enrichment, and log management

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>structured-logging</code> | <strong>Category:</strong> observability | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Structured Logging

## Purpose

Guide structured logging implementation for effective debugging and monitoring.

## When to Use

- Adding logging to applications
- Debugging production issues
- Setting up log aggregation
- Implementing audit trails

## Core Concepts

### Log Levels

```typescript
enum LogLevel {
  DEBUG = 'debug',    // Detailed debug info
  INFO = 'info',      // Normal operations
  WARN = 'warn',      // Potential issues
  ERROR = 'error',    // Failures requiring attention
  FATAL = 'fatal',    // System-threatening failures
}
```

### Structured Format

```typescript
// Good: Structured JSON
logger.info('User created', {
  userId: user.id,
  email: user.email,
  source: 'registration',
  timestamp: new Date().toISOString(),
});

// Bad: Unstructured string
logger.info(`User created: ${user.id}`);
```

### Context Enrichment

```typescript
// Add context to all logs
const logger = createLogger({
  level: 'info',
  defaultMeta: {
    service: 'booking-api',
    version: process.env.APP_VERSION,
  },
});

// Request context
logger.info('Processing request', {
  requestId: req.id,
  userId: user.id,
  endpoint: req.url,
});
```

## Best Practices

- Use structured logging (JSON format)
- Include correlation IDs for request tracing
- Log at appropriate levels
- Don't log sensitive data (passwords, tokens)
- Use log aggregation tools (Datadog, Logtail)
- Set up alerts for error spikes
- Keep log messages concise

## Anti-Patterns

- Logging sensitive data
- Using console.log in production
- Not using structured logging
- Logging too much (noise)
- Not including context

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
