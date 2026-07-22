---
title: Image formats, responsive images, lazy loading, and Supabase Storage optimization
description: Image formats, responsive images, lazy loading, and Supabase Storage optimization
---

# Image formats, responsive images, lazy loading, and Supabase Storage optimization

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>image-optimization</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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

## When to Use

- File patterns match the skill's activation rules
- Keywords in the conversation match the skill's domain
- A related agent delegates to this skill

## When NOT to Use

- When the task falls outside this skill's domain
- When a more specific skill exists for the task
- When the skill's dependencies are not met

## Related Agents

See [Agents Registry](/agents/) for agents that use this skill.

## Related Skills

See [Skills Registry](/skills/) for related skills in the same cluster.

## Customization Guide

1. Copy the skill to `.opencode/skills/` in your project
2. Modify the activation rules to match your project patterns
3. Add project-specific examples and templates
4. Update the related agents and skills references

## Extension Guide

1. Add new sections to the SKILL.md file
2. Include code examples for new patterns
3. Update anti-patterns with new findings
4. Maintain cross-references to related skills
5. Keep the skill focused on its core purpose
