---
title: Next.js Route Handler patterns for API endpoints, request parsing, response formatting, and middleware
description: Next.js Route Handler patterns for API endpoints, request parsing, response formatting, and middleware
---

# Next.js Route Handler patterns for API endpoints, request parsing, response formatting, and middleware

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>nextjs-route-handlers</code> | <strong>Category:</strong> backend | <strong>Priority:</strong> high | <strong>Level:</strong> framework
</div>

# Next.js Route Handlers

## Purpose

Guide Next.js Route Handler implementation for clean, secure, and maintainable API endpoints.

## When to Use

- Creating new API routes
- Implementing CRUD operations
- Adding authentication middleware
- Handling file uploads in API routes

## Core Concepts

### Basic Route Handler

```typescript
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const users = await getUsers();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = validateUser(body);
    const user = await createUser(validated);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Query Parameters

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '20');
  // ...
}
```

### Dynamic Routes

```typescript
// src/app/api/products/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await getProduct(params.id);
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: product });
}
```

### Authentication Pattern

```typescript
import { supabaseAdmin } from '@/lib/supabase';

async function verifyAuth(request: Request): Promise<string | null> {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  // Validate token...
  return userId;
}
```

## Best Practices

- Always use try/catch with structured error responses
- Validate input before processing
- Use Supabase admin client only in route handlers
- Return appropriate HTTP status codes
- Log errors with request context
- Handle all HTTP methods explicitly

## Anti-Patterns

- Not handling errors
- Exposing internal error details to clients
- Using client-side Supabase in route handlers
- Not validating input
- Returning inconsistent response shapes

## When to Use

- File patterns match the skill's activation rules
- Keywords in the conversation match the skill's domain
- A related agent delegates to this skill

## When NOT to Use

- When the task falls outside this skill's domain
- When a more specific skill exists for the task
- When the skill's dependencies are not met

## Related Agents

See [Agents Registry](/agents/) for agents that use this skill.

## Related Skills

See [Skills Registry](/skills/) for related skills in the same cluster.

## Customization Guide

1. Copy the skill to `.opencode/skills/` in your project
2. Modify the activation rules to match your project patterns
3. Add project-specific examples and templates
4. Update the related agents and skills references

## Extension Guide

1. Add new sections to the SKILL.md file
2. Include code examples for new patterns
3. Update anti-patterns with new findings
4. Maintain cross-references to related skills
5. Keep the skill focused on its core purpose
