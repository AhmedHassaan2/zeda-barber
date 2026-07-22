---
title: Command Generator
description: Command generator for workspace components
---

# Command generator Generator

# Command Generator

**Purpose:** Generate production-quality commands with proper workflows and agent delegation.

## Usage

When creating a new command, follow this generator's specifications exactly.

## Input Required

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | kebab-case, unique across workspace |
| `description` | Yes | One-line description |
| `allowed_tools` | Yes | Array of tool names |
| `agent` | No | Agent to delegate to |
| `content` | Yes | The command workflow (markdown) |

## Generation Process

### Step 1: Validate Input

```markdown
Check:
- [ ] name is kebab-case
- [ ] name matches directory name
- [ ] description is non-empty
- [ ] allowed_tools are valid tool names
- [ ] agent exists (if specified)
- [ ] content is provided
```

### Step 2: Create Directory and File

```
~/.config/opencode/commands/{name}/command.md
```

### Step 3: Generate Metadata

```yaml
```

### Step 4: Generate Content Structure

```markdown
# /{name} — Command Title

[Detailed description]

## Usage

```
/{name}                    # Default
/{name} [argument]         # With argument
```

## Process

1. [Step 1]
2. [Step 2]
3. [Step 3]
4. Generate report

## Output Format

```markdown
## Report Title

### Status: [SUCCESS/WARNING/ERROR]

### Findings
1. [Finding 1]

### Recommendations
- [Action 1]
```

## Conventions

- [Convention 1]
- [Convention 2]
```

### Step 5: Quality Checklist

```markdown
Before publishing:
- [ ] Metadata is complete
- [ ] name matches directory
- [ ] Has clear usage examples
- [ ] Has defined process steps
- [ ] Has output format
- [ ] Has conventions
- [ ] Tools are appropriate for task
- [ ] Agent is appropriate (if specified)
```

### Step 6: Update Manifests

After creating command:
1. Update AGENTS.md command count
2. Update MANIFEST.md if exists

## Template

See `~/.config/opencode/templates/command-template.md` for the full template.
