# Workspace Dependency Graph

**Version:** v1.1 (Stable)
**Status:** Frozen
**Last Updated:** 2026-07-19

---

## Agent → Skill Dependencies

```
build (default)
  └── loads skills on-demand via @skill tool

plan
  ├── reviewer
  ├── architect
  └── security

frontend
  ├── react-patterns
  ├── nextjs-app-router
  ├── tailwind-css
  ├── responsive-design
  ├── form-engineering
  ├── state-management
  └── css-motion-design

backend
  ├── api-design
  ├── nextjs-route-handlers
  ├── background-jobs
  ├── storage-patterns
  ├── email-systems
  └── realtime-patterns

database
  ├── database-design
  ├── supabase-patterns
  ├── prisma-patterns
  ├── sql-optimization
  └── data-migration

api-designer
  ├── api-design
  └── api-documentation

architect
  ├── clean-architecture
  ├── solid-principles
  ├── design-patterns
  ├── refactoring-patterns
  └── scalability

reviewer
  ├── code-review-standards
  ├── refactoring-patterns
  └── debug

security
  ├── owasp-top-10
  ├── security-audit
  ├── authentication-patterns
  ├── jwt-security
  ├── environment-secrets
  ├── input-validation
  ├── rate-limiting
  └── authorization-patterns

tester
  ├── testing-strategy
  ├── vitest-unit
  └── playwright-e2e

accessibility
  ├── wcag-checklist
  ├── keyboard-navigation
  └── screen-reader-patterns

performance
  ├── web-performance
  ├── caching-strategies
  ├── image-optimization
  └── bundle-optimization

devops
  ├── ci-cd-pipelines
  ├── vercel-deployment
  ├── docker-patterns
  ├── infrastructure-as-code
  └── environment-secrets

cloud
  ├── vercel-deployment
  ├── docker-patterns
  ├── infrastructure-as-code
  └── scalability

seo
  └── api-documentation (for structured data)

i18n
  ├── i18n-architecture
  └── rtl-engineering

ecommerce
  ├── api-design
  ├── payment-integration (project)
  └── form-engineering

ai-engineer
  ├── llm-integration
  ├── prompt-engineering
  ├── rag-patterns
  ├── context-engineering
  ├── agent-design
  └── mcp-integration

context-engineer
  ├── context-engineering
  ├── validate-workspace
  ├── workspace-optimization
  └── (all workspace maintenance tasks)

designer
  ├── design-systems
  ├── typography-systems
  ├── css-motion-design
  └── responsive-design

docs-writer
  ├── api-documentation
  ├── architecture-decisions
  └── component-documentation
```

---

## Skill ↔ Skill Cross-References

```
react-patterns ↔ nextjs-app-router      (complementary — React + Next.js)
tailwind-css ↔ responsive-design         (complementary — styling + layout)
css-motion-design ↔ design-systems       (complementary — animation + tokens)
form-engineering ↔ input-validation      (complementary — UI + security)
state-management ↔ react-patterns        (complementary — patterns + state)

database-design ↔ supabase-patterns      (cluster — PostgreSQL + Supabase)
database-design ↔ prisma-patterns        (cluster — ORM alternative)
supabase-patterns ↔ storage-patterns     (cluster — Supabase platform)

api-design ↔ nextjs-route-handlers       (cluster — REST + Next.js implementation)
api-design ↔ api-documentation           (cluster — design + docs)

authentication-patterns ↔ jwt-security   (cluster — auth + tokens)
authentication-patterns ↔ authorization-patterns (cluster — auth + access control)
jwt-security ↔ environment-secrets       (cluster — tokens + secrets)

owasp-top-10 ↔ security-audit            (cluster — threats + audit)
input-validation ↔ rate-limiting          (cluster — protection layers)

web-performance ↔ caching-strategies     (cluster — speed + caching)
web-performance ↔ image-optimization     (cluster — speed + images)
web-performance ↔ bundle-optimization    (cluster — speed + bundles)
image-optimization ↔ storage-patterns    (cluster — images + upload)

testing-strategy ↔ vitest-unit           (cluster — strategy + tool)
testing-strategy ↔ playwright-e2e        (cluster — strategy + E2E)

wcag-checklist ↔ keyboard-navigation     (cluster — a11y standards)
wcag-checklist ↔ screen-reader-patterns  (cluster — a11y standards)

i18n-architecture ↔ rtl-engineering      (cluster — bilingual)
design-systems ↔ typography-systems      (cluster — design tokens)

clean-architecture ↔ solid-principles    (cluster — architecture principles)
refactoring-patterns ↔ code-review-standards (cluster — code quality)

llm-integration ↔ prompt-engineering     (cluster — AI implementation)
rag-patterns ↔ context-engineering       (cluster — AI context)

ci-cd-pipelines ↔ vercel-deployment      (cluster — deployment)
docker-patterns ↔ infrastructure-as-code (cluster — infrastructure)
environment-secrets ↔ vercel-deployment  (cluster — config management)

workspace-optimization ↔ validate-workspace (cluster — workspace health)
workspace-memory ↔ workspace-optimization    (cluster — workspace improvement)
```

