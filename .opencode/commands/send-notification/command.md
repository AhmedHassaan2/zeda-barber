---
name: send-notification
description: Send notifications to customers or team members
allowed_tools: ["Read", "Write", "Edit", "Bash"]
agent: backend
---

# /send-notification — Send Notification

Send notifications via email, SMS, or push.

## Usage

```
/send-notification customer [id]    # Send to customer
/send-notification team             # Send to all team
/send-notification broadcast        # Send to all customers
```

## Notification Types

### 1. Booking Confirmation
- Service details
- Date and time
- Barber information
- Location

### 2. Booking Reminder
- 24-hour reminder
- 1-hour reminder
- Same-day reminder

### 3. Promotional
- Special offers
- New services
- Events
- Loyalty rewards

### 4. System
- Maintenance notices
- Schedule changes
- Important updates

## Templates

### Booking Confirmation
```
Subject: Booking Confirmed - {service_name}

Hello {customer_name},

Your booking has been confirmed:
- Service: {service_name}
- Date: {booking_date}
- Time: {booking_time}
- Barber: {barber_name}

See you at the shop!
```

### Booking Reminder
```
Subject: Reminder - Appointment Tomorrow

Hello {customer_name},

This is a reminder for your appointment tomorrow:
- Service: {service_name}
- Time: {booking_time}
- Barber: {barber_name}

See you soon!
```

## Process

1. Parse notification command
2. Load recipient information
3. Select appropriate template
4. Render template with data
5. Send via appropriate channel
6. Log notification status
