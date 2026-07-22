---
title: البدء السريع
description: دليل تفاعلي خطوة بخطوة للبدء
---

# البدء السريع

## النتيجة المتوقعة
في نهاية هذا الدرس، ستتمكن من:
- تثبيت مساحة العمل
- استخدام أول وكيل
- تنفيذ أول أمر

## الخطوة 1: التثبيت

### 1.1 استنساخ المستودع
```bash
git clone https://github.com/AhmedHassaan2/Ahmed-Enterprise-AI-Workspace.git
```

### 1.2 النسخ إلى مساحة العمل
```bash
# Linux/macOS
cp -r Ahmed-Enterprise-AI-Workspace/* ~/.config/opencode/

# Windows
xcopy /E /I Ahmed-Enterprise-AI-Workspace\* %USERPROFILE%\.config\opencode\
```

### 1.3 التحقق
```bash
opencode --version
# يجب أن يعرض: v1.1 أو أعلى
```

## الخطوة 2: أول استخدام

### 2.1 افتح OpenCode
```bash
opencode
```

### 2.2 استدعِ وكيل frontend
```
@frontend أريد إنشاء مكون زر بسيط
```

### 2.3 شاهد النتيجة
سيقوم الوكيل بإنشاء مكون زر يتبع أفضل الممارسات.

## الخطوة 3: أول أمر

### 3.1 فحص صحة مساحة العمل
```
/health-check
```

### 3.2 مراجعة الكود
```
/review
```

## الخطوة 4: تحميل مهارة

### 4.1 طلب مهارة محددة
```
@skill: react-patterns
```

### 4.2 استخدام المعرفة المحملة
الآن يمكن للوكيل استخدام معرفة أنماط React المتقدمة.

## ما بعد الانتهاء

- اقرأ [الهيكلة العامة](/ar/architecture) لفهم كيف تعمل المكونات معًا
- جرب [إضافة وكيل مخصص](/ar/tutorials/custom-agent)
- شاهد [أفضل الممارسات](/ar/tutorials/best-practices)

::: info
إذا واجهت مشكلة، راجع [الأسئلة الشائعة](/ar/faq).
:::
