---
name: workspace-validate
description: Validate workspace integrity, cross-references, naming, and metadata with automatic fix recommendations
allowed_tools: ["Read", "Grep", "Glob", "Bash"]
agent: context-engineer
---

# /workspace-validate — Workspace Validation

Validate workspace integrity, cross-references, naming conventions, and metadata.

## Usage

```
/workspace-validate                 # Full validation
/workspace-validate --fix          # Show fix recommendations
/workspace-validate --quick        # Quick validation (critical only)
```

## Validation Checks

### 1. Configuration Validation

```markdown
- [ ] ~/.config/opencode/opencode.json exists and is valid
- [ ] ~/.config/opencode/AGENTS.md exists and is valid
- [ ] Required directories exist (agents/, skills/, commands/)
- [ ] No unexpected files in workspace root
```

### 2. Agent Validation

For each agent file:
```markdown
- [ ] File exists and is readable
- [ ] Has YAML frontmatter
- [ ] description field is non-empty
- [ ] mode field is valid (build/subagent/plan)
- [ ] temperature is 0.0-1.0
- [ ] permission object has valid keys
- [ ] No duplicate agent names
- [ ] Filename matches agent name (kebab-case)
- [ ] Content is non-trivial (>50 lines)
```

### 3. Skill Validation

For each skill directory:
```markdown
- [ ] Directory exists
- [ ] SKILL.md exists inside
- [ ] Has YAML frontmatter
- [ ] name field matches directory name
- [ ] description is non-empty
- [ ] category is valid
- [ ] level is valid
- [ ] No duplicate skill names
- [ ] Content is non-trivial
```

### 4. Command Validation

For each command directory:
```markdown
- [ ] Directory exists
- [ ] command.md exists inside
- [ ] Has YAML frontmatter
- [ ] name matches directory name
- [ ] description is non-empty
- [ ] allowed_tools is valid array
- [ ] agent exists (if specified)
- [ ] No duplicate command names
```

### 5. Cross-Reference Validation

```markdown
- [ ] Agent → skill references point to existing skills
- [ ] Skill → agent references point to existing agents
- [ ] Command → agent references point to existing agents
- [ ] Skill → skill dependencies reference existing skills
- [ ] Playbook → agent/skill/command references exist
```

### 6. Naming Convention Validation

```markdown
- [ ] Agent files: lowercase, hyphen-separated .md
- [ ] Skill directories: lowercase, hyphen-separated
- [ ] Command directories: lowercase, hyphen-separated
- [ ] No spaces in file/directory names
- [ ] No special characters except hyphens
- [ ] No uppercase letters in file/directory names
```

### 7. Manifest Synchronization

```markdown
- [ ] AGENTS.md agent count matches actual files
- [ ] AGENTS.md skill count matches actual directories
- [ ] AGENTS.md command count matches actual directories
- [ ] MANIFEST.md (if exists) is current
- [ ] Dependency graph is accurate
- [ ] Routing rules are current
```

### 8. Playbook Validation

```markdown
- [ ] All 16 playbooks exist
- [ ] Each has required sections (Goal, Trigger, Inputs, Outputs, etc.)
- [ ] Required agents/skills/commands exist
- [ ] No broken references
```

### 9. Generator Validation

```markdown
- [ ] All 6 generators exist
- [ ] Each has proper structure
- [ ] Templates are referenced correctly
```

### 10. Knowledge Base Validation

```markdown
- [ ] All knowledge documents exist
- [ ] Each has required sections
- [ ] No broken references
```

## Output Format

```markdown
## Workspace Validation Report

**Date:** YYYY-MM-DD
**Status:** PASS / FAIL / WARNING

### Configuration
- [PASS/FAIL] opencode.json
- [PASS/FAIL] AGENTS.md

### Agents (X total)
- [PASS/FAIL] All files valid
- [PASS/FAIL] No duplicates
- [PASS/FAIL] Cross-references valid
Issues: [list]

### Skills (X total)
- [PASS/FAIL] All files valid
- [PASS/FAIL] No duplicates
- [PASS/FAIL] Dependencies valid
Issues: [list]

### Commands (X total)
- [PASS/FAIL] All files valid
- [PASS/FAIL] Agent references valid
Issues: [list]

### Naming
- [PASS/FAIL] All names follow conventions
Issues: [list]

### Manifests
- [PASS/FAIL] Counts are accurate
- [PASS/FAIL] Dependencies are current
Issues: [list]

### Critical Issues
1. [Issue] — Fix: [recommendation]

### Warnings
1. [Issue] — Fix: [recommendation]

### Summary
- Critical: X
- Warning: X
- Info: X
```

## Automatic Fixes

The following can be auto-detected with fix recommendations:
- Missing SKILL.md → "Create SKILL.md from template"
- Invalid YAML → "Reformat YAML frontmatter"
- Missing fields → "Add required field: {field}"
- Broken references → "Remove or update reference to {target}"
- Count mismatches → "Update manifest count from {old} to {new}"

## Process

1. Load validate-workspace skill for detailed rules
2. Run all validation checks
3. Collect issues by severity
4. Generate validation report
5. Provide fix recommendations for each issue
