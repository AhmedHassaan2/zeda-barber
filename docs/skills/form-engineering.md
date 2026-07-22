---
title: Form design, validation, multi-step wizards, file uploads, and error handling patterns
description: Form design, validation, multi-step wizards, file uploads, and error handling patterns
---

# Form design, validation, multi-step wizards, file uploads, and error handling patterns

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>form-engineering</code> | <strong>Category:</strong> frontend | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

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
