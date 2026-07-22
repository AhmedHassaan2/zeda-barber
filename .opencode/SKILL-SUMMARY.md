# SKILL-SUMMARY.md — v1.2 Final Engineering Review

**Generated:** 2026-07-20
**Review Round:** Final (7-phase comprehensive review)
**Status:** Pending User Approval — NO changes applied to production

---

## AT A GLANCE

| Metric | Value |
|--------|-------|
| Candidate skills sourced | 87 |
| Successfully fetched | 77 (89%) |
| Not found / 404 | 10 (11%) |
| Reviewed | 76 |
| Enterprise gaps identified | 32 |
| New skills to create (from gaps) | 14 |
| Existing skills to enhance | 6 |
| Cross-workspace fixes needed | 15 |

---

## DECISION BREAKDOWN

### From Staging Candidates (76 reviewed)

| Decision | Count | % | Description |
|----------|-------|---|-------------|
| CREATE NEW | 38 | 50% | Import as new production skill |
| REPLACE | 3 | 4% | Delete existing, import superior candidate |
| MERGE | 6 | 8% | Absorb into existing skill, delete candidate |
| REFACTOR | 1 | 1% | Enhance existing with candidate knowledge |
| KEEP EXISTING | 1 | 1% | Existing skill is adequate |
| DELETE | 27 | 36% | Discard — off-scope, low quality, or redundant |
| OPTIONAL | 5 | 7% | High quality but off-scope; keep in staging |
| **TOTAL** | **76** | **100%** | |

### From Enterprise Gap Analysis (21 new)

| Decision | Count | Description |
|----------|-------|-------------|
| CREATE NEW | 10 | P0 critical enterprise skills |
| CREATE (bundled) | 3 | Bundled skills covering multiple capabilities |
| ENHANCE existing | 6 | Enrich existing skills with missing knowledge |
| GRADUATE from staging | 1 | azure-aigateway promoted to production |
| **TOTAL** | **21** | |

### Cross-Workspace Fixes (15)

| Priority | Count | Description |
|----------|-------|-------------|
| P0 Critical | 4 | Broken skill-to-skill references |
| P1 High | 6 | Count errors, orphans, missing frontmatter |
| P2 Medium | 3 | Category mismatches, phantom references |
| P3 Low | 2 | Reciprocal cross-references |
| **TOTAL** | **15** | |

---

## CONSOLIDATED MAP

### REPLACE Map (3)

| Existing Skill | Replace With | Reason |
|----------------|-------------|--------|
| `vercel-deployment` (68/100) | `deploy-to-vercel` (89/100) | Strictly superior: monorepos, preview envs, rollbacks |
| `mcp-integration` (65/100) | `mcp-builder` (79/100) | Strictly superior: practical setup, Python+Node |
| `debug` (existing) | `diagnosing-bugs` (77/100) | Strictly superior: structured diagnosis loop |

### MERGE Map (6 + 7 from gap analysis)

| Target Skill | Merge From | What's Absorbed |
|-------------|-----------|-----------------|
| `design-taste-frontend` | `frontend-design` | UX patterns (30 lines) |
| `clean-architecture` | `improve-codebase-architecture` | Architecture scanning patterns |
| `testing-strategy` | `tdd` | Red→green→refactor workflow |
| `code-review-standards` | `verification-before-completion` | Evidence-before-claims checklist |
| `design-systems` | `typography-systems` | Font pairing, type scale |
| `security-audit` | `owasp-top-10` | OWASP checklist integration |
| `clean-architecture` | `solid-principles` | SOLID integration (consider) |

### ENHANCE Map (6)

| Existing Skill | Enhancement | Priority |
|----------------|-------------|----------|
| `context-engineering` | Hierarchical context, caching, quality evaluation | P1 |
| `prompt-engineering` | Chaining, versioning, eval-driven optimization | P1 |
| `monitoring-observability` | Three pillars, SLOs/SLIs, error budgets, runbooks | P0 |
| `structured-logging` | Log aggregation, PII redaction, log-based alerting | P0 |
| `authorization-patterns` | ABAC, hierarchical RBAC, permission caching | P1 |
| `background-jobs` | Real message queues (BullMQ), dead letter queues | P1 |

