---
name: authorization-patterns
description: Authorization patterns, role-based access control (RBAC), and permission management
category: security
level: concept
priority: high
dependencies: ["authentication-patterns"]
related_skills: ["authentication-patterns", "owasp-top-10"]
related_agents: ["security", "backend"]
activation_rules:
  - keywords: ["authorization", "RBAC", "permission", "role", "access control"]
---

# Authorization Patterns

## Purpose

Guide authorization implementation for role-based access control.

## When to Use

- Implementing role-based access
- Managing permissions
- Protecting routes and resources
- Auditing access control

## Core Concepts

### Role-Based Access Control

```typescript
type Role = 'admin' | 'staff' | 'customer';

const permissions = {
  admin: ['read', 'write', 'delete', 'manage_users', 'manage_services'],
  staff: ['read', 'write', 'manage_appointments'],
  customer: ['read', 'book_appointments'],
};

function hasPermission(role: Role, permission: string): boolean {
  return permissions[role]?.includes(permission) ?? false;
}
```

### Route Protection

```typescript
// Middleware-based
export function withAuth(handler: Function, requiredRole: Role) {
  return async (request: Request) => {
    const user = await getUser(request);
    if (!user || !hasPermission(user.role, requiredRole)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return handler(request);
  };
}
```

### Supabase RLS

```sql
-- Admin can see everything
CREATE POLICY "Admin access" ON products
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Staff can manage appointments
CREATE POLICY "Staff appointments" ON appointments
  FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM staff_users)
  );

-- Customers can see their own bookings
CREATE POLICY "Customer bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);
```

## Best Practices

- Implement least privilege principle
- Check authorization at every entry point
- Use RLS in Supabase for data-level access
- Audit access logs regularly
- Document permission requirements
- Test unauthorized access scenarios

## Anti-Patterns

- Client-side only authorization
- Not checking permissions server-side
- Hardcoded roles without flexibility
- Not auditing access attempts
- Overly permissive defaults
