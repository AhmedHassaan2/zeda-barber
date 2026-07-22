---
title: Keyboard navigation patterns, focus management, and interactive element handling
description: Keyboard navigation patterns, focus management, and interactive element handling
---

# Keyboard navigation patterns, focus management, and interactive element handling

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>keyboard-navigation</code> | <strong>Category:</strong> quality | <strong>Priority:</strong> high | <strong>Level:</strong> concept
</div>

# Keyboard Navigation

## Purpose

Guide keyboard navigation implementation for accessible interfaces.

## When to Use

- Implementing interactive components
- Managing focus in modals/dialogs
- Building custom keyboard shortcuts
- Testing keyboard accessibility

## Core Concepts

### Focus Management

```tsx
// Modal focus trap
function Modal({ isOpen, onClose, children }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  return (
    <dialog open={isOpen} onClose={onClose}>
      <button ref={closeRef} onClick={onClose}>Close</button>
      {children}
    </dialog>
  );
}
```

### Keyboard Patterns

| Component | Keys | Action |
|-----------|------|--------|
| Button | Enter, Space | Activate |
| Link | Enter | Navigate |
| Tab | Tab, Shift+Tab | Move between items |
| Menu | Arrow keys, Escape | Navigate, close |
| Dialog | Escape | Close |
| Listbox | Arrow keys | Select item |

### Focus Indicators

```css
/* Visible focus ring */
:focus-visible {
  outline: 2px solid #e9c176;
  outline-offset: 2px;
}

/* Remove default outline only when replacing */
:focus:not(:focus-visible) {
  outline: none;
}
```

## Best Practices

- Never remove focus indicators
- Use `tabIndex={0}` for custom interactive elements
- Implement focus trapping for modals
- Return focus to trigger after closing modal
- Use logical tab order
- Provide skip navigation links
- Test with keyboard only

## Anti-Patterns

- `outline: none` without replacement
- Non-interactive elements with `tabIndex={0}`
- Missing focus trap in modals
- Focus lost after closing dialogs
- Using only mouse events for interaction

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
