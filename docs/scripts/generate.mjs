#!/usr/bin/env node

/**
 * Ahmed Enterprise AI Workspace — Documentation Generator
 * Reads all workspace components and generates VitePress documentation pages.
 * Run: node scripts/generate.mjs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const WORKSPACE = process.env.WORKSPACE_PATH || 'C:/Users/A.Hassan/.config/opencode'
const DOCS = process.env.DOCS_PATH || 'C:/Users/A.Hassan/AppData/Local/Temp/opencode/Ahmed-Enterprise-AI-Workspace/docs'

const log = (msg) => console.log(`  ${msg}`)
const section = (msg) => console.log(`\n${'='.repeat(60)}\n  ${msg}\n${'='.repeat(60)}`)

function readMd(path) { try { return readFileSync(path, 'utf-8') } catch { return '' } }
function readMdClean(path) { return readMd(path).replace(/^---[\s\S]*?---\n*/m, '').trim() }
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const fm = {}
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) fm[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '')
  })
  return fm
}
function listDir(dir) {
  try { return readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).filter(n => !n.startsWith('.')) } catch { return [] }
}
function listFiles(dir, ext = '.md') {
  try { return readdirSync(dir).filter(f => f.endsWith(ext)).map(f => f.replace(ext, '')) } catch { return [] }
}
function slugToTitle(s) { return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }
function writeFile(rel, content) {
  const full = join(DOCS, rel)
  const dir = join(DOCS, rel.split('/').slice(0, -1).join('/'))
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(full, content, 'utf-8')
}

function genAgentPage(name) {
  const content = readMd(join(WORKSPACE, 'agents', `${name}.md`))
  if (!content) return null
  const fm = extractFrontmatter(content)
  const body = readMdClean(join(WORKSPACE, 'agents', `${name}.md`))
  const title = fm.description || slugToTitle(name)
  return `---
title: ${title}
description: ${fm.description || slugToTitle(name) + ' agent'}
---

# ${title}

<div class="tip custom-block" style="padding: 1rem;">
<strong>Agent:</strong> <code>${name}</code> | <strong>Type:</strong> ${fm.mode || 'subagent'} | <strong>Read-Only:</strong> ${fm.readOnly ? 'Yes' : 'No'}
</div>

${body}

## Related Skills

See [Skills Registry](/skills/) for domain skills used by this agent.

## Related Commands

See [Commands Registry](/commands/) for commands that delegate to this agent.

## Best Practices

- Always provide specific, actionable feedback
- Reference exact files and line numbers in findings
- Load relevant skills before generating recommendations
- Follow the workspace routing rules for domain detection
- Consider cross-cutting concerns (security, accessibility, performance)

## Common Mistakes

- Bypassing read-only restrictions on advisory agents
- Not loading relevant skills for domain-specific tasks
- Providing vague recommendations without code examples
- Ignoring existing patterns and conventions
- Making changes without first analyzing the codebase
`
}

function genSkillPage(name) {
  const skillFile = join(WORKSPACE, 'skills', name, 'SKILL.md')
  const content = readMd(skillFile)
  if (!content) return null
  const fm = extractFrontmatter(content)
  const body = readMdClean(skillFile)
  const title = fm.description || slugToTitle(name)
  return `---
title: ${title}
description: ${fm.description || slugToTitle(name) + ' skill'}
---

# ${title}

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>${name}</code> | <strong>Category:</strong> ${fm.category || 'general'} | <strong>Priority:</strong> ${fm.priority || 'medium'} | <strong>Level:</strong> ${fm.level || 'concept'}
</div>

${body}

## When to Use

- File patterns match the skill's activation rules
- Keywords in the conversation match the skill's domain
- A related agent delegates to this skill

## When NOT to Use

- When the task falls outside this skill's domain
- When a more specific skill exists for the task
- When the skill's dependencies are not met

## Related Agents

See [Agents Registry](/agents/) for agents that use this skill.

## Related Skills

See [Skills Registry](/skills/) for related skills in the same cluster.

## Customization Guide

1. Copy the skill to \`.opencode/skills/\` in your project
2. Modify the activation rules to match your project patterns
3. Add project-specific examples and templates
4. Update the related agents and skills references

## Extension Guide

1. Add new sections to the SKILL.md file
2. Include code examples for new patterns
3. Update anti-patterns with new findings
4. Maintain cross-references to related skills
5. Keep the skill focused on its core purpose
`
}

