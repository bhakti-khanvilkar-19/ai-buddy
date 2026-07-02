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
` };
