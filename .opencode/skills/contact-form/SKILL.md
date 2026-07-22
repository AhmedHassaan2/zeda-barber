---
name: contact-form
description: Contact form with validation, spam protection, and notification system
category: project
level: project
priority: medium
dependencies: ["form-engineering", "api-design"]
related_skills: ["form-engineering", "email-systems"]
related_agents: ["frontend", "backend"]
project: zeda-barbershop
activation_rules:
  - keywords: ["contact", "form", "inquiry", "message"]
  - file_pattern: "src/app/contact/**/*"
---

# Contact Form

## Purpose

Guide contact form implementation with validation and notification.

## Current Implementation

Located in `src/app/contact/page.tsx`:
- Form with name, email, phone, message
- Google Maps embed
- Form validation
- Submission handling

## Architecture

```
src/app/contact/
├── page.tsx                 # Contact page
└── components/
    ├── ContactForm.tsx      # Contact form
    ├── MapEmbed.tsx         # Google Maps
    └── ContactInfo.tsx      # Contact details
```

## Database Schema

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Key Features

### 1. Form Validation
- Required field validation
- Email format validation
- Phone format validation
- Message length limits

### 2. Spam Protection
- Rate limiting
- Honeypot field
- CAPTCHA (optional)
- Input sanitization

### 3. Notification System
- Email notification to admin
- Confirmation email to user
- SMS notification (optional)

## API Endpoints

```
POST   /api/contact              # Submit contact form
GET    /api/contact              # List submissions (admin)
PUT    /api/contact/[id]         # Update status (admin)
DELETE /api/contact/[id]         # Delete submission (admin)
```

## Improvement Opportunities

1. Add CAPTCHA protection
2. Implement file attachments
3. Add auto-response templates
4. Create ticket system
5. Add analytics tracking
