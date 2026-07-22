// WHY: Semantic HTML, ARIA attributes, keyboard navigation, and focus
// management make interfaces usable for everyone, not just sighted users.

"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface Tab {
  id: string;
  label: string;
  content: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTab ?? tabs[0].id);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>, index: number) {
    const isEnabled = { ArrowRight: true, ArrowLeft: true, Home: true, End: true };
    if (!isEnabled[event.key as keyof typeof isEnabled]) return;

    event.preventDefault();
    let nextIndex = index;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    const nextTab = tabs[nextIndex];
    setActiveId(nextTab.id);
    tabRefs.current.get(nextTab.id)?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Content tabs" onKeyDown={(e) => handleKeyDown(e, tabs.findIndex((t) => t.id === activeId))}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={tab.id === activeId}
            aria-controls={`panel-${tab.id}`}
            tabIndex={tab.id === activeId ? 0 : -1}
            className="px-4 py-2 text-sm font-medium rounded-t-lg focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeId}
          className="p-4 border rounded-b-lg"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
