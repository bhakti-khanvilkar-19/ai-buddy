SECTION_CONTENT['sub-agents'] = { default: `
# Sub-Agents

## What is a Sub-Agent?

A **sub-agent** (also called a worker agent or child agent) is an AI agent that is **spawned by another agent** (the orchestrator) to handle a specific subtask.

Instead of one agent doing everything, you split the work:

\`\`\`
User Goal: "Research competitors and write a market analysis report"

Orchestrator Agent
├── Sub-agent A: Web Research Agent
│     → searches for competitor info, returns structured data
├── Sub-agent B: Financial Analysis Agent
│     → analyzes pricing, revenue estimates
├── Sub-agent C: Report Writer Agent
│     → combines findings, writes the report
└── Returns finished report to user
\`\`\`

Each sub-agent is focused, specialized, and runs with its own context window — which is critical because LLM context windows are finite.

---

## Multi-Agent Systems

A multi-agent system (MAS) is a collection of agents that collaborate to complete tasks that would be too large, complex, or specialized for any single agent.

### Why use multiple agents?

| Problem | Multi-agent solution |
|---|---|
| Task too long for one context window | Split across agents, each handles a chunk |
| Task needs parallel work | Run sub-agents simultaneously |
| Task needs specialized expertise | Route subtasks to specialist agents |
| Task needs independent verification | Use a separate critic/reviewer agent |
| Task is too risky for one agent | Add a safety-checking agent in the loop |

---

## Agent Orchestration Patterns

### 1. Orchestrator → Workers (most common)

A central orchestrator plans the work and delegates to worker sub-agents. Workers report back; orchestrator synthesizes.

\`\`\`
Orchestrator: "I need to audit 50 repos for security issues"
  → Spawns 50 worker agents in parallel (one per repo)
  → Each worker scans its repo, returns findings as JSON
  → Orchestrator aggregates findings, deduplicates, ranks by severity
  → Returns consolidated security report
\`\`\`

### 2. Pipeline (chain of agents)

Output of one agent is input to the next. No parallelism, but each step builds on the previous.

\`\`\`
Scraper Agent → Parser Agent → Analyst Agent → Writer Agent → Report
\`\`\`

### 3. Hierarchical (nested orchestrators)

Orchestrators spawn sub-orchestrators, which spawn workers. Scales to very complex tasks.

\`\`\`
CEO Agent
├── Research Director Agent
│     ├── Web Research Worker
│     └── Database Query Worker
├── Engineering Director Agent
│     ├── Code Writer Worker
│     └── Code Reviewer Worker
└── QA Director Agent
      └── Test Runner Worker
\`\`\`

### 4. Debate / Critic Pattern

Multiple agents work on the same task independently, then a judge agent picks the best output or merges them.

\`\`\`
Problem: "Design the API for user authentication"

Agent A: Proposes design 1
Agent B: Proposes design 2
Agent C (Critic): Reviews both, merges best ideas, identifies gaps
Orchestrator: Returns final merged design
\`\`\`

---

## Coordinator Patterns

### Handoff
One agent completes its task, packages results, and hands off to the next agent.

\`\`\`python
# Agent A finishes, creates handoff payload
handoff = {
    "from": "research_agent",
    "to": "writer_agent",
    "findings": [...],
    "context": "Write a blog post based on these findings"
}
# Writer agent picks up the handoff
\`\`\`

### Shared Memory
All agents read/write to a shared memory store (Redis, database, vector store). Agents coordinate by reading shared state rather than passing messages directly.

### Message Queue
Agents communicate via a message queue (RabbitMQ, SQS, Kafka). Decouples agents — each runs independently and reacts to messages.

---

## Sub-Agents in Claude Code

Claude Code uses sub-agents natively. When you give it a complex task, it spawns **Task agents** to handle parallel workloads:

- Each Task agent gets its own context window
- They run in parallel where possible
- The orchestrator Claude reads their outputs and synthesizes

You can see this in action: when Claude Code says "I'll spawn an agent to search for X while I work on Y", that's a sub-agent.

**Explicitly requesting sub-agents:**
\`\`\`
"Review all 20 files in src/api/ and identify which ones
have missing input validation. Run these checks in parallel."
\`\`\`
Claude Code will spawn multiple agents to check files simultaneously rather than doing them sequentially.

---

## Sub-Agents in GitHub Copilot

GitHub Copilot Workspace uses a form of multi-agent architecture:

1. **Planner agent:** Reads your issue/task, creates a step-by-step plan
2. **Coder agents:** Implement each step of the plan
3. **Reviewer agent:** Reviews the final diff

Copilot Extensions can also be multi-agent — your extension can call other services/agents and synthesize results.

---

## Risks of Multi-Agent Systems

- **Error propagation:** A mistake by one agent cascades to all downstream agents
- **Cost:** Each agent call costs tokens — 10 parallel agents = 10x the cost
- **Debugging:** Hard to trace which agent made a bad decision
- **Trust:** Should Agent A blindly trust Agent B's output? (Agent-to-agent trust is a real security concern)
- **Infinite loops:** Agents bouncing work between each other without terminating

**Best practices:**
- Always set a max step/agent limit
- Log every agent's input and output
- Add a final validation step before returning output to the user
- For sensitive actions, require human confirmation regardless of which agent requests it
` };