### DELETE Map (27)

| # | Skill | Source | Score | Reason |
|---|-------|--------|-------|--------|
| 1 | `web-design-guidelines` | Vercel/vxern | 39 | Single URL fetch — not a skill |
| 2 | `remotion-best-practices` | remotion-dev | 26 | Generic React advice, no unique knowledge |
| 3 | `agent-browser` | Vercel/vxern | 51 | Hidden skill,36 lines, `browser-use` is superior |
| 4 | `theme-factory` | anthropics/skills | 31 | 6 bullet points — not a skill |
| 5 | `grill-me` | anthropics/skills | 8 | Off-scope interview skill |
| 6 | `grill-with-docs` | anthropics/skills | 8 | Off-scope interview skill |
| 7 | `research` | matt-pocock | 57 | 9 lines — too thin |
| 8 | `handoff` | matt-pocock | 57 | 16 lines — too thin |
| 9 | `orchestration` | stablyai/orca | 53 | Tightly coupled to Orca system |
| 10 | `using-superpowers` | obra/superpowers | 25 | Meta-skill, not engineering knowledge |
| 11 | `simple` | roin-orca/skills | 42 | 34 lines — too thin |
| 12 | `para-memory-files` | paperclip | 26 | Redundant with workspace-memory |
| 13 | `media-use` | heygen-com | 37 | Tightly coupled to HyperFrames |
| 14–30 | All 17 `lark-*` | larksuite | ~35 | Off-scope proprietary Chinese platform |
| 31 | `gallery-management` | project | — | Empty directory |
| 32 | `ai-hair-tryon` | project | 60 | Placeholder — never implemented |

### OPTIONAL Map (7 — kept in staging)

| # | Skill | Source | Score | Value |
|---|-------|--------|-------|-------|
| 1 | `ai-video-generation` | inference.sh | 70 | AI video models via belt CLI |
| 2 | `ai-avatar-video` | inference.sh | 68 | AI avatar videos via belt CLI |
| 3 | `ai-image-generation` | inference.sh | 70 | AI image models via belt CLI |
| 4 | `remotion-render` | inference.sh | 71 | Remotion TSX → MP4 via belt CLI |
| 5 | `twitter-automation` | inference.sh | 50 | Twitter/X automation via belt CLI |
| 6 | `product-launch-video` | heygen-com | 27 | Product video via HyperFrames |
| 7 | `faceless-explainer` | heygen-com | 27 | Explainer video via HyperFrames |

### NEW Enterprise Skills to Create (14)

| # | Skill | Domain | Priority | Bundled Capabilities |
|---|-------|--------|----------|---------------------|
| 1 | `ai-guardrails` | AI Engineering | P0 | Input/output validation, content moderation, prompt injection defense |
| 2 | `model-routing` | AI Engineering | P0 | Model selection, cost/quality trade-offs, fallback chains |
| 3 | `llm-evaluation` | AI Engineering | P1 | Evaluation frameworks, benchmarks, regression testing |
| 4 | `ai-cost-optimization` | AI Engineering | P1 | Token budgeting, caching, model tiering, cost dashboards |
| 5 | `domain-driven-design` | Architecture | P0 | Bounded contexts, aggregates, domain events, TypeScript patterns |
| 6 | `system-design-patterns` | Architecture | P0 | Circuit Breaker, Saga, CQRS, Event Sourcing, Outbox, Service Mesh |
| 7 | `graphql` | Architecture | P1 | Schema design, resolvers, N+1, subscriptions, federation |
| 8 | `opentelemetry` | Observability | P0 | OTel SDK, traces/metrics/logs export, auto-instrumentation |
| 9 | `distributed-tracing` | Observability | P0 | Trace propagation, spans, cross-service tracing, trace-log linking |
| 10 | `metrics-engineering` | Observability | P1 | RED/USE methods, custom metrics, dashboards, alerting |
| 11 | `audit-logging` | Security | P0 | Audit trails, compliance logging, tamper-proof logging |
| 12 | `zero-trust` | Security | P1 | Identity verification, micro-segmentation, mTLS, ZTNA |
| 13 | `feature-flags` | DevOps | P0 | Flag systems, gradual rollouts, kill switches, A/B testing |
| 14 | `deployment-strategies` | DevOps | P0 | Canary, blue/green, rollback strategies, smoke tests |
| 15 | `platform-engineering` | Platform Eng | P0 | IDP concepts, developer experience, golden paths |

