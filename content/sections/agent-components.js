SECTION_CONTENT['agent-components'] = { default: `
# Agent Components

Every production agent is built from five core components. Get these right and the agent works reliably. Skip one and it breaks in hard-to-debug ways.

\`\`\`
┌─────────────────────────────────────────────────┐
│                   AI AGENT                      │
│                                                 │
│  ┌───────────┐  ┌───────────┐  ┌────────────┐  │
│  │INSTRUCTIONS│  │   TOOLS   │  │   MEMORY   │  │
│  └───────────┘  └───────────┘  └────────────┘  │
│                                                 │
│       ┌──────────────┐  ┌───────────┐           │
│       │  KNOWLEDGE   │  │ PLANNING  │           │
│       └──────────────┘  └───────────┘           │
└─────────────────────────────────────────────────┘
\`\`\`

---

## 1. Instructions

Instructions define **who the agent is and how it behaves**. They live in the system prompt and set:

- The agent's **role and persona** ("You are a senior DevOps engineer...")
- **Scope and constraints** ("Only answer questions about our Kubernetes infrastructure")
- **Output format** ("Always respond in JSON with keys: action, reasoning, next_step")
- **Tone and style** ("Be concise. Use bullet points. Never apologize.")
- **Safety boundaries** ("Do not execute destructive commands without user confirmation")

### What good instructions look like

\`\`\`
You are an AI code reviewer specializing in Python and security.

Your job:
1. Review the code diff provided by the user
2. Identify bugs, security issues, and style problems
3. Suggest concrete fixes with code examples
4. Rate severity: Critical / High / Medium / Low

Rules:
- Never approve code with SQL injection or hardcoded secrets
- If you find a Critical issue, stop and report it immediately before continuing
- Format your response as: [Severity] Issue: <description> Fix: <code>
\`\`\`

### Instructions vs Prompt

| Instructions | Prompt |
|---|---|
| Set in system prompt (persistent) | User message (per-turn) |
| Define identity + behavior | Define the task |
| Written by developer | Written by user or code |
| Change rarely | Change every call |

---

## 2. Tools

Tools are **functions the agent can call** to interact with the world. Without tools, an agent can only reason — tools let it act.

### Tool types

| Type | Examples |
|---|---|
| **Search** | Web search, vector DB search, knowledge base |
| **Read** | Read files, fetch URLs, query databases |
| **Write** | Write files, update records, send messages |
| **Execute** | Run code, run shell commands, call APIs |
| **Compute** | Calculator, unit converter, date math |

### How tools work (function calling)

\`\`\`python
# Define the tool
tools = [{
    "name": "search_web",
    "description": "Search the web for current information",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "Search query"}
        },
        "required": ["query"]
    }
}]

# Agent decides to call it
# Model returns: {"tool": "search_web", "input": {"query": "Python 3.13 release notes"}}
# You execute the tool, return results back to the model
\`\`\`

### Tool design principles
- **One tool, one job** — don't build a Swiss Army knife tool
- **Clear descriptions** — the LLM reads these to decide when to use each tool
- **Safe defaults** — read operations are safer than write operations; confirm before destructive actions
- **Return structured data** — JSON is easier for the model to reason about than prose

---

## 3. Memory

Memory lets the agent **remember across steps and across sessions**.

### Four types of memory

| Type | What it stores | Duration | Example |
|---|---|---|---|
| **In-context** | Current conversation + tool results | One session | Everything in the context window |
| **External (short-term)** | Recent interactions | Hours/days | Redis, in-memory cache |
| **External (long-term)** | Facts, preferences, past tasks | Permanent | Vector DB, relational DB |
| **Semantic** | Meaning of past interactions | Permanent | Embeddings in Pinecone/Qdrant |

### When to use each

- **In-context:** Always. It's what the model sees right now.
- **Short-term:** Multi-turn conversations where you need recent history.
- **Long-term:** Personalization, user preferences, task history.
- **Semantic:** "Remember everything I told you about project X" — search by meaning, not keyword.

---

## 4. Knowledge

Knowledge is **static information the agent needs** to do its job — documentation, policies, domain facts.

Unlike memory (which is dynamic), knowledge is reference material baked in at design time.

### Ways to give agents knowledge

| Method | How | Best for |
|---|---|---|
| **System prompt** | Paste text directly | Short docs, rules, few pages |
| **RAG** | Retrieve relevant chunks at runtime | Large doc sets, technical manuals |
| **Fine-tuning** | Train into model weights | High-frequency, unchanging facts |
| **Tool** | Query a knowledge base as a tool call | Authoritative, frequently updated info |

---

## 5. Planning

Planning is the agent's ability to **decompose a complex goal into executable steps**.

### Planning patterns

**Sequential** — do step A, then B, then C in order.

**Parallel** — do A, B, and C simultaneously, merge results. Faster but harder to coordinate.

**Conditional** — if A succeeds, do B; if A fails, do C.

**Hierarchical** — a planner agent creates a plan; worker agents execute each step.

### ReAct (Reason + Act)
The most common planning pattern in practice:

\`\`\`
Thought: I need to find the Python version in the project
Action: read_file(path="pyproject.toml")
Observation: python = "^3.11"
Thought: Good. Now I need to check if the CI matrix matches
Action: read_file(path=".github/workflows/ci.yml")
Observation: python-version: ["3.10", "3.11", "3.12"]
Thought: CI includes 3.10 which doesn't match pyproject.toml minimum
Action: report_issue("CI matrix includes Python 3.10 but project requires ^3.11")
\`\`\`
` };
