---
title: Background job processing, queue management, and async task handling
description: Background job processing, queue management, and async task handling
---

# Background job processing, queue management, and async task handling

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>background-jobs</code> | <strong>Category:</strong> backend | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# Background Jobs

## Purpose

Guide background job implementation for async task processing.

## When to Use

- Processing large data sets
- Sending emails
- Generating reports
- Running scheduled tasks

## Core Concepts

### Simple Background Processing

```typescript
// Using Promise-based approach
async function processImageUpload(imageId: string) {
  // Don't await - fire and forget
  processImage(imageId).catch(console.error);
}

// Using queue pattern
const jobQueue: Job[] = [];

function addJob(job: Job) {
  jobQueue.push(job);
  processQueue();
}

async function processQueue() {
  while (jobQueue.length > 0) {
    const job = jobQueue.shift()!;
    await executeJob(job);
  }
}
```

### Next.js Route Handler as Job Processor

```typescript
// app/api/cron/process-reports/route.ts
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await generateReports();
  return NextResponse.json({ success: true });
}
```

### Job Status Tracking

```typescript
interface Job {
  id: string;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}
```

## Best Practices

- Use idempotent jobs (safe to retry)
- Track job status and results
- Implement retry logic with backoff
- Set appropriate timeouts
- Monitor job queues
- Handle failures gracefully
- Log job execution

## Anti-Patterns

- Blocking the main thread
- Not handling job failures
- Missing retry logic
- No job status tracking
- Running too many concurrent jobs

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
