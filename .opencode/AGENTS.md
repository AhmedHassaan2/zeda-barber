# ZEDA Barbershop - Project Rules

## Project Overview

A bilingual (Arabic/English) barbershop website with online booking, service management, and admin dashboard.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 3.4+ with MD3 tokens
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth + localStorage (admin)
- **Deployment**: Vercel
- **Package Manager**: npm

## Architecture

### File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── booking/           # Booking wizard
│   ├── gallery/           # Image gallery
│   └── [page]/            # Dynamic pages
├── components/            # React components
│   ├── ui/                # Primitives
│   ├── layout/            # Layout components
│   └── features/          # Feature components
├── lib/                   # Utilities
│   ├── supabase.ts        # Supabase client
│   ├── language-context.tsx # i18n context
│   └── translations.ts    # Translation data
└── styles/                # Global styles
```

### Database Schema

**Core Tables:**
- `services` - Service catalog
- `team` - Team members
- `bookings` - Customer bookings
- `gallery_images` - Gallery images
- `gallery_videos` - Gallery videos
- `contact_submissions` - Contact form submissions

### API Structure

```
/api/
├── services/              # Service CRUD
├── team/                  # Team management
├── bookings/              # Booking management
├── gallery/               # Gallery management
├── contact/               # Contact form
├── admin/                 # Admin operations
└── health/                # Health check
```

## Conventions

### Naming

- Files: `kebab-case.tsx`
- Components: `PascalCase.tsx`
- Functions: `camelCase`
- Database: `snake_case`
- Environment: `SCREAMING_SNAKE_CASE`

### Styling

- Use Tailwind CSS utilities
- Follow MD3 color token system
- RTL-first design
- Mobile-first responsive

### Database

- UUID primary keys
- `created_at`/`updated_at` on all tables
- RLS policies for security
- Foreign key constraints

### API

- Consistent response format: `{ success, data, error }`
- Proper HTTP status codes
- Input validation
- Error logging

## Security

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL     # Public
NEXT_PUBLIC_SUPABASE_ANON_KEY # Public
SUPABASE_SERVICE_ROLE_KEY     # Server only
```

### Authentication

- Admin login: Simple token-based (localStorage)
- Session: Supabase Auth for API routes
- RLS: Row-level security on all tables

### Known Security Issues

1. **Hardcoded credentials** in `src/app/api/admin/login/route.ts`
   - Username: `zeda`
   - Password: `zeda2026`
   - **Action**: Move to environment variables

2. **localStorage for auth**
   - Vulnerable to XSS
   - **Action**: Upgrade to httpOnly cookies

## i18n

### Translation Keys

```
section.element
hero.title
booking.step1
common.loading
```

### RTL Support

- Use CSS logical properties
- Set `dir="rtl"` on `<html>`
- Test both languages

## Performance

### Current Status

- Images: Unoptimized (`images: { unoptimized: true }`)
- Bundle: No code splitting
- Caching: Not configured

### Targets

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## Testing

### Current Status

- No test framework configured
- No unit tests
- No E2E tests

### Recommended Setup

- Vitest for unit tests
- Playwright for E2E tests
- Test critical paths (booking, admin)

## Deployment

### Vercel Configuration

- Framework: Next.js
- Build: `next build`
- Output: `.next`

### Environment Variables

- Set in Vercel dashboard
- Use Vercel secrets for sensitive data

## Development Workflow

1. Create feature branch
2. Implement changes
3. Run `npm run build` to verify
4. Create PR with description
5. Review and merge
6. Vercel auto-deploys

## Future Improvements

### High Priority

1. Fix hardcoded credentials
2. Add proper authentication
3. Implement ESLint/Prettier
4. Add basic tests

### Medium Priority

1. Optimize images
2. Implement caching
3. Add error tracking
4. Create API documentation

### Low Priority

1. Add PWA features
2. Implement analytics
3. Add AI hair try-on
4. Create mobile app
