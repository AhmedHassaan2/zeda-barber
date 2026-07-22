---
name: customer-management
description: Customer profiles, booking history, and loyalty program management
category: project
level: project
priority: medium
dependencies: ["database-design", "supabase-patterns"]
related_skills: ["admin-dashboard", "notification-system"]
related_agents: ["database", "backend"]
project: zeda-barbershop
activation_rules:
  - keywords: ["customer", "client", "profile", "loyalty", "history"]
---

# Customer Management

## Purpose

Guide customer management including profiles, history, and loyalty features.

## Database Schema

```sql
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  notes TEXT,
  loyalty_points INTEGER DEFAULT 0,
  total_visits INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  last_visit_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer preferences
CREATE TABLE customer_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  preferred_barber_id UUID REFERENCES team(id),
  preferred_service_id UUID REFERENCES services(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Key Features

### 1. Customer Profiles
- Contact information
- Booking history
- Service preferences
- Notes and tags

### 2. Booking History
- Past bookings
- Spending history
- Cancellation history
- Feedback and ratings

### 3. Loyalty Program
- Points accumulation
- Reward redemption
- Tier levels
- Special offers

### 4. Communication
- SMS reminders
- Email newsletters
- Special offers
- Birthday messages

## API Endpoints

```
GET    /api/customers              # List customers (admin)
POST   /api/customers              # Create customer
GET    /api/customers/[id]         # Get customer
PUT    /api/customers/[id]         # Update customer
GET    /api/customers/[id]/history # Booking history
```

## Integration Points

- **Booking System**: Customer lookup
- **Payment**: Spending tracking
- **Notifications**: Communication
- **Analytics**: Customer insights

## Improvement Opportunities

1. Add customer segmentation
2. Implement loyalty tiers
3. Create customer portal
4. Add feedback collection
5. Implement referral program
