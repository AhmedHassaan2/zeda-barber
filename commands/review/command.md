---
name: review
description: Perform comprehensive code review with security, performance, and quality analysis
allowed_tools: ["Read", "Grep", "Glob", "Bash", "Task"]
agent: plan
---

# /review — Code Review

Perform a comprehensive code review of the specified files or the entire project.

## Usage

```
/review                    # Review entire project
/review src/components/    # Review specific directory
/review src/app/page.tsx   # Review specific file
```

## Review Checklist

### 1. Security Review
- Check for hardcoded credentials
- Verify input validation
- Check authentication/authorization
- Review API endpoint protection
- Scan for XSS vulnerabilities
- Verify CORS configuration

### 2. Code Quality
- Type safety (no `any` types)
- Function complexity
- Code duplication
- Naming conventions
- File organization
- Error handling

### 3. Performance
- Bundle size impact
- Unnecessary re-renders
- Missing memoization
- Image optimization
- Code splitting opportunities

### 4. Accessibility
- Semantic HTML usage
- ARIA attributes
- Keyboard navigation
- Color contrast
- Screen reader compatibility

### 5. Best Practices
- React patterns
- Next.js conventions
- TypeScript usage
- Testing coverage
- Documentation

## Output Format

```
## Code Review Summary

### Critical Issues (Must Fix)
- [file:line] Description

### Warnings (Should Fix)
- [file:line] Description

### Suggestions (Nice to Have)
- [file:line] Description

### Positive Observations
- Good patterns found
```

## Execution

1. Read specified files or scan project
2. Run security checks
3. Analyze code quality
4. Check performance implications
5. Verify accessibility
6. Generate review report
7. Present findings with severity levels