function genCommandPage(name) {
  const cmdFile = join(WORKSPACE, 'commands', name, 'command.md')
  const content = readMd(cmdFile)
  if (!content) return null
  const fm = extractFrontmatter(content)
  const body = readMdClean(cmdFile)
  return `---
title: ${fm.description || '/' + name + ' command'}
description: ${fm.description || '/' + name + ' command'}
---

# \`/${name}\`

<div class="tip custom-block" style="padding: 1rem;">
<strong>Command:</strong> <code>/${name}</code> | <strong>Agent:</strong> <code>${fm.agent || 'build'}</code>
</div>

${body}

## Syntax

\`\`\`
/${name} [options] [arguments]
\`\`\`

## Related Skills

See [Skills Registry](/skills/) for skills used during this command.

## Related Agents

See [Agents Registry](/agents/) for the agent that executes this command.
`
}

function genPlaybookPage(name) {
  const content = readMd(join(WORKSPACE, 'playbooks', `${name}.md`))
  if (!content) return null
  const body = readMdClean(join(WORKSPACE, 'playbooks', `${name}.md`))
  return `---
title: ${slugToTitle(name)} Playbook
description: Engineering playbook for ${slugToTitle(name).toLowerCase()} workflow
---

# ${slugToTitle(name)} Playbook

${body}

## Related Commands

See [Commands Registry](/commands/) for commands used in this playbook.

## Related Agents

See [Agents Registry](/agents/) for agents involved in this playbook.
`
}

function genGeneratorPage(name) {
  const content = readMd(join(WORKSPACE, 'generators', `${name}.md`))
  if (!content) return null
  const body = readMdClean(join(WORKSPACE, 'generators', `${name}.md`))
  return `---
title: ${slugToTitle(name.replace('-generator', ''))} Generator
description: ${slugToTitle(name.replace('-generator', ''))} generator for workspace components
---

# ${slugToTitle(name.replace('-', ' '))} Generator

${body}
`
}

function genKnowledgePage(name) {
  const content = readMd(join(WORKSPACE, 'knowledge', `${name}.md`))
  if (!content) return null
  const body = readMdClean(join(WORKSPACE, 'knowledge', `${name}.md`))
  return `---
title: ${slugToTitle(name)}
description: ${slugToTitle(name)} reference documentation
---

# ${slugToTitle(name)}

${body}

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
`
}

function main() {
  section('Documentation Generator')
  console.log(`  Workspace: ${WORKSPACE}`)
  console.log(`  Output:    ${DOCS}`)

  const agents = listDir(join(WORKSPACE, 'agents'))
  const skills = listDir(join(WORKSPACE, 'skills'))
  const commands = listDir(join(WORKSPACE, 'commands'))
  const playbooks = listFiles(join(WORKSPACE, 'playbooks'))
  const generators = listFiles(join(WORKSPACE, 'generators'))
  const knowledge = listFiles(join(WORKSPACE, 'knowledge'))

  console.log(`\n  Found: ${agents.length} agents, ${skills.length} skills, ${commands.length} commands`)
  console.log(`         ${playbooks.length} playbooks, ${generators.length} generators, ${knowledge.length} knowledge docs`)

  section('Generating Agent Pages')
  let count = 0
  agents.forEach(a => { const p = genAgentPage(a); if (p) { writeFile(`agents/${a}.md`, p); count++ } })
  log(`  Generated ${count} agent pages`)

  section('Generating Skill Pages')
  count = 0
  skills.forEach(s => { const p = genSkillPage(s); if (p) { writeFile(`skills/${s}.md`, p); count++ } })
  log(`  Generated ${count} skill pages`)

  section('Generating Command Pages')
  count = 0
  commands.forEach(c => { const p = genCommandPage(c); if (p) { writeFile(`commands/${c}.md`, p); count++ } })
  log(`  Generated ${count} command pages`)

  section('Generating Playbook Pages')
  count = 0
  playbooks.forEach(p => { const pg = genPlaybookPage(p); if (pg) { writeFile(`playbooks/${p}.md`, pg); count++ } })
  log(`  Generated ${count} playbook pages`)

  section('Generating Generator Pages')
  count = 0
  generators.forEach(g => { const p = genGeneratorPage(g); if (p) { writeFile(`generators/${g}.md`, p); count++ } })
  log(`  Generated ${count} generator pages`)

  section('Generating Knowledge Pages')
  count = 0
  knowledge.forEach(k => { const p = genKnowledgePage(k); if (p) { writeFile(`knowledge/${k}.md`, p); count++ } })
  log(`  Generated ${count} knowledge pages`)

  section('Done')
  console.log(`  Total pages generated in docs/`)
}

main()
