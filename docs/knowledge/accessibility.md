---
title: Accessibility
description: Accessibility reference documentation
---

# Accessibility

# Accessibility (WCAG 2.1 AA) — Knowledge Base

## Purpose

Web accessibility ensures that websites are usable by everyone, including people with disabilities. This knowledge base covers WCAG 2.1 AA compliance, semantic HTML, ARIA patterns, keyboard navigation, and testing strategies for Next.js applications with bilingual support.

## Core Concepts

### WCAG 2.1 Principles (POUR)

**Perceivable** — Information and UI components must be presentable to users in ways they can perceive.
- Text alternatives for non-text content
- Captions and audio descriptions
- Content adaptable to different presentations
- Sufficient color contrast

**Operable** — UI components and navigation must be operable by all users.
- Keyboard accessible
- Enough time to read and use content
- No content that causes seizures
- Navigable with assistive technology

**Understandable** — Information and UI operation must be understandable.
- Readable text content
- Predictable web page behavior
- Input assistance and error prevention

**Robust** — Content must be robust enough to be interpreted by assistive technologies.
- Compatible with current and future tools
- Valid, parseable markup
- Proper ARIA usage

### Semantic HTML

Using HTML elements for their intended purpose provides built-in accessibility:

```html
<!-- Good: semantic -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- Bad: non-semantic -->
<div class="nav">
  <div onclick="navigate('/about')">About</div>
</div>
```

### ARIA (Accessible Rich Internet Applications)

ARIA attributes supplement HTML semantics when native elements are insufficient:

**Roles:** Define what an element is (`role="dialog"`, `role="tablist"`)
**States:** Describe current condition (`aria-expanded="true"`, `aria-selected="false"`)
**Properties:** Define relationships (`aria-labelledby`, `aria-describedby`)

**Critical rule:** If a native HTML element provides the semantics you need, use it instead of ARIA. ARIA is a supplement, not a replacement.

### Keyboard Navigation

All interactive elements must be reachable and operable via keyboard:

- **Tab** — Move forward through interactive elements
- **Shift+Tab** — Move backward
- **Enter/Space** — Activate buttons and links
- **Arrow keys** — Navigate within composite widgets (tabs, menus, listboxes)
- **Escape** — Close modals, dropdowns, and popups

### Focus Management

Visual focus indicators must be clearly visible. Focus must be managed when:
- Opening/closing modals (focus moves to modal, returns on close)
- Navigating between pages (focus management with React Router)
- Dynamic content updates (screen reader announcements)

### Color Contrast

WCAG AA requires:
- **Normal text:** Minimum 4.5:1 contrast ratio against background
- **Large text (≥18pt or ≥14pt bold):** Minimum 3:1 contrast ratio
- **UI components and graphical objects:** Minimum 3:1 contrast ratio

### Live Regions

Dynamic content updates must be announced to screen readers:

```html
<div aria-live="polite" aria-atomic="true">
  Form submitted successfully
</div>
```

- `aria-live="polite"` — Announces after current announcement completes
- `aria-live="assertive"` — Interrupts current announcement
- `aria-atomic="true"` — Announces the entire region, not just changes

## Best Practices

1. **Use semantic HTML elements** — `nav`, `main`, `article`, `section`, `header`, `footer`, `button`, `a` provide built-in accessibility for free
2. **Add proper heading hierarchy** — Use `h1` through `h6` in logical order; never skip levels; one `h1` per page
3. **Implement keyboard navigation for all components** — Every interactive element must be focusable and operable with keyboard; test by unplugging your mouse
4. **Provide visible focus indicators** — Never use `outline: none` without a replacement; custom focus styles must meet contrast requirements
5. **Use ARIA only when needed** — Prefer native HTML semantics; add ARIA attributes only when HTML alone doesn't convey the meaning
6. **Test with screen readers** — Use NVDA (Windows), VoiceOver (Mac), or TalkBack (Android) to verify your application is usable
7. **Add alt text to all meaningful images** — Decorative images use `alt=""`; informative images describe the content or function
8. **Ensure sufficient color contrast** — Use tools like WebAIM Contrast Checker; don't rely solely on color to convey information