---

## PRODUCTION WORKSPACE IMPACT

### Skill Count Changes

| Category | Before | Change | After |
|----------|--------|--------|-------|
| **Global Skills** | 67 | +38 (create) -6 (merge into) -3 (replace) = +29 | 96 |
| **Enterprise Gap Skills** | 0 | +15 (new) | 15 |
| **Project Skills** | 13 | -2 (delete empty/placeholder) | 11 |
| **TOTAL** | **80** | **+42 net** | **122** |

### Category Breakdown (After)

| Category | Before | After | Change |
|----------|--------|-------|--------|
| AI | 6 | 12 | +6 (guardrails, model-routing, llm-eval, cost-opt, foundry, aigateway) |
| Analytics | 2 | 2 | 0 |
| Architecture | 5 | 8 | +3 (ddd, system-design, graphql) |
| Backend | 7 | 7 | 0 |
| Database | 5 | 5 | 0 |
| Design | 2 | 6 | +4 (design-taste, high-end-visual, brandkit, imagegen, redesign) |
| DevOps | 5 | 9 | +4 (deploy-to-vercel, turborepo, feature-flags, deployment-strategies) |
| Frontend | 6 | 6 | 0 |
| I18n | 2 | 2 | 0 |
| Observability | 3 | 8 | +5 (azure-diagnostics, opentelemetry, distributed-tracing, metrics-eng, log-corr) |
| Quality | 12 | 12 | 0 (merges absorbed) |
| Security | 8 | 13 | +5 (entra-app, azure-compliance, azure-validate, audit-logging, zero-trust) |
| Workspace | 1 | 1 | 0 |
| Marketing | 0 | 3 | +3 (copywriting, marketing-psychology, content-strategy) |
| Utility | 0 | 4 | +4 (find-skills, extract-design-system, pdf, teach) |
| Process | 0 | 3 | +3 (prototype, to-tickets, browser-use) |
| Platform Eng | 0 | 1 | +1 (platform-engineering) |
| **TOTAL** | **80** | **122** | **+42** |

### Enterprise Domain Coverage

| Domain | Before | After | Improvement |
|--------|--------|-------|-------------|
| AI Engineering | 6 (36%) | 12 (71%) | +35% |
| Architecture | 5 (29%) | 8 (47%) | +18% |
| Observability | 3 (18%) | 8 (47%) | +29% |
| Security | 8 (47%) | 13 (65%) | +18% |
| DevOps | 5 (29%) | 9 (53%) | +24% |
| Platform Eng | 0 (0%) | 1 (6%) | +6% |
| **Overall** | **27 (24%)** | **51 (42%)** | **+18%** |

---

## SOURCE QUALITY SUMMARY

