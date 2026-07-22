---
name: payment-integration
description: Payment processing integration with Stripe and local payment methods
category: project
level: project
priority: medium
dependencies: ["api-design", "supabase-patterns"]
related_skills: ["booking-engine", "api-design"]
related_agents: ["backend"]
project: zeda-barbershop
activation_rules:
  - keywords: ["payment", "Stripe", "checkout", "invoice", "receipt"]
---

# Payment Integration

## Purpose

Guide payment processing integration for bookings and services.

## Database Schema

```sql
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EGP',
  method TEXT CHECK (method IN ('cash', 'card', 'wallet', 'online')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Payment Methods

### 1. Cash on Service
- Default payment method
- No integration required
- Manual status update

### 2. Card Payment (Stripe)
- Online payment
- Secure processing
- Automatic confirmation

### 3. Mobile Wallet
- Fawry
- Vodafone Cash
- InstaPay

## Stripe Integration

```typescript
// src/lib/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(bookingId: string, amount: number) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'egp',
        product_data: { name: 'Barber Service' },
        unit_amount: amount * 100, // Convert to cents
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/booking`,
    metadata: { bookingId },
  });

  return session;
}
```

## API Endpoints

```
POST   /api/payments/checkout     # Create checkout session
POST   /api/payments/webhook      # Stripe webhook handler
GET    /api/payments/[id]         # Get payment status
POST   /api/payments/[id]/refund  # Refund payment
```

## Improvement Opportunities

1. Add subscription support
2. Implement loyalty points
3. Add invoice generation
4. Create payment reports
5. Add multi-currency support
