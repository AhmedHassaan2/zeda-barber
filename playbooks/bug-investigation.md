# Playbook: Bug Investigation

**Goal:** Systematically identify, diagnose, and resolve bugs with root cause analysis.

**Trigger:** User reports a bug, error, or unexpected behavior.

**Inputs:**
- Bug description or error message
- Steps to reproduce (if known)
- Affected area (frontend, backend, database, API)
- Environment (development, staging, production)

**Outputs:**
- Root cause analysis
- Fix implementation
- Prevention recommendation
- Updated test coverage (if applicable)

---

## Required Agents

| Agent | Role |
|-------|------|
| `build` | Primary investigator, code search, fix implementation |
| `frontend` | UI-related bugs, rendering issues, client-side logic |
| `backend` | API bugs, server logic, data processing |
| `database` | Query issues, schema problems, migration bugs |
| `security` | Security-related bugs, auth issues |
| `reviewer` | Verify fix doesn't introduce regressions |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `debugging-workflow` | Always — systematic debugging methodology |
| `react-patterns` | Frontend bugs involving React |
| `nextjs-app-router` | Next.js routing or rendering bugs |
| `supabase-patterns` | Database query bugs |
| `api-design` | API endpoint bugs |
| `error-handling` | Error boundary or catch block issues |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/review` | After fix — verify no regressions |
| `/security-scan` | If bug involves auth or data access |

---

## Process

### Step 1: Reproduce (5 min)

1. Clarify the exact steps to reproduce
2. Identify the environment
3. Confirm the bug is reproducible
4. Capture the exact error message or behavior

```
Ask the user:
- What did you expect to happen?
- What actually happened?
- Can you provide the exact error message?
- What browser/device/environment?
```

### Step 2: Isolate (10 min)

1. **Narrow the scope** — Frontend? Backend? Database? Network?
2. **Check recent changes** — `git log --oneline -10` for recent commits
3. **Search for error** — Grep for error message in codebase
4. **Check logs** — Server logs, browser console, network tab
5. **Map the flow** — Trace the request from trigger to result

```bash
# Useful commands
git log --oneline -10          # Recent changes
git diff HEAD~1                # Last commit changes
git blame <file>               # Who wrote this code
```

### Step 3: Diagnose (15 min)

1. **Form hypotheses** — What could cause this behavior?
2. **Test hypotheses** — Add console.log, check data, verify assumptions
3. **Identify root cause** — Not just the symptom, but the underlying issue
4. **Document findings** — Write down what you found

Common root causes:
- **Null/undefined** — Missing data, async timing, optional chaining
- **State mutation** — Direct state modification in React
- **Race condition** — Async operations completing out of order
- **Stale closure** — Variable captured by closure is outdated
- **Missing validation** — Input not validated at boundary
- **Incorrect query** — Wrong filter, missing join, N+1 query
- **Cache issue** — Stale cache, missing invalidation
- **Environment mismatch** — Dev vs prod configuration difference

### Step 4: Fix (15 min)

1. **Implement the fix** — Address root cause, not just symptom
2. **Check for similar issues** — Same pattern elsewhere?
3. **Add defensive code** — Prevent recurrence
4. **Update types** — If bug was type-related
5. **Add error handling** — If bug was unhandled case

### Step 5: Verify (10 min)

1. **Test the fix** — Confirm bug is resolved
2. **Test related functionality** — No regressions
3. **Build check** — `npm run build` passes
4. **Run `/review`** — Get a quality review

### Step 6: Prevent (5 min)

1. **Add test case** — Prevent regression
2. **Update documentation** — If this was a common pitfall
3. **Consider linting rule** — If applicable
4. **Document in project AGENTS.md** — If this reveals a pattern

---

## Validation Steps

- [ ] Bug is reproducible before fix
- [ ] Root cause is identified (not just symptom)
- [ ] Fix addresses root cause
- [ ] Fix doesn't break other functionality
- [ ] Build passes after fix
- [ ] Related code paths are checked for similar issues
- [ ] Error handling is improved (if applicable)

## Success Criteria

- Bug is resolved
- Root cause is documented
- No regressions introduced
- Prevention measures are in place
- Code quality is maintained or improved

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Fixing the symptom | Bug recurs in different scenario | Find and fix root cause |
| Over-engineering the fix | Adds unnecessary complexity | Minimal, targeted fix |
| Not checking similar code | Same bug exists elsewhere | Search for similar patterns |
| Skipping build check | Fix introduces compile errors | Always run `npm run build` |
| Not testing edge cases | Bug recurs with different input | Test boundary conditions |
| Rushing to fix without understanding | Wrong fix or missed root cause | Take time to diagnose first |
| Adding try/catch everywhere | Swallows errors silently | Handle errors at proper boundaries |
