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

## Which Model to Pick (If You See a Choice)

Most apps quietly pick a good default for you — you don't have to think about this most of the time. But if you ever see a dropdown or a toggle, here's what it means in plain terms:

- **"Standard" / default model** — fast, and good for 90% of everyday things: emails, quick questions, planning, everyday writing.
- **"Thinking" / "Reasoning" mode** (sometimes a toggle, sometimes a model with a name like "o3" or a brain icon) — the AI slows down and reasons step-by-step before answering. Use it for a tricky decision with real stakes, multi-step math, or "am I missing something in this contract" type questions. It takes longer, so don't turn it on for "what's a good pasta recipe."
- **"Long document" mode** — if you're pasting in something huge (a whole book chapter, a full legal document), Claude tends to handle that best without losing track of the beginning by the time it reaches the end.

**Simple rule:** leave the default alone unless the question genuinely matters and deserves extra care — then switch to "Thinking" mode and expect to wait a little longer for a more carefully reasoned answer.

(GitHub Copilot is specifically for people who write code — if that's not you, you can ignore it entirely.)

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

## Using It Efficiently (So You Don't Burn Through Your Usage Limit)

Most apps have a monthly usage limit or a paid tier with credits. A few habits stretch that a lot further:

- **"Agent" or "Auto" features use a lot more than a normal question.** Some apps now let the AI go do multi-step things for you on its own — like researching across many sources or taking actions for you. That's genuinely useful, but it uses far more of your allowance than asking a normal question. Save it for things that actually need multiple steps; use regular chat for everyday questions.
- **Start a new conversation for a new topic.** Continuing one giant conversation across unrelated topics makes the AI drag old, irrelevant context into new answers — sometimes producing confused or wrong responses. A fresh chat per topic keeps answers sharper and often uses less of your allowance per question.
- **Ask for everything you need in one message instead of five small ones.** "Help me write an email" then "make it shorter" then "actually change the tone" then... — bundling your requirements into one clear ask up front gets you a usable answer faster and in fewer messages.

A simple template that helps with all of this:

\`\`\`
Before you answer, ask me anything you need to know first.
Then break your answer into clear steps, and check in with me
after each one instead of doing everything at once.
\`\`\`

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

## Which Model, When (and What "Auto" Means in Copilot)

GitHub Copilot's model picker usually has an **"Auto"** option — leave it there for most day-to-day coding. Auto watches what you're asking and picks a model for you: a fast, lightweight model for simple autocomplete while you type, and a stronger model when you ask Copilot Chat something that needs real reasoning (like "why is this function returning undefined"). You don't need to think about it for 90% of your work.

**When to override Auto and pick a specific model manually:**

| Situation | What to pick |
|---|---|
| Simple autocomplete, boilerplate, typing out a loop | Leave it on Auto |
| A bug you've been stuck on for 20+ minutes | Manually pick the strongest available model (often labeled something like GPT-4o, Claude Sonnet, or a "reasoning" model like o3-mini) |
| Learning a new language/framework and want a careful explanation | A stronger model — worth the extra second of wait |
| Rapid-fire simple questions, low stakes | A fast/cheap model — no need for the heavyweight option |

**Outside Copilot** (ChatGPT or Claude's browser chat), the same idea shows up as a toggle or a model name in a dropdown:

- **Default/fast model** (e.g. GPT-4o, Claude Sonnet) — everyday coding questions, explaining a concept, writing a function from a clear spec
- **Reasoning/"Thinking" mode** (e.g. o1/o3, Claude with extended thinking on) — a gnarly bug, an algorithm you need to get exactly right, or a design decision with real tradeoffs

**On "reasoning effort" (low / medium / high):** some tools let you dial this directly instead of just toggling it on or off. Higher effort means the model spends more invisible steps reasoning before it answers you — better on hard problems, but slower and sometimes billed by the extra reasoning it did.

- **Low/default:** everyday syntax questions, simple CRUD code, explaining what a function does
- **Medium:** typical debugging, "review my code," writing tests
- **High:** a bug that's resisted two rounds of debugging already, tricky algorithmic logic, anything where getting it wrong is expensive to discover later

**Rule of thumb for your stack:** if you're writing straightforward JavaScript, Python, or Java for typical CRUD apps, the default effort level handles it fine almost every time — most junior-level tasks simply don't need high reasoning effort. Save the "high" setting for the handful of times a week something is genuinely hard.

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

## Using AI Efficiently — Modes, Context, and Credits

### Ask / Plan / Agent mode — pick the cheapest one that answers your question

Most coding tools (Claude Code, Cursor, Copilot Chat) offer three modes, and picking the right one matters for both cost and getting things right the first time:

| Mode | What it does | Cost | Use when |
|---|---|---|---|
| **Ask** | Read-only — explains, answers, doesn't touch files | Cheapest | You're not sure yet what you want, or just need an explanation |
| **Plan** | Reads your code, proposes a plan/diff, doesn't execute | Cheap-ish | You know roughly what you want but want to check the approach first |
| **Agent** | Fully autonomous — reads, edits, runs commands, iterates until done | Most expensive | You're confident in the plan and want it actually built |

**Smart usage rule:** if you're not sure exactly what you want, start in Ask or Plan mode. Only switch to Agent mode once the plan looks right. This avoids paying for a full autonomous run that has to be scrapped because the starting direction was wrong — the single most common way people waste credits.

### Context size — give it what it needs, not everything

Pasting your whole project "just in case" wastes context budget and can actually make answers worse (the model has to sift through irrelevant stuff to find what matters). Instead:

- Paste only the file(s) actually relevant to your question
- Skip config files, lockfiles (\`package-lock.json\`), \`node_modules\`, and build output — these add tokens without adding understanding
- If your tool respects a \`.gitignore\`, keep it accurate — it's also what most AI coding tools use to decide what NOT to scan

### Batch related changes into one request

Instead of five small back-to-back asks, describe everything you need in one message: "Add a phone field to the User model, update the migration, add validation, and update the test." One well-scoped request is cheaper and faster than five small round trips.

### Start a new chat for a new task

Long conversations pile up old context, and old context can bleed into new answers in confusing ways. When you're done with one task and starting something unrelated, start a fresh conversation instead of continuing the same thread — it keeps answers focused and often uses fewer tokens per question.

### Commands That Save You Time and Credits (Claude Code)

If you're using Claude Code, these built-in commands directly control context size and cost:

| Command | What it does | Use it when |
|---|---|---|
| \`/compact\` | Compresses conversation history into a summary, freeing up context space | The session's been running a while and is getting long, but you want to keep going on the same task |
| \`/clear\` | Wipes the conversation completely, starts fresh | You're moving to a genuinely unrelated task — cheaper than compacting since nothing carries over |
| \`/fork\` | Branches the conversation from the current point, so you can try something different without losing the original thread | You're about to try something uncertain (an experimental refactor, an alternate approach) — fork first, and you can switch back to the pre-fork state instead of redoing the safe path if it doesn't work out |
| \`/cost\` | Shows token usage for the session so far | Periodically during a long session, and especially right before kicking off a big autonomous run — catch runaway spend early instead of after the bill |

**Rule of thumb:** \`/compact\` when the current task's context is getting heavy, \`/clear\` when you're switching tasks entirely, \`/fork\` before a risky experiment, \`/cost\` as a habit-check before anything that looks like it'll take a while.

### The Phased-Execution Prompt (the single best efficiency habit)

This is the highest-leverage prompt habit for working with Agent mode without wasting credits:

\`\`\`
Before you start, ask me any clarifying questions you need.
Break this task into clear phases. After each phase, give me a short
summary of what you did and wait for my confirmation before moving
to the next phase. Work on one phase at a time — do not start the
next one until I've confirmed the current one is correct.
\`\`\`

**Why this saves credits:** if the agent goes the wrong direction on phase 1 of 5, you catch it after ONE phase instead of after it's already built 4 more phases on a wrong foundation. Confirming each step means you only ever pay to redo the smallest possible unit of work — not the whole task.

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

**Build a multi-step feature without wasting a run:**
\`\`\`
I need [feature]. Before writing any code, ask me clarifying
questions about anything ambiguous. Then propose a plan broken into
phases. Once I confirm the plan, implement one phase at a time —
after each phase, summarize what changed and run the tests before
moving to the next phase.
\`\`\`

---

## Custom Instructions — A Preview

Once you're prompting the same way repeatedly, stop retyping it. Every tool has a way to save standing instructions:

- **ChatGPT / Claude:** Custom instructions in settings — "always answer in TypeScript, I'm a junior dev, explain your reasoning"
- **GitHub Copilot:** \`.github/copilot-instructions.md\` in your repo
- **Claude Code:** \`CLAUDE.md\` in your project root, plus custom slash commands in \`.claude/commands/\`
- **Cursor:** \`.cursorrules\`

This is covered in depth in the **Skills** and **Claude Code Deep Dive** sections — worth reading once you're comfortable with the basics above.

**One setup step worth doing early:** make sure your \`.gitignore\` (or your tool's equivalent ignore file) actually excludes \`node_modules/\`, lockfiles, build output, and \`.env\` files. Most AI coding tools respect it when deciding what to scan — an accurate ignore file means every request is cheaper and more focused, not just cleaner git history.

---

## The One-Sentence Takeaway

Match the tool to the moment (browser tab for questions, editor autocomplete for typing, Claude Code for autonomous multi-file work), start in Ask/Plan mode when you're unsure and save Agent mode for when the plan is confirmed, always paste the actual error and code instead of describing it from memory, and once a prompt becomes a habit, save it as a custom instruction instead of retyping it.
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

## Which Model — and What You're Actually Paying For

You don't need to personally fiddle with model settings day to day — but you need enough literacy to make sensible calls when your team asks for budget, or when you're deciding how much to trust an AI-assisted analysis.

**The one thing to understand:** every AI tool has a "default" mode and a "thinking harder" mode — sometimes called reasoning effort, extended thinking, or just a different named model (e.g. o1/o3 vs GPT-4o, or Claude with extended thinking on vs off). The "thinking harder" mode is slower and more expensive, but meaningfully more reliable on complex, high-stakes reasoning.

| Task | Recommended tier | Why |
|---|---|---|
| Quick drafting, routine synthesis, everyday Q&A | Default model | Fast, cheap, accurate enough |
| A decision with real financial or strategic stakes | Reasoning / "thinking" mode | Worth the extra cost and wait for a more carefully checked answer |
| Reviewing a long contract or due-diligence document | A long-context model (e.g. Claude) | Won't lose track of a clause buried on page 40 |
| Your team's automated pipeline (e.g. a support bot) | Whatever your engineers benchmark for that specific task | Cost scales with volume — the flagship model isn't automatically the right call for high-volume automated use |

**The governance question worth asking your team:** "Are we paying for premium reasoning tiers everywhere, or only where the stakes justify it?" Teams that default every request to the most expensive model burn budget on tasks a cheaper, faster model would have handled identically — model tier selection is one of the biggest cost levers, covered in more depth in the AI Engineering section.

**For your own use:** leave whatever the tool defaults to for routine work. Deliberately switch to the "thinking"/reasoning mode for anything where being wrong is genuinely costly — a board recommendation, a negotiation strategy, a make-or-break hire decision.

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

## A Cost Norm Worth Setting for Your Team

Coding tools (Claude Code, Cursor, Copilot) typically offer three modes with very different cost profiles: **Ask** (read-only, cheapest), **Plan** (proposes an approach without executing), and **Agent** (fully autonomous — reads, edits, runs commands until done). Agent mode is where most AI spend concentrates, because cost scales with how many steps a task takes — and multiplies further when the agent goes down a wrong path and has to backtrack.

**The norm worth instituting:** engineers confirm the plan (Ask or Plan mode) before handing ambiguous or high-blast-radius work to Agent mode, and break large tasks into confirmed phases rather than one long uninterrupted autonomous run. This is a process discipline question, not a tooling one — and it's the single biggest lever for controlling AI spend without restricting what your team is allowed to use.

A simple prompt pattern you can make a team norm:

\`\`\`
Before starting, ask clarifying questions on anything ambiguous.
Break the work into phases. After each phase, summarize what changed
and wait for confirmation before continuing.
\`\`\`

This bounds the cost of a wrong turn to one phase instead of an entire task — the same principle as a code review checkpoint, applied to AI-assisted work.

**Also worth asking your team:** is context being kept lean (only relevant files, config/lockfiles excluded), and are engineers starting fresh sessions per task rather than letting one conversation sprawl across unrelated work? Both are free to fix and meaningfully reduce token spend at scale — covered in more depth in the AI Engineering section's cost optimization content.

**Vocabulary worth knowing for these conversations:** tools like Claude Code have built-in commands for exactly this — \`/compact\` (shrink a long session instead of letting it bloat), \`/clear\` (full reset between unrelated tasks), \`/fork\` (branch before an uncertain change so a bad path can be abandoned for free), and \`/cost\` (check spend before a big run). You don't need to use these yourself, but knowing they exist means you can ask "are we actually using the cost controls the tools already give us?"

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

Treat the AI like a sharp chief of staff you haven't onboarded yet — give it your real constraints up front, ask for multiple options instead of one draft, have it critique its own work before you send anything to a real stakeholder, and make "confirm the plan before autonomous execution" a team norm, not just a nice-to-have.
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

## Model & Reasoning-Effort Selection, By Task

### Model tiers, mapped to real tasks

| Task | Model tier | Why |
|---|---|---|
| Autocomplete, boilerplate, simple CRUD | Haiku / GPT-4o mini / Gemini Flash | Fast, cheap, more than sufficient — don't pay flagship prices for trivial completions |
| Typical feature work, code review, refactors | Sonnet / GPT-4o | Best balance of quality and latency for daily development |
| Architecture decisions, hard algorithmic bugs, security-critical logic | Opus / o1 / o3 (reasoning-tier) | Meaningfully better on multi-step reasoning — worth the latency and cost when correctness matters |
| Whole-repo context, long document/spec review | Claude (200K context) or Gemini (1M context) | Context window is the limiting factor, not raw intelligence |

### Reasoning effort / extended thinking — the mechanism

Reasoning-tier models (o1/o3-class, or Claude/Gemini with extended thinking enabled) spend additional inference-time compute — internal reasoning steps — before producing a visible answer. Some APIs expose this directly as a \`reasoning_effort\` parameter (\`low\` / \`medium\` / \`high\`) or a thinking-token budget; others expose it as an on/off toggle or a separate model name entirely.

\`\`\`python
# Anthropic — thinking budget
response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=4096,
    thinking={"type": "enabled", "budget_tokens": 8000},  # more budget = deeper reasoning
    messages=[...]
)

# OpenAI-style reasoning_effort parameter
response = client.chat.completions.create(
    model="o3",
    reasoning_effort="high",  # low | medium | high
    messages=[...]
)
\`\`\`

**How to choose the effort level:**

| Effort | Use for | Cost/latency tradeoff |
|---|---|---|
| **Low** | Syntax questions, simple completions, well-specified boilerplate | Fastest, cheapest |
| **Medium** | Standard debugging, typical PR review, moderate refactors | Default for most day-to-day engineering work |
| **High** | Architecture tradeoffs, a bug that's survived two debugging rounds already, concurrency/race-condition analysis, anything security-critical | Slowest, most expensive — reserve for when the cost of being wrong exceeds the cost of the extra tokens |

### Mapping to your language and domain

Model quality isn't uniform across languages — training data is heavily skewed toward a handful of ecosystems:

- **Python, JavaScript/TypeScript, Java, Go:** extremely well represented — default effort and mid-tier models handle almost everything correctly
- **Rust:** strong but younger training corpus — bump reasoning effort for anything involving lifetimes, unsafe blocks, or complex trait bounds
- **C/C++ with manual memory management or concurrency:** favor higher reasoning effort and a stronger model — subtle memory/threading bugs are exactly where lower-effort models confidently produce plausible-but-wrong code
- **Niche/DSL/proprietary languages:** treat every model as a beginner in that language — ground it heavily with docs/examples regardless of tier or effort level, since no amount of "thinking harder" compensates for missing training exposure

### GitHub Copilot's "Auto" mode — what it's actually doing

Auto dynamically routes each request to a model judged suitable for that request's complexity — cheaper/faster models for routine completions, stronger models when the request looks like it needs more reasoning. It's a sensible default for interactive coding.

**When to pin a specific model instead of Auto:**
- **Reproducibility:** if you're running Copilot-driven automation in CI (e.g. an automated review bot), Auto's routing can change over time as the underlying weighting updates — pin an explicit model so behavior stays consistent across runs
- **Benchmarking:** if you're comparing model quality for a specific task, Auto's variability makes A/B comparison meaningless — pin models on both sides
- **Known-hard tasks:** if you already know a task needs the reasoning tier (see the effort table above), skip Auto's guesswork and pick it directly

---

## Working Efficiently — Modes, Context Budgeting, Session Hygiene

### Ask / Plan / Agent — cost profile of each

| Mode | What happens under the hood | Cost profile |
|---|---|---|
| **Ask** | Single inference call, no tool loop | Cheapest, bounded, zero runaway risk |
| **Plan** | Read + reason + propose a diff, no execution | A few inference calls, still bounded — no tool-call loop risk |
| **Agent** | Full ReAct loop: N tool calls × N inference calls | Cost scales with steps taken *and* multiplies further if it backtracks from a wrong turn |

An agent that goes down a wrong path for 8 steps before self-correcting costs roughly 8x a single well-scoped inference call — and that's before counting the wasted time reviewing and reverting the wrong output. **Use Ask/Plan to validate direction on ambiguous or high-blast-radius tasks before handing it to Agent mode.** The cost of one extra Plan-mode round trip is negligible next to the cost of a wrong 20-step Agent run.

### Context size budgeting

Treat the context window as a spend, not a free resource — every extra token costs latency and money on every single turn of a session, not just once:

- Use \`Read\`/\`Grep\`-style narrow tool calls or hand-pick relevant files instead of dumping the whole repo into context
- Exclude config/lockfiles, build artifacts (\`dist/\`, \`.next/\`, \`target/\`), and dependency directories (\`node_modules/\`, \`venv/\`) — most agent tools respect \`.gitignore\`-style excludes; make sure yours is accurate
- Compact or clear once a session gets long rather than letting it grow unbounded — a bloated context both costs more per call and degrades quality (the "lost in the middle" effect covered in Context Engineering)

### Batch edits into one request

Prefer "refactor these 6 related functions across these 3 files" over 6 separate single-function requests. Each separate invocation re-pays fixed overhead — re-establishing context, re-reading files, re-planning — that a single well-scoped batch request only pays once.

### New session per task — avoiding context-drift errors

Long single sessions accumulate stale context: an approach you abandoned, a bug already fixed, a decision that got reversed. Models can incorporate this stale context into new reasoning incorrectly — a form of hallucination driven by contradictory history rather than a knowledge gap. Starting a new session per distinct task keeps context clean, and is frequently cheaper than compacting a heavily bloated one.

### Commands that directly control cost (Claude Code)

| Command | What it does | Use it when |
|---|---|---|
| \`/compact\` | Compresses history into a summary in place | Session is getting long but you're continuing the same task |
| \`/clear\` | Full reset, no summary carried over | Moving to an unrelated task — cheaper than compacting since nothing carries forward |
| \`/fork\` | Branches from the current point in the conversation | About to try something uncertain (alternate library, risky refactor) — revert to the pre-fork state for free if it doesn't pan out, instead of re-doing the safe path |
| \`/cost\` | Shows token usage for the session | Before kicking off a large autonomous run, and periodically in long sessions — catch runaway spend before it happens, not after |

### The Phased-Execution Prompt

The single highest-leverage habit for keeping agentic sessions both cheap and reliable:

\`\`\`
Before starting, ask clarifying questions if the requirements are
ambiguous. Break the work into discrete phases. After completing
each phase: run tests/verification, give me a concise summary of
what changed, and wait for confirmation before starting the next
phase. Do not batch multiple phases into one uninterrupted run.
\`\`\`

This bounds the blast radius of a wrong turn to a single phase — you're never paying to unwind five compounded wrong assumptions at once, and you catch a bad direction after the cheapest possible unit of wasted work.

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

**Phased multi-step build (bounds the cost of a wrong turn):**
\`\`\`
I need [feature/system]. Before writing any code, ask clarifying
questions about anything ambiguous in the requirements. Propose a
plan broken into phases with clear boundaries. Once I confirm the
plan, implement one phase at a time — after each phase, run tests,
summarize what changed, and wait for my confirmation before
continuing to the next phase.
\`\`\`

---

## The One-Sentence Takeaway

Match the interaction mode to the task's shape (chat for one-offs, API for repeatable, agent for multi-step), validate direction in Ask/Plan mode before committing to an expensive autonomous Agent run, keep context lean and sessions fresh per task, structure prompts with explicit role/context/constraints/output-format instead of loose asks, and the moment a prompt becomes a habit, promote it to a skill so it stops depending on you remembering to type it well.
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

## Model & Reasoning-Effort Choice for Firmware Work

### When the stakes justify a stronger model and higher reasoning effort

| Task | Recommendation |
|---|---|
| Boilerplate driver skeleton, Yocto recipe scaffolding, doc lookups | Default/fast model, low reasoning effort — speed over depth |
| Register-level bit manipulation, timing-critical ISR code | Stronger model (Sonnet/Opus-tier), high reasoning effort — always still verify against the datasheet regardless of tier |
| A boot failure or kernel oops that's resisted a first pass | High reasoning effort — worth the wait for a more carefully reasoned root-cause hypothesis |
| Quick "what does this error code mean" lookups | Default effort — this is retrieval, not reasoning |

### Why language/domain matters more here than almost anywhere else

Generic model training data skews heavily toward web and application code. For firmware work specifically:

- **C** is well-represented — default effort handles typical driver code and RTOS tasks reasonably well
- **Assembly, vendor-specific SDKs, proprietary chip APIs** — treat the model as having little to no real exposure; no reasoning-effort setting compensates for this. Ground it with the actual SDK docs or datasheet excerpt every time, and don't trust register values without checking them yourself regardless of how confident the answer sounds
- **Real-time/concurrency-sensitive code (ISRs, RTOS task scheduling)** — bump reasoning effort here specifically; race conditions are exactly the class of bug where a model reasoning carefully step-by-step catches things a fast pass misses

### Local models — the same idea, different lever

If you're air-gapped and running local models (see the **Local Models** section), you don't get a cloud "reasoning effort" toggle — but the equivalent lever exists: a larger local model (e.g. Llama 3.3 70B vs an 8B variant) trades inference speed for more reliable reasoning, the same tradeoff as cloud reasoning-effort settings. Use the smaller/faster model for routine lookups and driver boilerplate, and the larger model for anything where a subtle logic error would be expensive to catch later — the same triage table above applies, just substituting "bigger local model" for "higher reasoning effort."

---

## Working Efficiently — Modes, Context, and Commands

**Ask/Plan before Agent, especially on hardware.** A wrong Agent-mode edit to a driver is worse to discover than a wrong chat answer — use Ask mode to sanity-check register values against the datasheet first, Plan mode to review a proposed change before it touches a file, and reserve Agent mode for once you're confident in the direction.

**Context size — don't paste the whole log or the whole SDK.** Extract just the relevant window from a boot log (\`grep -A 20 -B 5\` around the failure, not the full multi-thousand-line capture), and exclude vendor-generated headers, build artifacts, and boilerplate SDK scaffolding from what you paste — they burn context budget without adding signal, and the model already has generic exposure to common vendor SDK patterns even without seeing yours in full.

**Claude Code commands that matter for hardware sessions:**

| Command | Use it when |
|---|---|
| \`/compact\` | Mid-way through a long bring-up debugging session, still on the same board issue |
| \`/clear\` | Switching from one subsystem to a completely unrelated one (e.g. from I2C bring-up to build system debugging) |
| \`/fork\` | Before trying a register configuration you're not sure about — fork so you can revert cleanly if it's wrong, without losing the debugging context that got you there |
| \`/cost\` | Before kicking off a long autonomous log-analysis pass across many files |

**The phased-execution prompt, for driver/firmware changes specifically:**

\`\`\`
Before touching any file, propose the plan and the exact register
values/changes you intend to make, and wait for my confirmation.
Once confirmed, make the change, then stop and show me the diff
before we move to testing on hardware.
\`\`\`

This matters more here than in web development — an unconfirmed autonomous edit that's wrong doesn't just need a code revert, it can mean a bad flash to real hardware.

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

The tool matters less than the habit: always paste the actual serial log, device tree node, or datasheet excerpt instead of describing your hardware from memory, confirm the plan before letting Agent mode touch a file that talks to real hardware, and check your network/data-sensitivity policy before routing any of it through a cloud tool.
`

};
