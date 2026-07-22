# Authentication Patterns — Knowledge Base

## Purpose

Authentication is the process of verifying who a user is. This knowledge base covers authentication strategies, implementation patterns, and security considerations for modern web applications built with Next.js and Supabase. Choosing the right auth strategy impacts security, user experience, and development velocity.

## Core Concepts

### Authentication vs Authorization

**Authentication (AuthN)** answers "Who are you?" — verifying identity through credentials, tokens, or biometrics.
**Authorization (AuthZ)** answers "What can you do?" — determining permissions after identity is established.

These are separate concerns; authentication always precedes authorization.

### Token-Based Authentication (JWT)

JSON Web Tokens encode user claims in a signed, tamper-proof token. JWTs contain three parts: header (algorithm), payload (claims), and signature.

**JWT lifecycle:**
1. User authenticates with credentials
2. Server validates credentials and issues JWT
3. Client stores JWT (typically in httpOnly cookie)
4. Client sends JWT with each request
5. Server verifies signature and extracts claims
6. Token expires; client uses refresh token to obtain new JWT

**Key claims:** `sub` (subject/user ID), `exp` (expiration), `iat` (issued at), `iss` (issuer), `aud` (audience)

### Session-Based Authentication

Server maintains session state; client holds only a session identifier (usually in a cookie).

**Advantages:** Server can revoke sessions instantly, smaller client payload, no client-side token storage concerns.
**Disadvantages:** Requires server-side storage, doesn't scale easily without distributed session store (Redis).

### OAuth 2.0 and OpenID Connect

**OAuth 2.0** is an authorization framework that enables third-party applications to obtain limited access to a service.
**OpenID Connect (OIDC)** is an identity layer built on top of OAuth 2.0 that provides authentication.

**OAuth 2.0 flows:**
- **Authorization Code Flow** — Server-side apps (most secure; PKCE required for SPAs)
- **Client Credentials Flow** — Machine-to-machine (no user involved)
- **Implicit Flow** — Deprecated for security reasons; avoid
- **Device Authorization Flow** — Smart TVs, CLI tools

**OIDC adds:** ID tokens (JWT), userinfo endpoint, standard scopes (`openid`, `profile`, `email`)

### Password Hashing

Never store plaintext passwords. Use purpose-built password hashing algorithms:

- **Argon2id** (recommended) — Winner of the Password Hashing Competition; memory-hard, GPU-resistant
- **bcrypt** — Battle-tested, adaptive; use cost factor ≥12
- **scrypt** — Memory-hard alternative; less widely adopted than Argon2

**Key principles:**
- Generate unique salt per password (bcrypt does this automatically)
- Use adaptive cost factors that make hashing slow enough to resist brute force
- Never implement your own hashing; use established libraries

### Multi-Factor Authentication (MFA)

MFA requires two or more verification factors: something you know (password), something you have (phone/key), something you are (biometrics).

**Common methods:** TOTP (Time-based One-Time Password), SMS codes (weaker), hardware keys (WebAuthn/FIDO2), biometrics, backup codes

### Magic Links (Passwordless)

User provides email → receives a unique, time-limited link → clicks link → authenticated. This eliminates passwords entirely.

**Security considerations:** Rate-limit email sending, short token expiry (5-10 minutes), single-use tokens, secure token generation (CSPRNG)

## Best Practices

1. **Use httpOnly, Secure, SameSite cookies for tokens** — Prevents XSS access to tokens and provides CSRF protection; avoid localStorage for auth tokens
2. **Implement refresh token rotation** — Issue short-lived access tokens (15min) with longer-lived refresh tokens; rotate refresh tokens on each use
3. **Enforce strong password requirements** — Follow NIST 800-63b: minimum 8 characters, check against breached password databases, no composition rules that reduce usability
4. **Rate-limit authentication attempts** — Implement progressive delays after failed attempts; lock accounts after repeated failures with unlock mechanism
5. **Validate tokens on every request** — Never trust client assertions; verify JWT signature, expiration, issuer, and audience on each API call
6. **Use Supabase Auth helpers for Next.js** — `@supabase/ssr` provides proper cookie-based session management; avoid manually managing tokens
7. **Implement account recovery securely** — Password reset links should be single-use, time-limited, and sent only to verified email addresses
8. **Log authentication events** — Record login, logout, password changes, and MFA events for audit trails and security monitoring

