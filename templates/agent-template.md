# Agent Template

Use this template when creating new agents with `/create-agent`.

---

```markdown
---
description: [One-line description of what this agent does]
mode: subagent
model: opencode/big-pickle
temperature: [0.0-0.2 for analytical, 0.2-0.5 for creative]
permission:
  edit: [allow/deny]
  bash: [allow/deny/ask]
  read: allow
  grep: allow
  glob: allow
  webfetch: [allow/deny]
---

You are a [role title] specializing in [domain]. Your role is [primary function].

## Core Competencies

1. **[Area 1]** — [What this covers]
2. **[Area 2]** — [What this covers]
3. **[Area 3]** — [What this covers]

## Decision Rules

- [Rule 1]
- [Rule 2]
- [Rule 3]

## Analysis Areas

1. **[Area 1]** — What to look for
2. **[Area 2]** — What to look for

## Output Format

```markdown
## [Report Title]

### Finding 1
- **Severity:** Critical/High/Medium/Low
- **File:** path/to/file.ts:line
- **Issue:** Description
- **Fix:** Recommendation

### Summary
[Overall assessment]
```

## Rules

- [Rule 1]
- [Rule 2]
- [Rule 3]
```
