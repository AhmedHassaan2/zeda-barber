---
title: Deployment readiness check including build, environment, and configuration verification
description: Deployment readiness check including build, environment, and configuration verification
---

# `/deploy-check`

<div class="tip custom-block" style="padding: 1rem;">
<strong>Command:</strong> <code>/deploy-check</code> | <strong>Agent:</strong> <code>devops</code>
</div>

# /deploy-check — Deployment Readiness

Verify deployment readiness including build, environment, and configuration.

## Usage

```
/deploy-check                 # Full deployment check
/deploy-check --prod          # Production-specific checks
```

## Check Areas

### 1. Build Verification
- TypeScript compilation
- Linting passes
- Build succeeds
- No warnings

### 2. Environment Variables
- Required variables defined
- No secrets in code
- Proper variable naming
- .env.example updated

### 3. Configuration
- next.config.ts correct
- Vercel configuration
- Domain settings
- Redirects and rewrites

### 4. Security
- No hardcoded credentials
- Security headers configured
- CORS properly set
- Rate limiting implemented

### 5. Performance
- Bundle size acceptable
- Images optimized
- Caching configured
- CDN enabled

### 6. Monitoring
- Error tracking configured
- Analytics enabled
- Health checks implemented

## Output Format

```
## Deployment Readiness Report

### Status: [READY / NOT READY]

### Build
- [PASS/FAIL] TypeScript compilation
- [PASS/FAIL] Linting
- [PASS/FAIL] Build

### Environment
- [PASS/FAIL] Variables defined
- [PASS/FAIL] No secrets in code

### Configuration
- [PASS/FAIL] next.config.ts
- [PASS/FAIL] Vercel config

### Issues
1. [Critical] Description and fix

### Recommendations
- Pre-deployment actions
```

## Process

1. Run build checks
2. Verify environment variables
3. Check configuration files
4. Run security scan
5. Check performance metrics
6. Verify monitoring setup
7. Generate deployment report

## Syntax

```
/deploy-check [options] [arguments]
```

## Related Skills

See [Skills Registry](/skills/) for skills used during this command.

## Related Agents

See [Agents Registry](/agents/) for the agent that executes this command.
