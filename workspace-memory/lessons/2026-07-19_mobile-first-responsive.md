---
date: 2026-07-19
category: lessons
tags: [responsive, mobile, tailwind, breakpoints, design]
project: shared
severity: none
---

# Mobile-First with md: Breakpoints

## Context

Desktop-first design led to poor mobile experiences. Components looked broken on phones because they were designed for wide screens first and squeezed down later.

## Content

**The Approach:** Design for mobile (smallest screen) first, then enhance for larger screens.

```html
<!-- Mobile-first: base is mobile, md: adds desktop -->
<div className="grid grid-cols-1 gap-4 p-4
                md:grid-cols-2 md:gap-6 md:p-8
                lg:grid-cols-3 lg:gap-8">
  <Card />
  <Card />
  <Card />
</div>
```

**Breakpoint Scale:**
```
Default (mobile):  0px — 767px   (no prefix)
md:                768px — 1023px
lg:                1024px — 1279px
xl:                1280px+ 
```

**Common Patterns:**
```html
<!-- Stack on mobile, row on desktop -->
<div className="flex flex-col gap-4 md:flex-row md:items-center">

<!-- Hidden on mobile, visible on desktop -->
<div className="hidden md:block">

<!-- Full width on mobile, constrained on desktop -->
<main className="w-full max-w-full md:max-w-3xl md:mx-auto">

<!-- Sidebar layout: stacked on mobile -->
<div className="flex flex-col lg:flex-row lg:gap-8">
  <aside className="w-full lg:w-64">{/* sidebar */}</aside>
  <main className="flex-1">{/* content */}</main>
</div>
```

**Testing:** Always check at 375px (iPhone), 768px (iPad), 1024px (desktop).

## Application

Write mobile styles first (no prefix), then add `md:`, `lg:` for enhancements. Never use desktop-only code and try to make it mobile-compatible.

## Related

- `2026-07-19_rtl-logical-properties.md` — RTL responsive
- `2026-07-19_tailwind-over-css-modules.md` — Tailwind responsive
