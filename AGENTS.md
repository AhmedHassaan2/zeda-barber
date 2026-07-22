# OpenCode Enterprise Workspace

**Workspace Version:** v1.1 (Stable)
**Status:** Frozen — no further modifications
**Owner:** Ahmed Hassaan
**Release Date:** 2026-07-19

---

## Vision

A production-grade AI Engineering Platform that accelerates software development across any project type — SaaS, E-Commerce, Enterprise, Dashboards, CMS, Portfolios, AI Applications, Internal Tools, Mobile Backends, APIs, and Design Systems.

## Engineering Philosophy

- **TypeScript first** — strict mode, no `any`, explicit types
- **Next.js App Router** as the default React framework
- **Tailwind CSS** for all styling
- **Supabase** as the default backend (PostgreSQL + Auth + Storage)
- **Vercel** as the default deployment target
- **Bilingual Arabic/English** with RTL-first design
- **Security by default** — never hardcode secrets, always validate input
- **Test what matters** — E2E for critical paths, unit for complex logic
- **Document decisions** — ADRs for architecture, comments for non-obvious logic

---

## Personal Layer

These are Ahmed's established engineering preferences. They apply globally across all projects.

### Languages and Frameworks

- **Primary Language:** TypeScript (strict mode, ES2017 target)
- **Runtime:** Node.js
- **Frontend Framework:** Next.js 16 (App Router)
- **React Version:** 19+
- **Styling:** Tailwind CSS 3.4+
- **Backend:** Next.js Route Handlers (REST)
- **Database:** Supabase (PostgreSQL) — direct client, no ORM in simple projects; Prisma in complex projects
- **Deployment:** Vercel
- **Package Manager:** npm

### UI and Design

- **Icon System:** Material Symbols Outlined
- **Color System:** Material Design 3 tokens (surface, primary-container, on-surface hierarchy)
- **Typography:** Cairo (Arabic body), Tajawal (display), Changa (decorative), Playfair Display (English serif)
- **Responsive:** Mobile-first with `md:` breakpoints
- **Animations:** Tailwind transitions (duration-300/400/500), no heavy animation libraries
- **Dark Mode:** Class-based (`darkMode: "class"`)

### Architecture Patterns

- **Component Structure:** Flat `src/components/` — no deep nesting
- **Page Structure:** Next.js App Router pages in `src/app/`
- **Shared Code:** `src/lib/` for utilities, contexts, clients
- **API Routes:** `src/app/api/` following Next.js conventions
- **State Management:** React Context for global state, useState for local state
- **No heavy state libraries** — avoid Redux, Zustand unless complexity demands it

### Communication Style

- Bilingual (Arabic primary, English secondary)
- RTL-first layout design
- Client-side language switching via React Context
- Translation keys follow `section.element` naming (e.g., `hero.title`, `booking.step1`)

### Admin Panel Patterns

- Simple token-based auth (localStorage) for low-security admin panels
- Tab-based dashboard layouts
- Supabase admin client (`SUPABASE_SERVICE_ROLE_KEY`) for privileged operations
- Direct Supabase queries — no abstraction layer for simple CRUD

### Git Workflow

- Descriptive commit messages with scope prefixes: `feat:`, `fix:`, `chore:`, `refactor:`
- No force pushes to main
- Clean history preferred over perfect history

---

## Professional Layer

Universal engineering standards that apply to all projects regardless of tech stack.

### Coding Standards

- Write self-documenting code; comments explain why, not what
- Functions should do one thing well (Single Responsibility)
- Prefer composition over inheritance
- Fail fast with descriptive errors
- Never swallow errors silently — log them
- Validate all external input at boundaries
- Use meaningful variable and function names
- Keep files under 300 lines; extract when larger
- Consistent naming: camelCase for variables/functions, PascalCase for components/types, kebab-case for files

### Architecture Standards

- Separate concerns: UI, business logic, data access, infrastructure
- Dependencies point inward (clean architecture)
- Interfaces over implementations (dependency inversion)
- Explicit error handling at every boundary
- Configuration via environment variables, never hardcoded
- Database schema changes through migrations, never direct SQL in production

