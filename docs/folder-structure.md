# Folder Structure

This page documents the complete directory structure of the Ahmed Enterprise AI Workspace.

## Global Workspace Structure

The workspace installs to `~/.config/opencode/`:

```
~/.config/opencode/
│
├── AGENTS.md                          # Root configuration and manifest
├── MANIFEST.md                        # Component manifest
├── DECISIONS.md                       # Architecture decisions
├── DEPENDENCIES.md                    # Component dependency graph
│
├── agents/                            # 19 global agents
│   ├── build.md                       # Default agent, full tool access
│   ├── plan.md                        # Analysis and planning
│   ├── frontend.md                    # React, Tailwind, client-side
│   ├── backend.md                     # API routes, server logic
│   ├── database.md                    # Schema, queries, migrations
│   ├── api-designer.md                # API contracts, REST design
│   ├── architect.md                   # System design, refactoring
│   ├── reviewer.md                    # Code quality review
│   ├── security.md                    # Vulnerability assessment
│   ├── tester.md                      # Test creation, strategy
│   ├── accessibility.md               # WCAG audit, ARIA review
│   ├── performance.md                 # Bundle analysis, caching
│   ├── devops.md                      # CI/CD, deployment
│   ├── cloud.md                       # Cloud architecture
│   ├── seo.md                         # Meta tags, structured data
│   ├── i18n.md                        # Translation, RTL, locales
│   ├── ecommerce.md                   # Products, carts, checkout
│   ├── ai-engineer.md                 # LLM, RAG, prompts
│   ├── context-engineer.md            # Workspace optimization
│   └── designer.md                    # Design systems, tokens
│
├── skills/                            # 67 global skills (16 categories)
│   ├── react-patterns/                # React patterns and best practices
│   │   └── SKILL.md
│   ├── nextjs-app-router/             # Next.js App Router patterns
│   │   └── SKILL.md
│   ├── tailwind-css/                  # Tailwind CSS utilities
│   │   └── SKILL.md
│   ├── responsive-design/             # Responsive design patterns
│   │   └── SKILL.md
│   ├── form-engineering/              # Form handling and validation
│   │   └── SKILL.md
│   ├── state-management/              # React state management
│   │   └── SKILL.md
│   ├── css-motion-design/             # CSS animations and transitions
│   │   └── SKILL.md
│   ├── api-design/                    # API design principles
│   │   └── SKILL.md
│   ├── nextjs-route-handlers/         # Next.js API route patterns
│   │   └── SKILL.md
│   ├── background-jobs/               # Background job processing
│   │   └── SKILL.md
│   ├── database-design/               # Database schema design
│   │   └── SKILL.md
│   ├── supabase-patterns/             # Supabase-specific patterns
│   │   └── SKILL.md
│   ├── prisma-patterns/               # Prisma ORM patterns
│   │   └── SKILL.md
│   ├── security-audit/                # Security audit checklist
│   │   └── SKILL.md
│   ├── authentication-patterns/       # Authentication best practices
│   │   └── SKILL.md
│   ├── environment-secrets/           # Environment and secrets management
│   │   └── SKILL.md
│   ├── jwt-security/                  # JWT token security
│   │   └── SKILL.md
│   ├── code-review-standards/         # Code review standards
│   │   └── SKILL.md
│   ├── refactoring-patterns/          # Refactoring patterns
│   │   └── SKILL.md
│   ├── debug/                         # Debugging techniques
│   │   └── SKILL.md
│   ├── web-performance/               # Web performance optimization
│   │   └── SKILL.md
│   ├── caching-strategies/            # Caching patterns
│   │   └── SKILL.md
│   ├── image-optimization/            # Image optimization
│   │   └── SKILL.md
│   ├── bundle-optimization/           # Bundle size optimization
│   │   └── SKILL.md
│   ├── wcag-checklist/                # WCAG accessibility checklist
│   │   └── SKILL.md
│   ├── keyboard-navigation/           # Keyboard navigation patterns
│   │   └── SKILL.md
│   ├── screen-reader-patterns/        # Screen reader compatibility
│   │   └── SKILL.md
│   ├── technical-seo/                 # Technical SEO best practices
│   │   └── SKILL.md
│   ├── nextjs-seo/                    # Next.js SEO patterns
│   │   └── SKILL.md
│   ├── i18n-architecture/             # i18n architecture patterns
│   │   └── SKILL.md
│   ├── rtl-engineering/               # RTL design engineering
│   │   └── SKILL.md
│   ├── ci-cd-pipelines/               # CI/CD pipeline patterns
│   │   └── SKILL.md
│   ├── vercel-deployment/             # Vercel deployment patterns
│   │   └── SKILL.md
│   ├── docker-patterns/               # Docker container patterns
│   │   └── SKILL.md
│   ├── llm-integration/               # LLM integration patterns
│   │   └── SKILL.md
│   ├── rag-patterns/                  # RAG implementation patterns
│   │   └── SKILL.md
│   ├── prompt-engineering/            # Prompt engineering techniques
│   │   └── SKILL.md
│   └── workspace-optimization/        # Workspace self-improvement
│       └── SKILL.md
│
├── commands/                          # 17 global commands
│   ├── review.md                      # Code review
│   ├── security-scan.md               # Security scanning
│   ├── performance-check.md           # Performance analysis
│   ├── a11y-audit.md                  # Accessibility audit
│   ├── seo-check.md                   # SEO review
│   ├── new-page.md                    # Create Next.js page
│   ├── new-api.md                     # Create API route
│   ├── new-component.md               # Create React component
│   ├── refactor.md                    # Refactoring suggestions
│   ├── deploy-check.md                # Deployment readiness
│   ├── generate-docs.md               # Documentation generation
│   ├── health-check.md                # Workspace health check
│   ├── workspace-audit.md             # Workspace audit
│   ├── workspace-validate.md          # Workspace validation
│   ├── create-skill.md                # Create new skill
│   ├── create-agent.md                # Create new agent
│   ├── create-command.md              # Create new command
│   └── self-improve.md                # Workspace self-improvement
│
├── knowledge/                         # 35 knowledge documents
│   ├── frontend/
│   │   ├── react-patterns.md
│   │   ├── nextjs-app-router.md
│   │   ├── tailwind-css.md
│   │   └── responsive-design.md
│   ├── backend/
│   │   ├── api-design.md
│   │   ├── nextjs-route-handlers.md
│   │   └── background-jobs.md
│   ├── security/
│   │   ├── authentication.md
│   │   ├── authorization.md
│   │   ├── secrets-management.md
│   │   └── owasp-top-10.md
│   ├── architecture/
│   │   ├── clean-architecture.md
│   │   ├── design-patterns.md
│   │   └── technical-debt.md
│   ├── database/
│   │   ├── schema-design.md
│   │   ├── query-optimization.md
│   │   └── migrations.md
│   ├── performance/
│   │   ├── core-web-vitals.md
│   │   ├── caching.md
│   │   └── bundle-optimization.md
│   ├── testing/
│   │   ├── unit-testing.md
│   │   ├── integration-testing.md
│   │   └── e2e-testing.md
│   ├── devops/
│   │   ├── ci-cd.md
│   │   ├── docker.md
│   │   └── deployment.md
│   ├── ai/
│   │   ├── llm-integration.md
│   │   ├── rag-patterns.md
│   │   └── prompt-engineering.md
│   ├── i18n/
│   │   ├── rtl-design.md
│   │   └── translation-management.md
│   ├── seo/
│   │   ├── technical-seo.md
│   │   └── structured-data.md
│   ├── accessibility/
│   │   ├── wcag-guidelines.md
│   │   └── screen-reader-patterns.md
│   └── general/
│       ├── git-workflow.md
│       └── documentation-standards.md
│
├── examples/                          # 36 code examples
│   ├── good/                          # Best practice examples
│   │   ├── react-component.tsx
│   │   ├── api-route.ts
│   │   ├── database-schema.sql
│   │   ├── tailwind-usage.css
│   │   ├── typescript-strict.ts
│   │   ├── error-handling.ts
│   │   ├── form-validation.ts
│   │   ├── authentication.ts
│   │   ├── testing-example.ts
│   │   ├── performance-optimization.ts
│   │   ├── accessibility-example.tsx
│   │   └── i18n-example.ts
│   ├── bad/                           # Anti-pattern examples
│   │   ├── react-anti-pattern.tsx
│   │   ├── api-mistakes.ts
│   │   ├── security-vulnerability.ts
│   │   ├── performance-bottleneck.ts
│   │   ├── typescript-any.ts
│   │   ├── error-swallowing.ts
│   │   ├── hard-coded-secrets.ts
│   │   ├── missing-validation.ts
│   │   ├── anti-a11y-pattern.tsx
│   │   ├── rtl-mistakes.ts
│   │   ├── seo-mistakes.ts
│   │   └── test-anti-pattern.ts
│   └── before-after/                  # Transformation examples
│       ├── refactored-component.tsx
│       ├── optimized-api.ts
│       ├── secured-route.ts
│       ├── improved-types.ts
│       ├── fixed-a11y.tsx
│       ├── optimized-bundle.ts
│       ├── improved-testing.ts
│       ├── enhanced-i18n.ts
│       ├── fixed-rtl.ts
│       ├── improved-seo.ts
│       ├── optimized-performance.ts
│       └── hardened-security.ts
│
├── playbooks/                         # 16 engineering playbooks
│   ├── onboarding.md                  # New team member onboarding
│   ├── feature-development.md         # Feature development workflow
│   ├── bug-fixing.md                  # Bug investigation and fixing
│   ├── code-review.md                 # Code review process
│   ├── security-audit.md              # Security audit workflow
│   ├── performance-optimization.md    # Performance improvement
│   ├── refactoring.md                 # Refactoring workflow
│   ├── testing.md                     # Test creation workflow
│   ├── deployment.md                  # Deployment process
│   ├── incident-response.md           # Production incident handling
│   ├── database-migration.md          # Database migration workflow
│   ├── api-design.md                  # API design process
│   ├── documentation.md               # Documentation writing
│   ├── on-call.md                     # On-call procedures
│   ├── release-management.md          # Release management
│   └── technical-debt.md              # Technical debt management
│
├── generators/                        # 6 workspace generators
│   ├── skill-generator.md             # Create new skills
│   ├── agent-generator.md             # Create new agents
│   ├── command-generator.md           # Create new commands
│   ├── playbook-generator.md          # Create new playbooks
│   ├── documentation-generator.md     # Generate documentation
│   └── template-generator.md          # Generate templates
│
├── workspace-memory/                  # Accumulated knowledge
│   ├── patterns/                      # Established patterns
│   ├── decisions/                     # Architecture decisions
│   ├── mistakes/                      # Lessons from mistakes
│   ├── lessons/                       # Learned best practices
│   ├── preferences/                   # User preferences
│   ├── templates/                     # Reusable templates
│   ├── INDEX.md                       # Master index
│   └── README.md                      # Memory system guide
│
└── metrics/                           # Workspace metrics
    ├── CURRENT.md                     # Current metrics snapshot
    ├── HISTORY.md                     # Metrics history
    ├── REPORT-TEMPLATE.md             # Report template
    └── SCORING.md                     # Scoring methodology
```

