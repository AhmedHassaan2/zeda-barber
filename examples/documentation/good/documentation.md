# @myorg/ui-lib

A component library for Next.js applications built with Tailwind CSS and Radix UI.

## Installation

```bash
npm install @myorg/ui-lib
```

## Peer Dependencies

- `react` >= 18.0.0
- `next` >= 14.0.0
- `tailwindcss` >= 3.4.0

## Usage

### Button

A polymorphic button component supporting variants, sizes, and loading states.

```tsx
import { Button } from "@myorg/ui-lib";

<Button variant="primary" size="lg" loading={isSubmitting}>
  Submit
</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "destructive"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |
| `asChild` | `boolean` | `false` | Renders as child element (Slot pattern) |

### Input

A form input with label, error state, and helper text.

```tsx
import { Input } from "@myorg/ui-lib";

<Input
  label="Email"
  type="email"
  error={errors.email?.message}
  helperText="We'll never share your email"
/>
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

MIT
