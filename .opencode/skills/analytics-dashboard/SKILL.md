---
name: analytics-dashboard
description: Analytics dashboard with charts, metrics, and data visualization
category: project
level: project
priority: medium
dependencies: ["database-design", "supabase-patterns"]
related_skills: ["admin-dashboard", "product-analytics"]
related_agents: ["frontend", "backend"]
project: zeda-barbershop
activation_rules:
  - keywords: ["analytics", "dashboard", "metrics", "chart", "report"]
---

# Analytics Dashboard

## Purpose

Guide analytics dashboard implementation for business insights.

## Key Metrics

### 1. Booking Metrics
- Total bookings
- Booking completion rate
- Average booking value
- Peak booking times

### 2. Revenue Metrics
- Total revenue
- Revenue by service
- Revenue by barber
- Revenue trends

### 3. Customer Metrics
- New vs returning customers
- Customer retention rate
- Average customer lifetime value
- Customer satisfaction

### 4. Service Metrics
- Popular services
- Service duration accuracy
- Service ratings
- Cancellation rates

## Database Schema

```sql
-- Daily aggregates
CREATE TABLE analytics_daily (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  total_bookings INTEGER DEFAULT 0,
  completed_bookings INTEGER DEFAULT 0,
  cancelled_bookings INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  new_customers INTEGER DEFAULT 0,
  returning_customers INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service analytics
CREATE TABLE analytics_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id),
  date DATE NOT NULL,
  bookings INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  UNIQUE(service_id, date)
);
```

## Dashboard Components

### 1. Overview Cards
- Total bookings today
- Revenue today
- Active bookings
- Pending bookings

### 2. Charts
- Revenue trend (line chart)
- Bookings by service (pie chart)
- Peak hours (bar chart)
- Customer retention (area chart)

### 3. Data Tables
- Recent bookings
- Top services
- Top barbers
- Customer list

## API Endpoints

```
GET    /api/analytics/overview     # Dashboard overview
GET    /api/analytics/revenue      # Revenue data
GET    /api/analytics/bookings     # Booking data
GET    /api/analytics/services     # Service analytics
GET    /api/analytics/customers    # Customer analytics
```

## Improvement Opportunities

1. Add real-time analytics
2. Create export functionality
3. Add date range filtering
4. Implement comparative analytics
5. Add forecasting
