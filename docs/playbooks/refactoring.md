---
title: Refactoring Playbook
description: Engineering playbook for refactoring workflow
---

# Refactoring Playbook

# Playbook: Refactoring

**Goal:** Improve code structure, readability, and maintainability without changing behavior.

**Trigger:** Code is working but needs improvement — duplication, complexity, poor naming, wrong pattern.

**Inputs:**
- Files or modules to refactor
- Refactoring goal (readability, performance, pattern change, extraction)
- Constraints (must not break API, must maintain compatibility)

**Outputs:**
- Refactored code with same behavior
- Updated tests (if applicable)
- Documentation of changes
- Pattern established for future code

----|------|
| `architect` | Strategy — what to refactor and how |
| `build` | Implementation — execute the refactoring |
| `reviewer` | Verify behavior is preserved |
| `frontend` | UI component refactoring |
| `backend` | Server logic refactoring |
| `database` | Schema or query refactoring |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `refactoring-patterns` | Always — refactoring strategies and patterns |
| `clean-architecture` | Structural refactoring |
| `react-patterns` | React component refactoring |
| `nextjs-app-router` | Next.js-specific refactoring |
| `typescript-patterns` | Type system improvements |
| `state-management` | State architecture refactoring |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/review` | Before and after refactoring |
| `/performance-check` | Ensure refactoring doesn't hurt performance |

---

## Process

### Step 1: Assess (10 min)

1. **Read the code** — Understand what it does currently
2. **Identify problems** — Duplication, complexity, wrong pattern
3. **Map dependencies** — What depends on this code?
4. **Check tests** — Are there existing tests?
5. **Plan approach** — Which refactoring pattern applies?

Common refactoring patterns:
- **Extract Function** — Break long function into smaller ones
- **Extract Component** — Break large component into smaller ones
- **Rename** — Improve naming for clarity
- **Move** — Relocate code to correct module
- **Inline** — Remove unnecessary abstraction
- **Replace with Pattern** — Apply established design pattern
- **Simplify Conditionals** — Reduce nesting, use early returns
- **Type Narrowing** — Add explicit types, remove `any`

### Step 2: Plan (5 min)

1. **Define the target state** — What should the code look like?
2. **Order operations** — What to change first?
3. **Identify risks** — What could break?
4. **Set checkpoints** — Verify at each step

### Step 3: Execute (varies)

1. **Make one change at a time**
2. **Verify after each change** — Build passes, behavior same
3. **Commit frequently** — Small, reversible commits
4. **Follow existing patterns** — Don't introduce new conventions mid-refactor

### Step 4: Verify (10 min)

1. **Run `/review`** — Verify quality improvement
2. **Run build** — `npm run build` passes
3. **Test behavior** — Same input, same output
4. **Check performance** — No regression
5. **Verify types** — No new `any` types

### Step 5: Document (5 min)

1. **Update comments** — If logic is non-obvious
2. **Update project AGENTS.md** — If new pattern established
3. **Commit with clear message** — `refactor(scope): description`

---

## Validation Steps

- [ ] Code behavior is identical before and after
- [ ] Build passes
- [ ] No performance regression
- [ ] Code is simpler or clearer than before
- [ ] No new `any` types introduced
- [ ] Existing tests still pass (if applicable)
- [ ] Related code is checked for similar improvements

## Success Criteria

- Code is cleaner, simpler, or more maintainable
- Behavior is preserved
- No regressions introduced
- Pattern is documented for future use

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Refactoring + feature in one commit | Hard to review and revert | Separate refactoring from feature |
| Changing behavior during refactor | Introduces bugs | Only change structure, not behavior |
| Over-refactoring | Adds unnecessary abstraction | Refactor to "good enough" |
| Not testing after each step | Accumulated errors | Verify continuously |
| Ignoring dependent code | Breaks callers | Check all dependents |
| Refactoring without understanding | Makes code worse | Understand before changing |
| Big-bang refactoring | High risk, hard to review | Small, incremental changes |

## Related Commands

See [Commands Registry](/commands/) for commands used in this playbook.

## Related Agents

See [Agents Registry](/agents/) for agents involved in this playbook.
