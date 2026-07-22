---
title: Full-Stack Feature Development
description: Build a complete feature using multiple agents
---

# Full-Stack Feature Development

## Scenario

Build a user dashboard with authentication, data fetching, and responsive UI.

## Step 1: Architecture Planning

```
@architect Design a dashboard feature with user authentication, data visualization, and responsive layout using Next.js App Router and Supabase
```

The architect agent will provide:
- Component hierarchy
- API routes needed
- Database schema changes
- Security considerations

## Step 2: Database Schema

```
@database Create a Supabase schema for a dashboard with users, dashboard_widgets, and dashboard_settings tables
```

## Step 3: API Development

```
@backend Create API routes for dashboard CRUD operations with authentication middleware
```

## Step 4: Frontend Development

```
@frontend Build the dashboard page with Next.js App Router, including widget components with Tailwind CSS
```

## Step 5: Security Review

```
@security Review the dashboard implementation for authentication, authorization, and data exposure risks
```

## Step 6: Testing

```
@tester Write unit tests for dashboard components and API routes
```

## Step 7: Performance Check

```
@performance Analyze the dashboard for bundle size, rendering performance, and data loading optimization
```

## Step 8: Full Review

```bash
/review
/security-scan
/performance-check
/a11y-audit
```

::: info
This workflow demonstrates the power of domain-specific agents working together on a complex feature.
:::
