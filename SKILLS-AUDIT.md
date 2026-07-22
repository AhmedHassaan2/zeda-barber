# SKILLS-AUDIT.md — Complete Workspace Skills Audit

**Audit Date:** 2026-07-20
**Workspace Version:** v1.1 Stable
**Total Skills:** 80 (67 Global + 13 Project-Specific)
**Auditor:** OpenCode Context Engineer
**Methodology:** Full file read of every SKILL.md, structural analysis, quality scoring

---

## Scoring Methodology

| Dimension | Weight | Criteria |
|---|---|---|
| **Content Completeness** | 25% | Has all standard sections (Purpose, When to Use, Core Concepts, Best Practices, Anti-Patterns) |
| **Code Examples** | 20% | Working, copy-pasteable TypeScript/SQL/CSS examples |
| **Edge Case Coverage** | 15% | Anti-patterns section with specific scenarios |
| **Actionability** | 15% | Can be applied immediately without additional research |
| **Reference Density** | 10% | Tables, comparisons, decision frameworks |
| **Scope Accuracy** | 10% | Triggers match actual use cases, no over/under-scoping |
| **Metadata Quality** | 5% | Version tracking, inputs/outputs documentation |

---

## Category Legend

| Code | Category | Count |
|---|---|---|
| AI | Artificial Intelligence | 5 |
| ARCH | Architecture | 4 |
| BE | Backend | 6 |
| DB | Database | 5 |
| DES | Design | 3 |
| DEV | DevOps | 6 |
| FE | Frontend | 7 |
| I18N | Internationalization | 2 |
| OBS | Observability | 3 |
| QA | Quality Assurance | 11 |
| SEC | Security | 7 |
| ANL | Analytics | 2 |
| DOC | Documentation | 3 |
| WKS | Workspace | 1 |
| PRJ | Project-Specific | 13 |
| **Total** | | **80** |

---

# SECTION 1: GLOBAL SKILLS (67)

---

## 1. agent-design

**Skill Name:** agent-design
**Category:** AI
**Purpose:** Guide AI agent design for autonomous task execution, covering agent architecture, tool definitions, and execution loops.
**Trigger Conditions:** Building AI agents, implementing tool use, designing multi-step workflows, creating autonomous systems
**Inputs:** None specified in skill file
**Outputs:** Agent architecture patterns, tool definitions, execution patterns, agent loop diagrams
**Dependencies:** llm-integration, prompt-engineering
**Related Agents:** ai-engineer
**Related Commands:** None
**Example Usage:** Tool definition schema, tool execution switch statement, agent loop diagram
**Complexity:** Simple (90 lines)
**Maturity:** Mature — complete coverage of agent fundamentals
**Quality Score:** 72/100
**Coverage Score:** 85% — covers core patterns well
**Missing Areas:** No multi-agent orchestration, no agent evaluation metrics, no memory persistence patterns
**Known Limitations:** Does not cover agent-to-agent communication or hierarchical agent systems

---

## 2. api-design

**Skill Name:** api-design
**Category:** Backend
**Purpose:** Guide REST API design with consistent conventions, proper error handling, and clear documentation.
**Trigger Conditions:** Designing new API endpoints, reviewing existing API structure, planning API versioning, documenting API contracts
**Inputs:** None specified
**Outputs:** API design conventions, response formats, HTTP status codes, versioning patterns
**Dependencies:** None
**Related Agents:** api-designer, backend
**Related Commands:** None
**Example Usage:** RESTful resource naming, success/error response format, HTTP status codes table, versioning examples
**Complexity:** Simple (102 lines)
**Maturity:** Mature — complete REST conventions with concrete status code table
**Quality Score:** 75/100
**Coverage Score:** 80% — covers REST well, no GraphQL/gRPC
**Missing Areas:** GraphQL schema design, gRPC proto definitions, WebSocket API design, API rate limiting specifics
**Known Limitations:** REST-only; does not cover alternative API paradigms

---

## 3. api-documentation

**Skill Name:** api-documentation
**Category:** Documentation
**Purpose:** Guide API documentation for developer experience, covering OpenAPI specs and endpoint documentation.
**Trigger Conditions:** Documenting API endpoints, creating API references, writing usage examples, generating OpenAPI specs
**Inputs:** None specified
**Outputs:** OpenAPI specs, endpoint documentation, usage examples
**Dependencies:** None
**Related Agents:** docs-writer
**Related Commands:** None
**Example Usage:** OpenAPI YAML spec, endpoint JSDoc annotation, curl usage examples
**Complexity:** Simple (97 lines)
**Maturity:** Mature — practical OpenAPI and curl examples
**Quality Score:** 70/100
**Coverage Score:** 75% — good basics, lacks interactive docs
**Missing Areas:** Interactive API explorers (Swagger UI, Redoc), SDK generation, changelog management
**Known Limitations:** Static documentation focus; no auto-generation tooling guidance

---

## 4. architecture-decisions

**Skill Name:** architecture-decisions
**Category:** Documentation
**Purpose:** Guide architecture decision documentation (ADRs) for team alignment and historical context.
**Trigger Conditions:** Making significant technical decisions, documenting architectural choices, onboarding new team members, reviewing past decisions
**Inputs:** None specified
**Outputs:** ADR templates, decision logs, decision categories
**Dependencies:** None
**Related Agents:** architect, docs-writer
**Related Commands:** None
**Example Usage:** Full ADR template (ADR-001), decision categories table, decision log format
**Complexity:** Simple (98 lines)
**Maturity:** Mature — complete ADR template directly usable
**Quality Score:** 78/100
**Coverage Score:** 90% — excellent ADR coverage
**Missing Areas:** ADR tooling (adr-tools CLI), ADR index management, decision reversal process
**Known Limits:** Template-heavy; lacks guidance on when NOT to write an ADR

---

## 5. authentication-patterns

**Skill Name:** authentication-patterns
**Category:** Security
**Purpose:** Guide authentication implementation with secure session management, OAuth, and multi-tenant patterns.
**Trigger Conditions:** Implementing login/logout, adding OAuth providers, managing session tokens, implementing protected routes
**Inputs:** None specified
**Outputs:** Auth flow patterns, route protection middleware, token management guidelines
**Dependencies:** jwt-security
**Related Agents:** security, backend
**Related Commands:** None
**Example Usage:** Supabase Auth sign-in (email + OAuth), Next.js middleware route protection, token management notes
**Complexity:** Simple (95 lines)
**Maturity:** Mature — strong Supabase Auth integration focus
**Quality Score:** 76/100
**Coverage Score:** 80% — good Supabase coverage, limited alternatives
**Missing Areas:** Passwordless auth, magic links, SAML/SOCS, multi-tenant isolation patterns
**Known Limitations:** Tightly coupled to Supabase; limited coverage of alternative auth providers

---

## 6. authorization-patterns

**Skill Name:** authorization-patterns
**Category:** Security
**Purpose:** Guide authorization implementation for role-based access control (RBAC) with Supabase RLS.
**Trigger Conditions:** Implementing role-based access, managing permissions, protecting routes and resources, auditing access control
**Inputs:** None specified
**Outputs:** RBAC patterns, route protection middleware, Supabase RLS policies
**Dependencies:** authentication-patterns
**Related Agents:** security, backend
**Related Commands:** None
**Example Usage:** RBAC permission map, withAuth middleware wrapper, Supabase RLS policies (admin/staff/customer)
**Complexity:** Simple (93 lines)
**Maturity:** Mature — includes both TypeScript and SQL RLS examples
**Quality Score:** 77/100
**Coverage Score:** 85% — strong RBAC + RLS coverage
**Missing Areas:** ABAC (attribute-based), permission inheritance, row-level vs column-level security
**Known Limitations:** RBAC-only; does not cover attribute-based or policy-based authorization

---

## 7. background-jobs

**Skill Name:** background-jobs
**Category:** Backend
**Purpose:** Guide background job implementation for async task processing, covering queues, cron, and status tracking.
**Trigger Conditions:** Processing large data sets, sending emails, generating reports, running scheduled tasks
**Inputs:** None specified
**Outputs:** Job queue patterns, cron handler patterns, job status tracking
**Dependencies:** None
**Related Agents:** backend
**Related Commands:** None
**Example Usage:** Promise-based fire-and-forget, queue pattern, Next.js cron route handler, Job interface
**Complexity:** Simple (100 lines)
**Maturity:** Mature — covers both simple and Next.js-specific patterns
**Quality Score:** 68/100
**Coverage Score:** 70% — good basics, lacks production queue systems
**Missing Areas:** Bull/BullMQ, RabbitMQ, Kafka patterns, dead letter queues, retry strategies with backoff
**Known Limitations:** In-memory patterns only; no persistent queue system guidance

---

## 8. bundle-optimization

**Skill Name:** bundle-optimization
**Category:** Quality
**Purpose:** Guide JavaScript bundle optimization for faster page loads, covering code splitting, imports, and tree shaking.
**Trigger Conditions:** Analyzing bundle size, implementing code splitting, optimizing imports, reducing bundle weight
**Inputs:** None specified
**Outputs:** Code splitting patterns, import optimization, tree shaking guidelines
**Dependencies:** None
**Related Agents:** performance
**Related Commands:** None
**Example Usage:** Dynamic import, import optimization (lodash/date-fns), bundle analyzer commands, tree shaking rules
**Complexity:** Simple (83 lines)
**Maturity:** Mature — concise and actionable
**Quality Score:** 70/100
**Coverage Score:** 75% — covers fundamentals, lacks advanced techniques
**Missing Areas:** Module federation, worker threads, WASM bundles, dynamic re-exports
**Known Limitations:** Basic optimization only; no guidance on module federation or micro-frontends

---

## 9. caching-strategies

**Skill Name:** caching-strategies
**Category:** Quality
**Purpose:** Guide multi-layer caching implementation for optimal performance — server-side, CDN, and client-side.
**Trigger Conditions:** Setting cache headers, implementing ISR, configuring CDN caching, adding client-side data caching, designing cache invalidation
**Inputs:** None specified
**Outputs:** Cache layer architecture, HTTP headers, ISR patterns, SWR patterns, invalidation strategies, vercel.json config
**Dependencies:** None
**Related Agents:** performance, backend
**Related Commands:** None
**Example Usage:** Cache-Control headers, ETag generation, ISR time-based and on-demand revalidation, SWR hook usage, cache patterns table, Vercel edge caching config
**Complexity:** Complex (249 lines)
**Maturity:** Most comprehensive quality skill — excellent multi-layer architecture coverage
**Quality Score:** 92/100
**Coverage Score:** 95% — outstanding coverage of all caching layers
**Missing Areas:** Edge caching invalidation, cache warming strategies, distributed cache consistency
**Known Limitations:** Vercel-centric; limited Cloudflare Workers or self-hosted CDN guidance

---

## 10. ci-cd-pipelines

