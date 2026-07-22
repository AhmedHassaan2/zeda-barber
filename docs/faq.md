# Frequently Asked Questions

## General

### What is the Ahmed Enterprise AI Workspace?

The Ahmed Enterprise AI Workspace is a production-grade AI engineering platform for OpenCode. It provides 22 specialized agents, 81 skills, 22 commands, and 16 playbooks to accelerate software development across any project type.

### Who is this workspace for?

The workspace is designed for Ahmed Hassaan's engineering workflow but can be adapted by any developer using OpenCode. It's optimized for TypeScript, Next.js, Tailwind CSS, Supabase, and Vercel projects.

### Is this workspace free?

Yes. The workspace is open source and available on GitHub.

### What OpenCode version is required?

The workspace requires OpenCode CLI latest version. Check with `opencode --version`.

---

## Adding Components

### How do I add a new agent?

1. Create a new `.md` file in `~/.config/opencode/agents/`
2. Follow the naming convention: `lowercase-hyphen-separated.md`
3. Define the agent's domain, tools, and routing rules
4. Update `AGENTS.md` to include the new agent in the manifest

```bash
# Example: Create a new agent
touch ~/.config/opencode/agents/my-agent.md
```

Or use the generator command:

```
/create-agent
```

### How do I add a new skill?

1. Create a new directory in `~/.config/opencode/skills/`
2. Add a `SKILL.md` file inside the directory
3. Define the skill's description, instructions, and workflows
4. Update the skill manifest if needed

```bash
# Example: Create a new skill
mkdir ~/.config/opencode/skills/my-skill
touch ~/.config/opencode/skills/my-skill/SKILL.md
```

Or use the generator command:

```
/create-skill
```

### How do I add a new command?

1. Create a new `.md` file in `~/.config/opencode/commands/`
2. Follow the naming convention: `lowercase-hyphen-separated.md`
3. Define the command's behavior and which agent it routes to
4. Update the command manifest if needed

```bash
# Example: Create a new command
touch ~/.config/opencode/commands/my-command.md
```

Or use the generator command:

```
/create-command
```

### How do I add project-specific components?

Create a `.opencode/` directory in your project root:

```bash
mkdir -p .opencode/agents
mkdir -p .opencode/skills
mkdir -p .opencode/commands
```

Project-level components override global ones with the same name.

---

## Customization

### How do I customize the workspace for my preferences?

Edit the `AGENTS.md` file at `~/.config/opencode/AGENTS.md`. The **Personal Layer** section contains Ahmed's preferences that can be modified.

Key sections to customize:

- **Languages and Frameworks** — change your tech stack
- **UI and Design** — modify colors, typography, animations
- **Architecture Patterns** — adjust project structure rules
- **Communication Style** — change language and layout preferences
- **Git Workflow** — modify commit conventions

### How do I change the default agent?

The default agent is `@build`. To change it:

1. Edit `~/.config/opencode/AGENTS.md`
2. Find the routing rules section
3. Modify the default agent assignment

### How do I add new routing rules?

In `AGENTS.md`, add file patterns or keywords to the routing rules:

```markdown
**File-based routing:**
- `src/my-feature/` → My Agent

**Keyword routing:**
- `my-keyword` → My Agent
```

### How do I disable an agent?

Rename the agent file to add `.disabled` extension:

```bash
mv ~/.config/opencode/agents/my-agent.md ~/.config/opencode/agents/my-agent.md.disabled
```

### How do I disable a skill?

Rename the skill directory to add `.disabled` extension:

```bash
mv ~/.config/opencode/skills/my-skill ~/.config/opencode/skills/my-skill.disabled
```

---

## Usage

### How do I use this workspace in different projects?

The workspace is project-agnostic. Use it by:

1. **Global installation** — affects all OpenCode sessions
2. **Project-specific** — add `.opencode/` directory to your project
3. **Both** — global defaults with project overrides

### How do I switch between projects?

OpenCode automatically detects project-specific configuration:

```bash
# In project A (has .opencode/)
cd /path/to/project-a
opencode  # Uses project + global config

# In project B (no .opencode/)
cd /path/to/project-b
opencode  # Uses only global config
```

### How do I share my workspace with my team?

1. Push your `~/.config/opencode/` to a Git repository
2. Team members clone and copy to their `~/.config/opencode/`
3. Or use project-level `.opencode/` for team-shared configuration

### How do I update the workspace?

```bash
cd ~/.config/opencode
git pull origin main
```

Or re-clone:

