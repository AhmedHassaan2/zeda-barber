# OWASP Top 10 2021 — Security Knowledge

## Purpose

The OWASP Top 10 is the standard awareness document for web application security. It represents a broad consensus about the most critical security risks to applications. This knowledge base provides practical guidance for identifying, preventing, and mitigating these vulnerabilities in modern TypeScript/Next.js applications.

## Core Concepts

### A01:2021 — Broken Access Control

Access control enforces policy such that users cannot act outside their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of data.

**Key principles:**
- Deny by default — require explicit grants for every resource
- Implement access control mechanisms once and reuse across the application
- Model access controls should enforce record ownership (users can only access their own data)
- Disable web server directory listing and ensure metadata are not in web roots

### A02:2021 — Cryptographic Failures

Formerly "Sensitive Data Exposure." Focuses on failures related to cryptography that lead to exposure of sensitive data.

**Key areas:**
- Classify data processed and identify which is sensitive
- Don't store sensitive data unnecessarily; discard it as soon as possible
- Encrypt all sensitive data at rest using AES-256-GCM or ChaCha20
- Encrypt data in transit with TLS 1.3 (minimum TLS 1.2)
- Use strong, industry-standard algorithms (AES-GCM, not ECB mode)
- Use proper key management — rotate keys regularly, never commit keys

### A03:2021 — Injection

Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query. SQL, NoSQL, OS command, ORM, LDAP, and Expression Language injections are all possible.

**Prevention:**
- Use parameterized queries (Supabase client handles this)
- Use ORMs with parameterized query builders (Prisma, Drizzle)
- Validate and sanitize all user input server-side
- Escape special characters in output contexts
- Limit query results to prevent mass data disclosure

### A04:2021 — Insecure Design

Focuses on risks related to design and architectural flaws. Calls for more use of threat modeling, secure design patterns, and reference architectures.

**Approach:**
- Establish and use a secure development lifecycle
- Integrate security language and controls into user stories
- Integrate plausibility checks at each tier of your application
- Write integration tests that validate all critical flows
- Segment application layers and tiers on the system and network

### A05:2021 — Security Misconfiguration

Missing appropriate security hardening across any part of the application stack, improperly configured permissions, or unnecessary features enabled.

**Common issues:**
- Missing appropriate security hardening
- Improperly configured permissions on cloud services
- Unnecessary features enabled (ports, services, privileges, accounts)
- Default accounts and passwords still enabled
- Error handling reveals stack traces or overly informative error messages
- Security settings in application frameworks not configured to secure values

### A06:2021 — Vulnerable and Outdated Components

Using components with known vulnerabilities is a widespread issue. This includes unsupported, outdated, or end-of-life software.

**Prevention:**
- Remove unused dependencies, features, files, and documentation
- Continuously inventory component versions (use `npm audit`, Dependabot)
- Monitor CVE and NVD for vulnerabilities in components
- Only obtain components from official sources over secure links
- Monitor for unmaintained libraries or SaaS dependency

### A07:2021 — Identification and Authentication Failures

Confirmation of the user's identity, authentication, and session management is critical to protect against authentication-related attacks.

**Best practices:**
- Implement multi-factor authentication to prevent credential stuffing
- Do not ship with default credentials (admin/admin)
- Implement weak password checks (NIST 800-63b guidelines)
- Limit failed login attempts with account lockout
- Use a server-side, secure session manager with high-entropy random session ID

### A08:2021 — Software and Data Integrity Failures

Relates to code and infrastructure that does not protect against integrity violations, insecure CI/CD pipelines, and auto-update without sufficient integrity verification.

**Key areas:**
- Use digital signatures to verify software/data integrity
- Ensure libraries and dependencies are consumed from trusted repositories
- Use a software supply chain security tool (OWASP Dependency-Check, Snyk)
- Ensure CI/CD pipeline has proper segregation and configuration
- Review code and configuration changes with proper segregation

### A09:2021 — Security Logging and Monitoring Failures

Without sufficient logging and monitoring, breaches cannot be detected. Insufficient logging, detection, monitoring, and active response occurs at the most basic level.

**Requirements:**
- Log all login attempts, access control failures, and input validation failures
- Use a format suitable for log management solutions (structured JSON)
- Ensure high-value transactions have an audit trail
- Establish effective monitoring and alerting
- Establish an incident response and recovery plan

### A10:2021 — Server-Side Request Forgery (SSRF)

SSRF flaws occur when a web application fetches a remote resource without validating the user-supplied URL.

**Prevention:**
- Sanitize and validate all client-supplied input data
- Enforce the URL schema, port, and destination with a positive allow list
- Do not send raw responses to clients
- Disable HTTP redirections
- Segment remote resource access functionality in separate networks

