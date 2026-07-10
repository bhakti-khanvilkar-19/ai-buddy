SECTION_CONTENT['context-engineering'] = { default: `
# Context Engineering

## What is Context?

The **context window** is everything the LLM can "see" at the moment it generates a response. It includes:

- The system prompt (instructions)
- Conversation history
- Tool call results
- Retrieved documents (RAG)
- Any data you've injected

**Context engineering** is the discipline of deciding *what goes into that window* — and what doesn't.

\`\`\`mermaid
flowchart TD
    subgraph CW["Context window — everything the model sees"]
        SP[System prompt & instructions]
        KG[Retrieved knowledge · RAG]
        H[Conversation history]
        TR[Tool results]
        UM[Current user message]
    end
    CW --> LLM[LLM forward pass]
    LLM --> OUT([Response])
\`\`\`

> "Context engineering is the new prompt engineering. Prompts are sentences. Context is everything the model knows right now." — Andrej Karpathy

---

## Why Context Engineering Matters

LLMs don't have persistent memory. Every call starts fresh. The quality of the model's output is almost entirely determined by the quality of what's in its context.

Bad context → bad outputs, even with a perfect model.
Good context → good outputs, even with a smaller model.

---

## Context Windows (2025)

| Model | Context window |
|---|---|
| GPT-4o | 128K tokens |
| Claude Sonnet 4.x | 200K tokens |
| Claude Opus 4.x | 200K tokens |
| Gemini 1.5 Pro | 1M tokens |
| Gemini 2.0 Flash | 1M tokens |

**200K tokens ≈ a 150,000-word book** — but more context doesn't always mean better results. LLMs can get "lost in the middle" — they attend better to content at the beginning and end of the context.

---

## Context Management

### The context budget

Every token in the context costs money and latency. Treat the context window as a **budget** — spend it on what actually improves the answer.

\`\`\`
200K token budget (Claude):
├── System prompt + instructions: ~2K
├── Conversation history (last 10 turns): ~10K
├── Retrieved documents (RAG): ~40K
├── Tool results (current task): ~20K
└── Available for response generation: ~128K
\`\`\`

### Context compression

When context gets too long, compress it:

- **Summarize old turns:** Replace full conversation history with a summary
- **Prune irrelevant tools:** Remove tool results that aren't relevant to current step
- **Chunk retrieved docs:** Only pull the relevant paragraphs, not full documents
- **Rolling window:** Keep only the last N turns of conversation

---

## Grounding

**Grounding** means giving the model accurate, current, factual information so it doesn't hallucinate.

| Grounding method | How | When to use |
|---|---|---|
| **RAG** | Retrieve relevant docs at query time | Large knowledge bases |
| **Context stuffing** | Paste docs directly into prompt | Small, focused reference material |
| **Tool calling** | Model fetches data via tool call | Real-time or frequently updated data |
| **Fine-tuning** | Bake facts into model weights | Static, high-frequency facts |

### Example: Grounding with RAG

\`\`\`python
# User asks: "What's our refund policy?"
# Without grounding: model hallucinates a policy
# With grounding:
docs = vector_db.search("refund policy", top_k=3)
context = f"""
Answer based ONLY on the following company documents:

{format_docs(docs)}

Question: {user_question}
If the answer isn't in the documents, say "I don't have that information."
"""
\`\`\`

---

## Memory Types

| Type | Lives where | Persists | Use for |
|---|---|---|---|
| **Working** | Context window | This call only | Current task state |
| **Episodic** | External DB | Days/months | Past conversation summaries |
| **Semantic** | Vector DB | Permanent | User preferences, facts |
| **Procedural** | System prompt / skills | Permanent | How the agent behaves |

---

## Retrieval

Retrieval is how agents pull information from external storage into the context window just-in-time.

### Retrieval pipeline

\`\`\`
User query
    ↓
Embed query → [0.23, -0.51, 0.88, ...]
    ↓
Vector search in knowledge base
    ↓
Top-K most similar chunks returned
    ↓
Re-rank for relevance
    ↓
Inject top chunks into context
    ↓
LLM generates grounded answer
\`\`\`

---

## Knowledge Injection Patterns

### Pattern 1: Direct injection (simple)
\`\`\`
System: You are a customer support agent for Acme Corp.

Company policies:
- Refunds: within 30 days with receipt
- Shipping: 3-5 business days standard
- Support hours: 9am-6pm EST Mon-Fri
\`\`\`

### Pattern 2: Dynamic injection (RAG)
Pull relevant chunks at runtime based on what the user is asking.

### Pattern 3: Hierarchical injection
Inject a summary first; if the model needs details, it calls a tool to fetch them.

\`\`\`
Context contains: "Acme refund policy summary (ask refund_details tool for specifics)"
If model calls refund_details() → inject full policy text
\`\`\`

This keeps the context lean while allowing depth on demand.
`,
embedded: `
# Context Engineering

## Why This Matters More in Embedded Work, Not Less

Embedded debugging is fundamentally a context problem before it's ever a code problem. A kernel panic without the preceding dmesg is unreadable. A driver probe failure without the matching device tree node is unfixable. The single biggest lever for getting useful AI help on embedded work is **feeding it the right slice of context** — not a better prompt.

---

## What Belongs in the Context Window for Embedded Debugging

\`\`\`mermaid
flowchart TD
    subgraph CW["Context for an embedded debugging session"]
        SC[Serial console output<br/>last N lines before failure]
        DT[Relevant device tree nodes]
        KC[Kernel config fragment<br/>CONFIG_* flags for the subsystem]
        SRC[Driver/application source<br/>only the relevant file(s)]
        DS[Datasheet excerpt<br/>register map, timing diagram]
    end
    CW --> LLM[LLM reasoning]
    LLM --> OUT([Root cause + fix])
\`\`\`

Skipping any one of these produces confidently wrong answers. An LLM without the device tree node will guess at compatible strings. An LLM without the kernel config will suggest a fix that's already compiled out.

---

## Grounding: Datasheets Are Your RAG Corpus

In most AI use cases, RAG means retrieving from a company wiki. In embedded work, your highest-value grounding source is the **SoC reference manual and component datasheets** — hundreds of pages the model wasn't necessarily trained on for your specific silicon revision.

\`\`\`
Bad (no grounding):
"How do I configure the I2C clock stretching on this SoC?"
→ Model guesses based on generic I2C knowledge, may not match your silicon

Good (grounded):
"Here's the I2C controller register section from the [SoC] reference
manual [pasted excerpt]. Configure clock stretching for a 400kHz bus
with a sensor that needs up to 25ms stretch time."
→ Model reasons from your actual register map, not a generic guess
\`\`\`

**Practical habit:** keep a folder of relevant datasheet excerpts (not the full 2000-page PDF — extracted, relevant sections) that you paste in for register-level questions. This is context engineering in its most literal form for hardware work.

---

## Context Pruning for Long Boot Logs

Boot logs and kernel traces are often thousands of lines, but only a handful are relevant to a given failure. Prune before you paste:

\`\`\`bash
# Don't paste the whole boot log — extract the relevant window
dmesg | grep -A 20 -B 5 "your_driver\|Call Trace\|BUG:"

# For journalctl, scope to the failing service and time window
journalctl -u my-service --since "10 min ago" --no-pager
\`\`\`

A 200-line focused excerpt produces a better diagnosis than a 5,000-line dump — the signal gets diluted, not enhanced, by including everything.

---

## Memory Across a Debugging Session

Board bring-up and driver debugging are rarely one-shot — you're often iterating over hours or days. Keep a running context document as you go:

\`\`\`
## Bring-up log: RK3588 custom carrier board

Confirmed working:
- Power rails all in spec (scope captures in /bringup/power/)
- U-Boot reaches prompt, DDR init passes

Known issue:
- eMMC not detected — sdhci-of-arasan probe fails with -ENODEV
- Ruled out: device tree compatible string (matches driver), pinctrl (verified via /sys)
- Suspect: eMMC not getting VCCQ before probe — checking power sequencing next
\`\`\`

Paste this running log as context at the start of each new AI-assisted session — it prevents the model (and you) from re-investigating things you've already ruled out.

---

## The One-Sentence Takeaway

For embedded work, context engineering means feeding the model the specific serial output, device tree node, kernel config, and datasheet excerpt relevant to your exact failure — generic embedded knowledge without your board's specifics produces plausible-sounding wrong answers every time.
`,

engineer: `
# Context Engineering

Andrej Karpathy's framing: prompt engineering is what you say; context engineering is *everything the model sees at inference time* — and it's the higher-leverage discipline. In production, context assembly is where quality and cost are actually decided.

## The Context Budget Is a Real Budget

Every token in context is paid on **every turn**, adds latency, and — past a point — *reduces* accuracy. Treat the window as a scarce resource to allocate, not a bucket to fill:

\`\`\`
[system/instructions]  small, stable, CACHEABLE — put first
[retrieved knowledge]  dynamic, reranked to fit — the variable cost
[conversation history] compressed/summarized past N turns
[tool results]         extracted fields only, not raw dumps
[current query]        last
\`\`\`

Design the stable prefix to be **prompt-cacheable** (≈90% discount on repeat calls) and keep the variable, uncacheable part small and at the end.

## Lost in the Middle Is a Design Constraint

Models attend most reliably to the **start and end** of context. This isn't a tuning issue — it's structural. So:
- Critical instructions and the most-relevant retrieved chunk go at the **edges**, never buried mid-context.
- Reranking exists partly to put the best chunk *last* (closest to the query), where the model attends most.
- Filling a 200K window with 200K tokens of marginally-relevant context measurably *lowers* accuracy vs a curated 20K. More is not better.

## Compression and Pruning Are Not Optional at Scale

Long-running sessions and agents accumulate context. Strategies, in order of preference:
- **Extract, don't dump**: a tool returns 5KB JSON → put the 3 fields you need (50 tokens) into context, not the blob.
- **Rolling summary**: keep the last few turns verbatim, replace older history with an LLM-generated summary of decisions/facts.
- **Structured working memory**: maintain an explicit state object (goal, completed steps, established facts, open questions) and inject *that* each turn instead of raw history — far more token-efficient and drift-resistant.

## Context Poisoning: the Subtle Production Bug

Once a wrong fact or abandoned approach is in context, it contaminates all downstream reasoning — the model treats its own prior output as ground truth. This is a leading cause of agents that "get stuck being wrong." Mitigations: keep contexts short and task-scoped, spawn fresh sub-agent contexts for distinct subtasks rather than one ever-growing thread, and never let failed-attempt output linger in the working context.

## Dynamic Assembly Beats Static Prompts

The production pattern isn't one big prompt — it's a **context assembly pipeline** that, per request, retrieves + reranks knowledge, pulls relevant memory, extracts tool results, compresses history, and orders it all for attention. The prompt template is the smallest part; the assembly logic is the product.
` };
