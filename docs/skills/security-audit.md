---
title: Security audit checklist, vulnerability assessment, and penetration testing
description: Security audit checklist, vulnerability assessment, and penetration testing
---

# Security audit checklist, vulnerability assessment, and penetration testing

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>security-audit</code> | <strong>Category:</strong> security | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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
