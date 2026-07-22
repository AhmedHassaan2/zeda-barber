---
name: workspace-audit
description: Deep audit of workspace quality, consistency, and completeness with actionable recommendations
allowed_tools: ["Read", "Grep", "Glob", "Bash"]
agent: context-engineer
---

# /workspace-audit — Deep Workspace Audit

Perform comprehensive deep audit of the entire OpenCode workspace.

## Usage

```
/workspace-audit                 # Full deep audit
/workspace-audit --agents        # Audit agents only
/workspace-audit --skills        # Audit skills only
/workspace-audit --commands      # Audit commands only
/workspace-audit --quality       # Quality review only
```

## Audit Areas

### 1. Agent Quality Audit

For each agent, verify:
- [ ] YAML frontmatter is valid
- [ ] Description is specific (not generic)
- [ ] Mode is appropriate for role
- [ ] Temperature matches use case
- [ ] Permissions are appropriate
- [ ] Content is >80 lines
- [ ] Has clear role definition
- [ ] Has decision rules
- [ ] Has output format
- [ ] Has specific rules (not generic advice)
- [ ] No placeholder text
- [ ] Content would actually guide an AI agent

Quality scoring:
- **Production (90+):** Complete, specific, actionable
- **Good (70-89):** Mostly complete, minor gaps
- **Weak (50-69):** Generic, missing sections
- **Placeholder (<50):** Incomplete, not useful

### 2. Skill Quality Audit

For each skill, verify:
- [ ] SKILL.md exists in directory
- [ ] YAML frontmatter is valid
- [ ] Category is valid
- [ ] Level is valid
- [ ] Content is appropriate length for level
- [ ] Has at least 2 code examples
- [ ] Anti-patterns section exists
- [ ] Best practices are specific
- [ ] No placeholder text
- [ ] Would actually teach something useful

### 3. Command Quality Audit

For each command, verify:
- [ ] command.md exists in directory
- [ ] YAML frontmatter is valid
- [ ] name matches directory
- [ ] allowed_tools are appropriate
- [ ] agent exists (if specified)
- [ ] Has clear usage examples
- [ ] Has defined process
- [ ] Has output format

### 4. Consistency Audit

- [ ] Naming conventions followed everywhere
- [ ] Metadata format consistent
- [ ] Content structure consistent
- [ ] No duplicate components
- [ ] Cross-references are valid
- [ ] Manifests are synchronized

### 5. Completeness Audit

- [ ] All agents have full prompts (>80 lines)
- [ ] All skills have code examples
- [ ] All commands have workflows
- [ ] All playbooks have required sections
- [ ] All templates are filled
- [ ] Documentation exists for all components

### 6. Weakness Detection

Identify components that are:
- Generic (could apply to any project)
- Placeholder (TODO, FIXME, placeholder text)
- Duplicate (overlapping with other components)
- Orphaned (not referenced by anything)
- Outdated (referencing old patterns)

## Output Format

```markdown
## Workspace Audit Report

**Date:** YYYY-MM-DD
**Overall Score:** XX/100

### Agent Quality
| Agent | Score | Issues |
|-------|-------|--------|
| agent-name | 95 | None |
| agent-name | 72 | Missing output format |

### Skill Quality
| Skill | Score | Issues |
|-------|-------|--------|
| skill-name | 88 | Generic best practices |

### Command Quality
| Command | Score | Issues |
|---------|-------|--------|
| cmd-name | 90 | None |

### Consistency Issues
1. [Issue description]

### Weaknesses Found
1. [Component]: [Issue]

### Recommendations
1. [Priority 1 action]
2. [Priority 2 action]

### Score Breakdown
- Agent Quality: XX/100
- Skill Quality: XX/100
- Command Quality: XX/100
- Consistency: XX/100
- Completeness: XX/100
```

## Process

1. Load validate-workspace skill
2. Scan all agents — score each
3. Scan all skills — score each
4. Scan all commands — score each
5. Check consistency across workspace
6. Check completeness
7. Identify weaknesses
8. Generate audit report with scores and recommendations
