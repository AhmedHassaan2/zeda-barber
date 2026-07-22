---
title: Product analytics implementation, event tracking, funnel analysis, and user behavior insights
description: Product analytics implementation, event tracking, funnel analysis, and user behavior insights
---

# Product analytics implementation, event tracking, funnel analysis, and user behavior insights

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>product-analytics</code> | <strong>Category:</strong> analytics | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

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
