# Playbook: Workspace Maintenance

**Goal:** Keep the OpenCode workspace healthy, consistent, and up to date.

**Trigger:** Weekly maintenance, after bulk changes, workspace issues, onboarding.

**Inputs:**
- Maintenance type (routine, post-change, issue-fix)
- Scope (full workspace, specific area)

**Outputs:**
- Health report
- Fixed issues
- Updated manifests
- Optimization recommendations

---

## Required Agents

| Agent | Role |
|-------|------|
| `context-engineer` | Primary — workspace health, AGENTS.md |
| `reviewer` | Quality review of workspace files |
| `security` | Security audit of workspace |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `validate-workspace` | Always — full validation |
| `agent-design` | If creating/fixing agents |
| `skill-design` | If creating/fixing skills |
| `workspace-optimization` | Workspace improvements |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/health-check` | Always — workspace health |
| `/workspace-audit` | Deep audit |
| `/workspace-validate` | Validation checks |

---

## Process

### Step 1: Health Check (10 min)

1. **Run `/health-check`** — Full workspace validation
2. **Review report** — Identify issues
3. **Prioritize** — Critical first, then warnings

### Step 2: Fix Issues (varies)

1. **Duplicate components** — Remove or merge
2. **Broken references** — Fix cross-references
3. **Missing metadata** — Add required fields
4. **Weak implementations** — Strengthen to production quality
5. **Naming problems** — Fix to match conventions
6. **Empty documentation** — Fill or remove

### Step 3: Synchronize (10 min)

1. **Update MANIFEST.md** — Reflect current state
2. **Update AGENTS.md** — Manifest section
3. **Update dependency graph** — Reflect changes
4. **Verify routing** — All routes point correctly

### Step 4: Optimize (10 min)

1. **Remove unused components** — Clean orphaned files
2. **Merge overlapping skills** — Consolidate similar skills
3. **Strengthen weak skills** — Improve quality
4. **Update templates** — Keep templates current

### Step 5: Document (5 min)

1. **Update changelog** — Record changes
2. **Update version** — If significant changes
3. **Update roadmap** — If new needs identified

---

## Validation Steps

- [ ] `/health-check` passes
- [ ] No duplicate components
- [ ] All cross-references valid
- [ ] All metadata complete
- [ ] Manifests are current
- [ ] Naming conventions followed

## Success Criteria

- Workspace health check passes
- No critical issues
- Manifests are accurate
- Workspace is optimized

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Skipping regular maintenance | Issues accumulate | Run weekly |
| Not re-validating after fixes | Fixes may not work | Always re-run health check |
| Ignoring warnings | They become critical | Address promptly |
| Not updating manifests | Outdated information | Always sync manifests |
