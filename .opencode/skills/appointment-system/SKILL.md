---
name: appointment-system
description: Appointment scheduling, management, and status tracking
category: project
level: project
priority: high
dependencies: ["database-design", "supabase-patterns"]
related_skills: ["booking-engine", "team-management"]
related_agents: ["database", "backend"]
project: zeda-barbershop
activation_rules:
  - keywords: ["appointment", "schedule", "booking", "calendar"]
---

# Appointment System

## Purpose

Guide appointment management including scheduling, status tracking, and calendar integration.

## Database Schema

```sql
-- Appointments table (extends bookings)
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  barber_id UUID REFERENCES team(id),
  service_id UUID REFERENCES services(id),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Status Flow

```
scheduled → confirmed → in_progress → completed
    ↓           ↓            ↓
 cancelled   cancelled   no_show
```

## Key Features

### 1. Scheduling
- Available time slot calculation
- Barber availability management
- Service duration handling
- Buffer time between appointments

### 2. Status Management
- Real-time status updates
- Status history tracking
- Automated status transitions
- Cancellation handling

### 3. Calendar Views
- Day view
- Week view
- Barber-specific views
- Service-specific views

## API Endpoints

```
GET    /api/appointments          # List appointments
POST   /api/appointments          # Create appointment
GET    /api/appointments/[id]     # Get appointment
PUT    /api/appointments/[id]     # Update appointment
DELETE /api/appointments/[id]     # Cancel appointment
```

## Integration Points

- **Google Calendar**: Bidirectional sync
- **Email**: Status notifications
- **SMS**: Reminders and updates
- **Admin Dashboard**: Management interface
