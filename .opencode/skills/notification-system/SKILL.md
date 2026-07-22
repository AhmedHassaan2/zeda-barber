---
name: notification-system
description: Multi-channel notification system with email, SMS, and push notifications
category: project
level: project
priority: medium
dependencies: ["email-systems", "background-jobs"]
related_skills: ["email-systems", "realtime-patterns"]
related_agents: ["backend"]
project: zeda-barbershop
activation_rules:
  - keywords: ["notification", "email", "SMS", "push", "alert"]
---

# Notification System

## Purpose

Guide multi-channel notification system implementation.

## Notification Types

### 1. Booking Notifications
- Booking confirmation
- Booking reminder (24h before)
- Booking cancellation
- Booking update

### 2. Marketing Notifications
- Promotional offers
- New services
- Special events
- Loyalty rewards

### 3. System Notifications
- Admin alerts
- Error notifications
- System updates
- Maintenance notices

## Channels

### Email (Primary)
- Service: Resend
- Templates: HTML email templates
- Tracking: Open rates, click rates

### SMS (Optional)
- Service: Twilio
- Use case: Reminders, urgent alerts
- Templates: Plain text

### Push (Future)
- Service: Firebase Cloud Messaging
- Use case: Mobile app notifications
- Templates: Rich notifications

## Database Schema

```sql
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  type TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'push')),
  subject TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## API Endpoints

```
GET    /api/notifications          # List notifications (admin)
POST   /api/notifications          # Send notification (admin)
PUT    /api/notifications/[id]     # Update status
```

## Integration Points

- **Booking System**: Trigger notifications
- **Email Service**: Send emails
- **SMS Service**: Send SMS
- **Analytics**: Track delivery