## Project-Level Structure

When you add the workspace to a project:

```
your-project/
├── .opencode/
│   ├── AGENTS.md                      # Project-specific instructions
│   │
│   ├── agents/                        # 3 project-specific agents
│   │   ├── project-architect.md       # Project architecture agent
│   │   ├── project-reviewer.md        # Project code review agent
│   │   └── project-deployer.md        # Project deployment agent
│   │
│   ├── skills/                        # 14 project-specific skills
│   │   ├── project-patterns/
│   │   │   └── SKILL.md
│   │   ├── project-api/
│   │   │   └── SKILL.md
│   │   ├── project-database/
│   │   │   └── SKILL.md
│   │   ├── project-testing/
│   │   │   └── SKILL.md
│   │   ├── project-deployment/
│   │   │   └── SKILL.md
│   │   ├── project-security/
│   │   │   └── SKILL.md
│   │   ├── project-performance/
│   │   │   └── SKILL.md
│   │   ├── project-accessibility/
│   │   │   └── SKILL.md
│   │   ├── project-seo/
│   │   │   └── SKILL.md
│   │   ├── project-i18n/
│   │   │   └── SKILL.md
│   │   ├── project-design/
│   │   │   └── SKILL.md
│   │   ├── project-state/
│   │   │   └── SKILL.md
│   │   ├── project-forms/
│   │   │   └── SKILL.md
│   │   └── project-auth/
│   │       └── SKILL.md
│   │
│   └── commands/                      # 5 project-specific commands
│       ├── project-review.md
│       ├── project-deploy.md
│       ├── project-test.md
│       ├── project-lint.md
│       └── project-build.md
│
├── src/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## File Naming Conventions

| File Type | Convention | Example |
|-----------|------------|---------|
| Agent files | lowercase, hyphen-separated | `security-auditor.md` |
| Skill directories | lowercase, hyphen-separated | `react-patterns/SKILL.md` |
| Command files | lowercase, hyphen-separated | `security-scan.md` |
| Knowledge docs | lowercase, hyphen-separated | `react-patterns.md` |
| Playbook files | lowercase, hyphen-separated | `code-review.md` |
| Generator files | lowercase, hyphen-separated | `skill-generator.md` |
| TypeScript files | camelCase | `languageContext.ts` |
| React components | PascalCase | `GalleryGrid.tsx` |
| CSS classes | Tailwind utilities | `bg-primary text-surface` |
| Translation keys | dot-separated | `hero.title`, `booking.step1` |
| Environment vars | SCREAMING_SNAKE_CASE | `NEXT_PUBLIC_SUPABASE_URL` |
| Git commits | `type(scope): description` | `feat(booking): add time picker` |

## What Goes Where

| I want to... | Create in |
|--------------|-----------|
| Add a new AI agent | `~/.config/opencode/agents/` or `.opencode/agents/` |
| Add domain knowledge | `~/.config/opencode/skills/` or `.opencode/skills/` |
| Add a slash command | `~/.config/opencode/commands/` or `.opencode/commands/` |
| Document a decision | `~/.config/opencode/workspace-memory/decisions/` |
| Record a pattern | `~/.config/opencode/workspace-memory/patterns/` |
| Add a code example | `~/.config/opencode/examples/` |
| Create an engineering guide | `~/.config/opencode/playbooks/` |
| Add reference documentation | `~/.config/opencode/knowledge/` |
| Configure project-specific rules | `.opencode/AGENTS.md` |
| Store workspace metrics | `~/.config/opencode/metrics/` |
