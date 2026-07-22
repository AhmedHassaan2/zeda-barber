# Workspace Integrity Report

**Generated:** 2026-07-20
**Workspace:** OpenCode Enterprise Workspace v1.2
**Scope:** Full workspace integrity audit — `~/.config/opencode/`

---

## Executive Summary

| Check | Status | Issues |
|-------|--------|--------|
| Skill Count Verification | **PASS** | 0 |
| Orphan Skills | **FAIL** | 10 |
| Broken References | **FAIL** | 15 |
| Naming Consistency | **PASS** | 0 |
| Frontmatter Completeness | **FAIL** | 5 |
| Category Consistency | **FAIL** | 2 |
| Empty Skills | **PASS** | 0 |
| Dependency Graph Integrity | **FAIL** | 14 |
| **TOTAL** | **FAIL** | **51 issues** |

---

## Check 1: Skill Count Verification

**Status: PASS**

| Source | Count |
|--------|-------|
| Directories on disk (`~/.config/opencode/skills/`) | 112 |
| MANIFEST.md Production Skills | 105 |
| MANIFEST.md Optional Skills | 7 |
| MANIFEST.md Total | 112 |
| SKILL.md files found | 112 |

All 112 skill directories have corresponding SKILL.md files. No missing or extra directories.

---

## Check 2: Orphan Skills

**Status: FAIL — 10 skills not referenced by any agent in DEPENDENCIES.md**

Orphan skills are defined as skills that appear in no agent's dependency list in DEPENDENCIES.md. These skills exist on disk but have no agent wiring.

| # | Skill | Category | Impact |
|---|-------|----------|--------|
| 1 | `architecture-decisions` | documentation | Referenced by docs-writer agent but NOT in DEPENDENCIES.md agent→skill section |
| 2 | `component-documentation` | documentation | Referenced by docs-writer agent but NOT in DEPENDENCIES.md agent→skill section |
| 3 | `copywriting` | marketing | No agent references this skill |
| 4 | `marketing-psychology` | marketing | No agent references this skill |
| 5 | `content-strategy` | marketing | No agent references this skill |
| 6 | `find-skills` | utility | No agent references this skill |
| 7 | `extract-design-system` | utility | No agent references this skill |
| 8 | `pdf` | utility | No agent references this skill |
| 9 | `teach` | utility | No agent references this skill |
| 10 | `prototype` | process | No agent references this skill |
| 11 | `to-tickets` | process | No agent references this skill |
| 12 | `browser-use` | process | No agent references this skill |

**Note:** The docs-writer agent IS listed in DEPENDENCIES.md referencing `api-documentation`, `architecture-decisions`, and `component-documentation` — so items 1-2 are actually wired. Recounting true orphans (no agent in DEPENDENCIES.md references them at all):

| # | Skill | Category |
|---|-------|----------|
| 1 | `copywriting` | marketing |
| 2 | `marketing-psychology` | marketing |
| 3 | `content-strategy` | marketing |
| 4 | `find-skills` | utility |
| 5 | `extract-design-system` | utility |
| 6 | `pdf` | utility |
| 7 | `teach` | utility |
| 8 | `prototype` | process |
| 9 | `to-tickets` | process |
| 10 | `browser-use` | process |

**Recommendation:** Wire these to appropriate agents or document them as standalone/on-demand skills in DEPENDENCIES.md.

---

## Check 3: Broken References

**Status: FAIL — 15 broken references found**

References in SKILL.md `related_skills`, `dependencies`, or `related_playbooks` that point to non-existent skills.