---

## Command → Agent Dependencies

```
/review            → plan (subtask spawning)
/security-scan     → security (subtask)
/performance-check → performance (subtask)
/a11y-audit        → accessibility (subtask)
/seo-check         → seo (subtask)
/new-page          → frontend (subtask)
/new-api           → backend (subtask)
/new-component     → frontend (subtask)
/refactor          → architect (subtask)
/deploy-check      → devops (subtask)
/generate-docs     → docs-writer (subtask)
/create-skill      → context-engineer (subtask)
/create-agent      → context-engineer (subtask)
/health-check      → context-engineer (subtask, bash)
/workspace-audit   → context-engineer (subtask)
/workspace-validate → context-engineer (subtask)
/self-improve      → context-engineer (subtask)
```

---

## Skill Dependency Chains

```
react-patterns
  └── depends on: (none)
  └── related: nextjs-app-router, state-management, form-engineering

nextjs-app-router
  └── depends on: react-patterns
  └── related: api-design, nextjs-route-handlers

tailwind-css
  └── depends on: (none)
  └── related: responsive-design, css-motion-design

form-engineering
  └── depends on: react-patterns
  └── related: input-validation

authentication-patterns
  └── depends on: jwt-security
  └── related: authorization-patterns, supabase-patterns

jwt-security
  └── depends on: (none)
  └── related: authentication-patterns, environment-secrets

environment-secrets
  └── depends on: (none)
  └── related: jwt-security, vercel-deployment

database-design
  └── depends on: (none)
  └── related: supabase-patterns, prisma-patterns, sql-optimization

supabase-patterns
  └── depends on: database-design
  └── related: authentication-patterns, storage-patterns

testing-strategy
  └── depends on: (none)
  └── related: vitest-unit, playwright-e2e

web-performance
  └── depends on: (none)
  └── related: caching-strategies, image-optimization, bundle-optimization

ci-cd-pipelines
  └── depends on: (none)
  └── related: vercel-deployment, docker-patterns

llm-integration
  └── depends on: (none)
  └── related: prompt-engineering, rag-patterns, context-engineering

clean-architecture
  └── depends on: (none)
  └── related: solid-principles, design-patterns, refactoring-patterns
```

---

## Conflict Resolution Priority

```
1. Security findings      → Always addressed first
2. Build-breaking issues  → Fixed before feature work
3. User explicit request  → Highest intent priority
4. Agent domain detection → Automatic routing
5. Skill loading          → On-demand context
6. Quality recommendations → Advisory
7. Performance suggestions → Advisory

Conflict rules:
- Security > Accessibility > SEO > Performance > Style
- Read-only agents cannot resolve conflicts (must escalate to build/plan)
- Multiple agent suggestions → primary agent presents both to user
```