## Anti-Patterns

1. **Using `tabindex` greater than 0** — Positive tabindex values create unpredictable tab order; use `tabindex="0"` for focusable elements and `tabindex="-1"` for programmatically focusable
2. **Divs and spans as buttons** — `<div onclick>` or `<span onClick>` lack keyboard support, focusability, and semantics; use `<button>` elements
3. **Missing form labels** — Inputs without associated labels are inaccessible; use `<label htmlFor="id">` or `aria-label`
4. **Auto-playing media** — Videos or audio that auto-play without user interaction trap screen reader users and cause discomfort
5. **Using color alone to convey meaning** — "Fields in red are required" excludes colorblind users; add text labels or icons
6. **Focus trapping in wrong order** — Modal focus trap must cycle through all focusable elements and not allow escape to background content
7. **Removing focus outlines** — `outline: none` without replacement makes keyboard navigation impossible for sighted keyboard users
8. **Inaccessible custom dropdowns** — Custom select components without proper ARIA roles, keyboard support, and screen reader announcements fail accessibility

## Common Mistakes

1. **Not adding `lang` attribute to html element** — Screen readers need `lang="ar"` or `lang="en"` to use correct pronunciation and reading direction
2. **Skipping heading levels** — Jumping from `h1` to `h4` confuses screen reader users who navigate by headings; maintain sequential order
3. **Missing skip navigation link** — Add a "Skip to main content" link as the first focusable element to bypass repetitive navigation
4. **Inaccessible error messages** — Error messages must be associated with their fields using `aria-describedby` and announced to screen readers
5. **Using `display: none` for offscreen content** — Content hidden this way is removed from accessibility tree; use `aria-hidden="true"` for visually hidden but accessible content
6. **Not testing with actual assistive technology** — Automated tools catch only ~30% of issues; manual testing with screen readers is essential
7. **Ignoring RTL accessibility** — Arabic content needs `dir="rtl"` on the html element; keyboard navigation should respect reading direction
8. **Missing form validation accessibility** — Error states must be communicated via `aria-invalid`, `aria-describedby`, and live regions, not just visual styling

## Decision Guidelines

| Scenario | Recommendation |
|---|---|
| New component | Start with semantic HTML; add ARIA only if semantics are insufficient |
| Modal/dialog | Use `<dialog>` element with proper focus trap and `aria-modal` |
| Complex widget (tabs, tree) | Follow WAI-ARIA Authoring Practices patterns exactly |
| Form validation | Associate errors with fields via aria-describedby; announce via live region |
| Dynamic content update | Use aria-live region to announce changes |
| Loading states | Announce loading state to screen readers; use `aria-busy` |
| Arabic/English site | Set `lang` and `dir` correctly; ensure RTL keyboard navigation works |

## References

- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- WAI-ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- WebAIM: https://webaim.org/
- axe DevTools: https://www.deque.com/axe/
- NVDA Screen Reader: https://www.nvaccess.org/download/
- VoiceOver (built into macOS/iOS)

## Practical Notes

- **Next.js focus management:** Use `useRef` and `element.focus()` for programmatic focus; manage focus on route changes with `useEffect`
- **Tailwind focus styles:** Use `focus-visible:ring-2 focus-visible:ring-primary` for consistent focus indicators
- **Testing automation:** Add `@axe-core/react` for development-time accessibility linting; integrate into CI with `axe-core/playwright`
- **Arabic accessibility:** Ensure `dir="rtl"` is set; test that keyboard navigation works in RTL layout; verify screen reader reads Arabic correctly
- **Performance impact:** Accessibility improvements (semantic HTML, proper attributes) have zero negative performance impact and often improve it

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