| # | Source Skill | Field | Broken Reference | Fix |
|---|-------------|-------|------------------|-----|
| 1 | `clean-architecture` | related_skills | `solid-principles` | Deleted in v1.0 — remove reference |
| 2 | `design-patterns` | related_skills | `solid-principles` | Deleted in v1.0 — remove reference |
| 3 | `design-patterns` | dependencies | `solid-principles` | Deleted in v1.0 — remove reference |
| 4 | `domain-driven-design` | related_skills | `solid-principles` | Deleted in v1.0 — remove reference |
| 5 | `ci-cd-pipelines` | related_skills | `vercel-deployment` | Deleted in v1.0 — replace with `deploy-to-vercel` |
| 6 | `platform-engineering` | related_skills | `vercel-deployment` | Deleted in v1.0 — replace with `deploy-to-vercel` |
| 7 | `feature-flags` | related_skills | `vercel-deployment` | Deleted in v1.0 — replace with `deploy-to-vercel` |
| 8 | `deployment-strategies` | related_skills | `vercel-deployment` | Deleted in v1.0 — replace with `deploy-to-vercel` |
| 9 | `deployment-strategies` | dependencies | `vercel-deployment` | Deleted in v1.0 — replace with `deploy-to-vercel` |
| 10 | `environment-secrets` | related_skills | `vercel-deployment` | Deleted in v1.0 — replace with `deploy-to-vercel` |
| 11 | `system-design-patterns` | related_skills | `cloud-architecture` | Does not exist — remove or replace with `scalability` |
| 12 | `system-design-patterns` | related_skills | `microservices-patterns` | Does not exist — remove |
| 13 | `distributed-tracing` | related_skills | `caching-stracing` | Typo — should be `caching-strategies` |
| 14 | `audit-logging` | related_skills | `secrets-management` | Does not exist — replace with `environment-secrets` |
| 15 | `zero-trust` | related_skills | `secrets-management` | Does not exist — replace with `environment-secrets` |

---

## Check 4: Naming Consistency

**Status: PASS**

All 112 skill directory names follow kebab-case convention (lowercase words separated by hyphens). No violations found.

Examples verified: `react-patterns`, `ai-guardrails`, `opentelemetry`, `ci-cd-pipelines`, `domain-driven-design`, `appinsights-instrumentation`, `microsoft-foundry`.

---

## Check 5: Frontmatter Completeness

**Status: FAIL — 5 skills have incomplete or non-standard frontmatter**

Standard required fields: `name`, `category`, `level`, `priority`, `version`, `author`, `license`, `tags`, `description`, `related_skills`, `related_agents`, `activation_rules`

### Frontmatter Style Comparison

| Style | Count | Fields |
|-------|-------|--------|
| **Standard v1.0** (minimal) | ~85 | name, description, category, level, priority, dependencies, related_skills, related_agents, activation_rules |
| **Standard v1.2** (full) | ~18 | name, category, level, priority, version, author, license, tags, description, related_skills, related_agents, related_commands, related_playbooks, activation_rules |
| **Non-standard** | 5 | Missing required fields |

### Skills with Non-Standard Frontmatter

| # | Skill | Missing Fields | Format |
|---|-------|----------------|--------|
| 1 | `mcp-builder` | category, level, priority, version, author, tags, related_skills, related_agents, activation_rules | Only has name, description, license |
| 2 | `deploy-to-vercel` | category, level, priority, version, author, license, tags, related_skills, related_agents, activation_rules | Uses non-standard `metadata:` block |
| 3 | `turborepo` | category, level, priority, version, author, license, tags, related_skills, related_agents, activation_rules | Uses non-standard `metadata:` block |
| 4 | `azure-diagnostics` | category, level, priority, version, author, tags, related_skills, related_agents, activation_rules | Uses non-standard `metadata:` block |
| 5 | `appinsights-instrumentation` | category, level, priority, version, author, tags, related_skills, related_agents, activation_rules | Uses non-standard `metadata:` block |
| 6 | `azure-compliance` | category, level, priority, version, author, tags, related_skills, related_agents, activation_rules | Uses non-standard `metadata:` block |
| 7 | `entra-app-registration` | category, level, priority, version, author, tags, related_skills, related_agents, activation_rules | Uses non-standard `metadata:` block |

**Recommendation:** Normalize all skills to the v1.2 frontmatter standard. The `metadata:` block format should be migrated to top-level fields.

---

## Check 6: Category Consistency

