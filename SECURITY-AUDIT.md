# Security Audit Report — ZEDA Barber Shop

**Date**: 2026-07-21
**Scope**: Full application (Next.js 16, Supabase, Vercel)

---

## Critical

### S-01: Hardcoded Admin Credentials in Source Code
**File**: `src/app/api/admin/login/route.ts:3-4`
```typescript
const ADMIN_USER = "zeda";
const ADMIN_PASS = "zeda2026";
```
**Risk**: Credentials are hardcoded in plaintext. Anyone with repo access or who can read the built JS bundle can see them.
**Fix**: Move to environment variables (`process.env.ADMIN_USER`, `process.env.ADMIN_PASS`).

### S-02: Static, Non-Expiring Auth Token
**File**: `src/app/api/admin/login/route.ts:7`
```typescript
return NextResponse.json({ success: true, token: "zeda_admin_auth" });
```
**File**: `src/app/admin/login/page.tsx:25`
```typescript
localStorage.setItem("admin_token", data.token);
```
**Risk**: Token is a static string `zeda_admin_auth`. Never expires. Stored in `localStorage` (XSS-vulnerable). Any code that can read localStorage can access admin.
**Fix**: Generate a real JWT or crypto-random token with expiry.

### S-03: Missing Route Protection (No Middleware)
**Risk**: `/admin/dashboard`, `/api/admin/upload`, `/api/admin/videos` have NO server-side auth check. The dashboard checks token client-side only (can be bypassed).
**Fix**: Add Next.js Middleware (`middleware.ts`) to protect `/admin/*` and `/api/admin/*` routes server-side.

---

## High

### S-04: No Server-Side Auth on Admin API Routes
**Files**: `src/app/api/admin/upload/route.ts`, `src/app/api/admin/videos/route.ts`
**Risk**: Upload and video management APIs accept requests without any authentication token validation. Anyone who knows the endpoint can upload or delete content.
**Fix**: Add token verification header check on every admin API route.

### S-05: Service Role Key Exposure Risk
**File**: `src/lib/supabase.ts:10`
```typescript
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
```
**Risk**: Although the key is server-side only (env var), any server-side code that uses `supabaseAdmin` can perform privileged operations. If an API route accidentally leaks or is misused, the entire DB is at risk. The `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` is also client-exposed.
**Fix**: Ensure `supabaseAdmin` is never imported in client components. Audit every route that uses it. Enable Supabase RLS on all tables.

### S-06: No Input Validation on Upload
**File**: `src/app/api/admin/upload/route.ts:13-18`
```typescript
const file = formData.get("file") as File | null;
if (!file) { return error; }
const ext = file.name.split(".").pop() ?? "jpg";
const filename = `${Date.now()}.${ext}`;
```
**Risk**: No file type validation (only checks extension). No file size limit. No content-type verification. No malware scanning. No MIME type check.
**Fix**: Validate MIME type, check magic bytes, enforce size limit (e.g., 10MB), whitelist allowed extensions.

### S-07: No SQL-Level RLS on Supabase Tables
**Risk**: The `videos` table and `gallery` bucket rely on `supabaseAdmin` service key inserts. If RLS is not configured, anyone with the anon key could potentially access or modify data.
**Fix**: Enable RLS on all Supabase tables. Set appropriate policies.

---

## Medium

### S-08: No Rate Limiting on Login
**File**: `src/app/api/admin/login/route.ts`
**Risk**: No rate limiting. Brute-force attack possible on admin login.
**Fix**: Rate limit login attempts (e.g., 5 attempts/minute/IP).

### S-09: .env.local Contains Live Keys
**File**: `.env.local`
**Risk**: Live Supabase keys are in `.env.local`. If this file leaks (it's gitignored but present on disk), keys are exposed.
**Fix**: Ensure all team members rotate keys if any exposure occurs. Consider using Vercel Environment Variables exclusively.

### S-10: No CSRF Protection
**Risk**: All admin API endpoints accept POST/DELETE without CSRF tokens.
**Fix**: Add CSRF protection or validate `Origin`/`Referer` headers.

### S-11: No HTTPS Enforcement Config
**Risk**: Although Vercel enforces HTTPS, there is no explicit security header configuration.
**Fix**: Add security headers via `next.config.ts` or `vercel.json`.

### S-12: Weak Password Policy
**Risk**: Admin password `zeda2026` is weak (common word + year).
**Fix**: Enforce minimum 12 chars with mixed case, numbers, symbols.

### S-13: No Account Lockout
**Risk**: Unlimited login attempts with no lockout mechanism.
**Fix**: Lock account after 5 failed attempts for 15 minutes.

### S-14: File Upload — No Filename Sanitization
**File**: `src/app/api/admin/upload/route.ts:16`
**Risk**: Filename is generated from `Date.now()` so no path traversal risk, but no validation on original filename before extraction.
**Fix**: Sanitize all file-derived strings.

---

## Low

### S-15: Missing Security Headers
**Risk**: No `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` headers configured.
**Fix**: Add headers via `next.config.ts` or `middleware.ts`.

### S-16: Supabase Key in Client Bundle
**Risk**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` is available in all client JS bundles.
**Fix**: This is expected for Supabase anon key, but ensure it's a restricted key with minimal permissions.

### S-17: No Request Logging
**Risk**: Failed login attempts and API errors are not logged centrally.
**Fix**: Add structured logging for auth failures and API errors.

### S-18: Contact Form Missing
**Risk**: The site has a contact page but no form — only a static map and phone. No way to submit messages securely.
**Fix**: Consider adding a serverless contact form (not critical).

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 3 |
| High     | 4 |
| Medium   | 7 |
| Low      | 4 |
| **Total**| **18** |

**Top 3 Priorities**:
1. Move credentials to env vars + generate real auth tokens (S-01, S-02)
2. Add middleware for route protection (S-03)
3. Add server-side auth to admin API routes (S-04)
