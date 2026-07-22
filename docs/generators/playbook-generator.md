---
title: Playbook Generator
description: Playbook generator for workspace components
---

# Playbook generator Generator

# Playbook Generator

**Purpose:** Generate production-quality playbooks that orchestrate agents, skills, and commands.

## Usage

When creating a new playbook, follow this generator's specifications exactly.

## Input Required

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | kebab-case, unique across playbooks |
| `goal` | Yes | What the playbook achieves |
| `trigger` | Yes | When to use this playbook |
| `content` | Yes | The playbook content (markdown) |

## Generation Process

### Step 1: Validate Input

```markdown
Check:
- [ ] name is kebab-case
- [ ] name is unique
- [ ] goal is clear and specific
- [ ] trigger is defined
- [ ] content is provided
```

### Step 2: Create File

```
~/.config/opencode/playbooks/{name}.md
```

### Step 3: Generate Content Structure

```markdown
# Playbook: Title

**Goal:** [What this achieves]
**Trigger:** [When to use]

**Inputs:**
- [Input 1]
- [Input 2]

**Outputs:**
- [Output 1]
- [Output 2]

----|------|
| `agent-name` | What this agent does |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `skill-name` | When to load this skill |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/command-name` | When to use this command |

---

## Process

### Step 1: [Phase Name] ([time estimate])
[What to do]

### Step 2: [Phase Name] ([time estimate])
[What to do]

---

## Validation Steps
- [ ] [Check 1]
- [ ] [Check 2]

## Success Criteria
- [Criterion 1]
- [Criterion 2]

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| [Pitfall] | [Why] | [Correct] |
```

### Step 4: Quality Checklist

```markdown
Before publishing:
- [ ] All 10 required sections present
- [ ] Goal is specific and measurable
- [ ] Trigger is clear
- [ ] Required agents/skills/commands are real
- [ ] Process has time estimates
- [ ] Validation steps are specific
- [ ] Success criteria are measurable
- [ ] Pitfalls are practical
```

### Step 5: Update Manifests

After creating playbook:
1. Update AGENTS.md playbook count
2. Update MANIFEST.md if exists
