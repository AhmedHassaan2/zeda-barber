---
name: validate-workspace
description: Comprehensive workspace health validation, integrity checks, and automated fix recommendations
category: quality
level: framework
priority: high
dependencies: []
related_skills: [agent-design, skill-design]
related_agents: [context-engineer, reviewer]
activation_rules:
  keywords: ["workspace", "health", "validate", "integrity", "audit", "check"]
  file_pattern: ".opencode/**/*"
---

# Validate Workspace

## Purpose

Comprehensive workspace validation that checks integrity, consistency, and health of all workspace components. Detects broken references, duplicates, missing files, stale content, and structural issues. Provides automated fix recommendations.

## When to Use

- Before major workspace changes (adding/removing agents or skills)
- Periodic maintenance (weekly/monthly)
- When workspace behavior seems inconsistent
- After bulk operations on workspace files
- Onboarding new team members (verify workspace is clean)

## Validation Checks

### 1. Configuration Validation

```markdown
**Check:** opencode.json validity
- [ ] File exists and is valid JSON/JSONC
- [ ] Required fields present (name, instructions)
- [ ] No duplicate instruction paths
- [ ] Instruction files actually exist
- [ ] Permissions array is valid
```

### 2. Agent Validation

```markdown
**Check:** Each agent in agents/ directory
- [ ] File exists and is readable
- [ ] Has valid YAML frontmatter (description, mode, model, temperature, permission)
- [ ] Description is non-empty
- [ ] Mode is valid (build, subagent, or plan)
- [ ] Temperature is within valid range (0.0-1.0)
- [ ] Permission keys are valid (read, write, edit, bash, glob, grep)
- [ ] No duplicate agents (by name)
- [ ] Agent name matches filename (kebab-case)
- [ ] No broken cross-references to other agents
```

### 3. Skill Validation

```markdown
**Check:** Each skill in skills/ directory
- [ ] Directory exists with SKILL.md inside
- [ ] SKILL.md has valid YAML frontmatter
- [ ] Required metadata present (name, description, category, level, priority)
- [ ] Category is valid (frontend, backend, database, security, quality, architecture, devops, ai, documentation, i18n, analytics, design, observability)
- [ ] Level is valid (concept, framework, project)
- [ ] Name matches directory name
- [ ] Content is non-trivial (>50 lines for concept, >80 for framework/project)
- [ ] Has at least one code example
- [ ] No duplicate skills (by name)
- [ ] No broken dependency references
- [ ] related_agents references exist
```

### 4. Command Validation

```markdown
**Check:** Each command in commands/ directory
- [ ] Directory exists with command.md inside
- [ ] command.md has valid YAML frontmatter
- [ ] Required fields present (name, description, allowed_tools, agent)
- [ ] name matches directory name
- [ ] allowed_tools are valid tool names
- [ ] agent reference exists (if specified)
- [ ] No duplicate commands
```

### 5. Cross-Reference Validation

```markdown
**Check:** Integrity of references between components
- [ ] All agent→skill references point to existing skills
- [ ] All skill→agent references point to existing agents
- [ ] All command→agent references point to existing agents
- [ ] All skill→skill dependencies reference existing skills
- [ ] AGENTS.md manifest matches actual file counts
- [ ] No orphaned components (unreferenced by anything)
```

### 6. Naming Convention Validation

```markdown
**Check:** Consistent naming across workspace
- [ ] Agent files: lowercase, hyphen-separated .md
- [ ] Skill directories: lowercase, hyphen-separated
- [ ] Command directories: lowercase, hyphen-separated
- [ ] TypeScript references: camelCase
- [ ] No spaces in file/directory names
- [ ] No special characters except hyphens
```

### 7. Content Quality Validation

```markdown
**Check:** Content meets minimum quality standards
- [ ] No placeholder text (TODO, FIXME, XXX)
- [ ] No empty sections
- [ ] Code examples are syntactically valid
- [ ] No broken markdown formatting
- [ ] Tables are properly formatted
```

### 8. Project Workspace Validation (if .opencode exists)

```markdown
**Check:** Project-specific workspace
- [ ] .opencode/opencode.json exists and is valid
- [ ] .opencode/AGENTS.md exists
- [ ] Project agents have valid structure
- [ ] Project skills have valid structure
- [ ] Project commands have valid structure
- [ ] No conflicts with global workspace
```

## Validation Process

### Step 1: Inventory

```bash
# Count all components
Global agents: ~/.config/opencode/agents/*.md
Global skills: ~/.config/opencode/skills/*/SKILL.md
Global commands: ~/.config/opencode/commands/*/command.md
Project agents: .opencode/agents/*.md
Project skills: .opencode/skills/*/SKILL.md
Project commands: .opencode/commands/*/command.md
```

### Step 2: Validate Each Component

For each component:
1. Check file exists and is readable
2. Parse YAML frontmatter
3. Validate required fields
4. Check content quality
5. Verify cross-references

### Step 3: Cross-Reference Check

```markdown
For each agent:
  - Check related_skills → exist?
  - Check skill dependencies → exist?

For each skill:
  - Check related_agents → exist?
  - Check dependencies → exist?

For each command:
  - Check agent → exists?
```

### Step 4: Generate Report

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

### Validation Results

#### Configuration
- [PASS/FAIL] opencode.json
- [PASS/FAIL] AGENTS.md

#### Agents
- [PASS/FAIL] Agent files valid
- [PASS/FAIL] No duplicates
- [PASS/FAIL] Cross-references valid

#### Skills
- [PASS/FAIL] Skill files valid
- [PASS/FAIL] No duplicates
- [PASS/FAIL] Dependencies valid

#### Commands
- [PASS/FAIL] Command files valid
- [PASS/FAIL] Agent references valid

### Issues Found
1. [CRITICAL/WARNING/INFO] Description
   - File: path/to/file
   - Issue: Description
   - Fix: Recommendation

### Recommendations
- Priority 1: [Action]
- Priority 2: [Action]
- Priority 3: [Action]
```

## Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| CRITICAL | Broken functionality, security risk | Fix immediately |
| WARNING | Potential issues, degraded quality | Fix soon |
| INFO | Suggestions, improvements | Optional |

## Automated Fixes

The following can be auto-fixed:
- Missing SKILL.md in skill directory → Generate from template
- Invalid YAML frontmatter → Reformat
- Missing required fields → Add defaults
- Broken file references → Remove or mark as TODO

The following require manual review:
- Duplicate agents/skills → Decide which to keep
- Content quality issues → Rewrite sections
- Cross-reference conflicts → Update references

## Anti-Patterns

- **Ignoring warnings** — They become critical over time
- **Fixing everything at once** — Prioritize by severity
- **Not re-validating after fixes** — Always verify fixes work
- **Skipping project workspace** — Project workspace must be validated too
