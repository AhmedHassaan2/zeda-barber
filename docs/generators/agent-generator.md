---
title: Agent Generator
description: Agent generator for workspace components
---

# Agent generator Generator

# Agent Generator

**Purpose:** Generate production-quality agents with proper prompts, permissions, and metadata.

## Usage

When creating a new agent, follow this generator's specifications exactly.

## Input Required

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | kebab-case, unique across workspace |
| `description` | Yes | One-line description |
| `mode` | Yes | build, subagent, or plan |
| `temperature` | Yes | 0.0-0.2 analytical, 0.2-0.5 creative |
| `permissions` | Yes | read, write, edit, bash, grep, glob, webfetch |
| `content` | Yes | The agent prompt (markdown) |

## Generation Process

### Step 1: Validate Input

```markdown
Check:
- [ ] name is kebab-case
- [ ] name is unique
- [ ] description is non-empty
- [ ] mode is valid (build, subagent, plan)
- [ ] temperature is 0.0-1.0
- [ ] permissions are valid keys
- [ ] content is provided
```

### Step 2: Create File

```
~/.config/opencode/agents/{name}.md
```

### Step 3: Generate Metadata

```yaml
```

### Step 4: Generate Content Structure

```markdown
# Agent Title

You are a [role] specializing in [domain].

## Core Competencies

1. **[Area 1]** — [What this covers]
2. **[Area 2]** — [What this covers]
3. **[Area 3]** — [What this covers]

## Decision Rules

- [Rule 1]
- [Rule 2]

## Analysis Areas

1. **[Area 1]** — What to look for
2. **[Area 2]** — What to look for

## Output Format

[Expected output structure]

## Rules

- [Rule 1]
- [Rule 2]
```

### Step 5: Quality Checklist

```markdown
Before publishing:
- [ ] Metadata is complete
- [ ] Content is >80 lines
- [ ] Has clear role definition
- [ ] Has decision rules
- [ ] Has output format
- [ ] Has specific rules (not generic)
- [ ] Permissions are appropriate for role
- [ ] Temperature matches use case
```

### Step 6: Update Manifests

After creating agent:
1. Update AGENTS.md agent count
2. Update MANIFEST.md if exists
3. Add to dependency graph
4. Add routing rules if new domain

## Template

See `~/.config/opencode/templates/agent-template.md` for the full template.
