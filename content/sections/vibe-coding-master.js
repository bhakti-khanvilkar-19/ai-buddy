SECTION_CONTENT['vibe-coding-master'] = { default: `
# Vibe Coding Masterclass

## Human-in-the-Loop Development

The most effective vibe coding isn't "set and forget" — it's a fast loop between human intent and AI execution.

\`\`\`
You: "I want a login form with email + password"
AI: [builds it]
You: [review it, try it, spot UX issue]
You: "The error message shows before the user has typed anything — only show it after they've touched the field"
AI: [fixes validation timing]
You: [test edge cases]
You: "What happens if someone submits with a disposable email address?"
AI: [adds disposable email detection]
You: [ship it]
\`\`\`

The human provides: intent, review, domain knowledge, edge case intuition.
The AI provides: implementation, boilerplate, consistency.

---

## Rapid Prototyping

Vibe coding excels at prototyping. The goal is learning fast, not writing perfect code.

**The 1-hour prototype:**
1. Describe the core user flow in 2-3 sentences
2. Ask AI to build the minimum that demonstrates the idea
3. Use it yourself for 5 minutes
4. Identify the 3 most important things to fix
5. Fix them
6. Show it to someone else

The code quality doesn't matter for a prototype. You're buying learning, not building production software.

**When to rebuild:** Once a prototype is validated, rebuild it properly. The prototype's job is to teach you what to build. The production code's job is to be reliable and maintainable.

---

## Vibe Coding vs Professional Engineering

| | Vibe Coding | Professional Engineering |
|---|---|---|
| **Goal** | Ship fast, learn fast | Build reliably, maintain long-term |
| **Code quality** | Good enough | Production grade |
| **Testing** | Manual, happy path | Automated, edge cases |
| **Security** | Basic | Hardened |
| **Documentation** | Minimal | Maintained |
| **Good for** | Prototypes, internal tools, solo projects | Customer-facing, critical systems |

These aren't mutually exclusive — many engineers use vibe coding to prototype, then build properly.

---

## Hallucinated Code Risks

### Common hallucination patterns

**Non-existent APIs:**
\`\`\`python
# AI writes this confidently:
from anthropic import AnthropicBatch  # This class doesn't exist
client = AnthropicBatch()
\`\`\`

**Wrong method signatures:**
\`\`\`python
# Real API:
client.messages.create(model="claude-sonnet-4-6", ...)
# AI sometimes writes:
client.complete(model="claude-sonnet-4-6", ...)  # Wrong method
\`\`\`

**Outdated patterns:**
The AI's training data has a cutoff. APIs change. Library versions change. Always check the actual current documentation.

### Mitigation
- Run the code and read error messages carefully
- Check API documentation when something "feels off"
- Ask the AI: "Are you sure this API exists? Double-check."
- Use TypeScript — type errors catch many hallucinations at compile time

---

## Security Issues

AI-generated code has predictable security anti-patterns:

**SQL Injection:**
\`\`\`python
# AI often writes this:
query = f"SELECT * FROM users WHERE email = '{email}'"  # DANGEROUS

# Should be:
query = "SELECT * FROM users WHERE email = %s"
cursor.execute(query, (email,))
\`\`\`

**Hardcoded secrets:**
\`\`\`python
# AI sometimes writes:
API_KEY = "sk-ant-abc123"  # NEVER do this

# Should be:
API_KEY = os.getenv("ANTHROPIC_API_KEY")
\`\`\`

**Missing input validation:**
\`\`\`python
# AI often skips validation:
@app.post("/user")
def create_user(data: dict):
    db.insert("users", data)  # No validation!

# Should validate with Pydantic/Zod before touching the DB
\`\`\`

**Standard practice:** After AI generates backend code, specifically ask it: "Review this code for SQL injection, XSS, hardcoded secrets, and missing input validation."

---

## Technical Debt

Vibe coding accumulates technical debt fast:

- Functions that do too many things
- No clear separation of concerns
- Inconsistent naming across files
- Duplicate code that AI regenerated slightly differently
- Missing error handling
- No tests

**Managing debt in vibe coding projects:**

1. **Periodic refactor sessions:** Every 2 weeks, ask the AI to "review the entire codebase for code quality, duplication, and structural issues"

2. **Architecture rules up front:** Put them in CLAUDE.md / .cursorrules:
\`\`\`
Architecture rules:
- All database queries in /db/queries.ts — never raw SQL elsewhere
- All API calls in /api/client.ts — never fetch() directly in components
- Business logic in /services/ — not in routes or components
\`\`\`

3. **Test as you go:** Ask AI to write tests for each feature before moving to the next

---

## Enterprise Guidelines

For companies adopting AI-assisted coding:

**What's appropriate for vibe coding:**
- Internal tooling
- Prototypes and POCs
- Automation scripts
- Developer productivity tools
- Non-critical features on existing platforms

**Requires additional review:**
- Authentication and authorization code
- Payment processing
- Data handling (PII, HIPAA, GDPR)
- Security-critical functionality

**Not appropriate for vibe coding alone:**
- Safety-critical systems
- Regulatory compliance code
- Core cryptographic implementation

**Policy recommendations:**
1. All AI-generated code must pass the same review process as human-written code
2. Security-sensitive code requires explicit security review
3. AI tools must be approved and data handling reviewed for compliance
4. Engineers are responsible for code they ship, regardless of who wrote it
`,
earthling: `
# Vibe Coding Masterclass

## Going from Dabbler to Confident Builder

You know what vibe coding is — describing software in plain English and letting AI build it. This section is about doing it *well*: the habits that separate people who ship things they're proud of from people whose projects collapse in week two.

---

## Habit 1: Stay in the Loop

The best vibe coders never say "build my whole idea" and walk away. They work like someone directing a home renovation:

- Ask for one room at a time, not the whole house
- Walk through after each step and actually *look*
- Give specific feedback: "the sign-up button is confusing" beats "make it better"
- Catch problems while they're small

The rhythm is: **ask → look → adjust → repeat.** Twenty small rounds beat one giant request, every time.

---

## Habit 2: Prototype First, Polish Later

Your first version's job is *not* to be good — it's to teach you what you actually want.

Build the roughest version that lets you try the idea. Use it for a day. You'll immediately discover things you never would have thought to ask for ("oh, I need this sorted by date, not name"). *Then* rebuild it properly.

Professionals call the first version a "prototype" and they throw it away without guilt. You should too.

---

## Habit 3: Learn the AI's Failure Patterns

AI-built software fails in predictable ways. Knowing them makes you a sharper inspector:

**It invents things.** Sometimes the AI confidently uses a feature or service that doesn't exist — like a contractor spec'ing a brand of window that was discontinued years ago. If something never works no matter what, this might be why. Ask the AI directly: "Are you certain this exists? Double-check."

**It forgets your rules.** Tell it once that you want everything in French, and five requests later it may slip back to English. Repeat important rules; better yet, restate them at the start of a new session.

**It leaves doors unlocked.** Security is the AI's most consistent weak spot. Anything involving passwords, payments, or personal data needs a professional check — no exceptions.

---

## Habit 4: Manage the Mess

Every project accumulates clutter — quick fixes, half-finished ideas, duplicated bits. Vibe-coded projects accumulate it *faster*.

Once in a while, do spring cleaning: tell the AI, "Review this whole project. What's messy, duplicated, or fragile? Clean it up carefully without changing how anything works."

Like an actual house, a tidy project is easier to extend and harder to break.

---

## When Vibe Coding Is (and Isn't) Appropriate

**Great fit:** personal tools, hobby projects, club websites, prototypes, internal helpers for your small business.

**Fine with care:** simple public websites, small tools others use — as long as no sensitive data is involved.

**Get professionals involved:** anything handling payments, health records, or private personal data; anything where a failure hurts someone other than you.

A good gut-check: *"If this breaks or leaks, who gets hurt?"* If the answer is anyone besides you, raise your standards accordingly.

---

## The One-Sentence Takeaway

Master vibe coders work in small steps, inspect everything, expect the AI's classic mistakes, tidy up regularly — and are honest about when a project has outgrown vibes and needs a professional.
` };