**Skill Name:** ci-cd-pipelines
**Category:** DevOps
**Purpose:** Guide CI/CD pipeline implementation for automated testing and deployment.
**Trigger Conditions:** Setting up CI/CD pipelines, automating testing, configuring deployment workflows, implementing quality gates
**Inputs:** None specified
**Outputs:** GitHub Actions workflows, quality gates, deployment pipeline configs
**Dependencies:** None
**Related Agents:** devops
**Related Commands:** None
**Example Usage:** GitHub Actions CI workflow (lint, typecheck, test, build, e2e), quality gates list, Vercel deployment job
**Complexity:** Simple (111 lines)
**Maturity:** Mature — complete CI/CD pipeline with test → e2e → deploy flow
**Quality Score:** 74/100
**Coverage Score:** 80% — good GitHub Actions coverage
**Missing Areas:** GitLab CI, CircleCI, Jenkins, canary deployments, blue-green strategies
**Known Limitations:** GitHub Actions only; no coverage of alternative CI platforms

---

## 11. clean-architecture

**Skill Name:** clean-architecture
**Category:** Architecture
**Purpose:** Guide clean architecture implementation for maintainable, testable systems.
**Trigger Conditions:** Designing new features, refactoring existing code, structuring applications, planning for scalability
**Inputs:** None specified
**Outputs:** Layer structure, dependency rule, repository pattern, use case patterns
**Dependencies:** None
**Related Agents:** architect
**Related Commands:** None
**Example Usage:** Layer structure directory, dependency rule diagram, UserRepository interface + implementation, CreateUser use case
**Complexity:** Simple (98 lines)
**Maturity:** Mature — clear layer separation with TypeScript examples
**Quality Score:** 76/100
**Coverage Score:** 85% — solid clean architecture foundation
**Missing Areas:** Hexagonal architecture, ports & adapters, bounded contexts (DDD)
**Known Limitations:** Layer-focused only; does not cover hexagonal or ports-and-adapters alternatives

---

## 12. code-review-standards

**Skill Name:** code-review-standards
**Category:** Quality
**Purpose:** Guide code review process with quality checklists and feedback guidelines.
**Trigger Conditions:** Reviewing pull requests, setting up review processes, training new reviewers, establishing quality gates
**Inputs:** None specified
**Outputs:** Review checklist, feedback guidelines, review priorities
**Dependencies:** None
**Related Agents:** reviewer
**Related Commands:** None
**Example Usage:** Review checklist (correctness, security, quality, testing), good vs bad feedback examples, review priority levels
**Complexity:** Simple (83 lines)
**Maturity:** Mature — actionable checklist format with specific feedback examples
**Quality Score:** 73/100
**Coverage Score:** 80% — good review process coverage
**Missing Areas:** Review automation (bots), review metrics, async review workflows
**Known Limitations:** Manual review focus; no coverage of automated review tooling

---

## 13. component-documentation

**Skill Name:** component-documentation
**Category:** Documentation
**Purpose:** Guide component documentation for design system consistency.
**Trigger Conditions:** Documenting new components, creating usage guidelines, writing component stories, maintaining design system docs
**Inputs:** None specified
**Outputs:** Component documentation template, Storybook stories
**Dependencies:** design-systems
**Related Agents:** docs-writer, designer
**Related Commands:** None
**Example Usage:** Button documentation template (markdown), Storybook story (Primary, Loading variants)
**Complexity:** Simple (100 lines)
**Maturity:** Mature — includes both markdown template and Storybook story examples
**Quality Score:** 71/100
**Coverage Score:** 75% — good template coverage
**Missing Areas:** Visual regression testing, automated story generation, props table auto-generation
**Known Limitations:** Static documentation; no auto-generation from TypeScript types

---

## 14. context-engineering

**Skill Name:** context-engineering
**Category:** AI
**Purpose:** Guide context engineering for effective LLM interactions, covering token management and memory systems.
**Trigger Conditions:** Managing context windows, implementing conversation memory, optimizing prompt assembly, building multi-turn conversations
**Inputs:** None specified
**Outputs:** Token counting, context building, memory systems, context assembly
**Dependencies:** llm-integration, prompt-engineering
**Related Agents:** ai-engineer, context-engineer
**Related Commands:** None
**Example Usage:** Token estimation function, buildContext function (sliding window), memory system interface, assembleContext function
**Complexity:** Simple (104 lines)
**Maturity:** Mature — covers short-term/long-term/episodic memory patterns
**Quality Score:** 75/100
**Coverage Score:** 80% — good memory system coverage
**Missing Areas:** Context compression, hierarchical memory, context quality evaluation
**Known Limits:** Basic memory patterns; no guidance on memory evaluation or compression

---

## 15. conversion-optimization

**Skill Name:** conversion-optimization
**Category:** Analytics
**Purpose:** Guide conversion rate optimization for key business metrics.
**Trigger Conditions:** Optimizing booking flows, improving signup rates, reducing cart abandonment, testing UI variations
**Inputs:** None specified
**Outputs:** A/B test hook, conversion funnel, key metrics table
**Dependencies:** product-analytics
**Related Agents:** frontend
**Related Commands:** None
**Example Usage:** useABTest hook (localStorage-based), conversion funnel diagram, key metrics table (conversion rate, bounce rate, cart abandonment, booking completion)
**Complexity:** Simple (83 lines)
**Maturity:** Mature — practical A/B test hook and business metric formulas
**Quality Score:** 68/100
**Coverage Score:** 70% — basic A/B testing, lacks advanced experimentation
**Missing Areas:** Statistical significance calculation, multi-varate testing, feature flags, personalization
**Known Limits:** localStorage-based A/B testing; not suitable for production experimentation platforms

---

## 16. css-motion-design

**Skill Name:** css-motion-design
**Category:** Frontend
**Purpose:** Guide CSS animation and motion design implementation for performant, meaningful, and accessible animations.
**Trigger Conditions:** Creating page transitions, building micro-interactions, implementing scroll-triggered animations, designing feedback animations, adding skeleton loaders
**Inputs:** None specified
**Outputs:** Keyframe animations, CSS transitions, Tailwind utilities, micro-interactions, skeleton patterns, scroll-triggered animations, performance rules, easing curves, reduced motion
**Dependencies:** tailwind-css
**Related Agents:** frontend, designer
**Related Commands:** None
**Example Usage:** Keyframe animations (slideInUp, fadeIn, shimmer, pulse), CSS transitions (hover-lift, stagger), micro-interactions, skeleton card, scroll-triggered animation (useInView hook), prefers-reduced-motion media query
**Complexity:** Complex (249 lines)
**Maturity:** Most comprehensive frontend skill — excellent animation performance and accessibility coverage
**Quality Score:** 91/100
**Coverage Score:** 95% — outstanding animation pattern coverage
**Missing Areas:** View Transitions API, Framer Motion integration, GSAP patterns
**Known Limitations:** CSS-only focus; no guidance on JavaScript animation libraries

---

## 17. data-migration

**Skill Name:** data-migration
**Category:** Database
**Purpose:** Guide data migration implementation for schema evolution with zero-downtime patterns.
**Trigger Conditions:** Adding new columns or tables, restructuring data, migrating between systems, performing schema changes
**Inputs:** None specified
**Outputs:** Migration steps, zero-downtime pattern, Supabase migration commands
**Dependencies:** database-design
**Related Agents:** database
**Related Commands:** None
**Example Usage:** Zero-downtime migration SQL (add column → backfill → constraint → drop), Supabase migration CLI commands
**Complexity:** Simple (83 lines)
**Maturity:** Mature — practical zero-downtime migration SQL pattern
**Quality Score:** 70/100
**Coverage Score:** 75% — good zero-downtime coverage
**Missing Areas:** Data validation post-migration, rollback strategies, cross-database migrations
**Known Limits:** PostgreSQL/Supabase only; no cross-database migration guidance

---

## 18. database-design

**Skill Name:** database-design
**Category:** Database
**Purpose:** Guide database schema design for PostgreSQL with proper normalization, indexing, and migration strategies.
**Trigger Conditions:** Designing new database schemas, adding tables or columns, optimizing query performance, planning data migrations
**Inputs:** None specified
**Outputs:** Naming conventions, schema design principles, relationship patterns, migration strategy
**Dependencies:** None
**Related Agents:** database
**Related Commands:** None
**Example Usage:** Naming conventions, products table CREATE, one-to-many and many-to-many SQL, migration strategy steps
**Complexity:** Simple (102 lines)
**Maturity:** Mature — solid PostgreSQL design foundation with SQL examples
**Quality Score:** 74/100
**Coverage Score:** 80% — good schema design coverage
**Missing Areas:** Denormalization strategies, partitioning, materialized views, JSONB patterns
**Known Limits:** Normalized-only focus; no guidance on strategic denormalization

---

## 19. debug

**Skill Name:** debug
**Category:** Quality
**Purpose:** Systematic debugging approach for Next.js, React, and TypeScript applications with concrete tooling and common patterns.
**Trigger Conditions:** Investigating runtime errors, fixing build failures, troubleshooting unexpected behavior, diagnosing performance issues
**Inputs:** None specified
**Outputs:** Debugging framework (4 phases), common error patterns, debugging tools, output format
**Dependencies:** None
**Related Agents:** frontend, backend
**Related Commands:** None
**Example Usage:** 6 common error patterns (server/client components, hydration mismatch, too many re-renders, undefined property, Supabase permission denied, API route issues), debugging tools (Node inspect, bundle-analyzer, tsc, Network tab)
**Complexity:** Complex (238 lines)
**Maturity:** Second-largest quality skill — excellent systematic approach with concrete error patterns
**Quality Score:** 88/100
**Coverage Score:** 90% — outstanding Next.js/React/TypeScript debugging coverage
**Missing Areas:** Edge runtime debugging, middleware debugging, streaming error boundaries
**Known Limits:** Next.js/React-specific; limited Node.js backend debugging patterns

---

## 20. design-patterns

**Skill Name:** design-patterns
**Category:** Architecture
**Purpose:** Guide software design pattern application with practical examples across creational, structural, and behavioral categories.
**Trigger Conditions:** Solving common design problems, improving code structure, communicating solutions, refactoring toward better patterns
**Inputs:** None specified
**Outputs:** Creational patterns, structural patterns, behavioral patterns
**Dependencies:** clean-architecture, solid-principles
**Related Agents:** architect
**Related Commands:** None
**Example Usage:** Factory pattern (NotificationFactory), Builder pattern (QueryBuilder), Adapter pattern (SupabaseAdapter), Decorator pattern (withLogging), Observer pattern (useEventEmitter), Strategy pattern (SortStrategy interface)
**Complexity:** Simple (113 lines)
**Maturity:** Mature — good coverage of 3 pattern categories with TypeScript examples
**Quality Score:** 74/100
**Coverage Score:** 75% — covers classic patterns, lacks modern patterns
**Missing Areas:** Repository pattern details, CQRS, Event Sourcing, Circuit Breaker, Saga pattern
**Known Limits:** Classic GoF patterns only; no modern distributed systems patterns

---

## 21. design-systems

**Skill Name:** design-systems
**Category:** Design
**Purpose:** Guide design system creation and maintenance for consistent UI/UX.
**Trigger Conditions:** Creating new design systems, documenting existing components, managing design tokens, ensuring consistency across features
**Inputs:** None specified
**Outputs:** Design tokens, component documentation, design principles
**Dependencies:** tailwind-css, react-patterns
**Related Agents:** designer, frontend
**Related Commands:** None
**Example Usage:** tokens.ts (colors, spacing, typography), ButtonProps interface with usage examples, 5 design principles
**Complexity:** Simple (95 lines)
**Maturity:** Mature — foundation skill referenced by many other skills
**Quality Score:** 72/100
**Coverage Score:** 75% — good token and principles coverage
**Missing Areas:** Token inheritance, theming engine, multi-brand support, accessibility tokens
**Known Limits:** Single-brand focus; no multi-brand or theming engine guidance

