# OpenCode Workspace Manifest

**Version:** v1.1
**Status:** Stable
**Release Name:** Ahmed Enterprise AI Engineering Workspace v1.1
**Owner:** Ahmed Hassaan
**Release Date:** 2026-07-19
**Frozen:** Yes — no further modifications to this version

---

## Workspace Identity

| Property | Value |
|----------|-------|
| Name | OpenCode Enterprise Workspace |
| Type | AI Engineering Platform |
| Scope | Global (all projects) + Project-specific |
| Architecture | 8-Layer Model |
| Config File | `~/.config/opencode/opencode.json` |
| Rules File | `~/.config/opencode/AGENTS.md` |

---

## Agents Registry

### Primary Agents (Built-in)

| Agent | Role | Access |
|-------|------|--------|
| `build` | Default agent, full tool access | All tools |
| `plan` | Analysis and planning, no modifications | Read-only |

### Domain Agents (Custom)

| Agent | File | Specialty | Edit Access |
|-------|------|-----------|-------------|
| `frontend` | `agents/frontend.md` | React, Next.js, Tailwind, client-side | Yes |
| `backend` | `agents/backend.md` | API routes, server logic, background jobs | Yes |
| `database` | `agents/database.md` | PostgreSQL, Supabase, Prisma, migrations | Yes |
| `api-designer` | `agents/api-designer.md` | REST API design, contracts, versioning | Yes |
| `architect` | `agents/architect.md` | System design, technical debt, refactoring | No (read-only) |
| `reviewer` | `agents/reviewer.md` | Code quality, security, performance review | No (read-only) |
| `security` | `agents/security.md` | Vulnerability assessment, OWASP, secrets | No (read-only) |
| `tester` | `agents/tester.md` | Test strategy, Vitest, Playwright, coverage | Yes |
| `accessibility` | `agents/accessibility.md` | WCAG 2.1 AA, ARIA, keyboard navigation | Yes |
| `performance` | `agents/performance.md` | Core Web Vitals, bundle, caching, images | Yes |
| `devops` | `agents/devops.md` | CI/CD, deployment, monitoring, IaC | Yes |
| `cloud` | `agents/cloud.md` | Vercel, Supabase, serverless, cost optimization | No (read-only) |
| `seo` | `agents/seo.md` | Meta tags, structured data, Open Graph | Yes |
| `i18n` | `agents/i18n.md` | Translation, RTL, locale routing | Yes |
| `ecommerce` | `agents/ecommerce.md` | Products, carts, checkout, payments | Yes |
| `ai-engineer` | `agents/ai-engineer.md` | LLM, RAG, prompt engineering, embeddings | Yes |
| `context-engineer` | `agents/context-engineer.md` | Workspace maintenance, AGENTS.md, skills | Yes |
| `designer` | `agents/designer.md` | Design tokens, typography, motion design | Yes |
| `docs-writer` | `agents/docs-writer.md` | README, ADRs, API docs, changelogs | Yes |

---

## Skills Registry

### Global Skills (67 total)

#### Frontend (7)
| Skill | Category | Priority |
|-------|----------|----------|
| `react-patterns` | frontend | high |
| `nextjs-app-router` | frontend | high |
| `tailwind-css` | frontend | high |
| `responsive-design` | frontend | high |
| `form-engineering` | frontend | high |
| `state-management` | frontend | high |
| `css-motion-design` | frontend | medium |

#### Backend (6)
| Skill | Category | Priority |
|-------|----------|----------|
| `api-design` | backend | high |
| `nextjs-route-handlers` | backend | high |
| `background-jobs` | backend | medium |
| `storage-patterns` | backend | medium |
| `email-systems` | backend | medium |
| `realtime-patterns` | backend | medium |

#### Database (5)
| Skill | Category | Priority |
|-------|----------|----------|
| `database-design` | database | high |
| `supabase-patterns` | database | high |
| `prisma-patterns` | database | medium |
| `sql-optimization` | database | medium |
| `data-migration` | database | medium |

