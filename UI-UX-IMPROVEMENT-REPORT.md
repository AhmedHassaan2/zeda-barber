# UI/UX Improvement Report — ZEDA Barber Shop

**Date**: 2026-07-21
**Scope**: All public pages and components

---

## Typography & Fonts

### T-01: Inconsistent Font Loading
**File**: `src/app/layout.tsx`
**Problem**: Only `Noto_Sans_Arabic` is loaded via next/font. Extra fonts (Tajawal, Changa, Rakkas) are loaded via `<link>` tags — causing FOUT (flash of unstyled text) and extra network requests.
**Fix**: Load all used fonts via next/font for optimal performance.

### T-02: No Font Weight Scale
**Problem**: The design uses `Noto_Sans_Arabic` for everything — body, headings, display, buttons — with no distinct font for display/hero text. This creates a flat typographic hierarchy.
**Fix**: Use a display font (e.g., Tajawal, Changa) for headings/title, keep Noto_Sans_Arabic for body.

### T-03: Missing Headline-sm Font Size
**File**: `tailwind.config.ts`
**Problem**: `text-headline-sm` is used in components (e.g., team.tsx line 64) but not defined in `fontSize` config. Tailwind silently ignores it, falling through to default size.
**Fix**: Add `headline-sm` to `fontSize` config or replace usage with defined sizes.

### T-04: Inconsistent Text Sizes Across Pages
**Problem**: Some pages use `text-body-lg` for descriptions, others use `text-on-surface-variant`. Contact page uses `text-body-lg`, services page uses `text-body-lg` for body. No systematic size allocation.
**Fix**: Create a typography specification doc and enforce consistency.

---

## Spacing & Layout

### L-01: Section Spacing Inconsistency
**Problem**: Most sections use `py-section-gap` (160px), but the CTA section on homepage uses `py-32`. Some sections use `mb-12`, others `mb-16` or `mb-24`.
**Fix**: Standardize vertical rhythm — same spacing between sections, same padding inside.

### L-02: Grid Gap Inconsistency
**Problem**: Gallery uses `gap-3 md:gap-4`, services page uses `gap-8`, team section uses `gap-x-10 md:gap-x-16 gap-y-8`. No standard grid spacing.
**Fix**: Define 2-3 standard gap scales (tight, default, loose).

### L-03: Mobile Padding Inconsistency
**Problem**: Most pages use `px-margin-mobile` (24px). But hero section uses `px-4` (16px). Gallery uses `px-margin-mobile` for container but inner grid has no padding adjustments.
**Fix**: Use consistent page padding on ALL sections.

---

## Components

### C-01: Services Cards — Desktop Description Hidden
**File**: `src/components/services.tsx:45`
```typescript
<span className="font-body-md text-on-surface-variant hidden md:block max-w-[250px] truncate">{service.desc}</span>
```
**Problem**: Description is `truncate`d with `max-w-[250px]` — cuts off text awkwardly on different viewport sizes.
**Fix**: Remove truncation, let text flow naturally, or use a cleaner approach.

### C-02: Gallery Grid — Masonry Layout Issues
**File**: `src/components/gallery-grid.tsx:14`
```typescript
<div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
```
**Problem**: CSS columns create uneven column fills. Images can overflow or leave gaps. No loading state while images fetch.
**Fix**: Consider using CSS Grid with explicit row placement, or add a loading skeleton.

### C-03: Gallery Preview — Click Toggle UX
**File**: `src/components/gallery-preview.tsx:45-52`
**Problem**: Click toggles grayscale on/off. There's no visual affordance that images are clickable (no cursor change, no hover state on desktop).
**Fix**: Add `cursor-pointer`, hover scale effect, or a "click to reveal" overlay hint.

### C-04: Team Section — Avatar Initials Only
**File**: `src/components/team.tsx:37`
```typescript
<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
  <span className="font-display-lg text-headline-md text-primary">{barber.name.charAt(0)}</span>
</div>
```
**Problem**: Barber avatars show first letter only instead of photos. Users can't see barber faces.
**Fix**: Use actual barber photos (many barbershops show face photos for trust).

### C-05: Lightbox — Missing Z-index Management
**File**: `src/components/gallery-lightbox.tsx:22`
```typescript
<div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
```
**Problem**: Uses `z-[100]` hardcoded. If other elements have higher z-index, lightbox breaks.
**Fix**: Use a CSS variable or a z-index system scale.

### C-06: Lightbox — No Touch Support
**Problem**: Lightbox navigation is click-only. No swipe gesture support for mobile users.
**Fix**: Add touch event handlers for swipe left/right.

---

## Accessibility

### A-01: Missing Skip-to-Content Link
**Problem**: No skip navigation link for keyboard/screen reader users. User must tab through entire header to reach main content.
**Fix**: Add an invisible skip-to-content link.

