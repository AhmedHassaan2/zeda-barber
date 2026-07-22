---
date: 2026-07-19
category: preferences
tags: [git, commits, branches, workflow, conventions]
project: shared
severity: none
---

# Git Workflow Conventions

## Context

Consistent git history makes it easy to understand project evolution, find when bugs were introduced, and revert changes safely.

## Content

**Commit Message Format:**
```
type(scope): description

[optional body]
```

**Types:**
| Type | When to Use | Example |
|---|---|---|
| `feat` | New feature | `feat(auth): add login page` |
| `fix` | Bug fix | `fix(api): handle null response` |
| `chore` | Maintenance | `chore(deps): update next to 16.0` |
| `refactor` | Code restructuring | `refactor(components): extract form hooks` |
| `docs` | Documentation | `docs(readme): add setup instructions` |
| `test` | Tests | `test(api): add user endpoint tests` |
| `style` | Formatting | `style: run prettier` |
| `perf` | Performance | `perf(images): add lazy loading` |

**Rules:**
- Descriptive messages — explain what and why, not how
- Scope is the affected area (component, feature, or `deps`)
- No force pushes to `main`
- One logical change per commit
- No commits with secrets or API keys

**Branch Strategy:**
```
main          ← production-ready code
├── feat/*    ← feature branches
├── fix/*     ← bug fix branches
└── chore/*   ← maintenance branches
```

**Before Committing:**
```bash
git status
git diff
git log --oneline -5  # Match recent style
# Then commit
```

## Application

Every commit follows this format. Run `git diff` before committing to verify only intended changes are staged.

## Related

- `2026-07-19_typescript-conventions.md` — Code conventions
- `2026-07-19_file-structure.md` — Project structure
