---
title: Adding i18n Support
description: Implement bilingual support with Arabic and English
---

# Adding i18n Support

## Overview

Implement full bilingual (Arabic + English) support with RTL layout.

## Step 1: Plan Translation Structure

```
@i18n Plan the translation structure for a bilingual application with Arabic and English
```

## Step 2: Set Up Translation Keys

```
@skill: i18n-architecture
@i18n Create a translation key structure for the application
```

## Step 3: Implement RTL Support

```
@skill: rtl-engineering
@i18n Implement RTL support using CSS logical properties
```

## Step 4: Build Language Switcher

```
@frontend Create a language switcher component that supports Arabic and English with proper RTL switching
```

## Step 5: Configure VitePress i18n

Add locale configuration to your VitePress config:

```typescript
export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    ar: {
      label: 'العربية',
      lang: 'ar',
      dir: 'rtl',
    }
  }
})
```

## Step 6: Create Arabic Pages

Place Arabic content under the `/ar/` directory.

## Step 7: Test Both Languages

- Verify language switcher works
- Check RTL layout for Arabic
- Ensure all links work across languages
- Verify search works in both languages

::: tip
Use VitePress's built-in `useData()` composable to access the current locale in components.
:::