```bash
rm -rf ~/.config/opencode
git clone https://github.com/ahmed-enterprise/ai-workspace.git ~/.config/opencode
```

### How do I check workspace health?

Run the health check command:

```
/health-check
```

Or audit the workspace:

```
/workspace-audit
```

---

## Technical

### What programming languages does this workspace support?

The workspace is optimized for:

- **TypeScript** (primary) — strict mode, no `any`
- **JavaScript** — ES2017+ target
- **SQL** — PostgreSQL via Supabase
- **CSS** — Tailwind CSS
- **HTML** — Semantic, accessible markup

Other languages are supported through OpenCode's general capabilities but without workspace-specific patterns.

### What frameworks are supported?

| Framework | Support Level | Notes |
|-----------|---------------|-------|
| Next.js 16 (App Router) | Full | Primary framework |
| React 19+ | Full | Component patterns and hooks |
| Tailwind CSS 3.4+ | Full | Styling utilities |
| Supabase | Full | Database, auth, storage |
| Vercel | Full | Deployment platform |
| Prisma | Supported | ORM patterns available |
| Express | Basic | General API patterns apply |

### How does skill loading work?

Skills are loaded on-demand when:

1. **Auto-matching** — task description matches skill description
2. **Explicit loading** — user types `/skill skill-name`
3. **Agent request** — agent loads relevant skills for a task

Skills inject domain-specific instructions into the conversation context.

### How does agent routing work?

Agents are routed by:

1. **Explicit selection** — user types `@agent-name`
2. **File-based detection** — file path matches routing rules
3. **Keyword detection** — message keywords match agent domain
4. **Default fallback** — `@build` agent handles unmatched tasks

### How does knowledge accumulation work?

The workspace records:

- **New patterns** → project AGENTS.md "Patterns" section
- **Bug root causes** → project AGENTS.md "Known Issues"
- **Architecture decisions** → ADR or AGENTS.md "Decisions"
- **Lessons learned** → workspace-memory directory

### Can I use this workspace without Supabase?

Yes. Supabase is the default backend but not required. Edit `AGENTS.md` to change the database and backend preferences.

### Can I use this workspace without Vercel?

Yes. Vercel is the default deployment target but not required. Edit `AGENTS.md` to change deployment preferences.

---

## Troubleshooting

### My agent isn't responding

1. Check that the agent file exists in `~/.config/opencode/agents/`
2. Verify the agent name matches exactly (case-sensitive)
3. Try the `@build` agent to test basic functionality
4. Check OpenCode logs for errors

### My skill isn't loading

1. Verify the skill directory exists with a `SKILL.md` file
2. Check that the skill description matches your task
3. Try loading manually with `/skill skill-name`
4. Check for typos in the skill name

### My command isn't working

1. Verify the command file exists in `~/.config/opencode/commands/`
2. Check the command syntax (forward slash prefix)
3. Try a different command to test basic functionality
4. Check OpenCode logs for errors

### The workspace feels slow

1. Run `/health-check` to identify issues
2. Check for too many skills loading simultaneously
3. Reduce the number of active skills
4. Check system resources (CPU, memory)

### Configuration changes aren't taking effect

1. Restart OpenCode after making changes
2. Verify you edited the correct file
3. Check file permissions
4. Clear any cached configuration

---

## Advanced

### How do I create a skill that references other skills?

In your `SKILL.md`, reference other skills by name:

```markdown
## Related Skills
- react-patterns: Use for component patterns
- tailwind-css: Use for styling guidance
```

The skill system will load referenced skills when needed.

### How do I add a new knowledge document?

1. Create a new `.md` file in `~/.config/opencode/knowledge/`
2. Organize by domain (frontend/, backend/, security/, etc.)
3. Follow the existing naming conventions
4. Reference from skills or agents as needed

### How do I create a custom playbook?

1. Create a new `.md` file in `~/.config/opencode/playbooks/`
2. Follow the playbook template structure
3. Include steps, decision points, and verification criteria
4. Reference relevant skills and agents

Or use the generator:

```
/create-playbook
```

### How do I export my workspace for backup?

```bash
# Backup entire workspace
tar -czf opencode-workspace-backup.tar.gz ~/.config/opencode/

# Or use Git
cd ~/.config/opencode
git add .
git commit -m "chore: workspace backup"
git push
```

### How do I migrate to a new machine?

```bash
# On old machine
cd ~/.config/opencode
git add .
git commit -m "chore: pre-migration backup"
git push

# On new machine
git clone https://github.com/your-repo/opencode-workspace.git ~/.config/opencode
```
