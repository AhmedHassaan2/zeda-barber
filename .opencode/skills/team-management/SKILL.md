---
name: team-management
description: Team member management, working hours, and availability scheduling
category: project
level: project
priority: high
dependencies: ["database-design", "supabase-patterns"]
related_skills: ["booking-engine", "admin-dashboard"]
related_agents: ["database", "backend"]
project: zeda-barbershop
activation_rules:
  - keywords: ["team", "barber", "staff", "working hours", "availability"]
---

# Team Management

## Purpose

Guide team member management including profiles, working hours, and availability.

## Database Schema

```sql
CREATE TABLE team (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  role TEXT DEFAULT 'barber',
  bio TEXT,
  bio_en TEXT,
  image_url TEXT,
  phone TEXT,
  email TEXT,
  working_hours JSONB DEFAULT '{"mon": {"start": "09:00", "end": "21:00"}}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team availability exceptions
CREATE TABLE team_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES team(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  start_time TIME,
  end_time TIME,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Working Hours Structure

```json
{
  "mon": { "start": "09:00", "end": "21:00" },
  "tue": { "start": "09:00", "end": "21:00" },
  "wed": { "start": "09:00", "end": "21:00" },
  "thu": { "start": "09:00", "end": "21:00" },
  "fri": { "start": "09:00", "end": "21:00" },
  "sat": { "start": "09:00", "end": "21:00" },
  "sun": { "start": "09:00", "end": "21:00" }
}
```

## Key Features

### 1. Profile Management
- Personal information
- Profile photos
- Bio and specialties
- Contact details

### 2. Schedule Management
- Working hours
- Availability exceptions
- Time off requests
- Holiday scheduling

### 3. Availability Calculation
- Real-time availability
- Buffer time handling
- Service-specific availability
- Multi-service bookings

## Integration Points

- **Booking Engine**: Barber selection
- **Calendar**: Schedule display
- **Notifications**: Schedule changes
- **Analytics**: Performance metrics
