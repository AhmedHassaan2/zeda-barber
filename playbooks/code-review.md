# Playbook: Code Review

**Purpose:** Standard procedure for conducting and responding to code reviews.

## As a Reviewer

### Setup (2 min)

1. Load reviewer agent: `@reviewer`
2. Review the PR description and linked issues
3. Understand the feature/fix context

### Review Process (15-30 min)

1. **Security pass** (always first)
   - Check for hardcoded secrets
   - Verify input validation
   - Check auth/authz

2. **Correctness pass**
   - Logic errors
   - Edge cases
   - Error handling

3. **Quality pass**
   - TypeScript strictness
   - Code organization
   - Naming conventions

4. **Performance pass**
   - Unnecessary re-renders
   - Missing memoization
   - Large bundle impact

5. **Accessibility pass**
   - Semantic HTML
   - ARIA attributes
   - Keyboard navigation

### Feedback Guidelines

**Be specific:**
```
❌ "This could be better"
✅ "Consider using useCallback here to prevent re-renders in ChildComponent"
```

**Provide code examples:**
```
❌ "Add error handling"
✅ Add try/catch:
   try {
     const data = await fetchData();
   } catch (error) {
     console.error('Failed to fetch:', error);
     setError('Failed to load data');
   }
```

**Severity calibration:**
- Critical: Security, data loss, crash → Must fix
- High: Bug, performance → Should fix
- Medium: Code smell → Consider fixing
- Low: Style → Optional

### Verdict

- **APPROVE** — No critical/high issues
- **REQUEST_CHANGES** — Critical or high issues found
- **COMMENT** — Questions or suggestions (non-blocking)

## As an Author

### Responding to Review

1. Read all comments carefully
2. Ask for clarification if unclear
3. Fix critical/high issues first
4. Respond to each comment (fixed / won't fix with reason)
5. Push fixes and re-request review

### Common Review Feedback Patterns

| Feedback | Action |
|----------|--------|
| "Add error handling" | Wrap in try/catch, handle error state |
| "Missing types" | Add TypeScript interface, remove `any` |
| "Performance concern" | Add memoization, check re-renders |
| "Accessibility issue" | Add aria-label, check keyboard nav |
| "Security issue" | Validate input, check auth |

## Post-Review

1. Merge after approval
2. Vercel auto-deploys preview
3. Verify preview works
4. Squash merge for clean history
