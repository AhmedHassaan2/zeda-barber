---
title: Workspace self-analysis and automatic improvement with quality preservation
description: Workspace self-analysis and automatic improvement with quality preservation
---

# `/self-improve`

<div class="tip custom-block" style="padding: 1rem;">
<strong>Command:</strong> <code>/self-improve</code> | <strong>Agent:</strong> <code>context-engineer</code>
</div>

# Self-Improve Command

Comprehensive workspace self-analysis, quality scoring, issue detection, and automatic improvement with safety guards.

## Process Overview

Execute the following steps sequentially. Each step builds on the previous. Never skip steps. Never delete content that could be valuable. When in doubt, flag for manual review rather than auto-fixing.

---

## Step 1: Full Workspace Scan

Scan every component in the workspace. Build a complete inventory.

### Targets

Scan these directories and file types:

- **Agents**: `~/.config/opencode/agents/*.md` and `.opencode/agents/*.md`
- **Skills**: `~/.config/opencode/skills/*/SKILL.md` and `.opencode/skills/*/SKILL.md`
- **Commands**: `~/.config/opencode/commands/*/command.md` and `.opencode/commands/*/command.md`
- **Playbooks**: `~/.config/opencode/playbooks/*.md` and `.opencode/playbooks/*.md`
- **Knowledge**: `~/.config/opencode/knowledge/**/*.md` and `.opencode/knowledge/**/*.md`
- **Examples**: `~/.config/opencode/examples/**/*.md` and `.opencode/examples/**/*.md`
- **Manifests**: `MANIFEST.md`, `DECISIONS.md`, `DEPENDENCIES.md` in workspace root
- **Config**: `opencode.json` or `opencode.jsonc` in workspace root

### For Each Component, Record

```
- File path
- File name
- Line count
- Has YAML frontmatter (yes/no)
- Frontmatter fields present (name, description, allowed_tools, agent, etc.)
- Section headings found
- Internal references (links to other files, skills, agents, commands)
- External references (URLs, package names, API patterns)
- Last modified date
- Category/tag if present
```

### Output

Write the full inventory to a temporary analysis object in memory. Do not write to disk yet.

---

## Step 2: Quality Scoring

Score every component on three dimensions. Use a 0-100 scale for each.

### Content Quality (weight: 50%)

Score based on:

- **Line count**: 0-30 lines = 20pts, 31-80 = 50pts, 81-200 = 80pts, 200+ = 100pts
- **Section completeness**: Each expected section present = +10pts (max 40pts)
  - Agents expect: overview, responsibilities, routing rules, examples, constraints
  - Skills expect: overview, workflow, steps, examples, references
  - Commands expect: overview, process steps, output format, examples
  - Playbooks expect: overview, steps, decision points, examples, rollback
- **Specificity**: Generic/placeholder text detected = -20pts, domain-specific content = +10pts

### Metadata Completeness (weight: 25%)

Score based on:

- **YAML frontmatter present**: Yes = 20pts, No = 0pts
- **Name field**: Present and matches filename = 10pts
- **Description field**: Present and meaningful (>20 chars) = 15pts
- **Allowed tools**: Present and appropriate = 15pts
- **Agent field** (commands only): Present and valid = 10pts
- **Category/tags**: Present = 10pts
- **Examples section**: Present with at least 1 example = 10pts
- **References section**: Present = 10pts

### Practical Usefulness (weight: 25%)

Score based on:

- **Referenced by other components**: 0 references = 10pts, 1-2 = 30pts, 3-5 = 60pts, 5+ = 80pts, 10+ = 100pts
- **Contains actionable content** (steps, commands, code): Yes = +20pts
- **Has clear entry point**: Yes = +10pts
- **Covers edge cases or error handling**: Yes = +10pts

### Composite Score

`composite = (content * 0.50) + (metadata * 0.25) + (usefulness * 0.25)`

### Thresholds

- **90-100**: Excellent — no action needed
- **70-89**: Good — minor improvements optional
- **50-69**: Weak — improvement recommended
- **30-49**: Poor — improvement required
- **0-29**: Critical — immediate attention needed

Flag all components scoring below 70 for further analysis in Step 3.

---

## Step 3: Issue Detection

Analyze the inventory and scores to detect specific issues.

### 3.1 Obsolete Components

