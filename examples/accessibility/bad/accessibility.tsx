// WHY WRONG: No semantic roles, no keyboard support, no ARIA attributes.
// Screen readers can't identify the tab pattern, keyboard users are stuck.

"use client";

import { useState } from "react";

export function Tabs({ tabs, defaultTab }: any) {
  const [activeId, setActiveId] = useState(defaultTab || tabs[0].id);

  return (
    <div>
      <div style={{ display: "flex", gap: "4px" }}>
        {tabs.map((tab: any) => (
          <div
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              backgroundColor: tab.id === activeId ? "#fff" : "#f0f0f0",
              borderTopLeftRadius: "8px",
              borderTopRightRadius": "8px",
              // No role, no aria-selected, no keyboard handlers
              // No focus styles, no tabIndex management
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {tabs.map((tab: any) => (
        <div key={tab.id} style={{ padding: "16px", display: tab.id === activeId ? "block" : "none" }}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}

// Problems:
// - <div> with onClick — not keyboard accessible by default
// - No role="tablist" / role="tab" / role="tabpanel"
// - No aria-selected, aria-controls, aria-labelledby
// - No keyboard navigation (arrow keys, Home, End)
// - No focus management between tabs
// - display: none hides content from screen readers too
// - No focus-visible styles
