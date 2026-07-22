---
name: form-engineering
description: Form design, validation, multi-step wizards, file uploads, and error handling patterns
category: frontend
level: concept
priority: high
dependencies: ["react-patterns"]
related_skills: ["react-patterns", "input-validation"]
related_agents: ["frontend"]
activation_rules:
  - keywords: ["form", "input", "validation", "submit", "wizard", "step", "upload"]
  - file_pattern: "src/**/*form*"
  - file_pattern: "src/**/*wizard*"
---

# Form Engineering

## Purpose

Guide form implementation with proper validation, error handling, accessibility, and user experience patterns.

## When to Use

- Building any form (contact, booking, registration, etc.)
- Implementing multi-step wizards
- Handling file uploads
- Adding form validation

## Core Concepts

### Controlled Form Pattern

```tsx
function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await submitToApi(formData);
    } catch (err) {
      setErrors({ form: 'Submission failed' });
    } finally {
      setLoading(false);
    }
  }
}
```

### Multi-Step Wizard Pattern

```tsx
function WizardForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  return (
    <form onSubmit={handleSubmit}>
      <StepIndicator current={step} total={4} />
      {step === 1 && <Step1 data={data} onChange={setData} />}
      {step === 2 && <Step2 data={data} onChange={setData} />}
      {step === 3 && <Step3 data={data} onChange={setData} />}
      {step === 4 && <Step4 data={data} />}
      <div className="flex gap-4">
        {step > 1 && <button type="button" onClick={() => setStep(s => s - 1)}>Back</button>}
        {step < 4 && <button type="button" onClick={() => setStep(s => s + 1)}>Next</button>}
      </div>
    </form>
  );
}
```

### Validation Rules

- Validate on submit, not on every keystroke (for initial load)
- Show errors next to the relevant field
- Use `aria-describedby` to link errors to inputs
- Disable submit button while loading
- Clear field errors when user starts typing

## Best Practices

- Always handle loading, success, and error states
- Provide clear, actionable error messages
- Use semantic HTML (`<form>`, `<label>`, `<input>`)
- Link labels to inputs with `htmlFor`/`id`
- Support keyboard navigation
- Test with screen readers
- Prevent double submission

## Anti-Patterns

- Submitting without validation
- Showing all errors at once instead of per-field
- Using placeholder text as labels
- Auto-focusing the first input (hurts screen readers)
- Clearing form on error (user loses input)
