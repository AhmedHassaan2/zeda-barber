---
title: Skill Generator
description: Skill generator for workspace components
---

# Skill generator Generator

# Skill Generator

**Purpose:** Generate production-quality skills that are indistinguishable from manually engineered ones.

## Usage

When creating a new skill, follow this generator's specifications exactly.

## Input Required

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | kebab-case, unique across workspace |
| `description` | Yes | One-line description |
| `category` | Yes | One of: frontend, backend, database, security, quality, architecture, devops, ai, documentation, i18n, analytics, design, observability |
| `level` | Yes | concept, framework, or project |
| `content` | Yes | The skill content (markdown) |

## Generation Process

### Step 1: Validate Input

```markdown
Check:
- [ ] name is kebab-case
- [ ] name is unique (not in existing skills)
- [ ] description is non-empty
- [ ] category is valid
- [ ] level is valid
- [ ] content is provided
```

### Step 2: Create Directory

```
~/.config/opencode/skills/{name}/SKILL.md
```

### Step 3: Generate Metadata

```yaml
```

### Step 4: Generate Content Structure

```markdown
# Skill Title

## Purpose
[One paragraph]

## When to Use
- [Use case 1]
- [Use case 2]

## Core Concepts
### Concept 1
[With code example]

### Concept 2
[With code example]

## Best Practices
- [Practice 1]
- [Practice 2]

## Anti-Patterns
- [Anti-pattern 1]

## Example
[Complete working example]
```

### Step 5: Quality Checklist

```markdown
Before publishing:
- [ ] Metadata is complete and valid
- [ ] Content is >80 lines for framework/project, >50 for concept
- [ ] At least 2 code examples
- [ ] Anti-patterns section exists
- [ ] Best practices are specific (not generic)
- [ ] No placeholder text (TODO, FIXME)
- [ ] Naming conventions followed
```

### Step 6: Update Manifests

After creating skill:
1. Update AGENTS.md skill count
2. Update MANIFEST.md if exists
3. Add to dependency graph if cross-references exist

## Template

See `~/.config/opencode/templates/skill-template.md` for the full template.
