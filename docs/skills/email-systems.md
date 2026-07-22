---
title: Email system implementation with Resend, templates, and transactional email patterns
description: Email system implementation with Resend, templates, and transactional email patterns
---

# Email system implementation with Resend, templates, and transactional email patterns

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>email-systems</code> | <strong>Category:</strong> backend | <strong>Priority:</strong> medium | <strong>Level:</strong> framework
</div>

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

## When to Use

- File patterns match the skill's activation rules
- Keywords in the conversation match the skill's domain
- A related agent delegates to this skill

## When NOT to Use

- When the task falls outside this skill's domain
- When a more specific skill exists for the task
- When the skill's dependencies are not met

## Related Agents

See [Agents Registry](/agents/) for agents that use this skill.

## Related Skills

See [Skills Registry](/skills/) for related skills in the same cluster.

## Customization Guide

1. Copy the skill to `.opencode/skills/` in your project
2. Modify the activation rules to match your project patterns
3. Add project-specific examples and templates
4. Update the related agents and skills references

## Extension Guide

1. Add new sections to the SKILL.md file
2. Include code examples for new patterns
3. Update anti-patterns with new findings
4. Maintain cross-references to related skills
5. Keep the skill focused on its core purpose
