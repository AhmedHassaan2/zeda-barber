---
title: Vercel deployment configuration, environment variables, domains, and optimization
description: Vercel deployment configuration, environment variables, domains, and optimization
---

# Vercel deployment configuration, environment variables, domains, and optimization

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>vercel-deployment</code> | <strong>Category:</strong> devops | <strong>Priority:</strong> high | <strong>Level:</strong> framework
</div>

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

## When to Use

- File patterns match the skill's activation rules
- Keywords in the conversation match the skill's domain
- A related agent delegates to this skill

## When NOT to Use

- When the task falls outside this skill's domain
- When a more specific skill exists for the task
- When the skill's dependencies are not met

## Related Agents

See [Agents Registry](/agents/) for agents that use this skill.

## Related Skills

See [Skills Registry](/skills/) for related skills in the same cluster.

## Customization Guide

1. Copy the skill to `.opencode/skills/` in your project
2. Modify the activation rules to match your project patterns
3. Add project-specific examples and templates
4. Update the related agents and skills references

## Extension Guide

1. Add new sections to the SKILL.md file
2. Include code examples for new patterns
3. Update anti-patterns with new findings
4. Maintain cross-references to related skills
5. Keep the skill focused on its core purpose
