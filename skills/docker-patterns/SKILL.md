---
name: docker-patterns
description: Docker containerization, multi-stage builds, development containers, and deployment patterns
category: devops
level: framework
priority: medium
dependencies: []
related_skills: ["ci-cd-pipelines", "infrastructure-as-code"]
related_agents: ["devops"]
activation_rules:
  - keywords: ["Docker", "container", "image", "Dockerfile", "docker-compose"]
  - file_pattern: "Dockerfile*"
  - file_pattern: "docker-compose*"
---

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
