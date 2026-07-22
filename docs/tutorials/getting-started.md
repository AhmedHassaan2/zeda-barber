---
title: Getting Started Tutorial
description: Your first steps with Ahmed Enterprise AI Workspace
---

# Getting Started

By the end of this tutorial, you will have:
- Installed the workspace
- Used your first agent
- Run your first command
- Loaded your first skill

## Prerequisites

- **Node.js** 18 or later
- **Git** installed
- **OpenCode CLI** installed

Check your versions:
```bash
node --version   # Should be v18+ or v20+
git --version    # Any recent version
opencode --version
```

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/AhmedHassaan2/Ahmed-Enterprise-AI-Workspace.git

# Copy to OpenCode config directory
# Linux/macOS:
cp -r Ahmed-Enterprise-AI-Workspace/* ~/.config/opencode/

# Windows:
xcopy /E /I Ahmed-Enterprise-AI-Workspace\* %USERPROFILE%\.config\opencode\
```

Verify the installation:
```bash
opencode --version
```

::: tip
Run `/health-check` after installation to verify everything is working.
:::

## Step 2: Your First Agent Interaction

Open OpenCode and invoke the frontend agent:

```
@frontend Create a simple button component with TypeScript and Tailwind CSS
```

The agent will:
1. Analyze your request
2. Load relevant skills (react-patterns, tailwind-css)
3. Generate a properly typed component
4. Follow your project's conventions

## Step 3: Running Your First Command

```bash
# Run a code review
/review

# Check security vulnerabilities
/security-scan

# Audit accessibility
/a11y-audit
```

## Step 4: Loading a Skill Manually

```
@skill: react-patterns
```

This loads specialized knowledge about React patterns that the agent can reference.

## Step 5: Using a Playbook

For complex workflows, use playbooks:

```
@playbook: feature-development
```

This provides a structured, step-by-step approach to building new features.

## Next Steps

- [Architecture Overview](/architecture) — Understand the 8-layer model
- [Custom Agent Tutorial](/tutorials/custom-agent) — Build your own agent
