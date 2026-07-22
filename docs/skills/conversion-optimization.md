---
title: Conversion rate optimization, A/B testing, UX patterns, and growth strategies
description: Conversion rate optimization, A/B testing, UX patterns, and growth strategies
---

# Conversion rate optimization, A/B testing, UX patterns, and growth strategies

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>conversion-optimization</code> | <strong>Category:</strong> analytics | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

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
