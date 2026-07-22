# Command Template

Use this template when creating new commands with `/create-agent`.

---

```markdown
---
name: command-name
description: [One-line description of what this command does]
allowed_tools: ["Read", "Write", "Edit", "Grep", "Glob", "Bash"]
agent: [agent-name to delegate to]
---

# /command-name — Command Title

[Detailed description of what this command does]

## Usage

```
/command-name                    # Default behavior
/command-name [argument]         # With argument
/command-name --flag             # With flag
```

## Features

### 1. [Feature Name]
- What it does
- How it works

### 2. [Feature Name]
- What it does
- How it works

## Process

1. [Step 1]
2. [Step 2]
3. [Step 3]
4. Generate report
5. Present findings

## Output Format

```markdown
## [Report Title]

### Status: [SUCCESS/WARNING/ERROR]

### Findings
1. [Finding 1]
2. [Finding 2]

### Recommendations
- [Action 1]
- [Action 2]
```

## Conventions

- [Convention 1]
- [Convention 2]
- [Convention 3]
```

---

## Metadata Guidelines

| Field | Values | Notes |
|-------|--------|-------|
| `name` | kebab-case | Must match directory name |
| `description` | One line | Shown in command list |
| `allowed_tools` | Array | Tools the command can use |
| `agent` | Agent name | Which agent handles the command |

## Tool Selection Guide

| Command Type | Tools | Reason |
|-------------|-------|--------|
| Read-only audit | Read, Grep, Glob | No modifications |
| File creation | Read, Write, Glob | Create new files |
| Refactoring | Read, Edit, Grep, Glob | Modify existing files |
| Build/deploy | Read, Bash, Grep | Run commands |
| Full workflow | All needed | Varies |
