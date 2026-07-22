---
title: Docker containerization, multi-stage builds, development containers, and deployment patterns
description: Docker containerization, multi-stage builds, development containers, and deployment patterns
---

# Docker containerization, multi-stage builds, development containers, and deployment patterns

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>docker-patterns</code> | <strong>Category:</strong> devops | <strong>Priority:</strong> medium | <strong>Level:</strong> framework
</div>

# Docker Patterns

## Purpose

Guide Docker containerization for development and production.

## When to Use

- Containerizing applications
- Setting up development environments
- Configuring multi-service development
- Optimizing Docker images

## Core Concepts

### Multi-Stage Build

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:alpine

volumes:
  postgres_data:
```

## Best Practices

- Use multi-stage builds for smaller images
- Use alpine base images
- Order Dockerfile commands by frequency of change
- Use .dockerignore
- Don't run as root in production
- Use health checks
- Tag images properly

## Anti-Patterns

- Using latest tag
- Running as root
- Including unnecessary files
- Not using multi-stage builds
- Hardcoding secrets in Dockerfile
- Not using .dockerignore

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