#### Security (7)
| Skill | Category | Priority |
|-------|----------|----------|
| `authentication-patterns` | security | high |
| `jwt-security` | security | high |
| `environment-secrets` | devops | high |
| `input-validation` | security | high |
| `rate-limiting` | security | medium |
| `owasp-top-10` | security | high |
| `security-audit` | security | high |
| `authorization-patterns` | security | high |

#### Architecture (5)
| Skill | Category | Priority |
|-------|----------|----------|
| `clean-architecture` | architecture | high |
| `solid-principles` | architecture | high |
| `design-patterns` | architecture | medium |
| `refactoring-patterns` | architecture | medium |
| `scalability` | architecture | medium |

#### Quality (7)
| Skill | Category | Priority |
|-------|----------|----------|
| `testing-strategy` | quality | high |
| `vitest-unit` | quality | high |
| `playwright-e2e` | quality | high |
| `code-review-standards` | quality | high |
| `web-performance` | quality | high |
| `bundle-optimization` | quality | medium |
| `image-optimization` | quality | high |
| `caching-strategies` | quality | high |

#### Accessibility (3)
| Skill | Category | Priority |
|-------|----------|----------|
| `wcag-checklist` | quality | high |
| `keyboard-navigation` | quality | high |
| `screen-reader-patterns` | quality | medium |

#### DevOps (5)
| Skill | Category | Priority |
|-------|----------|----------|
| `vercel-deployment` | devops | high |
| `ci-cd-pipelines` | devops | high |
| `docker-patterns` | devops | medium |
| `infrastructure-as-code` | devops | medium |

#### Observability (3)
| Skill | Category | Priority |
|-------|----------|----------|
| `structured-logging` | observability | high |
| `error-tracking` | observability | high |
| `monitoring-observability` | observability | medium |

#### AI (6)
| Skill | Category | Priority |
|-------|----------|----------|
| `llm-integration` | ai | high |
| `prompt-engineering` | ai | high |
| `rag-patterns` | ai | medium |
| `context-engineering` | ai | high |
| `agent-design` | ai | medium |
| `mcp-integration` | ai | medium |

#### Documentation (3)
| Skill | Category | Priority |
|-------|----------|----------|
| `api-documentation` | documentation | medium |
| `architecture-decisions` | documentation | medium |
| `component-documentation` | documentation | medium |

#### i18n (2)
| Skill | Category | Priority |
|-------|----------|----------|
| `i18n-architecture` | i18n | high |
| `rtl-engineering` | i18n | high |

#### Design (2)
| Skill | Category | Priority |
|-------|----------|----------|
| `design-systems` | design | high |
| `typography-systems` | design | medium |

#### Analytics (2)
| Skill | Category | Priority |
|-------|----------|----------|
| `product-analytics` | analytics | medium |
| `conversion-optimization` | analytics | medium |

#### Debugging (1)
| Skill | Category | Priority |
|-------|----------|----------|
| `debug` | quality | high |

#### Workspace (1)
| Skill | Category | Priority |
|-------|----------|----------|
| `workspace-optimization` | quality | high |

---

## Commands Registry

### Global Commands (17)

| Command | Agent | Purpose | Edit Access |
|---------|-------|---------|-------------|
| `/review` | plan | Comprehensive code review | No |
| `/security-scan` | security | Security vulnerability assessment | No |
| `/performance-check` | performance | Performance analysis | Yes |
| `/a11y-audit` | accessibility | WCAG 2.1 AA audit | Yes |
| `/seo-check` | seo | SEO analysis | Yes |
| `/new-page` | frontend | Create new Next.js page | Yes |
| `/new-api` | backend | Create new API route | Yes |
| `/new-component` | frontend | Create new React component | Yes |
| `/refactor` | architect | Refactoring assistance | Edit only |
| `/deploy-check` | devops | Deployment readiness | Yes |
| `/generate-docs` | docs-writer | Generate documentation | Yes |
| `/create-skill` | context-engineer | Create new skill | Yes |
| `/create-agent` | context-engineer | Create new agent | Yes |
| `/health-check` | context-engineer | Workspace health check | Yes |
| `/workspace-audit` | context-engineer | Deep workspace audit | Yes |
| `/workspace-validate` | context-engineer | Workspace validation | Yes |
| `/self-improve` | context-engineer | Self-analysis and improvement | Yes |

