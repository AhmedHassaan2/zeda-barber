---
name: service-management
description: Service catalog management, pricing, and scheduling configuration
category: project
level: project
priority: high
dependencies: ["database-design", "supabase-patterns"]
related_skills: ["booking-engine", "admin-dashboard"]
related_agents: ["database", "backend"]
project: zeda-barbershop
activation_rules:
  - keywords: ["service", "pricing", "catalog", "menu"]
---

# Service Management

## Purpose

Guide service catalog management including pricing, duration, and scheduling rules.

## Database Schema

```sql
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  duration INTEGER NOT NULL CHECK (duration > 0), -- minutes
  category TEXT DEFAULT 'general',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service categories
CREATE TABLE service_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  display_order INTEGER DEFAULT 0
);
```

## API Endpoints

```
GET    /api/services              # List services
POST   /api/services              # Create service (admin)
GET    /api/services/[id]         # Get service
PUT    /api/services/[id]         # Update service (admin)
DELETE /api/services/[id]         # Delete service (admin)
```

## Key Features

### 1. Service CRUD
- Create/edit/delete services
- Set pricing and duration
- Manage categories
- Upload service images

### 2. Pricing Management
- Fixed pricing
- Dynamic pricing (peak hours)
- Package deals
- Discount codes

### 3. Scheduling Rules
- Service availability
- Buffer time between services
- Maximum daily bookings
- Barber-specific services

## Integration Points

- **Booking Engine**: Service selection
- **Payment**: Price calculation
- **Calendar**: Duration scheduling
- **Analytics**: Service popularity