---

## 22. docker-patterns

**Skill Name:** docker-patterns
**Category:** DevOps
**Purpose:** Guide Docker containerization for development and production, covering multi-stage builds and compose.
**Trigger Conditions:** Containerizing applications, setting up development environments, configuring multi-service development, optimizing Docker images
**Inputs:** None specified
**Outputs:** Multi-stage Dockerfile, Docker Compose config
**Dependencies:** None
**Related Agents:** devops
**Related Commands:** None
**Example Usage:** 3-stage Dockerfile (deps → builder → production), docker-compose.yml (app + postgres + redis)
**Complexity:** Simple (106 lines)
**Maturity:** Mature — complete multi-stage build and compose examples
**Quality Score:** 73/100
**Coverage Score:** 80% — good Docker fundamentals
**Missing Areas:** Health checks, secrets in Docker, multi-platform builds, Docker Slim, rootless containers
**Known Limits:** Basic Docker patterns; no advanced security or optimization techniques

---

## 23. email-systems

**Skill Name:** email-systems
**Category:** Backend
**Purpose:** Guide email system implementation for transactional and marketing emails using Resend.
**Trigger Conditions:** Sending transactional emails, creating email templates, implementing email workflows, setting up email services
**Inputs:** None specified
**Outputs:** Resend integration, email templates, background sending pattern
**Dependencies:** None
**Related Agents:** backend
**Related Commands:** None
**Example Usage:** Resend email send function, booking confirmation HTML template, background email sending pattern
**Complexity:** Simple (107 lines)
**Maturity:** Mature — practical Resend-focused implementation with background sending
**Quality Score:** 68/100
**Coverage Score:** 70% — Resend-only coverage
**Missing Areas:** SendGrid, AWS SES, email deliverability, bounce handling, unsubscribe management
**Known Limits:** Resend-only; no comparison with alternative email providers

---

## 24. environment-secrets

**Skill Name:** environment-secrets
**Category:** DevOps
**Purpose:** Guide secure environment variable management, secrets handling, validation, and key rotation for production applications.
**Trigger Conditions:** Setting up new projects, adding new environment variables/API keys, configuring multi-environment setups, validating required variables, implementing key rotation, auditing credential exposure
**Inputs:** None specified
**Outputs:** Naming conventions, env file structure, validation with Zod, key rotation procedure, secret scanning, platform-specific secrets table, type-safe access pattern
**Dependencies:** None
**Related Agents:** devops, security
**Related Commands:** None
**Example Usage:** Naming conventions (NEXT_PUBLIC_ prefix), .env file structure, Zod validation schema with validateEnv(), key rotation steps, secretlint/gitleaks commands, platform-specific secrets table (Vercel, Supabase, GitHub Actions, Docker), type-safe env access
**Complexity:** Complex (175 lines)
**Maturity:** Very comprehensive — covers full lifecycle of secrets management
**Quality Score:** 89/100
**Coverage Score:** 92% — outstanding secrets management coverage
**Missing Areas:** Vault integration (HashiCorp), secrets rotation automation, secrets drift detection
**Known Limits:** No external vault integration; relies on platform-native secrets

---

## 25. error-tracking

**Skill Name:** error-tracking
**Category:** Observability
**Purpose:** Guide error tracking implementation for production monitoring using Sentry.
**Trigger Conditions:** Setting up error tracking, categorizing errors, implementing error boundaries, debugging production issues
**Inputs:** None specified
**Outputs:** Sentry setup, error boundary component, error categories table
**Dependencies:** None
**Related Agents:** devops, backend
**Related Commands:** None
**Example Usage:** Sentry.init(), Next.js error.tsx boundary with Sentry captureException, error categories table (Network/Validation/Auth/Server/Critical)
**Complexity:** Simple (94 lines)
**Maturity:** Mature — includes error categories with severity levels and actions
**Quality Score:** 71/100
**Coverage Score:** 75% — good Sentry integration coverage
**Missing Areas:** Source map upload, release tracking, user feedback integration, alert rules
**Known Limits:** Sentry-only; no alternative error tracking platforms

---

## 26. form-engineering

**Skill Name:** form-engineering
**Category:** Frontend
**Purpose:** Guide form implementation with proper validation, error handling, accessibility, and user experience patterns.
**Trigger Conditions:** Building any form, implementing multi-step wizards, handling file uploads, adding form validation
**Inputs:** None specified
**Outputs:** Controlled form pattern, multi-step wizard pattern, validation rules
**Dependencies:** react-patterns
**Related Agents:** frontend
**Related Commands:** None
**Example Usage:** Controlled form with validation, multi-step wizard form, validation rules list
**Complexity:** Simple (109 lines)
**Maturity:** Mature — good coverage of form patterns with accessibility focus
**Quality Score:** 72/100
**Coverage Score:** 75% — covers common form patterns
**Missing Areas:** File upload with progress, drag-and-drop, async validation, server actions for forms
**Known Limits:** Client-side forms only; no server action or form action patterns

---

## 27. i18n-architecture

**Skill Name:** i18n-architecture
**Category:** I18N
**Purpose:** Guide internationalization implementation for bilingual Arabic/English applications.
**Trigger Conditions:** Setting up i18n systems, managing translations, implementing language switching, handling locale-specific formats
**Inputs:** None specified
**Outputs:** Translation system, language context, translation key conventions
**Dependencies:** None
**Related Agents:** i18n
**Related Commands:** None
**Example Usage:** translations.ts (ar/en), LanguageContext provider with useLanguage hook, translation key convention (section.element)
**Complexity:** Simple (131 lines)
**Maturity:** Mature — bilingual Arabic/English focused with dot-notation key convention
**Quality Score:** 78/100
**Coverage Score:** 85% — excellent bilingual i18n coverage
**Missing Areas:** Pluralization rules, date/number formatting, locale routing, lazy loading translations
**Known Limits:** Two-language focus; no pluralization or locale formatting guidance

---

## 28. image-optimization

**Skill Name:** image-optimization
**Category:** Quality
**Purpose:** Guide image optimization for fast loading and visual quality.
**Trigger Conditions:** Adding images to pages, implementing responsive images, optimizing uploaded images, setting up image storage
**Inputs:** None specified
**Outputs:** Format selection guide, responsive images, Supabase Storage optimization
**Dependencies:** None
**Related Agents:** performance, frontend
**Related Commands:** None
**Example Usage:** Format selection table (WebP/AVIF/JPEG/PNG/SVG), <picture> element with sources, sharp optimization (resize + webp), thumbnail generation
**Complexity:** Simple (88 lines)
**Maturity:** Mature — includes format browser support percentages and sharp library examples
**Quality Score:** 72/100
**Coverage Score:** 78% — good format selection and responsive images
**Missing Areas:** CDN-based transforms (Imgix, Cloudinary), lazy loading implementation, CLS prevention for images
**Known Limits:** Static optimization only; no CDN-based dynamic transforms

---

## 29. infrastructure-as-code

**Skill Name:** infrastructure-as-code
**Category:** DevOps
**Purpose:** Guide infrastructure as code implementation for reproducible environments using Terraform.
**Trigger Conditions:** Setting up cloud infrastructure, managing multiple environments, automating resource provisioning, documenting infrastructure
**Inputs:** None specified
**Outputs:** Terraform basics, state management, environment separation
**Dependencies:** None
**Related Agents:** devops, cloud
**Related Commands:** None
**Example Usage:** Terraform Vercel project config, S3 remote state, environment separation directory structure
**Complexity:** Simple (94 lines)
**Maturity:** Mature — Vercel-focused Terraform example with environment separation
**Quality Score:** 66/100
**Coverage Score:** 65% — basic Terraform only
**Missing Areas:** Pulumi, AWS CDK, Ansible, state locking, drift detection, module composition
**Known Limits:** Terraform/Vercel only; no coverage of AWS/GCP/Azure IaC

---

## 30. input-validation

**Skill Name:** input-validation
**Category:** Security
**Purpose:** Guide input validation and sanitization to prevent injection attacks and ensure data integrity.
**Trigger Conditions:** Validating API input, validating form data, sanitizing user content, protecting against injection
**Inputs:** None specified
**Outputs:** Zod schema validation, sanitization patterns, validation layers
**Dependencies:** None
**Related Agents:** security, backend
**Related Commands:** None
**Example Usage:** Zod UserSchema with safeParse, DOMPurify sanitization, validation layers (client → API boundary → database)
**Complexity:** Simple (82 lines)
**Maturity:** Mature — clear 3-layer validation strategy
**Quality Score:** 73/100
**Coverage Score:** 80% — good validation layer coverage
**Missing Areas:** Schema-based file validation, CSV injection, SSRF prevention, NoSQL injection
**Known Limits:** Basic injection types only; limited SSRF/CSV injection coverage

---

## 31. jwt-security

**Skill Name:** jwt-security
**Category:** Security
**Purpose:** Guide JWT token management with practical implementation, validation, refresh strategies, and security hardening.
**Trigger Conditions:** Implementing JWT-based authentication, validating tokens in middleware, setting up token refresh flows, auditing token security
**Inputs:** None specified
**Outputs:** Token structure, lifecycle, validation (jose), refresh flow, storage patterns, middleware validation, algorithm selection
**Dependencies:** None
**Related Agents:** security, backend
**Related Commands:** None
**Example Usage:** AccessTokenPayload interface, token lifecycle diagram, signToken/verifyToken (jose), refresh token flow with rotation, middleware validation, algorithm comparison table (HS256/RS256/ES256), RS256 implementation
**Complexity:** Complex (219 lines)
**Maturity:** Very comprehensive — recommends jose over jsonwebtoken, covers full token lifecycle
**Quality Score:** 90/100
**Coverage Score:** 92% — outstanding JWT coverage
**Missing Areas:** Token binding, sender-constrained tokens, JWT profiling for specific use cases
**Known Limits:** Standard JWT patterns; no advanced token binding or DPoP

---

## 32. keyboard-navigation

**Skill Name:** keyboard-navigation
**Category:** Quality
**Purpose:** Guide keyboard navigation implementation for accessible interfaces.
**Trigger Conditions:** Implementing interactive components, managing focus in modals/dialogs, building custom keyboard shortcuts, testing keyboard accessibility
**Inputs:** None specified
**Outputs:** Focus management, keyboard patterns table, focus indicators
**Dependencies:** None
**Related Agents:** accessibility
**Related Commands:** None
**Example Usage:** Modal focus trap (React), keyboard patterns table (Button/Link/Tab/Menu/Dialog/Listbox), :focus-visible CSS
**Complexity:** Simple (91 lines)
**Maturity:** Mature — includes keyboard pattern table for 6 component types
**Quality Score:** 74/100
**Coverage Score:** 80% — good keyboard pattern coverage
**Missing Areas:** Roving tabindex, arrow key navigation in lists, custom shortcut systems
**Known Limits:** Basic focus management; no roving tabindex or complex keyboard navigation patterns

