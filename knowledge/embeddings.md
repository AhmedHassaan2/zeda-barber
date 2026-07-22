# Text Embeddings — Knowledge Base

## Purpose

Text embeddings convert text into dense numerical vectors that capture semantic meaning. Similar texts produce similar vectors, enabling semantic search, clustering, classification, and RAG. This knowledge base covers embedding models, similarity metrics, and production integration patterns.

## Core Concepts

### What Are Embeddings?

Embeddings represent text as fixed-length vectors in high-dimensional space. A sentence like "How do I reset my password?" is converted to a vector like `[0.023, -0.156, 0.089, ...]` (typically 384-3072 dimensions).

**Key property:** Semantically similar texts have nearby vectors in the embedding space.

### Embedding Models

**OpenAI models:**
- `text-embedding-3-small` — 1536 dimensions, cost-effective, good general performance
- `text-embedding-3-large` — 3072 dimensions, highest accuracy, higher cost

**Open-source models:**
- `all-MiniLM-L6-v2` — 384 dimensions, fast, good for English
- `multilingual-e5-large` — 1024 dimensions, supports 100+ languages including Arabic
- `bge-large-en-v1.5` — 1024 dimensions, strong retrieval performance

**Model selection factors:** Dimensionality, speed, accuracy, language support, hosting requirements, cost.

### Similarity Metrics

**Cosine similarity** — Measures angle between vectors (range: -1 to 1). Most common; independent of magnitude.

**Dot product** — Measures combined magnitude and direction. Use when vector magnitude is meaningful.

**Euclidean distance** — Straight-line distance between vectors. Lower = more similar.

**When to use which:**
- Normalized vectors → cosine similarity (default choice)
- Unnormalized vectors with magnitude meaning → dot product
- Geometric analysis → Euclidean distance

### Dimensionality

**Higher dimensions** — More expressive, capture finer distinctions, but slower and more expensive to store/search.

**Lower dimensions** — Faster and cheaper, but may lose nuanced meaning. Sufficient for most use cases.

**Dimensionality reduction:** Techniques like PCA or Matryoshka Representation Learning (MRL) allow using subsets of dimensions.

### Batch Processing

Embedding multiple texts in a single API call is more efficient than individual calls:

```
Single:  100 texts × 100ms = 10 seconds
Batch:   100 texts in 1 call × 200ms = 0.2 seconds
```

**Batch limits:** OpenAI allows 2048 texts per request; most models have similar batch limits.

### Cost vs Quality

| Model | Dimensions | Cost per 1M tokens | Best for |
|---|---|---|---|
| text-embedding-3-small | 1536 | $0.02 | General use, cost-sensitive |
| text-embedding-3-large | 3072 | $0.13 | Maximum accuracy, complex queries |
| all-MiniLM-L6-v2 | 384 | Free (local) | Self-hosted, English-only |
| multilingual-e5-large | 1024 | Free (local) | Multilingual, Arabic support |

## Best Practices

1. **Choose multilingual embeddings for bilingual apps** — Use `multilingual-e5-large` or OpenAI's models for Arabic/English content; test embedding quality for both languages
2. **Preprocess text before embedding** — Strip HTML, normalize whitespace, remove special characters; clean input produces better embeddings
3. **Use batch embedding for efficiency** — Embed multiple texts per API call; batch processing is 10-50x faster than individual calls
4. **Normalize vectors for cosine similarity** — If using cosine similarity, normalize vectors to unit length; most embedding APIs do this automatically
5. **Store embeddings alongside metadata** — Each embedding should be associated with source ID, chunk text, and metadata for retrieval
6. **Test embedding quality empirically** — Don't assume one model is best for your domain; create a test set and measure retrieval accuracy
7. **Plan for dimensionality in storage** — Higher dimensions require more storage and slower search; choose dimensions that match your accuracy requirements
8. **Implement embedding caching** — Cache embeddings for unchanged text; re-embedding identical text wastes API calls

## Anti-Patterns

1. **Embedding raw HTML or markup** — Strip formatting before embedding; HTML tags add noise that degrades semantic quality
2. **Embedding entire documents as one vector** — Large documents lose nuance in a single embedding; chunk first, then embed each chunk
3. **Using the wrong similarity metric** — Mixing dot product with normalized vectors or vice versa produces incorrect rankings
4. **Ignoring embedding drift** — Different versions of embedding models produce incompatible vectors; version your embeddings and migrate when upgrading
5. **Embedding without dimension planning** — Storing 3072-dimensional vectors when 384 suffices wastes 8x storage and slows search
6. **Not handling multilingual text** — English-only models produce poor embeddings for Arabic; use multilingual models
7. **Embedding in the wrong order** — Text preprocessing (normalization, cleaning) must happen before embedding, not after
8. **Treating embeddings as encryption** — Embeddings are not secure; text can be reconstructed from embeddings with sufficient effort

## Common Mistakes

1. **Not chunking before embedding** — Large text blocks produce vague embeddings; chunk into 256-1024 token segments before embedding
2. **Inconsistent preprocessing** — Different cleaning for query vs document embeddings breaks similarity; use identical preprocessing
3. **Ignoring embedding latency** — Embedding APIs add latency to queries; cache frequently-embedded text and use batch processing
4. **Mixing embedding model versions** — v1 and v2 embeddings are incompatible; don't mix versions in the same vector store
5. **Forgetting token limits** — Embedding models have token limits (8192 for OpenAI); truncate or chunk long text before embedding
6. **Not testing with actual queries** — Embedding quality depends on query-document matching; test with real user queries
7. **Over-indexing on benchmark scores** — Model benchmarks may not reflect your domain performance; test with your specific data
8. **Neglecting Arabic text tokenization** — Arabic text may tokenize differently; ensure embedding model handles Arabic morphology correctly

## Decision Guidelines

| Requirement | Recommendation |
|---|---|
| Cost-sensitive, English only | all-MiniLM-L6-v2 (self-hosted) |
| Arabic + English | multilingual-e5-large or text-embedding-3-small |
| Maximum accuracy | text-embedding-3-large with reranking |
| Privacy-sensitive data | Self-hosted model (no API calls) |
| Real-time search | Smaller dimensions (384-768) with HNSW index |
| Batch indexing | text-embedding-3-small with batch API |

## References

- OpenAI Embeddings Guide: https://platform.openai.com/docs/guides/embeddings
- Sentence Transformers: https://www.sbert.net/
- MTEB Leaderboard: https://huggingface.co/spaces/mteb/leaderboard
- Hugging Face Embedding Models: https://huggingface.co/models?pipeline_tag=sentence-similarity
- Supabase pgvector: https://supabase.com/docs/guides/database/extensions/pgvector

## Practical Notes

- **Supabase storage:** Store embeddings in a Supabase table with pgvector extension; create vector index for fast similarity search
- **OpenAI embedding API:** Simple POST request; use `input` parameter with string or array; returns embedding vectors
- **Testing quality:** Create 20-30 query-document pairs from your domain; measure recall@5 to evaluate embedding quality
- **Arabic embeddings:** Test with Arabic queries against Arabic documents; measure quality separately from English
- **Cost tracking:** Embedding costs are typically low compared to LLM costs; budget $1-10/month for most applications
