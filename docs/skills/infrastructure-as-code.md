---
title: Infrastructure as Code patterns, Terraform basics, and cloud resource management
description: Infrastructure as Code patterns, Terraform basics, and cloud resource management
---

# Infrastructure as Code patterns, Terraform basics, and cloud resource management

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>infrastructure-as-code</code> | <strong>Category:</strong> devops | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# Infrastructure as Code

## Purpose

Guide infrastructure as code implementation for reproducible environments.

## When to Use

- Setting up cloud infrastructure
- Managing multiple environments
- Automating resource provisioning
- Documenting infrastructure

## Core Concepts

### Terraform Basics

```hcl
# main.tf
terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.1"
    }
  }
}

resource "vercel_project" "app" {
  name = "my-app"
  framework = "nextjs"
}

resource "vercel_domain" "app" {
  domain = "example.com"
  project_id = vercel_project.app.id
}
```

### State Management

```bash
# Remote state (recommended)
terraform {
  backend "s3" {
    bucket = "terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}
```

### Environment Separation

```
terraform/
├── modules/      # Reusable modules
├── environments/
│   ├── dev/      # Development
│   ├── staging/  # Staging
│   └── prod/     # Production
└── shared/       # Shared resources
```

## Best Practices

- Use remote state storage
- Version control infrastructure code
- Use modules for reusable components
- Plan before applying
- Use workspaces for environments
- Document infrastructure decisions
- Tag all resources

## Anti-Patterns

- Manual infrastructure changes
- Storing state locally
- Not version controlling infrastructure
- Using latest resource versions
- Not planning before apply

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
