# Skill Template

Use this template when creating new skills with `/create-skill`.

---

```markdown
---
name: skill-name
description: [One-line description of what this skill covers]
category: [frontend|backend|database|security|quality|architecture|devops|ai|documentation|i18n|analytics|design|observability]
level: [concept|framework|project]
priority: [high|medium|low]
dependencies: []
related_skills: []
related_agents: []
activation_rules:
  - keywords: ["keyword1", "keyword2", "keyword3"]
  - file_pattern: "src/**/*.ext"
---

# Skill Name

## Purpose

[One paragraph explaining what this skill helps with and why it exists]

## When to Use

- [Use case 1]
- [Use case 2]
- [Use case 3]

## Core Concepts

### Concept 1

[Explanation with code example]

```typescript
// Code example
```

### Concept 2

[Explanation with code example]

### Concept 3

[Table or diagram if applicable]

## Best Practices

- [Practice 1]
- [Practice 2]
- [Practice 3]

## Anti-Patterns

- [Anti-pattern 1 — what not to do]
- [Anti-pattern 2 — what not to do]
- [Anti-pattern 3 — what not to do]

## Example

[Complete working example showing the skill in action]
```

---

## Metadata Guidelines

| Field | Values | Notes |
|-------|--------|-------|
| `name` | kebab-case | Must be unique across all skills |
| `category` | Single category | Determines which agent loads it |
| `level` | concept / framework / project | concept=universal, framework=tech-specific, project=codebase-specific |
| `priority` | high / medium / low | Affects loading order when multiple skills match |
| `dependencies` | Array of skill names | Skills that should be loaded first |
| `related_skills` | Array of skill names | Complementary skills |
| `related_agents` | Array of agent names | Agents that typically use this skill |

## Quality Standards

- Minimum 80 lines for concept skills
- Minimum 100 lines for framework skills
- Must include at least 2 code examples
- Must include anti-patterns section
- Must include practical best practices (not generic advice)
- Metadata must be complete and accurate
