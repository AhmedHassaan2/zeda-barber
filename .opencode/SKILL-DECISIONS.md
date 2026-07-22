# SKILL-DECISIONS.md — v1.2 Final Engineering Review

**Generated:** 2026-07-20
**Review Round:** Final (post-approval comprehensive review)
**Status:** Pending User Approval — NO changes applied to production
**Workspace State:** 67 global + 14 project = 81 skills (80 with content)
**Staging State:** 94 directories (18 placeholders + 76 real candidates)

---

## Review Framework

Every candidate scored on 10 dimensions (0–10 each), total /100:

| Code | Dimension | Description |
|------|-----------|-------------|
| EQ | Engineering Quality | Code quality, structure, completeness |
| PQ | Problem Quality | Solves a real, distinct problem |
| CE | Coverage & Completeness | Thorough domain coverage |
| MD | Markdown Documentation | Clear instructions, examples |
| EX | Expertise Depth | Deep, actionable knowledge |
| DOC | Documentation | Self-contained, well-explained |
| RE | Relevance | Applicable to our workspace/stack |
| ER | Enterprise Readiness | Production-grade, security |
| LV | Longevity | Stays relevant over time |
| WF | Workflow Integration | Fits agent/skill ecosystem |

**Decision Types:**
- **KEEP EXISTING** — Existing skill is adequate
- **CREATE NEW** — Import as new production skill
- **REPLACE** — Delete existing, import superior candidate
- **MERGE** — Absorb into existing skill, delete candidate
- **REFACTOR** — Enhance existing with candidate knowledge
- **DELETE** — Discard entirely
- **OPTIONAL** — High quality but off-scope; keep in staging for future

---

## BATCH 1: Vercel + Expo (7 candidates)

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 1 | `find-skills` | Vercel/vxern | 75 | CREATE NEW | Agent skill discovery framework. No existing skill discovers/recommends new skills. Enables autonomous workspace growth. Self-contained, CLI-based. |
| 2 | `web-design-guidelines` | Vercel/vxern | 39 | DELETE | Single URL fetch to Apple HIG. No self-contained knowledge. Agent can use `web-search` for identical result. Not a skill — it's a redirect. |
| 3 | `deploy-to-vercel` | Vercel/vxern | 89 | REPLACE `vercel-deployment` | Strictly superior: covers monorepos, preview envs, env vars, rollbacks, i18n, edge functions, deployment protection. Existing `vercel-deployment` is thin (68/100). |
| 4 | `agent-browser` | Vercel/vxern | 51 | DELETE | Hidden skill (`meta: hidden: true`). Only 36 lines. `browser-use` (Batch 5) is strictly superior at 120 lines with better documentation. |
| 5 | `turborepo` | Vercel/vxern | 93 | CREATE NEW | 762 lines of Turborepo orchestration. Zero existing monorepo skills. Covers task graphs, caching, dependency management, workspace protocols. Exceptional depth. |
| 6 | `remotion-best-practices` | remotion-dev/best-remotion | 26 | DELETE | 24 lines. Generic React advice with Remotion branding. No unique Remotion knowledge. Links to sub-skill references that don't exist in our context. |
| 7 | `extract-design-system` | Vercind/vxern | 61 | CREATE NEW | Reverse-engineers public website designs into token files. Unique capability — no existing skill can audit and extract design systems from live codebases. |

**Batch Result:** 3 CREATE, 1 REPLACE, 3 DELETE

---