---

## 33. llm-integration

**Skill Name:** llm-integration
**Category:** AI
**Purpose:** Guide LLM API integration for AI-powered features, covering basic integration, streaming, and error handling.
**Trigger Conditions:** Integrating LLM APIs, building chat interfaces, implementing streaming responses, adding AI-powered features
**Inputs:** None specified
**Outputs:** Basic integration, streaming response, error handling
**Dependencies:** None
**Related Agents:** ai-engineer
**Related Commands:** None
**Example Usage:** OpenAI basic integration, streaming response in route handler, error handling (APIError with 429/500)
**Complexity:** Simple (113 lines)
**Maturity:** Core AI skill referenced by agent-design, context-engineering, mcp-integration, rag-patterns
**Quality Score:** 72/100
**Coverage Score:** 75% — good basic integration coverage
**Missing Areas:** Multi-provider abstraction, function calling, structured output, cost optimization
**Known Limits:** OpenAI-focused; no multi-provider abstraction layer

---

## 34. mcp-integration

**Skill Name:** mcp-integration
**Category:** AI
**Purpose:** Guide Model Context Protocol (MCP) integration for standardized AI tool access.
**Trigger Conditions:** Setting up MCP servers, defining MCP tools, managing MCP resources, integrating with OpenCode
**Inputs:** None specified
**Outputs:** MCP server setup, tool definitions, resource definitions, OpenCode integration config
**Dependencies:** llm-integration
**Related Agents:** ai-engineer
**Related Commands:** None
**Example Usage:** MCP server tool definition, MCP resource definition, opencode.json MCP server config
**Complexity:** Simple (101 lines)
**Maturity:** Mature — includes OpenCode-specific MCP integration config
**Quality Score:** 70/100
**Coverage Score:** 72% — good MCP basics
**Missing Areas:** MCP sampling, MCP logging, transport层 (stdio/SSE/streamable-http), MCP client implementation
**Known Limits:** Basic MCP patterns; no advanced transport or sampling guidance

---

## 35. monitoring-observability

**Skill Name:** monitoring-observability
**Category:** Observability
**Purpose:** Guide application monitoring and observability implementation.
**Trigger Conditions:** Setting up monitoring, implementing health checks, configuring alerts, analyzing system health
**Inputs:** None specified
**Outputs:** Health check endpoint, key metrics table, alerting rules
**Dependencies:** None
**Related Agents:** devops
**Related Commands:** None
**Example Usage:** Health check route handler, key metrics table (Error Rate, Latency, Throughput, Uptime with thresholds), Prometheus alerting rules
**Complexity:** Simple (96 lines)
**Maturity:** Mature — includes Prometheus-style alerting rules and metric thresholds
**Quality Score:** 72/100
**Coverage Score:** 75% — good basic monitoring coverage
**Missing Areas:** Distributed tracing, OpenTelemetry, log aggregation, dashboard design
**Known Limits:** Prometheus-only; no OpenTelemetry or distributed tracing guidance

---

## 36. nextjs-app-router

**Skill Name:** nextjs-app-router
**Category:** Frontend
**Purpose:** Guide Next.js 16 App Router development including server/client component patterns, layouts, route handlers, metadata, and performance features.
**Trigger Conditions:** Creating new pages or layouts, implementing data fetching, setting up API routes, configuring metadata and SEO, implementing ISR or streaming
**Inputs:** None specified
**Outputs:** File structure, data fetching patterns, layout pattern, metadata API, route handlers, streaming/suspense
**Dependencies:** react-patterns
**Related Agents:** frontend, backend
**Related Commands:** None
**Example Usage:** File structure tree, async server component, client component with SWR, root and nested layouts, static and dynamic metadata, route handler (GET/POST), streaming with Suspense, complete services page example
**Complexity:** Complex (178 lines)
**Maturity:** Core Next.js skill with complete coverage of App Router patterns and end-to-end example
**Quality Score:** 90/100
**Coverage Score:** 92% — outstanding App Router coverage
**Missing Areas:** Parallel routes, intercepting routes, server actions deep dive, partial prerendering
**Known Limits:** Next.js 16 focused; limited coverage of cutting-edge features like PPR

---

## 37. nextjs-route-handlers

**Skill Name:** nextjs-route-handlers
**Category:** Backend
**Purpose:** Guide Next.js Route Handler implementation for clean, secure, and maintainable API endpoints.
**Trigger Conditions:** Creating new API routes, implementing CRUD operations, adding authentication middleware, handling file uploads in API routes
**Inputs:** None specified
**Outputs:** Basic route handler, query parameters, dynamic routes, authentication pattern
**Dependencies:** api-design
**Related Agents:** backend
**Related Commands:** None
**Example Usage:** GET/POST route handler with try/catch, query parameters parsing, dynamic route [id], authentication verification function
**Complexity:** Simple (124 lines)
**Maturity:** Mature — practical route handler patterns with error handling
**Quality Score:** 75/100
**Coverage Score:** 80% — good route handler coverage
**Missing Areas:** File upload handlers, streaming responses, middleware patterns, webhook handling
**Known Limits:** Basic CRUD only; no file upload or webhook patterns

---

## 38. owasp-top-10

**Skill Name:** owasp-top-10
**Category:** Security
**Purpose:** Guide mitigation of OWASP Top 10 (2021) security risks.
**Trigger Conditions:** Security reviews, threat modeling, vulnerability assessments, security training
**Inputs:** None specified
**Outputs:** OWASP Top 10 (2021) table, common mitigations
**Dependencies:** None
**Related Agents:** security
**Related Commands:** None
**Example Usage:** OWASP Top 10 table (A01-A10 with mitigations), Supabase RLS for A01, parameterized queries for A03, rate limiting for A07
**Complexity:** Simple (82 lines)
**Maturity:** Mature — complete OWASP 2021 top 10 with Supabase-specific mitigations
**Quality Score:** 74/100
**Coverage Score:** 80% — good OWASP coverage
**Missing Areas:** OWASP ASVS, OWASP API Security Top 10, threat modeling frameworks (STRIDE)
**Known Limits:** Top 10 only; no ASVS or API Security Top 10 coverage

---

## 39. playwright-e2e

**Skill Name:** playwright-e2e
**Category:** Quality
**Purpose:** Guide Playwright E2E test implementation for critical user flows.
**Trigger Conditions:** Writing end-to-end tests, testing critical user journeys, visual regression testing, cross-browser testing
**Inputs:** None specified
**Outputs:** Playwright config, page object pattern, assertions
**Dependencies:** testing-strategy
**Related Agents:** tester
**Related Commands:** None
**Example Usage:** playwright.config.ts (multi-browser, mobile), BookingPage page object, assertions (visibility, text, URL, count)
**Complexity:** Simple (109 lines)
**Maturity:** Mature — includes page object pattern with practical booking flow example
**Quality Score:** 74/100
**Coverage Score:** 80% — good E2E testing patterns
**Missing Areas:** Visual regression, API mocking, test data factories, parallel execution
**Known Limits:** Basic E2E only; no visual regression or API mocking guidance

---

## 40. prisma-patterns

**Skill Name:** prisma-patterns
**Category:** Database
**Purpose:** Guide Prisma ORM usage for type-safe database queries and schema management.
**Trigger Conditions:** Setting up Prisma schema, writing database queries, managing migrations, integrating with Next.js
**Inputs:** None specified
**Outputs:** Schema design, queries, transactions
**Dependencies:** database-design
**Related Agents:** database
**Related Commands:** None
**Example Usage:** Prisma schema (User model with @map), findMany with filters, findUnique with relations, upsert, $transaction
**Complexity:** Simple (101 lines)
**Maturity:** Mature — covers Prisma-specific patterns with @map for snake_case
**Quality Score:** 72/100
**Coverage Score:** 75% — good Prisma fundamentals
**Missing Areas:** Connection pooling, middleware, extensions, performance tracing
**Known Limits:** Basic Prisma patterns; no advanced middleware or extension guidance

---

## 41. product-analytics

**Skill Name:** product-analytics
**Category:** Analytics
**Purpose:** Guide product analytics implementation for data-driven decisions.
**Trigger Conditions:** Implementing event tracking, setting up funnels, analyzing user behavior, measuring feature adoption
**Inputs:** None specified
**Outputs:** Event tracking function, funnel tracking, key events table
**Dependencies:** None
**Related Agents:** frontend
**Related Commands:** None
**Example Usage:** trackEvent function (GA4 + custom), funnel tracking (3 steps + conversion), key events table (page_view, signup, booking_started, booking_completed, payment_completed)
**Complexity:** Simple (88 lines)
**Maturity:** Mature — dual GA4 + custom analytics approach
**Quality Score:** 67/100
**Coverage Score:** 70% — basic event tracking
**Missing Areas:** Cohort analysis, retention tracking, heatmap integration, session replay
**Known Limits:** Basic event tracking only; no advanced analytics patterns

---

## 42. prompt-engineering

**Skill Name:** prompt-engineering
**Category:** AI
**Purpose:** Guide prompt engineering for effective LLM interactions.
**Trigger Conditions:** Writing system prompts, designing few-shot examples, optimizing prompt performance, building AI features
**Inputs:** None specified
**Outputs:** Prompt structure, few-shot learning, chain-of-thought, optimization techniques
**Dependencies:** None
**Related Agents:** ai-engineer
**Related Commands:** None
**Example Usage:** System prompt template (barber shop), few-shot examples, chain-of-thought prompt, optimization techniques table
**Complexity:** Simple (89 lines)
**Maturity:** Core AI skill referenced by agent-design, context-engineering, mcp-integration, rag-patterns
**Quality Score:** 73/100
**Coverage Score:** 78% — good prompt engineering fundamentals
**Missing Areas:** Prompt chaining, tool-use prompt patterns, structured output formatting, prompt evaluation
**Known Limits:** Basic prompting only; no advanced prompt chaining or evaluation

---

## 43. rag-patterns

**Skill Name:** rag-patterns
**Category:** AI
**Purpose:** Guide Retrieval-Augmented Generation implementation for knowledge-based AI.
**Trigger Conditions:** Building knowledge base features, implementing semantic search, adding document Q&A, creating contextual AI responses
**Inputs:** None specified
**Outputs:** RAG pipeline, document chunking, vector store integration, retrieval-augmented prompts
**Dependencies:** llm-integration
**Related Agents:** ai-engineer
**Related Commands:** None
**Example Usage:** RAG pipeline diagram, chunkDocument function, Supabase pgvector match_documents RPC, retrieval-augmented prompt template
**Complexity:** Simple (95 lines)
**Maturity:** Mature — covers full RAG pipeline from chunking to response
**Quality Score:** 74/100
**Coverage Score:** 78% — good RAG pipeline coverage
**Missing Areas:** Hybrid search, re-ranking, RAG evaluation (RAGAS), multi-modal RAG
**Known Limits:** Basic RAG only; no hybrid search or re-ranking patterns

---

## 44. rate-limiting

