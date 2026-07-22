# Workspace Memory System

A structured knowledge base for the OpenCode workspace that accumulates patterns, decisions, mistakes, lessons, and preferences over time.

## Purpose

Every AI agent in this workspace needs context to produce consistent, high-quality work. The Memory System provides that context without bloating individual project files.

## Categories

| Directory | Purpose | Example |
|---|---|---|
| `patterns/` | Reusable code patterns and implementations | API route structure, component composition |
| `decisions/` | Architecture and technology choices | TypeScript strict mode, Supabase over Prisma |
| `mistakes/` | Errors to avoid and their fixes | Hardcoded credentials, missing error handling |
| `lessons/` | Technical insights and performance tips | RTL logical properties, mobile-first design |
| `preferences/` | Coding style and workflow conventions | Naming conventions, file structure |
| `templates/` | Templates for new entries and retrospectives | Memory entry template, retrospective template |

## File Naming Convention

All files use the format: `YYYY-MM-DD_topic-name.md`

- Date prefix ensures chronological sorting
- Topic name uses lowercase kebab-case
- One concept per file

## How Agents Consult Memory

1. Agents load `INDEX.md` at session start for overview
2. Before solving a problem, agents search relevant categories using tags
3. During work, agents reference specific entries for guidance
4. After learning something new, agents create new memory entries

## Search Conventions

Tags are the primary search mechanism. Each entry includes:
- `category` — which directory it belongs to
- `tags` — array of searchable keywords
- `project` — optional project association
- `severity` — for mistakes (low/medium/high/critical)

## Creating New Entries

1. Copy the template from `templates/memory-entry-template.md`
2. Fill in all metadata fields
3. Use the standard file naming convention
4. Update `INDEX.md` with the new entry
5. Write 20-50 lines — practical and specific

## Maintenance

- Review entries quarterly for accuracy
- Remove outdated entries (archive, don't delete)
- Merge duplicate patterns
- Promote repeated mistakes to lessons with fixes
