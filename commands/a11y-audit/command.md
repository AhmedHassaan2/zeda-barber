---
name: a11y-audit
description: Accessibility audit following WCAG 2.1 AA guidelines
allowed_tools: ["Read", "Grep", "Glob"]
agent: accessibility
---

# /a11y-audit — Accessibility Audit

Perform accessibility audit following WCAG 2.1 AA guidelines.

## Usage

```
/a11y-audit                  # Audit entire project
/a11y-audit src/components/  # Audit specific directory
```

## Audit Areas

### 1. Semantic HTML
- Proper heading hierarchy
- Landmark elements (header, nav, main, footer)
- Lists for list content
- Tables for tabular data

### 2. ARIA Implementation
- Proper ARIA roles
- ARIA labels and descriptions
- Live regions for dynamic content
- State management

### 3. Keyboard Navigation
- Tab order
- Focus management
- Focus indicators
- Keyboard traps
- Skip links

### 4. Color & Contrast
- Text contrast ratios (4.5:1 minimum)
- Color is not sole indicator
- Focus indicator visibility

### 5. Forms
- Labels for all inputs
- Error identification
- Required field indication
- Form instructions

### 6. Media
- Alt text for images
- Captions for video
- Audio descriptions
- Text alternatives

## Output Format

```
## Accessibility Audit Report

### WCAG 2.1 AA Compliance

#### Perceivable
- [PASS/FAIL] Description
- [PASS/FAIL] Description

#### Operable
- [PASS/FAIL] Description
- [PASS/FAIL] Description

#### Understandable
- [PASS/FAIL] Description
- [PASS/FAIL] Description

#### Robust
- [PASS/FAIL] Description
- [PASS/FAIL] Description

### Critical Issues
1. [file:line] Description and fix

### Recommendations
- Priority improvements
```

## Execution

1. Scan for semantic HTML usage
2. Check ARIA implementation
3. Verify keyboard navigation
4. Analyze color contrast
5. Review form accessibility
6. Check media alternatives
7. Generate accessibility report