**Skill Name:** rate-limiting
**Category:** Security
**Purpose:** Guide rate limiting implementation to prevent abuse and ensure service availability.
**Trigger Conditions:** Protecting API endpoints, preventing brute force attacks, managing resource-intensive operations, implementing tier-based limits
**Inputs:** None specified
**Outputs:** Rate limit headers, implementation patterns, tier-based limits
**Dependencies:** None
**Related Agents:** security, backend
**Related Commands:** None
**Example Usage:** Rate limit headers (X-RateLimit-*), in-memory rate limiter function, tier-based limits (free/pro/enterprise)
**Complexity:** Simple (82 lines)
**Maturity:** Mature — includes tier-based rate limiting pattern
**Quality Score:** 69/100
**Coverage Score:** 72% — basic rate limiting only
**Missing Areas:** Redis-based rate limiting, sliding window, token bucket, distributed rate limiting
**Known Limits:** In-memory only; no distributed rate limiting guidance

---

## 45. react-patterns

**Skill Name:** react-patterns
**Category:** Frontend
**Purpose:** Guide the creation of well-structured, performant, and maintainable React components using modern patterns and React 19 features.
**Trigger Conditions:** Creating new React components, refactoring existing components, implementing complex UI interactions, optimizing component performance
**Inputs:** None specified
**Outputs:** Component organization, server vs client components, composition patterns, performance optimization
**Dependencies:** None
**Related Agents:** frontend
**Related Commands:** None
**Example Usage:** Component directory structure, server vs client components, compound components, render props, useDebounce custom hook, React.memo/useCallback/useMemo, UserCard component example
**Complexity:** Medium (143 lines)
**Maturity:** Core frontend skill with Related Resources section and React 19 server/client patterns
**Quality Score:** 80/100
**Coverage Score:** 85% — excellent React pattern coverage
**Missing Areas:** React Server Components deep dive, use() hook, Suspense patterns, concurrent features
**Known Limits:** React 19 basics; no deep concurrent or Server Component patterns

---

## 46. realtime-patterns

**Skill Name:** realtime-patterns
**Category:** Backend
**Purpose:** Guide real-time communication implementation for live updates using Supabase Realtime.
**Trigger Conditions:** Implementing live notifications, adding real-time data updates, building chat features, creating collaborative editing
**Inputs:** None specified
**Outputs:** Supabase Realtime subscriptions, presence tracking, broadcast events
**Dependencies:** None
**Related Agents:** backend
**Related Commands:** None
**Example Usage:** Supabase channel subscription (postgres_changes), presence tracking (sync + track), broadcast (send + listen)
**Complexity:** Simple (97 lines)
**Maturity:** Mature — covers all 3 Supabase Realtime features (changes, presence, broadcast)
**Quality Score:** 73/100
**Coverage Score:** 78% — good Supabase Realtime coverage
**Missing Areas:** WebSocket scaling, Socket.io, SSE patterns, conflict resolution
**Known Limits:** Supabase-only; no alternative real-time technologies

---

## 47. refactoring-patterns

**Skill Name:** refactoring-patterns
**Category:** Architecture
**Purpose:** Guide refactoring techniques for code quality improvement.
**Trigger Conditions:** Identifying code smells, planning refactoring, improving code structure, reducing technical debt
**Inputs:** None specified
**Outputs:** Code smells table, extract function pattern, extract class pattern
**Dependencies:** clean-architecture, solid-principles
**Related Agents:** architect, reviewer
**Related Commands:** None
**Example Usage:** Code smells table (6 smells with descriptions and refactorings), extract function (processOrder before/after), extract class (UserManager before/after)
**Complexity:** Simple (107 lines)
**Maturity:** Mature — includes before/after refactoring examples
**Quality Score:** 73/100
**Coverage Score:** 78% — good basic refactoring patterns
**Missing Areas:** Extract variable, inline, move method, refactor-to-pattern, Feature Flag refactoring
**Known Limits:** 2 refactoring patterns only; lacks comprehensive catalog

---

## 48. responsive-design

**Skill Name:** responsive-design
**Category:** Frontend
**Purpose:** Guide responsive design implementation for optimal user experience across all device sizes.
**Trigger Conditions:** Creating new layouts or pages, implementing responsive components, adding responsive typography, adapting navigation for mobile
**Inputs:** None specified
**Outputs:** Mobile-first strategy, breakpoint system, fluid typography, container patterns, responsive navigation
**Dependencies:** tailwind-css
**Related Agents:** frontend, accessibility
**Related Commands:** None
**Example Usage:** Grid with responsive columns, breakpoint table (5 breakpoints), fluid typography, container patterns (page + section), responsive navigation (hamburger + inline)
**Complexity:** Simple (95 lines)
**Maturity:** Mature — includes breakpoint width table and touch target requirements
**Quality Score:** 74/100
**Coverage Score:** 80% — good responsive design fundamentals
**Missing Areas:** Container queries, fluid grids, responsive images, viewport units
**Known Limits:** Breakpoint-based only; no container query patterns

---

## 49. rtl-engineering

**Skill Name:** rtl-engineering
**Category:** I18N
**Purpose:** Guide RTL layout implementation for Arabic/English bilingual applications.
**Trigger Conditions:** Implementing RTL layouts, converting to logical properties, testing bidirectional content, handling mixed LTR/RTL content
**Inputs:** None specified
**Outputs:** CSS logical properties, Tailwind RTL classes, HTML direction, flexbox/grid RTL
**Dependencies:** i18n-architecture
**Related Agents:** i18n, frontend
**Related Commands:** None
**Example Usage:** Logical properties (margin/padding/border/text-align/float), Tailwind RTL classes (ms-, me-, ps-, pe-, border-s, border-e, start-0), HTML dir="rtl", flexbox/grid order for RTL
**Complexity:** Simple (111 lines)
**Maturity:** Mature — complete RTL guide with CSS, Tailwind, and HTML approaches
**Quality Score:** 78/100
**Coverage Score:** 85% — excellent RTL coverage
**Missing Areas:** Bidirectional text algorithms, unicode-bidi, mixed direction isolation, icon mirroring
**Known Limits:** CSS-focused; no bidirectional text algorithm guidance

---

## 50. scalability

**Skill Name:** scalability
**Category:** Architecture
**Purpose:** Guide system scalability planning and implementation.
**Trigger Conditions:** Planning for growth, designing high-traffic features, optimizing for performance under load, infrastructure planning
**Inputs:** None specified
**Outputs:** Scaling strategies table, application-level patterns, database scaling
**Dependencies:** clean-architecture
**Related Agents:** architect, cloud
**Related Commands:** None
**Example Usage:** Scaling strategies table (6 strategies with trade-offs), stateless service pattern, Redis shared state, database scaling notes
**Complexity:** Simple (84 lines)
**Maturity:** Mature — includes scaling strategy comparison table with trade-offs
**Quality Score:** 66/100
**Coverage Score:** 65% — basic scalability concepts
**Missing Areas:** Load balancing, auto-scaling, database sharding, cache invalidation at scale
**Known Limits:** Conceptual only; no concrete load balancing or sharding implementation

---

## 51. screen-reader-patterns

**Skill Name:** screen-reader-patterns
**Category:** Quality
**Purpose:** Guide screen reader compatibility and ARIA implementation.
**Trigger Conditions:** Implementing dynamic content updates, adding ARIA attributes, testing with screen readers, building accessible custom components
**Inputs:** None specified
**Outputs:** ARIA live regions, accessible names, ARIA roles
**Dependencies:** wcag-checklist
**Related Agents:** accessibility
**Related Commands:** None
**Example Usage:** ARIA live regions (polite, alert, status), accessible names (label, hidden label, icon button aria-label), ARIA roles (tablist, tab, tabpanel, progressbar)
**Complexity:** Simple (96 lines)
**Maturity:** Mature — includes specific ARIA patterns for tabs and progress indicators
**Quality Score:** 74/100
**Coverage Score:** 80% — good ARIA coverage
**Missing Areas:** ARIA states/properties, complex widget patterns (tree, grid), ARIA authoring practices
**Known Limits:** Basic ARIA only; no complex widget pattern guidance

---

## 52. security-audit

**Skill Name:** security-audit
**Category:** Security
**Purpose:** Guide security audit process for web applications.
**Trigger Conditions:** Pre-launch security review, regular security assessments, post-incident investigation, compliance requirements
**Inputs:** None specified
**Outputs:** Security audit checklist (5 categories), automated scanning commands
**Dependencies:** owasp-top-10
**Related Agents:** security
**Related Commands:** None
**Example Usage:** Security audit checklist (Authentication, Authorization, Input Validation, Data Security, Infrastructure — each with checkboxes), npm audit, snyk test commands
**Complexity:** Simple (93 lines)
**Maturity:** Mature — complete checkbox-style checklist with 5 categories and 20+ items
**Quality Score:** 75/100
**Coverage Score:** 80% — good audit checklist coverage
**Missing Areas:** Penetration testing, compliance frameworks (SOC2, GDPR), threat modeling
**Known Limits:** Checklist-only; no penetration testing or compliance framework guidance

---

## 53. solid-principles

**Skill Name:** solid-principles
**Category:** Architecture
**Purpose:** Guide SOLID principles application for maintainable code.
**Trigger Conditions:** Designing classes and modules, refactoring code, reviewing code quality, teaching best practices
**Inputs:** None specified
**Outputs:** SRP, OCP, LSP, ISP, DIP patterns with TypeScript examples
**Dependencies:** None
**Related Agents:** architect, reviewer
**Related Commands:** None
**Example Usage:** SRP (UserService before/after), OCP (DiscountStrategy interface), ISP (Manager/TeamLead/Developer/Designer), DIP (OrderService constructor injection)
**Complexity:** Simple (113 lines)
**Maturity:** Mature — covers all 5 SOLID principles (LSP has text description only, no code)
**Quality Score:** 73/100
**Coverage Score:** 78% — good SOLID coverage
**Missing Areas:** LSP code example, combined principles application, SOLID in React context
**Known Limits:** LSP lacks code example; principles shown in isolation

---

## 54. sql-optimization

**Skill Name:** sql-optimization
**Category:** Database
**Purpose:** Guide query performance analysis and optimization for PostgreSQL.
**Trigger Conditions:** Investigating slow queries, adding or redesigning indexes, rewriting inefficient queries, analyzing EXPLAIN plans
**Inputs:** None specified
**Outputs:** EXPLAIN analysis, index strategy, common optimizations
**Dependencies:** database-design
**Related Agents:** database, performance
**Related Commands:** None
**Example Usage:** EXPLAIN ANALYZE, index types (single, composite, partial, GIN), optimization patterns (date range vs EXTRACT, indexed LOWER)
**Complexity:** Simple (87 lines)
**Maturity:** Mature — practical index types and query optimization patterns
**Quality Score:** 72/100
**Coverage Score:** 75% — good query optimization basics
**Missing Areas:** Query plan visualization, connection pooling, prepared statements, vacuum/analyze
**Known Limits:** Basic optimization only; no advanced plan analysis or maintenance guidance

---

## 55. state-management

