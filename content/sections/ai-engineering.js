SECTION_CONTENT['ai-engineering'] = { default: `
# AI Engineering

## What is AI Engineering?

AI engineering is the discipline of **building production AI systems** — not just calling an API, but designing, evaluating, monitoring, and iterating on systems that reliably deliver value at scale.

A model call is 10% of the work. The other 90% is evaluation, observability, prompts management, cost control, and reliability.

---

## Evaluations (Evals)

Evals are tests for AI systems. They answer: "Is this model/prompt/system actually good?"

### Types of evals

| Type | How | Best for |
|---|---|---|
| **Exact match** | Output == expected string | Classification, extraction |
| **LLM-as-judge** | Another LLM scores the output | Open-ended quality |
| **Human eval** | People rate outputs | Final quality bar |
| **Code execution** | Run the code, check it works | Code generation |
| **Retrieval metrics** | Precision, recall for RAG | RAG pipelines |

### Simple eval harness

\`\`\`python
import anthropic

client = anthropic.Anthropic()

test_cases = [
    {"input": "Summarize: The meeting was productive.", "expected_quality": "concise"},
    {"input": "Summarize: Revenue grew 40% YoY...", "expected_quality": "includes numbers"},
]

def judge_output(input_text: str, output: str, criteria: str) -> float:
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=100,
        messages=[{"role": "user", "content": f"""
Rate this AI response quality (0.0 to 1.0) based on: {criteria}

Input: {input_text}
Output: {output}

Return only a number between 0.0 and 1.0.
"""}]
    )
    return float(response.content[0].text.strip())

# Run eval
scores = []
for case in test_cases:
    output = generate(case["input"])
    score = judge_output(case["input"], output, case["expected_quality"])
    scores.append(score)

print(f"Average quality score: {sum(scores)/len(scores):.2f}")
\`\`\`

---

## Observability

You can't improve what you can't see. Observability means capturing what's happening in your AI system.

### What to capture per LLM call

\`\`\`python
{
  "trace_id": "abc123",
  "model": "claude-sonnet-4-6",
  "input_tokens": 1247,
  "output_tokens": 342,
  "latency_ms": 1834,
  "cost_usd": 0.0031,
  "prompt_version": "v2.3",
  "user_id": "u_789",
  "session_id": "s_456",
  "tool_calls": ["search_web", "read_file"],
  "stop_reason": "end_turn",
  "timestamp": "2025-06-30T10:00:00Z"
}
\`\`\`

### Observability tools

- **Langfuse** (open source) — traces, evals, prompt management
- **Helicone** — proxy-based, zero code change logging
- **Braintrust** — evals + observability
- **Weave (W&B)** — part of Weights & Biases ecosystem
- **Arize Phoenix** — open source LLM observability

---

## Tracing

Tracing captures the full execution path of an agent — every LLM call, tool call, and sub-agent invocation, in order, with inputs and outputs.

\`\`\`
Trace: task_abc123
├── LLM call 1 (246ms) — plan the task
│     input: "Fix auth bug"
│     output: "Step 1: read auth.ts, Step 2: find bug, Step 3: fix"
├── Tool: read_file("src/auth.ts") (12ms)
│     output: [file contents]
├── LLM call 2 (1834ms) — analyze the file
│     input: [file + plan]
│     output: "Bug found: JWT expiry not checked. Fix: add expiry check."
├── Tool: edit_file("src/auth.ts") (8ms)
└── LLM call 3 (890ms) — write commit message
\`\`\`

Traces make debugging agents 10x faster — you can see exactly where it went wrong.

---

## Prompt Versioning

Prompts are code. Version them.

\`\`\`python
# Bad: hardcoded prompt in application code
response = client.messages.create(
    system="You are a helpful assistant.",  # changes here are invisible
    ...
)

# Good: prompts in version-controlled files or a prompt management system
prompt = prompt_store.get("customer_support_v2.3")
response = client.messages.create(system=prompt, ...)
\`\`\`

Tools: **Langfuse Prompts**, **Braintrust Prompts**, simple YAML files in git.

---

## Cost Optimization

| Technique | Savings | Trade-off |
|---|---|---|
| **Use smaller model** | 80-90% | May reduce quality |
| **Reduce prompt length** | 20-50% | Requires prompt pruning |
| **Caching** | 80-90% on cached | Prompt caching (Anthropic/OpenAI) |
| **Batch API** | 50% | Higher latency (async) |
| **Output length limits** | 10-30% | May truncate responses |

### Prompt caching (Anthropic)

\`\`\`python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[{
        "type": "text",
        "text": long_system_prompt,  # 10K tokens of instructions
        "cache_control": {"type": "ephemeral"}  # cache this!
    }],
    messages=[{"role": "user", "content": user_message}]
)
# First call: full cost. Subsequent calls within 5 min: 90% discount on cached tokens.
\`\`\`

---

## Latency Optimization

- **Streaming:** Return tokens as they're generated (feels faster to users)
- **Smaller model:** 3x-10x faster than large model
- **Parallel tool calls:** Run independent tool calls simultaneously
- **Pre-computation:** Cache common expensive computations
- **Speculative execution:** Start processing likely next steps before they're needed

---

## Security

| Risk | Mitigation |
|---|---|
| Prompt injection | Input sanitization + explicit resistance instructions |
| Data exfiltration | Output filtering, restrict what agent can access |
| Excessive permissions | Least-privilege tool design |
| Sensitive data in prompts | Anonymize/tokenize before sending to API |
| API key exposure | Use secrets manager, never hardcode |

---

## Guardrails

Guardrails prevent the AI from doing harmful things. Implement at multiple layers:

\`\`\`python
def safe_agent_response(user_message: str) -> str:
    # Input guardrail
    if contains_pii(user_message):
        user_message = anonymize(user_message)

    # Generate response
    response = agent.run(user_message)

    # Output guardrail
    if contains_hallucination_signals(response):
        response = add_uncertainty_disclaimer(response)

    if contains_sensitive_info(response):
        response = redact_sensitive_info(response)

    return response
\`\`\`
`,
commander: `
# AI Engineering

## Why "It Works in the Demo" Isn't a Launch Criterion

Every AI feature demo looks impressive — that's the nature of generative output. The gap between a demo and a production system is AI engineering: evaluation, observability, cost control, and security. Teams that skip this gap ship features that work great in the pitch meeting and fail unpredictably in production. This is the single most common reason AI initiatives lose executive confidence after launch.

**Rule of thumb for your reviews:** if a team can only show you a demo and can't show you an eval score, they're not ready to ship.

---

## Evaluations — Your Actual Quality Gate

An eval suite is the AI equivalent of a test suite, and it should be a launch-blocking requirement, not a nice-to-have.

**What to ask for before approving launch:**
- A test set of real (or realistic) scenarios — not cherry-picked demo cases
- A quality score with a defined passing threshold
- A regression check: does the score stay above threshold after every prompt or model change?

**The trap to watch for:** teams that "eyeball" quality by trying a handful of prompts. That doesn't scale and doesn't catch regressions. Insist on numbers.

---

## Observability — Can You See What It's Doing?

If your team can't answer "what did the AI actually do for user X on Tuesday," you have an unmonitored system in production — the AI equivalent of shipping code with no logging.

**Minimum bar for production AI:**
- Every request logged: input, output, cost, latency, which tools were used
- Traceable: can you reconstruct the full decision path for any single interaction?
- Alertable: does someone get paged when quality drops or costs spike?

This isn't optional infrastructure — it's the difference between catching a problem in an hour versus discovering it from a customer complaint three weeks later.

---

## Cost — The Line Item That Surprises Executives

AI cost doesn't scale like traditional software cost. A traditional feature costs roughly the same to serve user #1 and user #100,000. An AI feature's cost scales directly with usage *and* with how cleverly it's engineered.

**Levers your team should already be pulling:**
| Lever | Typical savings |
|---|---|
| Right-sized model (not defaulting to the biggest) | 80-90% |
| Prompt caching | 80-90% on repeated context |
| Batch processing for non-real-time work | 50% |

**What to ask in budget reviews:** "What's our cost per completed task, and what's driving it?" If the answer is "we're using the biggest model for everything," that's an easy win sitting on the table.

---

## Security — Where AI-Specific Risk Actually Lives

Traditional security review checklists miss AI-specific attack surfaces. Make sure your security team is evaluating:

- **Prompt injection:** can malicious content in a document or webpage the AI reads hijack its behavior?
- **Data exposure:** does the AI have access to more data than the specific task requires?
- **Excessive permissions:** can the AI take actions beyond what the use case needs?

**The governance question:** does your organization have a review process for AI features the way it has one for handling customer data? If not, that's a gap to close before the next launch, not after an incident.

---

## The One-Paragraph Takeaway

AI engineering is the unglamorous 90% of the work that turns an impressive demo into a system you can trust in production — evaluation replaces "looks good to me," observability replaces "we'll find out from support tickets," and cost/security review replace surprises. Make these four things launch-blocking requirements, and your AI initiatives will stop losing credibility after the first incident.
` };
