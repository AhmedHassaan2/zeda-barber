---
title: GitHub Actions CI/CD pipeline setup, testing automation, and deployment workflows
description: GitHub Actions CI/CD pipeline setup, testing automation, and deployment workflows
---

# GitHub Actions CI/CD pipeline setup, testing automation, and deployment workflows

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>ci-cd-pipelines</code> | <strong>Category:</strong> devops | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# CI/CD Pipelines

## Purpose

Guide CI/CD pipeline implementation for automated testing and deployment.

## When to Use

- Setting up CI/CD pipelines
- Automating testing
- Configuring deployment workflows
- Implementing quality gates

## Core Concepts

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build

  e2e:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
```

### Quality Gates

```yaml
# Must pass before merge
- Linting (no errors)
- Type checking (no errors)
- Unit tests (100% pass)
- Build (successful)
- E2E tests (critical paths)
```

### Deployment Pipeline

```yaml
# Deploy on merge to main
deploy:
  needs: [test, e2e]
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

## Best Practices

- Run tests on every PR
- Use caching for faster builds
- Parallelize independent jobs
- Set up branch protection rules
- Use secrets for sensitive data
- Monitor pipeline performance
- Keep pipelines fast (< 10 minutes)

## Anti-Patterns

- Skipping tests for speed
- Hardcoding secrets in workflows
- Not caching dependencies
- Long-running pipelines
- Ignoring flaky tests

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