## BATCH 2: Anthropic + Matt Pocock (15 candidates)

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 1 | `frontend-design` | anthropics/skills | 75 | MERGE into `design-taste-frontend` | 30 lines. `design-taste-frontend` (979 lines) subsumes all its content and more. Absorb the best UX patterns, then delete. |
| 2 | `pdf` | anthropics/skills | 73 | CREATE NEW | PDF generation/manipulation (read, merge, split, rotate, watermark, forms, OCR). 239 lines. Production-relevant for reports, invoices. No existing PDF skill. |
| 3 | `mcp-builder` | anthropics/skills | 79 | REPLACE `mcp-integration` | 165 lines. Practical: install, expose tools, configure resources, Python FastMCP + Node/TS. Existing `mcp-integration` is abstract (65/100). |
| 4 | `theme-factory` | anthropics/skills | 31 | DELETE | 6 bullet points. Not a skill — it's a prompt fragment. No actionable guidance, no examples, no workflow. |
| 5 | `grill-me` | anthropics/skills | 8 | DELETE | Interview skill — off-scope for enterprise engineering. Only delegates to `/grilling` command. |
| 6 | `grill-with-docs` | anthropics/skills | 8 | DELETE | Interview skill — off-scope. Same as grill-me with ADR creation. |
| 7 | `improve-codebase-architecture` | matt-pocock/ai-agent-skills | 66 | MERGE into `clean-architecture` | 45 lines. Scans codebase for architecture improvements. Good patterns overlap with `clean-architecture` + `solid-principles` + `refactoring-patterns`. Absorb best parts. |
| 8 | `tdd` | matt-pocock/ai-agent-skills | 73 | MERGE into `testing-strategy` | 22 lines. TDD red→green→refactor loop. `testing-strategy` is broader. Absorb TDD workflow as a section, then delete. |
| 9 | `teach` | matt-pocock/ai-agent-skills | 78 | CREATE NEW | Stateful teaching workspace: lessons, reference sheets, learning records. 82 lines. Useful for onboarding, code walkthroughs, knowledge transfer. No existing equivalent. |
| 10 | `prototype` | matt-pocock/ai-agent-skills | 72 | CREATE NEW | Rapid prototyping: throwaway prototypes for logic or UI branches. 18 lines. Fills gap in fast-iteration workflows. |
| 11 | `to-tickets` | matt-pocock/ai-agent-skills | 67 | CREATE NEW | Break plans into tracer-bullet tickets with blocking edges. 61 lines. No existing project management integration. |
| 12 | `writing-great-skills` | matt-pocock/ai-agent-skills | 60 | KEEP EXISTING | Good quality reference for writing/editing skills. Extract failure modes into a separate workspace-memory entry. Keep as-is. |
| 13 | `research` | matt-pocock/ai-agent-skills | 57 | DELETE | 9 lines. Background agent for primary-source research. Too thin to be a standalone skill — agent can already do this with `web-search` + `task`. |
| 14 | `handoff` | matt-pocock/ai-agent-skills | 57 | DELETE | 16 lines. Session handoff/context transfer. Useful concept but too thin as a skill. Could be a command or playbook instead. |
| 15 | `diagnosing-bugs` | matt-pocock/ai-agent-skills | 77 | REPLACE `debug` | 82 lines. Structured diagnosis loop for hard bugs and performance regressions. Strictly superior to existing `debug` skill. |

**Batch Result:** 4 CREATE, 2 REPLACE, 3 MERGE, 1 KEEP, 5 DELETE

---

## BATCH 3: Microsoft Azure (15 candidates)

All 15 from `microsoft/mcp-servers`. MIT licensed. Consistently high quality (avg ~80/100). Form a workflow chain: `azure-prepare` → `azure-validate` → `azure-deploy`.

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 1 | `microsoft-foundry` | microsoft/mcp-servers | 94 | CREATE NEW | 193 lines. Azure AI Foundry Agent Service: agent creation, tools, knowledge, evaluation, fine-tuning. Highest-scored candidate. Critical for enterprise AI agent development. |
| 2 | `azure-ai` | microsoft/mcp-servers | 78 | CREATE NEW | 53 lines. Azure AI: OpenAI, Document Intelligence, Speech, Vision. Zero existing Azure AI coverage. |
| 3 | `azure-deploy` | microsoft/mcp-servers | 87 | CREATE NEW | 77 lines. Azure deployment: Bicep, ARM, Container Apps, AKS, Functions. No existing Azure deployment skill. |
| 4 | `azure-diagnostics` | microsoft/mcp-servers | 82 | CREATE NEW | 116 lines. Azure monitoring, metrics, logs, alerts, AppLens, KQL. Fills critical observability gap. |
| 5 | `azure-prepare` | microsoft/mcp-servers | 94 | CREATE NEW | 118 lines. Azure project preparation: azure.yaml, Bicep/Terraform, Dockerfiles, auth setup. Tied for highest score. Foundational. |
| 6 | `azure-storage` | microsoft/mcp-servers | 72 | CREATE NEW | 72 lines. Azure Storage: Blob, File, Queue, Table, Data Lake. No existing Azure storage skill. |
| 7 | `azure-validate` | microsoft/mcp-servers | 86 | CREATE NEW | 56 lines. Pre-deployment validation: security, compliance, cost checks. No existing validation skill. |
| 8 | `entra-app-registration` | microsoft/mcp-servers | 85 | CREATE NEW | 135 lines. Microsoft Entra ID: OAuth 2.0, MSAL integration, app registration. Critical security gap — no Azure AD coverage. |
| 9 | `appinsights-instrumentation` | microsoft/mcp-servers | 78 | CREATE NEW | 49 lines. Application Insights: telemetry, distributed tracing. Enhances observability cluster. |
| 10 | `azure-compliance` | microsoft/mcp-servers | 82 | CREATE NEW | 83 lines. Azure compliance: policies, certifications, audit, azqr, Key Vault expiration. No existing Azure compliance. |
| 11 | `azure-resource-lookup` | microsoft/mcp-servers | 80 | CREATE NEW | 81 lines. Azure resource discovery: ARG queries, cross-subscription listing. No existing resource management. |
| 12 | `azure-aigateway` | microsoft/mcp-servers | 87 | CREATE NEW | 129 lines. Azure API Management as AI Gateway: semantic caching, token limits, content safety, load balancing. No existing AI gateway. |
| 13 | `azure-kusto` | microsoft/mcp-servers | 78 | CREATE NEW | 179 lines. Azure Data Explorer (Kusto/ADX): KQL queries, analytics. No existing Kusto skill. |
| 14 | `azure-messaging` | microsoft/mcp-servers | 58 | REFACTOR | 43 lines. Event Hubs + Service Bus troubleshooting. Overlaps with `background-jobs` and `realtime-patterns`. Absorb messaging patterns. |
| 15 | `azure-cloud-migrate` | microsoft/mcp-servers | 77 | CREATE NEW | 40 lines. Cloud migration: Lambda→Functions, Beanstalk→App Service, RDS→Azure SQL. No existing migration skill. |