| Source | Candidates | Avg Score | Best Skill | Decisions |
|--------|-----------|-----------|------------|-----------|
| Microsoft Azure | 15 | ~80 | microsoft-foundry (94) | 14 CREATE, 1 REFACTOR |
| Vercel/vxern | 5 | ~61 | turborepo (93) | 3 CREATE, 1 REPLACE, 1 DELETE |
| Anthropic | 6 | ~34 | mcp-builder (79) | 1 CREATE, 1 REPLACE, 1 MERGE, 3 DELETE |
| Matt Pocock | 9 | ~62 | teach (78) | 3 CREATE, 1 REPLACE, 2 MERGE, 1 KEEP, 2 DELETE |
| Lark Suite | 17 | ~35 | lark-base (40) | 17 DELETE (all off-scope) |
| leonxlnx/taste-skill | 5 | ~71 | design-taste-frontend (79) | 5 CREATE |
| coreyhaines31 | 3 | ~67 | content-strategy (67) | 3 CREATE |
| inference.sh | 5 | ~66 | remotion-render (71) | 5 OPTIONAL |
| heygen-com | 3 | ~30 | media-use (37) | 2 OPTIONAL, 1 DELETE |
| Other | 5 | ~45 | browser-use (60) | 2 CREATE, 3 DELETE |

---

## CROSS-WORKSPACE FIXES

### P0 — Critical (4)

