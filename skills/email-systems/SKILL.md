---
name: email-systems
description: Email system implementation with Resend, templates, and transactional email patterns
category: backend
level: framework
priority: medium
dependencies: []
related_skills: ["api-design", "background-jobs"]
related_agents: ["backend"]
activation_rules:
  - keywords: ["email", "Resend", "SMTP", "transactional", "template"]
---

# Email Systems

## Purpose

Guide email system implementation for transactional and marketing emails.

## When to Use

- Sending transactional emails
- Creating email templates
- Implementing email workflows
- Setting up email services

## Core Concepts

### Resend Integration

```typescript
// src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  await resend.emails.send({
    from: 'Barber Shop <notifications@yourdomain.com>',
    to,
    subject,
    html,
  });
}
```

### Email Templates

```typescript
// src/lib/templates/booking-confirmation.ts
export function bookingConfirmation(booking: Booking): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #e9c176;">Booking Confirmed</h1>
      <p>Service: ${booking.service}</p>
      <p>Date: ${booking.date}</p>
      <p>Time: ${booking.time}</p>
      <p>Barber: ${booking.barber}</p>
    </div>
  `;
}
```

### Background Email Sending

```typescript
// Don't block the response for emails
export async function POST(request: Request) {
  const data = await request.json();
  const booking = await createBooking(data);

  // Send email in background
  sendEmail({
    to: data.email,
    subject: 'Booking Confirmed',
    html: bookingConfirmation(booking),
  }).catch(console.error);

  return NextResponse.json({ success: true, data: booking });
}
```

## Best Practices

- Use transactional email services (Resend, SendGrid)
- Send emails in background
- Include unsubscribe links
- Test email templates
- Monitor delivery rates
- Handle bounces and complaints
- Use proper authentication (SPF, DKIM, DMARC)

## Anti-Patterns

- Blocking responses for email sending
- Not handling email failures
- Using free email services for production
- Missing unsubscribe links
- Not monitoring delivery rates
