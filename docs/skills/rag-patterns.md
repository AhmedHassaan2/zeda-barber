---
title: RAG implementation, vector embeddings, semantic search, and knowledge base construction
description: RAG implementation, vector embeddings, semantic search, and knowledge base construction
---

# RAG implementation, vector embeddings, semantic search, and knowledge base construction

<div class="tip custom-block" style="padding: 1rem;">
<strong>Skill:</strong> <code>rag-patterns</code> | <strong>Category:</strong> ai | <strong>Priority:</strong> medium | <strong>Level:</strong> concept
</div>

# RAG Patterns

## Purpose

Guide Retrieval-Augmented Generation implementation for knowledge-based AI.

## When to Use

- Building knowledge base features
- Implementing semantic search
- Adding document Q&A
- Creating contextual AI responses

## Core Concepts

### RAG Pipeline

```
Documents → Chunking → Embedding → Vector Store → Retrieval → LLM → Response
```

### Document Processing

```typescript
// Chunk documents for embedding
function chunkDocument(text: string, chunkSize = 500): string[] {
  const chunks: string[] = [];
  const sentences = text.split(/[.!?]+/);
  let currentChunk = '';

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > chunkSize) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
    }
    currentChunk += sentence + '. ';
  }

  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  return chunks;
}
```

### Vector Store Integration

```typescript
// Using Supabase pgvector
const { data } = await supabase.rpc('match_documents', {
  query_embedding: embedding,
  match_count: 5,
  match_threshold: 0.7,
});
```

### Retrieval-Augmented Prompt

```typescript
const augmentedPrompt = `Context from knowledge base:
${relevantDocuments.map(doc => doc.content).join('\n\n')}

User question: ${question}

Answer based on the context above. If the context doesn't contain the answer, say so.`;
```

## Best Practices

- Chunk documents appropriately (200-500 tokens)
- Use high-quality embeddings
- Implement hybrid search (keyword + semantic)
- Handle irrelevant results gracefully
- Cache embeddings for performance
- Monitor retrieval quality
- Provide source citations

## Anti-Patterns

- Chunking too large or too small
- Not handling irrelevant results
- Ignoring embedding quality
- Not caching embeddings
- Missing source attribution

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
