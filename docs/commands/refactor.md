---
title: Refactoring assistance with code smell identification and improvement suggestions
description: Refactoring assistance with code smell identification and improvement suggestions
---

# `/refactor`

<div class="tip custom-block" style="padding: 1rem;">
<strong>Command:</strong> <code>/refactor</code> | <strong>Agent:</strong> <code>architect</code>
</div>

# /refactor — Refactoring Assistance

Analyze code for refactoring opportunities and provide improvement suggestions.

## Usage

```
/refactor                    # Analyze entire project
/refactor src/components/    # Analyze specific directory
/refactor src/app/page.tsx   # Analyze specific file
```

## Analysis Areas

### 1. Code Smells
- Long methods/functions
- Large classes/components
- Duplicated code
- Primitive obsession
- Deep nesting

### 2. SOLID Violations
- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

### 3. Design Patterns
- Missing patterns that could simplify code
- Over-engineered patterns
- Appropriate refactoring targets

### 4. Performance
- Unnecessary re-renders
- Missing memoization
- Inefficient algorithms

## Output Format

```
## Refactoring Report

### Critical Refactoring Needed
1. [file:line] Description
   - Current: [code smell]
   - Suggested: [improvement]

### Improvements
1. [file:line] Description
   - Pattern: [pattern name]
   - Benefit: [improvement]

### Step-by-Step Plan
1. [Action] [file] - [description]
2. [Action] [file] - [description]
```

## Process

1. Scan specified files/directories
2. Identify code smells
3. Analyze SOLID compliance
4. Check design pattern usage
5. Identify refactoring opportunities
6. Generate step-by-step refactoring plan
7. Present prioritized recommendations

## Syntax

```
/refactor [options] [arguments]
```

## Related Skills

See [Skills Registry](/skills/) for skills used during this command.

## Related Agents

See [Agents Registry](/agents/) for the agent that executes this command.
