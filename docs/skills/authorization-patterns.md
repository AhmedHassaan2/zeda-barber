---
title: Authorization patterns, role-based access control (RBAC), and permission management
description: Authorization patterns, role-based access control (RBAC), and permission management
---

# Authorization patterns, role-based access control (RBAC), and permission management

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>authorization-patterns</code> | <strong>Category:</strong> security | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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
