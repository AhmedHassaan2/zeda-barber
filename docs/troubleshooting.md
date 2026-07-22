# Troubleshooting Guide

Common issues and solutions for the Ahmed Enterprise AI Workspace.

## Agent Issues

### Agent Not Loading

**Symptoms:** Agent doesn't respond or says "agent not found"

**Solutions:**

1. **Check agent file exists:**
   ```bash
   ls ~/.config/opencode/agents/
   ```

2. **Verify agent name matches exactly:**
   ```bash
   # Case-sensitive check
   cat ~/.config/opencode/agents/security.md | head -5
   ```

3. **Test with default agent:**
   ```
   @build hello
   ```

4. **Check file permissions:**
   ```bash
   chmod 644 ~/.config/opencode/agents/*.md
   ```

5. **Validate agent file format:**
   ```bash
   # Check for YAML frontmatter issues
   head -20 ~/.config/opencode/agents/your-agent.md
   ```

### Agent Not Using Correct Skills

**Symptoms:** Agent responds but without domain knowledge

**Solutions:**

1. **Check skill loading:**
   ```
   /skill react-patterns
   ```

2. **Verify skill directory structure:**
   ```bash
   ls ~/.config/opencode/skills/react-patterns/
   # Should contain SKILL.md
   ```

3. **Check routing rules in AGENTS.md:**
   ```bash
   grep -A 10 "Domain Detection" ~/.config/opencode/AGENTS.md
   ```

4. **Try explicit skill loading:**
   ```
   Load the react-patterns skill to help with this React component
   ```

### Agent Routing to Wrong Domain

**Symptoms:** Frontend task goes to backend agent

**Solutions:**

1. **Use explicit agent selection:**
   ```
   @frontend Create a React component
   ```

2. **Check routing keywords in AGENTS.md:**
   ```bash
   grep -A 20 "Keyword Detection" ~/.config/opencode/AGENTS.md
   ```

3. **Add specific file patterns:**
   In AGENTS.md, add:
   ```markdown
   - `src/components/ui/` → Frontend
   ```

---

## Skill Issues

### Skill Not Found

**Symptoms:** `/skill skill-name` returns "skill not found"

**Solutions:**

1. **List available skills:**
   ```bash
   ls ~/.config/opencode/skills/
   ```

2. **Check skill directory name:**
   ```bash
   # Must match exactly, including hyphens
   ls -d ~/.config/opencode/skills/react-patterns
   ```

3. **Verify SKILL.md exists:**
   ```bash
   cat ~/.config/opencode/skills/react-patterns/SKILL.md | head -10
   ```

4. **Check for typos:**
   ```
   # Correct
   /skill react-patterns

   # Wrong (typo)
   /skill react-paterns
   ```

### Skill Not Loading Automatically

**Symptoms:** Skill should load but doesn't

**Solutions:**

1. **Check skill description matches task:**
   ```bash
   cat ~/.config/opencode/skills/react-patterns/SKILL.md | grep -i "description"
   ```

2. **Improve skill description:**
   Edit the `SKILL.md` file to include more keywords that match your tasks.

3. **Load manually:**
   ```
   /skill react-patterns
   ```

4. **Check for conflicting skills:**
   ```bash
   # List all skills with similar names
   ls ~/.config/opencode/skills/ | grep react
   ```

### Skill Instructions Not Being Followed

**Symptoms:** Agent ignores skill instructions

**Solutions:**

1. **Verify SKILL.md format:**
   ```markdown
   ---
   name: react-patterns
   description: React component patterns and best practices
   ---

   # Instructions

   When working with React components...
   ```

2. **Check skill is loaded:**
   ```
   Is the react-patterns skill loaded?
   ```

3. **Reload skill:**
   ```
   /skill react-patterns
   ```

4. **Check for skill conflicts:**
   Two skills with similar descriptions may conflict. Disable one.

---

## Command Issues

### Command Not Working

**Symptoms:** `/command-name` returns "command not found"

**Solutions:**

1. **List available commands:**
   ```bash
   ls ~/.config/opencode/commands/
   ```

2. **Check command file exists:**
   ```bash
   cat ~/.config/opencode/commands/review.md | head -10
   ```

3. **Verify syntax:**
   ```
   # Correct
   /review

   # Wrong (missing slash)
   review
   ```

4. **Check for typos:**
   ```
   # List all commands
   ls ~/.config/opencode/commands/ | sed 's/.md//'
   ```