### Security Standards

- Never commit secrets, API keys, or passwords to source control
- Use environment variables for all sensitive configuration
- Validate and sanitize all user input
- Use parameterized queries (Supabase client handles this)
- Implement proper authentication and authorization checks
- Set secure HTTP headers
- Audit dependencies regularly
- Apply principle of least privilege

### Quality Standards

- No `any` types in TypeScript
- Handle all error paths (no unhandled promises)
- Validate environment variables at startup
- Write tests for business logic and critical paths
- Code review before merge
- Lint and format before commit

### Documentation Standards

- README.md for every project
- Architecture Decision Records (ADRs) for significant decisions
- API documentation for every endpoint
- Component documentation for complex UI components
- Inline comments for non-obvious logic only

---

## Workspace Layers

| Layer | Scope | Location | Mutability |
|---|---|---|---|
| **Personal** | Ahmed's preferences and style | This file (Personal Layer section) | User edits |
| **Professional** | Universal engineering standards | This file (Professional Layer section) | Rarely changes |
| **Domain** | Engineering domain knowledge | Skills in `skills/` directories | Grows over time |
| **Quality** | Testing, review, a11y, performance | Skills + agent prompts | Evolves with maturity |
| **Security** | Auth, secrets, compliance, audit | Security agent + rules | Stable, audited |
| **Automation** | Commands, workflows, templates | Commands in `commands/` directories | Added as needed |
| **Knowledge** | Memory, decisions, learnings | This file (sections below) + project AGENTS.md | Accumulates |
| **Future** | Expansion hooks, experimental | Config flags, disabled skills | Activated when ready |

---

## Workspace Manifest

### Agents Available (19 global + 3 project = 22 total)

**Primary (build/plan):**
- `build` — Default agent, full tool access
- `plan` — Analysis and planning, no modifications

**Domain Subagents (17):**
- `frontend` — React components, styling, responsive design, client-side logic
- `backend` — API routes, server logic, data processing, background jobs
- `database` — Schema design, queries, migrations, optimization
- `api-designer` — API contracts, REST design, versioning, documentation
- `architect` — System design, patterns, refactoring strategy, technical debt
- `reviewer` — Code quality review, pattern consistency, maintainability
- `security` — Vulnerability assessment, auth review, secrets detection, OWASP
- `tester` — Test creation, strategy, coverage analysis
- `accessibility` — WCAG audit, ARIA review, keyboard navigation
- `performance` — Bundle analysis, Core Web Vitals, caching, optimization
- `devops` — CI/CD pipelines, build automation, deployment
- `cloud` — Cloud architecture review, serverless patterns, cost optimization
- `seo` — Meta tags, structured data, sitemap, Open Graph
- `i18n` — Translation management, RTL validation, locale routing
- `ecommerce` — Product catalogs, carts, checkout, pricing
- `ai-engineer` — LLM integration, RAG, prompt optimization
- `context-engineer` — Workspace optimization, AGENTS.md maintenance
- `designer` — Design systems, tokens, typography, motion design

### Skills Available (67 global + 14 project = 81 total)

See `~/.config/opencode/skills/` for global skills (67 across 16 categories).
See `.opencode/skills/` for project-specific skills (14).

Skills are loaded on-demand via the `skill` tool. Each skill solves one clear engineering problem.

### Commands Available (17 global + 5 project = 22 total)

See `~/.config/opencode/commands/` for global commands (17).
See `.opencode/commands/` for project-specific commands (5).

Commands are invoked with `/command-name` in the TUI.

### Routing Rules

**Domain Detection (by file path):**
- `src/components/`, `*.tsx` with JSX → Frontend agent
- `src/app/api/`, `route.ts` → Backend + API Designer agents
- `src/app/` pages → Frontend agent
- Schema/migration files → Database agent
- `.github/workflows/` → DevOps agent
- `src/app/admin/` → Frontend + Backend agents
- Translation files, `t()` calls → i18n agent
- `*.test.*`, `*.spec.*` → Tester agent
- Auth/token/security files → Security agent
- Meta tags, `generateMetadata` → SEO agent
- ARIA, role attributes → Accessibility agent

