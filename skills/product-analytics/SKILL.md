---
name: product-analytics
description: Product analytics implementation, event tracking, funnel analysis, and user behavior insights
category: analytics
level: concept
priority: medium
dependencies: []
related_skills: ["conversion-optimization"]
related_agents: ["frontend"]
activation_rules:
  - keywords: ["analytics", "tracking", "event", "funnel", "conversion", "GA4"]
---

# Product Analytics

## Purpose

Guide product analytics implementation for data-driven decisions.

## When to Use

- Implementing event tracking
- Setting up funnels
- Analyzing user behavior
- Measuring feature adoption

## Core Concepts

### Event Tracking

```typescript
// src/lib/analytics.ts
export function trackEvent(name: string, properties?: Record<string, any>) {
  // Google Analytics 4
  window.gtag?.('event', name, properties);
  
  // Custom analytics
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({ event: name, properties, timestamp: Date.now() }),
  });
}

// Usage
trackEvent('booking_completed', {
  service: 'haircut',
  price: 50,
  barber: 'ahmed',
});
```

### Funnel Tracking

```typescript
// Booking funnel
trackEvent('funnel_step', { step: 1, name: 'service_selected' });
trackEvent('funnel_step', { step: 2, name: 'time_selected' });
trackEvent('funnel_step', { step: 3, name: 'details_filled' });
trackEvent('funnel_conversion', { funnel: 'booking', value: 50 });
```

### Key Events to Track

| Event | Properties | Purpose |
|-------|-----------|---------|
| page_view | path, referrer | Traffic analysis |
| signup | method, source | Growth metrics |
| booking_started | service | Funnel entry |
| booking_completed | service, price | Conversion |
| payment_completed | amount, method | Revenue |

## Best Practices

- Define event taxonomy before implementation
- Track meaningful business events
- Include context (user, session, device)
- Respect user privacy (GDPR compliance)
- Use consistent naming conventions
- Document all tracked events
- Review analytics regularly

## Anti-Patterns

- Tracking everything (noise)
- Not tracking critical user journeys
- Including PII in events
- Not documenting events
- Ignoring analytics data
