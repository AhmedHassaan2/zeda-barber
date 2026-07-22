# SKILL-GAP-REPORT.md — Enterprise Skill Gap Analysis (Final)

**Generated:** 2026-07-20
**Analysis Round:** Final (post-approval comprehensive review)
**Current Skills:** 80 (67 global + 13 project with content)
**Domain:** 6 enterprise domains — AI Engineering, Architecture, Observability, Security, DevOps, Platform Engineering

---

## Executive Summary

| Domain | Current | Gap Severity | New Skills | Enhancements | Priority |
|--------|---------|--------------|------------|--------------|----------|
| AI Engineering | 6 skills | 🔴 HIGH | 4 new + 1 from staging | 2 enhance | P0 |
| Architecture | 5 skills | 🟡 MEDIUM | 2 new | 0 | P1 |
| Observability | 3 skills | 🔴 CRITICAL | 2 new + 1 from staging | 2 enhance | P0 |
| Security | 8 skills | 🟡 MEDIUM | 2 new | 1 enhance | P1 |
| DevOps | 5 skills | 🟡 MEDIUM | 2 new + 1 bundled | 0 | P1 |
| Platform Eng | 0 skills | 🔴 CRITICAL | 1 bundled | 0 | P0 |

**Total new enterprise skills: 14** (from gap analysis)
**Total from staging candidates: 38** (from candidate pool)
**Total existing skills to enhance: 6**

---

## DOMAIN 1: AI Engineering

### Current State (6 skills)

| Skill | Quality | Coverage | Limitation |
|-------|---------|----------|------------|
| `agent-design` | 72/100 | 40% | Agent patterns; no Azure AI, no Foundry |
| `context-engineering` | 70/100 | 50% | Token budgeting, memory; missing hierarchical context, caching |
| `llm-integration` | 70/100 | 45% | API patterns; no Azure OpenAI, no streaming optimization |
| `mcp-integration` | 65/100 | 35% | Abstract overview; no practical setup |
| `prompt-engineering` | 70/100 | 50% | Basic techniques; no chaining, versioning, eval-driven |
| `rag-patterns` | 70/100 | 40% | RAG patterns; no vector DB deep-dive, no chunking strategies |

### Gaps Identified

| # | Gap | Severity | Exists? | Action |
|---|-----|----------|---------|--------|
| 1 | **AI Guardrails** | CRITICAL | Partial (knowledge doc only) | CREATE `ai-guardrails` |
| 2 | **Model Routing** | HIGH | Partial (1 sentence in knowledge) | CREATE `model-routing` |
| 3 | **LLM Evaluation** | HIGH | Partial (knowledge doc only) | CREATE `llm-evaluation` |
| 4 | **AI Cost Optimization** | HIGH | Partial (knowledge doc only) | CREATE `ai-cost-optimization` |
| 5 | **AI Gateway** | HIGH | Staging only (azure-aigateway) | GRADUATE from staging |
| 6 | **Context Engineering** | MEDIUM | Partial | ENHANCE existing |
| 7 | **Prompt Engineering Patterns** | MEDIUM | Partial | ENHANCE existing |

### New Skills to Create (4)

#### 1. `ai-guardrails` — P0 CRITICAL
**Why:** Production AI features MUST have guardrails. Mentioned in 5 files, implemented zero times.
**Cover:**
- Input validation (prompt injection defense, jailbreak prevention)
- Output validation (content moderation, toxicity filtering, PII detection)
- Format compliance (JSON schema enforcement, type checking)
- Rate limiting per user/model
- Cost caps per request/session
- Content safety filters
- Audit logging for AI interactions

#### 2. `model-routing` — P0 HIGH
**Why:** Critical for AI cost/quality optimization. Only 1 sentence exists in knowledge doc.
**Cover:**
- Model selection logic (task→model mapping)
- Cost/quality/latency trade-offs
- Fallback chains (primary→secondary→tertiary)
- Model registry (available models, capabilities, pricing)
- A/B model testing
- Model versioning and rollback
- Dynamic routing based on load

#### 3. `llm-evaluation` — P1 HIGH
**Why:** Already in AGENTS.md roadmap for v1.3. No implementation exists.
**Cover:**
- Evaluation frameworks (promptfoo, Braintrust, custom)
- Benchmark datasets and test cases
- Metrics: accuracy, relevance, hallucination rate, latency
- Eval pipelines (automated + human-in-the-loop)
- Regression testing for prompt/model changes
- Production monitoring of model quality
- A/B testing for model comparisons

