# Architecture Decision Records

**Workspace:** OpenCode Enterprise Workspace v1.0.0
**Owner:** Ahmed Hassaan
**Last Updated:** 2026-07-19

---

## ADR-001: Workspace Architecture — 8-Layer Model

**Date:** 2026-07-19
**Status:** Accepted
**Decision Makers:** Ahmed Hassaan

### Context

The workspace needs a structured architecture that separates concerns across different levels of mutability and scope. Previous approaches used flat lists or 3-tier models that mixed stable standards with evolving knowledge.

### Decision

Adopt an 8-layer workspace model:

1. **Personal** — Individual preferences (user-editable)
2. **Professional** — Universal engineering standards (rarely changes)
3. **Domain** — Engineering domain knowledge via skills (grows over time)
4. **Quality** — Testing, review, accessibility, performance (evolves)
5. **Security** — Auth, secrets, compliance (stable, audited)
6. **Automation** — Commands and workflows (added as needed)
7. **Knowledge** — Decisions, learnings, memory (accumulates)
8. **Future** — Experimental features and expansion hooks

### Consequences

- Clear separation between stable (Professional, Security) and evolving (Domain, Knowledge) layers
- Personal layer is explicitly scoped to one user, not mixed with professional standards
- Knowledge accumulation has a defined home (DECISIONS.md, project AGENTS.md)
- Future features have a designated place without polluting active layers

---

## ADR-002: Agent Architecture — Domain-Based vs Project-Based

**Date:** 2026-07-19
**Status:** Accepted
**Decision Makers:** Ahmed Hassaan

### Context

Initial design considered project-specific agents (e.g., `admin-builder`, `gallery-manager`). However, this creates maintenance burden and duplication across projects.

### Decision

Use **domain-based agents** as the primary model. Each agent represents an engineering discipline (frontend, backend, security, etc.) that applies across all projects. Project-specific behavior is configured via the project's `AGENTS.md`, not via separate agent files.

### Consequences

- 19 reusable domain agents cover all engineering concerns
- Project-specific rules live in `.opencode/AGENTS.md` (per-project)
- Agent files are maintained once, used everywhere
- New projects inherit all agents without setup

---

## ADR-003: Skill Architecture — 3-Tier Hierarchy

**Date:** 2026-07-19
**Status:** Accepted
**Decision Makers:** Ahmed Hassaan

### Context

Skills need to be organized to prevent duplication, enable reuse, and support project-specific customization.

### Decision

Three skill tiers:

1. **Concept Skills** — Abstract principles (e.g., `clean-architecture`, `solid-principles`)
2. **Framework Skills** — Technology-specific (e.g., `nextjs-app-router`, `supabase-patterns`)
3. **Project Skills** — Project-specific (e.g., `booking-engine`, `admin-dashboard`)

### Consequences

- Global skills (`~/.config/opencode/skills/`) contain Concept + Framework skills
- Project skills (`.opencode/skills/`) contain Project-specific skills
- Skills can declare dependencies on other skills
- Overlapping skills are merged, not duplicated

---

## ADR-004: Skill Merging Strategy

**Date:** 2026-07-19
**Status:** Accepted
**Decision Makers:** Ahmed Hassaan

### Context

Multiple skills had 60-70% content overlap (e.g., `css-animation` + `motion-design`, `environment-management` + `secrets-management`).

### Decision

When two skills overlap >50%, merge them into a single comprehensive skill. The merged skill takes the broader name and combines all unique content from both sources.

| Removed | Merged Into | Reason |
|---------|-------------|--------|
| `css-animation` | `css-motion-design` | 70% overlap |
| `motion-design` | `css-motion-design` | 70% overlap |
| `environment-management` | `environment-secrets` | Complementary, better together |
| `secrets-management` | `environment-secrets` | Complementary, better together |

### Consequences

- Reduced skill count from 71 to 65 (global)
- Eliminated confusion about which skill to load
- Combined skills are more comprehensive
- No loss of content — all material preserved in merged version

---

## ADR-005: Agent Cleanup — Duplicate Removal

**Date:** 2026-07-19
**Status:** Accepted
**Decision Makers:** Ahmed Hassaan

### Context

`security.md` and `security-auditor.md` covered the same domain. `security.md` was strictly superior (10 audit areas, CVSS scoring, Supabase-specific, proper permissions). `security-auditor.md` was generic and missing permission configuration.

