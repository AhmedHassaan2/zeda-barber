# Quick Start Guide

Get productive with the Ahmed Enterprise AI Workspace in 5 minutes.

## 5-Minute Setup

### Step 1: Install (1 minute)

```bash
# Clone and install
git clone https://github.com/ahmed-enterprise/ai-workspace.git ~/.config/opencode

# Verify
opencode --version
```

### Step 2: Start OpenCode (30 seconds)

```bash
opencode
```

The TUI (Terminal User Interface) opens with the workspace loaded.

### Step 3: Test Your First Agent (1 minute)

Type this in the OpenCode TUI:

```
@build What agents are available in this workspace?
```

The `@build` agent is your default entry point with access to all tools.

### Step 4: Try Another Agent (1 minute)

```
@frontend Create a responsive React hero component with Tailwind CSS
```

The `@frontend` agent specializes in React components, styling, and client-side logic.

### Step 5: Load a Skill (30 seconds)

```
/skill react-patterns
```

Skills are loaded on-demand and inject domain-specific instructions.

---

## First Agent Interactions

### Using @build (Default Agent)

The `@build` agent is your general-purpose assistant with full tool access.

```
@build Analyze this project structure and suggest improvements
@build Help me set up a new Next.js page with App Router
@build What's the best way to handle form validation in React?
```

### Using @frontend

Specializes in React components, Tailwind CSS, responsive design, and client-side logic.

```
@frontend Create a dark mode toggle component
@frontend How should I structure my Tailwind classes?
@frontend Add smooth transitions to this card component
```

### Using @backend

Specializes in API routes, server logic, and data processing.

```
@backend Create a Next.js API route for user authentication
@backend How should I structure my API endpoints?
@backend Add rate limiting to this route handler
```

### Using @database

Specializes in schema design, queries, and optimization.

```
@database Design a Supabase schema for an e-commerce platform
@database Optimize this SQL query for better performance
@database Create a migration for adding user roles
```

### Using @security

Specializes in vulnerability assessment and security best practices.

```
@security Review this API route for security issues
@security How should I handle JWT tokens securely?
@security Check this form for XSS vulnerabilities
```

---

## Loading a Skill

Skills provide specialized knowledge on-demand. Load them when you need domain expertise.

### Syntax

```
/skill <skill-name>
```

### Common Skills

```bash
# React patterns and best practices
/skill react-patterns

# Next.js App Router patterns
/skill nextjs-app-router

# Tailwind CSS utilities
/skill tailwind-css

# Database design patterns
/skill database-design

# Security audit checklist
/skill security-audit

# API design principles
/skill api-design

# Performance optimization
/skill web-performance

# WCAG accessibility checklist
/skill wcag-checklist
```

### Skill Discovery

Skills are loaded automatically when tasks match their descriptions. You can also manually load them:

```
Load the form-engineering skill to help with this form
```

---

## Running a Command

Commands are slash commands for common workflows.

### Code Review

```
/review
```

Runs a comprehensive code review focusing on quality, patterns, and maintainability.

### Security Scan

```
/security-scan
```

Scans your codebase for security vulnerabilities and common issues.

### Performance Check

```
/performance-check
```

Analyzes your code for performance bottlenecks and optimization opportunities.

### Accessibility Audit

```
/a11y-audit
```

Checks your components for WCAG compliance and accessibility issues.

### SEO Check

```
/seo-check
```

Reviews meta tags, structured data, and SEO best practices.

---

## Creating a Component

### Using /new-component

```
/new-component Button
```

This generates a React component following workspace conventions:

```
src/components/Button.tsx
```

### Using /new-page

```
/new-page about
```

This creates a Next.js App Router page:

```
src/app/about/page.tsx
```

### Using /new-api

```
/new-api users
```

This creates a Next.js API route:

```
src/app/api/users/route.ts
```

---

## Practical Example: Building a Feature

Let's build a complete feature step by step.

### 1. Plan the Feature

```
@plan I need a user dashboard with:
- User profile display
- Activity feed
- Settings form
- Responsive layout
```

### 2. Design the Database

```
@database Design a Supabase schema for:
- User profiles
- Activity feed entries
- User settings
```

### 3. Build the API

```
@backend Create API routes for:
- GET /api/user/profile
- GET /api/user/activity
- PUT /api/user/settings
```

### 4. Build the Frontend

```
@frontend Create a dashboard page with:
- ProfileCard component
- ActivityFeed component
- SettingsForm component
- Responsive grid layout
```

### 5. Add Security

```
@security Review the dashboard for:
- Authentication checks
- Input validation
- Data exposure risks
```

### 6. Add Accessibility

```
@a11y Audit the dashboard for:
- ARIA labels
- Keyboard navigation
- Screen reader compatibility
```

### 7. Review Everything

```
/review
```

### 8. Check Performance

```
/performance-check
```

---

## Next Steps

Now that you're set up, explore deeper:

### Learn the Architecture

- [Architecture Overview](/architecture) — 8-layer model
- [Agent System](/architecture#agent-system) — How agents work
- [Skill System](/architecture#skill-system) — Dependency graph

### Go Deeper

- [Workspace Overview](/workspace-overview) — What's inside
- [Glossary](/glossary) — All terms defined
- [FAQ](/faq) — Common questions

### Useful Commands Reference

| Command | Description |
|---------|-------------|
| `/review` | Run code review |
| `/security-scan` | Scan for vulnerabilities |
| `/performance-check` | Check performance |
| `/a11y-audit` | Accessibility audit |
| `/seo-check` | SEO review |
| `/new-component` | Create a React component |
| `/new-page` | Create a Next.js page |
| `/new-api` | Create an API route |
| `/refactor` | Get refactoring suggestions |
| `/deploy-check` | Check deployment readiness |
| `/generate-docs` | Generate documentation |
| `/health-check` | Run workspace health check |
| `/self-improve` | Analyze and optimize workspace |

### Agent Reference

| Agent | Domain |
|-------|--------|
| `@build` | Default, full tool access |
| `@plan` | Analysis and planning |
| `@frontend` | React, Tailwind, client-side |
| `@backend` | API routes, server logic |
| `@database` | Schema, queries, migrations |
| `@security` | Vulnerability assessment |
| `@reviewer` | Code quality review |
| `@tester` | Test creation and strategy |
| `@performance` | Optimization and Core Web Vitals |
| `@accessibility` | WCAG compliance |
| `@seo` | Meta tags, structured data |
| `@devops` | CI/CD, deployment |
| `@architect` | System design, refactoring |
| `@i18n` | Translation, RTL, locales |
| `@ecommerce` | Products, carts, checkout |
| `@ai-engineer` | LLM, RAG, prompts |
| `@cloud` | Cloud architecture |
| `@designer` | Design systems, tokens |
