# Vector Databases — Knowledge Base

## Purpose

Vector databases store and query high-dimensional vectors (embeddings) efficiently. They enable semantic search, similarity matching, and RAG by finding vectors that are closest to a query vector. This knowledge base compares vector database options, indexing strategies, and optimization patterns.

## Core Concepts

### Vector Database Comparison

**Pinecone** — Fully managed cloud vector database.
- Pros: Zero-ops, automatic scaling, strong performance, metadata filtering
- Cons: Vendor lock-in, cost at scale, limited customization
- Best for: Teams that want managed infrastructure without DevOps

**Weaviate** — Open-source vector database with GraphQL API.
- Pros: Rich filtering, hybrid search built-in, module system, self-hostable
- Cons: Operational complexity for self-hosting, memory usage
- Best for: Teams needing hybrid search and customization

**pgvector (Supabase)** — PostgreSQL extension for vector storage.
- Pros: No new infrastructure, SQL interface, ACID transactions, Supabase integration
- Cons: Slower than dedicated vector DBs at very large scale, limited vector-specific features
- Best for: Teams already using PostgreSQL/Supabase, small-to-medium datasets

**Qdrant** — Open-source vector database written in Rust.
- Pros: High performance, rich filtering, gRPC support, easy deployment
- Cons: Smaller community, fewer managed options
- Best for: Performance-critical applications with self-hosting capability

**Chroma** — Open-source embedding database designed for simplicity.
- Pros: Easy to start, Python-native, good for prototyping
- Cons: Limited scalability, fewer production features
- Best for: Prototyping and development

### Indexing Algorithms

**HNSW (Hierarchical Navigable Small World)**
Graph-based algorithm creating a multi-layered navigation structure.
- Pros: Fast queries (O(log n)), high recall, good for dynamic data
- Cons: Memory-intensive, slower index building
- Used by: Most vector databases (default in Pinecone, Weaviate, Qdrant)

**IVF (Inverted File Index)**
Partitions vectors into clusters (Voronoi cells); searches only nearby clusters.
- Pros: Memory-efficient, fast index building, good for static data
- Cons: Lower recall than HNSW, requires cluster retraining
- Used by: pgvector, Milvus

**Flat (Brute Force)**
Compares query against every vector. Exact results.
- Pros: 100% recall, simple implementation
- Cons: Slow for large datasets (O(n) per query)
- Best for: Small datasets (<10K vectors) or as baseline

### Metadata Filtering

Attach structured data to vectors and filter during search:

```sql
-- pgvector example
SELECT * FROM embeddings
WHERE content_vector <=> $1
AND metadata->>'category' = 'documentation'
AND metadata->>'language' = 'ar'
ORDER BY content_vector <=> $1
LIMIT 10;
```

### Hybrid Search

Combine vector similarity with keyword matching:

**Reciprocal Rank Fusion (RRF):** Merge rankings from vector and keyword search using reciprocal rank scores.

**Linear combination:** Weighted sum of vector similarity score and keyword relevance score.

### Performance Tuning

**Index parameters:** HNSW `ef_construction` (build quality), `m` (connections per node), `ef_search` (query accuracy)

**Chunk size affects performance:** Smaller chunks = more vectors = slower search but more precise matching.

**Distance metric affects speed:** Cosine similarity requires normalized vectors; dot product is faster for pre-normalized data.

## Best Practices

1. **Start with pgvector if using Supabase** — No new infrastructure needed; upgrade to dedicated vector DB if performance requires it
2. **Choose HNSW for most use cases** — Best balance of speed and recall; tune `ef_search` for accuracy vs speed tradeoff
3. **Implement hybrid search** — Combine vector and keyword search; catches both semantic and exact matches
4. **Filter by metadata before vector search** — Narrow the search space with metadata filters; faster and more relevant results
5. **Batch index operations** — Insert vectors in batches of 100-1000; bulk operations are much faster than individual inserts
6. **Monitor index size and query latency** — Track vector count, memory usage, and p95 query latency; set alerts for degradation
7. **Use appropriate dimensions** — Higher dimensions improve accuracy but increase storage and search time; profile different sizes
8. **Implement proper backup strategy** — Vector data is expensive to regenerate; ensure backups include embeddings and metadata

