# Semantic HTML5 — Knowledge Reference

## Purpose

Reference for writing accessible, SEO-optimized, and maintainable HTML5. Covers semantic elements, accessibility attributes, forms, ARIA, microdata, Open Graph, meta tags, structured data, and progressive enhancement strategies.

## Core Concepts

### Semantic HTML5 Elements

Semantic elements convey meaning to browsers, screen readers, and search engines. Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`, `<address>`, `<details>`, `<summary>`, `<mark>`, `<progress>`, `<meter>`.

### Accessibility Attributes

Core ARIA attributes: `role`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-hidden`, `aria-live`, `aria-expanded`, `aria-selected`, `aria-disabled`, `aria-required`. Use native HTML semantics first; ARIA supplements only when HTML semantics are insufficient.

### Forms

Proper form structure: `<label>` for every input, `type` attribute for input types, `required`/`pattern`/`minlength`/`maxlength` for validation, `<fieldset>` and `<legend>` for grouping, `autocomplete` for autofill, `name` for form submission.

### ARIA (Accessible Rich Internet Applications)

ARIA roles, states, and properties bridge gaps where HTML semantics are insufficient. `role="dialog"`, `aria-modal="true"` for modals. `role="tablist"`/`role="tab"`/`role="tabpanel"` for tabs. `aria-live="polite"` for dynamic content updates. First rule: don't use ARIA if native HTML works.

### Microdata

Schema.org vocabulary embedded in HTML via `itemscope`, `itemtype`, and `itemprop` attributes. Structured data for search engines: products, articles, events, recipes, organizations. Largely superseded by JSON-LD for most use cases.

### Open Graph Protocol

Meta tags for social media sharing: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`. Essential for link previews on Facebook, LinkedIn, and other platforms that read OG tags.

### Meta Tags

`<meta charset="UTF-8">` for encoding. `<meta name="viewport" content="width=device-width, initial-scale=1">` for responsive design. `<meta name="description">` for SEO. `<meta name="robots">` for crawler directives. `<meta http-equiv="X-UA-Compatible">` for IE compatibility.

### Structured Data (JSON-LD)

JSON-LD in `<script type="application/ld+json">` provides structured data to search engines. Enables rich snippets: breadcrumbs, FAQs, how-tos, events, products. Google's structured data testing tool validates markup.

### Progressive Enhancement

Build a baseline experience that works without JavaScript, then enhance with JavaScript. Use server-rendered HTML for core content. JavaScript enhances interactivity. CSS provides visual presentation. This ensures resilience and accessibility.

## Best Practices

1. **Use native HTML elements before ARIA** — `<button>` is always better than `<div role="button">`; native elements provide built-in keyboard handling and semantics
2. **Always associate labels with inputs** — `<label for="email">Email</label><input id="email">` ensures screen readers announce the label and clicking the label focuses the input
3. **Use `<main>`, `<nav>`, `<header>`, `<footer>` on every page** — landmark elements allow screen reader users to jump between sections
4. **Set `lang` attribute on `<html>`** — `<html lang="ar" dir="rtl">` or `<html lang="en">` enables correct screen reader pronunciation and hyphenation
5. **Use `alt` text for all meaningful images** — decorative images get `alt=""` (empty); informative images describe the content
6. **Implement proper heading hierarchy** — `<h1>` through `<h6>` should form a logical outline; never skip levels for styling
7. **Use `aria-live` regions for dynamic content** — `aria-live="polite"` announces updates without interrupting the user; use for status messages and form feedback
8. **Add `<meta name="viewport">` to every page** — without it, mobile browsers render at desktop width; never disable user scaling

## Anti-Patterns

1. **Using `<div>` and `<span>` for everything** — loses all semantic meaning; screen readers cannot navigate or announce content correctly
2. **Using `tabindex` values greater than 0** — positive tabindex disrupts natural tab order; use `tabindex="0"` for focusable non-interactive elements or `tabindex="-1"` for programmatic focus
3. **Hiding content with `display: none` instead of `aria-hidden`** — both hide content, but `aria-hidden` hides from screen readers while keeping visual presence
4. **Using `alt` text as keyword stuffing** — search engines penalize; alt text should describe the image accurately and concisely
5. **Ignoring keyboard navigation** — all interactive elements must be operable with keyboard alone; test by tabbing through the page
6. **Using color alone to convey meaning** — add text labels, icons, or patterns; color-blind users cannot distinguish colors alone
7. **Not providing focus indicators** — removing `outline` without replacement breaks keyboard navigation; always ensure visible focus states
8. **Using `<br>` for layout spacing** — use CSS margins/padding for spacing; `<br>` is for line breaks within text content only

## Common Mistakes

1. **Missing `lang` attribute** — screen readers default to English pronunciation; always set the correct language
2. **Images without `alt` attributes** — screen readers announce the file name, which is meaningless; always provide descriptive alt text
3. **Empty `<a href="#">` links** — non-functional links confuse keyboard users; use `<button>` for actions
4. **Using `<i>` or `<b>` instead of `<em>` or `<strong>`** — semantic emphasis vs visual styling; use `<em>` for stress emphasis and `<strong>` for importance
5. **Forms without labels** — screen readers cannot announce what input the user is filling; always use `<label>` or `aria-label`
6. **Missing `type` on `<button>`** — defaults to `submit`, which can trigger form submission unexpectedly; always set explicit `type`
7. **Not using `<time datetime="">`** — machine-readable dates enable search engines and assistive technology to parse dates correctly
8. **Ignoring document outline** — poor heading structure makes content navigation impossible for screen reader users

## Decision Guidelines

| Scenario | Approach |
|---|---|
| Page-level landmarks | `<main>`, `<nav>`, `<header>`, `<footer>`, `<aside>` |
| Content grouping | `<article>`, `<section>` |
| Interactive controls | Native `<button>`, `<input>`, `<select>` |
| Custom widgets | ARIA roles + keyboard handlers |
| Dynamic updates | `aria-live` regions |
| SEO structured data | JSON-LD in `<script type="application/ld+json">` |
| Social sharing | Open Graph meta tags |
| Responsive images | `<picture>` + `<source>` + `<img>` with `srcset` |
| Form validation | HTML5 validation attributes + custom JS for complex cases |
| Internationalization | `lang` attribute + `dir` attribute + `<meta charset>` |

## References

- [MDN HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apd/)
- [Schema.org](https://schema.org)
- [Open Graph Protocol](https://ogp.me)
- [WebAIM Accessibility Resources](https://webaim.org)

## Practical Notes

- HTML is the most accessible and resilient layer of the web stack; invest in solid HTML before adding CSS/JavaScript
- Use the `HTMLHint` VS Code extension for real-time HTML validation
- Google's Rich Results Test validates structured data for search engine compatibility
- Always test with keyboard-only navigation (unplug your mouse) and a screen reader (NVDA/VoiceOver)
- `<template>` elements are inert and do not render; use for client-side rendering patterns without JavaScript framework overhead
- `<dialog>` element provides native modal behavior with `<dialog>.showModal()` and `::backdrop` pseudo-element
