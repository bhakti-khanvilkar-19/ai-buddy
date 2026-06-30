SECTION_CONTENT['coding-assistants'] = { default: `
# AI Coding Assistants

## The Landscape (2025)

AI coding assistants have evolved from autocomplete tools to full autonomous agents that can understand codebases, write features, fix bugs, and run tests.

| Tool | Best for | Model | Agentic? |
|---|---|---|---|
| **Claude Code** | Complex multi-file tasks, autonomous coding | Claude Sonnet/Opus | Yes — full agent |
| **GitHub Copilot** | IDE inline suggestions + Copilot Workspace | GPT-4o / Claude | Yes (Workspace) |
| **Cursor** | AI-first IDE, large codebase navigation | GPT-4o / Claude | Yes |
| **Windsurf** | Cascade agent, autonomous refactoring | Claude + GPT-4o | Yes |
| **ChatGPT** | General coding help, explanations | GPT-4o | Limited |
| **Gemini** | Google ecosystem, long context | Gemini 2.0 | Partial |
| **Continue.dev** | Open source, bring-your-own-model | Any model | Partial |

---

## Claude (claude.ai + API)

**What it is:** Anthropic's AI assistant. Can be used via web chat, API, or Claude Code CLI.

**Strengths:**
- Exceptional at long-context tasks (200K token window)
- Strong reasoning and nuanced understanding
- Honest about uncertainty — tells you when it doesn't know
- Great for architecture discussions, code reviews, complex debugging

**Use in coding:**
\`\`\`
# Via web chat (claude.ai)
Paste code → ask questions → iterate

# Via API
import anthropic
client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    messages=[{"role": "user", "content": "Review this Python function..."}]
)

# Via Claude Code CLI
claude  # starts interactive session in your terminal
\`\`\`

**Instructions in Claude:** Use the system prompt or \`CLAUDE.md\` file to set project context.

---

## Claude Code

**What it is:** An agentic CLI tool that runs Claude in your terminal with full access to your codebase.

**Strengths:**
- Reads your entire repo, not just what you paste
- Executes commands, runs tests, creates files
- Follows \`CLAUDE.md\` instructions for project context
- Supports skills via slash commands
- Manages git (diffs, commits, PRs)

**How to set it up:**

\`\`\`bash
# Install
npm install -g @anthropic-ai/claude-code

# Start in your project
cd my-project
claude

# Create project instructions
cat > CLAUDE.md << 'EOF'
# Project: my-project

## Stack
- Node.js 22, TypeScript 5.4
- PostgreSQL 16 (via Prisma ORM)
- React 18 + Vite

## Conventions
- All API routes in src/api/
- Tests use Vitest, files named *.test.ts
- Run tests: npm test
- Lint: npm run lint

## When adding a feature
1. Add types to src/types/
2. Add API route if needed
3. Add unit tests
4. Update README if public API changes
EOF
\`\`\`

**Creating skills in Claude Code:**
\`\`\`bash
mkdir -p .claude/commands

cat > .claude/commands/deploy.md << 'EOF'
Deploy to staging environment.

Steps:
1. Run npm test — abort if any tests fail
2. Run npm run build
3. Run docker build -t myapp:latest .
4. Push to registry: docker push registry.company.com/myapp:latest
5. Apply k8s manifests: kubectl apply -f k8s/staging/
6. Wait for rollout to complete
7. Run smoke tests: npm run test:smoke
8. Report: deployment status, pod count, smoke test results
EOF
\`\`\`

Invoke: \`/deploy\`

---

## GitHub Copilot

**What it is:** AI pair programmer integrated into IDEs. Has inline completions, chat, and Copilot Workspace (full agent mode).

**Strengths:**
- Deep IDE integration (VS Code, JetBrains, Visual Studio)
- Inline completions while you type
- Understands open files and recent edits
- Enterprise-grade (SOC2, data privacy controls)
- Copilot Workspace for autonomous multi-file tasks

**How to set instructions:**

\`\`\`markdown
# .github/copilot-instructions.md
# (applies to all Copilot interactions in this repo)

## Project: my-project
Node.js 22 + TypeScript + PostgreSQL

## Code style
- Prefer async/await over callbacks
- Use Zod for runtime validation at API boundaries
- All DB queries go through src/db/queries.ts (never raw SQL in routes)
- Error handling: use Result<T, E> pattern from src/utils/result.ts

## When writing tests
- Use Vitest
- Mock external services in tests/mocks/
- Integration tests go in tests/integration/

## Security rules
- Never log user PII
- Validate all inputs with Zod before processing
- Rate limit all public endpoints
\`\`\`

**Creating agent-like workflows in Copilot:**

\`\`\`
# VS Code Copilot Chat
@workspace /fix all TypeScript errors in src/api/
@workspace /explain the authentication flow
@workspace Create a CRUD API for the User model following our existing patterns

# Copilot Workspace (github.com → issue → "Open in Workspace")
→ Copilot creates a full implementation plan
→ You review and iterate on the plan
→ Copilot implements across multiple files
→ You review the PR
\`\`\`

---

## Cursor

**What it is:** An IDE built on VS Code with AI deeply integrated. Composer mode lets the AI edit multiple files simultaneously.

**Key feature: Cursor Rules (\`.cursorrules\` or \`.cursor/rules/\`)**

\`\`\`markdown
# .cursorrules

You are an expert TypeScript developer.

Rules:
- Always use TypeScript strict mode
- Prefer functional programming patterns
- Use Zod for validation, not joi or yup
- API responses always follow: { data: T | null, error: string | null }
- Never use \`any\` type — use \`unknown\` + type narrowing

When writing React:
- Functional components only
- useQuery for data fetching (TanStack Query)
- Zustand for global state
\`\`\`

---

## Windsurf

**What it is:** AI-first IDE from Codeium. The "Cascade" agent can autonomously make multi-file changes with context awareness.

**Key feature: Cascade flows** — pre-defined agentic workflows you can trigger for common tasks (add feature, refactor, fix bug, write tests).

---

## Choosing the Right Tool

| If you want... | Use |
|---|---|
| Autonomous agent that can do anything | Claude Code |
| IDE inline completions + enterprise security | GitHub Copilot |
| AI-native IDE replacing VS Code | Cursor or Windsurf |
| Free, open source, bring-your-own-model | Continue.dev |
| Quick one-off question / explanation | Claude.ai or ChatGPT |
| Google ecosystem / long context (1M) | Gemini |
` };