#### 4. `ai-cost-optimization` — P1 HIGH
**Why:** Only conceptual coverage exists (6 lines in knowledge doc).
**Cover:**
- Token budgeting and monitoring
- Response caching (semantic + exact)
- Model tiering strategies (cheap→expensive based on complexity)
- Prompt optimization for cost reduction
- Batching strategies
- Cost dashboards and alerts
- Budget per user/feature/tenant

### From Staging (1)

| Candidate | Score | Decision |
|-----------|-------|----------|
| `microsoft-foundry` | 94 | CREATE NEW — Azure AI Foundry Agent Service |

### Existing to Enhance (2)

| Skill | Enhancement |
|-------|-------------|
| `context-engineering` | Add hierarchical context, context caching, quality evaluation, multi-language context |
| `prompt-engineering` | Add prompt chaining, version management, eval-driven optimization, system prompt architecture |

### Candidate to Graduate (1)

| Candidate | Score | Decision |
|-----------|-------|----------|
| `azure-aigateway` | 87 | GRADUATE from staging — complete Azure AI Gateway skill |

---

## DOMAIN 2: Architecture

### Current State (5 skills)

| Skill | Quality | Coverage | Limitation |
|-------|---------|----------|------------|
| `clean-architecture` | 72/100 | 45% | Layering, DI; missing DDD, hexagonal |
| `design-patterns` | 70/100 | 40% | GoF patterns; missing distributed patterns |
| `refactoring-patterns` | 70/100 | 40% | Refactoring only; no system design |
| `scalability` | 70/100 | 35% | Scaling strategies; missing distributed systems |
| `solid-principles` | 70/100 | 50% | SOLID only; overlaps with clean-architecture |

### Gaps Identified

| # | Gap | Severity | Exists? | Action |
|---|-----|----------|---------|--------|
| 1 | **Domain-Driven Design** | HIGH | Knowledge doc only (113 lines) | CREATE skill from knowledge doc |
| 2 | **System Design Patterns** | HIGH | Partial (GoF only) | CREATE `system-design-patterns` |
| 3 | **GraphQL** | MEDIUM | Passing mentions only | CREATE `graphql` |
| 4 | **CQRS** | MEDIUM | Zero mentions | Bundle into `system-design-patterns` |
| 5 | **Event Sourcing** | MEDIUM | 2 passing mentions | Bundle into `system-design-patterns` |
| 6 | **API Versioning** | LOW | Partial (6 lines in skill) | ENHANCE `api-design` |
| 7 | **Message Queues** | LOW | Partial (basic in-memory) | ENHANCE `background-jobs` |

### New Skills to Create (3)

#### 1. `domain-driven-design` — P0 HIGH
**Why:** Knowledge doc exists (113 lines) but no actionable skill. DDD is the standard for complex enterprise systems.
**Cover:**
- Strategic design: bounded contexts, ubiquitous language, context mapping
- Tactical design: entities, value objects, aggregates, repositories, domain events
- Aggregate rules and consistency boundaries
- TypeScript implementation patterns
- When to use DDD vs simpler patterns
- Anti-corruption layers
- Workshop facilitation for domain modeling

#### 2. `system-design-patterns` — P0 HIGH
**Why:** Zero distributed system patterns exist. GoF patterns cover single-process only.
**Cover:**
- Circuit Breaker (resilience)
- Saga (distributed transactions — orchestration vs choreography)
- Strangler Fig (migration)
- API Gateway (routing, composition)
- CQRS (command/query separation)
- Event Sourcing (audit trail, replay)
- Outbox Pattern (reliable messaging)
- Message Queue patterns (pub/sub, point-to-point)
- Service Mesh concepts

#### 3. `graphql` — P1 MEDIUM
**Why:** Mentioned in 3 knowledge docs but no skill. Common API pattern.
**Cover:**
- Schema design and type system
- Resolvers and N+1 problem (DataLoader)
- Subscriptions (real-time)
- Federation (schema stitching)
- Code-first vs schema-first
- Apollo Server / Yoga setup
- Client setup (Apollo Client, urql)
- Migration from REST

### Existing to Enhance (0)

No architecture skills need enhancement — the new skills fill the gaps.

### From Staging (0)

No staging candidates directly address architecture gaps (candidates were merged into existing skills).

---

## DOMAIN 3: Observability

### Current State (3 skills)

