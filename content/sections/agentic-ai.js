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
` };
