---
name: image-optimization
description: Image formats, responsive images, lazy loading, and Supabase Storage optimization
category: quality
level: concept
priority: high
dependencies: []
related_skills: ["web-performance", "caching-strategies"]
related_agents: ["performance", "frontend"]
activation_rules:
  - keywords: ["image", "img", "photo", "thumbnail", "WebP", "AVIF", "srcset"]
---

# Image Optimization

## Purpose

Guide image optimization for fast loading and visual quality.

## When to Use

- Adding images to pages
- Implementing responsive images
- Optimizing uploaded images
- Setting up image storage

## Core Concepts

### Format Selection

| Format | Use Case | Browser Support |
|--------|----------|-----------------|
| WebP | General use | 97%+ |
| AVIF | Highest quality | 92%+ |
| JPEG | Photos (legacy) | 100% |
| PNG | Transparency | 100% |
| SVG | Icons, illustrations | 100% |

### Responsive Images

```tsx
<picture>
  <source srcset="/image.avif" type="image/avif" />
  <source srcset="/image.webp" type="image/webp" />
  <img
    src="/image.jpg"
    alt="Description"
    width={800}
    height={600}
    loading="lazy"
    className="w-full h-auto"
  />
</picture>
```

### Supabase Storage Optimization

```typescript
// Upload optimized image
const optimized = await sharp(buffer)
  .resize(1200, 1200, { fit: 'inside' })
  .webp({ quality: 80 })
  .toBuffer();

// Generate thumbnails
const thumbnail = await sharp(buffer)
  .resize(400, 400, { fit: 'cover' })
  .webp({ quality: 70 })
  .toBuffer();
```

## Best Practices

- Use modern formats (WebP, AVIF)
- Set explicit width and height (prevents CLS)
- Implement lazy loading for below-fold images
- Use responsive images with srcset
- Compress images (80% quality for photos)
- Use CDN for image delivery
- Generate thumbnails for galleries

## Anti-Patterns

- Using PNG for photos
- Not setting width/height (causes CLS)
- Loading all images eagerly
- Using large images without resizing
- Not compressing uploaded images
