SECTION_CONTENT['prod-stack'] = { default: `
# AI Engineering Production Stack

## End-to-End Architecture

\`\`\`mermaid
flowchart TD
    UI[User interface<br/>Web · Mobile · Slack · CLI] --> GW[API gateway<br/>auth · rate limiting · logging · cost tracking]
    GW --> AG[Agent layer<br/>orchestrator · skills · tool calling · memory mgmt]
    AG --> RAGL[RAG layer<br/>retrieval · re-ranking]
    AG --> TL[Tool layer<br/>APIs · DB · filesystem · code exec]
    AG --> LLM[LLM layer<br/>Claude · GPT · Gemini · local models]
    RAGL --> VDB[(Vector database<br/>Pinecone · Qdrant · pgvector)]
    AG -.-> MEM[(Memory layer<br/>Redis short-term · Postgres long-term)]
    GW -.-> OBS[Observability<br/>Langfuse · OpenTelemetry · alerts]
    AG -.-> OBS
    LLM -.-> OBS
\`\`\`

---

## Frontend Layer

What the user sees and interacts with.

**Streaming UI (critical for good UX):**
\`\`\`typescript
async function streamResponse(userMessage: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage })
  });

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    appendToChat(chunk);  // show tokens as they arrive
  }
}
\`\`\`

---

## API Gateway

Every production AI system needs a gateway for:

- **Authentication:** Verify user identity before any LLM call
- **Rate limiting:** Per-user limits to prevent abuse and runaway costs
- **Request logging:** Every request logged for debugging and compliance
- **Cost tracking:** Per-user, per-feature cost attribution

\`\`\`python
@app.middleware("http")
async def ai_gateway(request: Request, call_next):
    # Auth
    user = verify_jwt(request.headers.get("Authorization"))

    # Rate limit
    if rate_limiter.is_exceeded(user.id, limit=100, window="1h"):
        return JSONResponse({"error": "Rate limit exceeded"}, status_code=429)

    # Log
    log_request(user_id=user.id, endpoint=request.url.path, timestamp=now())

    response = await call_next(request)

    # Track cost (from response headers or post-processing)
    track_cost(user_id=user.id, tokens=get_token_count(response))

    return response
\`\`\`

---

## Agent Layer

The orchestration logic that manages the agent loop.

\`\`\`python
class ProductionAgent:
    def __init__(self, model, tools, max_steps=25):
        self.model = model
        self.tools = tools
        self.max_steps = max_steps
        self.tracer = get_tracer()

    async def run(self, task: str, session_id: str) -> str:
        with self.tracer.span("agent_run", session_id=session_id):
            memory = await self.load_memory(session_id)
            messages = self.build_initial_messages(task, memory)
            steps = 0

            while steps < self.max_steps:
                response = await self.call_llm(messages)

                if response.stop_reason == "end_turn":
                    await self.save_memory(session_id, messages)
                    return extract_final_answer(response)

                if response.stop_reason == "tool_use":
                    tool_results = await self.execute_tools(response.tool_calls)
                    messages.extend(tool_results)
                    steps += 1
                else:
                    break

            return "Task exceeded maximum steps. Here's progress so far: ..."
\`\`\`

---

## RAG Layer

\`\`\`python
class RAGPipeline:
    def __init__(self, vector_db, reranker, embed_model):
        self.db = vector_db
        self.reranker = reranker
        self.embed = embed_model

    async def retrieve(self, query: str, top_k: int = 5) -> list[str]:
        # 1. Embed query
        query_vec = await self.embed.create(query)

        # 2. Hybrid search (semantic + keyword)
        semantic = await self.db.search(query_vec, top_k=20)
        keyword = await self.db.keyword_search(query, top_k=20)
        candidates = deduplicate(semantic + keyword)

        # 3. Re-rank
        reranked = await self.reranker.rank(query, candidates, top_n=top_k)

        return [r.text for r in reranked]
\`\`\`

---

## Memory Layer

\`\`\`python
class MemorySystem:
    def __init__(self, redis_client, postgres_client, vector_db):
        self.redis = redis_client      # short-term: minutes to hours
        self.postgres = postgres_client # long-term: permanent structured
        self.vector = vector_db         # semantic: searchable by meaning

    async def get_context(self, session_id: str, query: str) -> dict:
        return {
            "recent": await self.redis.get(f"session:{session_id}:recent"),
            "user_prefs": await self.postgres.get_preferences(session_id),
            "relevant": await self.vector.search(query, filter={"session": session_id})
        }
\`\`\`

---

## Observability

Every LLM call traced:

\`\`\`python
from langfuse import Langfuse

lf = Langfuse()

async def traced_llm_call(messages, model, trace_id):
    generation = lf.generation(
        trace_id=trace_id,
        model=model,
        input=messages,
    )

    response = await llm.call(messages, model)

    generation.end(
        output=response.content,
        usage={"input": response.usage.input_tokens,
               "output": response.usage.output_tokens}
    )
    return response
\`\`\`

---

## Evaluation

Run automated evals on every deployment:

\`\`\`python
eval_dataset = [
    {"input": "What's your refund policy?", "expected": "contains:30 days"},
    {"input": "I want to cancel", "expected": "calls:create_ticket"},
]

async def run_evals(agent, dataset):
    results = []
    for case in dataset:
        output = await agent.run(case["input"])
        score = await judge(output, case["expected"])
        results.append({"case": case["input"], "score": score})

    avg_score = sum(r["score"] for r in results) / len(results)
    if avg_score < 0.85:
        alert("Eval regression detected: avg score {avg_score}")
    return results
\`\`\`

---

## Monitoring

Key metrics to track:

| Metric | Alert threshold |
|---|---|
| P95 latency | > 5s |
| Error rate | > 1% |
| Cost per request | > $0.05 |
| Tool failure rate | > 5% |
| Eval score | < 85% |
| Context window usage | > 80% |
` };
