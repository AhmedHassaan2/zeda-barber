---
name: conversion-optimization
description: Conversion rate optimization, A/B testing, UX patterns, and growth strategies
category: analytics
level: concept
priority: medium
dependencies: ["product-analytics"]
related_skills: ["product-analytics", "form-engineering"]
related_agents: ["frontend"]
activation_rules:
  - keywords: ["conversion", "CRO", "A/B test", "growth", "optimization"]
---

# Conversion Optimization

## Purpose

Guide conversion rate optimization for key business metrics.

## When to Use

- Optimizing booking flows
- Improving signup rates
- Reducing cart abandonment
- Testing UI variations

## Core Concepts

### A/B Testing Framework

```typescript
// Simple A/B test hook
function useABTest(testName: string, variants: string[]): string {
  const [variant, setVariant] = useState<string>(() => {
    const stored = localStorage.getItem(`ab_${testName}`);
    if (stored) return stored;
    const random = variants[Math.floor(Math.random() * variants.length)];
    localStorage.setItem(`ab_${testName}`, random);
    return random;
  });

  useEffect(() => {
    trackEvent('ab_test_exposure', { test: testName, variant });
  }, [testName, variant]);

  return variant;
}
```

### Conversion Funnel Optimization

```
Awareness → Interest → Consideration → Action → Retention
    ↓           ↓            ↓           ↓          ↓
  Traffic    Engagement   Selection   Checkout  Follow-up
```

### Key Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Conversion Rate | (Conversions / Visitors) × 100 | > 2% |
| Bounce Rate | Single-page sessions / Total sessions | < 40% |
| Cart Abandonment | Abandoned carts / Started checkouts | < 70% |
| Booking Completion | Completed / Started bookings | > 60% |

## Best Practices

- Test one variable at a time
- Run tests for statistical significance
- Focus on high-impact pages first
- Use clear, actionable copy
- Reduce friction in checkout flows
- Add social proof and trust signals
- Optimize mobile experience first

## Anti-Patterns

- Changing multiple variables
- Stopping tests too early
- Ignoring mobile experience
- Not tracking test results
- Copying competitors without testing
