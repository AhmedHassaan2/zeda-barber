# API Design — Knowledge Base

## Purpose

Well-designed APIs are predictable, consistent, and easy to consume. This knowledge base covers REST conventions, HTTP semantics, error handling, versioning strategies, and documentation practices for Next.js Route Handler APIs consumed by frontends and third parties.

## Core Concepts

### REST Resource Naming

Resources are nouns, not verbs. URLs represent resource hierarchy:

```
GET    /api/users              → List users
POST   /api/users              → Create user
GET    /api/users/:id          → Get specific user
PUT    /api/users/:id          → Replace user
PATCH  /api/users/:id          → Update user fields
DELETE /api/users/:id          → Delete user
GET    /api/users/:id/orders   → List user's orders (nested resource)
```

**Rules:**
- Use plural nouns (`/users` not `/user`)
- Use kebab-case for multi-word resources (`/order-items`)
- Nest relationships max two levels deep (`/users/:id/orders`)
- Use query parameters for filtering, not URL manipulation

### HTTP Methods and Semantics

| Method | Purpose | Idempotent | Safe | Request Body |
|---|---|---|---|---|
| `GET` | Retrieve resource | Yes | Yes | No |
| `POST` | Create resource | No | No | Yes |
| `PUT` | Replace resource entirely | Yes | No | Yes |
| `PATCH` | Partial update | No* | No | Yes |
| `DELETE` | Remove resource | Yes | No | Optional |

*PATCH can be idempotent if operations are designed to be.

### Status Codes

**Success (2xx):**
- `200 OK` — Successful GET, PUT, PATCH, or DELETE
- `201 Created` — Successful POST; include `Location` header
- `204 No Content` — Successful DELETE with no response body

**Client Error (4xx):**
- `400 Bad Request` — Validation failure, malformed request
- `401 Unauthorized` — Authentication required or failed
- `403 Forbidden` — Authenticated but not authorized
- `404 Not Found` — Resource doesn't exist
- `409 Conflict` — State conflict (duplicate, version mismatch)
- `422 Unprocessable Entity` — Semantically invalid input
- `429 Too Many Requests` — Rate limit exceeded

**Server Error (5xx):**
- `500 Internal Server Error` — Unexpected server failure
- `502 Bad Gateway` — Upstream service unavailable
- `503 Service Unavailable` — Server temporarily overloaded

### Pagination

**Cursor-based (recommended):**
```json
{
  "data": [...],
  "pagination": {
    "cursor": "eyJpZCI6MTAwfQ==",
    "hasMore": true,
    "limit": 20
  }
}
```

**Offset-based (simpler, less performant at scale):**
```json
{
  "data": [...],
  "pagination": {
    "page": 3,
    "pageSize": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

### Versioning Strategies

- **URL path versioning** — `/api/v1/users` (most explicit, widely adopted)
- **Header versioning** — `Accept: application/vnd.api+json;version=2` (cleaner URLs)
- **Query parameter** — `/api/users?version=2` (easy to implement, less standard)

For internal APIs, URL path versioning is recommended for clarity.

### Error Response Format

Consistent error structure across all endpoints:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### Rate Limiting

Protect APIs from abuse with rate limiting:

- **Per-user limits** — Authenticated users get generous quotas
- **Per-IP limits** — Anonymous endpoints get stricter limits
- **Sliding window** — More accurate than fixed windows
- **Retry-After header** — Tell clients when they can retry

## Best Practices

1. **Use consistent response envelope** — Wrap all responses in a standard structure (`{ data, error, meta }`) so clients can parse reliably
2. **Validate all input with schemas** — Use Zod schemas at API boundaries; reject requests that fail validation with specific error messages
3. **Implement proper HTTP status codes** — Use the correct status code for each scenario; never return 200 for errors
4. **Add CORS headers correctly** — Configure explicit allowed origins; never use `*` with credentials
5. **Version your API from day one** — Start with `/api/v1/`; versioning is easy to add early but painful to retrofit
6. **Document with OpenAPI/Swagger** — Generate API documentation from code; keep docs in sync with implementation
7. **Implement request/response compression** — Enable gzip or Brotli compression for payloads over 1KB
8. **Use ETags for caching** — Return ETags on GET responses; clients send `If-None-Match` to avoid downloading unchanged data

## Anti-Patterns

1. **Returning 200 for all responses** — Using 200 status for errors makes monitoring impossible; clients cannot distinguish success from failure
2. **Exposing database schema in API responses** — Internal column names, types, and relationships should not leak to clients; use DTOs or response transformers
3. **Creating RPC-style REST endpoints** — `POST /api/getUsers` or `POST /api/deleteUser` violate REST; use proper HTTP methods on resource URLs
4. **Returning entire database records** — Send only the fields clients need; over-fetching wastes bandwidth and exposes unnecessary data
5. **Missing Content-Type headers** — Always set `Content-Type: application/json` for JSON responses; clients may not guess correctly
6. **Using GET for state-changing operations** — GET must be safe and idempotent; use POST/PUT/PATCH for mutations
7. **Inconsistent error formats** — Some endpoints return `{ error: "message" }`, others `{ message: "error" };` standardize one format
8. **Not handling OPTIONS requests** — CORS preflight sends OPTIONS; missing handler blocks cross-origin requests

## Common Mistakes

1. **Not paginating list endpoints** — Returning all records causes performance issues and memory overflow; always implement pagination
2. **Leaking internal IDs in responses** — Auto-incrementing database IDs reveal information; use UUIDs or slugs for public-facing identifiers
3. **Ignoring Content Negotiation** — Clients may request different formats; at minimum, support JSON and handle `Accept` header
4. **Missing request timeout handling** — API routes should have timeouts; long-running operations should use background jobs with status polling
5. **Returning empty arrays instead of 404** — For resources that should exist (user's profile), 404 is more informative than empty array
6. **Not validating Content-Type on POST** — Ensure incoming requests have correct Content-Type before parsing body
7. **Overusing database queries** — N+1 queries in list endpoints destroy performance; use joins or batch queries
8. **Hardcoding API base URLs** — Use environment variables for API base URLs to support different environments

## Decision Guidelines

| Scenario | Recommendation |
|---|---|
| Internal frontend API | REST + JSON, version as `/api/v1/` |
| Public third-party API | REST + OpenAPI spec + OAuth 2.0 + rate limiting |
| Real-time data | WebSocket alongside REST or Server-Sent Events |
| File uploads | `multipart/form-data` with size limits |
| Complex queries | Consider GraphQL if REST becomes unwieldy |
| Microservices | REST with circuit breakers + retry logic |
| Background jobs | Return 202 Accepted with job ID for polling |

## References

- REST API Design Rulebook (Mark Masse)
- Microsoft REST API Guidelines: https://github.com/microsoft/api-guidelines
- OpenAPI Specification: https://swagger.io/specification/
- JSON:API Specification: https://jsonapi.org/
- HTTP RFC 7231: https://datatracker.ietf.org/doc/html/rfc7231
- Supabase Edge Functions: https://supabase.com/docs/guides/functions

## Practical Notes

- **Next.js Route Handlers:** Use `NextRequest` and `NextResponse` for modern request/response handling in `route.ts` files
- **Supabase API patterns:** Supabase client auto-generates REST API from database; customize with Edge Functions for complex logic
- **Testing:** Use tools like Hoppscotch or Insomnia for manual API testing; write integration tests for critical endpoints
- **Monitoring:** Track API response times, error rates, and throughput; set alerts for elevated 5xx rates
- **OpenAPI generation:** Use `next-swagger-doc` or `ts-openapi` to generate OpenAPI specs from TypeScript route handlers