A component is obsolete if:

- Not referenced by any other component
- Not listed in any manifest
- Not routed to by any agent or command
- Contains patterns from deprecated APIs or old conventions
- Has not been modified in a long time and covers superseded patterns

**Detection method**: Cross-reference all internal links and routing rules. A component with zero incoming references from other components is orphaned. Check for deprecated keywords relevant to the tech stack.

### 3.2 Weak Components

A component is weak if:

- Composite score below 70
- Content is mostly generic placeholder text (e.g., "TODO", "Add content here", "Coming soon")
- Missing expected sections for its type
- Under 30 lines of substantive content
- Descriptions are vague or single-word
- No examples provided

**Detection method**: Pattern match for placeholder text. Check section headings against expected sections for the component type. Check line count against thresholds.

### 3.3 Redundant Components

Components are redundant if:

- Two or more components cover the same domain with >70% conceptual overlap
- They share similar section structures and address the same workflows
- One is a strict superset of the other

**Detection method**: Compare section headings, key terms, and described workflows between components in the same category. Flag pairs where overlap exceeds threshold.

### 3.4 Duplicate Components

Components are duplicates if:

- File names are identical or near-identical (ignoring case and separators)
- Content similarity exceeds 90%
- Same frontmatter name field

**Detection method**: Compare file names, frontmatter names, and compute content similarity via key phrase matching.

### 3.5 Outdated Components

A component is outdated if:

- References deprecated libraries, APIs, or patterns
- Uses old version numbers that no longer match current dependencies
- References conventions that have been superseded by newer patterns in the workspace
- Contains instructions that conflict with current AGENTS.md or manifest

**Detection method**: Cross-reference against current AGENTS.md conventions, check version numbers against package files, look for deprecated keywords.

### 3.6 Missing Components

A component is missing if:

- Referenced by another component but does not exist on disk
- Listed in a manifest but file not found
- A skill or agent references a skill/command that has no corresponding file

**Detection method**: Resolve all file references and cross-links. Check each target exists.

### 3.7 Broken References

A reference is broken if:

- An internal link points to a non-existent file
- A skill reference names a skill that does not exist
- A routing rule targets a file path that does not exist
- A command references an agent that is not defined

**Detection method**: Parse all markdown links, file path references, and cross-references. Validate each against the file system.

### 3.8 Orphaned Components

An component is orphaned if:

- It exists on disk but is not referenced by any other component
- It is not listed in any manifest or AGENTS.md section
- It is not reachable via any routing rule or command invocation
- No other component depends on it or mentions it

**Detection method**: Same as obsolete detection but without the age/deprecation filter. An orphaned component may still be valuable but is undiscoverable.

---

## Step 4: Improvement Recommendations

For every issue found in Step 3, generate a recommendation.

### Priority Levels

- **Critical**: Broken references, missing components that break workflows, security issues
- **High**: Components scoring below 50, duplicate components wasting resources, outdated content with wrong information
- **Medium**: Weak components scoring 50-69, redundant components that could be merged, orphaned components that should be linked
- **Low**: Missing metadata, minor naming inconsistencies, optional content enhancements

### Recommendation Format

For each recommendation, provide:

```
### [Priority] Issue Type: Component Name

**Problem**: Brief description of the issue
**Location**: File path
**Impact**: What this affects in the workspace
**Recommendation**: Specific action to take
**Effort**: Estimated effort (trivial / small / medium / large)
**Auto-fixable**: Yes / No / Partially
**Safety**: Safe / Needs review / Risky
```

### Sorting

Sort recommendations by priority (critical first), then by effort (trivial first within each priority).

---

## Step 5: Auto-Fix (Safe Operations Only)

Apply fixes automatically ONLY when ALL of the following conditions are met:

- The fix is purely additive (adds content, does not remove)
- The fix corrects a factual error (broken reference, wrong path)
- The fix adds missing metadata that can be derived from context
- The fix does not change the meaning or intent of existing content
- The fix does not delete or overwrite substantive content

### Safe Auto-Fix Operations

These operations are always safe to perform automatically:

