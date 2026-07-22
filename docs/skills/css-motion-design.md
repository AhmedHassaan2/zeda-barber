---
title: CSS animations, keyframes, transitions, micro-interactions, motion design principles, and performance optimization
description: CSS animations, keyframes, transitions, micro-interactions, motion design principles, and performance optimization
---

# CSS animations, keyframes, transitions, micro-interactions, motion design principles, and performance optimization

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>css-motion-design</code> | <strong>Category:</strong> frontend | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# CSS & Motion Design

## Purpose

Guide CSS animation and motion design implementation for performant, meaningful, and accessible animations across web interfaces.

## When to Use

- Creating page transitions and loading states
- Building micro-interactions (hover, click, focus)
- Implementing scroll-triggered animations
- Designing feedback animations
- Adding skeleton loaders

## Core Concepts

### Keyframe Animations

```css
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### CSS Transitions

```css
/* Simple hover effect */
.hover-lift {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Staggered transitions */
.stagger-item {
  transition: opacity 300ms ease, transform 300ms ease;
  transition-delay: calc(var(--index) * 50ms);
}
```

### Tailwind Animation Utilities

```tsx
{/* Built-in animations */}
<div className="animate-pulse" />        {/* Loading skeleton */}
<div className="animate-spin" />         {/* Spinner */}
<div className="animate-bounce" />       {/* Attention */}

{/* Transition utilities */}
<button className="transition-all duration-300 ease-in-out hover:scale-105">
  Hover me
</button>

<div className="transition-opacity duration-200 hover:opacity-80">
  Fade on hover
</div>
```

### Micro-Interactions

```tsx
// Button press feedback
<button className="
  bg-primary text-surface px-6 py-3 rounded-lg
  transition-all duration-200
  hover:scale-105 hover:shadow-lg
  active:scale-95
  focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
">
  Book Now
</button>

// Card hover effect
<div className="
  bg-surface rounded-xl p-6
  transition-all duration-300
  hover:-translate-y-1 hover:shadow-xl
  hover:border-primary/30
">
  <h3>Service</h3>
</div>

// Icon rotation on hover
<div className="transition-transform duration-300 hover:rotate-90">
  <SettingsIcon />
</div>

// Color transition
<a className="text-on-surface/70 hover:text-primary transition-colors duration-200">
  Link
</a>
```

### Skeleton Loading Patterns

```tsx
function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-48 bg-surface-variant rounded-lg" />
      <div className="h-4 bg-surface-variant rounded w-3/4" />
      <div className="h-4 bg-surface-variant rounded w-1/2" />
    </div>
  );
}
```

### Scroll-Triggered Animations

```tsx
// Using Intersection Observer
function useInView(ref: React.RefObject<HTMLElement>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

// Usage
<section ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
  Content here
</section>
```

### Performance Rules

```css
/* Good: GPU-accelerated properties */
.animated {
  transform: translateX(100px);
  opacity: 0.5;
  transition: transform 300ms ease, opacity 300ms ease;
}

/* Bad: Layout-triggering properties */
.animated-bad {
  width: 100px;
  margin-left: 50px;
  padding: 20px;
  transition: all 300ms ease; /* Triggers layout recalculations */
}
```

### Easing Curves

| Curve | Value | Use Case |
|-------|-------|----------|
| `ease` | `ease` | General purpose |
| `ease-in` | `ease-in` | Exiting elements |
| `ease-out` | `ease-out` | Entering elements |
| `ease-in-out` | `ease-in-out` | Elements that move between positions |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Material Design standard | Smooth, natural feel |
| `cubic-bezier(0, 0, 0.2, 1)` | Material Decelerate | Entering elements |
| `cubic-bezier(0.4, 0, 1, 1)` | Material Accelerate | Exiting elements |

### Reduced Motion

```css
/* ALWAYS include this for accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// React hook for reduced motion preference
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
```

## Best Practices

- Use `transform` and `opacity` only — GPU-accelerated, no layout thrashing
- Keep animations under 400ms for interactions, under 700ms for page transitions
- Always respect `prefers-reduced-motion`
- Use `will-change` sparingly and remove after animation completes
- Test on mobile devices and low-end hardware
- Provide visual feedback for every user action
- Use consistent easing across the application
- Animate only when it adds meaning (not decoration)
- Use CSS transitions for simple state changes, keyframes for complex sequences
- Stack animations with `transition-delay` for staggered effects

## Anti-Patterns

- Animating `width`, `height`, `margin`, `padding`, `top/left/right/bottom` (triggers layout)
- Not respecting reduced motion preferences
- Animations longer than 1 second for interactions
- Using `transition: all` (unpredictable performance)
- Animating on page load without user trigger (distracting)
- Blocking user interaction during animation
- Using JavaScript animation libraries when CSS handles it
- Inconsistent easing curves across the application
- Missing `transform-origin` for rotation/scale animations
- Not testing animation on 60fps and 30fps displays

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
