SECTION_CONTENT['workflows'] = { default: `
# Workflows & Automations

## Scripts vs Workflows vs Agents

These three look similar but are fundamentally different:

| | Script | Workflow | Agent |
|---|---|---|---|
| **Steps** | Fixed, hard-coded | Fixed, declarative | Dynamic, AI-decided |
| **Branching** | If/else in code | Conditional nodes | LLM decides |
| **Error handling** | Try/catch | Retry policies | Self-correction |
| **Trigger** | Manual / cron | Event-driven | Goal-driven |
| **Intelligence** | None | None | LLM reasoning |

**Use a script** when steps are simple and never change.
**Use a workflow** when you need reliability, observability, and retries for multi-step processes.
**Use an agent** when the path through the steps depends on what the AI discovers.

---

## Triggers

Workflows start when something happens:

| Trigger type | Example |
|---|---|
| **Schedule** | Every day at 9am, every 15 minutes |
| **Webhook** | PR opened on GitHub, payment received |
| **Email** | Support email arrives |
| **Database** | New row inserted, record updated |
| **File** | New file uploaded to S3 |
| **Manual** | User clicks a button |
| **Another workflow** | Workflow A completes → starts Workflow B |

---

## Conditions

Workflows branch based on conditions:

\`\`\`yaml
# n8n / Zapier style
- step: classify_email
  if: email.category == "urgent"
  then: → notify_on_call_team
  else: → add_to_backlog
\`\`\`

AI-powered conditions use LLMs to decide:
\`\`\`python
category = llm.classify(email_body, options=["urgent", "billing", "feature_request", "spam"])
if category == "urgent":
    notify_on_call()
elif category == "billing":
    route_to_billing_queue()
\`\`\`

---

## Actions

The things the workflow does:

- **HTTP requests:** Call any REST API
- **Database:** Insert, update, query records
- **Email/messaging:** Send emails, Slack messages, SMS
- **File operations:** Create, move, transform files
- **Code execution:** Run Python/JavaScript/shell
- **AI calls:** Call LLM to classify, extract, generate, transform
- **Wait:** Pause for a time, wait for human approval

---

## State Management

Workflows that span multiple steps or sessions need to track state:

\`\`\`python
# State stored in database or cache
workflow_state = {
    "id": "wf_abc123",
    "status": "in_progress",
    "current_step": "email_sent",
    "completed_steps": ["classify", "lookup_customer"],
    "data": {
        "customer_id": "c_789",
        "email_sent_at": "2025-06-30T10:00:00Z"
    }
}
\`\`\`

Tools like LangGraph build state management into the workflow framework.

---

## Error Handling

Production workflows need robust error handling:

\`\`\`python
# Retry with backoff
@retry(max_attempts=3, backoff=exponential(base=2))
def call_external_api(payload):
    response = requests.post(api_url, json=payload, timeout=30)
    response.raise_for_status()
    return response.json()

# Dead letter queue — failed items go here for investigation
def process_item(item):
    try:
        result = process(item)
    except Exception as e:
        dead_letter_queue.push({"item": item, "error": str(e), "timestamp": now()})
        alert_team(f"Processing failed: {e}")
\`\`\`

---

## Tools Comparison

| Tool | Type | Best for |
|---|---|---|
| **n8n** | Self-hosted workflow | Developer-friendly, 400+ integrations |
| **Zapier** | Cloud workflow | Non-technical users, quick setup |
| **Make (Integromat)** | Cloud workflow | Visual, complex data transformations |
| **Temporal** | Code-first workflow | Durable execution, long-running processes |
| **LangGraph** | AI workflow | Stateful AI agents, graph-based flows |
| **Prefect** | Data workflow | Data pipelines, Python-native |
| **Airflow** | Data orchestration | Large-scale data engineering |
| **GitHub Actions** | CI/CD workflow | Code pipelines, automation on git events |

---

## AI-Enhanced Workflows

Combining traditional workflow reliability with LLM intelligence:

\`\`\`mermaid
flowchart TD
    T([Support ticket arrives — trigger]) --> C{LLM classifies<br/>priority & category}
    C -->|critical| P[Page on-call immediately]
    C -->|billing| B[Route to billing queue]
    C -->|bug| X[LLM extracts repro steps<br/>+ affected version]
    X --> S[Search existing issues — tool call]
    S --> K{LLM: known issue?}
    K -->|yes| L[Link to existing ticket · close]
    K -->|no| J[Create Jira issue · assign to team]
\`\`\`

This hybrid pattern is extremely powerful — deterministic flow for reliability, LLM for the parts that require judgment.
`,

commander: `
# Workflows & Automations

## The 2026 Automation Shift

Enterprise automation reached an inflection point in 2026: the question is no longer "RPA or AI?" but "how do agentic workflows and RPA work *together*?" This is where a lot of the near-term, measurable ROI of AI actually lands — not in chatbots, but in automating multi-step business processes end to end.

## Agentic Workflows vs Classic RPA — and Why It's "And," Not "Or"

| | Classic RPA | Agentic workflow |
|---|---|---|
| Handles | Structured, rule-based, repetitive steps | Steps needing judgment, language understanding, adaptation |
| Breaks when | The form/screen changes | (more robust — reasons about intent) |
| Auditability | Deterministic, fully logged | Needs explicit tracing to match |
| Cost model | Per-bot, predictable | Per-task, scales with reasoning |

The winning enterprise pattern is **hybrid**: deterministic RPA bots for the high-volume structured steps, reasoning agents for the judgment steps, with the agent orchestrating. If your org already invested in RPA, agentic AI *extends* that investment rather than replacing it — a point worth making to stakeholders anxious about stranded RPA spend.

## What the Numbers Say

Industry surveys put enterprise agentic-workflow adoption on a steep 2026 curve (Gartner projecting ~40% of enterprises deploying task-specific agents this year), with early adopters reporting ROI in the 1.7×–10× range per dollar. Treat those ceiling figures skeptically, but the direction is real and your competitors are moving.

## The Governance Battleground

The decisive issue in enterprise automation right now isn't capability — it's **governance**. Regulatory acceleration (e.g. the EU AI Office's direction on high-risk agentic systems) increasingly requires **deterministic audit logs** of what an automated agent did and why. Practical requirements for anything you approve:

- **Every automated decision logged** for audit and accountability — non-negotiable in regulated processes.
- **Human-in-the-loop gates** on consequential/irreversible actions.
- **Cross-functional ownership** — agentic automation in a regulated process needs engineering + compliance + the process owner, not an engineering-only sign-off.

## Questions to Ask in an Automation Proposal Review

1. Which steps are deterministic (→ RPA) vs judgment (→ agent)? Don't pay for reasoning where a rule suffices.
2. What's logged, and does it satisfy our audit obligations for this process's risk tier?
3. Where are the human gates on irreversible actions?
4. What's the failure mode when the agent is wrong, and who's accountable?
5. What's the cost per completed process run, including failures and retries?

## The One-Paragraph Takeaway

The real near-term ROI of AI in the enterprise is agentic automation of multi-step processes — deployed *alongside* your existing RPA, not instead of it. The capability is proven; the gating factor is governance. Approve automation initiatives on their step-level design (rules vs reasoning), their audit trail, and their human gates — the same discipline you'd apply to any system that takes real action in a regulated business process.
`,

engineer: `
# Workflows & Automations

## Workflow, Agent, or Agentic Workflow — Pick Deliberately

The 2026 vocabulary matters because it maps to reliability and cost:

| Pattern | Control flow | Use when | Reliability |
|---|---|---|---|
| **Script** | Hard-coded | Fully deterministic, never changes | Highest |
| **Workflow** | Declarative, fixed nodes | Known steps, need retries/observability | High |
| **LLM-routed workflow** | Fixed nodes, LLM picks branches | Known steps, data-dependent routing | High |
| **Agentic workflow** | LLM decides steps within bounds | Path depends on runtime discovery | Medium |
| **Open agent** | Fully LLM-driven | Genuinely unpredictable tasks | Lowest |

**The engineering discipline is choosing the least dynamic pattern that solves the problem.** Most "agent" projects should be LLM-routed workflows — you get the adaptability where you need it (branch decisions) and determinism everywhere else. Reserve open agency for tasks whose steps genuinely can't be predetermined.

## Agentic Automation vs RPA — the Integration Pattern

The production reality isn't agents replacing RPA; it's agents **orchestrating** RPA:

\`\`\`mermaid
flowchart TD
    T([Trigger: email / event / schedule]) --> AG[Agent: understand intent, plan]
    AG --> D{Step type?}
    D -->|structured, high-volume| RPA[Deterministic RPA bot]
    D -->|judgment / language| LLM[LLM reasoning step]
    RPA --> AG
    LLM --> AG
    AG --> V[Validate + log every decision]
    V --> DONE([Complete / escalate])
\`\`\`

The agent handles intent, planning, and the judgment steps; deterministic bots handle the structured high-volume steps (they're cheaper, faster, and audit-clean). This hybrid is more reliable *and* cheaper than making the LLM do everything.

## Scheduled & Long-Running Automation

2026's automation isn't just triggered — it's **scheduled and autonomous**. Cron-driven agents that wake on an interval, do work, and report (Claude Code's cron + \`/loop\` are the accessible primitives). Engineering requirements specific to unattended/scheduled automation:

- **Idempotency** — a scheduled run that overlaps or retries must not double-act.
- **Wall-clock timeout + budget cap** — nobody's watching; an unbounded scheduled loop is an unbounded invoice.
- **State across runs** — durable, validated state (not in-memory) since runs are separate processes.
- **Alerting on failure** — a silent failed 3am run is worse than a loud one; page or ticket on anomaly.
- **Dead-letter handling** — failed items go somewhere inspectable, not into the void.

## State Management & Error Handling — the Unglamorous Core

Most workflow failures aren't AI failures; they're state/error-handling failures:

- **Durable state** with checkpoint + resume, so a failure at step 8 of 10 doesn't restart from zero.
- **Retry with backoff** on transient failures; **circuit-break** on persistent ones.
- **Compensating actions** for partial completion (the workflow equivalent of a rollback) — if step 8 fails after step 7 sent an email, what undoes it?
- **Every decision logged** — for agentic steps this doubles as your audit trail.

## Tooling Landscape (2026)

| Tool | Fit |
|---|---|
| **n8n / Zapier / Make** | Low-code, broad integrations, now with agentic nodes |
| **Temporal** | Durable execution — the gold standard for long-running stateful workflows |
| **LangGraph** | Stateful agentic graphs with checkpointing |
| **Prefect / Airflow** | Data-pipeline orchestration |
| **Automation Anywhere / UiPath** | Enterprise RPA now shipping "agentic" layers on top |

For anything long-running and stateful, durable-execution engines (Temporal-class) matter more than the LLM framework — the hard part is surviving crashes and resuming correctly, not the model call.

## The One-Sentence Takeaway

The 2026 automation stack is agents *orchestrating* deterministic workflows and RPA — choose the least-dynamic pattern per step, make scheduled/long-running automation idempotent and bounded, and invest in durable state + error handling, because that's where automation actually breaks, not in the model.
`
};
