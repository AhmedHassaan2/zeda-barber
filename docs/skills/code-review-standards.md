---
title: Code review process, quality checklist, feedback guidelines, and approval criteria
description: Code review process, quality checklist, feedback guidelines, and approval criteria
---

# Code review process, quality checklist, feedback guidelines, and approval criteria

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>code-review-standards</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Code Review Standards

## Purpose

Guide code review process with quality checklists and feedback guidelines.

## When to Use

- Reviewing pull requests
- Setting up review processes
- Training new reviewers
- Establishing quality gates

## Core Concepts

### Review Checklist

**Correctness**
- Does the code solve the intended problem?
- Are edge cases handled?
- Are error paths handled?

**Security**
- Are inputs validated?
- Are secrets handled properly?
- Is authentication/authorization checked?

**Quality**
- Is the code readable and maintainable?
- Are there code smells (duplication, long functions)?
- Are types explicit (no `any`)?

**Testing**
- Are critical paths tested?
- Are tests meaningful (not just coverage)?
- Do tests cover error cases?

### Feedback Guidelines

```
// Good: Specific, actionable
"Consider using a Set here for O(1) lookups instead of Array.includes at line 45"

// Bad: Vague, non-actionable
"This could be better"
```

### Review Priorities

1. **Critical**: Security, data loss, corruption
2. **Major**: Bugs, performance issues
3. **Minor**: Style, naming, minor improvements
4. **Nit**: Typos, formatting

## Best Practices

- Review within 24 hours
- Focus on critical and major issues
- Provide context and examples
- Approve with minor suggestions
- Block only for critical issues
- Document review decisions

## Anti-Patterns

- Rubber-stamping approvals
- Blocking for style preferences
- Not reviewing test quality
- Ignoring security implications
- Reviewing too much at once

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
