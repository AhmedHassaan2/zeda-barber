---
title: Systematic debugging methodology for Next.js/React/TypeScript applications with tooling guidance
description: Systematic debugging methodology for Next.js/React/TypeScript applications with tooling guidance
---

# Systematic debugging methodology for Next.js/React/TypeScript applications with tooling guidance

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>debug</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Debugging Methodology

## Purpose

Systematic debugging approach for Next.js, React, and TypeScript applications with concrete tooling and common patterns.

## When to Use

- Investigating runtime errors
- Fixing build failures
- Troubleshooting unexpected behavior
- Diagnosing performance issues

## Debugging Framework

### Phase 1: Reproduce & Understand

```
1. What is the EXPECTED behavior?
2. What is the ACTUAL behavior?
3. When does it happen? (always / sometimes / specific conditions)
4. Can you reproduce it consistently?
5. What changed recently? (git log --oneline -10)
```

### Phase 2: Gather Evidence

```
1. Read the FULL error message (not just the first line)
2. Check the stack trace — find the first frame in YOUR code
3. Check browser console (Client) or server terminal (Server)
4. Check Network tab for failed requests
5. Check git diff for recent changes
```

### Phase 3: Hypothesize & Test

```
1. Form 2-3 hypotheses
2. For each: what would confirm or refute it?
3. Add targeted logging to test
4. Check one hypothesis at a time
5. Eliminate possibilities systematically
```

### Phase 4: Fix & Verify

```
1. Make the MINIMAL change that fixes the issue
2. Verify the fix works
3. Check for side effects (regression)
4. Add a test if the bug was subtle
5. Document root cause in DECISIONS.md if non-obvious
```

## Common Error Patterns in Next.js/React

### 1. "Server Component cannot be used as a Client Component"

```tsx
// WRONG: Using hooks in server component
async function Page() {
  const [state, setState] = useState(''); // Error!
}

// FIX: Add 'use client' directive
'use client';
function Page() {
  const [state, setState] = useState('');
}
```

### 2. "Hydration Mismatch"

```tsx
// WRONG: Rendering differently on server vs client
function Clock() {
  return <p>{new Date().toLocaleString()}</p>; // Server and client differ
}

// FIX: Suppress hydration warning or render only on client
function Clock() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <p>Loading...</p>;
  return <p>{new Date().toLocaleString()}</p>;
}
```

### 3. "Too many re-renders"

```tsx
// WRONG: Calling state setter in render
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // Infinite loop!
}

// FIX: Use useEffect or event handler
function Component() {
  const [count, setCount] = useState(0);
  useEffect(() => { setCount(c => c + 1); }, []); // Run once
}
```

### 4. "Cannot read property of undefined"

```tsx
// WRONG: Not handling loading state
function Profile({ user }) {
  return <h1>{user.name}</h1>; // user may be undefined
}

// FIX: Guard against undefined
function Profile({ user }) {
  if (!user) return <Skeleton />;
  return <h1>{user.name}</h1>;
}
```

### 5. Supabase "permission denied"

```typescript
// Check RLS policies are enabled and correct
// Check if using admin client for privileged operations
const { data, error } = await supabase
  .from('table')
  .select('*');
// error?.message === "permission denied for table table"
// FIX: Use supabaseAdmin for server-side operations
```

### 6. API Route returns empty or wrong data

```typescript
// Common causes:
// 1. Missing return statement
// 2. Wrong HTTP method export (GET vs POST)
// 3. Not awaiting async operations
// 4. Not parsing request body

export async function POST(request: Request) {
  const body = await request.json(); // Must await!
  // Process...
  return NextResponse.json({ data: result });
}
```

## Debugging Tools

### Next.js

```bash
# Debug mode
NODE_OPTIONS='--inspect' npm run dev

# Build analysis
npx @next/bundle-analyzer

# Check environment variables
npx next info
```

### React

```tsx
// React DevTools Profiler
// 1. Install React DevTools browser extension
// 2. Open Profiler tab
// 3. Record interaction
// 4. Check which components re-render

// Why did this render?
// Add to component:
console.log('ComponentName rendered');
```

### TypeScript

```bash
# Type checking
npx tsc --noEmit

# Find type errors
npx tsc --noEmit 2>&1 | head -50
```

### Network

```
// Browser DevTools → Network tab
// 1. Filter by type (XHR/Fetch)
// 2. Check request/response payload
// 3. Check status codes
// 4. Check timing (slow requests)
```

## Output Format

When debugging, always provide:

```
## Root Cause
[What is actually causing the issue]

## Evidence
[What you observed that led to this conclusion]

## Fix
[The minimal change needed]

## Prevention
[How to avoid this in the future — pattern, test, or lint rule]
```

## Best Practices

- Always reproduce before fixing
- Make minimal changes (don't refactor while debugging)
- Check the simplest explanations first
- Use `console.log` strategically (not everywhere)
- Check git log for recent changes
- Ask: "What changed?" before "What's wrong?"
- Add regression tests for subtle bugs
- Document non-obvious root causes

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
