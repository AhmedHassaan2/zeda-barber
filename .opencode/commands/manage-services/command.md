---
name: manage-services
description: Quick service management operations
allowed_tools: ["Read", "Write", "Edit", "Grep"]
agent: backend
---

# /manage-services — Service Management

Quick service management operations.

## Usage

```
/manage-services list         # List all services
/manage-services add          # Add new service
/manage-services edit [id]    # Edit service
/manage-services toggle [id]  # Toggle active status
```

## Features

### 1. List Services
- All active services
- Pricing and duration
- Category grouping

### 2. Add Service
- Name (AR/EN)
- Description
- Price and duration
- Category

### 3. Edit Service
- Update any field
- Change pricing
- Modify schedule

### 4. Toggle Status
- Activate/deactivate
- Confirmation required

## Database Operations

```sql
-- List active services
SELECT * FROM services WHERE is_active = true ORDER BY display_order;

-- Add service
INSERT INTO services (name, name_en, price, duration, category) VALUES ($1, $2, $3, $4, $5);

-- Update service
UPDATE services SET name = $1, price = $2 WHERE id = $3;

-- Toggle status
UPDATE services SET is_active = NOT is_active WHERE id = $1;
```