1. **Add missing YAML frontmatter fields** when the values can be derived from the filename and existing content
2. **Fix broken file path references** by updating to the correct current path
3. **Update manifest counts** to match actual component counts
4. **Add missing section headings** with placeholder content marked `[MANUAL REVIEW NEEDED]`
5. **Normalize file naming** (convert spaces to hyphens, lowercase) by creating the correctly named file and noting the old one for removal
6. **Add cross-references** from manifests or AGENTS.md to orphaned but valuable components
7. **Add missing category tags** based on content analysis

### Operations Requiring Manual Review

These must be flagged, never auto-applied:

1. Content rewriting or strengthening
2. Component merging or deletion
3. Restructuring section layouts
4. Changing routing rules
5. Modifying agent responsibilities
6. Any removal of content, even placeholder text

### Auto-Fix Execution

For each safe auto-fix:

1. Read the target file
2. Apply the fix using the Edit tool
3. Log the change with before/after summary
4. Continue to next fix

Do NOT abort the entire process if one fix fails. Log the failure and continue.

---

## Step 6: Generate Report

Produce a comprehensive markdown report. Structure it as follows:

### Report Template

```markdown
# Workspace Self-Improvement Report

**Generated**: [timestamp]
**Workspace**: [workspace root path]

## Executive Summary

- **Total components scanned**: [count]
- **Overall health score**: [average composite score]/100
- **Components excellent (90+)**: [count]
- **Components good (70-89)**: [count]
- **Components weak (50-69)**: [count]
- **Components poor (30-49)**: [count]
- **Components critical (<30)**: [count]
- **Total issues found**: [count]
- **Auto-fixes applied**: [count]
- **Manual actions needed**: [count]

## Component Scores

### Agents
| Component | Content | Metadata | Usefulness | Composite | Status |
|---|---|---|---|---|---|
| [name] | [score] | [score] | [score] | [score] | [status emoji] |

### Skills
[Same table format]

### Commands
[Same table format]

### Playbooks
[Same table format]

### Knowledge
[Same table format]

## Issues Found

### Critical Issues
[List from Step 4, or "None found"]

### High Priority Issues
[List from Step 4, or "None found"]

### Medium Priority Issues
[List from Step 4, or "None found"]

### Low Priority Issues
[List from Step 4, or "None found"]

## Auto-Fixes Applied

| # | Component | Fix Type | Before | After | Status |
|---|---|---|---|---|---|
| 1 | [name] | [type] | [summary] | [summary] | [success/failed] |

## Manual Actions Needed

List every recommendation flagged as not auto-fixable, sorted by priority.

## Workspace Health Metrics

- **Coverage**: [percentage of routing rules that have matching components]
- **Connectivity**: [percentage of components that are referenced by at least one other component]
- **Freshness**: [percentage of components modified within last 30 days]
- **Consistency**: [percentage of components following naming conventions]
- **Completeness**: [percentage of components with full metadata]

## Recommendations for Next Improvement Cycle

Based on this analysis, suggest 3-5 high-impact improvements for the next cycle.
```

---

## Safety Rules

These rules are absolute and must never be violated:

1. **Never delete content** that could contain unique knowledge, even if the component scores poorly
2. **Never merge components** without explicit user confirmation
3. **Never modify security-related components** (security agents, auth patterns, secrets management) without flagging for review
4. **Never auto-fix more than 20 files** in a single run — batch larger improvements
5. **Always preserve the original intent** of any content being modified
6. **Never reduce the total knowledge** in the workspace — only add or reorganize
7. **Log every change** made, including failed attempts
8. **If a fix would change the behavior** of a component, flag it as manual-only
9. **Never modify the AGENTS.md Personal or Professional Layer** sections
10. **Stop and report** if more than 30% of components need critical fixes — this indicates systemic issues that need human planning

---

## Execution Notes

- This command is read-heavy. Most steps involve scanning and analysis, not modification.
- The auto-fix step (Step 5) is the only step that writes files. All other steps are read-only analysis.
- Total execution time depends on workspace size. For a workspace with 80+ components, expect 5-10 minutes.
- The command produces a single report as output. No separate files are created unless explicitly configured.
- Use the `skill` tool to load `workspace-optimization` for additional guidance on strengthening weak components during the recommendation phase.

## Syntax

```
/self-improve [options] [arguments]
```

## Related Skills

See [Skills Registry](/skills/) for skills used during this command.

## Related Agents

See [Agents Registry](/agents/) for the agent that executes this command.
