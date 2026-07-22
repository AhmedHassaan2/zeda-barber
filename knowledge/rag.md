# Retrieval-Augmented Generation (RAG) — Knowledge Base

## Purpose

RAG combines information retrieval with language model generation. It retrieves relevant documents from a knowledge base and provides them as context to an LLM, enabling accurate, grounded responses without retraining. This knowledge base covers chunking, retrieval, and generation strategies for production RAG systems.

## Core Concepts

### RAG Pipeline

```
User Query → Query Processing → Retrieval → Reranking → Context Assembly → LLM Generation → Response
```

**Query processing** — Reformulate, expand, or decompose the user's query for better retrieval.

**Retrieval** — Search the knowledge base for relevant documents using keyword, semantic, or hybrid search.

**Reranking** — Re-score retrieved documents by relevance to refine the top results.

**Context assembly** — Format and truncate retrieved documents to fit the LLM's context window.

**Generation** — LLM generates a response grounded in the provided context.

### Chunking Strategies

**Fixed-size chunking** — Split documents into chunks of fixed token count (e.g., 512 tokens). Simple but may break semantic units.

**Semantic chunking** — Split at natural boundaries (paragraphs, sections, topics). Preserves meaning but varies in chunk size.

**Recursive chunking** — Try to split at large boundaries first (sections), then smaller (paragraphs, sentences). Balances size and semantics.

**Overlap chunking** — Add overlap between chunks to prevent information loss at boundaries. Typically 10-20% overlap.

**Metadata-enriched chunking** — Attach metadata (source, title, section) to each chunk for filtering and context.

### Embedding and Vector Search

**Embedding models** convert text to dense vectors capturing semantic meaning. Similar concepts have similar vectors.

**Vector similarity search** finds chunks whose embeddings are closest to the query embedding using cosine similarity, dot product, or Euclidean distance.

### Hybrid Search

**Keyword search (BM25)** — Matches exact terms; good for specific names, codes, and rare terms.

**Semantic search (vector)** — Matches meaning; good for paraphrased queries and conceptual matches.

**Hybrid** — Combine both with weighted scoring (RRF or linear combination) for best coverage.

### Reranking

**Cross-encoder reranking** — A separate model scores each (query, document) pair for relevance. More accurate but slower than initial retrieval.

**Two-phase retrieval:** Vector search retrieves top 50-100 candidates; reranker selects top 5-10.

### Evaluation Metrics

**Retrieval metrics:** Recall@k, Precision@k, Mean Reciprocal Rank (MRR), Normalized Discounted Cumulative Gain (NDCG)

**Generation metrics:** Faithfulness (answer grounded in context), relevance (answer addresses query), answer correctness

## Best Practices

1. **Chunk by semantic boundaries** — Split at paragraphs or sections, not arbitrary token counts; preserve complete thoughts and context
2. **Use hybrid search** — Combine BM25 keyword search with vector semantic search; each catches cases the other misses
3. **Implement two-phase retrieval** — Fast vector search for candidates, then reranker for precision; balances speed and accuracy
4. **Enrich chunks with metadata** — Add source document, section title, and date to each chunk; enables filtering and attribution
5. **Test chunk sizes systematically** — Evaluate different chunk sizes (256, 512, 1024 tokens); optimal size varies by content and model
6. **Handle context overflow gracefully** — When retrieved context exceeds token budget, truncate by relevance score; never cut mid-sentence
7. **Implement citation and attribution** — Include source references in responses so users can verify information
8. **Monitor retrieval quality** — Track which queries return poor results; use feedback to improve chunking, embedding, and retrieval

## Anti-Patterns

1. **Using fixed-size chunks only** — Arbitrary token splits break sentences and concepts; always consider semantic boundaries
2. **Retrieving too few documents** — Insufficient context leads to incomplete answers; retrieve more candidates and let reranking filter
3. **Retrieving too many documents** — Overstuffing context confuses the model; use reranking to select the most relevant 5-10
4. **Ignoring document preprocessing** — Raw documents with headers, footers, and formatting noise reduce retrieval quality; clean and normalize
5. **Not handling multi-language queries** — Different languages need different embeddings or multilingual models; test with Arabic and English
6. **Forgetting about query expansion** — Single-word or ambiguous queries retrieve poorly; expand with synonyms or reformulate
7. **Using only vector search** — Pure semantic search misses exact keyword matches; combine with BM25 for comprehensive retrieval
8. **Not evaluating end-to-end** — Measuring only retrieval accuracy misses generation quality; evaluate the complete pipeline

## Common Mistakes

1. **Chunking without overlap** — Information at chunk boundaries may be lost; add 10-20% overlap between chunks
2. **Treating all documents equally** — Some sources are more authoritative; weight trusted sources higher in retrieval
3. **Ignoring chunk embedding quality** — Poor embeddings produce poor retrieval; choose appropriate embedding models for your domain
4. **Not updating the knowledge base** — Outdated documents produce outdated responses; implement incremental updates
5. **Using wrong similarity metric** — Cosine similarity for normalized vectors, dot product for magnitude-sensitive tasks
6. **Forgetting about metadata filtering** — Without metadata filtering, retrieval returns documents from wrong sources or dates
7. **Not testing with real queries** — Synthetic test queries don't represent actual user behavior; test with production query logs
8. **Over-relying on chunk relevance** — Sometimes the answer requires multiple chunks; implement multi-hop retrieval for complex questions

## Decision Guidelines

| Content Type | Chunking Strategy |
|---|---|
| Technical documentation | Section-based chunking (512-1024 tokens) with metadata |
| FAQ content | Question-answer pairs as complete chunks |
| Legal/contracts | Paragraph-based chunking with clause metadata |
| Code documentation | Function/class-level chunks with file path metadata |
| Blog posts | Section-based chunks with title and date metadata |

| Query Type | Retrieval Strategy |
|---|---|
| Simple factual | Vector search + top-3 |
| Complex reasoning | Hybrid search + reranking + top-10 |
| Multi-hop questions | Iterative retrieval with query decomposition |
| Code search | Hybrid search with code-specific embeddings |

## References

- LangChain RAG Guide: https://js.langchain.com/docs/tutorials/rag/
- LlamaIndex Documentation: https://docs.llamaindex.ai/
- "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (Lewis et al., 2020)
- Pinecone RAG Guide: https://www.pinecone.io/learn/retrieval-augmented-generation/
- Weaviate RAG Recipes: https://weaviate.io/developers/weaviate

## Practical Notes

- **Supabase + pgvector:** Store embeddings in Supabase with pgvector extension; use for hybrid search with metadata filtering
- **Embedding models:** Use OpenAI `text-embedding-3-small` for cost efficiency or `text-embedding-3-large` for better accuracy
- **Chunk size testing:** Start with 512 tokens, test with 256 and 1024; measure retrieval accuracy at each size
- **Arabic content:** Use multilingual embedding models (multilingual-e5-large); Arabic tokenization requires careful chunk size calibration
- **Production monitoring:** Log retrieval results, user feedback, and generation quality; use data to continuously improve the pipeline
