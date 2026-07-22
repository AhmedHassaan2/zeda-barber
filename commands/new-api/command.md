---
name: new-api
description: Create a new Next.js Route Handler with proper structure and error handling
allowed_tools: ["Read", "Write", "Edit", "Glob", "Grep"]
agent: backend
---

# /new-api — Create New API Route

Create a new Next.js Route Handler following project conventions.

## Usage

```
/new-api products             # Create /api/products
/new-api bookings/[id]        # Create /api/bookings/[id]
/new-api admin/upload         # Create /api/admin/upload
```

## API Route Template

```typescript
// src/app/api/[path]/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Implementation
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validation and implementation
    return NextResponse.json({ success: true, data: {} }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Process

1. Parse API path from arguments
2. Check if route already exists
3. Create directory structure
4. Create route.ts with handlers
5. Add input validation
6. Add error handling
7. Document API endpoint
8. Report creation summary

## Conventions

- Use NextResponse for responses
- Include try/catch in every handler
- Use Supabase admin client server-side only
- Return consistent response format
- Validate all input
- Log errors for debugging
