---
date: 2026-07-19
category: lessons
tags: [rtl, tailwind, css, arabic, internationalization]
project: shared
severity: none
---

# Use Logical Properties for RTL Support

## Context

Arabic/English bilingual projects require RTL support. Using `ml-`/`mr-` breaks layout when direction flips. Logical properties (`ms-`/`me-`, `ps-`/`pe-`) work correctly in both directions.

## Content

**The Problem:**
```html
<!-- Broken in RTL -->
<div className="ml-4 mr-8">  <!-- Left becomes right in RTL — reversed! -->
<div className="pl-6 pr-2">  <!-- Padding is wrong direction -->
<div className="border-l border-r"> <!-- Borders on wrong sides -->
```

**The Fix:**
```html
<!-- Works in both LTR and RTL -->
<div className="ms-4 me-8">  <!-- Inline start/end — flips automatically -->
<div className="ps-6 pe-2">  <!-- Padding inline — correct in both -->
<div className="border-s border-e"> <!-- Borders — correct in both -->
<div className="text-start"> <!-- Text align — left in LTR, right in RTL -->
```

**Tailwind Logical Property Mapping:**
| Physical | Logical | Usage |
|---|---|---|
| `ml-` / `mr-` | `ms-` / `me-` | Margin inline |
| `pl-` / `pr-` | `ps-` / `pe-` | Padding inline |
| `border-l` / `border-r` | `border-s` / `border-e` | Border inline |
| `left-` / `right-` | `start-` / `end-` | Positioning |
| `text-left` / `text-right` | `text-start` / `text-end` | Text alignment |

**Exception:** `mx-auto` (centering) is fine — it's symmetric.

## Application

Every component in bilingual projects uses logical properties. Search for `ml-`, `mr-`, `pl-`, `pr-` and replace with `ms-`, `me-`, `ps-`, `pe-`.

## Related

- `2026-07-19_tailwind-over-css-modules.md` — Tailwind as default
- `2026-07-19_mobile-first-responsive.md` — Responsive patterns
