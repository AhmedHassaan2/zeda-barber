---
name: api-documentation
description: API documentation with OpenAPI/Swagger, examples, and developer experience
category: documentation
level: concept
priority: medium
dependencies: []
related_skills: ["api-design", "component-documentation"]
related_agents: ["docs-writer"]
activation_rules:
  - keywords: ["API documentation", "OpenAPI", "Swagger", "endpoint", "documentation"]
---

# API Documentation

## Purpose

Guide API documentation for developer experience.

## When to Use

- Documenting API endpoints
- Creating API references
- Writing usage examples
- Generating OpenAPI specs

## Core Concepts

### OpenAPI Specification

```yaml
openapi: 3.0.0
info:
  title: Barber Shop API
  version: 1.0.0
paths:
  /api/products:
    get:
      summary: List products
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Product'
```

### Endpoint Documentation

```typescript
/**
 * @api {get} /api/products List Products
 * @apiParam {Number} [limit=20] Number of products to return
 * @apiParam {String} [category] Filter by category
 * @apiSuccess {Object[]} products List of products
 * @apiError {String} error Error message
 */
```

### Usage Examples

```bash
# List products
curl -X GET "https://api.example.com/api/products?limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create product
curl -X POST "https://api.example.com/api/products" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Product", "price": 29.99}'
```

## Best Practices

- Document every endpoint
- Provide request/response examples
- Include error responses
- Use consistent naming
- Version your API docs
- Test documentation examples
- Keep docs in sync with code

## Anti-Patterns

- Missing documentation
- Outdated examples
- Inconsistent naming
- Not documenting errors
- Missing authentication docs
