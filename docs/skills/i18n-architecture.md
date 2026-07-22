---
title: Internationalization architecture, translation management, locale routing, and bilingual patterns
description: Internationalization architecture, translation management, locale routing, and bilingual patterns
---

# Internationalization architecture, translation management, locale routing, and bilingual patterns

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>i18n-architecture</code> | <strong>Category:</strong> i18n | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# I18n Architecture

## Purpose

Guide internationalization implementation for bilingual applications.

## When to Use

- Setting up i18n systems
- Managing translations
- Implementing language switching
- Handling locale-specific formats

## Core Concepts

### Translation System

```typescript
// src/lib/translations.ts
const translations = {
  ar: {
    hero: {
      title: 'احجز موعدك الآن',
      subtitle: 'أفضل خدمات الحلاقة',
    },
    booking: {
      step1: 'اختر الخدمة',
      step2: 'اختر الوقت',
    },
  },
  en: {
    hero: {
      title: 'Book Your Appointment',
      subtitle: 'Premium Barbershop Services',
    },
    booking: {
      step1: 'Select Service',
      step2: 'Select Time',
    },
  },
};

export function t(key: string, lang: 'ar' | 'en'): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value ?? key;
}
```

### Language Context

```tsx
// src/lib/language-context.tsx
'use client';
import { createContext, useContext, useState } from 'react';

type Language = 'ar' | 'en';

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}>({ lang: 'ar', setLang: () => {}, t: (key) => key });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState<Language>('ar');

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[lang];
    for (const k of keys) value = value?.[k];
    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
```

### Translation Keys Convention

```
section.element
hero.title
hero.subtitle
booking.step1
booking.step2
booking.submit
common.loading
common.error
common.success
```

## Best Practices

- Use consistent key naming
- Organize by section, not component
- Support both languages from day one
- Test with long text (German) and RTL (Arabic)
- Use ICU message format for plurals
- Don't hardcode strings in components
- Provide fallback for missing translations

## Anti-Patterns

- Hardcoding strings in components
- Inconsistent key naming
- Not testing both languages
- Missing fallback translations
- Ignoring RTL layout

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
