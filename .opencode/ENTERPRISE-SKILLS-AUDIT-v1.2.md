# Enterprise Skills Audit v1.2

**Generated:** 2026-07-20
**Workspace:** OpenCode Enterprise Workspace v1.2
**Scope:** All enterprise domain skills — quality, coverage, maturity, and gaps

---

## Scoring Methodology

| Metric | Criteria | Range |
|--------|----------|-------|
| **Quality Score** | Completeness of frontmatter, documentation depth, code examples, practical guidance, edge cases | 0–100 |
| **Coverage Score** | How well the skill covers its domain (completeness against industry standards) | 0–100 |
| **Maturity** | `emerging` (basic/skeleton), `growing` (functional but gaps), `mature` (comprehensive) | Label |

**Maturity Thresholds:**
- **Mature:** Quality ≥ 80, Coverage ≥ 80
- **Growing:** Quality ≥ 50, Coverage ≥ 50
- **Emerging:** Quality < 50 or Coverage < 50

---

## 1. AI Engineering Skills (12 skills)

| # | Skill | Quality | Coverage | Maturity | Key Gaps |
|---|-------|---------|----------|----------|----------|
| 1 | `llm-integration` | 65 | 60 | growing | Missing streaming error handling patterns, no multi-provider failover, limited production deployment guidance |
| 2 | `prompt-engineering` | 70 | 65 | growing | No advanced prompt chaining, limited evaluation metrics, missing prompt versioning patterns |
| 3 | `rag-patterns` | 55 | 50 | growing | Basic chunking only, no hybrid search, missing reranking, limited production RAG patterns |
| 4 | `context-engineering` | 65 | 60 | growing | Missing context caching strategies, no multi-agent context sharing, limited token optimization |
| 5 | `agent-design` | 55 | 45 | growing | Basic tool calling only, no multi-agent orchestration, missing planning patterns, no memory systems |
| 6 | `ai-guardrails` | 75 | 70 | growing | Good injection detection, needs more output validation patterns, missing toxicity classifiers |
| 7 | `model-routing` | 80 | 75 | growing | Strong model registry, needs A/B testing implementation, missing latency-based routing |
| 8 | `llm-evaluation` | 75 | 70 | growing | Good eval framework, needs automated eval pipelines, missing production drift detection |
| 9 | `mcp-builder` | 60 | 55 | growing | Good MCP overview, needs more TypeScript examples, missing auth patterns, incomplete frontmatter |
| 10 | `ai-cost-optimization` | 75 | 70 | growing | Strong budget management, needs real-time cost dashboards, missing model comparison benchmarks |
| 11 | `ai-context-optimization` | 80 | 75 | growing | Comprehensive budgeting, needs production context management patterns |
| 12 | `ai-prompt-compression` | 80 | 75 | growing | Strong compression techniques, needs automated compression pipelines |

**AI Domain Summary:**
- **Average Quality:** 69.6
- **Average Coverage:** 62.5
- **Mature:** 0
- **Growing:** 12
- **Emerging:** 0
- **Critical Gaps:** Multi-agent orchestration, production RAG patterns, prompt evaluation automation

### AI Recommendations for v1.3
1. Expand `agent-design` with multi-agent orchestration patterns (LangGraph, CrewAI)
2. Add production RAG patterns to `rag-patterns` (hybrid search, reranking, evaluation)
3. Add `llm-ab-testing` skill for model comparison experiments
4. Expand `prompt-engineering` with prompt versioning and A/B testing
5. Add `ai-observability` skill for LLM-specific monitoring (latency, quality, cost per request)

---

## 2. Architecture Skills (6 skills)

| # | Skill | Quality | Coverage | Maturity | Key Gaps |
|---|-------|---------|----------|----------|----------|
| 1 | `clean-architecture` | 60 | 55 | growing | Basic layer structure, missing practical refactoring examples, limited testing strategies |
| 2 | `design-patterns` | 55 | 50 | growing | Catalog only, missing anti-pattern identification, limited TypeScript examples |
| 3 | `refactoring-patterns` | 65 | 60 | growing | Good patterns, needs more before/after examples, missing code smell taxonomy |
| 4 | `scalability` | 55 | 50 | growing | Basic concepts, missing load testing patterns, limited infrastructure sizing |
| 5 | `domain-driven-design` | 75 | 70 | growing | Strong DDD concepts, needs practical bounded context examples, missing event storming |
| 6 | `system-design-patterns` | 80 | 75 | growing | Comprehensive patterns, needs more distributed system failure modes |

