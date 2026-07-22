# Security Refactoring: Before / After

## Before (Anti-pattern)

```ts
const API_KEY = "your-api-key-here";

export async function searchUsers(query: string, limit: number) {
  // SQL injection via string interpolation
  const result = await fetch(
    `https://api.supabase.co/rest/v1/profiles?full_name=ilike.*${query}*&apikey=${API_KEY}`
  );
  // XSS: unsanitized user content rendered directly
  return data.map((user: any) => `<h3>${user.full_name}</h3>`);
}
```

**Problems:**
- Hardcoded API key in source code
- Query parameter not sanitized — injection possible
- User content rendered without escaping — XSS
- No input validation — any value accepted

## After (Preferred)

```ts
const SearchSchema = z.object({
  query: z.string().min(1).max(200).trim(),
  limit: z.number().int().min(1).max(50).default(10),
});

export async function searchUsers(input: unknown) {
  const validated = SearchSchema.parse(input);  // Validate at boundary
  const { data } = await supabase               // Parameterized query
    .from("profiles")
    .ilike("full_name", `%${validated.query}%`)
    .limit(validated.limit);

  return data.map((row) => ({
    name: sanitizeOutput(row.full_name),          // Escape output
  }));
}
```

**Improvements:**
1. **Zod validation** — rejects malformed input at boundary
2. **Parameterized queries** — Supabase client handles escaping
3. **Output sanitization** — prevents stored XSS
4. **Environment variables** — secrets never in source
5. **Input length limits** — prevents DoS via large payloads
