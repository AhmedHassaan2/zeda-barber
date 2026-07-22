---
name: admin-dashboard
description: Admin dashboard with authentication, CRUD operations, and analytics
category: project
level: project
priority: high
dependencies: ["react-patterns", "supabase-patterns"]
related_skills: ["booking-engine", "service-management", "team-management"]
related_agents: ["frontend", "backend"]
project: zeda-barbershop
activation_rules:
  - keywords: ["admin", "dashboard", "management", "CRUD"]
  - file_pattern: "src/app/admin/**/*"
---

# Admin Dashboard

## Purpose

Guide admin dashboard implementation with authentication, CRUD operations, and analytics.

## Current Implementation

Located in `src/app/admin/`:
- `/login` - Authentication page
- `/dashboard` - Main dashboard with tabs
- Image upload functionality
- Video management

## Architecture

```
src/app/admin/
├── layout.tsx              # Admin layout with auth
├── login/
│   └── page.tsx            # Login page
├── dashboard/
│   ├── page.tsx            # Dashboard with tabs
│   ├── services/page.tsx   # Service management
│   ├── team/page.tsx       # Team management
│   ├── bookings/page.tsx   # Booking management
│   └── settings/page.tsx   # Settings
└── components/
    ├── AdminNav.tsx        # Navigation
    ├── DataTable.tsx       # Data table component
    └── ImageUpload.tsx     # Image upload
```

## Authentication

```typescript
// Simple token-based auth (low-security admin)
// localStorage: zeda_admin_auth
// Check: localStorage.getItem('zeda_admin_auth') === 'authenticated'
```

**Security Note**: Current implementation uses localStorage for auth. Consider upgrading to httpOnly cookies for production.

## Features

### 1. Service Management
- Add/edit/delete services
- Set pricing and duration
- Manage service categories
- Upload service images

### 2. Team Management
- Add/edit team members
- Set working hours
- Manage availability
- Upload profile photos

### 3. Booking Management
- View all bookings
- Update booking status
- Cancel bookings
- Export booking data

### 4. Image Management
- Upload images to gallery
- Organize by category
- Delete unused images
- Set featured images

### 5. Video Management
- Upload promotional videos
- Manage video thumbnails
- Set video display order

## Database Tables

```sql
-- Services
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL, -- minutes
  category TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team
CREATE TABLE team (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  role TEXT,
  bio TEXT,
  bio_en TEXT,
  image_url TEXT,
  working_hours JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Improvement Opportunities

1. Upgrade auth to httpOnly cookies
2. Add role-based access control
3. Implement audit logging
4. Add bulk operations
5. Create export functionality