## Best Practices

1. **Validate all input server-side** — Never trust client-side validation alone; always revalidate on the server regardless of frontend checks
2. **Use parameterized queries exclusively** — Supabase client and Prisma both use parameterized queries; never concatenate user input into SQL strings
3. **Implement Content Security Policy** — Add CSP headers to prevent XSS by restricting which resources can be loaded and from where
4. **Apply least privilege principle** — Every user, service, and process should have minimum required permissions; use Supabase RLS for row-level security
5. **Encrypt sensitive data at rest and in transit** — Use AES-256-GCM for data at rest and TLS 1.3 for data in transit; rotate encryption keys periodically
6. **Log security events** — Record authentication attempts, access control failures, and data modification events in structured JSON format
7. **Keep dependencies updated** — Run `npm audit` weekly, use Dependabot or Renovate for automated dependency updates
8. **Conduct regular security reviews** — Perform threat modeling for new features, code reviews with security focus, and periodic penetration testing

## Anti-Patterns

1. **Storing secrets in source code** — Never commit API keys, passwords, or connection strings to Git; use environment variables and a `.env.local` file (gitignored)
2. **Trusting client-side validation** — Frontend validation improves UX but provides zero security; all validation rules must be enforced server-side
3. **Returning detailed error messages to clients** — Stack traces, database errors, and internal paths leak implementation details; return generic error messages
4. **Using MD5 or SHA1 for password hashing** — These are not designed for password storage; use bcrypt, scrypt, or Argon2id with appropriate cost factors
5. **Disabling CORS entirely** — Setting `Access-Control-Allow-Origin: *` without credentials is permissive; use explicit origin allow lists
6. **Skipping HTTPS** — Always use HTTPS in production; HTTP allows man-in-the-middle attacks and session hijacking
7. **Hardcoding role checks in components** — Authorization logic scattered across components is inconsistent and error-prone; centralize in middleware or API layer
8. **Ignoring npm audit warnings** — Treat `npm audit` findings as actionable issues; vulnerabilities in dependencies become vulnerabilities in your application

## Common Mistakes

1. **Exposing Supabase service role key to the client** — `SUPABASE_SERVICE_ROLE_KEY` must never be in `NEXT_PUBLIC_` variables; it bypasses RLS and should only be used server-side
2. **Missing CSRF protection on state-changing routes** — Next.js App Router API routes should validate CSRF tokens or use SameSite cookie attributes
3. **Leaking API keys through client bundles** — Any key in a `NEXT_PUBLIC_` variable is embedded in the JavaScript bundle; use server-side API routes for sensitive operations
4. **Using overly permissive RLS policies** — A policy like `true` allows all operations; always scope to `auth.uid()` or specific roles
5. **Not validating JWT tokens properly** — Verify token signatures, check expiration, and validate issuer/audience claims on every protected route
6. **Forgetting to sanitize HTML output** — Rich text from users must be sanitized before rendering to prevent stored XSS attacks
7. **Exposing internal IDs unnecessarily** — Auto-incrementing database IDs leak information; consider using UUIDs for public-facing identifiers
8. **Running application as root** — Never run production services as root; use a non-privileged user in Docker containers

## Decision Guidelines

| Scenario | Decision |
|---|---|
| User input reaches database | Always use parameterized queries or ORM |
| Storing user passwords | Use Argon2id (preferred) or bcrypt with cost ≥12 |
| API authentication | JWT with short expiry + refresh tokens, or session cookies |
| Multi-tenant data access | Implement Supabase RLS policies per tenant |
| File uploads | Validate file type, size, scan for malware, store outside web root |
| Third-party API keys | Store in environment variables, rotate quarterly |
| Sensitive data in logs | Never log PII, tokens, or passwords; mask sensitive fields |
| Error handling | Catch all errors, log internally, return generic message to client |

## References

- OWASP Top 10 2021: https://owasp.org/Top10/
- OWASP Application Security Verification Standard (ASVS): https://owasp.org/www-project-application-security-verification-standard/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework
- PortSwigger Web Security Academy: https://portswigger.net/web-security

## Practical Notes

- **Next.js specific:** Use `middleware.ts` for authentication checks at the edge before routes are served
- **Supabase specific:** Enable RLS on every table; create policies using `auth.uid()` and `auth.jwt()` functions
- **Deployment:** Vercel automatically provides HTTPS; ensure security headers are configured in `next.config.js`
- **CI/CD:** Add `npm audit --audit-level=high` to pipeline; block deployment on high-severity findings
- **Incident response:** Have a documented process for security incidents including who to notify and how to contain breaches
