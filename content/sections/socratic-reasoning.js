SECTION_CONTENT['socratic-reasoning'] = { default: `
# Socratic AI Reasoning

## What is Socratic Reasoning?

Socratic reasoning is a method of inquiry through questioning — instead of giving answers, you guide discovery through a series of probing questions that expose assumptions, clarify thinking, and lead to deeper understanding.

Applied to AI: you prompt the model to ask questions and reason through problems step-by-step, rather than jumping to conclusions.

---

## Socratic Questioning with AI

### Using AI as a Socratic partner (ask it to question you)

\`\`\`
Act as a Socratic tutor helping me think through this architecture decision:
"Should we use a monolith or microservices for our new product?"

Don't give me your opinion yet. Instead, ask me a series of questions
one at a time to help me clarify my thinking and expose my assumptions.
Start with the most fundamental question.
\`\`\`

The model will ask things like:
- "What's the team size and how experienced are they with distributed systems?"
- "What are your scalability requirements in the next 6 months vs 2 years?"
- "Have you identified specific components that would need independent scaling?"

This forces you to confront what you actually know vs. what you're assuming.

---

## Guided Discovery

For learning complex topics, Socratic guided discovery is more effective than just reading:

\`\`\`
I want to understand how transformers work.
Don't explain it to me directly. Instead, guide me to discover it myself.
Ask me what I already know about neural networks, then build from there
with questions that help me reason toward the key concepts.
\`\`\`

This activates active thinking instead of passive reading, and the model can adapt to your actual level of understanding.

---

## Root Cause Analysis

The Socratic method is perfect for debugging and root cause analysis — it prevents jumping to conclusions.

\`\`\`
System: You are a debugging partner. When presented with a problem,
don't immediately suggest fixes. Instead, ask questions to help the
developer identify the root cause themselves. One question at a time.

User: My API is returning 500 errors intermittently.
\`\`\`

Model response pattern:
- "What pattern do you see in the timing of the errors?"
- "Is there anything in common about the requests that fail?"
- "What does the error log say specifically?"
- "When did the errors start — was there a recent deployment?"

This structured inquiry is more effective than random debugging.

---

## The 5-Why Framework

Ask "why?" five times to get from symptom to root cause.

\`\`\`
Use the 5-Why framework to find the root cause of this problem:
"Our mobile app is losing users after the first session."

Start with Why #1 and wait for me to answer each question.
Use my answers to guide the next "why."
\`\`\`

\`\`\`
Why #1: Why do users not return after the first session?
→ "Because they don't see value quickly enough"

Why #2: Why don't they see value quickly?
→ "Because onboarding takes too long"

Why #3: Why does onboarding take too long?
→ "Because we require email verification before showing any features"

Why #4: Why do we require email verification upfront?
→ "Because our PM added it to reduce spam accounts 2 years ago"

Why #5: Why do we still require it if it's hurting retention?
→ "We never measured the retention impact — we assumed it was worth it"

Root cause: An unmeasured assumption is causing measurable user loss.
Fix: A/B test deferred email verification.
\`\`\`

---

## Debugging Applications

The Socratic approach to debugging complex issues:

\`\`\`
I have a bug I can't figure out. Help me reason through it Socratically.
Instead of suggesting fixes, ask me questions to help me narrow down
the problem space. Start by asking about the symptoms.

Bug: The login flow sometimes redirects users to the wrong page after authentication.
\`\`\`

Effective question sequence:
1. "How often does this happen? 1 in 10 users? 1 in 1000?"
2. "Is there a pattern in which users are affected? New vs returning?"
3. "Does it happen more at certain times of day?"
4. "What page are they being redirected to incorrectly?"
5. "Is there a redirect URL stored somewhere before authentication starts?"

Usually by question 4 or 5, the developer has found the bug themselves — the \`redirect_url\` param is being cached and isn't cleared on auth failure.

---

## Architecture Reviews

Use Socratic questioning to stress-test an architecture before building it:

\`\`\`
I'm going to describe an architecture. Your job is to ask hard questions
about assumptions, failure modes, and edge cases — not to validate it.
Be skeptical. One question at a time.

Architecture: We'll use a single PostgreSQL database to store all data
for our multi-tenant SaaS app, with row-level security for tenant isolation.
\`\`\`

Good questions the model should ask:
- "What happens when a single large tenant starts affecting performance for all tenants?"
- "How will you handle a tenant wanting their data exported to their own database?"
- "What's your migration path if this approach hits limits at 1000 tenants?"
- "How do you verify row-level security is actually preventing cross-tenant data access?"

These questions surface assumptions the architect hadn't considered.
` };