### A-02: Icon Buttons Without Labels
**Files**: Header hamburger menu, lightbox arrows, gallery navigation buttons
**Problem**: Close, Previous, Next buttons use `aria-label` inconsistently. Some have it, some don't. The `material-symbols-outlined` spans have no accessible text.
**Fix**: Add consistent `aria-label` on ALL icon-only buttons.

### A-03: Image Alt Text Is Generic
**Files**: Multiple gallery components
```typescript
alt={`Gallery ${i + 1}`}
```
**Problem**: All gallery images have the same generic alt text. Screen reader users get no meaningful description.
**Fix**: Use actual descriptions or at minimum meaningful alt text.

### A-04: Color Contrast
**Files**: Multiple
**Problem**: `text-on-surface-variant` (`#d1c5b4`) on `bg-surface` (`#121414`) passes contrast but `text-primary/60` on certain backgrounds may fail WCAG AA.
**Fix**: Audit all `text-*/60` and `text-*/80` opacity combinations for contrast.

### A-05: Focus Indicators
**Problem**: Links and buttons use `transition-colors` but have no visible `:focus-visible` ring outline.
**Fix**: Add `focus-visible:ring-2 focus-visible:ring-primary` to all interactive elements.

### A-06: Video Has No Captions
**File**: `src/components/hero.tsx:11-19`
**Problem**: The hero background video has `<source>` but no `<track>` element for captions. No fallback poster image.
**Fix**: Add a poster image and consider adding captions.

### A-07: No Reduced Motion Support
**Problem**: Animations (marquee, grayscale transitions, hover effects) run regardless of `prefers-reduced-motion`.
**Fix**: Wrap animations in `@media (prefers-reduced-motion: no-preference)`.

---

## Responsive

### R-01: Footer Mobile Stacking
**File**: `src/components/footer.tsx:11`
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
```
**Problem**: On mobile, footer columns stack vertically with large gap (48px). Content feels disconnected.
**Fix**: Reduce gap on mobile, or use a more compact mobile layout.

### R-02: Booking Page Calendar on Mobile
**File**: `src/app/booking/page.tsx` (calendar section)
**Problem**: The calendar grid with 7 columns works on desktop but date buttons are very small on narrow mobile screens.
**Fix**: Increase date button size on mobile, consider a different mobile calendar layout.

### R-03: Services Page Cards on Mobile
**File**: `src/app/services/page.tsx`
**Problem**: Three-column grid on desktop stacks to single column on mobile with large gaps. Cards are large.
**Fix**: Consider 2 columns on tablet, single on mobile with optimized padding.

### R-04: Header — Mobile Menu Full-Screen Overlay
**File**: `src/components/header.tsx:60-86`
**Problem**: Mobile menu is a full-screen overlay with no close button visible at first glance (the hamburger icon changes to close). No backdrop blur on the menu background.
**Fix**: Add backdrop blur, ensure close action is obvious.

---

## Visual Polish

### V-01: Dark Mode Consistency
**Problem**: The site uses `darkMode: "class"` in tailwind config but the `<html>` tag has `className="dark"` hardcoded. No light mode toggle for users.
**Fix**: Either remove unused light mode config or add a toggle. Keep current hardcoded dark if no light mode is planned.

### V-02: Transition Durations Inconsistency
**Problem**: Some transitions use `duration-300`, others `duration-400`, `duration-[2000ms]`. No standardized transition speed.
**Fix**: Define 2-3 standard transition speeds (fast: 200ms, normal: 300ms, slow: 500ms).

### V-03: Button Hover Effects Inconsistent
**Problem**: Primary buttons use `hover:opacity-90`, outline buttons use `hover:bg-primary/5` or `hover:bg-primary hover:text-surface`. Different buttons on different pages behave differently.
**Fix**: Standardize button hover patterns.

### V-04: Engaz Logo Brightness Filter
**File**: `src/components/footer.tsx:58`
```typescript
<img src="/images/logos/engaz-logo.png" alt="..." className="h-16 md:h-20 w-auto" />
```
**Problem**: Engaz logo has no `brightness-0 invert` filter on this version — it will show in its original colors which may not match the dark theme.
**Fix**: Apply theme-appropriate filters.

---

## Summary

| Category | Issues |
|----------|--------|
| Typography & Fonts | 4 |
| Spacing & Layout | 3 |
| Components | 6 |
| Accessibility | 7 |
| Responsive | 4 |
| Visual Polish | 4 |
| **Total** | **28** |

**Top 3 Priorities**:
1. Add focus indicators + skip-to-content link (A-01, A-05)
2. Standardize typography with proper display font (T-01, T-02)
3. Fix gallery image alt text + add touch support (A-03, C-06)