**Domain Detection (by keywords):**
- component, render, props, state, hook, CSS → Frontend
- API, endpoint, route, request, middleware → Backend
- database, schema, table, query, migration → Database
- deploy, build, CI, pipeline, Docker → DevOps
- security, auth, token, permission → Security
- test, coverage, mock, assert, spec → Testing
- performance, bundle, lazy, cache, optimize → Performance
- accessibility, a11y, WCAG, ARIA → Accessibility
- SEO, meta, sitemap, ranking → SEO
- translate, i18n, RTL, Arabic, locale → i18n
- payment, Stripe, checkout, cart → E-Commerce
- architecture, pattern, refactor, scale → Architecture
- LLM, AI, prompt, embedding, vector → AI Engineering

**Priority Hierarchy:**
1. Security findings → always addressed first
2. Build-breaking issues → fixed before feature work
3. User explicit request → highest intent priority
4. Primary agent domain detection → automatic routing
5. Skill-triggered loading → on-demand context
6. Quality recommendations → advisory
7. Performance suggestions → advisory

**Conflict Resolution:**
- Security overrides all other domains when there's a conflict
- Accessibility wins over SEO when they conflict
- Multiple agent suggestions → primary agent presents both to user
- Skill overlap → load both; they complement rather than conflict

---

## Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Agent files | lowercase, hyphen-separated | `reviewer.md` |
| Skill directories | lowercase, hyphen-separated | `react-patterns/SKILL.md` |
| Command files | lowercase, hyphen-separated | `new-page.md` |
| TypeScript files | camelCase | `languageContext.ts` |
| React components | PascalCase | `GalleryGrid.tsx` |
| CSS classes | Tailwind utilities | `bg-primary text-surface` |
| Translation keys | dot-separated, section.element | `hero.title`, `booking.step1` |
| Environment variables | SCREAMING_SNAKE_CASE | `NEXT_PUBLIC_SUPABASE_URL` |
| Git commits | `type(scope): description` | `feat(booking): add time picker` |

---

## Knowledge Accumulation Rules

| When | What to Record | Where |
|---|---|---|
| New pattern established | Add to project AGENTS.md "Patterns" section | Project AGENTS.md |
| Bug root cause found | Add to project AGENTS.md "Known Issues" | Project AGENTS.md |
| Architecture decision made | Add ADR or note to AGENTS.md "Decisions" | Project AGENTS.md |
| New convention adopted | Add to project AGENTS.md "Conventions" | Project AGENTS.md |
| Performance lesson learned | Add to relevant skill | Skills |
| Security finding | Add to project AGENTS.md "Security Notes" | Project AGENTS.md |

**Anti-Patterns (Never Store):**
- Credentials or secrets
- Temporary workarounds (mark as `[TEMP]` and remove later)
- Duplicate information across layers
- Information that belongs in code
- Speculative future requirements

---

## Dependency Graph

