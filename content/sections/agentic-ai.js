SECTION_CONTENT['agentic-ai'] = { default: `
# Agentic AI

## What Makes AI "Agentic"?

Agentic AI is AI that acts with **autonomy over multiple steps** to complete a goal. The key word is autonomy — the AI decides the intermediate steps, not the user.

A regular LLM call: you send a message, it replies. Done.

An agentic system: you state a goal, it **plans, executes, observes, corrects, and iterates** until the goal is achieved.

---

## Core Capabilities of Agentic Systems

### 1. Autonomous Planning

The agent breaks a high-level goal into a concrete sequence of steps — without you specifying them.

\`\`\`
Goal: "Set up CI/CD for this repo"

Agent's plan (generated autonomously):
  1. Read existing GitHub Actions workflows (if any)
  2. Identify build system (npm/poetry/cargo/etc.)
  3. Identify test framework
  4. Draft CI workflow for tests + linting
  5. Draft CD workflow for deployment
  6. Add .github/workflows/ci.yml and cd.yml
  7. Run a dry-run validation
  8. Report what was created
\`\`\`

### 2. Reasoning

Before acting, agentic systems reason — they think through the problem, consider alternatives, and explain their logic. This is often called **chain-of-thought** or **extended thinking**.

Claude with extended thinking (\`thinking\` blocks):
\`\`\`
<thinking>
The user wants CI/CD set up. Let me check what's there first.
I see a package.json with "test": "jest". So it's Node.js + Jest.
I don't see any workflows yet, so I need to create from scratch.
For deployment: I don't know the target yet. I'll set up CI and
ask about CD before making assumptions.
</thinking>
\`\`\`

### 3. Tool Usage

Agents don't just generate text — they call tools to interact with real systems:

- **Read tools:** files, URLs, databases, APIs
- **Write tools:** files, databases, messages
- **Execution tools:** shell commands, code runners, browser control
- **Search tools:** web search, vector search, knowledge bases

### 4. Multi-Step Execution

A single agentic task might involve dozens of steps:

\`\`\`
Step 1: search_web("latest Kubernetes security CVEs 2025")
Step 2: read_file("k8s/deployment.yaml")
Step 3: read_file("k8s/rbac.yaml")
Step 4: analyze_security_posture(findings_from_1, config_from_2_3)
Step 5: write_file("security-report.md", analysis)
Step 6: create_github_issue(title="Security findings", body=report)
\`\`\`

### 5. Reflection and Self-Correction

After taking an action, the agent reads the result and decides if it worked.

\`\`\`
Act: run_tests()
Observe: "5 tests failed: TypeError in auth.test.ts line 42"
Reflect: "The test failure is in auth.ts not the code I just changed.
          This is a pre-existing failure, not caused by my edit.
          I should flag this to the user and continue with my task."
\`\`\`

### 6. Recovery

When things go wrong, agentic systems try to recover:

- Retry with a different approach
- Fall back to a simpler method
- Ask for clarification
- Stop and explain why they're stuck

---

## The Agent Loop (in depth)

Every iteration of the loop:

\`\`\`python
while not goal_complete and steps < max_steps:
    # 1. Build context: instructions + memory + tool results so far
    context = build_context(instructions, memory, tool_results)

    # 2. Call the LLM
    response = llm.complete(context)

    # 3. Parse the response
    if response.is_tool_call:
        result = execute_tool(response.tool_name, response.tool_args)
        tool_results.append(result)
    elif response.is_final_answer:
        goal_complete = True
        return response.answer

    steps += 1
\`\`\`

The **max_steps** guard is critical — without it, a confused agent loops forever.

---

## Agentic AI Frameworks

| Framework | Best for |
|---|---|
| **Claude Code** | Software engineering tasks |
| **OpenAI Agents SDK** | GPT-4o based agents |
| **LangGraph** | Complex stateful workflows with cycles |
| **CrewAI** | Multi-agent teams with role-based agents |
| **AutoGen** | Agent conversations, code execution |
| **PydanticAI** | Type-safe agents in Python |
| **Semantic Kernel** | Enterprise .NET/Python agents |

---

## Trust Levels in Agentic Systems

Not all agents should have the same level of autonomy. Define trust tiers:

| Tier | What the agent can do | Human approval needed |
|---|---|---|
| **Read-only** | Read files, search, query | Never |
| **Local write** | Edit files, run local commands | Rarely |
| **Network** | Call external APIs | Sometimes |
| **Destructive** | Delete files, drop tables | Always |
| **Irreversible** | Send emails, charge payments | Always |

Design your agents to operate at the lowest trust tier necessary for the task.
`,
commander: `
# Agentic AI

## Autonomy Is the Product Decision, Not an Engineering Detail

When your team pitches an "agentic" feature, the real question you're being asked to approve isn't "should we use AI here" — it's "how much decision-making authority are we willing to hand to a system that reasons probabilistically." That's a product and risk decision, and it belongs at your level, not buried in a sprint.

Every agentic system makes six capability claims. Before approving, make the team show evidence for each one — not just tell you:

1. **It plans** — can it decompose your actual use case, or only the demo case?
2. **It reasons** — does its "thinking" hold up when you read the trace, or is it post-hoc justification?
3. **It uses tools** — what happens when a tool call fails or returns garbage?
4. **It executes multi-step** — how many steps before cost/latency becomes a problem?
5. **It reflects** — does it actually catch its own mistakes, or does it confidently continue?
6. **It recovers** — what's the fallback when it's stuck?

A team that can't answer #6 with specifics isn't ready to launch, no matter how good #1-5 look.

---

## The Cost Curve Nobody Puts in the First Slide

\`\`\`mermaid
flowchart LR
    A[Single LLM call<br/>1x cost] --> B[Simple agent<br/>3-5 tool calls<br/>3-5x cost]
    B --> C[Multi-agent system<br/>parallel workers<br/>10-50x cost]
    C --> D[Production scale<br/>+ retries + evals<br/>+ observability overhead]
\`\`\`

Agentic architectures trade cost for capability. That's often the right trade — but it needs to be modeled explicitly against the value delivered, not discovered in the first month's cloud bill. Ask engineering for a **cost-per-completed-task** number, not a cost-per-API-call number — the former is what actually shows up in your budget.

---

## Reframing "Reliability" for Agentic Systems

Your team is used to reliability meaning uptime and correctness. For agentic systems, add two more dimensions:

| Dimension | What it means | How to verify it |
|---|---|---|
| **Task completion rate** | % of tasks finished without human rescue | Eval suite on real historical tasks |
| **Safe-failure rate** | % of failures that fail *visibly and safely* | Red-team the failure paths, not just the happy path |

A system that succeeds 95% of the time but fails silently the other 5% is worse than one that succeeds 85% of the time and always tells you when it's stuck. Push your teams to optimize for the second property first.

---

## Trust Tiers as a Governance Tool

This is the single most useful framework to bring into vendor evaluations and internal build reviews:

| Tier | Example capability | Who approves |
|---|---|---|
| Read-only | Search, summarize, draft (unsent) | Team-level |
| Local write | Edit internal docs, update tickets | Manager sign-off |
| Network | Call external APIs, post to customer-facing systems | Director + security review |
| Destructive | Delete data, cancel orders | VP sign-off, human-in-loop required |
| Irreversible | Send money, send external comms at scale | Executive sign-off, human-in-loop mandatory |

Ask every vendor pitching an "autonomous" solution which tier their system operates at by default — and whether that tier is configurable per deployment. If they can't answer, that's a signal.

---

## The One-Paragraph Takeaway

Agentic AI shifts real decision-making authority from your team to a probabilistic system — which means the question in front of you isn't "is this technically impressive" but "at what trust tier, with what fallback, and at what cost per completed task." Approve based on those three answers, and require evidence, not demos.
`,

engineer: `
# Agentic AI

## The Autonomy Spectrum Is a Design Choice, Not a Binary

"Agentic" isn't on/off. You're choosing a point on a spectrum, and further right costs more and fails harder:

\`\`\`
Fixed workflow → LLM-routed workflow → constrained agent → open-ended agent
  (predictable,        (some branching,     (bounded tools,    (full autonomy,
   cheap, testable)     still bounded)        max steps)         hardest to trust)
\`\`\`

**Most production "agents" should be further left than they are.** If the task's steps are known, a workflow with LLM decision points at branches is more reliable, cheaper, and testable than a free-roaming agent. Reserve open-ended agency for tasks where the path genuinely can't be predetermined. The engineering skill is choosing the *least* autonomy that solves the problem.

## Reflection Is Overrated Unless It's Grounded

"The agent reflects and self-corrects" is often theater. An LLM asked "did you do that right?" with no external signal frequently says "yes" to wrong work — self-evaluation without a ground-truth signal is unreliable. Reflection works when it's grounded in something real:

- Run the tests, read the actual failure — not "does this look right?"
- Validate tool output against a schema or a second source.
- Use a *separate* critic model/prompt with a fresh context, not the same context that produced the error (which is already biased toward it).

## Planning: Plan-Then-Execute vs ReAct

| Approach | Strength | Weakness |
|---|---|---|
| **ReAct** (interleave reason/act) | Adapts to results step-by-step | Can wander; no global view; compounding errors |
| **Plan-then-execute** | Global structure, reviewable plan, checkpointable | Brittle if reality diverges from the plan |
| **Plan + replan** | Robust — execute plan, replan when reality diverges | More model calls |

For anything expensive or high-stakes, plan-then-execute with a **human-approved plan** bounds cost and risk: you catch a wrong direction before paying for 20 steps of execution.

## The Cost Curve Is Superlinear

Single call → simple agent (3–5 calls) → multi-agent (10–50 calls) → + retries + reflection + observability overhead. Measure **cost per *completed* task**, not per API call — the number that includes the failed and retried runs. A 70%-success agent's real cost includes the 30% that failed and had to be redone or escalated.

## Recovery Is a Feature You Design, Not a Hope

Production agents need explicit recovery: retry with backoff on transient tool failures, fall back to a simpler method or a human on repeated failure, and always terminate in a *defined* state (done, escalated, or explained-failure) — never a silent stall. "It usually works" is not a recovery strategy; enumerate the failure paths and handle each.
` };