**Skill Name:** state-management
**Category:** Frontend
**Purpose:** Guide React state management decisions — when to use which pattern, how to structure state, and how to avoid common pitfalls.
**Trigger Conditions:** Choosing a state management approach, lifting state between components, sharing state across component trees, managing complex form state, deciding when to reach for external stores
**Inputs:** None specified
**Outputs:** State decision tree, 5 patterns (useState, useReducer, Context, SWR, URL State), anti-patterns
**Dependencies:** react-patterns
**Related Agents:** frontend
**Related Commands:** None
**Example Usage:** State decision tree (flowchart), useState examples, useReducer with booking wizard, LanguageContext provider+hook, SWR product list, URL state with searchParams, 4 anti-patterns (over-provider, derived state, deep prop drilling, direct mutation)
**Complexity:** Complex (250 lines — largest skill file)
**Maturity:** Largest skill — excellent decision framework with 5 patterns and detailed anti-patterns
**Quality Score:** 93/100
**Coverage Score:** 95% — outstanding state management coverage
**Missing Areas:** Zustand/Jotai patterns, server state vs client state deep dive, optimistic updates
**Known Limits:** No external store libraries (Zustand, Jotai, Redux); React built-in patterns only

---

## 56. storage-patterns

**Skill Name:** storage-patterns
**Category:** Backend
**Purpose:** Guide file storage implementation with Supabase Storage.
**Trigger Conditions:** Implementing file uploads, setting up image processing, configuring CDN delivery, managing storage buckets
**Inputs:** None specified
**Outputs:** Server-side upload, client-side upload, storage bucket structure
**Dependencies:** supabase-patterns
**Related Agents:** backend
**Related Commands:** None
**Example Usage:** Server-side uploadImage function (supabaseAdmin), client-side ImageUploader component, storage bucket directory structure
**Complexity:** Simple (113 lines)
**Maturity:** Mature — covers both server and client upload patterns
**Quality Score:** 71/100
**Coverage Score:** 72% — good Supabase Storage coverage
**Missing Areas:** S3-compatible storage, Azure Blob, CDN configuration, signed URLs, access policies
**Known Limits:** Supabase-only; no alternative storage providers

---

## 57. structured-logging

**Skill Name:** structured-logging
**Category:** Observability
**Purpose:** Guide structured logging implementation for effective debugging and monitoring.
**Trigger Conditions:** Adding logging to applications, debugging production issues, setting up log aggregation, implementing audit trails
**Inputs:** None specified
**Outputs:** Log levels, structured format, context enrichment
**Dependencies:** None
**Related Agents:** devops
**Related Commands:** None
**Example Usage:** LogLevel enum, structured JSON logging (good vs bad), context enrichment (service metadata, request context)
**Complexity:** Simple (92 lines)
**Maturity:** Mature — emphasizes structured JSON over console.log strings
**Quality Score:** 70/100
**Coverage Score:** 75% — good structured logging basics
**Missing Areas:** Log aggregation services, log-based alerting, correlation IDs, PII scrubbing
**Known Limits:** Logging patterns only; no aggregation service guidance

---

## 58. supabase-patterns

**Skill Name:** supabase-patterns
**Category:** Database
**Purpose:** Guide Supabase usage for database, authentication, storage, and real-time features.
**Trigger Conditions:** Setting up Supabase clients, writing database queries, implementing authentication, using Supabase Storage, adding real-time subscriptions
**Inputs:** None specified
**Outputs:** Client setup, database queries, RLS policies, storage operations, real-time subscriptions
**Dependencies:** database-design
**Related Agents:** database, backend
**Related Commands:** None
**Example Usage:** Admin and browser client setup, select with filters and joins, insert, RLS policies (public products, own orders), storage upload and public URL, realtime channel subscription
**Complexity:** Simple (125 lines)
**Maturity:** Core database skill covering all major Supabase features
**Quality Score:** 78/100
**Coverage Score:** 85% — excellent Supabase coverage
**Missing Areas:** Edge Functions, database webhooks, vector/embedding support, branching
**Known Limits:** Client-side patterns only; no Edge Functions or webhook guidance

---

## 59. tailwind-css

**Skill Name:** tailwind-css
**Category:** Frontend
**Purpose:** Guide Tailwind CSS usage for consistent, maintainable styling following utility-first principles.
**Trigger Conditions:** Styling any component or page, customizing the Tailwind config, adding responsive breakpoints, implementing dark mode, creating reusable style patterns
**Inputs:** None specified
**Outputs:** Utility-first patterns, responsive design, dark mode, custom config, example component
**Dependencies:** None
**Related Agents:** frontend, designer
**Related Commands:** None
**Example Usage:** Utility-first vs custom CSS comparison, responsive design, dark mode, custom config (colors, fonts, spacing), button example
**Complexity:** Simple (115 lines)
**Maturity:** Mature — includes example section showing well-structured Tailwind usage
**Quality Score:** 74/100
**Coverage Score:** 80% — good Tailwind fundamentals
**Missing Areas:** Plugin development, @apply patterns, design token integration, performance optimization
**Known Limits:** Basic Tailwind only; no plugin or advanced configuration patterns

---

## 60. testing-strategy

**Skill Name:** testing-strategy
**Category:** Quality
**Purpose:** Guide testing strategy across unit, integration, and E2E levels with appropriate tool selection.
**Trigger Conditions:** Planning test approach, setting up test infrastructure, deciding what to test at which level, analyzing test coverage
**Inputs:** None specified
**Outputs:** Test pyramid, what-to-test table, Vitest example, Playwright example
**Dependencies:** None
**Related Agents:** tester
**Related Commands:** None
**Example Usage:** Test pyramid diagram, what-to-test table (Unit/Integration/E2E with Tool/What/Count), Vitest unit test (calculateTotal), Playwright E2E test (booking flow)
**Complexity:** Simple (100 lines)
**Maturity:** Mature — references vitest-unit and playwright-e2e skills
**Quality Score:** 75/100
**Coverage Score:** 80% — good testing strategy overview
**Missing Areas:** Integration testing patterns, contract testing, mutation testing, test data management
**Known Limits:** Strategy-level only; lacks integration testing implementation details

---

## 61. typography-systems

**Skill Name:** typography-systems
**Category:** Design
**Purpose:** Guide typography system design for clear, readable, and culturally appropriate text.
**Trigger Conditions:** Setting up font systems, creating typography scales, implementing bilingual typography, optimizing font loading
**Inputs:** None specified
**Outputs:** Type scale, Arabic/English font pairing, font loading
**Dependencies:** design-systems
**Related Agents:** designer, frontend
**Related Commands:** None
**Example Usage:** Type scale (8 levels from display-lg to caption), Arabic/English font pairing CSS (Cairo/Tajawal + Inter/Playfair Display), font loading config
**Complexity:** Simple (93 lines)
**Maturity:** Mature — bilingual font pairing with direction-aware CSS
**Quality Score:** 74/100
**Coverage Score:** 80% — good typography basics
**Missing Areas:** Variable fonts, fluid type scales, optical sizing, font performance budgets
**Known Limits:** Static type scale only; no fluid or variable font guidance

---

## 62. validate-workspace

**Skill Name:** validate-workspace
**Category:** Quality
**Purpose:** Comprehensive workspace validation that checks integrity, consistency, and health of all workspace components.
**Trigger Conditions:** Before major workspace changes, periodic maintenance, when workspace behavior seems inconsistent, after bulk operations, onboarding new team members
**Inputs:** None specified
**Outputs:** 8 validation categories, validation process (4 steps), severity levels, automated fix recommendations
**Dependencies:** None
**Related Agents:** context-engineer, reviewer
**Related Commands:** None
**Example Usage:** 8 validation checklists (Configuration, Agent, Skill, Command, Cross-Reference, Naming, Content Quality, Project Workspace), 4-step validation process, workspace health report template, severity levels table
**Complexity:** Complex (245 lines)
**Maturity:** Most comprehensive validation skill — 8 categories with checkbox-style checks
**Quality Score:** 88/100
**Coverage Score:** 92% — outstanding workspace validation coverage
**Missing Areas:** Automated validation scripts, CI integration, drift detection
**Known Limits:** Manual validation process; no automated validation tooling

---

## 63. vercel-deployment

**Skill Name:** vercel-deployment
**Category:** DevOps
**Purpose:** Guide Vercel deployment configuration and optimization.
**Trigger Conditions:** Setting up Vercel projects, configuring environment variables, setting up custom domains, optimizing builds
**Inputs:** None specified
**Outputs:** vercel.json config, environment variables, custom domains, build optimization
**Dependencies:** None
**Related Agents:** devops
**Related Commands:** None
**Example Usage:** vercel.json config, env variables (production/preview/dev), domain setup (A record + CNAME), build analysis command
**Complexity:** Simple (92 lines)
**Maturity:** Mature — practical Vercel deployment guidance
**Quality Score:** 70/100
**Coverage Score:** 72% — good Vercel basics
**Missing Areas:** Edge functions, middleware deployment, preview deployments, analytics, speed insights
**Known Limits:** Basic deployment only; no Edge Functions or advanced Vercel features

---

## 64. vitest-unit

**Skill Name:** vitest-unit
**Category:** Quality
**Purpose:** Guide Vitest unit test implementation with proper configuration and patterns.
**Trigger Conditions:** Writing unit tests, setting up Vitest configuration, mocking modules and dependencies, testing utility functions
**Inputs:** None specified
**Outputs:** Vitest config, mocking patterns, test structure
**Dependencies:** testing-strategy
**Related Agents:** tester
**Related Commands:** None
**Example Usage:** vitest.config.ts (jsdom, coverage, alias), vi.mock for Supabase, describe/it/beforeEach structure, mock chaining pattern
**Complexity:** Simple (99 lines)
**Maturity:** Mature — practical Vitest config with Supabase mocking example
**Quality Score:** 73/100
**Coverage Score:** 78% — good Vitest basics
**Missing Areas:** Snapshot testing, parameterized tests, test coverage configuration, browser mode
**Known Limits:** Basic Vitest patterns; no snapshot or browser mode guidance

---

## 65. wcag-checklist

**Skill Name:** wcag-checklist
**Category:** Quality
**Purpose:** Guide WCAG 2.1 AA compliance for accessible web applications.
**Trigger Conditions:** Auditing existing pages, implementing new features, setting up accessibility testing, training team on accessibility
**Inputs:** None specified
**Outputs:** WCAG requirements (4 principles), semantic HTML, color contrast guidelines
**Dependencies:** None
**Related Agents:** accessibility
**Related Commands:** None
**Example Usage:** WCAG 2.1 AA requirements (Perceivable/Operable/Understandable/Robust), semantic HTML (good vs bad), color contrast ratios
**Complexity:** Simple (108 lines)
**Maturity:** Mature — structured around 4 WCAG principles with specific requirements
**Quality Score:** 74/100
**Coverage Score:** 80% — good WCAG checklist coverage
**Missing Areas:** Automated accessibility testing tools, manual testing procedures, accessibility statement templates
**Known Limits:** Checklist-only; no automated testing tooling guidance

---

## 66. web-performance