**Architecture Domain Summary:**
- **Average Quality:** 65.0
- **Average Coverage:** 60.0
- **Mature:** 0
- **Growing:** 6
- **Emerging:** 0
- **Critical Gaps:** Practical refactoring workflows, distributed system failure modes, event storming

### Architecture Recommendations for v1.3
1. Add `refactoring-workflows` skill with step-by-step refactoring processes
2. Add `distributed-systems-failures` skill for failure mode analysis
3. Expand `design-patterns` with anti-pattern catalog and identification rules
4. Add `event-storming` skill for domain discovery workshops
5. Expand `scalability` with load testing and capacity planning

---

## 3. Observability Skills (8 skills)

| # | Skill | Quality | Coverage | Maturity | Key Gaps |
|---|-------|---------|----------|----------|----------|
| 1 | `structured-logging` | 70 | 65 | growing | Good log levels and patterns, missing log aggregation setup, limited vendor integration |
| 2 | `error-tracking` | 60 | 55 | growing | Basic Sentry setup, missing error grouping strategies, limited alerting patterns |
| 3 | `monitoring-observability` | 65 | 60 | growing | Good health checks, missing SLI/SLO implementation, limited dashboard design |
| 4 | `opentelemetry` | 85 | 80 | **mature** | Comprehensive OTel coverage, good vendor-neutral approach |
| 5 | `distributed-tracing` | 85 | 80 | **mature** | Strong trace propagation, good span management, comprehensive coverage |
| 6 | `metrics-engineering` | 80 | 75 | growing | Strong RED/USE methods, needs more Grafana dashboard templates |
| 7 | `azure-diagnostics` | 75 | 70 | growing | Good Azure-specific debugging, needs broader cloud coverage |
| 8 | `appinsights-instrumentation` | 70 | 65 | growing | Good App Insights setup, missing custom telemetry patterns |

**Observability Domain Summary:**
- **Average Quality:** 73.8
- **Average Coverage:** 68.8
- **Mature:** 2 (opentelemetry, distributed-tracing)
- **Growing:** 6
- **Emerging:** 0
- **Critical Gaps:** Log aggregation, alerting patterns, SLI/SLO implementation

### Observability Recommendations for v1.3
1. Expand `error-tracking` with error grouping and alerting patterns
2. Add `alerting-engineing` skill for alert rule design and escalation
3. Expand `monitoring-observability` with SLI/SLO/SLA implementation
4. Add `log-aggregation` skill for centralized logging setup (ELK, Datadog)
5. Add `dashboard-design` skill for monitoring dashboard creation

---

## 4. Security Skills (13 skills)

| # | Skill | Quality | Coverage | Maturity | Key Gaps |
|---|-------|---------|----------|----------|----------|
| 1 | `authentication-patterns` | 65 | 60 | growing | Good Supabase Auth coverage, missing passwordless patterns, limited MFA implementation |
| 2 | `jwt-security` | 70 | 65 | growing | Strong JWT patterns, missing token rotation, limited key management |
| 3 | `environment-secrets` | 65 | 60 | growing | Good env management, missing secrets rotation automation, limited Vault integration |
| 4 | `input-validation` | 60 | 55 | growing | Basic Zod patterns, missing advanced sanitization, limited injection defense |
| 5 | `rate-limiting` | 60 | 55 | growing | Basic rate limiting, missing sliding window, limited distributed rate limiting |
| 6 | `owasp-top-10` | 65 | 60 | growing | Good overview, missing practical mitigation code, limited real-world examples |
| 7 | `security-audit` | 65 | 60 | growing | Good checklist, missing automated scanning integration, limited remediation guides |
| 8 | `authorization-patterns` | 75 | 70 | growing | Strong RBAC, missing ABAC implementation, limited permission inheritance |
| 9 | `audit-logging` | 80 | 75 | **mature** | Comprehensive audit trail, good compliance coverage |
| 10 | `zero-trust` | 80 | 75 | **mature** | Strong zero trust architecture, good phased implementation |
| 11 | `entra-app-registration` | 70 | 65 | growing | Good Entra ID coverage, needs more OAuth flows |
| 12 | `azure-compliance` | 70 | 65 | growing | Good Azure compliance, needs broader compliance framework coverage |
| 13 | `azure-validate` | 70 | 65 | growing | Good Azure validation, needs more policy examples |

