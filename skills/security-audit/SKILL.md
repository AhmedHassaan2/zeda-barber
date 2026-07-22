---
name: security-audit
description: Security audit checklist, vulnerability assessment, and penetration testing
category: security
level: concept
priority: high
dependencies: ["owasp-top-10"]
related_skills: ["owasp-top-10", "authentication-patterns", "input-validation"]
related_agents: ["security"]
activation_rules:
  - keywords: ["security audit", "vulnerability", "penetration test", "security review"]
---

# Security Audit

## Purpose

Guide security audit process for web applications.

## When to Use

- Pre-launch security review
- Regular security assessments
- Post-incident investigation
- Compliance requirements

## Core Concepts

### Security Audit Checklist

**Authentication**
- [ ] Strong password requirements
- [ ] Rate limiting on login attempts
- [ ] Account lockout after failures
- [ ] Secure session management
- [ ] Multi-factor authentication (optional)

**Authorization**
- [ ] Role-based access control
- [ ] Server-side permission checks
- [ ] RLS policies in Supabase
- [ ] API endpoint protection

**Input Validation**
- [ ] All inputs validated
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] File upload validation
- [ ] CSRF protection

**Data Security**
- [ ] Sensitive data encrypted
- [ ] HTTPS enforced
- [ ] Secrets not in code
- [ ] Environment variables secured
- [ ] Audit logging enabled

**Infrastructure**
- [ ] Dependencies updated
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Error messages don't leak info

### Automated Scanning

```bash
# Dependency scanning
npm audit

# Snyk security scan
npx snyk test

# OWASP ZAP scan
# Run against local/preview environment
```

## Best Practices

- Audit before every major release
- Automate security scanning in CI/CD
- Document findings and remediation
- Follow up on all critical findings
- Train team on security awareness
- Keep security documentation updated

## Anti-Patterns

- Skipping security audits
- Ignoring low-severity findings
- Not testing edge cases
- Missing regular dependency updates
- Not documenting security decisions