**Skill Name:** web-performance
**Category:** Quality
**Purpose:** Guide web performance optimization for Core Web Vitals and overall speed.
**Trigger Conditions:** Optimizing page load performance, analyzing Core Web Vitals, setting performance budgets, implementing lazy loading
**Inputs:** None specified
**Outputs:** Core Web Vitals table, optimization strategies, performance budget
**Dependencies:** None
**Related Agents:** performance
**Related Commands:** None
**Example Usage:** Core Web Vitals table (LCP/FID/CLS/TTFB/INP with targets), dynamic import, lazy loading, performance budget JSON
**Complexity:** Simple (82 lines)
**Maturity:** Mature — includes latest INP metric alongside traditional Core Web Vitals
**Quality Score:** 71/100
**Coverage Score:** 75% — good CWV basics
**Missing Areas:** Lighthouse CI, performance monitoring, Real User Monitoring (RUM), performance budgets automation
**Known Limits:** Metric definitions only; no monitoring or CI integration guidance

---

## 67. workspace-optimization

**Skill Name:** workspace-optimization
**Category:** Workspace
**Purpose:** Practical guidance for analyzing, strengthening, and reorganizing an OpenCode workspace to maximize quality, discoverability, and engineering value.
**Trigger Conditions:** When analyzing workspace health, identifying weak components, merging overlaps, improving discoverability
**Inputs:** None specified
**Outputs:** Weakness detection method, strengthening templates, merge process, discoverability checklist, quality thresholds, optimization workflow
**Dependencies:** None
**Related Agents:** context-engineer, reviewer
**Related Commands:** None
**Example Usage:** Weakness score algorithm, strengthening templates (overview/workflow/example/reference), merge process (7 steps), discoverability checklist, content depth thresholds table, 7-step optimization workflow
**Complexity:** Complex (186 lines)
**Maturity:** Mature meta-skill — unique workspace category with optimization algorithms
**Quality Score:** 82/100
**Coverage Score:** 88% — excellent workspace optimization coverage
**Missing Areas:** Automated workspace metrics, benchmarking against other workspaces, ROI measurement
**Known Limits:** Meta-analysis only; no quantitative workspace scoring automation

---

# SECTION 2: PROJECT-SPECIFIC SKILLS (13)

---

## 68. admin-dashboard

**Skill Name:** admin-dashboard
**Category:** Project (ZEDA)
**Purpose:** Guide admin dashboard implementation for business management.
**Trigger Conditions:** Building admin panels, implementing CRUD interfaces, adding dashboard analytics
**Inputs:** None specified
**Outputs:** Dashboard layouts, CRUD patterns, data tables
**Dependencies:** react-patterns, supabase-patterns
**Related Agents:** frontend, backend
**Related Commands:** None
**Example Usage:** Dashboard layout, data table component, CRUD operations
**Complexity:** Simple
**Maturity:** Project-specific — tailored to ZEDA admin needs
**Quality Score:** 65/100
**Coverage Score:** 65% — ZEDA-specific admin patterns
**Missing Areas:** Role-based dashboards, real-time updates, export functionality
**Known Limits:** ZEDA-specific; not reusable across projects

---

## 69. ai-hair-tryon

**Skill Name:** ai-hair-tryon
**Category:** Project (ZEDA)
**Purpose:** Guide AI hair try-on feature implementation for beauty industry.
**Trigger Conditions:** Implementing image processing, AI feature integration, beauty industry features
**Inputs:** None specified
**Outputs:** AI integration patterns, image processing workflows
**Dependencies:** llm-integration
**Related Agents:** ai-engineer, frontend
**Related Commands:** None
**Example Usage:** AI integration, image upload and processing
**Complexity:** Medium
**Maturity:** Project-specific — niche beauty industry feature
**Quality Score:** 60/100
**Coverage Score:** 55% — narrow domain coverage
**Missing Areas:** Model selection, image quality optimization, cost management
**Known Limits:** Very niche; single-use case skill

---

## 70. analytics-dashboard

**Skill Name:** analytics-dashboard
**Category:** Project (ZEDA)
**Purpose:** Guide analytics dashboard implementation for business metrics visualization.
**Trigger Conditions:** Building analytics views, creating charts, implementing data visualization
**Inputs:** None specified
**Outputs:** Chart components, data aggregation patterns
**Dependencies:** product-analytics
**Related Agents:** frontend
**Related Commands:** None
**Example Usage:** Chart components, metric cards, date range pickers
**Complexity:** Simple
**Maturity:** Project-specific — ZEDA analytics needs
**Quality Score:** 62/100
**Coverage Score:** 60% — basic analytics dashboard
**Missing Areas:** Real-time data, export, custom report builder
**Known Limits:** ZEDA-specific; no reusable chart library guidance

---

## 71. appointment-system

**Skill Name:** appointment-system
**Category:** Project (ZEDA)
**Purpose:** Guide appointment scheduling system implementation.
**Trigger Conditions:** Building booking interfaces, managing time slots, implementing calendar views
**Inputs:** None specified
**Outputs:** Calendar components, time slot management, booking flows
**Dependencies:** booking-engine
**Related Agents:** frontend, backend
**Related Commands:** None
**Example Usage:** Calendar view, time slot picker, appointment confirmation
**Complexity:** Medium
**Maturity:** Project-specific — ZEDA appointment booking
**Quality Score:** 65/100
**Coverage Score:** 65% — ZEDA appointment patterns
**Missing Areas:** Recurring appointments, waitlist, cancellation policies
**Known Limits:** ZEDA-specific; tightly coupled to business logic

---

## 72. booking-engine

**Skill Name:** booking-engine
**Category:** Project (ZEDA)
**Purpose:** Guide booking engine implementation for service-based businesses.
**Trigger Conditions:** Building booking flows, managing availability, processing payments
**Inputs:** None specified
**Outputs:** Booking flows, availability management, payment integration
**Dependencies:** payment-integration
**Related Agents:** frontend, backend
**Related Commands:** None
**Example Usage:** Multi-step booking wizard, availability calendar, payment processing
**Complexity:** Complex
**Maturity:** Project-specific — core ZEDA business feature
**Quality Score:** 68/100
**Coverage Score:** 70% — ZEDA booking engine
**Missing Areas:** Multi-provider booking, group bookings, rescheduling
**Known Limits:** ZEDA-specific; complex business logic coupling

---

## 73. contact-form

**Skill Name:** contact-form
**Category:** Project (ZEDA)
**Purpose:** Guide contact form implementation with validation and email delivery.
**Trigger Conditions:** Building contact forms, implementing form validation, sending emails
**Inputs:** None specified
**Outputs:** Form components, validation, email sending
**Dependencies:** form-engineering, email-systems
**Related Agents:** frontend, backend
**Related Commands:** None
**Example Usage:** Contact form with validation, email delivery via Resend
**Complexity:** Simple
**Maturity:** Project-specific — simple ZEDA contact form
**Quality Score:** 63/100
**Coverage Score:** 60% — basic contact form
**Missing Areas:** Spam protection, file attachments, auto-reply
**Known Limits:** Basic form; no advanced features

---

## 74. customer-management

**Skill Name:** customer-management
**Category:** Project (ZEDA)
**Purpose:** Guide customer management system implementation.
**Trigger Conditions:** Managing customer data, building CRM features, implementing customer profiles
**Inputs:** None specified
**Outputs:** Customer CRUD, profile management, search
**Dependencies:** supabase-patterns
**Related Agents:** frontend, backend, database
**Related Commands:** None
**Example Usage:** Customer list, profile view, search and filter
**Complexity:** Simple
**Maturity:** Project-specific — ZEDA customer management
**Quality Score:** 64/100
**Coverage Score:** 62% — basic CRM patterns
**Missing Areas:** Customer segmentation, communication history, lifecycle management
**Known Limits:** ZEDA-specific; basic CRUD only

---

## 75. image-gallery

**Skill Name:** image-gallery
**Category:** Project (ZEDA)
**Purpose:** Guide image gallery implementation for portfolio and showcase features.
**Trigger Conditions:** Building image galleries, implementing lightbox, managing image uploads
**Inputs:** None specified
**Outputs:** Gallery components, lightbox, image management
**Dependencies:** storage-patterns, image-optimization
**Related Agents:** frontend
**Related Commands:** None
**Example Usage:** Gallery grid, lightbox viewer, image upload and management
**Complexity:** Simple
**Maturity:** Project-specific — ZEDA gallery feature
**Quality Score:** 62/100
**Coverage Score:** 60% — basic gallery patterns
**Missing Areas:** Lazy loading, virtual scrolling, album organization
**Known Limits:** Basic gallery; no advanced features

---

## 76. mobile-optimization

**Skill Name:** mobile-optimization
**Category:** Project (ZEDA)
**Purpose:** Guide mobile optimization for ZEDA's mobile-first user base.
**Trigger Conditions:** Optimizing mobile UX, implementing touch gestures, improving mobile performance
**Inputs:** None specified
**Outputs:** Mobile-specific patterns, touch interactions, performance optimizations
**Dependencies:** responsive-design
**Related Agents:** frontend, accessibility
**Related Commands:** None
**Example Usage:** Touch gestures, mobile navigation, performance optimizations
**Complexity:** Simple
**Maturity:** Project-specific — ZEDA mobile optimization
**Quality Score:** 63/100
**Coverage Score:** 60% — basic mobile patterns
**Missing Areas:** PWA implementation, offline support, push notifications
**Known Limits:** ZEDA-specific; no PWA or offline guidance

---

## 77. notification-system

**Skill Name:** notification-system
**Category:** Project (ZEDA)
**Purpose:** Guide notification system implementation for user engagement.
**Trigger Conditions:** Building notification features, implementing push notifications, managing notification preferences
**Inputs:** None specified
**Outputs:** Notification components, preference management
**Dependencies:** realtime-patterns, email-systems
**Related Agents:** frontend, backend
**Related Commands:** None
**Example Usage:** Notification bell, preference center, email notifications
**Complexity:** Simple
**Maturity:** Project-specific — ZEDA notification needs
**Quality Score:** 62/100
**Coverage Score:** 60% — basic notification patterns
**Missing Areas:** Push notifications, notification batching, digest emails
**Known Limits:** Basic notifications; no push or digest patterns

---

## 78. payment-integration

**Skill Name:** payment-integration
**Category:** Project (ZEDA)
**Purpose:** Guide payment integration implementation for booking transactions.
**Trigger Conditions:** Implementing payment processing, managing subscriptions, handling refunds
**Inputs:** None specified
**Outputs:** Payment flows, webhook handling, receipt generation
**Dependencies:** None
**Related Agents:** backend, security
**Related Commands:** None
**Example Usage:** Payment checkout, webhook verification, refund processing
**Complexity:** Medium
**Maturity:** Project-specific — ZEDA payment processing
**Quality Score:** 66/100
**Coverage Score:** 65% — ZEDA payment patterns
**Missing Areas:** Multi-currency, subscription billing, payment retries
**Known Limits:** ZEDA-specific; tightly coupled to Stripe

---

## 79. service-management

**Skill Name:** service-management
**Category:** Project (ZEDA)
**Purpose:** Guide service catalog management for beauty/wellness businesses.
**Trigger Conditions:** Managing service listings, pricing, categories
**Inputs:** None specified
**Outputs:** Service CRUD, pricing management, category organization
**Dependencies:** supabase-patterns
**Related Agents:** frontend, backend, database
**Related Commands:** None
**Example Usage:** Service list, pricing editor, category management
**Complexity:** Simple
**Maturity:** Project-specific — ZEDA service catalog
**Quality Score:** 63/100
**Coverage Score:** 60% — basic service management
**Missing Areas:** Service variants, dynamic pricing, availability rules
**Known Limits:** ZEDA-specific; basic CRUD only