**Security Domain Summary:**
- **Average Quality:** 68.8
- **Average Coverage:** 63.5
- **Mature:** 2 (audit-logging, zero-trust)
- **Growing:** 11
- **Emerging:** 0
- **Critical Gaps:** Advanced injection defense, distributed rate limiting, ABAC, automated security scanning

### Security Recommendations for v1.3
1. Expand `input-validation` with advanced injection defense (SQL, NoSQL, LDAP, OS command)
2. Add `api-security` skill for API-specific security patterns (CORS, CSP, header hardening)
3. Expand `rate-limiting` with sliding window and distributed rate limiting
4. Add `dependency-scanning` skill for automated vulnerability detection
5. Expand `authorization-patterns` with ABAC and permission inheritance

---

## 5. DevOps Skills (9 skills)

| # | Skill | Quality | Coverage | Maturity | Key Gaps |
|---|-------|---------|----------|----------|----------|
| 1 | `ci-cd-pipelines` | 60 | 55 | growing | Basic GitHub Actions, missing multi-stage pipelines, limited quality gates |
| 2 | `docker-patterns` | 60 | 55 | growing | Good Dockerfile patterns, missing security scanning, limited compose patterns |
| 3 | `infrastructure-as-code` | 55 | 50 | growing | Basic Terraform, missing state management, limited module patterns |
| 4 | `feature-flags` | 80 | 75 | **mature** | Comprehensive flag system, good LaunchDarkly/Unleash coverage |
| 5 | `deployment-strategies` | 80 | 75 | **mature** | Strong canary/blue-green, good rollback patterns |
| 6 | `deploy-to-vercel` | 65 | 60 | growing | Good Vercel deployment, missing edge function patterns, non-standard frontmatter |
| 7 | `turborepo` | 65 | 60 | growing | Good monorepo patterns, missing task optimization, non-standard frontmatter |
| 8 | `azure-deploy` | 70 | 65 | growing | Good Azure deployment, needs more service-specific patterns |
| 9 | `azure-prepare` | 70 | 65 | growing | Good Azure preparation, needs more integration patterns |

**DevOps Domain Summary:**
- **Average Quality:** 67.2
- **Average Coverage:** 62.2
- **Mature:** 2 (feature-flags, deployment-strategies)
- **Growing:** 7
- **Emerging:** 0
- **Critical Gaps:** Advanced CI/CD patterns, Docker security, Terraform modules, edge deployment

### DevOps Recommendations for v1.3
1. Expand `ci-cd-pipelines` with multi-stage pipelines and quality gates
2. Add `docker-security` skill for container security scanning and hardening
3. Expand `infrastructure-as-code` with Terraform modules and state management
4. Add `edge-deployment` skill for edge function deployment patterns
5. Normalize `deploy-to-vercel` and `turborepo` frontmatter to v1.2 standard

---

## 6. Platform Engineering Skills (1 skill)

| # | Skill | Quality | Coverage | Maturity | Key Gaps |
|---|-------|---------|----------|----------|----------|
| 1 | `platform-engineering` | 85 | 75 | **mature** | Comprehensive IDP coverage, good Backstage integration, strong golden paths |

**Platform Domain Summary:**
- **Average Quality:** 85.0
- **Average Coverage:** 75.0
- **Mature:** 1
- **Growing:** 0
- **Emerging:** 0
- **Critical Gaps:** Service catalog automation, developer portal customization, metric-driven platform iteration

### Platform Recommendations for v1.3
1. Add `developer-portal` skill for Backstage customization and plugin development
2. Add `golden-paths` skill for standardized project templates and scaffolding
3. Expand `platform-engineering` with service catalog automation patterns
4. Add `platform-metrics` skill for measuring developer productivity and platform adoption

---

## Overall Enterprise Coverage Metrics

### Quality Summary by Domain