**Batch Result:** 14 CREATE, 1 REFACTOR

---

## BATCH 4: Lark Suite (17 candidates)

All 17 from `larksuite/lark-mcp`. Chinese-language. Require proprietary `lark-cli` binary.

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 1–17 | All 17 `lark-*` skills | larksuite/lark-mcp | ~35 | DELETE | Off-scope proprietary platform. Chinese-language content. Require `lark-cli` binary. Workspace does not use Lark/Feishu. No engineering value for our stack. |

**Batch Result:** 0 CREATE, 17 DELETE

---

## BATCH 5: Miscellaneous Sources (23 candidates)

### Engineering/Process (8 candidates)

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 1 | `diagnosing-bugs` | matt-pocock/skills | 77 | REPLACE `debug` | Already counted in Batch 2. Structured diagnosis loop superior to existing `debug`. |
| 2 | `improve-codebase-architecture` | standalone | 66 | MERGE into `clean-architecture` | Already counted in Batch 2. Absorb architecture scanning patterns. |
| 3 | `orchestration` | stablyai/orca | 53 | DELETE | 182 lines but tightly coupled to Orca inter-agent system. Our workspace has its own agent orchestration via `build` + `task`. Not reusable. |
| 4 | `tdd` | matt-pocock/skills | 73 | MERGE into `testing-strategy` | Already counted in Batch 2. |
| 5 | `to-tickets` | matt-pocock/skills | 67 | CREATE NEW | Already counted in Batch 2. |
| 6 | `verification-before-completion` | obra/superpowers | 75 | MERGE into `code-review-standards` | 106 lines. "Evidence before claims" verification checklist. Fits naturally into code review workflow. Absorb verification patterns. |
| 7 | `using-superpowers` | obra/superpowers | 25 | DELETE | Meta-skill: enforce skill invocation before any response. Not engineering knowledge — it's a behavioral constraint that belongs in agent config, not a skill. |
| 8 | `simple` | roin-orca/skills | 42 | DELETE | 34 lines. Lightweight brainstorming. Too thin — overlaps with `brainstorming` concepts in agent design. |

