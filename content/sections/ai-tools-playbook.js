SECTION_CONTENT['ai-tools-playbook'] = {

default: `
# AI Tools Playbook

## The Tools, In Brief

| Tool | Best at | Access |
|---|---|---|
| **ChatGPT** | General questions, broad plugin/ecosystem, quick everyday tasks | chatgpt.com, app |
| **Claude** | Long documents, careful reasoning, honest about uncertainty | claude.ai, app, API |
| **Gemini** | Google Workspace integration, very long context (1M tokens) | gemini.google.com |
| **GitHub Copilot** | Inline code suggestions while typing, in your editor | VS Code, JetBrains |

## Three Rules That Apply to All of Them

1. **Give it the situation, not just the question.** "Write me an email" gets a generic email. "Write me an email to my landlord about a broken heater, firm but polite, mention I've already asked twice" gets a usable one.
2. **Ask for the format you want.** "Give me 3 bullet points" or "under 100 words" or "as a table" — models follow explicit format instructions well.
3. **Keep talking to it.** The first answer is a draft. "Shorter." "Less formal." "Now explain it for someone who's never heard of this" all work.

## Three Templates to Start With

\`\`\`
Act as [a specific role]. Help me with [specific task] for [specific
situation/context]. The output should be [format: length, tone, structure].
\`\`\`

\`\`\`
Here's what I'm trying to decide: [decision]. Here are my options:
[option A], [option B]. Give me the honest tradeoffs of each, and
tell me what you'd want to know before choosing if you were me.
\`\`\`

\`\`\`
Review the following [document/code/plan] and tell me: what's strong,
what's missing, and what you'd change if you were being critical.

[paste content]
\`\`\`

Your specific track (see the persona-tailored version of this page) has templates built for exactly what you need day to day.
`,

// ─────────────────────────────────────────────────────────────
earthling: `
# AI Tools Playbook

## Meet the Assistants

Think of these as four different helpers, each with a specialty:

- **ChatGPT** — the generalist. Great for quick questions, writing help, and everyday tasks. The one most people have heard of.
- **Claude** — the careful reader. Best when you have a long document, contract, or article and need it actually understood, not skimmed. Also the most likely to say "I'm not sure" instead of guessing.
- **Gemini** — the Google-connected one. Handy if your life runs through Gmail, Docs, and Google Drive.
- **GitHub Copilot** — this one's for people writing code. It watches you type and finishes your sentences. Not for everyday non-coding tasks.

For almost everything in your daily life, **ChatGPT or Claude will do the job.** Don't overthink which one — pick one, use it for a week, and you'll develop a feel for it.

---

## How to Actually Talk to It

The single biggest upgrade: **stop asking like it's a search engine, start asking like it's a knowledgeable friend who needs context.**

❌ "Write a resignation letter."

✅ "Write a resignation letter for my job as a dental hygienist. I'm leaving on good terms after 3 years, giving 3 weeks notice, and want to thank my manager specifically for mentoring me."

Same request, wildly different quality of result. The extra sentence of context does more work than any clever trick.

**Second habit: keep the conversation going.** The first answer almost never nails it.

- "Shorter."
- "Less formal, more like how I'd actually talk."
- "Can you give me two versions — one direct, one softer?"

Treat it like editing with a collaborator, not a vending machine that gives one shot.

---

## Everyday Template Prompts

Copy these, fill in the brackets, and adjust:

**Write something for me:**
\`\`\`
Write a[n] [email/message/letter] to [who] about [what happened].
Tone: [firm but polite / warm / apologetic / professional].
Keep it under [X] sentences. Mention: [specific detail to include].
\`\`\`

**Plan something:**
\`\`\`
Plan a [X]-day trip to [place] for [who], in [month].
We like [interests], budget is around [$amount], and [any constraint —
mobility, dietary, avoid crowds, etc.]. Give me a day-by-day outline.
\`\`\`

**Explain something simply:**
\`\`\`
Explain [topic] to me like I'm smart but have never studied this.
Use a real-world analogy. Keep it under 200 words, then ask me if
I want more detail on any part.
\`\`\`

**Help me decide:**
\`\`\`
I'm deciding between [option A] and [option B] for [situation].
What would you want to know before deciding, if you were me?
Then give me your honest read on the tradeoffs.
\`\`\`

**Prep for a hard conversation:**
\`\`\`
I need to talk to [who] about [difficult topic]. Help me plan what
to say — I want to be [direct/kind/firm] without [being harsh/backing down].
Give me an opening line and 2-3 ways they might respond.
\`\`\`

**Summarize something long:**
\`\`\`
Summarize this in 5 bullet points, focusing on anything that requires
a decision or action from me:

[paste article/document/email thread]
\`\`\`

**Learn something new:**
\`\`\`
I want to learn the basics of [topic] over the next 30 days, spending
about [X] minutes a day. I have no background in this. Give me a
week-by-week plan with specific things to do, not just read about.
\`\`\`

---

## The One-Sentence Takeaway

Pick ChatGPT or Claude, tell it your actual situation instead of a bare question, keep refining the answer through conversation instead of accepting the first draft — that's 90% of getting genuinely useful results.
`,

// ─────────────────────────────────────────────────────────────
cadet: `
# AI Tools Playbook

## Choosing Your Daily Driver

You'll likely use more than one of these — they're not competitors so much as different tools for different moments:

| Tool | Use it for | Where it lives |
|---|---|---|
| **ChatGPT** | Quick "how does X work", debugging a small snippet, learning a new concept | Browser tab |
| **Claude** | Understanding a large file, careful refactors, anything where you want the model to double-check itself | Browser tab, or Claude Code in terminal |
| **GitHub Copilot** | Autocomplete while you're actively typing — finishing a function you've started | Inside your editor |
| **Cursor / Windsurf** | AI-native IDE — good if you want AI woven through your whole workflow | Replaces your editor |
| **Claude Code** | "Here's a task, go do it across my whole repo" — autonomous, multi-file, runs tests | Terminal |

**Rule of thumb for your first few months:** ChatGPT or Claude in a browser tab for questions and learning, Copilot in your editor for autocomplete. Add Claude Code once you're comfortable — it's the biggest leverage once you trust it with real tasks.

---

## The Habit That Changes Everything: Giving Real Context

The #1 mistake new developers make with AI tools: pasting the error message alone.

❌
\`\`\`
TypeError: Cannot read property 'map' of undefined
\`\`\`

✅
\`\`\`
I'm getting this error in my React component:
TypeError: Cannot read property 'map' of undefined

Here's the component:
[paste the component]

Here's the data I'm passing in — I think it's coming back as undefined
on first render before the API call resolves:
[paste the relevant fetch/state code]
\`\`\`

The second version gets you an actual fix in one shot. The first gets you a generic guess.

**Always include:** the error, the relevant code (not the whole file if you can help it), and what you were expecting to happen.

---

## Coding Template Prompts

**Explain an error:**
\`\`\`
I'm getting this error: [paste error].
Here's the relevant code: [paste code].
Explain what's causing it and give me the fix, not just the theory.
\`\`\`

**Review your code before a PR:**
\`\`\`
Review this code for bugs, edge cases I might have missed, and
anything that would bother a senior reviewer. Be specific — file
and line if you can.

[paste diff or file]
\`\`\`

**Write tests:**
\`\`\`
Write unit tests for this function using [Jest/Vitest/pytest].
Cover the happy path plus these edge cases: [list them, e.g. empty
input, null, very large input].

[paste function]
\`\`\`

**Refactor without breaking behavior:**
\`\`\`
Refactor this function to be more readable / use async-await instead
of callbacks / follow [pattern]. Don't change the behavior — if
you're unsure whether something is intentional, ask me first.

[paste function]
\`\`\`

**Generate from a spec:**
\`\`\`
Write a [language] function that [does X]. Input: [describe]. Output:
[describe]. Handle these edge cases: [list]. Include a docstring.
\`\`\`

**Compare two approaches:**
\`\`\`
I'm choosing between [approach A] and [approach B] for [problem].
Give me the tradeoffs specifically for my situation: [context — team
size, scale, timeline].
\`\`\`

**Write a good commit message:**
\`\`\`
Write a commit message for this diff. Focus on WHY the change was
made, not just what changed.

[paste git diff]
\`\`\`

**Understand unfamiliar code:**
\`\`\`
I've never seen this file before and need to modify it. Walk me
through what it does, section by section, and flag anything that
looks fragile or easy to break.

[paste file]
\`\`\`

---

## Custom Instructions — A Preview

Once you're prompting the same way repeatedly, stop retyping it. Every tool has a way to save standing instructions:

- **ChatGPT / Claude:** Custom instructions in settings — "always answer in TypeScript, I'm a junior dev, explain your reasoning"
- **GitHub Copilot:** \`.github/copilot-instructions.md\` in your repo
- **Claude Code:** \`CLAUDE.md\` in your project root, plus custom slash commands in \`.claude/commands/\`
- **Cursor:** \`.cursorrules\`

This is covered in depth in the **Skills** and **Claude Code Deep Dive** sections — worth reading once you're comfortable with the basics above.

---

## The One-Sentence Takeaway

Match the tool to the moment (browser tab for questions, editor autocomplete for typing, Claude Code for autonomous multi-file work), always paste the actual error and code instead of describing it from memory, and once a prompt becomes a habit, save it as a custom instruction instead of retyping it.
`,

// ─────────────────────────────────────────────────────────────
commander: `
# AI Tools Playbook

## Which Tool for Which Leadership Task

\`\`\`mermaid
flowchart TD
    A{What's the task?} -->|Draft comms, quick synthesis| B[ChatGPT or Claude]
    A -->|Long document: contract, report, RFP| C[Claude — 200K token context]
    A -->|Google Workspace-heavy org| D[Gemini]
    A -->|Evaluating a coding tool for your team| E[See Coding Assistants section]
\`\`\`

For most leadership tasks — drafting communications, synthesizing reports, prepping for meetings — **ChatGPT and Claude are functionally interchangeable.** Claude has an edge on very long documents (200K token context handles a full contract or a quarter's worth of reports in one go) and tends to flag its own uncertainty rather than bluff — useful when you're using the output to make a real decision.

---

## Prompting Like an Executive

The instinct to write a short, vague prompt because you're busy backfires — you get a generic answer and have to iterate anyway, which costs more time than writing the context up front.

**Three habits that consistently produce better output:**

**1. Give it your actual constraints, not just the task.**
❌ "Write a project update."
✅ "Write a project update for my VP of Eng. The project is 2 weeks behind due to a vendor delay, not our team's fault. I need to convey confidence without minimizing the delay. Keep it to 150 words."

**2. Ask for options, not one answer.**
"Give me three different framings for this announcement — one direct, one more diplomatic, one that leads with the positive" gets you choices to pick from, rather than one draft to accept or fully rewrite.

**3. Ask it to red-team its own output.**
"Now critique what you just wrote as if you were a skeptical board member — what's the weakest part?" catches gaps before a real stakeholder does.

---

## Leadership Template Prompts

**Stakeholder update:**
\`\`\`
Draft a status update for [audience] on [project]. Current state:
[on track / at risk / delayed — why]. Tone: confident but honest.
Length: [X] words. End with a clear ask or next step, not just status.
\`\`\`

**Project brief:**
\`\`\`
Write a one-page project brief for [initiative]. Include: problem
statement, why now, success criteria, key risks, and what we're
explicitly NOT doing. Audience: [execs / cross-functional team].
\`\`\`

**Compare vendor or tool proposals:**
\`\`\`
Compare these two proposals for [need]. I want: cost breakdown,
risk comparison, and a recommendation with the reasoning explicit
enough that I can defend it in a review.

[paste proposal A]
[paste proposal B]
\`\`\`

**Prep for a difficult 1:1:**
\`\`\`
I need to have a hard conversation with a direct report about
[performance issue / behavior]. Help me plan: an opening that's
direct but not harsh, 2-3 likely reactions and how to respond,
and what a good outcome looks like.
\`\`\`

**Pre-mortem a plan:**
\`\`\`
Here's our plan for [initiative]: [paste plan]. Assume it failed in
6 months. Work backward — what are the 5 most likely reasons, ranked
by probability, and what would we watch for as early warning signs?
\`\`\`

**Summarize a long document into decisions:**
\`\`\`
Summarize this into exactly 5 bullets, each one either a decision
that needs to be made or a risk that needs attention. Skip anything
that's just informational.

[paste document]
\`\`\`

**Draft a job description:**
\`\`\`
Write a job description for [role]. Level: [IC/manager, seniority].
Must-haves: [list]. Nice-to-haves: [list]. Avoid generic corporate
language — write it like a hiring manager who actually knows the role.
\`\`\`

**Turn messy notes into a decision doc:**
\`\`\`
Turn these meeting notes into a clear decision document: what was
decided, who owns what, and by when. Flag anything that was discussed
but NOT actually decided.

[paste notes]
\`\`\`

---

## The One-Sentence Takeaway

Treat the AI like a sharp chief of staff you haven't onboarded yet — give it your real constraints up front, ask for multiple options instead of one draft, and have it critique its own work before you send anything to a real stakeholder.
`,

// ─────────────────────────────────────────────────────────────
engineer: `
# AI Tools Playbook

## Chat UI vs API vs Claude Code — A Decision Framework

\`\`\`mermaid
flowchart TD
    A{Is this a one-off task?} -->|Yes| B[Chat UI — ChatGPT/Claude]
    A -->|No, repeatable| C{Does it need to touch your codebase/tools?}
    C -->|No — same prompt shape, different inputs| D[API call with fixed system prompt]
    C -->|Yes — read files, run commands, multi-step| E[Claude Code / agent]
    D --> F{Doing this 3+ times a week?}
    F -->|Yes| G[Turn it into a skill/slash command]
\`\`\`

The mistake senior engineers avoid: treating every AI interaction as a chat conversation. If you're running the same prompt shape repeatedly, that's a signal to move down this decision tree — into an API call, then into a skill.

---

## Anatomy of a Production-Grade Prompt

The difference between a hobbyist prompt and one that reliably produces usable output at work:

\`\`\`
[ROLE]      You are a senior [X] engineer specializing in [Y].
[CONTEXT]   Here's the relevant code/system/constraint: [paste]
[TASK]      Specifically: [precise task, not "help me with this"]
[CONSTRAINTS] Must not: [hard constraints]. Must: [requirements].
[OUTPUT]    Format: [exact structure you want back — JSON schema,
            markdown sections, code + explanation, etc.]
[EDGE CASES] Consider: [things that commonly break — concurrency,
             null inputs, scale, backward compatibility]
\`\`\`

Compare a hobbyist ask ("fix this bug") to a production one: role, context, exact constraints, and required output format all narrow the solution space before the model starts generating — which is exactly why it produces something you can actually use without three rounds of "no, not like that."

---

## When to Turn a Prompt into a Skill

If you catch yourself typing a similar prompt shape for the third time this week, stop and formalize it. This is exactly what's covered in depth in the **Skills** and **Claude Code Deep Dive** sections — the short version:

\`\`\`bash
# .claude/commands/security-review.md
Review the current diff for security issues.
Check specifically for: injection, hardcoded secrets, missing auth
checks, and unvalidated input at trust boundaries.
Report as: [Severity] file:line — issue — suggested fix.
\`\`\`

Invoke with \`/security-review\` from then on — no re-typing, no drift in what "good" looks like between team members using the same skill.

---

## Advanced Template Prompts

**Architecture review:**
\`\`\`
Review this architecture for [system]. Evaluate: scalability to
[target scale], single points of failure, and operational complexity.
I want specific concerns, not general praise.

[paste architecture description/diagram]
\`\`\`

**Root-cause debugging with structured output:**
\`\`\`
Debug this issue: [symptom]. Here's the relevant context: [logs/code/
metrics]. Respond in this format:
1. Most likely root cause (with confidence: high/medium/low)
2. Evidence supporting it
3. How to confirm
4. Fix
5. Alternative causes if the above is wrong
\`\`\`

**Generate eval test cases for a prompt:**
\`\`\`
I have this system prompt for a production feature: [paste].
Generate 15 test cases that would catch regressions — include
edge cases, adversarial inputs, and cases where the "obviously
correct" answer is actually ambiguous.
\`\`\`

**Write a custom skill/slash command definition:**
\`\`\`
I keep asking for [repeated task]. Turn this into a Claude Code
skill definition: a clear name, one-line description for when to
invoke it, and a numbered list of steps it should follow.
\`\`\`

**Generate an ADR (Architecture Decision Record):**
\`\`\`
Write an ADR for this decision: [decision]. Context: [why this came
up]. Options considered: [A, B, C]. Write it in standard ADR format:
Status, Context, Decision, Consequences.
\`\`\`

**Security review request:**
\`\`\`
Security review this code, specifically for [OWASP category / your
threat model]. For each issue: severity, exploit scenario, and fix.
Don't flag purely stylistic issues.

[paste code]
\`\`\`

**Performance profiling request:**
\`\`\`
This function/query is slow at [scale]. Here's the profiling data:
[paste]. Identify the bottleneck, explain why it's slow at this scale
specifically, and give me a fix with the expected improvement.
\`\`\`

**Critic pass on your own draft:**
\`\`\`
I wrote this: [paste your own draft/code/doc]. Review it as if you
were a skeptical senior engineer seeing it for the first time. Don't
be nice — find the actual problems.
\`\`\`

---

## The One-Sentence Takeaway

Match the interaction mode to the task's shape (chat for one-offs, API for repeatable, agent for multi-step), structure prompts with explicit role/context/constraints/output-format instead of loose asks, and the moment a prompt becomes a habit, promote it to a skill so it stops depending on you remembering to type it well.
`,

// ─────────────────────────────────────────────────────────────
embedded: `
# AI Tools Playbook

## Grounding Beats Tool Choice

For firmware and hardware work, which chat tool you pick matters far less than whether you **ground it in your actual system.** A generic question to any tool produces a generic, often-wrong answer. The same question with your serial log, device tree node, or datasheet excerpt pasted in produces something actually usable.

\`\`\`
Bad:  "Why won't my I2C sensor initialize?"
Good: "Why won't my I2C sensor initialize? Here's the dmesg output
      [paste], the device tree node [paste], and the relevant
      register section from the datasheet [paste]."
\`\`\`

This matters more here than in almost any other domain, because generic AI training data skews toward web/app development — it has comparatively little exposure to your specific SoC's quirks.

---

## Chat UI vs Local/Air-Gapped Models

| Situation | Use |
|---|---|
| Standard dev laptop, internet allowed | ChatGPT or Claude in browser — fine for research, log analysis, driver skeletons |
| Corporate network, proprietary but not classified | Cloud API through an approved proxy — check with IT first |
| Isolated lab network, no internet | Local model via Ollama (see **Local Models** section) |
| Classified/ITAR/fully air-gapped | Local model only, weights transferred via approved media |

See the **AI in Secure Environments** section for the full decision framework — the short version: check your network policy before you architect a workflow around any cloud tool.

---

## Hardware Template Prompts

**Diagnose a boot failure:**
\`\`\`
Board hangs after [where it hangs, e.g. "Starting kernel..."].
Here's the serial console output from the last successful checkpoint
through the hang: [paste]. Target: [SoC/board]. What's the likely
cause and what should I check next?
\`\`\`

**Explain a register given a datasheet excerpt:**
\`\`\`
Explain what this register configuration does, given this datasheet
section: [paste relevant register map/bit description].
Register value I'm setting: [value]. Is this correct for [goal,
e.g. "400kHz I2C with 25ms clock stretching"]?
\`\`\`

**Generate a driver skeleton:**
\`\`\`
Write a Linux platform driver skeleton for [device type] using
kernel [version] API conventions. Compatible string:
'[vendor,device]'. Expose [readings/controls] via [sysfs/char device].
I'll ground the register-level logic myself against the datasheet.
\`\`\`

**Review an ISR for race conditions:**
\`\`\`
Review this interrupt service routine for race conditions, reentrancy
issues, and anything that shouldn't run in interrupt context.
Target: [MCU/RTOS]. Flag anything that needs a mutex/critical section.

[paste ISR code]
\`\`\`

**Explain a kernel oops:**
\`\`\`
Explain this kernel oops/panic and identify the likely faulting
function and root cause. Target: [architecture]. I can provide the
vmlinux for addr2line if the stack trace needs decoding.

[paste oops output]
\`\`\`

**Compare hardware options against a requirement:**
\`\`\`
Compare [MCU/SoC A] vs [MCU/SoC B] for this requirement: [power
budget, peripheral needs, real-time constraints, cost target].
Give me the tradeoffs specific to my constraints, not a generic
feature comparison.
\`\`\`

---

## The One-Sentence Takeaway

The tool matters less than the habit: always paste the actual serial log, device tree node, or datasheet excerpt instead of describing your hardware from memory, and check your network/data-sensitivity policy before routing any of it through a cloud tool.
`

};