| Skill | Quality | Coverage | Limitation |
|-------|---------|----------|------------|
| `error-tracking` | 75/100 | 40% | Sentry setup; missing error budgets, alerting |
| `monitoring-observability` | 68/100 | 30% | Basic health checks; missing three pillars, SLOs |
| `structured-logging` | 72/100 | 45% | Log levels, JSON; missing aggregation, PII redaction |

### Gaps Identified — CRITICAL

| # | Gap | Severity | Exists? | Action |
|---|-----|----------|---------|--------|
| 1 | **OpenTelemetry** | CRITICAL | Zero mentions | CREATE `opentelemetry` |
| 2 | **Distributed Tracing** | CRITICAL | 1 bullet point mention | CREATE `distributed-tracing` |
| 3 | **Observability Engineering** | HIGH | Partial (3 skills, each <50%) | ENHANCE `monitoring-observability` |
| 4 | **Metrics Engineering** | HIGH | Basic table only | ENHANCE or create |
| 5 | **Structured Logging** | MEDIUM | Partial | ENHANCE existing |
| 6 | **Log Correlation** | MEDIUM | 1 bullet point | Bundle into `distributed-tracing` |

### New Skills to Create (3)

#### 1. `opentelemetry` — P0 CRITICAL
**Why:** Industry-standard observability framework. Zero coverage in workspace.
**Cover:**
- OTel SDK setup for Next.js/Node.js
- Trace, metrics, logs export
- Auto-instrumentation
- Vendor-neutral telemetry (export to any backend)
- Collector configuration
- Supabase + Vercel integration patterns
- Sampling strategies

#### 2. `distributed-tracing` — P0 CRITICAL
**Why:** Core observability pillar. Only 1 bullet point exists.
**Cover:**
- Trace propagation (W3C Trace Context headers)
- Span creation and naming
- Cross-service tracing
- Trace-log correlation (linking traces to structured logs)
- Trace-based debugging
- Sampling strategies (head-based, tail-based)
- Visualization (Jaeger, Zipkin, Azure AppLens)

#### 3. `metrics-engineering` — P1 HIGH
**Why:** Only basic metrics table exists. Missing custom metrics, RED/USE methods.
**Cover:**
- RED method (Rate, Errors, Duration)
- USE method (Utilization, Saturation, Errors)
- Custom metric creation
- Business metrics (conversion, revenue, engagement)
- Metric naming conventions
- Dashboard design principles
- Alerting rules and thresholds
- Prometheus + Grafana setup

### Existing to Enhance (2)

| Skill | Enhancement |
|-------|-------------|
| `monitoring-observability` | Add three pillars framework, SLIs/SLOs/SLAs, error budgets, incident response, runbooks, capacity planning |
| `structured-logging` | Add log aggregation setup (Datadog, Logtail, ELK), retention policies, log-based alerting, PII redaction patterns |

### From Staging (1)

| Candidate | Score | Decision |
|-----------|-------|----------|
| `azure-diagnostics` | 82 | CREATE NEW — Azure monitoring, metrics, logs, alerts |

---

## DOMAIN 4: Security

### Current State (8 skills)

| Skill | Quality | Coverage | Limitation |
|-------|---------|----------|------------|
| `authentication-patterns` | 75/100 | 45% | Supabase Auth; no Azure AD, MFA |
| `authorization-patterns` | 72/100 | 40% | RBAC basics; no ABAC, hierarchical RBAC |
| `environment-secrets` | 75/100 | 50% | Good for Next.js/Vercel; no vault integration |
| `input-validation` | 75/100 | 50% | Zod patterns; comprehensive |
| `jwt-security` | 90/100 | 70% | Excellent JWT coverage |
| `owasp-top-10` | 75/100 | 45% | Checklist; overlaps with security-audit |
| `rate-limiting` | 65/100 | 35% | Basic throttling; missing advanced patterns |
| `security-audit` | 75/100 | 45% | Audit process; overlaps with owasp-top-10 |

### Gaps Identified

| # | Gap | Severity | Exists? | Action |
|---|-----|----------|---------|--------|
| 1 | **Audit Logging** | HIGH | 5 one-line mentions, zero implementation | CREATE `audit-logging` |
| 2 | **Zero Trust** | HIGH | Zero mentions | CREATE `zero-trust` |
| 3 | **ABAC** | MEDIUM | 4 lines conceptual | ENHANCE `authorization-patterns` |
| 4 | **RBAC** | LOW | Partial (exists) | ENHANCE `authorization-patterns` |
| 5 | **Secret Management** | LOW | Complete for current scope | ENHANCE for enterprise |

### New Skills to Create (2)

