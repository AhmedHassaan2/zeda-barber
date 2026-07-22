# Implementation Plan — ZEDA Improvement Pass

**Date**: 2026-07-21
**Strategy**: Security-first, then UX, then polish. No breaking changes. No new features.

---

## Phase 1 — Security (Critical + High)

### 1.1 Move Credentials to Environment Variables
**Files**: `src/app/api/admin/login/route.ts`
**Changes**:
- Replace hardcoded `ADMIN_USER`/`ADMIN_PASS` with `process.env.ADMIN_USER`/`process.env.ADMIN_PASS`
- Add to `.env.local`: `ADMIN_USER=zeda`, `ADMIN_PASS=zeda2026`
- Add runtime validation: throw if env vars are missing at startup
**Risk**: Low. Existing credentials preserved.
**Impact**: Credentials no longer in source code.

### 1.2 Generate Real Auth Token
**Files**: `src/app/api/admin/login/route.ts`, `src/app/admin/dashboard/page.tsx`, `src/app/admin/login/page.tsx`
**Changes**:
- Generate crypto-random token on login instead of static string
- Store hashed token in a server-side store or use JWT with expiry
- Check token server-side on dashboard load
**Risk**: Medium. Token validation pattern changes.
**Impact**: Real authentication instead of static string.

### 1.3 Add Next.js Middleware for Route Protection
**File**: `src/middleware.ts` (new)
**Changes**:
- Protect `/admin/*` routes — redirect to login if no valid token
- Protect `/api/admin/*` routes — return 401 if no valid token
- Token passed via cookie (httpOnly) instead of localStorage
**Risk**: Medium. Middleware affects all matching routes.
**Impact**: Server-side auth enforcement.

### 1.4 Add Input Validation to Upload API
**File**: `src/app/api/admin/upload/route.ts`
**Changes**:
- Validate MIME type against whitelist (`image/jpeg`, `image/png`, `image/webp`)
- Check magic bytes for actual file type
- Enforce 10MB file size limit
- Reject on any validation failure with clear error
**Risk**: Low.
**Impact**: Prevents malicious uploads.

### 1.5 Add Rate Limiting to Login
**File**: `src/app/api/admin/login/route.ts`
**Changes**:
- Track login attempts by IP (in-memory Map with TTL)
- Block after 5 failed attempts for 15 minutes
- Return 429 with retry-after header
**Risk**: Low. No external dependencies needed.
**Impact**: Prevents brute-force attacks.

---

## Phase 2 — Admin Dashboard

### 2.1 Add Upload Progress Bar
**File**: `src/app/admin/dashboard/page.tsx`
**Changes**:
- Replace `fetch` with `XMLHttpRequest` for upload
- Show progress bar during upload
- Keep current design aesthetic
**Risk**: Low.
**Impact**: Users see upload progress.

### 2.2 Add Image Gallery Management
**File**: `src/app/admin/dashboard/page.tsx`
**Changes**:
- Add "معرض الصور" tab showing all uploaded images as thumbnails
- Add delete button per image
- Show total count
**Risk**: Low.
**Impact**: Admin can manage uploaded images.

### 2.3 Improve Loading States
**File**: `src/app/admin/dashboard/page.tsx`
**Changes**:
- Add loading skeleton while videos fetch
- Show spinner during auth check instead of null
- Differentiate empty/loading/error states
**Risk**: Low.
**Impact**: Better UX during async operations.

### 2.4 Custom Confirmation Modal
**File**: `src/app/admin/dashboard/page.tsx` + new `ConfirmModal` component
**Changes**:
- Replace `window.confirm` with a styled modal
- Match site design system
**Risk**: Low.
**Impact**: Consistent UI for all interactions.

---

## Phase 3 — UI/UX

### 3.1 Add Skip-to-Content Link
**File**: `src/app/layout.tsx`
**Changes**:
- Add invisible skip link as first focusable element
- Target `#main-content`
**Risk**: None.
**Impact**: Accessibility improvement.

