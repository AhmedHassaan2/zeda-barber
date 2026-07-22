---
title: OWASP Top 10 security risks, mitigations, and security review checklist
description: OWASP Top 10 security risks, mitigations, and security review checklist
---

# OWASP Top 10 security risks, mitigations, and security review checklist

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>owasp-top-10</code> | <strong>Category:</strong> security | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# OWASP Top 10

## Purpose

Guide mitigation of OWASP Top 10 security risks.

## When to Use

- Security reviews
- Threat modeling
- Vulnerability assessments
- Security training

## Core Concepts

### OWASP Top 10 (2021)

| Risk | Description | Mitigation |
|------|-------------|------------|
| A01 | Broken Access Control | RLS, authorization checks |
| A02 | Cryptographic Failures | Use TLS, encrypt sensitive data |
| A03 | Injection | Input validation, parameterized queries |
| A04 | Insecure Design | Threat modeling, security patterns |
| A05 | Security Misconfiguration | Hardening, least privilege |
| A06 | Vulnerable Components | Regular dependency updates |
| A07 | Auth Failures | Strong passwords, MFA, rate limiting |
| A08 | Data Integrity Failures | Signed updates, code review |
| A09 | Logging Failures | Comprehensive audit logging |
| A10 | SSRF | Validate URLs, allowlist domains |

### Common Mitigations

```typescript
// A01: Broken Access Control
const { data } = await supabase
  .from('orders')
  .select('*')
  .eq('user_id', currentUser.id); // RLS + explicit filter

// A03: Injection
// Always use parameterized queries
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userInput); // Supabase handles parameterization

// A07: Auth Failures
// Implement rate limiting on login
// Use strong password requirements
// Implement account lockout
```

## Best Practices

- Apply principle of least privilege
- Validate all input at boundaries
- Use parameterized queries
- Implement comprehensive logging
- Keep dependencies updated
- Use security headers
- Conduct regular security reviews

## Anti-Patterns

- Trusting client-side validation
- Exposing internal errors to users
- Using weak cryptographic algorithms
- Not logging security events
- Hardcoding credentials

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