```
AGENTS (depend on skills for domain knowledge):
  build → (all skills, default entry point)
  plan → reviewer, architect, security
  frontend → react-patterns, nextjs-app-router, tailwind-css, responsive-design, form-engineering
  backend → api-design, nextjs-route-handlers, background-jobs
  database → database-design, supabase-patterns, prisma-patterns
  security → security-audit, authentication-patterns, secrets-management
  reviewer → code-review-standards, refactoring-patterns
  performance → web-performance, caching-strategies, image-optimization
  accessibility → wcag-checklist, keyboard-navigation
  seo → technical-seo, nextjs-seo
  i18n → i18n-architecture, rtl-engineering
  devops → ci-cd-pipelines, vercel-deployment, docker-patterns
  architect → (reads all skills for context, no direct dependencies)

SKILLS (cross-references):
  react-patterns ↔ nextjs-app-router (complementary)
  tailwind-css ↔ responsive-design (complementary)
  security-audit ↔ authentication-patterns ↔ secrets-management (security cluster)
  database-design ↔ supabase-patterns ↔ prisma-patterns (database cluster)
  api-design ↔ nextjs-route-handlers (API cluster)
  web-performance ↔ caching-strategies ↔ image-optimization ↔ bundle-optimization (performance cluster)
  wcag-checklist ↔ keyboard-navigation ↔ screen-reader-patterns (a11y cluster)

COMMANDS (depend on agents):
  /review → plan (subtask)
  /security-scan → security (subtask)
  /performance-check → performance (subtask)
  /a11y-audit → accessibility (subtask)
  /seo-check → seo (subtask)
  /new-page → frontend (subtask)
  /new-api → backend (subtask)
  /new-component → frontend (subtask)
  /refactor → architect (subtask)
  /deploy-check → devops (subtask)
  /generate-docs → (current agent)
  /create-skill → (current agent)
  /create-agent → (current agent)
  /health-check → (current agent, bash)
```

---

## Changelog

### v1.1.0 (2026-07-19) — Incremental Upgrade

**Workspace Memory System**
- Created workspace-memory/ with 6 categories (patterns, decisions, mistakes, lessons, preferences, templates)
- 21 seed entries covering core engineering knowledge
- README.md with search conventions and usage guide
- INDEX.md with master index and tags

**Workspace Metrics System**
- Created metrics/ with tracking templates
- CURRENT.md — live metrics snapshot
- HISTORY.md — metrics history log
- REPORT-TEMPLATE.md — periodic report template
- SCORING.md — scoring methodology

**Self-Improvement System**
- Created /self-improve command — workspace analysis and auto-fix
- Created workspace-optimization skill — detection and strengthening strategies

**Manifest Updates**
- Skills: 66 → 67 (added workspace-optimization)
- Commands: 16 → 17 (added self-improve)
- Updated MANIFEST.md, DEPENDENCIES.md with new components

### v1.0.0 (2026-07-19) — Production Release

**Phase 4.5: Enterprise Workspace Finalization**
- Created 16 engineering playbooks (full coverage of all workflows)
- Created 6 workspace generators (skill, agent, command, playbook, documentation, template)
- Created workspace health system (validate-workspace skill, /workspace-audit, /workspace-validate)
- Created knowledge base (35 domain documents across frontend, backend, security, architecture, AI)
- Created examples library (36 files across 12 categories: good, bad, before-after)
- Updated all manifests and synchronization
- Final counts: 22 agents, 80 skills, 21 commands, 16 playbooks, 6 generators, 35 knowledge docs, 36 examples

**Phase 4: Validation & Cleanup**
- Deleted duplicate agent: security-auditor.md
- Deleted duplicate/weak skills: code-review, refactor, test, my-first-skill
- Renamed code-reviewer.md → reviewer.md
- Merged css-animation + motion-design → css-motion-design
- Merged environment-management + secrets-management → environment-secrets
- Strengthened weak skills: debug, jwt-security, caching-strategies
- Created validate-workspace, state-management skills
- Strengthened weak agents: architect.md, cloud.md, reviewer.md
- Created MANIFEST.md, DECISIONS.md, DEPENDENCIES.md

**Phase 3: Full Implementation**
- Initial enterprise workspace implementation
- 19 custom agents across all engineering domains
- 66 global skills across 16 categories
- 14 reusable commands
- 8-layer workspace architecture
- Smart routing with domain detection
- Knowledge accumulation system

---

## Future Roadmap

### v1.2 (Planned)
- MCP server integrations (Context7, Sentry)
- Visual regression testing skills
- Automated skill generation from codebase analysis

### v1.3 (Planned)
- Plugin system for custom tools
- Advanced prompt engineering skills
- LLM evaluation frameworks

### v2.0 (Future)
- Multi-project workspace management
- Team collaboration features
- Cross-workspace skill sharing
