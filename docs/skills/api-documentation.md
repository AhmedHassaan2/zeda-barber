---
title: API documentation with OpenAPI/Swagger, examples, and developer experience
description: API documentation with OpenAPI/Swagger, examples, and developer experience
---

# API documentation with OpenAPI/Swagger, examples, and developer experience

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>api-documentation</code> | <strong>Category:</strong> documentation | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

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
