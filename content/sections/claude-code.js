SECTION_CONTENT['claude-code'] = { default: `
# Claude Code Deep Dive

## What is Claude Code?

Claude Code is an **agentic coding CLI** built by Anthropic. You run it in your terminal and it acts as a senior engineer with full access to your codebase — it reads files, runs commands, writes code, manages git, and iterates autonomously.

It's not an IDE plugin. It's a terminal agent.

\`\`\`bash
npm install -g @anthropic-ai/claude-code
cd your-project
claude
\`\`\`

---

## Architecture

\`\`\`
You (terminal)
    ↓ natural language task
Claude Code CLI
    ├── Reads CLAUDE.md (project instructions)
    ├── Reads relevant source files
    ├── Calls Claude API (Sonnet or Opus)
    │     ↓ tool calls
    ├── Executes tools:
    │   ├── Read / Write / Edit files
    │   ├── Bash commands (tests, linters, builds)
    │   ├── Git operations
    │   └── Web fetch
    ├── Loops until task complete
    └── Returns result + asks for next task
\`\`\`

The agent loop runs autonomously — you give it a task and it works through it, asking for clarification or permission only when needed.

---

## Context Handling

Claude Code is smart about what it reads:

1. **Auto-discovery:** Reads \`CLAUDE.md\` at the start of every session
2. **Lazy loading:** Only reads files relevant to the current task
3. **Git awareness:** Understands diffs, branches, commit history
4. **Import following:** If it reads \`auth.ts\` and it imports from \`utils/token.ts\`, it'll read that too

**Context budget management:**
- For large codebases, it summarizes rather than reading everything
- Uses \`/compact\` to compress context when it gets long
- Sub-agents (Task agents) handle parallel subtasks in separate context windows

---

## Codebase Understanding

Before writing code, Claude Code builds a mental model of your repo:

\`\`\`bash
# It reads:
CLAUDE.md              # your instructions
package.json           # dependencies, scripts
tsconfig.json          # TypeScript config
.eslintrc / eslint.config.js  # code style rules
README.md              # project overview

# Then reads relevant source files based on your task
\`\`\`

This is why a good \`CLAUDE.md\` dramatically improves output quality.

---

## Tool Usage

Claude Code has a rich set of built-in tools:

| Tool | What it does |
|---|---|
| \`Read\` | Read a file |
| \`Write\` | Create or overwrite a file |
| \`Edit\` | Make targeted edits (find/replace in file) |
| \`Bash\` | Run shell commands |
| \`Glob\` | Find files by pattern |
| \`Grep\` | Search file contents |
| \`WebFetch\` | Fetch a URL |
| \`Agent\` | Spawn a sub-agent for parallel work |

### Permission model

Claude Code asks before:
- Running bash commands that modify the system
- Writing to files outside the project directory
- Any network operations

You can approve individual actions or set blanket permissions in settings.

---

## Terminal Integration

Claude Code lives in your terminal and integrates naturally:

\`\`\`bash
# Interactive mode
claude

# One-shot mode
claude "fix all TypeScript errors"

# Pipe output
git diff | claude "summarize these changes"
cat error.log | claude "diagnose this error"

# With specific file context
claude "refactor this function to use async/await" --file src/auth.ts
\`\`\`

---

## Git Integration

Claude Code understands git deeply:

\`\`\`bash
# It can:
claude "what's changed in this branch vs main?"
claude "create a PR for these changes"
claude "resolve the merge conflict in src/auth.ts"
claude "write a commit message for these changes"
\`\`\`

Internally it uses:
- \`git diff\` to understand what changed
- \`git log\` for history context
- \`git blame\` to understand who wrote what
- Creates commits with descriptive messages

---

## CLAUDE.md — Your Most Important File

\`CLAUDE.md\` is read at the start of every session. It's your chance to give Claude Code the context a new team member would need.

**Template:**

\`\`\`markdown
# Project Name

## What this is
[2-3 sentences about what the project does]

## Tech stack
- Language/runtime version
- Key frameworks
- Database

## Project structure
src/api/       — REST API routes
src/services/  — Business logic
src/db/        — Database queries
tests/         — Unit and integration tests

## How to run
npm install
npm run dev       # starts dev server on :3000
npm test          # runs test suite
npm run lint      # ESLint check

## Conventions
- [list coding conventions that matter to you]
- [naming conventions]
- [where to put new files]

## Common tasks
- To add a new API endpoint: ...
- To add a new database table: ...
- To deploy: ...

## What NOT to do
- [anything Claude should avoid in this project]
\`\`\`

---

## Workflows

### Feature development
\`\`\`bash
claude "Add a password reset flow.
Users receive an email with a time-limited token.
Clicking it shows a form to set a new password.
Use our existing email service in src/services/email.ts"
\`\`\`

### Bug fixing
\`\`\`bash
claude "Users report login fails after 30 minutes.
JWT expiry is set to 1h. Find the bug."
\`\`\`

### Code review
\`\`\`bash
git diff main | claude "Review this diff for bugs, security issues, and style problems"
\`\`\`

### Refactoring
\`\`\`bash
claude "Refactor all callbacks in src/api/ to use async/await"
\`\`\`

---

## Slash Commands (Skills)

Built-in:
- \`/help\` — show available commands
- \`/compact\` — compress context to save tokens
- \`/clear\` — start fresh conversation
- \`/cost\` — show token usage for this session

Custom (your skills):
- Define in \`.claude/commands/*.md\`
- Invoke with \`/command-name\`

---

## The /loop Feature

\`/loop\` runs a skill on a recurring schedule — perfect for:

\`\`\`bash
# Run tests every 5 minutes and fix failures automatically
/loop 5m /fix-failing-tests

# Monitor PR and respond to review comments
/loop /babysit-pr

# Keep trying until CI passes
/loop /fix-ci
\`\`\`

The loop keeps running the skill until you stop it or a completion condition is met. This is how you turn Claude Code into a background agent that works autonomously while you do other things.
` };