### 3.2 Add Focus Indicators
**Files**: All interactive components
**Changes**:
- Add `focus-visible:ring-2 focus-visible:ring-primary` to links, buttons, inputs
- Use Tailwind utility to apply globally
**Risk**: None.
**Impact**: Keyboard navigation visibility.

### 3.3 Improve Image Alt Text
**Files**: `src/components/gallery-preview.tsx`, `src/components/gallery-grid.tsx`
**Changes**:
- Use more descriptive alt text
- Add contextual descriptions where possible
**Risk**: None.
**Impact**: Screen reader improvement.

### 3.4 Standardize Typography
**Files**: `tailwind.config.ts`, `src/app/layout.tsx`
**Changes**:
- Load display font (Tajawal or Changa) via next/font
- Apply display font to headings
- Add missing `headline-sm` size
**Risk**: Low.
**Impact**: Better visual hierarchy.

### 3.5 Add Backdrop Blur to Mobile Menu
**File**: `src/components/header.tsx`
**Changes**:
- Add `backdrop-blur-2xl` to mobile menu overlay
- Improve close affordance
**Risk**: None.
**Impact**: Better mobile UX.

### 3.6 Add Gallery Image Loading Skeleton
**File**: `src/components/gallery-preview.tsx`
**Changes**:
- Show skeleton grid while images fetch
- Use same grid dimensions as final layout
**Risk**: None.
**Impact**: Perceived performance improvement.

### 3.7 Fix Footer Layout for Mobile
**File**: `src/components/footer.tsx`
**Changes**:
- Reduce mobile gap (12px instead of 48px)
- Keep desktop layout intact
**Risk**: None.
**Impact**: Better mobile spacing.

---

## Phase 4 — Polish

### 4.1 Add Security Headers
**File**: `next.config.ts` or `middleware.ts`
**Changes**:
- Add `Content-Security-Policy` (restrictive but not breaking)
- Add `X-Content-Type-Options: nosniff`
- Add `X-Frame-Options: DENY`
- Add `Referrer-Policy: strict-origin-when-cross-origin`
**Risk**: Medium. CSP can block inline styles.
**Impact**: Security improvement.

### 4.2 Add Lightbox Touch Support
**File**: `src/components/gallery-lightbox.tsx`
**Changes**:
- Add touch event handlers for swipe left/right
- Add touch indicator/dots
**Risk**: Low.
**Impact**: Mobile gallery UX.

### 4.3 Standardize Transition Durations
**File**: `tailwind.config.ts`
**Changes**:
- Define custom transition durations
- Set `duration-300` as default for all interactive elements
**Risk**: Low.
**Impact**: Visual consistency.

---

## Verification Checklist

- [ ] `npm run build` succeeds
- [ ] Admin login works with env vars
- [ ] Upload works with validation
- [ ] All pages render without errors
- [ ] Mobile menu works on all viewports
- [ ] Keyboard navigation works on all interactive elements
- [ ] Lightbox navigation works
- [ ] Gallery images load and display correctly
- [ ] Footer renders correctly on mobile and desktop
- [ ] Language toggle works on all pages

---

## Priority Matrix

| Item | Effort | Impact | Priority |
|------|--------|--------|----------|
| 1.1 Environment variables | Very Low | Critical | P0 |
| 1.2 Auth token | Low | Critical | P0 |
| 1.3 Middleware | Medium | Critical | P0 |
| 1.4 Upload validation | Low | High | P1 |
| 1.5 Rate limiting | Low | Medium | P1 |
| 2.1 Progress bar | Low | Medium | P2 |
| 2.2 Image management | Medium | High | P2 |
| 2.3 Loading states | Low | Medium | P2 |
| 3.1 Skip-to-content | Very Low | Medium | P1 |
| 3.2 Focus indicators | Low | High | P1 |
| 3.3 Alt text | Very Low | Medium | P2 |
| 3.4 Typography | Medium | High | P2 |
| 4.1 Security headers | Low | Medium | P2 |
| 4.2 Touch support | Low | Low | P3 |
| 4.3 Transitions | Very Low | Low | P3 |
