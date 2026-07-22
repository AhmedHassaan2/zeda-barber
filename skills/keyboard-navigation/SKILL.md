---
name: keyboard-navigation
description: Keyboard navigation patterns, focus management, and interactive element handling
category: quality
level: concept
priority: high
dependencies: []
related_skills: ["wcag-checklist", "screen-reader-patterns"]
related_agents: ["accessibility"]
activation_rules:
  - keywords: ["keyboard", "focus", "tab", "arrow keys", "escape", "enter"]
---

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
