# Documentation Refactoring: Before / After

## Before (Anti-pattern)

```md
# UI Library

This is a UI library.

## Install

npm install something

## Components

We have a Button and an Input.

### Button

Use it like this:

<Button>Click me</Button>

## Notes

- TODO: document all props
- TODO: add examples
- Last updated: January 2024
```

**Problems:**
- No peer dependency info
- No prop documentation
- No realistic usage examples
- Outdated (January 2024)
- TODOs never completed
- Vague "check the code" instruction

## After (Preferred)

```md
# @myorg/ui-lib

A component library for Next.js with Tailwind CSS and Radix UI.

## Installation

npm install @myorg/ui-lib

## Peer Dependencies

- react >= 18.0.0
- next >= 14.0.0
- tailwindcss >= 3.4.0

## Usage

### Button

<Button variant="primary" size="lg" loading={isSubmitting}>
  Submit
</Button>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "primary" | "primary" | Visual style |
| size | "md" | "md" | Button size |
```

**Improvements:**
1. **Specific installation** — exact package name
2. **Peer dependencies** — version compatibility
3. **Realistic examples** — production-like usage
4. **Props table** — complete API reference
5. **Current dates** — no stale information
6. **Contributing link** — clear next steps