## Anti-Patterns

1. **Storing JWT in localStorage** — Accessible to any XSS attack; use httpOnly cookies instead which JavaScript cannot access
2. **Using long-lived access tokens** — Tokens without expiry windows cannot be revoked; use short expiry (15min) with refresh rotation
3. **Comparing passwords with `===`** — Always use constant-time comparison functions to prevent timing attacks on password verification
4. **Sending passwords in URL query parameters** — Query parameters are logged in server logs, browser history, and referrer headers; always use POST body
5. **Client-side token validation only** — Client validation improves UX but provides no security; server must always validate independently
6. **Reusing session tokens across environments** — Development, staging, and production must use separate secrets and token issuers
7. **Missing CSRF protection** — State-changing requests via cookies need CSRF tokens or SameSite=Strict cookie attribute
8. **Hardcoded authentication secrets** — JWT signing keys, OAuth client secrets, and API keys must be in environment variables, never in code

## Common Mistakes

1. **Not using HTTPS in development** — Auth cookies without Secure flag are sent over HTTP; always use HTTPS even locally with self-signed certs
2. **Forgetting to invalidate server-side sessions on logout** — Clearing client cookies is not sufficient; server must mark session as invalid
3. **Over-permissioning service role keys** — `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS; only use for specific server-side operations that require it
4. **Not handling token refresh failures gracefully** — When refresh tokens expire, redirect to login without showing cryptic errors
5. **Exposing user IDs in URLs** — Auto-incrementing IDs in URLs leak information; use UUIDs for public-facing identifiers
6. **Relying solely on client-side authentication checks** — UI hiding elements is not authorization; API routes must enforce access control
7. **Not implementing proper session timeout** — Both idle timeout and absolute timeout should be configured; re-authenticate for sensitive operations
8. **Using weak random for token generation** — Always use `crypto.randomUUID()` or equivalent CSPRNG; never use `Math.random()`

## Decision Guidelines

| Scenario | Recommended Approach |
|---|---|
| SaaS application | Supabase Auth + OAuth providers (Google, GitHub) |
| Internal admin tool | Simple JWT with role-based access, no MFA required |
| Financial/healthcare app | Password + MFA (WebAuthn preferred), short token expiry |
| Mobile-first app | Supabase Auth with PKCE flow, biometric login |
| API-only backend | OAuth 2.0 Client Credentials or API key authentication |
| Quick prototype | Magic link authentication (fastest to implement) |
| Multi-tenant SaaS | Supabase Auth + RLS policies per organization |

## References

- Supabase Auth Documentation: https://supabase.com/docs/guides/auth
- NextAuth.js Documentation: https://next-auth.js.org/
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- NIST SP 800-63b (Digital Identity Guidelines): https://pages.nist.gov/800-63-3/sp800-63b.html
- RFC 7519 (JWT): https://datatracker.ietf.org/doc/html/rfc7519
- RFC 6749 (OAuth 2.0): https://datatracker.ietf.org/doc/html/rfc6749

## Practical Notes

- **Supabase Auth setup:** Initialize with `createBrowserClient` and `createServerClient` from `@supabase/ssr` for proper cookie handling in Next.js App Router
- **NextAuth.js alternative:** If not using Supabase, NextAuth.js v5 provides built-in OAuth, CSRF protection, and session management
- **Development testing:** Use Supabase CLI to run auth locally; test password flows, OAuth redirects, and MFA enrollment
- **Migration strategy:** When switching auth providers, support both old and new auth simultaneously during transition period
- **Monitoring:** Set up alerts for abnormal login patterns: multiple failed attempts, logins from unusual locations, bulk account creation
