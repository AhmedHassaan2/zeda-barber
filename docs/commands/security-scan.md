---
title: Security vulnerability assessment and OWASP Top 10 compliance check
description: Security vulnerability assessment and OWASP Top 10 compliance check
---

# `/security-scan`

<div class="tip custom-block" style="padding: 1rem;">
<strong>Command:</strong> <code>/security-scan</code> | <strong>Agent:</strong> <code>security</code>
</div>

# /security-scan — Security Scan

Perform security vulnerability assessment following OWASP Top 10 guidelines.

## Usage

```
/security-scan              # Full project security scan
/security-scan src/app/api/ # Scan API routes only
```

## Scan Areas

### 1. Authentication & Authorization
- Hardcoded credentials
- Weak password policies
- Missing rate limiting
- Session management issues
- JWT security

### 2. Input Validation
- SQL injection vectors
- XSS vulnerabilities
- CSRF protection
- File upload validation

### 3. Data Security
- Secrets in code
- Exposed API keys
- Sensitive data logging
- Encryption at rest/transit

### 4. Configuration
- Security headers
- CORS configuration
- Error handling (info leakage)
- Dependencies with known vulnerabilities

### 5. Infrastructure
- Docker security
- Environment variable handling
- Access control
- Audit logging

## Output Format

```
## Security Scan Report

### Critical Vulnerabilities
- [file:line] Description and remediation

### High Risk
- [file:line] Description and remediation

### Medium Risk
- [file:line] Description and remediation

### Low Risk
- [file:line] Description and remediation

### Recommendations
- Priority actions
```

## Execution

1. Scan for hardcoded secrets
2. Check authentication patterns
3. Verify input validation
4. Review API security
5. Check dependencies for vulnerabilities
6. Verify security headers
7. Generate security report

## Syntax

```
/security-scan [options] [arguments]
```

## Related Skills

See [Skills Registry](/skills/) for skills used during this command.

## Related Agents

See [Agents Registry](/agents/) for the agent that executes this command.
