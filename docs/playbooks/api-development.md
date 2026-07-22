---
title: Api Development Playbook
description: Engineering playbook for api development workflow
---

# Api Development Playbook

# Playbook: API Development

**Goal:** Design and implement well-structured, secure, documented REST APIs.

**Trigger:** New API endpoint, API redesign, integration requirement.

**Inputs:**
- API requirements (what data, what operations)
- Data model (existing or new)
- Authentication mechanism
- Consumer (frontend, mobile, third-party)

**Outputs:**
- API endpoint implementation
- Input validation
- Error handling
- API documentation
- Type definitions

----|------|
| `api-designer` | API contract design, REST conventions |
| `backend` | Implementation, server logic |
| `database` | Data access, query optimization |
| `security` | Auth, input validation, rate limiting |
| `reviewer` | API quality review |
| `docs-writer` | API documentation |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `api-design` | Always — REST conventions, versioning |
| `nextjs-route-handlers` | Next.js API implementation |
| `rest-api-design` | RESTful conventions |
| `api-security` | Security patterns |
| `input-validation` | Zod schemas |
| `error-handling` | Error response patterns |
| `authentication-patterns` | Auth implementation |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/new-api` | Create new API endpoint |
| `/security-scan` | Verify API security |
| `/review` | Review API implementation |

---

## Process

### Step 1: Design (10 min)

1. **Define resources** — What entities are involved?
2. **Define operations** — CRUD + any custom operations
3. **Define routes** — RESTful URL structure
4. **Define request/response** — Schemas for each endpoint
5. **Define errors** — Error response format

RESTful route conventions:
```
GET    /api/resources          # List all
GET    /api/resources/:id      # Get one
POST   /api/resources          # Create
PUT    /api/resources/:id      # Update (full)
PATCH  /api/resources/:id      # Update (partial)
DELETE /api/resources/:id      # Delete
```

### Step 2: Implement (varies)

1. **Create route file** — `src/app/api/[resource]/route.ts`
2. **Add input validation** — Zod schema for request body
3. **Implement handler** — Business logic
4. **Add error handling** — Try/catch with proper status codes
5. **Add auth check** — Verify authentication and authorization
6. **Add rate limiting** — Prevent abuse

```typescript
// Example route structure
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateSchema.parse(body);
    
    // Auth check
    // Database operation
    // Return response
    
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Step 3: Validate (10 min)

1. **Test with valid data** — Happy path works
2. **Test with invalid data** — Proper error responses
3. **Test without auth** — 401/403 as expected
4. **Test edge cases** — Empty body, missing fields, special characters
5. **Test rate limiting** — Blocks excessive requests

### Step 4: Document (10 min)

1. **Document endpoint** — Method, path, description
2. **Document request** — Body schema, headers
3. **Document response** — Success and error responses
4. **Add examples** — Request and response examples

### Step 5: Review (5 min)

1. **Run `/security-scan`** — API security check
2. **Run `/review`** — Code quality check
3. **Verify consistency** — Matches existing API patterns

---

## Validation Steps

- [ ] RESTful route naming
- [ ] Input validation with Zod
- [ ] Proper HTTP status codes
- [ ] Error handling with try/catch
- [ ] Authentication and authorization
- [ ] Rate limiting
- [ ] API documentation complete
- [ ] Type definitions exported
- [ ] No sensitive data in responses

## Success Criteria

- API follows REST conventions
- Input is validated at boundary
- Errors are handled gracefully
- API is documented
- Security is implemented

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Non-RESTful routes | Confuses consumers | Follow REST conventions |
| Missing input validation | Security vulnerability | Validate with Zod |
| Leaking errors | Information disclosure | Return generic errors |
| No auth checks | Unauthorized access | Always verify auth |
| Returning all fields | Data exposure | Select specific fields |
| No rate limiting | Abuse potential | Add rate limiting |
| Missing error handling | Crashes on bad input | Try/catch all handlers |

## Related Commands

See [Commands Registry](/commands/) for commands used in this playbook.

## Related Agents

See [Agents Registry](/agents/) for agents involved in this playbook.
