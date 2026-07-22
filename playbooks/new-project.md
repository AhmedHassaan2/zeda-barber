# Playbook: New Project Setup

**Purpose:** Standard procedure for setting up a new project with the OpenCode workspace.

## Prerequisites

- Node.js 20+ installed
- npm installed
- Supabase account (for database/auth)
- Vercel account (for deployment)

## Steps

### 1. Project Initialization

```bash
npx create-next-app@latest my-project --typescript --tailwind --app --src-dir --import-alias "@/*"
cd my-project
```

### 2. Project Workspace Setup

```bash
mkdir -p .opencode/agents .opencode/skills .opencode/commands
```

### 3. Create Project AGENTS.md

Create `.opencode/AGENTS.md` with:

```markdown
# [Project Name] - Project Rules

## Tech Stack
- Next.js 16 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Supabase

## Conventions
- [Project-specific conventions]

## Environment Variables
[Document required env vars]

## Known Issues
[Track known issues]
```

### 4. Create Project opencode.json

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [".opencode/AGENTS.md"]
}
```

### 5. Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install -D @types/node vitest @playwright/test
```

### 6. Configure Environment

Create `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 7. Create Database Schema

```bash
supabase init
supabase migration new initial_schema
```

### 8. Verify Workspace

Run `/health-check` to validate workspace integration.

### 9. First Commit

```bash
git add .
git commit -m "chore: initial project setup with workspace"
```

## Post-Setup Checklist

- [ ] Project AGENTS.md created
- [ ] Environment variables documented
- [ ] Database schema created
- [ ] Build passes (`npm run build`)
- [ ] Workspace health check passes
