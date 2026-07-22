# Playbook: Production Release

**Goal:** Safely deploy changes to production with rollback capability.

**Trigger:** Feature complete, bug fixed, ready to ship.

**Inputs:**
- Changes to deploy (feature branch or commits)
- Release type (feature, patch, hotfix)
- Risk level (low, medium, high)
- Deployment platform (Vercel, custom)

**Outputs:**
- Deployed production build
- Release verification
- Rollback plan (if needed)
- Release notes

---

## Required Agents

| Agent | Role |
|-------|------|
| `devops` | Deployment orchestration, CI/CD |
| `security` | Pre-deployment security check |
| `performance` | Pre-deployment performance check |
| `reviewer` | Final code review |
| `build` | Build verification, deployment execution |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `vercel-deployment` | Vercel-specific deployment |
| `ci-cd-pipelines` | CI/CD workflow |
| `docker-patterns` | Docker deployment |
| `security-audit` | Pre-deployment security |
| `web-performance` | Pre-deployment performance |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/security-scan` | Always — pre-deployment security |
| `/performance-check` | Always — pre-deployment performance |
| `/deploy-check` | Deployment readiness verification |
| `/review` | Final code review |

---

## Process

### Step 1: Pre-Deployment Checks (15 min)

1. **Code review** — `/review` on all changes
2. **Security scan** — `/security-scan` for vulnerabilities
3. **Performance check** — `/performance-check` for regressions
4. **Build verification** — `npm run build` passes
5. **Test verification** — All tests pass
6. **Lint verification** — No lint errors

### Step 2: Staging Verification (10 min)

1. **Preview deployment** — Vercel auto-deploys preview
2. **Test preview** — Verify functionality
3. **Check performance** — Lighthouse on preview
4. **Check security** — Auth flows, API endpoints
5. **Cross-browser test** — Major browsers

### Step 3: Deploy (10 min)

1. **Merge to main** — After approval
2. **Monitor build** — Watch CI/CD pipeline
3. **Verify deployment** — Check production URL
4. **Smoke test** — Critical paths work

```bash
# Vercel deployment
git push origin main  # Auto-deploys

# Manual deployment
npx vercel --prod

# Rollback (if needed)
npx vercel rollback
```

### Step 4: Post-Deployment Verification (10 min)

1. **Smoke test** — Core functionality
2. **Performance check** — Production metrics
3. **Error monitoring** — Check for new errors
4. **Analytics** — Verify tracking works
5. **User feedback** — Monitor for issues

### Step 5: Release (5 min)

1. **Tag release** — `git tag v1.0.0`
2. **Write release notes** — What changed, why
3. **Update CHANGELOG.md**
4. **Notify stakeholders**

---

## Validation Steps

- [ ] All pre-deployment checks pass
- [ ] Staging verification complete
- [ ] Build succeeds in production
- [ ] Production smoke test passes
- [ ] No new errors in monitoring
- [ ] Rollback plan documented
- [ ] Release notes written

## Success Criteria

- Changes deployed successfully
- No production incidents
- Rollback plan exists (even if not needed)
- Release is documented

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Skipping pre-deployment checks | Ships bugs to production | Always run full check suite |
| Deploying on Friday | No time to fix if broken | Deploy early in week |
| No rollback plan | Stuck if something breaks | Always have rollback ready |
| Deploying without staging test | Catches issues in production | Test on staging first |
| Big-bang deployment | Hard to isolate issues | Deploy in small batches |
| Not monitoring after deploy | Miss production issues | Monitor for 30+ minutes |
| Deploying without review | Misses code quality issues | Always review before merge |
