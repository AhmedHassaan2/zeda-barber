# Playbook: Security Review

**Goal:** Identify and remediate security vulnerabilities across the full stack.

**Trigger:** Security audit request, new auth implementation, pre-deployment check, vulnerability report.

**Inputs:**
- Files or area to review
- Authentication mechanism used
- Data sensitivity level
- Compliance requirements (if any)

**Outputs:**
- Security assessment report
- Vulnerabilities identified with severity
- Remediations applied
- Security guidelines updated

---

## Required Agents

| Agent | Role |
|-------|------|
| `security` | Primary auditor — vulnerability assessment, OWASP |
| `backend` | Server-side security — auth, input validation |
| `database` | Data security — RLS, encryption, access control |
| `reviewer` | Verify security fixes |
| `architect` | Security architecture review |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `security-audit` | Always — full security assessment |
| `authentication-patterns` | Auth implementation review |
| `environment-secrets` | Secrets management review |
| `owasp-top-10` | OWASP vulnerability checklist |
| `api-security` | API-specific security |
| `database-security` | Database access control |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/security-scan` | Always — full security scan |
| `/review` | After remediation — verify fixes |

---

## Process

### Step 1: Scope (5 min)

1. **Define review area** — Which files, routes, or systems?
2. **Identify attack surface** — What's exposed to users?
3. **Classify data** — What sensitivity level?
4. **Check known issues** — Previous findings, CVEs

### Step 2: Scan (20 min)

**OWASP Top 10 checklist:**

1. **Injection** — SQL, NoSQL, OS command injection
   - Check: User input in queries, commands, template literals
   - Fix: Parameterized queries, input validation

2. **Broken Authentication** — Weak auth mechanisms
   - Check: Password hashing, session management, MFA
   - Fix: bcrypt/argon2, secure sessions, MFA

3. **Sensitive Data Exposure** — Unprotected data
   - Check: HTTPS, encryption at rest, logging sensitive data
   - Fix: TLS, encryption, redact logs

4. **XML External Entities** — XXE injection
   - Check: XML parsing configuration
   - Fix: Disable external entities

5. **Broken Access Control** — Missing authorization
   - Check: Role checks, IDOR, privilege escalation
   - Fix: Server-side auth checks, RLS

6. **Security Misconfiguration** — Default configs
   - Check: Error messages, headers, CORS
   - Fix: Secure defaults, custom errors

7. **Cross-Site Scripting (XSS)** — Unescaped output
   - Check: User input in HTML, React dangerouslySetInnerHTML
   - Fix: Input validation, output encoding

8. **Insecure Deserialization** — Untrusted data
   - Check: Object parsing from user input
   - Fix: Validate, integrity checks

9. **Using Components with Known Vulnerabilities** — Outdated deps
   - Check: `npm audit`, outdated packages
   - Fix: Update, replace, patch

10. **Insufficient Logging** — Missing audit trail
    - Check: Auth events, errors, access attempts
    - Fix: Comprehensive logging

### Step 3: Test (10 min)

1. **Manual testing** — Try to exploit found vulnerabilities
2. **Input validation** — Inject malicious input
3. **Auth testing** — Try privilege escalation
4. **Session testing** — Cookie security, token validation

### Step 4: Remediate (varies)

1. **Critical/High** — Fix immediately
2. **Medium** — Fix before deployment
3. **Low** — Fix when convenient
4. **Document** — Why each fix is needed

### Step 5: Verify (10 min)

1. **Re-scan** — Confirm vulnerabilities are fixed
2. **Test fixes** — Verify remediation works
3. **Run `/security-scan`** — Automated verification
4. **Review fixes** — No new issues introduced

---

## Validation Steps

- [ ] All OWASP Top 10 categories checked
- [ ] Critical and high vulnerabilities fixed
- [ ] No hardcoded secrets
- [ ] Input validation at all boundaries
- [ ] Auth checks on all protected routes
- [ ] HTTPS enforced
- [ ] Sensitive data encrypted
- [ ] Errors don't leak information
- [ ] Logging covers security events

## Success Criteria

- No critical or high vulnerabilities remaining
- All findings documented with severity
- Remediations verified
- Security guidelines updated

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Client-side only auth | Trivially bypassed | Always validate server-side |
| Hardcoded secrets | Exposed in source control | Use environment variables |
| Generic error messages | Hides security issues | Log detailed, show generic |
| Trusting user input | Injection attacks | Validate and sanitize everything |
| Missing rate limiting | Brute force attacks | Add rate limiting to auth/APIs |
| Logging sensitive data | Data exposure in logs | Redact passwords, tokens, PII |
| Skipping `npm audit` | Known vulnerabilities | Run regularly, fix promptly |