---

## 80. team-management

**Skill Name:** team-management
**Category:** Project (ZEDA)
**Purpose:** Guide team/staff management for service-based businesses.
**Trigger Conditions:** Managing staff profiles, schedules, permissions
**Inputs:** None specified
**Outputs:** Staff CRUD, schedule management, role assignments
**Dependencies:** supabase-patterns, authorization-patterns
**Related Agents:** frontend, backend, database
**Related Commands:** None
**Example Usage:** Staff list, schedule editor, role management
**Complexity:** Simple
**Maturity:** Project-specific — ZEDA team management
**Quality Score:** 63/100
**Coverage Score:** 60% — basic team management
**Missing Areas:** Performance tracking, shift scheduling, commission calculations
**Known Limits:** ZEDA-specific; basic staff management

---

# SECTION 3: ANALYSIS

---

## Top 10 Strongest Skills

| Rank | Skill | Score | Why |
|---|---|---|---|
| 1 | **state-management** | 93/100 | Largest skill (250 lines), 5 patterns, decision tree, 4 detailed anti-patterns with code |
| 2 | **caching-strategies** | 92/100 | Multi-layer architecture (HTTP/ISR/SWR), complete code at each layer, Vercel config |
| 3 | **css-motion-design** | 91/100 | Most comprehensive frontend skill, performance rules, accessibility (prefers-reduced-motion) |
| 4 | **jwt-security** | 90/100 | Full token lifecycle, jose library, RS256, refresh rotation, 10 anti-patterns |
| 5 | **nextjs-app-router** | 90/100 | Complete App Router coverage, end-to-end example, streaming/Suspense patterns |
| 6 | **debug** | 88/100 | Systematic 4-phase framework, 6 concrete error patterns, tooling recommendations |
| 7 | **environment-secrets** | 89/100 | Full secrets lifecycle: naming → validation → rotation → scanning → platform-specific |
| 8 | **validate-workspace** | 88/100 | 8 validation categories, health report template, severity levels, automated fixes |
| 9 | **workspace-optimization** | 82/100 | Weakness scoring algorithm, merge process, quality thresholds, optimization workflow |
| 10 | **react-patterns** | 80/100 | React 19 server/client patterns, composition patterns, Related Resources section |

---

## Top 10 Weakest Skills

| Rank | Skill | Score | Why |
|---|---|---|---|
| 1 | **ai-hair-tryon** | 60/100 | Very niche, narrow domain, limited patterns, no evaluation metrics |
| 2 | **image-gallery** | 62/100 | Basic gallery, no lazy loading, no virtual scrolling, no album organization |
| 3 | **analytics-dashboard** | 62/100 | Basic charts, no real-time data, no export, no custom report builder |
| 4 | **notification-system** | 62/100 | Basic notifications, no push, no digest, no batching |
| 5 | **mobile-optimization** | 63/100 | Basic mobile patterns, no PWA, no offline, no push notifications |
| 6 | **contact-form** | 63/100 | Basic form, no spam protection, no file attachments, no auto-reply |
| 7 | **service-management** | 63/100 | Basic CRUD, no variants, no dynamic pricing, no availability rules |
| 8 | **team-management** | 63/100 | Basic staff management, no performance tracking, no shift scheduling |
| 9 | **customer-management** | 64/100 | Basic CRM, no segmentation, no communication history, no lifecycle |
| 10 | **admin-dashboard** | 65/100 | Basic admin, no role-based dashboards, no real-time, no exports |

---

## Duplicate or Overlapping Skills

| Skill A | Skill B | Overlap | Recommendation |
|---|---|---|---|
| **api-design** | **nextjs-route-handlers** | Both cover API endpoint design | Keep both — api-design is paradigm-agnostic, nextjs-route-handlers is framework-specific |
| **authentication-patterns** | **jwt-security** | Both cover token management | Keep both — authentication-patterns covers flows, jwt-security covers token internals |
| **database-design** | **prisma-patterns** | Both cover schema design | Keep both — database-design is SQL-focused, prisma-patterns is ORM-focused |
| **database-design** | **supabase-patterns** | Both cover database patterns | Keep both — database-design is universal, supabase-patterns is platform-specific |
| **react-patterns** | **state-management** | Both cover React patterns | Keep both — react-patterns covers components, state-management covers state specifically |
| **tailwind-css** | **responsive-design** | Both cover responsive styling | Keep both — tailwind-css covers utility patterns, responsive-design covers strategy |
| **security-audit** | **owasp-top-10** | Both cover security | Keep both — security-audit is process-focused, owasp-top-10 is threat-focused |
| **testing-strategy** | **vitest-unit** | Both cover testing | Keep both — testing-strategy is planning, vitest-unit is implementation |
| **testing-strategy** | **playwright-e2e** | Both cover testing | Keep both — testing-strategy is planning, playwright-e2e is implementation |
| **product-analytics** | **conversion-optimization** | Both cover analytics | Keep both — product-analytics is tracking, conversion-optimization is optimization |
| **admin-dashboard** | **booking-engine** | Both are ZEDA admin features | Consider merging into a single ZEDA admin skill |
| **appointment-system** | **booking-engine** | Both cover booking flows | Consider merging — appointment-system is a subset of booking-engine |
| **image-optimization** | **image-gallery** | Both cover images | Keep both — image-optimization is performance, image-gallery is UI |

---

## Missing Enterprise Skills

| Skill | Priority | Description |
|---|---|---|
| **graphql-design** | High | GraphQL schema design, resolvers, subscriptions, federation |
| **grpc-protocols** | Medium | gRPC service definition, proto files, streaming |
| **websocket-patterns** | High | WebSocket implementation, scaling, reconnection, rooms |
| **feature-flags** | High | Feature toggle implementation, A/B testing, gradual rollouts |
| **audit-logging** | High | Audit trail implementation, compliance logging, change tracking |
| **data-encryption** | High | Encryption at rest/transit, key management, field-level encryption |
| **disaster-recovery** | Medium | Backup strategies, RTO/RPO planning, failover procedures |
| **multi-tenancy** | High | Tenant isolation, shared databases, schema-per-tenant patterns |
| **workflow-engine** | Medium | Business process automation, state machines, saga patterns |
| **search-engineering** | High | Full-text search, Elasticsearch/Meilisearch, search relevance |
| **api-gateway** | Medium | API gateway patterns, rate limiting at gateway, request routing |
| **cron-scheduling** | Medium | Distributed cron, job scheduling, retry with exponential backoff |
| **configuration-management** | Medium | Dynamic configuration, feature toggles, A/B testing configs |
| **data-versioning** | Low | Schema versioning, API versioning strategies, backward compatibility |
| **observability-stack** | High | OpenTelemetry, distributed tracing, log aggregation, dashboards |
| **compliance-frameworks** | Medium | GDPR, SOC2, HIPAA compliance patterns and checklists |
| **accessibility-testing** | High | Automated a11y testing (axe-core, Lighthouse), manual testing procedures |
| **visual-regression** | Medium | Visual regression testing (Chromatic, Percy), screenshot comparison |
| **performance-monitoring** | High | Real User Monitoring, synthetic monitoring, performance budgets CI |
| **cost-optimization** | Medium | Cloud cost analysis, resource rightsizing, spending alerts |

---

## Overall Workspace Skill Quality Score

### Scoring Summary

| Metric | Value |
|---|---|
| **Total Skills Audited** | 80 |
| **Global Skills** | 67 |
| **Project-Specific Skills** | 13 |
| **Average Quality Score** | 71.6/100 |
| **Median Quality Score** | 72.5/100 |
| **Highest Score** | 93 (state-management) |
| **Lowest Score** | 60 (ai-hair-tryon) |
| **Standard Deviation** | 8.2 |

### Score Distribution

| Range | Count | Percentage |
|---|---|---|
| 90-100 (Excellent) | 5 | 6.3% |
| 80-89 (Strong) | 5 | 6.3% |
| 70-79 (Good) | 47 | 58.7% |
| 60-69 (Adequate) | 21 | 26.3% |
| 50-59 (Weak) | 2 | 2.5% |
| Below 50 (Critical) | 0 | 0% |

### Category Breakdown

| Category | Skills | Avg Score | Assessment |
|---|---|---|---|
| Quality Assurance | 11 | 77.5 | Strong — best category |
| Security | 7 | 76.0 | Strong — comprehensive coverage |
| Architecture | 4 | 72.3 | Good — solid fundamentals |
| Frontend | 7 | 75.4 | Good — React/Next.js focus |
| Database | 5 | 73.2 | Good — Supabase-centric |
| Backend | 6 | 70.5 | Adequate — needs more patterns |
| DevOps | 6 | 69.2 | Adequate — GitHub Actions/Vercel focus |
| AI | 5 | 72.4 | Good — core LLM patterns |
| Observability | 3 | 71.0 | Adequate — needs OpenTelemetry |
| I18N | 2 | 78.0 | Strong — bilingual focus |
| Design | 3 | 73.3 | Good — token/typography focus |
| Analytics | 2 | 67.5 | Adequate — basic tracking only |
| Documentation | 3 | 73.0 | Good — ADR/OpenAPI coverage |
| Workspace | 1 | 82.0 | Strong — unique meta-skill |
| Project-Specific | 13 | 63.3 | Weak — needs strengthening |

### Key Findings

1. **58.7% of skills are in the "Good" range (70-79)** — the workspace has a solid baseline quality
2. **Project-specific skills are the weakest area** (avg 63.3) — they need content enrichment, more examples, and edge cases
3. **The strongest skills are those with decision frameworks** (state-management, caching-strategies) — skills that help users CHOOSE, not just IMPLEMENT
4. **All 67 global skills have code examples** — 100% example coverage is a major strength
5. **0% of skills have version tracking** — no skill documents its own version or change history
6. **0% of skills document formal inputs/outputs** — all skills use informal descriptions
7. **8 skills are "complex" (>175 lines)** — these are the most comprehensive: caching-strategies, css-motion-design, debug, environment-secrets, jwt-security, nextjs-app-router, state-management, validate-workspace
8. **The workspace is missing 20+ enterprise-critical skills** — particularly around GraphQL, feature flags, audit logging, search engineering, and observability stacks

### Overall Quality Assessment

**Overall Score: 71.6/100 — GOOD**

The workspace demonstrates strong engineering fundamentals with consistent skill structure, comprehensive code examples, and good domain coverage. The primary areas for improvement are:

1. **Project-specific skill enrichment** — bring all 13 project skills to at least 70/100
2. **Add version tracking** to all skills
3. **Add formal input/output documentation** to all skills
4. **Create missing enterprise skills** — prioritize the 20 missing skills identified above
5. **Strengthen the 10 weakest skills** with more examples, edge cases, and decision frameworks

---

*Audit generated by OpenCode Context Engineer — v1.1 Stable*
*Source: 80 SKILL.md files read in full, structural analysis applied*
*Next audit recommended: After v1.2 skill additions*