---

## Playbooks Registry (16)

| Playbook | Goal | Key Agents |
|----------|------|------------|
| `new-project` | Set up a new project with workspace | build, context-engineer |
| `feature-development` | Build features from requirements to deployment | build, frontend, backend |
| `bug-investigation` | Systematically identify and resolve bugs | build, frontend, backend, database |
| `code-review` | Conduct and respond to code reviews | reviewer, security, performance |
| `refactoring` | Improve code structure without changing behavior | architect, build, reviewer |
| `performance-optimization` | Identify and resolve performance bottlenecks | performance, frontend, backend, database |
| `security-review` | Identify and remediate security vulnerabilities | security, backend, database |
| `documentation` | Create or update documentation | docs-writer, context-engineer |
| `production-release` | Safely deploy changes to production | devops, security, performance |
| `api-design` | Design and implement REST APIs | api-designer, backend, security |
| `frontend-feature` | Build frontend features with components and styling | frontend, accessibility, performance |
| `backend-feature` | Build server-side logic with error handling | backend, api-designer, database |
| `database-migration` | Safely modify database schema | database, backend, security |
| `ai-feature` | Integrate AI capabilities into applications | ai-engineer, backend, database |
| `deployment` | Configure and execute deployment | devops, cloud, security |
| `workspace-maintenance` | Keep workspace healthy and consistent | context-engineer, reviewer |

---

## Generators Registry (6)

| Generator | Purpose | Output |
|-----------|---------|--------|
| `skill-generator` | Generate production-quality skills | `skills/{name}/SKILL.md` |
| `agent-generator` | Generate production-quality agents | `agents/{name}.md` |
| `command-generator` | Generate production-quality commands | `commands/{name}/command.md` |
| `playbook-generator` | Generate production-quality playbooks | `playbooks/{name}.md` |
| `documentation-generator` | Generate documentation for components | Various `.md` files |
| `template-generator` | Generate reusable templates | `templates/{type}-template.md` |

---

## Knowledge Base (35 documents)

### Frontend (8)
| Document | Topics |
|----------|--------|
| `nextjs.md` | App Router, Server/Client Components, layouts, routing, data fetching |
| `react.md` | React 19, hooks, component patterns, Server Components |
| `typescript.md` | Strict mode, generics, utility types, type narrowing |
| `javascript.md` | ES2017+, async/await, Promises, event loop, modules |
| `tailwind-css.md` | Utility-first, responsive, dark mode, plugins, JIT |
| `html.md` | Semantic HTML5, accessibility, ARIA, Open Graph |
| `css.md` | Grid, Flexbox, custom properties, container queries, :has() |
| `nodejs.md` | Event loop, streams, ES modules, package management |

### Backend & Database (8)
| Document | Topics |
|----------|--------|
| `prisma.md` | ORM, schema, migrations, queries, transactions |
| `postgresql.md` | Indexing, CTEs, window functions, JSONB, optimization |
| `supabase.md` | RLS, Auth, Edge Functions, Storage, Realtime |
| `docker.md` | Dockerfile, multi-stage builds, compose, security |
| `kubernetes.md` | Pods, Deployments, Services, Ingress, HPA |
| `linux.md` | File system, permissions, systemd, networking |
| `cloudflare.md` | Workers, KV, R2, D1, Durable Objects, Pages |
| `vercel.md` | ISR, SSR, SSG, Edge Functions, analytics |

