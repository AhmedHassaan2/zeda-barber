---
name: booking-engine
description: Multi-step booking wizard with calendar, time slot selection, and barber preference
category: project
level: project
priority: high
dependencies: ["react-patterns", "form-engineering", "nextjs-app-router"]
related_skills: ["appointment-system", "form-engineering"]
related_agents: ["frontend", "admin-builder"]
project: zeda-barbershop
activation_rules:
  - keywords: ["booking", "appointment", "calendar", "time slot", "wizard"]
  - file_pattern: "src/app/booking/**/*"
---

# Booking Engine

## Purpose

Guide the ZEDA booking system implementation with multi-step wizard, calendar integration, and time slot management.

## Current Implementation

Located in `src/app/booking/page.tsx`:
- Multi-step wizard (4 steps)
- Service selection with pricing
- Date/time picker
- Contact form with validation
- Booking confirmation

## Architecture

```
src/app/booking/
├── page.tsx                 # Main booking wizard
├── loading.tsx              # Loading state
└── components/
    ├── StepIndicator.tsx    # Progress indicator
    ├── ServiceSelect.tsx    # Step 1: Service selection
    ├── DateTimePicker.tsx   # Step 2: Date/time selection
    ├── ContactForm.tsx      # Step 3: Contact details
    └── Confirmation.tsx     # Step 4: Booking confirmation
```

## Data Flow

```
User Selection → State Management → Validation → API Call → Confirmation
     ↓                ↓                ↓           ↓            ↓
  Service ID      Wizard State     Form Data   Supabase    Email/SMS
```

## Key Features

### 1. Multi-Step Wizard
- Step indicator with progress
- Back/Next navigation
- State persistence between steps
- Form validation per step

### 2. Calendar Integration
- Monthly view calendar
- Available date highlighting
- Holiday/exception handling
- Timezone consideration

### 3. Time Slot Management
- Available slots based on date
- Barber availability
- Duration calculation
- Buffer time between appointments

### 4. Form Validation
- Required field validation
- Email/phone format validation
- Real-time error display
- Accessibility compliance

## Database Schema

```sql
-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id),
  barber_id UUID REFERENCES team(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Integration Points

- **Supabase**: Booking storage and retrieval
- **Google Calendar**: Optional sync
- **Email**: Confirmation emails via Resend
- **SMS**: Optional notifications via Twilio

## Improvement Opportunities

1. Add real-time slot availability
2. Implement recurring bookings
3. Add waitlist functionality
4. Integrate Google Calendar sync
5. Add booking reminders
