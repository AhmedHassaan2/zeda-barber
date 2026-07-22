---
name: code-review-standards
description: Code review process, quality checklist, feedback guidelines, and approval criteria
category: quality
level: concept
priority: high
dependencies: []
related_skills: ["refactoring-patterns", "clean-architecture"]
related_agents: ["reviewer"]
activation_rules:
  - keywords: ["review", "PR", "pull request", "merge request", "approval"]
---

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
