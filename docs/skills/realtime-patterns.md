---
title: Real-time communication patterns, WebSockets, Supabase Realtime, and live updates
description: Real-time communication patterns, WebSockets, Supabase Realtime, and live updates
---

# Real-time communication patterns, WebSockets, Supabase Realtime, and live updates

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>realtime-patterns</code> | <strong>Category:</strong> backend | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# Real-time Patterns

## Purpose

Guide real-time communication implementation for live updates.

## When to Use

- Implementing live notifications
- Adding real-time data updates
- Building chat features
- Creating collaborative editing

## Core Concepts

### Supabase Realtime

```typescript
// Subscribe to changes
const channel = supabase
  .channel('messages')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => {
      console.log('New message:', payload.new);
      setMessages((prev) => [...prev, payload.new]);
    }
  )
  .subscribe();

// Cleanup
supabase.removeChannel(channel);
```

### Presence

```typescript
// Track who's online
const channel = supabase.channel('room-1', {
  config: { presence: { key: userId } },
});

channel.on('presence', { event: 'sync' }, () => {
  const state = channel.presenceState();
  setOnlineUsers(Object.keys(state));
});

channel.track({ user_id: userId, online_at: new Date().toISOString() });
```

### Broadcast

```typescript
// Send real-time events
channel.send({
  type: 'broadcast',
  event: 'cursor_move',
  payload: { x: 100, y: 200, userId },
});

// Listen for events
channel.on('broadcast', { event: 'cursor_move' }, (payload) => {
  updateCursor(payload.payload.userId, payload.payload);
});
```

## Best Practices

- Use appropriate channel names
- Implement presence for online status
- Handle connection state changes
- Clean up subscriptions
- Limit concurrent connections
- Handle reconnection gracefully
- Use broadcast for ephemeral events

## Anti-Patterns

- Not cleaning up subscriptions
- Too many channels
- Sending large payloads
- Not handling disconnections
- Using real-time for non-critical updates

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