## Anti-Patterns

1. **Choosing based on benchmarks alone** — Benchmark results may not reflect your workload; test with your actual data and queries
2. **Ignoring metadata schema design** — Poorly structured metadata limits filtering capability; plan metadata schema before indexing
3. **Over-indexing** — Too many indexes slow writes and consume memory; only index fields used in filters
4. **Using vector search for exact matches** — For exact ID lookups or exact text matching, use traditional database queries instead
5. **Not planning for scale** — Vector databases grow fast; plan storage, memory, and query capacity for 10x your current size
6. **Ignoring embedding updates** — When embedding models change, all vectors must be re-generated; plan for model migration
7. **Mixing incompatible metrics** — Using cosine similarity for one search and dot product for another in the same index causes inconsistent results
8. **Skipping connection pooling** — Each vector search creates connections; use connection pooling for production workloads

## Common Mistakes

1. **Not creating vector indexes** — Without an index, every query does brute-force search; always create an HNSW or IVF index
2. **Using wrong distance metric for normalized vectors** — If embeddings are normalized, cosine and dot product give identical rankings; pick one consistently
3. **Forgetting about memory** — Vector databases are memory-intensive; 1M vectors × 1536 dimensions × 4 bytes ≈ 6GB RAM
4. **Not testing with production data size** — Small test datasets don't reveal performance issues; test with production-scale data
5. **Ignoring query latency requirements** — If you need <100ms responses, test vector search under load with realistic data
6. **Hardcoding index parameters** — Default parameters may not be optimal; tune HNSW `m` and `ef_construction` for your data
7. **Not implementing data lifecycle** — Old or irrelevant vectors accumulate; implement deletion policies and TTL where appropriate
8. **Mixing vector and relational data without planning** — Joining vector search results with relational data requires careful schema design

## Decision Guidelines

| Dataset Size | Recommendation |
|---|---|
| < 10K vectors | pgvector (no new infrastructure) |
| 10K - 1M vectors | pgvector with HNSW index or Qdrant |
| 1M - 10M vectors | Pinecone, Weaviate, or Qdrant |
| > 10M vectors | Pinecone (managed) or Weaviate cluster |
| Prototyping | Chroma or pgvector |
| Already on Supabase | pgvector first, migrate later if needed |

| Requirement | Database Choice |
|---|---|
| Zero operations | Pinecone |
| Hybrid search | Weaviate or pgvector |
| SQL interface | pgvector |
| Maximum speed | Qdrant or Pinecone |
| Self-hosted | Weaviate, Qdrant, or pgvector |

## References

- Pinecone Documentation: https://docs.pinecone.io/
- Weaviate Documentation: https://weaviate.io/developers/weaviate
- pgvector Documentation: https://github.com/pgvector/pgvector
- Qdrant Documentation: https://qdrant.tech/documentation/
- Vector Database Comparison: https://superlinked.com/vector-db-comparison
- HNSW Paper: https://arxiv.org/abs/1603.09320

## Practical Notes

- **Supabase pgvector setup:** Enable the `vector` extension; create table with `vector(1536)` column; add HNSW index
- **Index creation in pgvector:** `CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);`
- **Query performance:** pgvector with HNSW typically achieves <50ms for 1M vectors; test with your actual data
- **Cost comparison:** pgvector on Supabase Pro ($25/mo) vs Pinecone Starter ($0) vs Pinecone Standard ($70/mo)
- **Migration path:** Start with pgvector; if performance limits are hit, migrate to Qdrant or Pinecone with data export/import
