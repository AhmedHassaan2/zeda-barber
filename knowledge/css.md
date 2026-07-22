# Modern CSS — Knowledge Reference

## Purpose

Reference for modern CSS features covering layout systems, custom properties, container queries, the `:has()` selector, logical properties, animations, layers, color functions, calc functions, and specificity management. Focused on production-quality CSS for scalable applications.

## Core Concepts

### CSS Grid

Two-dimensional layout system. Define rows and columns with `grid-template-columns` and `grid-template-rows`. Place items with `grid-column` and `grid-row`. Use `fr` units for flexible sizing. `grid-auto-flow` controls implicit placement. Named grid areas via `grid-template-areas` for readable layouts.

### Flexbox

One-dimensional layout system for rows or columns. `display: flex` enables flex context. `justify-content` aligns along main axis, `align-items` along cross axis. `flex-wrap` enables multi-line. `flex-grow`, `flex-shrink`, `flex-basis` control sizing. `gap` provides consistent spacing.

### CSS Custom Properties

Variables defined with `--property: value` and accessed with `var(--property)`. Cascade-aware: values inherit and can be overridden at any level. Enable dynamic theming, responsive values, and component-level customization. Fallback values: `var(--color, blue)`.

### Container Queries

Style elements based on their container's size, not the viewport. `@container (min-width: 700px) { ... }` queries the nearest containment context. Define containment with `container-type: inline-size` on the parent. Enable truly reusable responsive components.

### :has() Selector

Parent selector: `.card:has(img) { ... }` styles `.card` only when it contains an `img`. Also works for sibling selection: `label:has(+ input:checked)`. Enables complex selector patterns previously impossible with CSS alone.

### Logical Properties

Direction-agnostic properties that respect `direction` and `writing-mode`. `margin-inline-start` replaces `margin-left` (for LTR). `padding-block` replaces `padding-top`/`padding-bottom`. Essential for internationalization and RTL support.

### CSS Animations

`@keyframes` define animation sequences. `animation` shorthand combines name, duration, timing, delay, iteration, direction, fill-mode, and play-state. `transition` animates between two states. `transform` enables GPU-accelerated animations: `translate`, `rotate`, `scale`.

### @layer

Cascade layers control specificity order. `@layer base, components, utilities;` declares layer order. Unlayered styles always win. Enables Tailwind-style utility overrides and third-party style isolation.

### color-mix()

CSS function for mixing colors: `color-mix(in srgb, red 50%, blue 50%)`. Supports any color space: `in oklch`, `in oklab`, `in hsl`. Enables dynamic color variations without pre-defining every shade.

### calc() and clamp()

`calc()` performs math in CSS: `width: calc(100% - 2rem)`. `clamp()` constrains a value between min and max: `font-size: clamp(1rem, 2.5vw, 2rem)`. `min()`, `max()`, `minmax()` provide additional value constraint functions.

### Specificity

CSS specificity determines which rule wins: inline styles (1000) > IDs (100) > classes/attributes/pseudo-classes (10) > elements/pseudo-elements (1). `!important` overrides all specificity. Use `@layer` to manage specificity hierarchically.

## Best Practices

1. **Use CSS Grid for page layout, Flexbox for component layout** — Grid excels at two-dimensional alignment; Flexbox excels at one-dimensional distribution
2. **Define design tokens as custom properties on `:root`** — colors, spacing, typography, and shadows should be themeable CSS variables
3. **Use logical properties for internationalization** — `margin-inline-start` instead of `margin-left` enables automatic RTL support
4. **Implement container queries for reusable components** — components that respond to their container, not the viewport, are truly portable
5. **Use `clamp()` for fluid typography** — `font-size: clamp(1rem, 0.5rem + 1vw, 2rem)` scales smoothly without breakpoints
6. **Leverage `:has()` for complex parent/sibling selectors** — reduces JavaScript for conditional styling; cleaner than `~` sibling combinators
7. **Use `@layer` to manage specificity** — separate base, components, and utilities into layers to prevent specificity wars
8. **Prefer `color-mix()` over pre-defined color scales** — generates exact shades dynamically: `color-mix(in oklch, var(--primary), white 20%)`

## Anti-Patterns

1. **Using `!important` as a fix for specificity issues** — `!important` creates cascading problems; fix the specificity hierarchy instead
2. **Hardcoded pixel values for everything** — use relative units (`rem`, `em`, `%`, `vw`, `vh`) for accessibility and responsiveness
3. **Overriding specificity with deeper selectors** — `.sidebar .nav .link .active { ... }` is fragile; use BEM or utility classes
4. **Ignoring `prefers-reduced-motion`** — always respect user motion preferences: `@media (prefers-reduced-motion: reduce) { animation: none; }`
5. **Using `position: absolute` for layout** — absolute positioning removes elements from flow; prefer Grid/Flexbox for layout
6. **Writing vendor prefixes manually** — use Autoprefixer; it adds only the prefixes needed based on your browser support targets
7. **Not using `box-sizing: border-box`** — content-box sizing makes width calculations unreliable; use `border-box` universally
8. **Ignoring browser support for new features** — check caniuse.com; use `@supports` queries as progressive enhancement

## Common Mistakes

1. **Confusing `em` and `rem`** — `em` is relative to parent font-size; `rem` is relative to root font-size; use `rem` for consistent sizing
2. **Not understanding the box model** — `width` includes padding and border only with `box-sizing: border-box`
3. **Using `min-height` without explicit `height`** — `min-height` does not work without `height` in flexbox; pair with `flex: 1`
4. **Forgetting `z-index` requires positioning** — `z-index` only works on positioned elements (`relative`, `absolute`, `fixed`, `sticky`)
5. **Using `overflow: hidden` to clear floats** — use `clearfix` or, better, modern layout systems (Flexbox/Grid)
6. **Not understanding stacking context** — `z-index` is local to stacking context; a `z-index: 9999` inside a `z-index: 1` parent is still below `z-index: 2`
7. **Using `margin: 0 auto` for vertical centering** — horizontal centering only; use Flexbox/Grid for both axes
8. **Ignoring paint and layout performance** — animate only `transform` and `opacity`; avoid animating `width`, `height`, `top`, `left`

## Decision Guidelines

| Scenario | Approach |
|---|---|
| Page-level layout | CSS Grid with `grid-template-areas` |
| Navigation bar | Flexbox |
| Card component | Container queries + Grid or Flexbox |
| Fluid typography | `clamp(1rem, 0.5rem + 1vw, 2rem)` |
| RTL support | Logical properties |
| Dynamic color variations | `color-mix()` |
| Animations | `transition` for state changes, `@keyframes` for sequences |
| Style isolation | `@layer` |
| Parent-dependent styling | `:has()` |
| Responsive images | `<picture>` + `srcset` + CSS `object-fit` |

## References

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS-Tricks](https://css-tricks.com)
- [Can I Use](https://caniuse.com)
- [Web.dev CSS Features](https://web.dev/learn/css)
- [Every Layout](https://every-layout.dev)

## Practical Notes

- `color-mix()` is supported in all modern browsers (2023+); use `@supports` for graceful degradation
- Container queries have excellent support but require `container-type: inline-size` on the parent element
- `:has()` is supported in Chrome 105+, Safari 15.4+, Firefox 121+; excellent support as of 2025
- CSS nesting is now natively supported in modern browsers; reduces the need for preprocessors
- Use `@property` to define custom properties with types, initial values, and inheritance; enables animated custom properties
- `scroll-timeline` and `view-timeline` enable scroll-driven animations without JavaScript
- The CSS `has` selector is the most powerful addition to CSS since Flexbox; learn it thoroughly
