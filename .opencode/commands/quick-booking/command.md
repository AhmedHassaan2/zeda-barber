---
name: quick-booking
description: Quick booking shortcut for common booking scenarios
allowed_tools: ["Read", "Write", "Edit", "Bash"]
agent: frontend
---

# /quick-booking — Quick Booking

Create or manage bookings quickly.

## Usage

```
/quick-booking new            # Create new booking
/quick-booking today          # View today's bookings
/quick-booking status [id]    # Check booking status
```

## Features

### 1. New Booking
- Quick service selection
- Date/time picker
- Customer lookup
- Confirmation

### 2. Today's Bookings
- List of today's appointments
- Status overview
- Quick actions

### 3. Status Check
- Booking details
- Current status
- Update options

## Process

1. Parse booking command
2. Load relevant data
3. Present options
4. Execute action
5. Confirm result

## Database Queries

```sql
-- Today's bookings
SELECT b.*, s.name as service_name, t.name as barber_name
FROM bookings b
JOIN services s ON b.service_id = s.id
JOIN team t ON b.barber_id = t.id
WHERE b.booking_date = CURRENT_DATE
ORDER BY b.booking_time;

-- Booking status
SELECT * FROM bookings WHERE id = $1;
```
