# Template Generator

**Purpose:** Generate reusable templates for workspace components.

## Usage

When creating or updating templates for agents, skills, commands, or playbooks.

## Template Locations

```
~/.config/opencode/templates/
├── agent-template.md
├── skill-template.md
├── command-template.md
├── playbook-template.md
└── knowledge-template.md
```

## Generation Process

### Step 1: Identify Template Type

Determine what kind of template is needed.

### Step 2: Define Required Fields

Each template type has required and optional fields:

**Agent Template:**
| Field | Required | Type |
|-------|----------|------|
| name | Yes | kebab-case |
| description | Yes | string |
| mode | Yes | build/subagent/plan |
| temperature | Yes | 0.0-1.0 |
| permissions | Yes | object |
| content | Yes | markdown |

**Skill Template:**
| Field | Required | Type |
|-------|----------|------|
| name | Yes | kebab-case |
| description | Yes | string |
| category | Yes | enum |
| level | Yes | concept/framework/project |
| priority | Yes | high/medium/low |
| content | Yes | markdown |

**Command Template:**
| Field | Required | Type |
|-------|----------|------|
| name | Yes | kebab-case |
| description | Yes | string |
| allowed_tools | Yes | array |
| agent | No | string |
| content | Yes | markdown |

**Playbook Template:**
| Field | Required | Type |
|-------|----------|------|
| name | Yes | kebab-case |
| goal | Yes | string |
| trigger | Yes | string |
| inputs | Yes | array |
| outputs | Yes | array |
| content | Yes | markdown |

### Step 3: Generate Template

Create template with:
1. Metadata section with all fields
2. Content structure with placeholders
3. Quality checklist
4. Usage instructions

### Step 4: Validate Template

```markdown
- [ ] All required fields included
- [ ] Placeholders are clear ({field_name})
- [ ] Structure follows conventions
- [ ] Examples are included
- [ ] Quality checklist is complete
```

### Step 5: Save Template

Save to `~/.config/opencode/templates/{type}-template.md`

## Template Quality Standards

- Must include all required fields for the type
- Must include a quality checklist
- Must include usage instructions
- Must follow naming conventions
- Must be self-documenting
- Must be production-ready when filled in
