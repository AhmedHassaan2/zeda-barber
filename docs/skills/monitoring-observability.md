---
title: Application monitoring, metrics collection, alerting, and health checks
description: Application monitoring, metrics collection, alerting, and health checks
---

# Application monitoring, metrics collection, alerting, and health checks

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>monitoring-observability</code> | <strong>Category:</strong> observability | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# Monitoring & Observability

## Purpose

Guide application monitoring and observability implementation.

## When to Use

- Setting up monitoring
- Implementing health checks
- Configuring alerts
- Analyzing system health

## Core Concepts

### Health Check Endpoint

```typescript
// src/app/api/health/route.ts
export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabase(),
      storage: await checkStorage(),
    },
  };

  const allHealthy = Object.values(checks.services).every(
    (s) => s.status === 'healthy'
  );

  return NextResponse.json(checks, {
    status: allHealthy ? 200 : 503,
  });
}
```

### Key Metrics

| Metric | What | Alert Threshold |
|--------|------|-----------------|
| Error Rate | 5xx responses | > 1% |
| Latency | Response time | > 2s (p95) |
| Throughput | Requests/minute | < 50% normal |
| Uptime | Service availability | < 99.9% |

### Alerting Rules

```yaml
# Alert on error spike
- alert: HighErrorRate
  expr: rate(http_requests_total{status="5xx"}[5m]) > 0.01
  for: 5m
  labels:
    severity: critical

# Alert on high latency
- alert: HighLatency
  expr: histogram_quantile(0.95, http_request_duration_seconds) > 2
  for: 5m
  labels:
    severity: warning
```

## Best Practices

- Monitor what matters (business metrics too)
- Set up meaningful alerts (not noise)
- Use dashboards for visualization
- Implement health checks
- Track SLAs and SLOs
- Review alerts regularly
- Document runbooks

## Anti-Patterns

- Alerting on every anomaly
- Not monitoring production
- Ignoring warning-level alerts
- No health check endpoints
- Not tracking business metrics

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
