---
date: 2026-07-19
category: patterns
tags: [api, nextjs, validation, auth, error-handling]
project: shared
severity: none
---

# Next.js API Route Pattern

## Context

Every API route in this workspace follows the same structure: validation → auth → business logic → error handling. Deviations lead to inconsistent endpoints and missed edge cases.

## Content

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = RequestSchema.parse(body);

    // Auth check
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Business logic
    const result = await createRecord(validated, user.id);

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

## Application

Use this pattern for all new API routes. Key points:
- Always validate input with Zod before processing
- Always check auth before business logic
- Always catch and log errors, return generic message to client
- Never expose internal error details to the client

## Related

- `2026-07-19_error-boundary-pattern.md` — Client-side error handling
- `2026-07-19_hardcoded-credentials.md` — Never hardcode API keys
