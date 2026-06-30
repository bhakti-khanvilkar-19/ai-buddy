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

\`\`\`
┌─────────────────────────────────────────┐
│              AGENT LOOP                 │
│                                         │
│  1. OBSERVE  ← read environment/input   │
│       ↓                                 │
│  2. THINK    ← reason about what to do  │
│       ↓                                 │
│  3. PLAN     ← pick next action         │
│       ↓                                 │
│  4. ACT      ← call a tool or respond   │
│       ↓                                 │
│  5. REFLECT  ← was it right? what next? │
│       ↓                                 │
│  Loop back to OBSERVE ──────────────────┘
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
` };
