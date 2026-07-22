---
title: Security Audit Workflow
description: Comprehensive security audit using workspace tools
---

# Security Audit Workflow

## Overview

A systematic approach to security auditing using the workspace's security tools.

## Step 1: Initial Security Scan

```
@security Perform a comprehensive security audit of the codebase
```

## Step 2: OWASP Top 10 Check

```
@skill: owasp-top-10
@security Check the codebase against OWASP Top 10 vulnerabilities
```

## Step 3: Authentication Review

```
@skill: authentication-patterns
@skill: jwt-security
@security Review authentication implementation for vulnerabilities
```

## Step 4: Input Validation

```
@skill: input-validation
@security Check all user input boundaries for injection vulnerabilities
```

## Step 5: Secrets Audit

```
@skill: environment-secrets
@security Scan for hardcoded secrets, API keys, and credentials
```

## Step 6: Automated Scan

```bash
/security-scan
```

## Step 7: Security Review Playbook

```
@playbook: security-review
```

## Step 8: Document Findings

Create an ADR for any critical findings:

```markdown
## ADR: [Security Finding Title]

### Status
Accepted

### Context
[Description of the vulnerability]

### Decision
[How it was fixed]

### Consequences
[Impact of the fix]
```

::: warning
Never commit secrets to source control. Always use environment variables.
:::