### Design/Frontend (7 candidates)

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 9 | `design-taste-frontend` | leonxlnx/taste-skill | 79 | CREATE NEW | 979 lines. Anti-slop frontend skill for landing pages, portfolios, redesigns. Most comprehensive design skill in staging. Covers palette, typography, layout, motion, variance. |
| 10 | `high-end-visual-design` | leonxlnx/taste-skill | 68 | CREATE NEW | 80 lines. Awwwards-tier design principles. Complements `design-taste-frontend` with broader visual design (not web-specific). Different scope — keep both. |
| 11 | `frontend-design` | standalone | 75 | MERGE into `design-taste-frontend` | Already counted in Batch 2. 30 lines — subsumed by `design-taste-frontend`. |
| 12 | `web-design-guidelines` | vercel | 39 | DELETE | Already counted in Batch 1. |
| 13 | `brandkit` | leonxlnx/taste-skill | 65 | CREATE NEW | 595 lines. Premium brand-kit image generation: logo systems, identity decks, color palettes. Distinct from `design-taste-frontend` (brand vs UI). |
| 14 | `imagegen-frontend-web` | leonxlnx/taste-skill | 67 | CREATE NEW | 797 lines. Elite frontend image-direction for website design references. Distinct from `brandkit` (web images vs brand identity). |
| 15 | `redesign-existing-projects` | leonxlnx/taste-skill | 77 | CREATE NEW | 143 lines. Audit → diagnose → fix workflow for upgrading existing websites. Unique — no existing redesign skill. |

### Browser Automation (2 candidates)

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 16 | `agent-browser` | standalone | 51 | DELETE | Already counted in Batch 1. Hidden skill,36 lines. `browser-use` is superior. |
| 17 | `browser-use` | browser-use/web-agent | 60 | CREATE NEW | 120 lines. Direct browser control via CDP. Fills automation gap — no existing browser automation skill. |

### Utility/Tool (3 candidates)

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 18 | `extract-design-system` | arvindrk/extract-design-system | 61 | CREATE NEW | Already counted in Batch 1. |
| 19 | `find-skills` | standalone | 75 | CREATE NEW | Already counted in Batch 1. |
| 20 | `mcp-builder` | standalone | 79 | REPLACE `mcp-integration` | Already counted in Batch 2. |
| 21 | `para-memory-files` | getpaperclipai/paperclip | 26 | DELETE | File-based PARA memory. Redundant with our `workspace-memory` system which is superior (6 categories, indexed, searchable). |
| 22 | `pdf` | standalone | 73 | CREATE NEW | Already counted in Batch 2. |
| 23 | `prototype` | matt-pocock/skills | 72 | CREATE NEW | Already counted in Batch 2. |
| 24 | `research` | matt-pocock/skills | 57 | DELETE | Already counted in Batch 2. |
| 25 | `teach` | standalone | 78 | CREATE NEW | Already counted in Batch 2. |
| 26 | `writing-great-skills` | matt-pocock/skills | 60 | KEEP EXISTING | Already counted in Batch 2. |

### Deploy/Build (3 candidates)

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 27 | `deploy-to-vercel` | vercel | 89 | REPLACE `vercel-deployment` | Already counted in Batch 1. |
| 28 | `remotion-best-practices` | remotion-dev/skills | 26 | DELETE | Already counted in Batch 1. |
| 29 | `turborepo` | standalone | 93 | CREATE NEW | Already counted in Batch 1. |

### Inference.sh/Belt CLI (5 candidates)

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 30 | `ai-video-generation` | inference.sh | 70 | OPTIONAL | 187 lines. 40+ AI video models via `belt` CLI. High quality but requires external CLI dependency. Keep in staging for future. |
| 31 | `ai-avatar-video` | inference.sh | 68 | OPTIONAL | 203 lines. AI avatar/talking head videos via `belt` CLI. High quality but requires external CLI dependency. |
| 32 | `ai-image-generation` | inference.sh | 70 | OPTIONAL | 124 lines. 50+ AI image models via `belt` CLI. High quality but requires external CLI dependency. |
| 33 | `remotion-render` | inference.sh | 71 | OPTIONAL | 168 lines. Render React/Remotion TSX to MP4 via `belt` CLI. High quality but requires external CLI dependency. |
| 34 | `twitter-automation` | inference.sh | 50 | OPTIONAL | 110 lines. Twitter/X automation via `belt` CLI. High quality but off-scope for core engineering. Marketing value. |

### HyperFrames Video (3 candidates)

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 35 | `media-use` | heygen-com/hyperframes | 37 | DELETE | 341 lines but tightly coupled to HyperFrames proprietary system. Media OS for BGM, SFX, images, voice, captions. Cannot work without HyperFrames runtime. |
| 36 | `product-launch-video` | heygen-com/hyperframes | 27 | OPTIONAL | 126 lines. Product launch/promo video production. High quality but requires HyperFrames. Marketing value for future. |
| 37 | `faceless-explainer` | heygen-com/hyperframes | 27 | OPTIONAL | 126 lines. Faceless explainer video. High quality but requires HyperFrames. Content creation value for future. |

### Marketing (3 candidates)

