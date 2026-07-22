# Testing Refactoring: Before / After

## Before (Anti-pattern)

```tsx
// Testing internal state — breaks on refactor
it("uses useState", () => {
  const wrapper = shallow(<UserCard ... />);
  expect(wrapper.state("isConfirming")).toBe(false);
});

// Brittle CSS selectors — class rename breaks test
it("renders correctly", () => {
  const wrapper = shallow(<UserCard ... />);
  expect(wrapper.find(".flex.items-center")).toHaveLength(1);
});

// Testing implementation, not behavior
it("click handler exists", () => {
  const wrapper = shallow(<UserCard ... />);
  expect(wrapper.find("button").prop("onClick")).toBeDefined();
});
```

**Problems:**
- `shallow` rendering — no real DOM interaction
- Testing `useState` internals — refactor breaks tests
- CSS class selectors — Tailwind update breaks tests
- No user interaction — no `click` simulation
- No edge cases — empty names, long emails
- No async handling — confirmation flow untested

## After (Preferred)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("calls onRemove with email when confirm clicked twice", async () => {
  const user = userEvent.setup();
  render(<UserCard {...defaultUser} />);

  await user.click(screen.getByText("Remove"));
  expect(screen.getByText("Confirm?")).toBeInTheDocument();
  expect(mockOnRemove).not.toHaveBeenCalled();

  await user.click(screen.getByText("Confirm?"));
  expect(mockOnRemove).toHaveBeenCalledWith("ahmed@example.com");
});
```

**Improvements:**
1. **`@testing-library/react`** — tests real DOM, not internals
2. **Role-based queries** — `getByText` over CSS selectors
3. **User event simulation** — real click flow with confirmation
4. **Behavioral assertions** — test what user sees and does
5. **Edge cases covered** — different roles, empty states
6. **`beforeEach` cleanup** — prevents test pollution
