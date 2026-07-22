---
name: monitoring-observability
description: Application monitoring, metrics collection, alerting, and health checks
category: observability
level: concept
priority: medium
dependencies: []
related_skills: ["structured-logging", "error-tracking"]
related_agents: ["devops"]
activation_rules:
  - keywords: ["monitoring", "metrics", "alert", "health check", "uptime", "observability"]
---

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
