# Ahmed Enterprise AI Engineering Workspace

[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://ahmedhassaan2.github.io/Ahmed-Enterprise-AI-Workspace/)
[![Version](https://img.shields.io/badge/version-1.2.0-green)](https://github.com/AhmedHassaan2/Ahmed-Enterprise-AI-Workspace/releases/tag/v1.2.0)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Enterprise AI Engineering Workspace for OpenCode featuring reusable Agents, Skills, Commands, Playbooks, Knowledge Base, Workspace Memory, Metrics, Health System, and Self-Improvement architecture.

## Overview

A production-grade AI Engineering Platform that accelerates software development across any project type. Built with an 8-layer architecture model, it provides **21 agents**, **112 skills**, **21 commands**, **16 playbooks**, **6 generators**, **35 knowledge documents**, **36 practical examples**, **21 memory entries**, and **5 metrics templates**.

## What's Included

### Agents (21)
Specialized AI agents covering frontend, backend, database, API design, architecture, security, testing, accessibility, performance, DevOps, cloud, SEO, i18n, e-commerce, AI engineering, context engineering, design systems, and documentation.

### Skills (112)
Production-quality skills across 20 categories: frontend, backend, database, security, quality, architecture, performance, design, documentation, e-commerce, AI engineering, testing, i18n, DevOps, observability, workspace optimization, marketing, platform, utility, and process.

### Commands (21)
Reusable commands for code review, security scanning, performance checking, accessibility auditing, SEO analysis, page/component/API creation, refactoring, deployment, documentation, and workspace management.

### Playbooks (16)
Engineering workflows for: new projects, feature development, bug investigation, code review, refactoring, performance optimization, security review, documentation, production releases, API development, frontend/backend features, database migrations, AI features, deployment, and workspace maintenance.

### Generators (6)
Templates for generating: skills, agents, commands, playbooks, documentation, and templates.

### Knowledge Base (35)
Domain documents covering: Next.js, React, TypeScript, JavaScript, Tailwind CSS, HTML, CSS, Node.js, Prisma, PostgreSQL, Supabase, Docker, Kubernetes, Linux, Cloudflare, Vercel, OWASP, Authentication, Authorization, API Design, Clean Architecture, SOLID, DDD, Performance, SEO, Accessibility, AI Engineering, Prompt Engineering, Context Engineering, RAG, MCP, Embeddings, Vector Databases, Tool Calling, and Agent Design.

### Examples (36)
Practical examples across 12 categories (components, APIs, database schemas, folder structures, authentication, security, SEO, performance, accessibility, AI workflows, documentation, testing) with good, bad, and before-after comparisons.

### Workspace Memory (21 entries)
Persistent engineering knowledge organized by: patterns, decisions, mistakes, lessons, preferences, and templates.

### Metrics System
Tracking templates for: component usage, quality scores, health indicators, and periodic reports.

### Self-Improvement
Automatic workspace analysis, issue detection, and quality preservation.

## Architecture

```
8-Layer Workspace Model
├── Personal      — Developer preferences
├── Professional  — Universal engineering standards
├── Domain        — Engineering domain knowledge
├── Quality       — Testing, review, a11y, performance
├── Security      — Auth, secrets, compliance
├── Automation    — Commands, workflows, playbooks
├── Knowledge     — Decisions, learnings, memory
└── Future        — Experimental, expansion hooks
```

## Installation

```bash
# Clone the repository
git clone https://github.com/AhmedHassaan2/Ahmed-Enterprise-AI-Workspace.git

# Copy to OpenCode config directory
cp -r Ahmed-Enterprise-AI-Workspace/* ~/.config/opencode/
```

## Usage

Once installed, the workspace loads automatically when OpenCode starts. Agents, skills, and commands are available immediately.

### Quick Start

- **Build:** `@build` or let the primary agent handle it
- **Plan:** `@plan` for analysis without modifications
- **Audit:** `/security-scan`, `/performance-check`, `/a11y-audit`
- **Create:** `/new-page`, `/new-api`, `/new-component`
- **Review:** `/review` for comprehensive code review
- **Health:** `/health-check` for workspace validation
- **Improve:** `/self-improve` for workspace self-analysis

## File Structure

```
~/.config/opencode/
├── opencode.json          # Main configuration
├── AGENTS.md              # Global rules and manifest
├── MANIFEST.md            # Complete inventory
├── DECISIONS.md           # Architecture Decision Records
├── DEPENDENCIES.md        # Dependency graph
├── agents/                # 21 domain agents
├── skills/                # 112 global skills
├── commands/              # 21 global commands
├── playbooks/             # 16 engineering playbooks
├── generators/            # 6 workspace generators
├── knowledge/             # 35 domain knowledge documents
├── examples/              # 36 example files
├── templates/             # 3 creation templates
├── workspace-memory/      # Persistent engineering memory
└── metrics/               # Workspace analytics
```

## Documentation

📖 **Full Documentation:** [GitHub Pages](https://ahmedhassaan2.github.io/Ahmed-Enterprise-AI-Workspace/)

- [MANIFEST.md](MANIFEST.md) — Complete component inventory
- [DECISIONS.md](DECISIONS.md) — Architecture Decision Records
- [DEPENDENCIES.md](DEPENDENCIES.md) — Component dependency graph
- [CHANGELOG.md](CHANGELOG.md) — Version history
- [RELEASE_NOTES.md](RELEASE_NOTES.md) — Release notes
- [VERSION.md](VERSION.md) — Version information

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License — see [LICENSE](LICENSE)

## Author

**Ahmed Hassaan** — [GitHub](https://github.com/Ahmed-Hassaan-Dev)
