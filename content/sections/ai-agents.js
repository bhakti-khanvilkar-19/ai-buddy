SECTION_CONTENT['ai-agents'] = { default: `
# AI Agents

## What is an Agent?

An AI agent is a system that **perceives its environment, decides what to do, and takes actions** to achieve a goal — on its own, without a human approving each step.

Unlike a chatbot (which waits for you to ask things), an agent:
- Breaks a goal into sub-tasks itself
- Picks and uses tools (web search, code execution, APIs)
- Loops until the goal is done or it gets stuck
- Reflects on its own output and self-corrects

> **Analogy:** A chatbot is a calculator — you press buttons and get answers. An agent is an intern — you give it a goal and it figures out the steps.

---

## Agent vs Chatbot

| | Chatbot | Agent |
|---|---|---|
| Input | One message at a time | A goal |
| Output | One reply | A completed task |
| Memory | Usually none | Maintains state across steps |
| Tools | Rarely | Core capability |
| Loop | No | Yes — runs until done |
| Autonomy | Zero | High |

---

## Agent vs Workflow

| | Workflow | Agent |
|---|---|---|
| Steps | Pre-defined, fixed | Decided at runtime |
| Flexibility | Low | High |
| Predictability | High | Lower |
| Use case | Stable repeatable tasks | Open-ended tasks |

Use a **workflow** when you know every step in advance. Use an **agent** when the path depends on what the agent discovers along the way.

---

## The Agent Loop

This is the heartbeat of every AI agent. It repeats until the goal is complete:

\`\`\`mermaid
flowchart TD
    A["1 · OBSERVE<br/>read environment & current state"] --> B["2 · THINK<br/>reason about the situation"]
    B --> C["3 · PLAN<br/>pick the next action"]
    C --> D["4 · ACT<br/>call a tool or respond"]
    D --> E["5 · REFLECT<br/>did it work? what next?"]
    E -->|goal not complete| A
    E -->|goal complete| F([Return result])
\`\`\`

Each iteration of this loop is called a **step** or **turn**. A task might take 3 steps or 30 — the agent decides.

---

## Observe → Think → Plan → Act → Reflect

### 1. Observe
The agent reads its current state:
- What tools are available?
- What has it already done (memory)?
- What's in the current context?

### 2. Think
The LLM reasons about the situation. With models like Claude or GPT-4o, this is the "chain of thought" phase — the model reasons through the problem before deciding what to do.

### 3. Plan
The agent decides what action to take next. It might call a tool, write code, search the web, or ask a clarifying question.

### 4. Act
The agent executes the action. Tool calls return results back into the context. A web search returns text. A code execution tool returns stdout/stderr.

### 5. Reflect
The agent reads the result of its action and decides:
- Did it work?
- Is the goal complete?
- What should happen next?

This reflection step is what separates capable agents from fragile ones.

---

## Why Agents Are Powerful — and Risky

**Powerful because:**
- They can handle tasks too complex or long for a single LLM call
- They use tools to access real-time data, run code, and interact with systems
- They self-correct when something goes wrong

**Risky because:**
- Errors compound — a wrong early step sends the whole chain off-track
- They can take irreversible actions (send an email, delete a file, make an API call)
- They can loop indefinitely without a proper stopping condition
- Prompt injection attacks can hijack agent behavior

**Rule of thumb:** Always add a **maximum step limit** and **human-in-the-loop checkpoints** for anything that touches production systems.

---

## Real Examples of Agents in Action

- **Research agent:** Given a topic, searches the web, reads papers, summarizes findings, writes a report
- **Code agent (Claude Code):** Given a bug report, reads the repo, finds the bug, writes a fix, runs tests, creates a PR
- **Customer support agent:** Reads a ticket, queries CRM, checks order status, drafts a reply, escalates if needed
- **DevOps agent:** Monitors alerts, reads logs, identifies root cause, opens a Jira ticket, pages on-call
`,
earthling: `
# AI Agents

## The Difference in One Story

Imagine you need a birthday party planned.

**A chatbot** is like calling a knowledgeable friend: "What's a good cake flavor?" — "Chocolate is always safe!" Helpful, but *you're* still doing all the work, one question at a time.

**An agent** is like hiring a party planner: "Plan my daughter's 8th birthday, around $300, she loves dinosaurs." The planner figures out the steps themselves — finds a venue, orders the dino cake, sends invitations, handles the thing where the balloon shop is closed and finds another one — and comes back with a finished party.

That's the whole idea: **a chatbot answers you; an agent works for you.**

---

## How Does an Agent Actually Work?

Agents run on a simple repeating cycle — the same one you use when cooking a new recipe:

1. **Look** at where things stand (What's in the fridge?)
2. **Think** about what to do next (I need to buy cream.)
3. **Do it** (Go to the store.)
4. **Check the result** (Store's out of cream — plan B: use milk and butter.)
5. **Repeat** until dinner is served.

The AI does exactly this: look, think, act, check, repeat — dozens of times if needed — until the job is done. The "check the result and adjust" step is what makes it feel intelligent rather than robotic.

---

## What Do Agents Use to "Do" Things?

A chatbot can only produce words. Agents get **tools** — abilities plugged into them, like apps on a phone:

- Search the web
- Read and write documents
- Send emails
- Check calendars
- Book things, buy things, look things up in company systems

The agent decides *when* to use each tool, the way you decide when to grab your calculator versus your calendar.

---

## Where You'll Meet Agents in Real Life

- **Customer service:** You email about a double-charge; an agent checks your account, sees the duplicate, refunds it, and replies — no human involved, resolved in minutes.
- **Research:** "Compare the best family SUVs under $40k" — an agent reads dozens of reviews and gives you a comparison table.
- **For workers:** Agents that draft reports, sort inboxes, prepare meeting summaries.

---

## Why People Are Careful with Agents

Giving AI the ability to *act* (not just talk) raises the stakes:

- A chatbot that's wrong wastes your time. An agent that's wrong might **send** the wrong email or **buy** the wrong ticket.
- Small early mistakes snowball — like a party planner who wrote down the wrong date and built everything around it.

That's why well-designed agents pause and ask a human before doing anything big or irreversible — "About to spend $300, confirm?" Think of it as the agent showing you the receipt *before* swiping the card.

---

## The One-Sentence Takeaway

An agent is AI you can hand a *goal* instead of a question — it plans the steps, uses its tools, fixes its own missteps, and (if it's built right) checks with you before doing anything you can't undo.
`,
commander: `
# AI Agents

## The Shift Your Team Needs to Understand

Every AI tool your org has used until now — chatbots, copilots, autocomplete — answers questions. An **agent** completes goals. That's not an incremental upgrade; it's a different delivery model, and it changes what "shipping an AI feature" means for your roadmap.

**Chatbot delivery:** ship a Q&A interface, users do the work of stitching answers into outcomes.
**Agent delivery:** ship an outcome — "resolved ticket," "reviewed PR," "generated report" — with no human stitching required.

This is why agent-based products can compress work that used to take a team-week into an afternoon. It's also why they carry more risk per deployment.

---

## What This Means for Your Roadmap

Agentic features are a different kind of project than the AI features you've shipped so far:

| Traditional AI feature | Agentic feature |
|---|---|
| One model call, predictable cost | Multi-step, cost scales with task complexity |
| Deterministic-ish scope | Scope is discovered at runtime |
| QA: test the prompt | QA: test the *decision boundaries* |
| Failure mode: bad answer | Failure mode: wrong *action taken* |
| Ships in a sprint | Needs step-limits, guardrails, and rollback design |

**Budgeting implication:** an agent that averages 8 tool calls per task costs roughly 8x a single-shot LLM call. Get engineering to model this before committing to a launch date — cost surprises are the #1 way agentic pilots blow their budget.

---

## The Build vs. Risk Tradeoff

The capability that makes agents valuable — autonomy — is the same thing that makes them risky. As a decision-maker, your job is setting the **trust tier** for each agent you approve:

| Tier | What it can do | Approval needed for launch |
|---|---|---|
| Read-only | Search, summarize, answer | Standard review |
| Internal write | Update tickets, draft docs | Team lead sign-off |
| External action | Send emails, post publicly | Legal/comms review |
| Financial/irreversible | Refunds, payments, deletions | Executive sign-off + human-in-loop mandatory |

**The question to ask in every agent proposal review:** "What's the worst single action this agent could take, and who confirms before it happens?" If the answer is "no one," that's not ready to ship regardless of how good the demo looked.

---

## Where Agents Are Already Paying Off (2025)

- **Support deflection:** agents resolving 30-60% of tier-1 tickets without human involvement, with clean escalation for the rest
- **Code review:** agent-first review passes catching issues before a human reviewer's time is spent
- **Internal knowledge:** agents answering "how do we do X" questions that used to interrupt senior staff
- **Incident response:** agents doing first-pass root cause analysis, cutting mean-time-to-diagnosis significantly

**Pattern across all of these:** the agent handles the 80% of cases that are routine, and hands off the 20% that need judgment. That handoff design is where most of the engineering effort — and most of the value — actually lives.

---

## Questions to Ask Before Greenlighting an Agent Project

1. **What's the stopping condition?** If the team can't describe when the agent is "done," it will run longer and cost more than estimated.
2. **What happens on failure?** Silent failure is unacceptable in production — demand a defined fallback (escalate to human, retry, or explain-and-stop).
3. **Who's accountable for a bad agent decision?** Same as any other production system — this needs an owner, not "the AI did it."
4. **What's the cost ceiling per task?** Agents can loop; without a hard cap, a bug can turn into a five-figure API bill overnight.
5. **How will you know it's working?** Insist on evals before launch, not just a demo. A demo shows the happy path; evals show the failure rate.

---

## The One-Paragraph Takeaway for Your Next Staff Meeting

Agents let you ship *outcomes* instead of *interfaces*, which is why they're the biggest lever available on your roadmap right now — but they fail differently than the software your team is used to shipping: not with a wrong answer on screen, but with a wrong action taken in the world. Approve agent projects the way you'd approve any system with real-world side effects — clear trust tiers, a human checkpoint on anything irreversible, and evals before launch, not after an incident.
`,
embedded: `
# AI Agents

## Agents in an Embedded Context

An agent in the embedded world isn't running on your target hardware — it's running on your development machine, with tools that touch your build system, your debugger, and your serial console. Think of it as a very capable lab assistant: it can flash the board, read the trace, and try again, but it never runs *on* the MCU itself.

\`\`\`mermaid
flowchart TD
    A[Observe: read dmesg/journalctl/serial output] --> B[Think: hypothesize root cause]
    B --> C[Plan: pick next diagnostic step]
    C --> D[Act: run command / read file / grep source]
    D --> E[Reflect: does evidence match hypothesis?]
    E -->|not resolved| A
    E -->|resolved| F([Report root cause + fix])
\`\`\`

This loop is the same agent loop used everywhere else in AI — the only difference is the toolset: instead of web search and databases, an embedded-focused agent's tools are things like \`dmesg\`, \`journalctl\`, \`addr2line\`, JTAG scripts, and your build system.

---

## A Realistic Embedded Agent Task

\`\`\`
Goal: "Board hangs intermittently after 4-6 hours of runtime under load.
No watchdog trigger, no OOM in the logs."

Agent loop:
1. Observe: read the last 500 lines of serial console before the hang
2. Think: no crash signature — likely a hardware/power issue, not a
   software panic. Check for patterns around timing.
3. Act: grep dmesg history for thermal throttling events
4. Observe: found repeated "cpu thermal: throttling" entries in the hours
   before each hang
5. Think: correlate throttle events with ambient load — hang happens
   ~30min after throttling starts
6. Act: check the power rail scope captures around the hang timestamp
7. Reflect: VDD_CORE dips below spec during throttle recovery — likely
   PMIC/decoupling issue, not a software bug
8. Report: root cause is a power delivery marginal condition surfaced
   under thermal stress, not a kernel bug — recommend hardware review
\`\`\`

Notice this agent never touches the target board directly — it reasons over logs, scope captures, and source code you feed it. That's the right trust tier for embedded work: **read-only diagnostic reasoning**, with the engineer deciding and executing any actual hardware or flash operation.

---

## Where Agents Add Real Value in Embedded Workflows

- **Log triage:** feeding hours of dmesg/journalctl output and getting a ranked list of anomalies instead of manually scrolling
- **Driver skeleton generation:** "write a platform driver skeleton for this device tree node" — saves the boilerplate, you review the hardware-specific logic
- **Cross-referencing datasheets:** describe a register behavior, get candidate causes cross-referenced against the SoC reference manual you provide
- **Build system debugging:** parsing Yocto/Buildroot failure output and identifying the actual failing recipe, not just the top-level error

---

## Where to Keep the Human Firmly in the Loop

- **Anything that flashes hardware** — a bad flash on a bricked board is expensive and sometimes unrecoverable
- **Power sequencing changes** — get these reviewed by a hardware engineer regardless of how confident the agent's suggestion looks
- **Safety-relevant code paths** (see Functional Safety section) — agent-suggested changes here go through the same ASIL/SIL review as human-written changes, no exceptions

---

## The One-Sentence Takeaway

In embedded work, an agent is a tireless log-reading, pattern-matching lab assistant that accelerates root cause analysis — but it stays off the hardware itself, with every flash, power change, or safety-relevant fix routed through you.
`,

engineer: `
# AI Agents

You've built agents. This is about why they fail in production and what actually makes them reliable.

## Error Compounding Is the Core Problem

An agent's reliability is roughly **per-step reliability ^ number-of-steps**. At 95% per-step reliability, a 10-step task succeeds ~60% of the time; a 20-step task, ~36%. This is the math behind "the demo worked, production doesn't."

Consequences:
- **Minimize steps.** Every tool call is a coin flip against your reliability budget. Prefer one well-designed tool over three chained ones.
- **Bound the loop.** A hard max-step limit is non-negotiable — without it, a confused agent burns tokens indefinitely and you find out from the bill.
- **Fail visibly.** An agent that stops and says "I'm stuck on X" is worth more than one that silently produces a plausible-wrong result at step 15.

## The Loop Is a State Machine You Must Instrument

\`\`\`mermaid
flowchart TD
    O[Observe] --> T[Think]
    T --> A[Act: tool call]
    A --> R[Reflect: did it work?]
    R -->|yes, not done| O
    R -->|no| RETRY{retries left?}
    RETRY -->|yes| T
    RETRY -->|no| ESC[Escalate / stop visibly]
    R -->|done| DONE([Return + trace])
\`\`\`

You cannot debug what you cannot see. Every production agent needs a **trace**: each step's input, the tool called, args, result, and the model's reasoning. When an agent does something wrong at step 12, the trace is the only way to find out whether it was a bad tool result, a reasoning error, or a stale-context problem.

## Tool Design Is Where Agents Are Won or Lost

The model only knows about a tool what its description says. Most agent failures are actually tool-interface failures:

| Anti-pattern | Fix |
|---|---|
| One mega-tool with 15 params | Several focused tools with clear single purposes |
| Tool returns 5KB of JSON | Return only the fields the agent needs — bloated results poison context |
| Ambiguous description | Description should say *when* to use it, not just what it does |
| Tool fails silently / returns error string the model ignores | Structured errors the model is instructed to handle |
| No idempotency on write tools | Retries double-charge, double-send — make writes idempotent |

## Context Management Across Steps

Agent context grows every step (each tool result appends). Two failure modes:
- **Context bloat**: by step 20 the window is full of stale tool output, cost is high, and quality drops (lost-in-the-middle). Compact old steps into summaries; keep a structured "working memory" of decisions/facts rather than raw history.
- **Context drift**: an early wrong assumption stays in context and contaminates later reasoning. This is a real hallucination driver in long agent runs — starting a fresh sub-agent with a clean, curated context often outperforms continuing a polluted one.

## Trust Tiers Are an Architecture Requirement

Map every tool to a permission tier and gate accordingly:

| Tier | Example | Gate |
|---|---|---|
| Read-only | search, read file, query | none |
| Local write | edit file, update record | log + reversible |
| External/irreversible | send email, charge, delete, deploy | human-in-loop confirm, always |

The question in every agent design review: *"what is the worst single action this agent can take, and who confirms before it happens?"* If the answer is "nobody," it's not production-ready regardless of demo quality.

## Single Agent vs Multi-Agent

Reach for multiple agents when the task genuinely needs parallelism or isolated context windows — not because it sounds sophisticated. Multi-agent multiplies cost, latency, and failure surface, and adds agent-to-agent trust as a new problem. A well-scoped single agent with good tools beats an orchestra that's hard to trace.
` };
