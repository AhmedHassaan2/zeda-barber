# Playbook: Deployment

**Goal:** Configure and execute deployment to production infrastructure.

**Trigger:** First deployment, infrastructure change, deployment configuration, migration.

**Inputs:**
- Deployment target (Vercel, Docker, VPS)
- Environment requirements
- Domain configuration
- SSL/HTTPS needs

**Outputs:**
- Deployment configuration
- Environment setup
- Domain and SSL configuration
- Monitoring setup

---

## Required Agents

| Agent | Role |
|-------|------|
| `devops` | Primary — deployment, CI/CD, infrastructure |
| `cloud` | Cloud services, serverless config |
| `security` | SSL, headers, env vars |
| `performance` | CDN, caching, edge config |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `vercel-deployment` | Vercel deployment |
| `docker-patterns` | Docker containerization |
| `ci-cd-pipelines` | CI/CD pipeline setup |
| `cloudflare-workers` | Edge deployment |
| `serverless-patterns` | Serverless architecture |
| `environment-secrets` | Env var management |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/deploy-check` | Deployment readiness |
| `/security-scan` | Pre-deployment security |

---

## Process

### Step 1: Configure (15 min)

1. **Set up deployment platform** — Vercel, Docker, etc.
2. **Configure environment variables** — All secrets and config
3. **Set up domains** — Custom domain configuration
4. **Enable HTTPS** — SSL certificate
5. **Configure headers** — Security headers

### Step 2: CI/CD Setup (15 min)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test
```

### Step 3: Environment Setup (10 min)

1. **Production env vars** — Set on platform
2. **Database connection** — Supabase production
3. **API keys** — All external services
4. **Secrets rotation** — Regular key rotation plan

### Step 4: Deploy (10 min)

1. **Deploy to staging** — Test first
2. **Verify staging** — All features work
3. **Deploy to production** — After approval
4. **Verify production** — Smoke test

### Step 5: Post-Deploy (10 min)

1. **Monitor errors** — Check error tracking
2. **Check performance** — Core Web Vitals
3. **Verify monitoring** — Alerts working
4. **Document** — Update deployment docs

---

## Validation Steps

- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CI/CD pipeline works
- [ ] Staging tested
- [ ] Production smoke tested
- [ ] Monitoring active
- [ ] Rollback plan ready

## Success Criteria

- Application deployed successfully
- All features work in production
- HTTPS and security headers active
- Monitoring and alerts configured
- Rollback plan documented

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Missing env vars | App crashes on deploy | Verify all vars set |
| No HTTPS | Security risk | Always use HTTPS |
| No security headers | Vulnerable to attacks | Add CSP, HSTS, etc. |
| Skipping staging | Catches issues in prod | Test on staging first |
| No monitoring | Miss production issues | Set up error tracking |
| No rollback plan | Stuck if broken | Always plan rollback |