| # | Candidate | Source | Score | Decision | Engineering Justification |
|---|-----------|--------|-------|----------|---------------------------|
| 38 | `copywriting` | coreyhaines31/marketingskills | 69 | CREATE NEW | 180 lines. Conversion copywriting for web pages (homepage, landing, pricing). Complementary to engineering — useful for marketing features. |
| 39 | `marketing-psychology` | coreyhaines31/marketingskills | 66 | CREATE NEW | 277 lines. Cognitive bias, persuasion, nudge theory. Distinct from copywriting (psychology vs writing technique). |
| 40 | `content-strategy` | coreyhaines31/marketingskills | 67 | CREATE NEW | 265 lines. Topic clusters, editorial calendar, content pillars. Distinct from both copywriting and psychology (planning vs execution vs theory). |

### Lark Suite (17 candidates)

Already counted in Batch 4. All DELETE.

---

## CONSOLIDATED DECISION TABLE

### From Staging Candidates (76 reviewed)

| Decision | Count | Skills |
|----------|-------|--------|
| **CREATE NEW** | 38 | find-skills, extract-design-system, pdf, teach, prototype, to-tickets, design-taste-frontend, high-end-visual-design, brandkit, imagegen-frontend-web, redesign-existing-projects, browser-use, turborepo, copywriting, marketing-psychology, content-strategy, microsoft-foundry, azure-ai, azure-deploy, azure-diagnostics, azure-prepare, azure-storage, azure-validate, entra-app-registration, appinsights-instrumentation, azure-compliance, azure-resource-lookup, azure-aigateway, azure-kusto, azure-cloud-migrate |
| **REPLACE** | 3 | deploy-to-vercel→vercel-deployment, mcp-builder→mcp-integration, diagnosing-bugs→debug |
| **MERGE** | 6 | frontend-design→design-taste-frontend, improve-codebase-architecture→clean-architecture, tdd→testing-strategy, verification-before-completion→code-review-standards |
| **REFACTOR** | 1 | azure-messaging→background-jobs |
| **KEEP EXISTING** | 1 | writing-great-skills |
| **DELETE** | 27 | web-design-guidelines, remotion-best-practices, agent-browser, theme-factory, grill-me, grill-with-docs, research, handoff, orchestration, using-superpowers, simple, para-memory-files, media-use, all 17 Lark Suite skills |
| **OPTIONAL** | 5 | ai-video-generation, ai-avatar-video, ai-image-generation, remotion-render, twitter-automation, product-launch-video, faceless-explainer |
| **TOTAL** | **76** | |

### From Enterprise Gap Analysis (21 new skills)

| Decision | Count | Skills |
|----------|-------|--------|
| **CREATE NEW** | 12 | ai-guardrails, model-routing, llm-evaluation, ai-cost-optimization, domain-driven-design, graphql, audit-logging, zero-trust, feature-flags, opentelemetry, developer-experience, golden-paths |
| **CREATE (bundled)** | 3 | system-design-patterns (covers CQRS, Event Sourcing, Message Queues, API Versioning), deployment-strategies (covers Canary, Blue/Green, Rollback), platform-engineering (covers IDP, DX, Golden Paths) |
| **ENHANCE existing** | 6 | context-engineering, prompt-engineering, monitoring-observability, structured-logging, authorization-patterns, background-jobs |
| **TOTAL** | **21** | |

### Cross-Workspace Fixes Required

| Fix | Priority | Description |
|-----|----------|-------------|
| Broken reference: `tailwind-css` → `css-animation` | P0 | Should be `css-motion-design` |
| Broken reference: `design-systems` → `motion-design` | P0 | Should be `css-motion-design` |
| Broken reference: `vercel-deployment` → `environment-management` | P0 | Should be `environment-secrets` |
| Broken reference: `validate-workspace` → `skill-design` | P0 | Remove — skill doesn't exist |
| Missing from MANIFEST: `validate-workspace` | P0 | Add to Skills Registry |
| Orphan skills not in any agent deps | P1 | `conversion-optimization`, `product-analytics`, `monitoring-observability`, `error-tracking`, `structured-logging` |
| `workspace-optimization` missing standard frontmatter | P1 | Add level, priority, dependencies, related_skills, related_agents, activation_rules |
| MANIFEST count errors | P1 | Security 7→8, Quality 7→8, DevOps 5→4 |
| AGENTS.md count errors | P1 | Domain Subagents 17→19, total 19→21 |
| `DEPENDENCIES.md` references `workspace-memory` as skill | P1 | It's a directory, not a skill — remove from cross-refs |
| `admin-dashboard` phantom in MANIFEST routing | P2 | Mark as project-only |
| `workspace-optimization` category mismatch | P2 | MANIFEST says `quality`, SKILL says `workspace` |
| Empty `gallery-management` directory | P2 | Delete or populate |
| `ai-hair-tryon` placeholder | P2 | Delete — never implemented |
| Reciprocal cross-reference gaps | P3 | 5 skill pairs with one-directional references |

