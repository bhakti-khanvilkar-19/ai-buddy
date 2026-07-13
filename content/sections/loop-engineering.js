SECTION_CONTENT['loop-engineering'] = {

default: `
# Loop & Harness Engineering

## The New Layer of the Stack

The discipline of getting good results from AI has evolved in three phases:

| Era | Discipline | The question it answers |
|---|---|---|
| 2022–23 | **Prompt engineering** | What do I *say* to the model? |
| 2024–25 | **Context engineering** | What does the model *see*? |
| 2026 | **Loop engineering** | What does the model *do*, over and over, until it's done? |

Prompt engineering is one message. Context engineering is what's in the window. **Loop engineering is the discipline of designing the loop an agent runs inside** — what it does between tool calls, when it checks its own work, and how it decides it's finished.

## Why Loops Became the Focus in 2026

Two things changed:

1. **Models can sustain long tasks now.** Long-horizon benchmarks (METR and others) show frontier models completing a meaningful share of tasks that take *hours* of continuous work, not seconds. A model that can only do a 30-second task doesn't need a loop; one that can grind for hours does.
2. **The tooling shipped.** Claude Code added \`/loop\`, cron scheduling, and dynamic workflows — the primitives for an agent that runs itself on a schedule or until a goal is met, without a human re-prompting at each step.

## Anatomy of an Agent Loop

\`\`\`mermaid
flowchart TD
    S([Goal]) --> A[Act: take next step]
    A --> V[Verify: check the result]
    V --> D{Done?}
    D -->|no, keep going| A
    D -->|yes / cap hit / stuck| E([Terminate + report])
\`\`\`

The loop keeps running — act, verify, decide — without a human in between. The three things you actually engineer:

### 1. Termination logic (the most important part)
A loop that can't stop is a runaway bill. Every loop needs explicit stop conditions:
- **Goal met** — the verification step confirms success
- **Iteration cap** — a hard maximum number of steps
- **Budget spent** — token or dollar ceiling reached
- **No progress** — the last N steps didn't move closer to the goal (a stuck loop)

### 2. Self-verification (between steps)
After each action the agent checks its own work — but *grounded* in something real (run the test, validate the output against a schema) rather than just asking itself "did that look right?" Ungrounded self-checks are unreliable.

### 3. The harness (everything around the model)
The **harness** is the environment the loop runs in: the tools it can call, the memory it carries between steps, the guardrails that stop bad actions, and the observability that lets you see what happened. A capable model in a weak harness fails; a modest model in a strong harness is reliable.

## Loop Engineering in Practice — Claude Code's /loop

\`\`\`bash
# Run a task repeatedly until it's done, on an interval
/loop 5m /fix-failing-tests     # every 5 min, try to fix the tests
/loop /babysit-pr               # watch a PR, respond to CI + reviews
\`\`\`

You define the *task*, the *termination condition*, and the *interval*; the loop handles the "keep going until done" part. That's loop engineering in its most accessible form.

## The One-Line Takeaway

Prompt engineering was about the words, context engineering was about the information, and **loop engineering is about the process** — designing an agent that acts, checks itself, and knows when to stop, all without you in the middle.
`,

// ─────────────────────────────────────────────────────────────
earthling: `
# Loops — AI That Runs Itself

## From "Ask and Answer" to "Set and Forget"

So far you've thought of AI as a conversation: you ask, it answers, you ask again. In 2026 something bigger arrived — AI that you give a *goal*, and it works away at it on its own, checking its own progress, until it's done.

The name for the craft of building these is **loop engineering**. It's the newest big idea in AI, and it's simpler than it sounds.

## The Kitchen Timer Analogy

Imagine a very diligent assistant baking bread for the first time:

1. **Do a step** (knead the dough)
2. **Check the result** (is it smooth yet?)
3. **Not done? Go back and do more.** Done? Stop and tell you.

That "do → check → repeat until done → then stop" cycle is a *loop*. The AI runs around this loop by itself — you don't have to stand there telling it "now check the dough" every time.

## Why This Is a Big Deal

Older AI could only do quick, one-shot things — answer a question, write a paragraph. Newer AI can stick with a longer job for *hours*, the way a person works through a real task. So instead of "write me one email," you can increasingly say "keep monitoring my inbox and draft replies to anything urgent," and it just... does, checking in when it needs you.

## The One Thing That Keeps It Safe

The most important part of building one of these self-running loops is teaching it **when to stop** — when the goal's met, when it's tried enough times, or when it's clearly stuck. A loop that doesn't know how to stop is like a tap left running. The good ones always know when to turn themselves off and check with a human.

## The One-Sentence Takeaway

Loop engineering is how people build AI that you hand a goal instead of a question — it works away on its own, checks its own progress, and (if built well) knows exactly when to stop and ask you.
`,

// ─────────────────────────────────────────────────────────────
commander: `
# Loop & Harness Engineering

## The 2026 Shift You Need on Your Radar

The industry's engineering focus has moved again. Prompt engineering (2022–23) and context engineering (2024–25) are now table stakes; the 2026 investment is **loop engineering** and **harness engineering** — building agents that run autonomously over long horizons rather than answering one prompt at a time. This is the capability behind "agentic automation," and it changes the risk and cost profile of what your teams ship.

## What's Actually New

- **Long-horizon autonomy.** Frontier models can now sustain multi-hour tasks (long-horizon benchmarks show them completing a meaningful share of ~12-hour tasks). This is what makes "set a goal and let it run" viable — and what makes runaway cost and unsupervised action real risks.
- **The harness is where reliability lives.** Industry data attributes roughly **65% of enterprise agent failures to "harness defects"** — context drift, schema misalignment, state degradation — *not* to the model. The lesson for your roadmap: the model is rarely the bottleneck; the engineering around it is.

## The Cost Question Changes Shape

A chatbot costs per message. A long-running agentic loop costs per *task*, and that cost scales with how many steps the loop takes — which multiplies when a loop wanders or fails to terminate. The governance norms to institute:

- **Termination limits are mandatory**, not optional — every autonomous loop needs a hard cap on steps, budget, and time. An uncapped loop is an uncapped invoice.
- **Heterogeneous model routing** — the cost-effective pattern is frontier models for the hard reasoning steps, mid-tier for standard steps, small models for high-frequency simple ones. A loop that calls the flagship model on every trivial step is the #1 cost-blowout pattern.
- Budget by **cost-per-completed-task**, including failed and retried runs — not per-call.

## Governance & Audit — the Regulatory Reality

2026 brought regulatory acceleration specifically aimed at autonomous agents. High-risk-sector rules (e.g. the EU AI Office's direction) increasingly require **deterministic audit logs** of what an agent did and why, and continuous red-teaming of agentic systems. Practical implications for anything you approve:

- Every autonomous loop must produce a **traceable log** of its decisions and actions — retrofitting this is painful, so require it up front.
- **Human-in-the-loop gates** on irreversible actions aren't just good practice; in regulated contexts they're becoming compliance requirements.
- Agentic automation deployments increasingly need **cross-functional governance** (engineering + compliance + domain owners), not just an engineering sign-off.

## Automation: Agentic + RPA, Not Either/Or

The enterprise automation story in 2026 is not "agents replace RPA." It's **agents + RPA together** — deterministic bots for structured, high-volume steps; reasoning agents for the judgment steps — with the agent orchestrating. If your org already has RPA, the agentic layer extends it; it doesn't obsolete that investment.

## The Questions to Ask in an Agentic-Automation Review

1. What are this loop's termination conditions — goal, step cap, budget, time?
2. What's the harness — how do we observe, trace, and audit what it did?
3. What's the worst irreversible action it can take, and who confirms before it fires?
4. What's the cost per completed task, including failures?
5. Does it meet our audit-log obligations for this use case's risk tier?

## The One-Paragraph Takeaway

Loop and harness engineering are the 2026 capabilities that turn AI from something that answers into something that *acts autonomously over time* — the foundation of agentic automation. The value is real (autonomous workflows, agent + RPA together), but the risk profile is new: uncapped cost, unsupervised action, and audit obligations. Approve these systems on their termination logic, their observability/audit trail, and their human gates on irreversible actions — the harness, not the model, is what determines whether they're safe.
`,

// ─────────────────────────────────────────────────────────────
engineer: `
# Loop & Harness Engineering

The 2026 successor to prompt and context engineering. If context engineering is what the model *sees*, loop engineering is what it *does* — repeatedly, autonomously — and harness engineering is the environment that makes that reliable.

## Prompt → Context → Loop → Harness

\`\`\`
Prompt eng   (2022-23): optimize the wording of a single call
Context eng  (2024-25): optimize what's in the window at inference
Loop eng     (2026):    optimize what the agent does between calls,
                        when it self-checks, and how it terminates
Harness eng  (2026):    optimize the environment the loop runs in —
                        tools, memory, guardrails, observability
\`\`\`

The shift is enabled by long-horizon capability: METR-style benchmarks now show frontier models completing ~50% of tasks that take a human on the order of 12 hours. A model that can grind for hours needs a well-engineered loop and harness or it wanders, loops forever, or fails silently at hour three.

## Anatomy of the Loop

\`\`\`mermaid
flowchart TD
    G([Goal + budget]) --> ACT[Act: next tool call / step]
    ACT --> OBS[Observe result]
    OBS --> VER[Verify: grounded check]
    VER --> TERM{Terminate?}
    TERM -->|no progress OR cap OR budget| STOP([Halt + report state])
    TERM -->|goal verified| DONE([Done + trace])
    TERM -->|continue| ACT
\`\`\`

## Termination Logic — the Part That's Actually Hard

An unbounded loop is a production incident waiting to happen. Robust termination combines *multiple* conditions, checked every iteration:

| Condition | Detects | Implementation note |
|---|---|---|
| **Goal met** | success | requires a *grounded* verification signal, not self-assessment |
| **Iteration cap** | pathological looping | hard integer max; non-negotiable |
| **Budget spent** | cost runaway | token + dollar ceiling, checked before each step |
| **No progress** | stuck loop | compare state across last N steps; halt if no movement toward goal |
| **Wall-clock timeout** | hangs | especially for scheduled/unattended loops |

"No-progress" detection is the subtle one and the most valuable: a loop that keeps acting but isn't advancing (re-reading the same file, re-trying the same failing approach) burns budget indefinitely. Track a progress signal and halt when it flatlines.

## Grounded Self-Verification

The loop's verify step is where quality is won or lost. Ungrounded verification — asking the same model "did you do that correctly?" — is unreliable; the model that made the error is biased toward endorsing it. Ground it:

- **Execute and observe** — run the tests, read the actual failure, don't ask "does this look right?"
- **Schema-validate** tool outputs and structured results.
- **Separate critic** — a fresh model/context evaluating the output, not the context that produced it.
- **External oracle** where one exists — a linter, a type checker, a second data source.

## The Five Harness Layers

A production harness (the environment around the model) has five layers, and ~65% of enterprise agent failures trace to defects here, not to the model:

1. **Tool orchestration** — the tools, their schemas, permissions, idempotency
2. **Verification loops** — the grounded checks above
3. **Context & memory** — what carries between steps, compaction, working-memory state
4. **Guardrails** — input/output validation, human-in-loop gates on irreversible actions
5. **Observability** — full traces of every step for debugging and audit

## Harness Defects — the Real Failure Modes

The three that dominate production incidents:

| Defect | What happens | Fix |
|---|---|---|
| **Context drift** | accumulated stale/contradictory context steers the loop wrong | compaction, working-memory state, fresh sub-agent contexts |
| **Schema misalignment** | tool returns/expects a shape the model mishandles | strict schemas + validation + retry-with-error-feedback |
| **State degradation** | long-running state gets corrupted/inconsistent over many steps | explicit, validated state objects; checkpoint + resume |

## Heterogeneous Model Routing

Agent fleets making thousands of calls/day make model choice an economic decision. The production pattern is a **heterogeneous loop**: small language models for high-frequency simple steps (routing, extraction, classification), mid-tier for standard work, frontier reasoning models only for the genuinely hard steps. A homogeneous loop running the flagship model on every step is the canonical cost blowout — often 5–10× more expensive than a routed loop with no quality loss on the simple steps.

## Where This Shows Up Today

- **Claude Code**: \`/loop\` (recurring task execution), cron scheduling, dynamic/self-paced workflows, sub-agents for parallel sub-loops — the most accessible loop-engineering primitives in a shipping tool.
- **Coding agents generally**: the 2026 trend is longer-running self-verifying "while-not-done" loops with strong termination logic and parallel sub-loops delegated to sub-agents.

## The One-Sentence Takeaway

Loop engineering is designing the act-verify-terminate cycle an autonomous agent runs, and harness engineering is building the tool/memory/guardrail/observability environment around it — and since two-thirds of production agent failures are harness defects, this layer, not the model, is where reliability is now won.
`

};
