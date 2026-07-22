---
title: Create a new OpenCode agent with proper structure and capabilities
description: Create a new OpenCode agent with proper structure and capabilities
---

# `/create-agent`

<div class="tip custom-block" style="padding: 1rem;">
<strong>Command:</strong> <code>/create-agent</code> | <strong>Agent:</strong> <code>context-engineer</code>
</div>

# /create-agent — Create New Agent

Create a new OpenCode agent with proper structure and capabilities.

## Usage

```
/create-agent my-agent        # Create in global agents
/create-agent my-agent --project  # Create in project agents
```

## Agent Template

```markdown
---
name: agent-name
description: Brief description of what this agent does
model: anthropic/claude-opus-4-6
temperature: 0.7
max_tokens: 8192
tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - Bash
  - WebFetch
skills:
  - skill-1
  - skill-2
---

# Agent Name

## Identity
You are [role description].

## Responsibilities
- Responsibility 1
- Responsibility 2

## Capabilities
- What this agent can do
- Tools and skills available

## Activation
- When to use this agent
- Trigger keywords/patterns

## Workflow
1. Step 1
2. Step 2
3. Step 3

## Constraints
- Limitations
- Rules to follow

## Output Format
Expected output structure
```

## Process

1. Parse agent name and options
2. Determine agent scope (global/project)
3. Create agent file with template
4. Define tools and capabilities
5. Set model and parameters
6. Add activation rules
7. Validate agent configuration
8. Report creation summary

## Conventions

- Use kebab-case for agent names
- Define clear responsibilities
- List required tools and skills
- Set appropriate model parameters
- Include activation rules
- Define output format

## Syntax

```
/create-agent [options] [arguments]
```

## Related Skills

See [Skills Registry](/skills/) for skills used during this command.

## Related Agents

See [Agents Registry](/agents/) for the agent that executes this command.
