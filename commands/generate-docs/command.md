---
name: generate-docs
description: Generate documentation for components, APIs, and project structure
allowed_tools: ["Read", "Write", "Glob", "Grep"]
agent: docs-writer
---

# /generate-docs — Generate Documentation

Generate documentation for project components, APIs, and structure.

## Usage

```
/generate-docs                # Generate full project docs
/generate-docs --component    # Generate component docs
/generate-docs --api          # Generate API docs
```

## Documentation Types

### 1. Component Documentation
- Props interface
- Usage examples
- Accessibility notes
- Do/Don't guidelines

### 2. API Documentation
- Endpoint specifications
- Request/response examples
- Error handling
- Authentication

### 3. Project Documentation
- Architecture overview
- Setup instructions
- Development workflow
- Deployment guide

### 4. Decision Records
- Architecture Decision Records (ADRs)
- Technical decisions documentation

## Output Format

### Component Documentation
```markdown
# ComponentName

## Description
Brief description.

## Import
\`\`\`tsx
import { ComponentName } from '@/components/ComponentName';
\`\`\`

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|

## Usage
\`\`\`tsx
<ComponentName prop="value" />
\`\`\`

## Accessibility
- Notes on a11y
```

## Process

1. Scan for undocumented components
2. Analyze component props and usage
3. Check API routes for documentation
4. Generate component documentation
5. Generate API documentation
6. Update project README if needed
7. Report documentation status
