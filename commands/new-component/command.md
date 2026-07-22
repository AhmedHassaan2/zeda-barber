---
name: new-component
description: Create a new React component with TypeScript, following project conventions
allowed_tools: ["Read", "Write", "Edit", "Glob", "Grep"]
agent: frontend
---

# /new-component — Create New Component

Create a new React component following project conventions.

## Usage

```
/new-component Button         # Create Button component
/new-component UserCard       # Create UserCard component
/new-component BookingForm    # Create BookingForm component
```

## Component Template

```tsx
// src/components/[name].tsx
interface [Name]Props {
  // Props definition with types
}

export function [Name]({ prop1, prop2 }: [Name]Props) {
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

## Process

1. Parse component name from arguments
2. Check if component already exists
3. Determine component type (client/server)
4. Create component file with TypeScript interface
5. Add JSDoc documentation
6. Create corresponding test file
7. Export from index if needed
8. Report creation summary

## Conventions

- Use TypeScript with explicit types
- One component per file
- PascalCase for component names
- Include prop interface
- Use Tailwind CSS for styling
- Add JSDoc documentation
- Consider client vs server component
