---
name: background-jobs
description: Background job processing, queue management, and async task handling
category: backend
level: concept
priority: medium
dependencies: []
related_skills: ["api-design", "nextjs-route-handlers"]
related_agents: ["backend"]
activation_rules:
  - keywords: ["background job", "queue", "async", "worker", "cron", "scheduled"]
---

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
