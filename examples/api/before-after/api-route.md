# API Route Refactoring: Before / After

## Before (Anti-pattern)

```ts
export async function POST(request: NextRequest) {
  const body = await request.json();
  // No auth, no validation, hardcoded secret
  const result = await fetch(`https://api.internal.com/users?secret=${API_SECRET}`, { ... });
  if (!result.ok) {
    return NextResponse.json({ error: `Internal API failed: ${error}`, secret: API_SECRET });
  }
  return NextResponse.json(data);
}
```

**Problems:**
- Hardcoded API secret in source code
- No authentication — anyone can call it
- No input validation — arbitrary data accepted
- Secrets leaked in error responses
- No proper HTTP status codes (always 200 or 500)
- No structured response format

## After (Preferred)

```ts
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<unknown>>> {
  // 1. Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 401;

  // 2. Parse body safely
  const body = await request.json();

  // 3. Validate with Zod schema
  const parsed = CreateUserSchema.safeParse(body);
  if (!parsed.success) return 422;

  // 4. Database operation with error handling
  const { data, error } = await supabase.from("users").insert(parsed.data);
  if (error) return 500;

  // 5. Structured response
  return NextResponse.json({ data, error: null }, { status: 201 });
}
```

**Improvements:**
1. Auth check before any operation
2. Zod schema validates all inputs
3. Structured `ApiResponse<T>` type for consistency
4. Secrets from environment variables only
5. Specific error codes for client handling
6. Proper HTTP status codes (201, 401, 422, 500)