### Security & Architecture (8)
| Document | Topics |
|----------|--------|
| `owasp.md` | OWASP Top 10 2021, vulnerability categories |
| `authentication.md` | JWT, sessions, OAuth, password hashing, MFA |
| `authorization.md` | RBAC, ABAC, permission models, middleware |
| `api-design.md` | REST conventions, versioning, pagination, rate limiting |
| `clean-architecture.md` | SOLID, dependency inversion, use cases, layers |
| `solid.md` | Single Responsibility, Open/Closed, Liskov, ISP, DIP |
| `ddd.md` | Aggregates, entities, value objects, bounded contexts |
| `performance.md` | Core Web Vitals, bundle optimization, caching |

### AI & Emerging (11)
| Document | Topics |
|----------|--------|
| `seo.md` | Technical SEO, meta tags, structured data, sitemap |
| `accessibility.md` | WCAG 2.1 AA, ARIA, keyboard nav, screen readers |
| `ai-engineering.md` | LLM integration, streaming, function calling |
| `prompt-engineering.md` | Prompt design, few-shot, chain-of-thought |
| `context-engineering.md` | Context window management, compression |
| `rag.md` | Retrieval-Augmented Generation, chunking, embeddings |
| `mcp.md` | Model Context Protocol, servers, tools, resources |
| `embeddings.md` | Text embeddings, similarity search, models |
| `vector-databases.md` | Pinecone, pgvector, HNSW, metadata filtering |
| `tool-calling.md` | LLM function calling, schema definition, chaining |
| `agent-design.md` | AI agent architecture, planning, memory, tools |

---

## Examples Library (36 files across 12 categories)

| Category | Good | Bad | Before-After |
|----------|------|-----|-------------|
| `components` | Well-structured React component | Monolithic component with `any` types | Refactoring explanation |
| `api` | Clean API with validation | No validation, no error handling | Improvement walkthrough |
| `database` | Proper schema with indexes/RLS | No indexes, no constraints | Schema improvement |
| `folder-structure` | Clean flat structure | Deep nesting, inconsistent naming | Reorganization |
| `authentication` | Secure auth with httpOnly cookies | localStorage tokens, no server validation | Security improvement |
| `security` | Input validation, parameterized queries | SQL injection, hardcoded secrets | Security hardening |
| `seo` | generateMetadata with OG tags | No metadata, no structured data | SEO improvement |
| `performance` | Lazy loading, memoization | No optimization, unnecessary re-renders | Performance tuning |
| `accessibility` | Semantic HTML, ARIA, keyboard nav | Div soup, no ARIA, no keyboard support | A11y improvement |
| `ai-workflows` | LLM with error handling, guardrails | No error handling, hardcoded prompts | AI integration improvement |
| `documentation` | Clear docs with examples | Outdated, incomplete docs | Documentation improvement |
| `testing` | Well-structured tests | Brittle tests, no coverage | Testing improvement |

---

## Workspace Memory System (v1.1)

**Location:** `~/.config/opencode/workspace-memory/`

| Category | Purpose | Seed Entries |
|----------|---------|-------------|
| `patterns/` | Successful implementation patterns | 5 |
| `decisions/` | Architectural decisions and rationale | 3 |
| `mistakes/` | Recurring mistakes to avoid | 4 |
| `lessons/` | Engineering lessons learned | 4 |
| `preferences/` | Engineering preferences and conventions | 3 |
| `templates/` | Memory entry templates | 2 |

**Total:** 21 seed entries + README.md + INDEX.md

**Usage:** Agents consult Memory before creating new implementations. Search by tags or category.

---

## Workspace Metrics System (v1.1)

**Location:** `~/.config/opencode/metrics/`

| File | Purpose |
|------|---------|
| `README.md` | System overview and usage guide |
| `CURRENT.md` | Live metrics snapshot template |
| `HISTORY.md` | Metrics history log |
| `REPORT-TEMPLATE.md` | Periodic report template |
| `SCORING.md` | Scoring methodology |

**Tracked Metrics:** Agent/skill/command usage, success/failure rates, quality scores (validation, security, performance, documentation), component health indicators.

