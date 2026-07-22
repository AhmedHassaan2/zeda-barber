---
name: vercel-deployment
description: Vercel deployment configuration, environment variables, domains, and optimization
category: devops
level: framework
priority: high
dependencies: []
related_skills: ["ci-cd-pipelines", "environment-management"]
related_agents: ["devops"]
activation_rules:
  - keywords: ["Vercel", "deploy", "production", "preview", "domain"]
  - file_pattern: "vercel.json"
---

# Vercel Deployment

## Purpose

Guide Vercel deployment configuration and optimization.

## When to Use

- Setting up Vercel projects
- Configuring environment variables
- Setting up custom domains
- Optimizing builds

## Core Concepts

### Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key"
  }
}
```

### Environment Variables

```bash
# Production
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Preview (auto-inherits from production or set separately)
# Development (local .env.local)
```

### Custom Domains

```bash
# Add domain
vercel domains add example.com

# Configure DNS
# A Record: 76.76.21.21
# CNAME: cname.vercel-dns.com
```

### Build Optimization

```bash
# Analyze build
VERCEL_ANALYZE=true next build

# Cache node_modules
# Use Vercel's built-in caching
```

## Best Practices

- Use Vercel's preview deployments for PRs
- Set environment variables per environment
- Use Vercel's edge functions for middleware
- Enable Vercel Analytics for performance monitoring
- Use Vercel's image optimization
- Set up monitoring and alerts

## Anti-Patterns

- Committing secrets to repo
- Not setting production environment variables
- Ignoring build failures
- Not testing preview deployments
- Using outdated Node.js versions
