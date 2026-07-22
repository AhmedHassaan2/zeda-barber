---
title: Docker
description: Docker reference documentation
---

# Docker

# Docker Knowledge Document

## Purpose

Docker enables consistent, reproducible environments by packaging applications and their dependencies into lightweight, portable containers. It eliminates "it works on my machine" problems and provides the foundation for modern CI/CD pipelines, microservices, and local development environments. Docker proficiency is essential for deploying, scaling, and debugging production applications.

## Core Concepts

### Images and Containers

An **image** is a read-only template with instructions for creating a container. A **container** is a running instance of an image. Images are built in layers, each representing a filesystem change. Layers are cached and reused across builds.

### Dockerfile

A Dockerfile defines the steps to build an image. Each instruction (`FROM`, `RUN`, `COPY`, `CMD`) creates a new layer. The order of instructions affects build cache efficiency and image size.

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### Docker Compose

Docker Compose defines multi-container applications using a YAML file. It manages networking, volumes, environment variables, and service dependencies. Compose v2 integrates directly with Docker CLI (`docker compose` up).

### Volumes

Volumes persist data beyond container lifecycle. Bind mounts map host directories to container paths (useful for development). Named volumes are managed by Docker and are portable across hosts.

### Networking

Docker creates virtual networks for container communication. The default bridge network allows containers to communicate by name. Host networking removes network isolation (useful for performance-sensitive applications).

## Best Practices

1. **Use multi-stage builds** — Separate build dependencies from runtime. Build in a full image, copy artifacts to a minimal alpine/distroless image. This can reduce image size by 80-90%.

2. **Order Dockerfile instructions by change frequency** — Put rarely-changing instructions (base image, system dependencies) first. Put frequently-changing instructions (code copy) last. This maximizes cache hits.

3. **Use `.dockerignore` aggressively** — Exclude `node_modules`, `.git`, `.env`, `dist`, test files, and documentation. Smaller build context = faster builds.

4. **Never run as root** — Create a non-root user and switch to it before `CMD`. This prevents container escape vulnerabilities and follows security best practices.

5. **Pin base image versions** — Use `node:20.11-alpine`, not `node:latest` or `node:20`. Patch versions may introduce breaking changes or security issues.

6. **Use `docker compose` for local development** — Define all services (app, database, cache) in `docker-compose.yml`. Use `depends_on` with health checks for proper startup ordering.

7. **Implement health checks** — Add `HEALTHCHECK` instructions to Dockerfiles. This enables Docker and orchestrators to detect and restart unhealthy containers automatically.

8. **Minimize layer count and size** — Combine related `RUN` commands with `&&`. Clean up caches in the same layer (`apt-get clean && rm -rf /var/lib/apt/lists/*`).

## Anti-Patterns

1. **Copying the entire filesystem without context** — `COPY . .` copies everything. Use `.dockerignore` and be explicit with `COPY src/ ./src/` when possible.

2. **Running `apt-get upgrade` in images** — This breaks reproducibility. Pin package versions or use a base image that already includes updates.

3. **Using `latest` tag in production** — The `latest` tag is unpredictable. Always pin to specific versions for reproducible builds.

4. **Storing secrets in Docker images** — Never `COPY .env` or hardcode credentials. Use runtime environment variables, Docker secrets, or a secrets manager.

5. **Using `docker exec` for debugging in production** — Prefer logging, monitoring, and health checks. `exec` indicates a monitoring gap.

6. **Building images on production servers** — Build in CI/CD and pull pre-built images. Production servers should only run containers, not build them.

7. **Ignoring container logs** — Containers generate logs. Configure log rotation (`--log-opt max-size=10m --log-opt max-file=3`) to prevent disk exhaustion.

## Common Mistakes

1. **Not cleaning up after `apt-get install`** — Every `RUN` creates a layer. Un-cleaned caches persist in the image. Chain commands: `RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*`.

2. **Using `CMD` with shell form** — Use exec form: `CMD ["node", "server.js"]`. Shell form wraps in `/bin/sh -c`, which prevents signal forwarding and PID 1 reaping.

3. **Forgetting `EXPOSE` documentation** — `EXPOSE` doesn't publish ports; it documents which ports the container uses. Still important for clarity and tooling.

4. **Not using `.env` files with compose** — Store non-sensitive configuration in `.env` files and reference with `env_file:` in compose. Keep secrets in a secrets manager.

5. **Mounting `node_modules` in development** — Bind-mounting `node_modules` overwrites container's installed packages. Use named volumes for `node_modules` instead.

6. **Ignoring image size** — Large images pull slowly and have larger attack surfaces. Use `alpine` or `distroless` base images. Check with `docker image ls` and `dive` tool.

7. **Not using `docker system prune` regularly** — Dangling images, stopped containers, and unused networks accumulate. Run `docker system prune -a` periodically.

## Decision Guidelines

- **Use Docker when:** You need consistent environments across development, staging, and production. When deploying to Kubernetes, ECS, or any container orchestrator.
- **Use Docker Compose when:** You have multi-service local development (app + database + cache + worker). It simplifies service orchestration.
- **Use multi-stage builds when:** Your build process has heavy dependencies (compilers, build tools) that aren't needed at runtime.
- **Use Docker in CI/CD when:** You need reproducible build environments, isolated test databases, or consistent deployment artifacts.

## References

- Docker Official Docs: https://docs.docker.com
- Dockerfile Best Practices: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
- Docker Compose: https://docs.docker.com/compose/
- Dive (image inspector): https://github.com/wagoodman/dive
- Hadolint (Dockerfile linter): https://github.com/hadolint/hadolint

## Practical Notes

- Use `docker compose -f docker-compose.dev.yml up` for development with hot-reload.
- `docker compose logs -f service_name` follows logs for a specific service.
- `docker volume ls` lists volumes; `docker volume inspect vol_name` shows mount paths.
- For Next.js, mount the entire project directory for development but use multi-stage build for production.
- `docker buildx build --platform linux/amd64,linux/arm64 -t image:tag .` builds multi-architecture images.
- Use `docker scan image:tag` (or `docker scout`) to check images for known vulnerabilities.

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
