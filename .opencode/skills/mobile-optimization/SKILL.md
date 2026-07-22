---
name: mobile-optimization
description: Mobile-first optimization, touch interactions, and progressive web app features
category: project
level: project
priority: medium
dependencies: ["responsive-design", "web-performance"]
related_skills: ["responsive-design", "web-performance", "image-optimization"]
related_agents: ["frontend", "performance"]
project: zeda-barbershop
activation_rules:
  - keywords: ["mobile", "PWA", "touch", "responsive", "viewport"]
---

# Mobile Optimization

## Purpose

Guide mobile-first optimization for the barber shop website.

## Current Status

- Responsive design: ✅ Implemented
- Mobile navigation: ⚠️ Needs improvement
- Touch targets: ⚠️ Need verification
- PWA features: ❌ Not implemented

## Optimization Areas

### 1. Responsive Design
- Mobile-first CSS
- Flexible layouts
- Responsive images
- Touch-friendly controls

### 2. Performance
- Lazy loading
- Code splitting
- Image optimization
- Minimal JavaScript

### 3. Touch Interactions
- Touch targets (48x48px minimum)
- Swipe gestures
- Pull-to-refresh
- Haptic feedback

### 4. PWA Features
- Service worker
- Offline support
- App manifest
- Add to home screen

## Implementation Checklist

### Responsive
- [ ] Test all breakpoints
- [ ] Verify touch targets
- [ ] Check text readability
- [ ] Test form inputs

### Performance
- [ ] Optimize images
- [ ] Implement lazy loading
- [ ] Minimize JavaScript
- [ ] Enable compression

### PWA
- [ ] Create manifest.json
- [ ] Add service worker
- [ ] Implement offline support
- [ ] Test add to home screen

## Code Examples

### Touch-Friendly Button

```tsx
<button className="
  min-h-[48px] min-w-[48px]
  p-4
  touch-manipulation
">
  Book Now
</button>
```

### Responsive Image

```tsx
<img
  src="/image.jpg"
  alt="Description"
  className="w-full h-auto"
  loading="lazy"
  decoding="async"
/>
```

## Improvement Opportunities

1. Implement service worker
2. Add offline booking capability
3. Create app-like navigation
4. Add push notifications
5. Implement background sync
