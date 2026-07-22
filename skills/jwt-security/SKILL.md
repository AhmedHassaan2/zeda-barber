---
name: jwt-security
description: JWT token generation, validation, refresh strategies, and security best practices with implementation examples
category: security
level: concept
priority: high
dependencies: []
related_skills: ["authentication-patterns", "environment-secrets"]
related_agents: ["security", "backend"]
activation_rules:
  - keywords: ["JWT", "token", "bearer", "refresh", "access token", "session"]
---

# JWT Security

## Purpose

Guide JWT token management with practical implementation, validation, refresh strategies, and security hardening.

## When to Use

- Implementing JWT-based authentication
- Validating tokens in middleware
- Setting up token refresh flows
- Auditing token security

## Core Concepts

### Token Structure

```typescript
// Access token payload (keep minimal)
interface AccessTokenPayload {
  sub: string;          // User ID (subject)
  role: string;         // User role
  iat: number;          // Issued at (unix timestamp)
  exp: number;          // Expiration (unix timestamp)
  iss: string;          // Issuer (your app)
  aud: string;          // Audience (your app)
}

// NEVER include in JWT payload:
// - Email addresses (PII)
// - Passwords or hashes
// - Full user profiles
// - API keys
```

### Token Lifecycle

```
User Login → Issue Access Token (15min) + Refresh Token (7 days)
    ↓
API Request → Validate Access Token → Process Request
    ↓
Token Expired → Use Refresh Token → Get New Access Token
    ↓
Refresh Expired → Re-login Required
```

### JWT Validation (Using jose Library)

```typescript
// src/lib/jwt.ts
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('zeda-barbershop')
    .setAudience('zeda-barbershop')
    .setExpirationTime('15m')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: 'zeda-barbershop',
      audience: 'zeda-barbershop',
    });
    return payload;
  } catch (error) {
    // Token invalid, expired, or tampered
    return null;
  }
}
```

### Refresh Token Flow

```typescript
// Server-side refresh endpoint
export async function POST(request: Request) {
  const { refreshToken } = await request.json();

  // 1. Verify refresh token
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }

  // 2. Check if refresh token is revoked
  const isRevoked = await isRefreshTokenRevoked(payload.jti);
  if (isRevoked) {
    return NextResponse.json({ error: 'Token revoked' }, { status: 401 });
  }

  // 3. Rotate: revoke old, issue new
  await revokeRefreshToken(payload.jti);
  const newAccessToken = await signToken({ sub: payload.sub, role: payload.role });
  const newRefreshToken = await issueRefreshToken(payload.sub);

  return NextResponse.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
}
```

### Token Storage

```typescript
// BEST: httpOnly cookie (server sets)
Set-Cookie: refresh_token=xxx; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800

// Server-side: Access token in memory only
// Client-side: Access token in memory (variable, not localStorage)

// NEVER:
// localStorage.setItem('token', xxx)     // XSS vulnerable
// sessionStorage.setItem('token', xxx)   // XSS vulnerable
// URL parameters                          // Logged in server access logs
```

### Middleware Validation (Next.js)

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Add user info to headers for downstream use
  const response = NextResponse.next();
  response.headers.set('x-user-id', payload.sub as string);
  response.headers.set('x-user-role', payload.role as string);
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/protected/:path*'],
};
```

### Algorithm Selection

| Algorithm | Type | Use Case |
|-----------|------|----------|
| HS256 | Symmetric (shared secret) | Single-server, simple setup |
| RS256 | Asymmetric (public/private) | Multi-server, microservices |
| ES256 | Asymmetric (elliptic curve) | Mobile, edge computing |

```typescript
// RS256 for production (recommended for distributed systems)
import { importPKCS8, importSPKI } from 'jose';

const privateKey = await importPKCS8(process.env.JWT_PRIVATE_KEY!, 'RS256');
const publicKey = await importSPKI(process.env.JWT_PUBLIC_KEY!, 'RS256');

// Sign with private key
const token = await new SignJWT(payload)
  .setProtectedHeader({ alg: 'RS256' })
  .sign(privateKey);

// Verify with public key (any server can verify)
const { payload } = await jwtVerify(token, publicKey);
```

## Best Practices

- Use `jose` library (not `jsonwebtoken` — it's unmaintained)
- Set short expiration for access tokens (15 min max)
- Store refresh tokens in httpOnly cookies
- Rotate refresh tokens on every use
- Revoke tokens on logout
- Validate issuer and audience
- Use RS256 for distributed systems
- Keep token payload minimal (sub, role, iat, exp)
- Log token operations for audit
- Implement token blacklist for immediate revocation

## Anti-Patterns

- Storing tokens in localStorage/sessionStorage (XSS vulnerable)
- Including PII in JWT payload (email, name, phone)
- Using HS256 in distributed systems (shared secret risk)
- Long-lived access tokens (> 15 min)
- Not validating token expiration
- Sending tokens in URLs (logged in server/access logs)
- Not revoking tokens on logout
- Using `jsonwebtoken` library (deprecated, security issues)
- Missing issuer/audience validation
- Not implementing token refresh flow
