---
name: manage-team
description: Quick team member management operations
allowed_tools: ["Read", "Write", "Edit", "Grep"]
agent: backend
---

# /manage-team — Team Management

Quick team member management operations.

## Usage

```
/manage-team list             # List all team members
/manage-team add              # Add new member
/manage-team edit [id]        # Edit member
/manage-team schedule [id]    # View/edit schedule
```

## Features

### 1. List Team
- All active members
- Roles and specialties
- Availability status

### 2. Add Member
- Personal information
- Role assignment
- Working hours

### 3. Edit Member
- Update profile
- Change schedule
- Manage availability

### 4. Schedule Management
- View working hours
- Set availability
- Handle time off

## Database Operations

```sql
-- List active team
SELECT * FROM team WHERE is_active = true ORDER BY name;

-- Add team member
INSERT INTO team (name, name_en, role, working_hours) VALUES ($1, $2, $3, $4);

-- Update team member
UPDATE team SET name = $1, role = $2 WHERE id = $3;

-- Get schedule
SELECT * FROM team_availability WHERE team_id = $1 AND date >= CURRENT_DATE;
```
