---
name: infrastructure-as-code
description: Infrastructure as Code patterns, Terraform basics, and cloud resource management
category: devops
level: concept
priority: medium
dependencies: []
related_skills: ["docker-patterns", "ci-cd-pipelines"]
related_agents: ["devops", "cloud"]
activation_rules:
  - keywords: ["IaC", "Terraform", "infrastructure", "resource", "provisioning"]
---

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
