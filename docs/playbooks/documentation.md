---
title: Documentation Playbook
description: Engineering playbook for documentation workflow
---

# Documentation Playbook

# Playbook: Documentation

**Goal:** Create or update documentation that is accurate, useful, and maintainable.

**Trigger:** New feature, API change, architecture decision, onboarding need, documentation gap.

**Inputs:**
- What needs documentation
- Target audience (developers, users, AI agents)
- Documentation type (README, API docs, ADR, component docs)

**Outputs:**
- Documentation files
- Updated cross-references
- Accurate examples

----|------|
| `docs-writer` | Primary author — documentation creation |
| `context-engineer` | Workspace docs — AGENTS.md, skill docs |
| `reviewer` | Verify documentation accuracy |
| `frontend` | Component documentation |
| `backend` | API documentation |
| `architect` | Architecture documentation |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `technical-writing` | Always — writing quality |
| `api-documentation` | API endpoint documentation |
| `adr-methodology` | Architecture Decision Records |
| `readme-patterns` | Project README creation |
| `changelog-management` | Changelog updates |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/generate-docs` | For new feature or API documentation |
| `/review` | Verify documentation quality |

---

## Process

### Step 1: Identify Need (5 min)

1. **What is missing?** — README, API docs, ADR, inline comments?
2. **Who needs it?** — New developer, AI agent, end user?
3. **What format?** — Markdown, JSDoc, code comments, wiki?
4. **What scope?** — Project-level, module-level, function-level?

### Step 2: Plan Structure (5 min)

1. **Outline** — Sections and hierarchy
2. **Examples** — What code examples are needed?
3. **Cross-references** — What else should be linked?
4. **Maintenance** — How will this be kept up to date?

### Step 3: Write (varies)

Follow these principles:
- **Start with why** — Explain the purpose before the how
- **Show, don't just tell** — Include working code examples
- **Keep it current** — Document what exists, not what was planned
- **Be specific** — Avoid vague statements
- **Use consistent format** — Headers, code blocks, tables

Documentation types:

**README.md:**
```markdown
# Project Name
One-line description.

## Features
- Feature 1
- Feature 2

## Quick Start
1. Install
2. Configure
3. Run

## Architecture
Brief overview.

## Contributing
Guidelines.
```

**API Documentation:**
```markdown
## Endpoint: POST /api/resource

### Description
What this endpoint does.

### Request
- Body: { field: type }
- Headers: Authorization: Bearer <token>

### Response
- 200: { field: type }
- 400: { error: string }
- 401: { error: string }

### Example
\`\`\`typescript
const response = await fetch('/api/resource', {
  method: 'POST',
  body: JSON.stringify({ field: 'value' }),
});
\`\`\`
```

**ADR:**
```markdown
# ADR-XXX: Title

## Status
Accepted

## Context
What is the issue?

## Decision
What did we decide?

## Consequences
What are the trade-offs?
```

### Step 4: Review (10 min)

1. **Accuracy** — Is everything correct?
2. **Completeness** — Are all cases covered?
3. **Clarity** — Can a new developer understand?
4. **Examples** — Do they work?
5. **Links** — Do cross-references point correctly?

### Step 5: Publish (5 min)

1. **Commit** — `docs(scope): description`
2. **Verify links** — All references work
3. **Update related docs** — Cross-references

---

## Validation Steps

- [ ] Documentation is accurate and current
- [ ] Code examples are correct and runnable
- [ ] Cross-references are valid
- [ ] Target audience can understand
- [ ] Format is consistent with existing docs
- [ ] No placeholder text remains

## Success Criteria

- Documentation fills the identified gap
- Examples work and demonstrate the concept
- Documentation will be maintained (clear ownership)
- Cross-references are accurate

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Documenting planned features | Misleads readers | Document what exists |
| Outdated documentation | Worse than no documentation | Keep docs current, delete stale |
| No examples | Hard to understand | Include working examples |
| Too much detail | Readers skip it | Be concise, link to details |
| Documentation in code only | Hard to find | Put docs where users look |
| No cross-references | Disconnected information | Link related documentation |

## Related Commands

See [Commands Registry](/commands/) for commands used in this playbook.

## Related Agents

See [Agents Registry](/agents/) for agents involved in this playbook.
