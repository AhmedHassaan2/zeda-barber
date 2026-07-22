# Accessibility Refactoring: Before / After

## Before (Anti-pattern)

```tsx
// divs with onClick — no keyboard support
<div onClick={() => setActiveId(tab.id)} style={{ cursor: "pointer" }}>
  {tab.label}
</div>

// display: none — screen readers skip it
<div style={{ display: tab.id === activeId ? "block" : "none" }}>
  {tab.content}
</div>
```

**Problems:**
- `<div>` with `onClick` — not focusable, not keyboard accessible
- No ARIA roles — screen readers don't recognize the tab pattern
- No `aria-selected` — current tab not announced
- No keyboard navigation — can't arrow between tabs
- No focus styles — keyboard users can't see where they are

## After (Preferred)

```tsx
<div role="tablist" aria-label="Content tabs" onKeyDown={handleKeyDown}>
  <button
    role="tab"
    aria-selected={tab.id === activeId}
    aria-controls={`panel-${tab.id}`}
    tabIndex={tab.id === activeId ? 0 : -1}
    className="focus-visible:outline-2"
  >
    {tab.label}
  </button>
</div>
<div role="tabpanel" hidden={tab.id !== activeId}>
  {tab.content}
</div>
```

**Improvements:**
1. **`role="tablist"`** — screen readers announce "tab list, 3 tabs"
2. **`role="tab"` + `aria-selected`** — announces current tab state
3. **`aria-controls`** — links tab to its panel
4. **`hidden` attribute** — hides from both visual and assistive tech
5. **`onKeyDown`** — arrow keys navigate between tabs
6. **`focus-visible`** — clear focus indicator for keyboard users