### Decision

Delete `security-auditor.md`. Keep `security.md` as the sole security agent.

### Consequences

- Single source of truth for security auditing
- No confusion about which agent to use
- Consistent permission model (all agents have explicit permissions)

---

## ADR-006: Read-Only Agent Pattern

**Date:** 2026-07-19
**Status:** Accepted
**Decision Makers:** Ahmed Hassaan

### Context

Some agents should only analyze and recommend, never modify code. This prevents accidental changes during review and audit workflows.

### Decision

Agents with advisory/audit roles have `edit: deny` and `bash: deny` permissions:

| Agent | Read-Only | Reason |
|-------|-----------|--------|
| `architect` | Yes | Analysis only, no code changes |
| `reviewer` | Yes | Code review, no modifications |
| `security` | Yes | Audit only, no fixes applied |
| `cloud` | Yes | Infrastructure review, no changes |

### Consequences

- Safe to invoke for audit workflows
- Clear separation between analysis and implementation
- User manually applies recommended changes

---

## ADR-007: Tech Stack Default Preferences

**Date:** 2026-07-19
**Status:** Accepted
**Decision Makers:** Ahmed Hassaan

### Context

The workspace needs default technology choices to ensure consistency across projects and reduce decision fatigue.

### Decision

Default tech stack for all projects:

| Layer | Choice | Reasoning |
|-------|--------|-----------|
| Language | TypeScript (strict) | Type safety, maintainability |
| Framework | Next.js 16 (App Router) | React ecosystem, SSR/SSG, Vercel |
| Styling | Tailwind CSS 3.4+ | Utility-first, rapid development |
| Backend | Supabase | PostgreSQL + Auth + Storage |
| Deployment | Vercel | Native Next.js support |
| Package Manager | npm | Ecosystem compatibility |

### Consequences

- Consistent project structure across all projects
- Shared skills and agents are optimized for this stack
- Deviations are allowed but documented in project AGENTS.md

---

## ADR-008: Bilingual i18n Strategy

**Date:** 2026-07-19
**Status:** Accepted
**Decision Makers:** Ahmed Hassaan

### Context

Projects target Arabic-speaking audience with English as secondary language. RTL support is non-negotiable.

### Decision

- Arabic (ar) as primary language, English (en) as secondary
- RTL-first layout design using CSS logical properties
- Translation keys follow `section.element` naming convention
- Client-side language switching via React Context
- No SSR-based locale routing (sufficient for current scale)

### Consequences

- All components must use logical CSS properties (`ms-`, `me-`, `ps-`, `pe-` instead of `ml-`, `mr-`, `pl-`, `pr-`)
- Tailwind config includes RTL-compatible utilities
- Font pairing: Cairo (Arabic body) + Inter (English body)

---

## ADR-009: Testing Strategy

**Date:** 2026-07-19
**Status:** Accepted
**Decision Makers:** Ahmed Hassaan

### Context

Testing strategy needs to balance coverage with development velocity for a small team.

### Decision

- **Unit tests (Vitest):** Business logic, utilities, complex hooks
- **Integration tests (Vitest):** API routes, database queries
- **E2E tests (Playwright):** Critical user flows only (booking, admin login)
- **No visual regression testing** (future consideration)
- Target: 70% unit, 20% integration, 10% E2E by test count

### Consequences

- Vitest for unit/integration (fast, TypeScript-native)
- Playwright for E2E (cross-browser, reliable)
- Critical paths tested end-to-end
- Non-critical paths rely on code review

---

## ADR-010: Security Baseline

**Date:** 2026-07-19
**Status:** Accepted
**Decision Makers:** Ahmed Hassaan

### Context

Security practices must be defined at the workspace level to prevent common vulnerabilities across all projects.

### Decision

Mandatory security baseline:

1. **No hardcoded credentials** — All secrets in environment variables
2. **Input validation** — Zod schema at every API boundary
3. **RLS enabled** — Supabase Row-Level Security on all tables
4. **Security headers** — CSP, X-Frame-Options, HSTS via Next.js middleware
5. **Dependency audit** — `npm audit` in CI pipeline
6. **Secret scanning** — Pre-commit hooks with secretlint
7. **Authentication** — httpOnly cookies, not localStorage (for new projects)

### Consequences

- Security agent enforces these standards during review
- `/security-scan` command checks compliance
- Deviations documented in project AGENTS.md with justification