#### 1. `audit-logging` — P0 HIGH
**Why:** Compliance requirement (SOC2, GDPR). Mentioned 5 times, implemented zero times.
**Cover:**
- Audit event schema design
- Audit trail implementation (who did what, when, where)
- Compliance logging (SOC2, GDPR, HIPAA)
- Tamper-proof logging (append-only, hashing)
- Audit log querying and analysis
- Retention policies
- Alerting on suspicious patterns
- Integration with structured-logging skill

#### 2. `zero-trust` — P1 HIGH
**Why:** Zero mentions of Zero Trust architecture. "Least privilege" principle mentioned but not equivalent.
**Cover:**
- Identity verification (every request, every time)
- Micro-segmentation
- Least-privilege access (expanded)
- Continuous verification
- Device trust and posture checks
- Network segmentation
- Service-to-service authentication (mTLS)
- Zero Trust Network Access (ZTNA)
- Implementation roadmap

### Existing to Enhance (1)

| Skill | Enhancement |
|-------|-------------|
| `authorization-patterns` | Add ABAC implementation (attribute definitions, policy authoring with OPA/Casbin), hierarchical RBAC, permission inheritance, dynamic role assignment, permission caching |

### From Staging (3)

| Candidate | Score | Decision |
|-----------|-------|----------|
| `entra-app-registration` | 85 | CREATE NEW — Azure AD OAuth/OIDC |
| `azure-compliance` | 82 | CREATE NEW — Azure compliance policies |
| `azure-validate` | 86 | CREATE NEW — Pre-deployment validation |

---

## DOMAIN 5: DevOps

### Current State (5 skills)

| Skill | Quality | Coverage | Limitation |
|-------|---------|----------|------------|
| `ci-cd-pipelines` | 70/100 | 40% | Generic CI/CD; missing GitHub Actions specifics |
| `docker-patterns` | 70/100 | 45% | Docker basics; missing multi-stage, Compose |
| `environment-secrets` | 75/100 | 50% | Good for Next.js; no vault integration |
| `infrastructure-as-code` | 70/100 | 40% | Terraform basics; missing Pulumi, Bicep |
| `vercel-deployment` | 68/100 | 40% | Basic deploy; missing monorepos, preview envs |

### Gaps Identified

| # | Gap | Severity | Exists? | Action |
|---|-----|----------|---------|--------|
| 1 | **Feature Flags** | HIGH | 1-line mentions only | CREATE `feature-flags` |
| 2 | **Deployment Strategies** | HIGH | Zero mentions (canary, blue/green) | CREATE `deployment-strategies` |
| 3 | **Rollback Strategies** | HIGH | 10+ "plan rollback" mentions, zero HOW | Bundle into `deployment-strategies` |
| 4 | **Turborepo** | MEDIUM | Zero coverage | CREATE from staging |

### New Skills to Create (2 + 1 bundled)

#### 1. `feature-flags` — P0 HIGH
**Why:** Enables safe deployments and gradual rollouts. Foundational for all deployment strategies.
**Cover:**
- Feature flag systems (LaunchDarkly, Unleash, custom Supabase-backed)
- Flag types: release, experiment, ops, permission
- Client-side vs server-side evaluation
- Flag lifecycle (create → test → graduate → cleanup)
- Gradual rollouts (percentage-based, user-segment)
- Kill switches for emergency rollback
- Flag consistency across environments
- A/B testing integration

#### 2. `deployment-strategies` — P0 HIGH
**Why:** Canary, blue/green, and rollback are all missing. Mentioned 10+ times with zero implementation.
**Cover:**
- Canary releases (traffic splitting, metric monitoring, automated rollback)
- Blue/Green deployment (DNS switching, database compatibility)
- Rollback strategies (application, database, feature flag kill switches)
- Vercel preview deployments as canary
- Percentage-based rollouts
- Rollback testing and automation
- Deployment smoke tests

### From Staging (2)

| Candidate | Score | Decision |
|-----------|-------|----------|
| `deploy-to-vercel` | 89 | REPLACE `vercel-deployment` — superior coverage |
| `turborepo` | 93 | CREATE NEW — monorepo orchestration |

---

## DOMAIN 6: Platform Engineering

### Current State (0 skills)

No existing skills in this domain. Critical gap.

### Gaps Identified — CRITICAL

| # | Gap | Severity | Exists? | Action |
|---|-----|----------|---------|--------|
| 1 | **Internal Developer Platform** | CRITICAL | Zero mentions | CREATE bundled skill |
| 2 | **Developer Experience** | HIGH | 2 passing mentions | Bundle into platform skill |
| 3 | **Golden Paths** | HIGH | Zero mentions | Bundle into platform skill |