### Command Produces Errors

**Symptoms:** Command runs but returns errors

**Solutions:**

1. **Check command file format:**
   ```bash
   cat ~/.config/opencode/commands/your-command.md
   ```

2. **Verify agent routing:**
   Commands route to specific agents. Check which agent the command uses.

3. **Check tool availability:**
   Some commands require specific tools. Verify your OpenCode installation.

4. **Try a simpler command:**
   ```
   /health-check
   ```

### Command Slow to Execute

**Symptoms:** Command takes too long to respond

**Solutions:**

1. **Check system resources:**
   ```bash
   # Monitor CPU and memory
   top
   ```

2. **Reduce concurrent operations:**
   Close other applications and try again.

3. **Check network connection:**
   Some commands require API calls. Verify your connection.

4. **Clear cache:**
   ```bash
   rm -rf ~/.config/opencode/.cache
   ```

---

## Build Errors

### TypeScript Errors

**Symptoms:** Build fails with TypeScript errors

**Solutions:**

1. **Check tsconfig.json:**
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noAny": true,
       "target": "ES2017"
     }
   }
   ```

2. **Run type check:**
   ```bash
   npx tsc --noEmit
   ```

3. **Fix common issues:**
   - Remove `any` types
   - Add explicit return types
   - Fix null/undefined checks

4. **Check workspace TypeScript settings:**
   ```bash
   cat ~/.config/opencode/AGENTS.md | grep -A 5 "TypeScript"
   ```

### Next.js Build Errors

**Symptoms:** `npm run build` fails

**Solutions:**

1. **Check App Router structure:**
   ```
   src/app/
   ├── page.tsx        # Home page
   ├── layout.tsx      # Root layout
   └── about/
       └── page.tsx    # About page
   ```

2. **Verify imports:**
   ```typescript
   // Correct
   import { Button } from '@/components/Button'

   // Wrong
   import Button from '../components/Button'
   ```

3. **Check for missing files:**
   ```bash
   # Verify all referenced files exist
   grep -r "import" src/ | grep -v node_modules
   ```

4. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run build
   ```

### Tailwind CSS Errors

**Symptoms:** Styles not applying or build fails

**Solutions:**

1. **Check tailwind.config.ts:**
   ```typescript
   import type { Config } from 'tailwindcss'

   const config: Config = {
     content: [
       './src/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     darkMode: 'class',
     theme: {
       extend: {},
     },
     plugins: [],
   }
   export default config
   ```

2. **Verify CSS imports:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Check for conflicting classes:**
   ```bash
   # Search for duplicate classes
   grep -r "className" src/ | grep -v node_modules
   ```

4. **Rebuild Tailwind:**
   ```bash
   npx tailwindcss -i ./src/globals.css -o ./dist/output.css --watch
   ```

---

## Configuration Issues

### Environment Variables Not Working

**Symptoms:** `process.env.VARIABLE` is undefined

**Solutions:**

1. **Check .env file exists:**
   ```bash
   ls -la .env*
   ```

2. **Verify variable names:**
   ```bash
   # Must be in .env file
   cat .env

   # Must start with NEXT_PUBLIC_ for client-side
   NEXT_PUBLIC_SUPABASE_URL=your-url
   ```

3. **Restart dev server:**
   ```bash
   # Stop and restart
   npm run dev
   ```

4. **Check for typos:**
   ```bash
   # Compare .env with usage
   diff <(grep "=" .env | cut -d'=' -f1) <(grep "process.env" src/ -roh | sort -u)
   ```

### AGENTS.md Not Being Read

**Symptoms:** Agent doesn't follow workspace rules

**Solutions:**

1. **Verify file location:**
   ```bash
   ls -la ~/.config/opencode/AGENTS.md
   ```

2. **Check file format:**
   ```bash
   head -50 ~/.config/opencode/AGENTS.md
   ```

3. **Check file permissions:**
   ```bash
   chmod 644 ~/.config/opencode/AGENTS.md
   ```

4. **Restart OpenCode:**
   Close and reopen OpenCode to reload configuration.

### Project Config Not Overriding Global

**Symptoms:** Project-specific settings ignored

**Solutions:**

1. **Check .opencode directory:**
   ```bash
   ls -la .opencode/
   ```

2. **Verify AGENTS.md exists:**
   ```bash
   cat .opencode/AGENTS.md
   ```

