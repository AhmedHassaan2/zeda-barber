---
name: structured-logging
description: Structured logging patterns, log levels, context enrichment, and log management
category: observability
level: concept
priority: high
dependencies: []
related_skills: ["error-tracking", "monitoring-observability"]
related_agents: ["devops"]
activation_rules:
  - keywords: ["log", "logger", "logging", "debug", "info", "warn", "error"]
---

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
