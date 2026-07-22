---
name: workspace-optimization
description: Strategies for identifying weak workspace components, strengthening content, merging overlaps, and improving discoverability
category: workspace
tags: [optimization, quality, maintenance, workspace]
---

# Workspace Optimization Skill

Practical guidance for analyzing, strengthening, and reorganizing an OpenCode workspace to maximize quality, discoverability, and engineering value.

---

## Identifying Weak Components

Weak components fail to deliver actionable value. Look for these signals:

### Content Red Flags

- **Placeholder text**: "TODO", "Coming soon", "Add content here", "TBD", "[INSERT]"
- **Generic statements**: "Handle errors properly", "Write good code", "Follow best practices" without specifics
- **Missing examples**: Components without at least one concrete example of usage
- **Missing edge cases**: No mention of error handling, boundary conditions, or failure modes
- **Copy-paste artifacts**: Sections that reference different projects, different naming conventions, or inconsistent terminology

### Structural Red Flags

- **Single-section components**: Only an overview with no actionable sections
- **No cross-references**: Not connected to any other component in the workspace
- **Frontmatter-only components**: Has metadata but no substantive body content
- **Truncated content**: Sections that end mid-thought or have incomplete sentences

### Detection Method

For each component, compute a weakness score:

```
weakness = 0
if has_placeholder_text: weakness += 30
if no_examples: weakness += 20
if no_cross_references: weakness += 15
if line_count < 30: weakness += 20
if sections_count < 2: weakness += 15
```

Components with weakness score >= 40 need attention.

---

## Strengthening Content Without Changing Meaning

When improving a weak component, preserve the original intent while adding specificity.

### Principles

1. **Expand, don't replace**: Add detail to existing sections rather than rewriting them
2. **Be concrete**: Turn "handle errors" into "catch errors at API boundaries, log with context, return structured error responses"
3. **Add examples**: Every section should have at least one example showing the concept in action
4. **Reference related components**: Add cross-links to skills, agents, or commands that complement this component
5. **Maintain voice**: Match the existing writing style and terminology

### Strengthening Templates

**For weak overview sections:**
Add: what this component does, when to use it, what it depends on, and what depends on it.

**For weak workflow sections:**
Add: numbered steps with specific tools/commands, expected inputs and outputs at each step, decision points and branching logic.

**For weak example sections:**
Add: a before/after showing the problem and solution, a code snippet or command showing exact usage, edge case handling.

**For weak reference sections:**
Add: links to related skills/agents/commands, external documentation URLs, related files in the workspace.

---

## Merging Overlapping Components

When two components cover the same domain with significant overlap, consider merging.

### When to Merge

- Both components address the same workflow from slightly different angles
- Neither component is complete without the other
- Users must frequently consult both to accomplish a task
- Combined, they would form a single coherent guide

### When NOT to Merge

- Components serve different audiences (beginner vs. advanced)
- Components are in different categories (agent vs. skill) and serve structurally different purposes
- One component is actively maintained and the other is legacy
- Merging would create a component over 300 lines

### Merge Process

1. Read both components fully
2. Identify unique content in each (content not present in the other)
3. Identify overlapping content (keep the better version of each overlap)
4. Determine the target structure (follow the richer component's structure)
5. Combine unique content into the target structure
6. Add cross-references from the absorbed component's former location
7. Update all references that pointed to the absorbed component

---

## Improving Discoverability

Components that exist but cannot be found are effectively useless.

### Discoverability Checklist

- **Listed in AGENTS.md**: Every agent and its routing rules should appear in the workspace manifest
- **Listed in MANIFEST.md**: Every skill, command, and playbook should appear in the relevant manifest section
- **Referenced by at least one other component**: Agents reference skills, commands reference agents, skills reference knowledge
- **Consistent naming**: File names match frontmatter names match manifest entries
- **Tagged appropriately**: Frontmatter includes category and tag fields for searchability
- **Described clearly**: Description field in frontmatter accurately conveys what the component does

### Discoverability Fixes

For orphaned components:

1. Add a reference from the most relevant agent's routing rules
2. Add an entry to the appropriate MANIFEST.md section
3. Add cross-references from related components
4. Update AGENTS.md if the component represents a new capability

For inconsistently named components:

1. Standardize to lowercase-hyphen-separated for file names
2. Update all references to match the new name
3. Update manifest entries

---

## Quality Thresholds

Use these thresholds as benchmarks during analysis:

### Content Depth

| Component Type | Minimum Lines | Ideal Lines | Maximum Lines |
|---|---|---|---|
| Agent | 50 | 100-200 | 300 |
| Skill | 40 | 80-150 | 250 |
| Command | 30 | 60-120 | 200 |
| Playbook | 50 | 100-200 | 300 |
| Knowledge doc | 30 | 60-150 | 250 |

### Metadata Completeness

Every component must have at minimum:

- YAML frontmatter with `name` and `description`
- At least 2 section headings in the body
- At least 1 example or reference

### Reference Health

- Every internal reference must resolve to an existing file
- Every component should have at least 1 incoming reference from another component
- No component should reference more than 10 other components (indicates over-coupling)

### Naming Consistency

- File names: lowercase, hyphen-separated, descriptive
- Frontmatter name: matches file name (without extension)
- Manifest entries: match frontmatter name exactly

---

## Workspace Optimization Workflow

When optimizing a workspace, follow this order:

1. **Fix critical issues first**: Broken references, missing files, security concerns
2. **Strengthen high-value components**: Agents and skills used most frequently
3. **Merge clear duplicates**: When overlap is unambiguous and merge is straightforward
4. **Add missing metadata**: Low-risk, high-consistency improvement
5. **Improve discoverability**: Cross-references, manifest entries, AGENTS.md updates
6. **Street weak content**: Add examples, expand sections, improve specificity
7. **Clean up naming**: Normalize file names and references

Never skip from step 1 to step 6. Structural integrity before content quality.
