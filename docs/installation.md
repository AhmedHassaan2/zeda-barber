# Installation Guide

This guide walks you through installing the Ahmed Enterprise AI Workspace on your system.

## Prerequisites

Before installing, ensure you have:

| Requirement | Minimum Version | Purpose |
|-------------|----------------|---------|
| **Node.js** | 18.0+ | Runtime for OpenCode CLI |
| **npm** | 9.0+ | Package management |
| **Git** | 2.30+ | Cloning the workspace |
| **OpenCode CLI** | Latest | AI engineering platform |

### Checking Prerequisites

```bash
# Check Node.js version
node --version  # Should be v18.0.0 or higher

# Check npm version
npm --version   # Should be 9.0.0 or higher

# Check Git version
git --version   # Should be 2.30.0 or higher

# Check OpenCode CLI
opencode --version
```

### Installing OpenCode CLI

If you don't have OpenCode CLI installed:

```bash
# Install globally via npm
npm install -g opencode

# Verify installation
opencode --version
```

## Installation Methods

### Method 1: Git Clone (Recommended)

```bash
# Clone the workspace repository
git clone https://github.com/ahmed-enterprise/ai-workspace.git

# Copy workspace files to OpenCode config directory
# macOS/Linux
cp -r ai-workspace/* ~/.config/opencode/

# Windows (PowerShell)
Copy-Item -Path "ai-workspace\*" -Destination "$env:USERPROFILE\.config\opencode\" -Recurse

# Verify installation
ls ~/.config/opencode/
```

### Method 2: Manual Download

1. Download the latest release from GitHub
2. Extract the archive
3. Copy the contents to your OpenCode config directory

```bash
# macOS/Linux
cp -r ahmed-enterprise-ai-workspace-*/* ~/.config/opencode/

# Windows (PowerShell)
Copy-Item -Path "ahmed-enterprise-ai-workspace-*\*" -Destination "$env:USERPROFILE\.config\opencode\" -Recurse
```

### Method 3: npm Package

```bash
# Install as an npm package
npm install -g @ahmed-enterprise/ai-workspace

# Run the setup command
ahmed-workspace setup
```

## Config Directory Location

The workspace installs to the OpenCode config directory:

| Platform | Default Location |
|----------|-----------------|
| **macOS** | `~/.config/opencode/` |
| **Linux** | `~/.config/opencode/` |
| **Windows** | `%USERPROFILE%\.config\opencode\` |

::: tip
You can override this by setting the `OPENCODE_CONFIG_DIR` environment variable.
:::

## Project Setup

### Creating a New Project

For project-specific configuration, create a `.opencode/` directory in your project root:

```bash
# In your project directory
mkdir -p .opencode/agents
mkdir -p .opencode/skills
mkdir -p .opencode/commands
```

### Project Directory Structure

```
your-project/
├── .opencode/
│   ├── agents/          # Project-specific agents
│   ├── skills/          # Project-specific skills
│   ├── commands/        # Project-specific commands
│   └── AGENTS.md        # Project-level instructions
├── src/
├── package.json
└── ...
```

### Copying Default Skills

Copy relevant global skills to your project if needed:

```bash
# Copy specific skills to your project
cp -r ~/.config/opencode/skills/react-patterns .opencode/skills/
```

## Environment Configuration

### Required Environment Variables

Create a `.env` file or set these variables:

```bash
# OpenCode API Configuration
OPENCODE_API_KEY=your-api-key-here
OPENCODE_MODEL=gpt-4

# Optional: Supabase (for projects using it)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: Deployment
VERCEL_TOKEN=your-vercel-token
```

::: warning
Never commit environment variables or secrets to source control. Use `.env.local` for local development and environment variables in your deployment platform.
:::

### Environment File Template

Create a `.env.example` file in your project root:

```bash
# Required
OPENCODE_API_KEY=
OPENCODE_MODEL=

# Optional - Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Optional - Deployment
VERCEL_TOKEN=
```

## Verification

### Step 1: Check Installation

```bash
# Verify OpenCode can see the workspace
opencode config list

# Expected output should show:
# - agents: 22 loaded
# - skills: 81 loaded
# - commands: 22 loaded
```

### Step 2: Test Agent Loading

```bash
# Start OpenCode and test an agent
opencode

# In the TUI, type:
@build hello
```

### Step 3: Test Skill Loading

```bash
# In the OpenCode TUI, test skill loading
/skill react-patterns
```

### Step 4: Test Command Execution

```bash
# In the OpenCode TUI, test a command
/review
```

### Full Verification Script

```bash
#!/bin/bash
echo "=== Ahmed Enterprise AI Workspace Verification ==="
echo ""

# Check Node.js
echo "1. Checking Node.js..."
if command -v node &> /dev/null; then
    echo "   ✓ Node.js $(node --version)"
else
    echo "   ✗ Node.js not found"
    exit 1
fi

# Check OpenCode
echo "2. Checking OpenCode CLI..."
if command -v opencode &> /dev/null; then
    echo "   ✓ OpenCode CLI $(opencode --version)"
else
    echo "   ✗ OpenCode CLI not found"
    exit 1
fi

# Check workspace directory
echo "3. Checking workspace directory..."
if [ -d "$HOME/.config/opencode" ]; then
    echo "   ✓ Workspace directory exists"
else
    echo "   ✗ Workspace directory not found"
    exit 1
fi

# Check agents
echo "4. Checking agents..."
AGENT_COUNT=$(ls -1 "$HOME/.config/opencode/agents/" 2>/dev/null | wc -l)
echo "   ✓ $AGENT_COUNT agents loaded"

# Check skills
echo "5. Checking skills..."
SKILL_COUNT=$(find "$HOME/.config/opencode/skills/" -name "SKILL.md" 2>/dev/null | wc -l)
echo "   ✓ $SKILL_COUNT skills loaded"

# Check commands
echo "6. Checking commands..."
COMMAND_COUNT=$(ls -1 "$HOME/.config/opencode/commands/" 2>/dev/null | wc -l)
echo "   ✓ $COMMAND_COUNT commands loaded"

echo ""
echo "=== Verification Complete ==="
```

## Platform-Specific Notes

### Windows

- Use PowerShell or Command Prompt, not Git Bash (path issues)
- Paths use backslashes: `%USERPROFILE%\.config\opencode\`
- Some shell commands in skills may need adaptation for PowerShell
- WSL2 is recommended for the best compatibility

### macOS

- Homebrew-installed Node.js works best
- Ensure `~/.config/opencode/` has proper permissions
- Apple Silicon (M1/M2) is fully supported

### Linux

- Most compatible platform out of the box
- Ensure your user owns the config directory:
  ```bash
  chown -R $(whoami) ~/.config/opencode/
  ```
- Works with all major distributions (Ubuntu, Fedora, Arch, etc.)

## Updating the Workspace

```bash
# Pull latest changes
cd ~/.config/opencode
git pull origin main

# Or re-clone if needed
rm -rf ~/.config/opencode
git clone https://github.com/ahmed-enterprise/ai-workspace.git ~/.config/opencode
```

## Uninstalling

```bash
# Remove the workspace
rm -rf ~/.config/opencode

# Remove project-specific configs
rm -rf your-project/.opencode/

# Remove global npm package (if installed via npm)
npm uninstall -g @ahmed-enterprise/ai-workspace
```

## Next Steps

- [Quick Start Guide](/quick-start) — Get productive in 5 minutes
- [Architecture Overview](/architecture) — Understand the 8-layer model
- [Folder Structure](/folder-structure) — See the complete layout
