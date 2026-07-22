---
name: storage-patterns
description: File upload patterns, Supabase Storage integration, image processing, and CDN optimization
category: backend
level: framework
priority: medium
dependencies: ["supabase-patterns"]
related_skills: ["supabase-patterns", "image-optimization"]
related_agents: ["backend"]
activation_rules:
  - keywords: ["storage", "upload", "file", "image", "CDN", "blob"]
---

# Storage Patterns

## Purpose

Guide file storage implementation with Supabase Storage.

## When to Use

- Implementing file uploads
- Setting up image processing
- Configuring CDN delivery
- Managing storage buckets

## Core Concepts

### Supabase Storage Upload

```typescript
// src/lib/storage.ts
import { supabaseAdmin } from '@/lib/supabase';

export async function uploadImage(
  file: File,
  bucket: string = 'uploads'
): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `images/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
}
```

### Client-Side Upload

```tsx
'use client';

function ImageUploader() {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      console.log('Uploaded:', url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  }

  return <input type="file" accept="image/*" onChange={handleUpload} />;
}
```

### Storage Buckets

```
uploads/          # User uploads
  images/         # Image files
  documents/      # PDFs, docs
avatars/          # User avatars
thumbnails/       # Generated thumbnails
```

## Best Practices

- Validate file types and sizes
- Process images server-side
- Use CDN for delivery
- Set appropriate cache headers
- Implement access controls
- Handle upload failures gracefully
- Clean up unused files

## Anti-Patterns

- Allowing all file types
- Not validating file sizes
- Storing files without organization
- Not using CDN
- Missing access controls
