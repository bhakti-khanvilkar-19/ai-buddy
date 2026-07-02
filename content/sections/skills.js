SECTION_CONTENT['skills'] = { default: `
# Skills

## What are Skills?

A **skill** is a reusable, named capability that an agent can invoke — like a function, but described in natural language so the LLM knows when and how to use it.

Think of skills as the agent's **verb library**: *search*, *summarize*, *translate*, *generate-image*, *query-db*, *send-email*. Each skill encapsulates a specific thing the agent knows how to do.

> **Claude Code example:** When you type \`/code-review\`, you're invoking a skill. The skill has a name, a description, and a set of steps it executes. The LLM reads the skill definition and knows exactly what to do.

---

## Skills vs Tools vs Instructions

| Concept | What it is | Example |
|---|---|---|
| **Instruction** | Tells the agent WHO it is | "You are a DevOps expert" |
| **Tool** | A function the agent can call | \`run_shell_command(cmd)\` |
| **Skill** | A named capability using one or more tools | \`/deploy — runs tests, builds Docker image, pushes to registry\` |

Skills are higher-level than tools. A single skill often chains multiple tools together.

---

## Skill Anatomy

A skill has four parts:

\`\`\`yaml
name: code-review
description: |
  Reviews code changes for bugs, security issues, and style problems.
  Use when the user asks for a review of a diff or file.
trigger: /code-review
steps:
  - Read the current git diff
  - Analyze for: correctness bugs, security issues, efficiency
  - Report findings ranked by severity (Critical → Low)
  - Suggest specific fixes with code examples
\`\`\`

### In Claude Code (skills in practice)

Claude Code uses skills defined in Markdown files under \`.claude/\` or as slash commands. Here's a real skill definition:

\`\`\`markdown
# /deploy skill

Deploy the application to staging.

Steps:
1. Run \`npm test\` — abort if tests fail
2. Run \`npm run build\`
3. Run \`docker build -t myapp:latest .\`
4. Run \`docker push registry/myapp:latest\`
5. Run \`kubectl rollout restart deployment/myapp -n staging\`
6. Wait for rollout, then run smoke tests
7. Report: deployed version, pod status, test results
\`\`\`

### In GitHub Copilot (instructions + skills)

GitHub Copilot uses \`.github/copilot-instructions.md\` to define project-level instructions, and custom agents in VS Code for skill-like workflows:

\`\`\`markdown
# .github/copilot-instructions.md

## Project conventions
- Always use TypeScript strict mode
- Prefer functional components over class components
- API calls go through \`src/api/client.ts\`, never fetch directly

## When asked to add a feature
1. Check if a similar component exists in \`src/components/\`
2. Add to existing component or create new one following naming: \`Feature.tsx\`
3. Add unit test in \`src/components/__tests__/\`
4. Update \`src/types/index.ts\` if new types are needed
\`\`\`

---

## Types of Skills

### Tool Skills
Wrap a specific tool call with good defaults and error handling.

\`\`\`
search — Search the web and return top 5 results as bullet points
read-file — Read a file and summarize its contents
run-tests — Execute the test suite and parse results into pass/fail/error counts
\`\`\`

### Domain Skills
Encode domain expertise — what a senior practitioner would know to do.

\`\`\`
debug-memory-leak — Profile heap, identify leak sources, suggest fixes
review-sql-query — Check for N+1 queries, missing indexes, injection risks
architecture-review — Evaluate design for scalability, single points of failure
\`\`\`

### Knowledge Skills
Fetch and synthesize information from a knowledge base.

\`\`\`
explain-error — Look up error in docs, find related issues, explain root cause
get-runbook — Retrieve the runbook for a given service or alert
\`\`\`

---

## Building Skills: The Loop Enhancement Pattern

Skills get better through **loops** — iterative refinement where the agent:

1. Executes a skill
2. Evaluates the output
3. Identifies what's missing or wrong
4. Refines and re-runs

\`\`\`
/improve-skill code-review

Loop:
  → Run /code-review on 10 real PRs
  → Compare output to what senior engineers flagged
  → Identify misses and false positives
  → Update skill description and steps
  → Repeat until output quality is acceptable
\`\`\`

This is exactly what \`/loop\` does in Claude Code — it runs a skill repeatedly, improving agent behavior over multiple iterations.

---

## Creating Skills in Claude Code

Claude Code supports slash commands as skills. You can define them in:

**Project-level:** \`.claude/commands/\` directory — skills scoped to your repo.

**User-level:** \`~/.claude/commands/\` — skills available in all your projects.

Each skill is a Markdown file:

\`\`\`markdown
# .claude/commands/security-audit.md

Run a security audit of the current codebase.

Steps:
1. Search for hardcoded secrets (API keys, passwords, tokens)
2. Check for SQL injection vulnerabilities in database queries
3. Check for XSS risks in any HTML rendering
4. Check dependency versions against known CVEs
5. Report findings as: [CRITICAL|HIGH|MEDIUM|LOW] <file>:<line> <description>
\`\`\`

Invoke it: \`/security-audit\`

---

## Creating Skills in GitHub Copilot

GitHub Copilot doesn't have native slash commands like Claude Code, but you can achieve skill-like behavior through:

**1. Copilot Instructions file** (\`.github/copilot-instructions.md\`)
Defines project context + behavioral rules that apply to every Copilot interaction.

**2. VS Code Copilot Chat custom instructions**
User-level instructions that persist across all your repos.

**3. Copilot Extensions** (GA 2024)
Full custom agents with tool calling — equivalent to Claude Code skills, accessible via \`@extension-name\`.

\`\`\`
# Using a Copilot extension as a skill
@azure-devops deploy to staging
@datadog check error rate for payment-service
\`\`\`
` };