| # | Fix | File | Description |
|---|-----|------|-------------|
| 1 | `tailwind-css` broken ref | skills/tailwind-css/SKILL.md | `css-animation` → `css-motion-design` |
| 2 | `design-systems` broken ref | skills/design-systems/SKILL.md | `motion-design` → `css-motion-design` |
| 3 | `vercel-deployment` broken ref | skills/vercel-deployment/SKILL.md | `environment-management` → `environment-secrets` |
| 4 | `validate-workspace` broken ref | skills/validate-workspace/SKILL.md | Remove `skill-design` (doesn't exist) |

### P1 — High (6)

| # | Fix | File | Description |
|---|-----|------|-------------|
| 5 | Add `validate-workspace` to MANIFEST | MANIFEST.md | 67 skills exist, 66 listed |
| 6 | Fix MANIFEST Security count | MANIFEST.md | Header says "(7)", lists 8 |
| 7 | Fix MANIFEST Quality count | MANIFEST.md | Header says "(7)", lists 8 |
| 8 | Fix MANIFEST DevOps count | MANIFEST.md | Header says "(5)", lists 4 |
| 9 | Fix AGENTS.md counts | AGENTS.md | Subagents 17→19, total 19→21 |
| 10 | Remove `workspace-memory` from DEPENDENCIES | DEPENDENCIES.md | It's a directory, not a skill |

### P2 — Medium (3)

| # | Fix | File | Description |
|---|-----|------|-------------|
| 11 | Fix `workspace-optimization` frontmatter | skills/workspace-optimization/SKILL.md | Add standard fields |
| 12 | Fix `admin-dashboard` routing reference | MANIFEST.md | Mark as project-only |
| 13 | Fix `workspace-optimization` category | MANIFEST.md + SKILL.md | Align to `workspace` |

### P3 — Low (2)

| # | Fix | File | Description |
|---|-----|------|-------------|
| 14 | Add reciprocal cross-refs | 5 skill pairs | One-directional references |
| 15 | Fix MANIFEST arithmetic | MANIFEST.md | Section counts don't sum to total |

---

## MARKETING SKILLS DECISION

### Candidates: copywriting, marketing-psychology, content-strategy

**Decision: Keep as 3 independent skills**

| Skill | Lines | Focus | Distinction |
|-------|-------|-------|-------------|
| `copywriting` | 180 | Conversion-focused writing | Implementation (writing technique) |
| `marketing-psychology` | 277 | Cognitive biases, persuasion | Theory (why people buy) |
| `content-strategy` | 265 | Topic clusters, editorial calendar | Planning (what to create) |

**Why not merge:**
1. Each covers a distinct aspect: writing, psychology, planning
2. Merged skill would be 722 lines — too large to navigate efficiently
3. Independent loading is more efficient (load what you need)
4. Same source repo = consistent quality and style
5. Easier to update one without affecting others

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Import from Staging (38 skills)
- [ ] Import 14 Microsoft Azure skills
- [ ] Import 2 Vercel skills (deploy-to-vercel, turborepo)
- [ ] Import 1 Anthropic skill (mcp-builder)
- [ ] Import 2 Matt Pocock skills (teach, prototype, to-tickets)
- [ ] Import 5 leonxlnx/taste-skill skills
- [ ] Import 3 coreyhaines31 marketing skills
- [ ] Import 4 utility/tool skills (find-skills, extract-design-system, pdf, browser-use)
- [ ] Graduate azure-aigateway from staging

### Phase 2: Create Enterprise Gap Skills (15 skills)
- [ ] Create `ai-guardrails`
- [ ] Create `model-routing`
- [ ] Create `llm-evaluation`
- [ ] Create `ai-cost-optimization`
- [ ] Create `domain-driven-design`
- [ ] Create `system-design-patterns`
- [ ] Create `graphql`
- [ ] Create `opentelemetry`
- [ ] Create `distributed-tracing`
- [ ] Create `metrics-engineering`
- [ ] Create `audit-logging`
- [ ] Create `zero-trust`
- [ ] Create `feature-flags`
- [ ] Create `deployment-strategies`
- [ ] Create `platform-engineering`

### Phase 3: Replace Existing (3)
- [ ] Replace `vercel-deployment` with `deploy-to-vercel`
- [ ] Replace `mcp-integration` with `mcp-builder`
- [ ] Replace `debug` with `diagnosing-bugs`

### Phase 4: Merge into Existing (6)
- [ ] Merge `frontend-design` → `design-taste-frontend`
- [ ] Merge `improve-codebase-architecture` → `clean-architecture`
- [ ] Merge `tdd` → `testing-strategy`
- [ ] Merge `verification-before-completion` → `code-review-standards`
- [ ] Merge `typography-systems` → `design-systems`
- [ ] Merge `owasp-top-10` → `security-audit`

### Phase 5: Enhance Existing (6)
- [ ] Enhance `context-engineering`
- [ ] Enhance `prompt-engineering`
- [ ] Enhance `monitoring-observability`
- [ ] Enhance `structured-logging`
- [ ] Enhance `authorization-patterns`
- [ ] Enhance `background-jobs`

### Phase 6: Delete (32)
- [ ] Delete 27 staging skills (web-design-guidelines, remotion-best-practices, agent-browser, theme-factory, grill-me, grill-with-docs, research, handoff, orchestration, using-superpowers, simple, para-memory-files, media-use, 17 Lark skills)
- [ ] Delete empty `gallery-management` directory
- [ ] Delete placeholder `ai-hair-tryon` skill
- [ ] Remove `solid-principles` (absorbed into clean-architecture)
- [ ] Remove `screen-reader-patterns` (absorbed into wcag-checklist if needed)

### Phase 7: Cross-Workspace Fixes (15)
- [ ] Fix 4 P0 broken references
- [ ] Fix 6 P1 count errors and orphans
- [ ] Fix 3 P2 category mismatches
- [ ] Fix 2 P3 reciprocal references

### Phase 8: Documentation
- [ ] Update MANIFEST.md (67 → 96 global skills)
- [ ] Update AGENTS.md skill references
- [ ] Update DEPENDENCIES.md skill graph
- [ ] Regenerate VitePress documentation
- [ ] Tag release v1.2

---

## APPROVAL REQUIRED

**STOP — Do not proceed until:**

1. ✅ Review SKILL-DECISIONS.md — all 76 candidate decisions + 21 enterprise gap decisions
2. ✅ Review SKILL-GAP-REPORT.md — enterprise gap analysis across 6 domains
3. ✅ Review this SKILL-SUMMARY.md — high-level overview
4. ⬜ Approve or override each decision category
5. ⬜ Confirm REPLACE, MERGE, DELETE maps
6. ⬜ Confirm OPTIONAL skills (keep in staging or delete)
7. ⬜ Confirm enterprise gap skills to create
8. ⬜ Confirm cross-workspace fixes
9. ⬜ Confirm marketing skills decision (3 independent vs merge)
10. ⬜ Confirm implementation phases

**Only after explicit approval will v1.2 implementation begin.**

---

*Generated by 7-phase final engineering review. All pending user approval.*
