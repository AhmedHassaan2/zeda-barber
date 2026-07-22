---
name: realtime-patterns
description: Real-time communication patterns, WebSockets, Supabase Realtime, and live updates
category: backend
level: concept
priority: medium
dependencies: []
related_skills: ["supabase-patterns", "background-jobs"]
related_agents: ["backend"]
activation_rules:
  - keywords: ["realtime", "WebSocket", "live", "subscription", "broadcast"]
---

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