---

## PHASE 2 RE-REVIEW: DELETE Decisions

### Re-reviewed: twitter-automation
**Original:** DELETE (off-scope)
**Re-review:** OPTIONAL — 110 lines, high quality, covers Twitter/X automation via `belt` CLI. Not core engineering but has marketing automation value. Keep in staging.
**Reasoning:** Long-term value for marketing features. Not worth deleting a well-written skill that might be useful later.

### Re-reviewed: product-launch-video
**Original:** DELETE (off-scope, HyperFrames)
**Re-review:** OPTIONAL — 126 lines, high quality, product launch video production. Requires HyperFrames. Marketing value.
**Reasoning:** Well-structured video production workflow. HyperFrames dependency limits immediate use but not worth deleting.

### Re-reviewed: faceless-explainer
**Original:** DELETE (off-scope, HyperFrames)
**Re-review:** OPTIONAL — 126 lines, high quality, explainer video production. Requires HyperFrames. Content creation value.
**Reasoning:** Same as product-launch-video. Complementary (explainer vs promo). Keep both.

**Final DELETE count: 27** (down from previous 32 after 5 reclassified as OPTIONAL)

---

## PHASE 3 RE-REVIEW: Marketing Skills

### Candidates: copywriting, marketing-psychology, content-strategy

**Source:** All three from `coreyhaines31/marketingskills` (same repository)

**Analysis:**
- `copywriting` (180 lines): Conversion-focused writing for web pages. Implementation-focused.
- `marketing-psychology` (277 lines): Cognitive biases, persuasion, nudge theory. Theory-focused.
- `content-strategy` (265 lines): Topic clusters, editorial calendar, content pillars. Planning-focused.

**Overlap assessment:**
- copywriting ↔ marketing-psychology: Low overlap (writing technique vs psychology theory)
- copywriting ↔ content-strategy: Medium overlap (both involve content, but different scope)
- marketing-psychology ↔ content-strategy: Low overlap (theory vs planning)

**Decision: Keep as 3 independent skills**

**Reasoning:**
1. Each covers a distinct aspect: writing, psychology, planning
2. Merging would create a 722-line mega-skill that's harder to navigate
3. Independent skills load on-demand — more efficient
4. Same source repo means consistent quality and style
5. Long-term maintainability: update one without affecting others

---

## QUALITY OPTIMIZATION (Phase 6)

### Merge Before Creating

| Existing Skill | Merge From | Result |
|----------------|-----------|--------|
| `clean-architecture` | `solid-principles` content + `improve-codebase-architecture` patterns | Enhanced clean-architecture with SOLID integration |
| `testing-strategy` | `tdd` red→green→refactor workflow | Enhanced testing-strategy with TDD section |
| `code-review-standards` | `verification-before-completion` evidence checklist | Enhanced code-review-standards with verification |
| `design-taste-frontend` | `frontend-design` UX patterns + `web-design-guidelines` principles | Enhanced design-taste-frontend |
| `security-audit` | `owasp-top-10` checklist (consider merge) | Enhanced security-audit with OWASP integration |
| `design-systems` | `typography-systems` content (consider merge) | Enhanced design-systems with typography section |

### Existing Skills to Enhance (from gap analysis)

| Existing Skill | Enhancement |
|----------------|-------------|
| `context-engineering` | Add hierarchical context, caching strategies, quality evaluation |
| `prompt-engineering` | Add prompt chaining, versioning, eval-driven optimization |
| `monitoring-observability` | Add three pillars, SLOs/SLIs, error budgets, runbooks |
| `structured-logging` | Add log aggregation setup, PII redaction, log-based alerting |
| `authorization-patterns` | Add ABAC implementation, hierarchical RBAC, permission caching |
| `background-jobs` | Add real message queues (BullMQ), dead letter queues, event-driven patterns |

---

*This file contains all 76 candidate decisions + 21 enterprise gap decisions + cross-workspace fixes. Pending user approval.*
