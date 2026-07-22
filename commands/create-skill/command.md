---
name: create-skill
description: Create a new OpenCode skill with proper structure and metadata
allowed_tools: ["Read", "Write", "Edit", "Glob"]
agent: context-engineer
---

# /create-skill — Create New Skill

Create a new OpenCode skill with proper structure and metadata.

## Usage

```
/create-skill my-skill        # Create in global skills
/create-skill my-skill --project  # Create in project skills
```

## Skill Template

```markdown
---
name: skill-name
description: Brief description of what this skill does
category: [frontend|backend|database|security|quality|architecture|devops|ai|documentation|i18n|analytics|design|observability]
level: [concept|framework|project]
priority: [high|medium|low]
dependencies: []
related_skills: []
related_agents: []
activation_rules:
  - keywords: ["keyword1", "keyword2"]
  - file_pattern: "src/**/*.ext"
---

# Skill Name

## Purpose
What this skill helps with.

## When to Use
- Use case 1
- Use case 2

## Core Concepts
### Concept 1
Details...

### Concept 2
Details...

## Best Practices
- Practice 1
- Practice 2

## Anti-Patterns
- Anti-pattern 1
- Anti-pattern 2

## Example
Code example...
```

## Process

1. Parse skill name and options
2. Determine skill category
3. Create skill directory
4. Create SKILL.md with template
5. Add activation rules
6. Validate metadata
7. Report creation summary

## Conventions

- Use kebab-case for skill names
- Include all required metadata
- Provide clear purpose and use cases
- Include code examples
- Document best practices and anti-patterns