| Domain | Skills | Avg Quality | Avg Coverage | Mature | Growing | Emerging |
|--------|--------|-------------|--------------|--------|---------|----------|
| AI Engineering | 12 | 69.6 | 62.5 | 0 | 12 | 0 |
| Architecture | 6 | 65.0 | 60.0 | 0 | 6 | 0 |
| Observability | 8 | 73.8 | 68.8 | 2 | 6 | 0 |
| Security | 13 | 68.8 | 63.5 | 2 | 11 | 0 |
| DevOps | 9 | 67.2 | 62.2 | 2 | 7 | 0 |
| Platform | 1 | 85.0 | 75.0 | 1 | 0 | 0 |
| **TOTAL** | **49** | **71.2** | **64.7** | **7** | **42** | **0** |

### Enterprise Readiness Score

| Metric | Score |
|--------|-------|
| **Overall Quality** | 71.2 / 100 |
| **Overall Coverage** | 64.7 / 100 |
| **Maturity Distribution** | 7 mature, 42 growing, 0 emerging |
| **Enterprise Readiness** | **68 / 100** — Growing, not yet production-grade |

### Top 5 Strengths
1. **AI Cost Optimization** (80/75) — Comprehensive budget management and model tiering
2. **AI Context Optimization** (80/75) — Strong context window management
3. **AI Prompt Compression** (80/75) — Advanced prompt optimization techniques
4. **OpenTelemetry** (85/80) — Mature, vendor-neutral observability
5. **Platform Engineering** (85/75) — Comprehensive IDP coverage

### Top 5 Weaknesses
1. **Agent Design** (55/45) — Missing multi-agent orchestration
2. **Scalability** (55/50) — Basic concepts only
3. **Design Patterns** (55/50) — Catalog without practical guidance
4. **Infrastructure as Code** (55/50) — Basic Terraform only
5. **RAG Patterns** (55/50) — Missing production RAG patterns

---

## v1.3 Recommendations

### Priority 1: Critical Gaps (Must Fix)
1. **Add `multi-agent-orchestration` skill** — LangGraph, CrewAI, agent communication patterns
2. **Add `production-rag` skill** — Hybrid search, reranking, evaluation, production deployment
3. **Add `api-security` skill** — CORS, CSP, header hardening, API-specific threats
4. **Add `alerting-engineering` skill** — Alert rule design, escalation, on-call integration
5. **Expand `agent-design`** — Multi-agent patterns, planning, memory systems

### Priority 2: Coverage Gaps (Should Fix)
6. **Add `dependency-scanning` skill** — Automated vulnerability detection (Snyk, npm audit)
7. **Add `docker-security` skill** — Container scanning, image hardening, runtime security
8. **Add `log-aggregation` skill** — Centralized logging (ELK, Datadog, CloudWatch)
9. **Add `edge-deployment` skill** — Edge function patterns, CDN deployment
10. **Add `prompt-versioning` skill** — Prompt management, A/B testing, rollback

### Priority 3: Quality Improvements (Nice to Have)
11. Normalize all non-standard frontmatter to v1.2 format (7 skills)
12. Wire 10 orphan skills to appropriate agents
13. Fix 15 broken references across all skills
14. Add more TypeScript code examples to architecture skills
15. Add more real-world scenarios to security skills

### Priority 4: New Domains (Future)
16. **Mobile Development** — React Native patterns, mobile CI/CD
17. **Data Engineering** — ETL patterns, data pipelines, data quality
18. **ML Ops** — Model deployment, training pipelines, feature stores
19. **Compliance** — SOC2 automation, GDPR implementation, HIPAA patterns
20. **Cost Engineering** — Cloud cost optimization, FinOps practices

---

## Appendix: Skill-by-Skill Quality Assessment

### AI Engineering

| Skill | Frontmatter | Code Examples | Documentation | Edge Cases | Production Ready | Score |
|-------|-------------|---------------|---------------|------------|------------------|-------|
| llm-integration | Good | Good | Fair | Poor | Fair | 65 |
| prompt-engineering | Good | Good | Good | Fair | Fair | 70 |
| rag-patterns | Good | Fair | Fair | Poor | Poor | 55 |
| context-engineering | Good | Good | Fair | Fair | Fair | 65 |
| agent-design | Good | Fair | Fair | Poor | Poor | 55 |
| ai-guardrails | Full | Good | Good | Fair | Good | 75 |
| model-routing | Full | Good | Good | Fair | Good | 80 |
| llm-evaluation | Full | Good | Good | Fair | Good | 75 |
| mcp-builder | Minimal | Good | Fair | Fair | Fair | 60 |
| ai-cost-optimization | Full | Good | Good | Fair | Good | 75 |
| ai-context-optimization | Full | Good | Good | Good | Good | 80 |
| ai-prompt-compression | Full | Good | Good | Good | Good | 80 |