3. **Check config priority:**
   - Project config (`.opencode/`) overrides global
   - Global config (`~/.config/opencode/`) is default
   - Built-in defaults are fallback

4. **Verify OpenCode version:**
   ```bash
   opencode --version
   # Must support project-level config
   ```

---

## Platform-Specific Issues

### Windows

**Common Issues:**

1. **Path separators:**
   ```powershell
   # Use backslashes
   $env:USERPROFILE\.config\opencode\

   # Or use forward slashes
   $HOME/.config/opencode/
   ```

2. **PowerShell vs Git Bash:**
   ```powershell
   # Use PowerShell for OpenCode
   opencode

   # Git Bash may have path issues
   ```

3. **File permissions:**
   ```powershell
   # Check permissions
   Get-Acl "$env:USERPROFILE\.config\opencode\AGENTS.md"
   ```

4. **Line endings:**
   ```powershell
   # Convert to Unix line endings
   Get-Content file.md | Set-Content file.md -Encoding UTF8
   ```

### macOS

**Common Issues:**

1. **Homebrew Node.js:**
   ```bash
   # Verify Homebrew Node.js
   which node
   # Should be /opt/homebrew/bin/node (Apple Silicon)
   # or /usr/local/bin/node (Intel)
   ```

2. **File permissions:**
   ```bash
   # Fix permissions
   chmod -R 755 ~/.config/opencode/
   ```

3. **Apple Silicon compatibility:**
   ```bash
   # Ensure Rosetta is installed if needed
   softwareupdate --install-rosetta
   ```

4. **Gatekeeper issues:**
   ```bash
   # If OpenCode is blocked
   xattr -d com.apple.quarantine /usr/local/bin/opencode
   ```

### Linux

**Common Issues:**

1. **File ownership:**
   ```bash
   # Fix ownership
   chown -R $(whoami) ~/.config/opencode/
   ```

2. **File permissions:**
   ```bash
   # Set correct permissions
   chmod -R 755 ~/.config/opencode/
   chmod 644 ~/.config/opencode/*.md
   ```

3. **Missing dependencies:**
   ```bash
   # Install required packages
   sudo apt-get install nodejs npm git
   ```

4. **SELinux issues:**
   ```bash
   # If SELinux is blocking access
   restorecon -R ~/.config/opencode/
   ```

---

## Performance Issues

### Slow Agent Responses

**Symptoms:** Agents take too long to respond

**Solutions:**

1. **Reduce active skills:**
   ```bash
   # Check loaded skills
   ls ~/.config/opencode/skills/ | wc -l
   ```

2. **Disable unused skills:**
   ```bash
   mv ~/.config/opencode/skills/unused-skill ~/.config/opencode/skills/unused-skill.disabled
   ```

3. **Check system resources:**
   ```bash
   # Monitor usage
   top
   free -h
   df -h
   ```

4. **Clear workspace cache:**
   ```bash
   rm -rf ~/.config/opencode/.cache
   ```

### High Memory Usage

**Symptoms:** OpenCode uses too much memory

**Solutions:**

1. **Close other applications:**
   Free up system memory.

2. **Reduce context window:**
   Check OpenCode configuration for context size settings.

3. **Split large tasks:**
   Break complex tasks into smaller pieces.

4. **Restart OpenCode:**
   ```bash
   # Kill and restart
   pkill opencode
   opencode
   ```

### Disk Space Issues

**Symptoms:** Not enough disk space

**Solutions:**

1. **Check workspace size:**
   ```bash
   du -sh ~/.config/opencode/
   ```

2. **Clean cache:**
   ```bash
   rm -rf ~/.config/opencode/.cache
   ```

3. **Remove unused files:**
   ```bash
   # Find large files
   find ~/.config/opencode/ -size +10M -type f
   ```

4. **Compress old files:**
   ```bash
   tar -czf old-files.tar.gz ~/.config/opencode/workspace-memory/old/
   ```

---

## Getting More Help

If your issue isn't listed here:

1. **Run diagnostics:**
   ```
   /health-check
   ```

2. **Check logs:**
   ```bash
   # OpenCode logs
   cat ~/.config/opencode/logs/*.log
   ```

3. **Search issues:**
   Check the GitHub repository issues page.

4. **Ask the workspace:**
   ```
   @build I'm having an issue with [describe problem]
   ```

5. **Community support:**
   Join the OpenCode community Discord or GitHub Discussions.
