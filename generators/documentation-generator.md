# Documentation Generator

**Purpose:** Generate production-quality documentation for workspace components.

## Usage

When creating documentation for agents, skills, commands, or the workspace itself.

## Documentation Types

### 1. Agent Documentation

```markdown
# Agent: {name}

## Overview
[What this agent does]

## Capabilities
- [Capability 1]
- [Capability 2]

## When to Use
- [Use case 1]
- [Use case 2]

## Configuration
- Mode: [build/subagent/plan]
- Temperature: [value]
- Permissions: [list]

## Related Skills
- [skill-1]
- [skill-2]

## Examples
[Usage examples]
```

### 2. Skill Documentation

```markdown
# Skill: {name}

## Overview
[What this skill covers]

## Category: [category]
## Level: [concept/framework/project]

## Key Concepts
- [Concept 1]
- [Concept 2]

## Usage
[How to use this skill]

## Related Agents
- [agent-1]
- [agent-2]

## Examples
[Code examples]
```

### 3. Command Documentation

```markdown
# Command: /{name}

## Overview
[What this command does]

## Usage
```
/{name} [options]
```

## Options
- `--flag` — Description

## Process
1. [Step 1]
2. [Step 2]

## Output
[What the output looks like]

## Related Agents
- [agent-1]
```

### 4. Workspace Documentation

```markdown
# Workspace: {name}

## Overview
[What this workspace covers]

## Components
- Agents: [count]
- Skills: [count]
- Commands: [count]

## Architecture
[How components fit together]

## Getting Started
[How to use the workspace]

## Configuration
[Key configuration options]
```

## Generation Process

### Step 1: Identify Type

Determine what kind of documentation is needed.

### Step 2: Gather Information

Read the source component to extract:
- Purpose and capabilities
- Configuration options
- Usage patterns
- Related components

### Step 3: Generate Documentation

Follow the appropriate template above.

### Step 4: Quality Check

```markdown
- [ ] Accurate — matches actual component
- [ ] Complete — covers all important aspects
- [ ] Clear — understandable by target audience
- [ ] Examples — includes working examples
- [ ] Cross-references — links to related components
- [ ] Current — reflects latest state
```

### Step 5: Integrate

1. Place documentation in appropriate location
2. Update cross-references
3. Update manifests if needed
