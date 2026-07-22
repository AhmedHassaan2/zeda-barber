# Playbook: Backend Feature

**Goal:** Build server-side logic with proper error handling, auth, and data processing.

**Trigger:** New API route, server action, background job, or data processing logic.

**Inputs:**
- Feature requirements
- Data model
- Auth mechanism
- External services (if any)

**Outputs:**
- Server-side implementation
- Error handling
- Input validation
- Type definitions
- API documentation

---

## Required Agents

| Agent | Role |
|-------|------|
| `backend` | Primary builder — server logic, data processing |
| `api-designer` | API contract, REST conventions |
| `database` | Data access, queries |
| `security` | Auth, input validation, secrets |
| `reviewer` | Code quality review |
| `docs-writer` | API documentation |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `nextjs-route-handlers` | Always — Next.js API routes |
| `api-design` | REST conventions |
| `input-validation` | Zod schemas |
| `error-handling` | Error patterns |
| `authentication-patterns` | Auth implementation |
| `background-jobs` | If async processing needed |
| `supabase-patterns` | If using Supabase |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/new-api` | Create new API endpoint |
| `/security-scan` | Verify security |
| `/review` | Code quality |

---

## Process

### Step 1: Design (10 min)

1. **Define endpoint** — Method, path, purpose
2. **Define request** — Body, query, params schema
3. **Define response** — Success and error shapes
4. **Define auth** — Who can access?
5. **Define errors** — What can go wrong?

### Step 2: Implement (varies)

1. **Create route file** — `src/app/api/[path]/route.ts`
2. **Add validation** — Zod schema for input
3. **Add auth check** — Verify token/cookie
4. **Implement logic** — Business rules
5. **Add error handling** — Try/catch with status codes
6. **Add logging** — Structured logging for debugging

```typescript
// Route handler pattern
export async function POST(request: NextRequest) {
  try {
    // 1. Validate input
    const body = await request.json();
    const validated = Schema.parse(body);
    
    // 2. Check auth
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // 3. Business logic
    const result = await processData(validated);
    
    // 4. Return response
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    // 5. Handle errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Step 3: Secure (10 min)

1. **Input validation** — All external input validated
2. **Auth check** — Every protected endpoint
3. **Rate limiting** — Prevent abuse
4. **Secrets** — No hardcoded credentials
5. **Error messages** — Don't leak internals

### Step 4: Test (10 min)

1. **Happy path** — Valid input, authenticated
2. **Invalid input** — Missing fields, wrong types
3. **Unauthorized** — No auth token
4. **Forbidden** — Wrong role
5. **Edge cases** — Empty body, special characters

### Step 5: Document (5 min)

1. **Document endpoint** — Method, path, purpose
2. **Document request/response** — Schemas
3. **Document errors** — Error codes and messages
4. **Add examples** — Request/response

---

## Validation Steps

- [ ] Input validated with Zod
- [ ] Auth check on protected endpoints
- [ ] Error handling with try/catch
- [ ] Proper HTTP status codes
- [ ] No hardcoded secrets
- [ ] Rate limiting applied
- [ ] Logging for debugging
- [ ] API documentation complete

## Success Criteria

- Endpoint works correctly
- Input is validated
- Errors are handled gracefully
- Security is implemented
- API is documented

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Missing error handling | Crashes on bad input | Try/catch all handlers |
| Leaking error details | Security risk | Return generic errors to client |
| No input validation | Injection attacks | Validate with Zod |
| Hardcoded secrets | Exposed in source | Use environment variables |
| Missing auth check | Unauthorized access | Verify auth on every request |
| Synchronous blocking | Slows response | Use async operations |
| No logging | Can't debug issues | Add structured logging |
