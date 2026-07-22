---
name: owasp-top-10
description: OWASP Top 10 security risks, mitigations, and security review checklist
category: security
level: concept
priority: high
dependencies: []
related_skills: ["security-audit", "input-validation", "authentication-patterns"]
related_agents: ["security"]
activation_rules:
  - keywords: ["OWASP", "security", "vulnerability", "XSS", "CSRF", "injection"]
---

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
