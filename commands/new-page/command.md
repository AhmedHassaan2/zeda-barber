---
name: new-page
description: Create a new Next.js App Router page with proper structure and conventions
allowed_tools: ["Read", "Write", "Edit", "Glob", "Grep"]
agent: frontend
---

# /new-page — Create New Page

Create a new Next.js App Router page following project conventions.

## Usage

```
/new-page about              # Create /about page
/new-page services/haircut   # Create /services/haircut page
/new-page admin/reports      # Create /admin/reports page
```

## Page Template

```tsx
// src/app/[path]/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Zeda',
  description: 'Page description for SEO',
};

export default function PageNamePage() {
  return (
    <main className="min-h-screen">
      <section className="section-padding">
        <div className="max-w-container mx-auto">
          {/* Page content */}
        </div>
      </section>
    </main>
  );
}
```

## Process

1. Parse page path from arguments
2. Check if page already exists
3. Create directory structure
4. Create page.tsx with metadata
5. Add loading.tsx if needed
6. Add error.tsx if needed
7. Update navigation if required
8. Report creation summary

## Conventions

- Use Next.js App Router file conventions
- Include metadata export for SEO
- Use Tailwind CSS for styling
- Follow RTL-first design
- Include Arabic/English support
- Use semantic HTML
- Add proper headings
