# Auth Pattern Refactoring: Before / After

## Before (Anti-pattern)

```ts
// Client-side token in localStorage
localStorage.setItem("auth_token", token);

// JWT decoded without signature verification
const payload = JSON.parse(atob(token.split(".")[1]));

// Client-side only auth check
function isAuthenticated() {
  return !!localStorage.getItem("auth_token");
}
```

**Problems:**
- `localStorage` readable by any XSS attack
- JWT decoded client-side — signature never verified
- No httpOnly cookies — tokens exposed to JavaScript
- No server-side validation — forged requests pass through
- No session refresh — users logged out unexpectedly

## After (Preferred)

```ts
// Server-side session validation
async function requireAuth() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}

// httpOnly cookies managed by Supabase client
// Server validates every request
// Auto-refresh before expiry
```

**Improvements:**
1. **httpOnly cookies** — JavaScript can't access tokens
2. **Server-side validation** — every API route checks auth
3. **Signature verification** — JWT validated by Supabase SDK
4. **Auto-refresh** — sessions extended before expiry
5. **Centralized `requireAuth()`** — consistent guard pattern
