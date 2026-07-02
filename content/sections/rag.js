SECTION_CONTENT['rag'] = { default: `
# RAG — Retrieval-Augmented Generation

## What is RAG?

RAG is a technique that **grounds LLM responses in your own data** by retrieving relevant documents at query time and injecting them into the prompt.

Without RAG: the model answers from its training data (which has a knowledge cutoff and doesn't know your private data).

With RAG: the model answers from your up-to-date, private, authoritative documents.

\`\`\`mermaid
flowchart LR
    Q[User question] --> E[Embed the question]
    E --> S[(Vector DB<br/>semantic search)]
    S --> K[Top-K relevant chunks]
    K --> RR[Re-rank by relevance]
    RR --> P[Inject into prompt]
    P --> L[LLM]
    L --> A([Grounded answer<br/>with citations])
\`\`\`

---

## Embeddings

To search by meaning (not keyword), you convert text to embeddings — numerical vectors that capture semantic meaning.

\`\`\`python
from anthropic import Anthropic  # or openai, cohere, etc.

# Embed a document chunk
embedding = embed_model.create(
    input="The refund policy allows returns within 30 days",
    model="text-embedding-3-small"
)
# → [0.023, -0.412, 0.891, ...]  (1536 numbers)

# Store in vector database (Pinecone, Qdrant, pgvector, etc.)
vector_db.upsert(id="chunk_001", vector=embedding, metadata={"text": "..."})
\`\`\`

---

## Chunking

Before embedding, documents are split into chunks. Chunk strategy dramatically affects retrieval quality.

| Strategy | Chunk size | Best for |
|---|---|---|
| **Fixed size** | 512 tokens | Simple, fast |
| **Sentence-based** | 1-5 sentences | General text |
| **Paragraph-based** | ~200-500 tokens | Structured docs |
| **Semantic** | Variable | Best quality, complex |
| **Recursive** | Variable | Code, markdown |

**Chunk overlap:** Add 10-20% overlap between chunks so context isn't lost at boundaries.

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", ". ", " "]
)
chunks = splitter.split_text(document)
\`\`\`

---

## Semantic Search

Find documents by meaning, not keywords.

\`\`\`python
# User asks: "What's your return policy?"
query_embedding = embed("What's your return policy?")

# Vector DB finds chunks with similar meaning:
results = vector_db.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True
)
# Returns chunks about: "30-day returns", "refund process", "exchange policy"
# Even if the user said "return" and docs say "refund" — semantic search finds them
\`\`\`

---

## Hybrid Search

Combine semantic search (meaning) with keyword search (exact terms) for better results.

\`\`\`python
# Semantic: finds conceptually related content
semantic_results = vector_db.semantic_search(query, top_k=10)

# Keyword (BM25): finds exact term matches
keyword_results = bm25_index.search(query, top_k=10)

# Merge and deduplicate (Reciprocal Rank Fusion is common)
final_results = reciprocal_rank_fusion(semantic_results, keyword_results)[:5]
\`\`\`

Hybrid search is especially good when queries contain specific technical terms, product names, or IDs that need exact matching.

---

## Re-ranking

After retrieval, re-rank the top-K results to put the most relevant chunks first.

\`\`\`python
from cohere import Client

co = Client(api_key)
reranked = co.rerank(
    query="What's the refund policy?",
    documents=[r["text"] for r in results],
    model="rerank-english-v3.0",
    top_n=3
)
# Returns the 3 most relevant chunks, reordered
\`\`\`

Re-ranking is a cheap way to dramatically improve RAG quality — retrieve 20, re-rank to top 3.

---

## Vector Databases

| DB | Type | Best for |
|---|---|---|
| **Pinecone** | Managed cloud | Production, scale |
| **Qdrant** | Self-hosted / cloud | Performance, open source |
| **Weaviate** | Self-hosted / cloud | Hybrid search built-in |
| **Chroma** | Local | Development, prototyping |
| **pgvector** | PostgreSQL extension | Already using Postgres |
| **Milvus** | Self-hosted | Large scale, enterprise |

**For most projects:** Start with pgvector (if you're already on Postgres) or Chroma (local dev). Move to Pinecone or Qdrant when you need scale.

---

## RAG Implementation (Complete Example)

\`\`\`python
import anthropic
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

# 1. Setup
client = anthropic.Anthropic()
qdrant = QdrantClient(":memory:")  # use URL for production

# 2. Index documents (do this once)
def index_documents(docs):
    for i, doc in enumerate(docs):
        # Get embedding
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=100,
            system="Return only the embedding vector as JSON array.",
            messages=[{"role": "user", "content": f"Embed: {doc}"}]
        )
        # (In practice, use a dedicated embedding model)
        qdrant.upsert(collection_name="docs",
                      points=[{"id": i, "vector": embedding, "payload": {"text": doc}}])

# 3. Answer questions (do this on every query)
def answer_with_rag(question):
    # Embed the question
    query_vector = embed(question)

    # Retrieve top 3 relevant chunks
    results = qdrant.search(collection_name="docs",
                            query_vector=query_vector,
                            limit=3)

    context = "\\n".join([r.payload["text"] for r in results])

    # Generate answer grounded in retrieved context
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system="Answer based ONLY on the provided context. If the answer isn't there, say so.",
        messages=[{"role": "user", "content": f"Context:\\n{context}\\n\\nQuestion: {question}"}]
    )
    return response.content[0].text
\`\`\`
` };
