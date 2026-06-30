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
` };