### New Skills to Create (1 bundled)

#### 1. `platform-engineering` — P0 CRITICAL
**Why:** Platform engineering is a critical enterprise discipline. Starting from zero is unacceptable.
**Cover:**
- **IDP section:** Internal Developer Platform concepts, self-service infrastructure, developer portals, platform APIs, template-driven provisioning, Backstage.io
- **DX section:** Developer Experience measurement, CLI tooling, SDK design, onboarding flows, documentation quality, IDE integration, error messages UX, local dev environment
- **Golden Paths section:** Opinionated project templates, starter kits, scaffolding, standard project structure, recommended patterns, migration guides

---

## CROSS-DOMAIN RECOMMENDATIONS

### P0 — Must Create (10 skills)

| # | Skill | Domain | Rationale |
|---|-------|--------|-----------|
| 1 | `ai-guardrails` | AI | Production AI safety — non-negotiable |
| 2 | `model-routing` | AI | Cost/quality optimization — critical |
| 3 | `domain-driven-design` | Architecture | Knowledge doc exists, skill doesn't |
| 4 | `system-design-patterns` | Architecture | Distributed patterns — foundational |
| 5 | `opentelemetry` | Observability | Industry standard — zero coverage |
| 6 | `distributed-tracing` | Observability | Core pillar — zero coverage |
| 7 | `audit-logging` | Security | Compliance requirement — mentioned 5x, implemented 0x |
| 8 | `feature-flags` | DevOps | Foundational for deployment strategies |
| 9 | `deployment-strategies` | DevOps | Canary/blue/green/rollback — all missing |
| 10 | `platform-engineering` | Platform Eng | IDP + DX + Golden Paths — zero coverage |

### P1 — Should Create (4 skills)

| # | Skill | Domain | Rationale |
|---|-------|--------|-----------|
| 11 | `llm-evaluation` | AI | In roadmap, no implementation |
| 12 | `ai-cost-optimization` | AI | Builds on model-routing + monitoring |
| 13 | `graphql` | Architecture | Common pattern, mentioned in 3 docs |
| 14 | `metrics-engineering` | Observability | Builds on enhanced monitoring |

### P2 — Enhance Existing (6 skills)

| # | Skill | Enhancement |
|---|-------|-------------|
| 15 | `context-engineering` | Hierarchical context, caching, quality evaluation |
| 16 | `prompt-engineering` | Chaining, versioning, eval-driven optimization |
| 17 | `monitoring-observability` | Three pillars, SLOs/SLIs, error budgets, runbooks |
| 18 | `structured-logging` | Log aggregation, PII redaction, log-based alerting |
| 19 | `authorization-patterns` | ABAC, hierarchical RBAC, permission caching |
| 20 | `background-jobs` | Real message queues (BullMQ), dead letter queues |

---

## COVERAGE IMPROVEMENT PROJECTION

| Domain | Before | After P0 | After P0+P1 | After P0+P1+Enhance |
|--------|--------|----------|-------------|---------------------|
| AI Engineering | 6 (36%) | 10 (59%) | 12 (71%) | 14 (82%) |
| Architecture | 5 (29%) | 7 (41%) | 8 (47%) | 8 (47%) |
| Observability | 3 (18%) | 5 (29%) | 6 (35%) | 8 (47%) |
| Security | 8 (47%) | 10 (59%) | 10 (59%) | 11 (65%) |
| DevOps | 5 (29%) | 8 (47%) | 8 (47%) | 8 (47%) |
| Platform Eng | 0 (0%) | 1 (6%) | 1 (6%) | 1 (6%) |

**Overall enterprise skill coverage: 27 (24%) → 41 (37%) → 45 (40%) → 50 (45%)**

---

## IMPLEMENTATION PRIORITY

### Phase 1: Staging Imports + P0 Gap Skills (Immediate)
Import 38 candidates from staging + create 10 P0 gap skills = **48 skills**

### Phase 2: P1 Gap Skills + Enhancements (Next)
Create 4 P1 gap skills + enhance 6 existing skills = **10 changes**

### Phase 3: Consistency Fixes (Same time as Phase 1-2)
Fix 15 cross-workspace issues (broken references, count errors, orphans)

### Phase 4: Documentation (After all changes)
Regenerate VitePress docs, update MANIFEST.md, AGENTS.md, DEPENDENCIES.md

---

*This report is generated from comprehensive 7-phase engineering review. All recommendations pending user approval.*