**Status: FAIL — 2 mismatches between skill frontmatter and MANIFEST.md**

| # | Skill | MANIFEST.md Category | SKILL.md Category | Verdict |
|---|-------|---------------------|-------------------|---------|
| 1 | `environment-secrets` | devops | security | **MISMATCH** |
| 2 | `wcag-checklist` | quality | accessibility | **MISMATCH** |
| 3 | `keyboard-navigation` | quality | accessibility | **MISMATCH** |

**Analysis:**
- `environment-secrets`: MANIFEST.md lists under Security section but assigns `devops` category. The skill's own frontmatter says `security`. The Security section placement is correct; the category field in MANIFEST.md table is wrong.
- `wcag-checklist` and `keyboard-navigation`: MANIFEST.md lists under Accessibility section with `quality` category, but both skills' frontmatter use `accessibility` category. The MANIFEST.md category field should be `accessibility`.

---

## Check 7: Empty Skills

**Status: PASS**

All 112 skill directories contain a `SKILL.md` file. No empty skill directories found.

---

## Check 8: Dependency Graph Integrity

**Status: FAIL — 14 agent→skill references resolve to real skills but have issues**

| # | Agent | Reference | Issue |
|---|-------|-----------|-------|
| 1 | `devops` | `monitoring-observability` | Valid skill — no issue |
| 2 | `devops` | `error-tracking` | Valid skill — no issue |
| 3 | `devops` | `structured-logging` | Valid skill — no issue |
| 4 | `devops` | `opentelemetry` | Valid skill — no issue |
| 5 | `devops` | `distributed-tracing` | Valid skill — no issue |
| 6 | `devops` | `metrics-engineering` | Valid skill — no issue |
| 7 | `devops` | `azure-diagnostics` | Valid skill — no issue |
| 8 | `devops` | `appinsights-instrumentation` | Valid skill — no issue |
| 9 | `devops` | `environment-secrets` | **Category mismatch** — listed as devops in MANIFEST but security in SKILL.md |
| 10 | `seo` | `api-documentation` | Valid — seo uses it for structured data |
| 11 | `ecommerce` | `payment-integration` | **BROKEN** — project-specific skill, not in global workspace |
| 12 | `designer` | `css-motion-design` | Valid skill |
| 13 | `designer` | `responsive-design` | Valid skill |
| 14 | `context-engineer` | `(all workspace maintenance tasks)` | Vague reference — should enumerate specific skills |

**Critical Issues:**
- `ecommerce` agent references `payment-integration (project)` — this is a project-specific skill, not wired in the global workspace. Either add it to global skills or document the dependency clearly.
- `context-engineer` has a vague catch-all reference — should be explicit.

---

## Summary of All Issues

### Critical (must fix)
1. **15 broken references** pointing to deleted/non-existent skills
2. **1 broken agent dependency** (`ecommerce` → `payment-integration`)

### High Priority
3. **10 orphan skills** with no agent wiring
4. **7 skills with non-standard frontmatter** (inconsistent format)

### Medium Priority
5. **3 category mismatches** between MANIFEST.md and skill frontmatter
6. **1 vague agent reference** (context-engineer catch-all)

### Low Priority
7. **Frontmatter style inconsistency** — v1.0 minimal vs v1.2 full format across 85+ skills

---

## Recommendations

1. **Immediate:** Fix all 15 broken `related_skills` references (replace `solid-principles` → remove, `vercel-deployment` → `deploy-to-vercel`, `secrets-management` → `environment-secrets`, `caching-stracing` → `caching-strategies`)
2. **Immediate:** Fix `ecommerce` agent dependency on `payment-integration`
3. **Short-term:** Wire 10 orphan skills to appropriate agents or document as standalone
4. **Short-term:** Normalize 7 non-standard frontmatter skills to v1.2 format
5. **Short-term:** Fix 3 category mismatches in MANIFEST.md
6. **Long-term:** Consider frontmatter migration script for 85+ v1.0 skills to v1.2 format

---

*Report generated by workspace integrity audit — 2026-07-20*
