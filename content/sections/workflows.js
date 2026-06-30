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

\`\`\`
Support ticket arrives (trigger)
    ↓
LLM: Classify priority and category (AI step)
    ↓
[if critical] → page on-call immediately
[if billing] → route to billing queue
[if bug] →
    LLM: Extract reproduction steps + affected version (AI step)
    ↓
    Search existing issues (tool call)
    ↓
    LLM: Is this a known issue? (AI step)
    ↓
    [if yes] → link to existing ticket, close
    [if no] → create new Jira issue, assign to team
\`\`\`

This hybrid pattern is extremely powerful — deterministic flow for reliability, LLM for the parts that require judgment.
` };
