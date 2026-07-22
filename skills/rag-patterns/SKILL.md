---
name: rag-patterns
description: RAG implementation, vector embeddings, semantic search, and knowledge base construction
category: ai
level: concept
priority: medium
dependencies: ["llm-integration"]
related_skills: ["llm-integration", "prompt-engineering"]
related_agents: ["ai-engineer"]
activation_rules:
  - keywords: ["RAG", "embedding", "vector", "semantic search", "knowledge base"]
---

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