---

## Self-Improvement System (v1.1)

**Command:** `/self-improve`
**Skill:** `workspace-optimization`

**Capabilities:**
- Full workspace scan and quality scoring
- Detection of obsolete, weak, redundant, duplicate, outdated, missing, broken, or orphaned components
- Automatic fixes for safe operations (metadata, references, counts)
- Improvement recommendations with priority and effort estimates
- Quality preservation — never reduces quality or removes important knowledge

| # | Layer | Scope | Location | Mutability |
|---|-------|-------|----------|------------|
| 1 | **Personal** | Ahmed's preferences | `AGENTS.md` → Personal Layer | User edits |
| 2 | **Professional** | Universal engineering standards | `AGENTS.md` → Professional Layer | Rarely changes |
| 3 | **Domain** | Engineering domain knowledge | `skills/` directories | Grows over time |
| 4 | **Quality** | Testing, review, a11y, performance | Skills + agent prompts | Evolves |
| 5 | **Security** | Auth, secrets, compliance | Security agent + rules | Stable, audited |
| 6 | **Automation** | Commands, workflows | `commands/` directories | Added as needed |
| 7 | **Knowledge** | Decisions, learnings, memory | `DECISIONS.md` + project `AGENTS.md` | Accumulates |
| 8 | **Future** | Experimental, planned | Config flags | Activated when ready |

---

## File Structure

```
~/.config/opencode/
├── opencode.json              # Main configuration
├── AGENTS.md                  # Global rules and manifest
├── MANIFEST.md                # This file — complete inventory
├── DECISIONS.md               # Architecture Decision Records
├── DEPENDENCIES.md            # Dependency graph
├── WORKSPACE-COMPLETION-REPORT.md  # v1.0 completion report
├── UPGRADE-v1.1-REPORT.md     # v1.1 upgrade report
├── .gitignore                 # Secrets exclusion
├── agents/                    # 19 domain agents
├── skills/                    # 67 global skills
│   ├── react-patterns/SKILL.md
│   ├── ...
│   └── workspace-optimization/SKILL.md
├── commands/                  # 17 global commands
│   ├── review/command.md
│   ├── ...
│   ├── workspace-validate/command.md
│   └── self-improve/command.md
├── playbooks/                 # 16 engineering playbooks
├── generators/                # 6 workspace generators
├── knowledge/                 # 35 domain knowledge documents
├── templates/                 # 3 creation templates
├── examples/                  # 36 example files (12 categories)
├── workspace-memory/          # Persistent engineering memory (v1.1)
│   ├── README.md
│   ├── INDEX.md
│   ├── patterns/              # 5 seed entries
│   ├── decisions/             # 3 seed entries
│   ├── mistakes/              # 4 seed entries
│   ├── lessons/               # 4 seed entries
│   ├── preferences/           # 3 seed entries
│   └── templates/             # 2 templates
└── metrics/                   # Workspace analytics (v1.1)
    ├── README.md
    ├── CURRENT.md
    ├── HISTORY.md
    ├── REPORT-TEMPLATE.md
    └── SCORING.md
```

---

## Routing Quick Reference

| Content | Agent | Skill |
|---------|-------|-------|
| `src/components/*.tsx` | frontend | react-patterns |
| `src/app/api/**/route.ts` | backend | nextjs-route-handlers |
| `src/app/**/page.tsx` | frontend | nextjs-app-router |
| `**/*.test.*` | tester | vitest-unit |
| `**/*.spec.*` | tester | vitest-unit |
| `supabase/migrations/**` | database | database-design |
| `src/**/auth*` | security | authentication-patterns |
| `src/**/i18n*`, `t()` calls | i18n | i18n-architecture |
| `tailwind.config.*` | designer | tailwind-css |
| `src/app/admin/**` | frontend + backend | admin-dashboard |
| `.github/workflows/**` | devops | ci-cd-pipelines |
| `next.config.*` | devops | vercel-deployment |
