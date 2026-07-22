---
name: api-design
description: REST API design principles, resource modeling, versioning, error contracts, and documentation
category: backend
level: concept
priority: high
dependencies: []
related_skills: ["nextjs-route-handlers", "authentication-patterns"]
related_agents: ["api-designer", "backend"]
activation_rules:
  - keywords: ["API", "endpoint", "route", "REST", "resource", "CRUD", "HTTP"]
  - file_pattern: "src/app/api/**/*"
---

# API Design

## Purpose

Guide REST API design with consistent conventions, proper error handling, and clear documentation.

## When to Use

- Designing new API endpoints
- Reviewing existing API structure
- Planning API versioning
- Documenting API contracts

## Core Concepts

### RESTful Resource Naming

```
GET    /api/products           → List products
GET    /api/products/:id       → Get single product
POST   /api/products           → Create product
PUT    /api/products/:id       → Update product
DELETE /api/products/:id       → Delete product

GET    /api/products/:id/reviews  → List reviews for product
POST   /api/products/:id/reviews  → Create review for product
```

### Response Format

```typescript
// Success
{
  "success": true,
  "data": { /* resource or array */ },
  "meta": { "page": 1, "total": 100, "limit": 20 }
}

// Error
{
  "success": false,
  "error": "Human-readable message",
  "code": "VALIDATION_ERROR",
  "details": { "field": "email", "issue": "Invalid format" }
}
```

### HTTP Status Codes

| Code | Use |
|------|-----|
| 200 | Success |
| 201 | Created |
| 204 | No Content (delete success) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (not authorized) |
| 404 | Not Found |
| 409 | Conflict (duplicate, state conflict) |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

### Versioning

```
/api/v1/products    → URL-based (recommended for simplicity)
/api/products       → Header-based (Accept-Version)
```

## Best Practices

- Use plural nouns for collections
- Support filtering, sorting, and pagination via query params
- Validate all input at the API boundary
- Return consistent response shapes
- Use proper HTTP status codes
- Log errors with context for debugging
- Document every endpoint with examples

## Anti-Patterns

- Using verbs in URLs (`/getProducts`)
- Returning different response shapes
- Exposing internal database IDs unnecessarily
- Swallowing errors silently
- Not validating input
- Inconsistent error formats
