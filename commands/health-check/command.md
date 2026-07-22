---
name: health-check
description: Comprehensive workspace health check with inventory, validation, cross-references, and fix recommendations
allowed_tools: ["Read", "Grep", "Glob", "Bash"]
agent: context-engineer
---

# /health-check — Workspace Health Check

Perform comprehensive workspace health check, validation, and integrity audit.

## Usage

```
/health-check                 # Full workspace health check
/health-check --quick         # Quick validation only (inventory + config)
```

## Process

### 1. Load Validate-Workspace Skill

Load the `validate-workspace` skill for detailed validation rules and report format.

### 2. Inventory Count

Count all workspace components:

```
Global Workspace (~/.config/opencode/):
  - Agents: count *.md files in agents/
  - Skills: count SKILL.md files in skills/*/
  - Commands: count command.md files in commands/*/
  - Playbooks: count *.md files in playbooks/
  - Templates: count *.md files in templates/

Project Workspace (.opencode/):
  - Agents: count *.md files in agents/ (if exists)
  - Skills: count SKILL.md files in skills/*/ (if exists)
  - Commands: count command.md files in commands/*/ (if exists)
```

### 3. Configuration Validation

- opencode.json exists and is valid JSON
- AGENTS.md exists and has valid structure
- Required directories exist (agents/, skills/, commands/)
- No duplicate files

### 4. Agent Validation

For each agent file:
- Valid YAML frontmatter with required fields (description, mode, temperature, permission)
- Description is non-empty
- Mode is valid (build, subagent, or plan)
- No duplicate agent names
- Agent name matches filename

### 5. Skill Validation

For each skill directory:
- SKILL.md exists
- Valid YAML frontmatter (name, description, category, level, priority)
- Category is valid
- Level is valid
- Name matches directory name
- Content is non-trivial (>50 lines)

### 6. Command Validation

For each command directory:
- command.md exists
- Valid YAML frontmatter (name, description, allowed_tools, agent)
- name matches directory name
- agent reference exists

### 7. Cross-Reference Validation

- Agent→skill references point to existing skills
- Skill→agent references point to existing agents
- Command→agent references point to existing agents
- Skill→skill dependencies reference existing skills
- AGENTS.md manifest counts match actual files

### 8. Project Configuration (if .opencode exists)

- .opencode/opencode.json valid
- .opencode/AGENTS.md exists
- Project agents/skills/commands valid
- No conflicts with global workspace

### 9. Generate Health Report

Follow the report format from the `validate-workspace` skill.

## Output Format

```markdown
## Workspace Health Report

**Date:** YYYY-MM-DD
**Status:** HEALTHY / WARNING / CRITICAL

### Inventory
| Component | Global | Project | Total |
|-----------|--------|---------|-------|
| Agents | X | X | X |
| Skills | X | X | X |
| Commands | X | X | X |
| Playbooks | X | - | X |
| Templates | X | - | X |

### Validation Results
[Pass/fail for each check area]

### Issues Found
1. [CRITICAL/WARNING/INFO] Description
   - File: path
   - Fix: recommendation

### Recommendations
- Priority actions
```

## Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| CRITICAL | Broken functionality | Fix immediately |
| WARNING | Degraded quality | Fix soon |
| INFO | Suggestions | Optional |

## Anti-Patterns

- Skipping validation after bulk changes
- Ignoring warnings (they become critical)
- Not re-validating after applying fixes

