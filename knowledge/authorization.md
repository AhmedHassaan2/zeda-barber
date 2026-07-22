# Authorization Patterns — Knowledge Base

## Purpose

Authorization determines what an authenticated user is allowed to do. This knowledge base covers authorization models, implementation patterns in Next.js/Supabase applications, and strategies for enforcing access control at every layer of the application stack.

## Core Concepts

### Authorization Models

**Role-Based Access Control (RBAC)**
Users are assigned roles; roles define permissions. Simple, widely understood, and sufficient for most applications.
- Example: `admin`, `editor`, `viewer` roles with associated permission sets
- Scales by adding roles, not individual permissions

**Attribute-Based Access Control (ABAC)**
Access decisions based on attributes of users, resources, and environment. More flexible than RBAC but complex to implement.
- Example: "Allow access if user.department === resource.department AND time is during business hours"
- Policy engines like Open Policy Agent (OPA) evaluate attributes

**Permission-Based Access Control (PBAC)**
Fine-grained permissions attached directly to users or resources. Combines flexibility of ABAC with simplicity.
- Example: `user:123:read:document:456` — specific user, specific action, specific resource

### Role Hierarchy

Roles can inherit permissions from parent roles, forming a tree structure.

```
super_admin
  └── admin
        ├── editor
        │     └── viewer
        └── moderator
```

Inherited permissions reduce duplication; a user with `admin` role automatically has `editor` and `viewer` permissions.

### Permission Model

Permissions consist of three components:
- **Subject** — Who is requesting (user, role, group)
- **Action** — What operation (create, read, update, delete, manage)
- **Resource** — What is being accessed (document, user, settings)

Permission checks evaluate: `can(subject, action, resource) → boolean`

### Row-Level Security (RLS)

Database-level authorization that filters rows based on the requesting user's identity. Supabase/PostgreSQL RLS policies execute as part of every query.

**RLS policy structure:**
```sql
CREATE POLICY "users_can_read_own_orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);
```

### Middleware-Based Authorization

Next.js middleware runs before route handlers, providing a centralized authorization checkpoint at the edge.

### Resource-Level Access Control

Fine-grained control over individual resources, not just resource types. Users may own specific documents, not just have "read documents" permission.

## Best Practices

1. **Centralize authorization logic** — Never scatter permission checks across components; use middleware, API guards, or a shared authorization service
2. **Implement deny-by-default** — All access is denied unless explicitly granted; add permissions positively rather than removing denials
3. **Use Supabase RLS for data-level access** — RLS policies enforce access at the database level, preventing data leakage even if application code has bugs
4. **Separate authentication from authorization** — Verify identity (authN) first, then check permissions (authZ); don't combine these checks
5. **Validate authorization on every API call** — Client-side UI hiding is not security; every endpoint must independently verify permissions
6. **Use principle of least privilege** — Users get minimum required permissions; promote explicitly rather than giving broad access by default
7. **Implement audit logging for access control** — Log who accessed what, when, and whether access was granted or denied; essential for compliance
8. **Cache authorization decisions carefully** — Permissions change; use short TTLs (seconds to minutes) and invalidate on role/permission changes

## Anti-Patterns

1. **Checking permissions only in the UI** — Hiding buttons without server-side enforcement means any API call bypasses authorization; always enforce server-side
2. **Using client-provided user IDs for access control** — Never trust the client to declare who they are; extract user identity from verified tokens or session
3. **Hardcoding role names in conditionals** — Scattered `if (role === 'admin')` checks are fragile and inconsistent; use a centralized permission system
4. **Granting superadmin access for convenience** — Administrative shortcuts create security risks; use scoped test accounts instead
5. **Ignoring tenant isolation in multi-tenant apps** — Every query must be scoped to the tenant; missing this causes data leakage between organizations
6. **Using OR logic when combining access rules** — Multiple access conditions with OR can over-permit; prefer AND logic that requires all conditions to be met
7. **Not handling permission changes in real-time** — If a user's role changes, active sessions must reflect new permissions; invalidate cached permissions
8. **Exposing internal resource identifiers** — UUIDs in URLs can still be enumerated; combine with RLS so even correct IDs don't grant unauthorized access

## Common Mistakes

1. **Forgetting RLS policies on new tables** — Every new Supabase table should have RLS enabled and policies defined before deployment
2. **Using service role key for user operations** — `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS; only use for legitimate server-side admin tasks
3. **Not handling role changes during active sessions** — When admin revokes a user's role, the user's current session should be invalidated or re-validated
4. **Over-relying on middleware for authorization** — Middleware checks route-level access but not resource-level; combine with RLS or handler-level checks
5. **Leaking data through error messages** — "Document not found" vs "Access denied" reveals whether a resource exists; return the same message for both cases
6. **Forgetting about read vs write permissions** — Read access doesn't imply write access; always check the specific action being performed
7. **Not implementing organizational scoping** — Multi-tenant apps must scope every query to the organization; missing this causes cross-tenant data exposure
8. **Using JWT claims without server-side verification** — Client-side JWT manipulation is trivial; always verify tokens server-side before trusting claims

## Decision Guidelines

| Scenario | Recommended Approach |
|---|---|
| Simple CRUD app | RBAC with 3-5 roles + Supabase RLS |
| Multi-tenant SaaS | RLS with tenant_id column + organization middleware |
| Complex permissions (healthcare/finance) | ABAC or PBAC with policy engine |
| Admin panel | RBAC with role hierarchy + audit logging |
| Public API with rate limits | API key authentication + scope-based authorization |
| Content management system | Resource-level ownership + role-based access |
| Real-time collaborative apps | Permission checks on every WebSocket event |

## References

- Supabase RLS Documentation: https://supabase.com/docs/guides/auth/row-level-security
- NIST RBAC Standard (ANSI/INCITS 359-2001)
- OWASP Authorization Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- Open Policy Agent: https://www.openpolicyagent.org/
- Casbin (Authorization Library): https://casbin.org/
- Next.js Middleware Documentation: https://nextjs.org/docs/app/building-your-application/routing/middleware

## Practical Notes

- **Supabase RLS setup:** Enable RLS on every table immediately; create migration files with policies alongside table creation
- **Middleware pattern:** Use Next.js middleware to check authentication; use Supabase RLS for authorization — these are complementary layers
- **Testing authorization:** Write tests that verify User A cannot access User B's resources; test role transitions and permission boundary cases
- **Migration strategy:** When introducing authorization to an existing app, start with RLS policies, then add API-level checks, then UI restrictions
- **Performance:** RLS adds minimal overhead (microseconds per query); middleware authorization runs at the edge with negligible latency
