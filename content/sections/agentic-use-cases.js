SECTION_CONTENT['agentic-use-cases'] = { default: `
# Agentic AI Use Cases

## Research Agent

**What it does:** Given a topic or question, autonomously searches the web, reads sources, synthesizes findings, and writes a comprehensive report.

**Tools needed:** web_search, fetch_url, read_file, write_file

\`\`\`
Goal: "Research the current state of quantum computing and its impact on cryptography"

Agent loop:
1. Search: "quantum computing cryptography 2025"
2. Read top 5 URLs, extract key facts
3. Search: "post-quantum cryptography standards NIST"
4. Read NIST documentation
5. Synthesize findings
6. Write structured report
7. Add citations
\`\`\`

**Real implementation:** Perplexity AI, Claude with web search, custom research pipelines.

---

## Documentation Agent

**What it does:** Reads source code and generates, updates, or improves documentation automatically.

**Tools needed:** read_file, glob, grep, write_file

\`\`\`
Goal: "Generate API documentation for all public endpoints in src/api/"

Agent loop:
1. Glob: find all files in src/api/
2. Read each file
3. Extract: endpoint path, method, parameters, return type, error cases
4. Generate OpenAPI spec or Markdown docs
5. Write docs/api.md
6. Create example curl commands for each endpoint
\`\`\`

**Especially valuable for:** Keeping docs in sync with code — agents can re-run on every PR.

---

## Code Review Agent

**What it does:** Reviews pull requests for bugs, security issues, style problems, and architecture concerns.

**Tools needed:** read_diff, read_file, create_pr_comment

\`\`\`
Goal: Review PR #234 in the auth service

Agent loop:
1. Read the PR diff
2. Read relevant files (imported modules, tests)
3. Analyze for: bugs, security issues, test coverage, style
4. Post inline comments on specific lines
5. Write summary comment with: overall assessment, critical issues, suggestions
\`\`\`

**Integration:** GitHub Actions → trigger on PR open → agent reviews → posts comments.

---

## Bug Investigation Agent

**What it does:** Given a bug report or error, investigates root cause across logs, code, and configuration.

**Tools needed:** read_logs, search_code, query_db, read_file

\`\`\`
Goal: "Users report login fails intermittently — started after Tuesday's deploy"

Agent loop:
1. Query logs: filter for 401/403 errors after Tuesday
2. Identify pattern: failures spike at exactly :00 and :30 each hour
3. Search code for scheduled tasks at those times
4. Find: token refresh job runs at :00/:30 and has a race condition
5. Read affected code
6. Identify fix: add mutex lock to token refresh
7. Write bug report with: root cause, affected code, fix, test case
\`\`\`

---

## Customer Support Agent

**What it does:** Handles customer inquiries by searching knowledge bases, looking up account data, and drafting responses or taking actions.

**Tools needed:** search_docs, get_customer_data, get_order_status, create_ticket, send_email

\`\`\`
Customer: "I was charged twice for order #12345"

Agent loop:
1. Get order #12345 details
2. Query payment history for customer
3. Confirm: two charges found for $89.99 on June 28
4. Check if refund policy applies (yes — within 30 days)
5. Process refund for duplicate charge
6. Draft response explaining what happened and confirming refund
7. Send response + log interaction
\`\`\`

**Important:** Human escalation trigger for: large amounts (>$500), angry customers, legal threats, anything unusual.

---

## Knowledge Assistant

**What it does:** Answers questions about internal documentation, codebases, policies, or any knowledge base using RAG.

**Architecture:**

\`\`\`
Documents (Confluence, Notion, PDFs, code)
    ↓ chunk + embed
Vector Database (Pinecone, Qdrant)

User question
    ↓ embed
    ↓ semantic search → top 5 relevant chunks
    ↓ inject into prompt
    ↓ LLM generates grounded answer
    ↓ includes source citations
\`\`\`

**Use cases:**
- "What's our deployment process for the payment service?"
- "Who do I talk to about database migrations?"
- "What does error code AUTH_003 mean?"
- "Summarize the Q2 2025 engineering retrospective"

---

## Key Design Principles for All Use Cases

1. **Define the stopping condition clearly** — when is the task done?
2. **Set a maximum step limit** — prevent infinite loops
3. **Log every step** — you need to debug failures
4. **Confirm before irreversible actions** — "Are you sure you want to process this $500 refund?"
5. **Graceful failure** — when the agent can't complete the task, it should explain why and suggest alternatives, not silently fail
`,
earthling: `
# What Are AI Agents Actually Used For?

Agents are AI that can *do* things, not just chat. Here's where they're already working — in stories, not tech-speak.

---

## The Researcher

**The situation:** You're choosing a preschool, comparing insurance plans, or researching a medical diagnosis — a decision that needs *hours* of reading.

**What the agent does:** You state your question. It searches, reads dozens of sources, cross-checks claims, and hands you an organized comparison with sources listed — in minutes.

**Real-life version you can try today:** Tools like Perplexity or Claude's research features do exactly this.

---

## The Paperwork Assistant

**The situation:** Every organization drowns in documents — manuals that go stale, reports nobody has time to write.

**What the agent does:** Reads the source material and writes the summary, the update, the report. When the source changes, it refreshes the documents automatically. The humans review instead of write — which is ten times faster.

---

## The Detective

**The situation:** Something's wrong — a computer system is failing, numbers don't add up, customers are complaining — and nobody knows *why*.

**What the agent does:** Works like a detective: gathers the evidence (records, logs, timelines), looks for patterns ("all the failures happen at exactly half past the hour..."), forms a theory, checks it, and reports the culprit. What used to take an expert a full day of digging can happen over a coffee break.

---

## The Customer Service Rep Who Never Sleeps

**The situation:** You email a company at 11pm about a double charge.

**What the agent does:** Reads your message, looks up your account, confirms the duplicate charge, checks the refund rules, processes the refund, and replies — all before midnight. The good ones also know their limits: a big amount or an angry customer gets handed to a human.

**What this means for you:** Late-night customer service is quietly becoming... actually good. And if you run a small business, this level of service is no longer just for the big players.

---

## The Office Know-It-All (the good kind)

**The situation:** Every workplace has questions like "how do I file this expense?" or "what's the wifi password in the Berlin office?" — answered by interrupting a colleague.

**What the agent does:** Reads all the company documents once, then answers everyone's questions instantly, citing exactly which document the answer came from. No more interrupting Carol from accounting.

---

## What All the Good Ones Have in Common

Notice the pattern across every story:

1. **They know when they're done** — no endless spinning.
2. **They show their work** — sources, receipts, reasoning.
3. **They know their limits** — big decisions and sensitive cases go to a human.
4. **They fail politely** — "I couldn't find this, here's who can help" instead of silence.

When you evaluate any AI service — as a customer or for your own business — those four traits are exactly what to look for.
` };
