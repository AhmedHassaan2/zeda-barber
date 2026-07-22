---
name: image-gallery
description: Image gallery with upload, organization, and display management
category: project
level: project
priority: medium
dependencies: ["supabase-patterns", "storage-patterns"]
related_skills: ["storage-patterns", "image-optimization"]
related_agents: ["frontend", "backend"]
project: zeda-barbershop
activation_rules:
  - keywords: ["gallery", "image", "photo", "upload", "album"]
  - file_pattern: "src/app/gallery/**/*"
---

# Image Gallery

## Purpose

Guide image gallery implementation with upload, organization, and display features.

## Current Implementation

Located in `src/app/gallery/page.tsx`:
- Tab navigation (Images/Videos)
- Image grid display
- Lazy loading
- Responsive layout

## Architecture

```
src/app/gallery/
├── page.tsx                 # Gallery page with tabs
├── loading.tsx              # Loading state
└── components/
    ├── GalleryGrid.tsx      # Image grid
    ├── ImageCard.tsx        # Individual image card
    ├── VideoPlayer.tsx      # Video player
    └── GalleryFilter.tsx    # Category filter
```

## Database Schema

```sql
-- Gallery images
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text TEXT,
  category TEXT,
  display_order INTEGER,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery videos
CREATE TABLE gallery_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  description TEXT,
  display_order INTEGER,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Key Features

### 1. Image Display
- Responsive grid layout
- Lazy loading
- Lightbox view
- Image categories

### 2. Upload Management
- Drag-and-drop upload
- Image compression
- Thumbnail generation
- Category assignment

### 3. Organization
- Category filtering
- Featured images
- Display order management
- Bulk operations

## Integration Points

- **Supabase Storage**: Image storage
- **Image Processing**: Sharp for compression
- **CDN**: Fast delivery

## Improvement Opportunities

1. Add image editing capabilities
2. Implement bulk upload
3. Add watermark support
4. Create image compression pipeline
5. Add SEO metadata for images
