---
title: File upload patterns, Supabase Storage integration, image processing, and CDN optimization
description: File upload patterns, Supabase Storage integration, image processing, and CDN optimization
---

# File upload patterns, Supabase Storage integration, image processing, and CDN optimization

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>storage-patterns</code> | <strong>Category:</strong> backend | <strong>Priority:</strong> medium | <strong>Level:</strong> framework
</div>

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
