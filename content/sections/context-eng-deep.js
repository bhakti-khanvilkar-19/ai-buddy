SECTION_CONTENT['context-eng-deep'] = { default: `
# Context Engineering Deep Dive

## Why Context > Prompt

The prompt (your message) is one input. Context is everything. A brilliant prompt inside a broken context produces garbage. A simple prompt inside a perfectly constructed context produces great results.

**The shift:** Stop thinking "what should I say?" Start thinking "what should the model know?"

---

## Context Assembly

Context assembly is the process of building the full input to the LLM from multiple sources.

### Full context anatomy

\`\`\`
┌─────────────────────────────────────────────────────┐
│                   CONTEXT WINDOW                    │
├─────────────────────────────────────────────────────┤
│ 1. SYSTEM PROMPT                                    │
│    - Role / persona                                 │
│    - Behavioral rules                               │
│    - Output format                                  │
│    - Safety constraints                             │
├─────────────────────────────────────────────────────┤
│ 2. KNOWLEDGE / GROUNDING                            │
│    - Retrieved documents (RAG)                      │
│    - Injected facts / policies                      │
│    - Database query results                         │
├─────────────────────────────────────────────────────┤
│ 3. CONVERSATION HISTORY                             │
│    - Previous turns (compressed if long)            │
│    - Summaries of old context                       │
├─────────────────────────────────────────────────────┤
│ 4. TOOL RESULTS                                     │
│    - Output from previous tool calls                │
│    - Structured data from APIs                      │
├─────────────────────────────────────────────────────┤
│ 5. CURRENT USER MESSAGE                             │
│    - The actual query or task                       │
└─────────────────────────────────────────────────────┘
\`\`\`

### Assembly code (Python example)

\`\`\`python
def assemble_context(user_message, history, retrieved_docs, tool_results):
    system = load_system_prompt()           # static, always present
    knowledge = format_docs(retrieved_docs) # dynamic, per-query
    history_str = compress_history(history) # rolling summary
    tools_str = format_tool_results(tool_results)

    return {
        "system": system,
        "messages": [
            *history_str,
            {"role": "user", "content": f"""
Relevant information:
{knowledge}

Tool results:
{tools_str}

User request:
{user_message}
"""}
        ]
    }
\`\`\`

---

## Context Compression

When conversation history grows, compress it to stay within budget.

### Rolling summary approach

\`\`\`python
def compress_history(messages, max_turns=10):
    if len(messages) <= max_turns:
        return messages  # no compression needed

    # Keep last 5 turns verbatim (recent = most relevant)
    recent = messages[-5:]

    # Summarize everything before
    old_messages = messages[:-5]
    summary = llm.summarize(old_messages,
        prompt="Summarize this conversation. Keep: decisions made, "
               "facts established, open questions. Discard: pleasantries.")

    return [
        {"role": "system", "content": f"[Earlier conversation summary]: {summary}"},
        *recent
    ]
\`\`\`

### Token-aware truncation

\`\`\`python
def fit_to_budget(context_parts, budget=150_000):
    total = 0
    result = []
    for part in reversed(context_parts):  # most recent first
        tokens = count_tokens(part)
        if total + tokens > budget:
            break
        result.insert(0, part)
        total += tokens
    return result
\`\`\`

---

## Context Pruning

Not all information in the context is equally useful. Pruning removes noise.

### What to prune

- **Outdated information:** Earlier reasoning steps that were superseded
- **Failed tool calls:** Results from tools that didn't help
- **Repeated information:** The same fact stated multiple times
- **Verbose formatting:** Long JSON responses — extract just the fields you need

### Selective tool result extraction

\`\`\`python
# Instead of injecting full API response (5000 tokens):
raw = api.get_user_data(user_id)

# Extract only what matters (50 tokens):
extracted = {
    "name": raw["profile"]["name"],
    "plan": raw["subscription"]["tier"],
    "usage_pct": raw["billing"]["usage_percentage"]
}
context.add(f"User info: {json.dumps(extracted)}")
\`\`\`

---

## Dynamic Injection

Instead of a static context, inject information based on what the current step actually needs.

### Example: Progressive context loading

\`\`\`python
# Step 1: Give the agent a summary + ability to request details
context = {
    "codebase_summary": "Next.js app, ~40 files in src/",
    "available_tools": ["read_file", "search_code", "run_tests"]
}

# Agent reads summary, requests specific files as needed
# Step 3: Agent calls read_file("src/api/auth.ts")
# → that file is now injected into context for step 4
\`\`\`

This pattern keeps context lean at the start and loads depth on demand — like lazy loading in software.

---

## Memory Retrieval

For long-running agents or multi-session systems, memories need to be retrieved — not just stored.

### Semantic memory retrieval

\`\`\`python
# Store memory when something important happens
memory_store.add(
    text="User prefers TypeScript over JavaScript for all new files",
    embedding=embed("TypeScript preference"),
    metadata={"user_id": "u123", "timestamp": now()}
)

# Retrieve relevant memories at the start of each session
relevant = memory_store.search(
    query=embed(user_message),
    top_k=5,
    filter={"user_id": "u123"}
)
context.inject(relevant)
\`\`\`

---

## Agent Context Construction

For multi-step agents, context grows with each step. Manage it deliberately.

### Agent context lifecycle

\`\`\`
Turn 1: [system] [user goal]
Turn 2: [system] [user goal] [tool: search("X")] [result: ...]
Turn 3: [system] [user goal] [summary of turns 1-2] [tool: read_file("Y")] [result: ...]
Turn 4: [system] [compressed history] [current tool result] [← only this step fresh]
\`\`\`

### The "working memory" pattern

Keep a structured working memory object that the agent updates each step:

\`\`\`json
{
  "goal": "Find and fix the memory leak in payment-service",
  "completed_steps": [
    "Read service logs — found OOM kill at 2025-06-15 03:42 UTC",
    "Read heap dump — identified leak in OrderCache.populate()"
  ],
  "current_step": "Reading OrderCache.java to understand the bug",
  "next_steps": ["Write fix", "Run tests", "Create PR"],
  "blockers": []
}
\`\`\`

Inject this structured state at the start of each turn — the agent always knows where it is.
` };
