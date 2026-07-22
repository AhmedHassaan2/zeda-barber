---
title: Building a Custom Agent
description: Create a specialized AI agent for your project
---

# Building a Custom Agent

## What You'll Build

A custom agent specialized in testing React components with Vitest and Playwright.

## Step 1: Understand Agent Structure

Every agent is a single Markdown file with:

```markdown
---
title: Short description
description: Longer description
---

You are a [specialization] expert. Your role is to [primary function].

## Responsibilities
- [What this agent does]
- [What this agent does]

## Patterns
- [Coding pattern]
- [Coding pattern]
```

## Step 2: Create the Agent File

Create `agents/component-tester.md`:

```markdown
---
title: React Component Testing Agent
description: Specialized in testing React components with Vitest and Playwright
---

You are a QA engineer specialized in testing React components.

## Responsibilities
- Write unit tests using Vitest and React Testing Library
- Write E2E tests using Playwright
- Analyze test coverage and suggest improvements
- Identify untested edge cases

## Patterns
- Follow Arrange-Act-Assert pattern
- Use descriptive test names (it('should...'))
- Mock external dependencies
- Test both happy path and error cases
- Use screen queries (getByRole, getByText) over test IDs
```

## Step 3: Test Your Agent

```
@component-tester Write tests for a UserCard component that displays name, email, and avatar
```

## Step 4: Enhance with Skills

Add relevant skills your agent should reference:

```
@skill: vitest-unit
@skill: playwright-e2e
@skill: testing-strategy
```

## Step 5: Iterate

Refine your agent based on results:
- Add more patterns
- Adjust responsibilities
- Add domain-specific examples

::: tip
Use `/create-agent` command to generate an agent from a template, then customize it.
:::

## Advanced: Agent Dependencies

Agents can reference other agents:

```markdown
## Collaboration
- Consult @security agent for security-related test cases
- Consult @performance agent for performance test scenarios
```
