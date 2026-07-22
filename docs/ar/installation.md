---
title: التثبيت
description: كيفية تثبيت وتكوين مساحة عمل Ahmed Enterprise AI Workspace
---

# التثبيت

## المتطلبات الأساسية

- **Node.js** 18+ أو 20+
- **npm** أو **yarn** أو **pnpm**
- **Git**
- **OpenCode CLI** (الإصدار الأخير)

## خطوات التثبيت

### 1. استنساخ المستودع

```bash
git clone https://github.com/AhmedHassaan2/Ahmed-Enterprise-AI-Workspace.git
```

### 2. نسخ ملفات مساحة العمل

```bash
# Linux/macOS
cp -r Ahmed-Enterprise-AI-Workspace/* ~/.config/opencode/

# Windows
xcopy /E /I Ahmed-Enterprise-AI-Workspace\* %USERPROFILE%\.config\opencode\
```

### 3. التحقق من التثبيت

```bash
opencode --version
```

## التثبيت الفرعي (اختياري)

### تثبيت المهارات الإضافية

```bash
cd ~/.config/opencode
npm install
```

### تكوين المساعدات حسب المشروع

أنشئ ملف `.opencode/AGENTS.md` في جذر مشروعك لتكوين سلوك المساعدات:

```markdown
# Project Agent Configuration

## Tech Stack
- TypeScript (strict mode)
- Next.js 16 (App Router)
- Tailwind CSS
- Supabase
```

## التحقق من صحة التثبيت

```bash
# فحص شامل لمساحة العمل
/workspace-validate
```

## حل المشكلات الشائعة

| المشكلة | الحل |
|---------|------|
| `opencode: command not found` | تأكد من تثبيت OpenCode CLI |
| `Permission denied` | استخدم `sudo` على Linux/macOS |
| `Module not found` | قم بتشغيل `npm install` في مجلد مساحة العمل |

::: tip توصية
قم بتشغيل أمر `/health-check` بعد التثبيت للتأكد من أن كل شيء يعمل بشكل صحيح.
:::