### Architecture

| Skill | Frontmatter | Code Examples | Documentation | Edge Cases | Production Ready | Score |
|-------|-------------|---------------|---------------|------------|------------------|-------|
| clean-architecture | Good | Fair | Fair | Poor | Fair | 60 |
| design-patterns | Good | Fair | Fair | Poor | Fair | 55 |
| refactoring-patterns | Good | Good | Fair | Fair | Fair | 65 |
| scalability | Good | Fair | Fair | Poor | Fair | 55 |
| domain-driven-design | Full | Good | Good | Fair | Good | 75 |
| system-design-patterns | Full | Good | Good | Good | Good | 80 |

### Observability

| Skill | Frontmatter | Code Examples | Documentation | Edge Cases | Production Ready | Score |
|-------|-------------|---------------|---------------|------------|------------------|-------|
| structured-logging | Good | Good | Fair | Fair | Fair | 70 |
| error-tracking | Good | Fair | Fair | Poor | Fair | 60 |
| monitoring-observability | Good | Good | Fair | Fair | Fair | 65 |
| opentelemetry | Full | Good | Good | Good | Good | 85 |
| distributed-tracing | Full | Good | Good | Good | Good | 85 |
| metrics-engineering | Full | Good | Good | Fair | Good | 80 |
| azure-diagnostics | Minimal | Good | Good | Fair | Good | 75 |
| appinsights-instrumentation | Minimal | Fair | Fair | Poor | Fair | 70 |

### Security

| Skill | Frontmatter | Code Examples | Documentation | Edge Cases | Production Ready | Score |
|-------|-------------|---------------|---------------|------------|------------------|-------|
| authentication-patterns | Good | Good | Fair | Fair | Fair | 65 |
| jwt-security | Good | Good | Good | Fair | Fair | 70 |
| environment-secrets | Good | Good | Fair | Fair | Fair | 65 |
| input-validation | Good | Fair | Fair | Poor | Fair | 60 |
| rate-limiting | Good | Fair | Fair | Poor | Fair | 60 |
| owasp-top-10 | Good | Fair | Good | Fair | Fair | 65 |
| security-audit | Good | Fair | Good | Fair | Fair | 65 |
| authorization-patterns | Good | Good | Good | Fair | Good | 75 |
| audit-logging | Full | Good | Good | Good | Good | 80 |
| zero-trust | Full | Good | Good | Good | Good | 80 |
| entra-app-registration | Minimal | Good | Fair | Fair | Fair | 70 |
| azure-compliance | Minimal | Good | Fair | Fair | Fair | 70 |
| azure-validate | Minimal | Good | Fair | Fair | Fair | 70 |

### DevOps

| Skill | Frontmatter | Code Examples | Documentation | Edge Cases | Production Ready | Score |
|-------|-------------|---------------|---------------|------------|------------------|-------|
| ci-cd-pipelines | Good | Fair | Fair | Poor | Fair | 60 |
| docker-patterns | Good | Fair | Fair | Poor | Fair | 60 |
| infrastructure-as-code | Good | Fair | Fair | Poor | Fair | 55 |
| feature-flags | Full | Good | Good | Good | Good | 80 |
| deployment-strategies | Full | Good | Good | Good | Good | 80 |
| deploy-to-vercel | Minimal | Good | Good | Fair | Fair | 65 |
| turborepo | Minimal | Good | Good | Fair | Fair | 65 |
| azure-deploy | Full | Good | Fair | Fair | Good | 70 |
| azure-prepare | Full | Good | Fair | Fair | Good | 70 |

### Platform Engineering

| Skill | Frontmatter | Code Examples | Documentation | Edge Cases | Production Ready | Score |
|-------|-------------|---------------|---------------|------------|------------------|-------|
| platform-engineering | Full | Good | Good | Good | Good | 85 |

---

*Report generated by enterprise skills audit — 2026-07-20*
