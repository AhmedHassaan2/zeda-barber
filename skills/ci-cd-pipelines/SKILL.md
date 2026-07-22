---
name: ci-cd-pipelines
description: GitHub Actions CI/CD pipeline setup, testing automation, and deployment workflows
category: devops
level: concept
priority: high
dependencies: []
related_skills: ["vercel-deployment", "testing-strategy"]
related_agents: ["devops"]
activation_rules:
  - keywords: ["CI", "CD", "GitHub Actions", "pipeline", "workflow", "automation"]
  - file_pattern: ".github/workflows/**/*"
---

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
