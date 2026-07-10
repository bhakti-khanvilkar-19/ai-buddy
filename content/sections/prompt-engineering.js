SECTION_CONTENT['prompt-engineering'] = { default: `
# Prompt Engineering

## What is Prompt Engineering?

Prompt engineering is the practice of **designing inputs to LLMs to reliably produce desired outputs**. It's part art, part science — understanding how models interpret text and crafting prompts that guide them to the right behavior.

Good prompt engineering can mean the difference between a model that's barely useful and one that replaces a skilled professional.

---

## Zero-Shot Prompting

Ask the model to do something with no examples. Relies entirely on the model's pretrained knowledge.

\`\`\`
Classify the sentiment of this review as Positive, Negative, or Neutral:

"The product arrived late but the quality exceeded my expectations."
\`\`\`

**When to use:** Simple, well-defined tasks where the model clearly understands what's needed.

---

## One-Shot Prompting

Provide one example before your request. The model learns the pattern from the example.

\`\`\`
Convert the product description to a JSON object.

Example:
Input: "Blue cotton t-shirt, size M, $24.99"
Output: {"color": "blue", "material": "cotton", "type": "t-shirt", "size": "M", "price": 24.99}

Now convert:
Input: "Red leather wallet, compact size, $89.00"
Output:
\`\`\`

---

## Few-Shot Prompting

Provide multiple examples. More examples = the model has a clearer picture of the pattern. Usually 3-5 examples is the sweet spot.

\`\`\`
Translate English customer messages to formal Spanish.

English: "Hey, my order is messed up"
Spanish: "Estimado equipo de soporte, he tenido un problema con mi pedido."

English: "When's my stuff arriving?"
Spanish: "¿Podría indicarme la fecha estimada de llegada de mi pedido?"

English: "This is broken, I want my money back"
Spanish:
\`\`\`

**Key insight:** Few-shot examples define the format, tone, and style of the output — they're more powerful than describing the format in words.

---

## Chain of Thought (CoT)

Ask the model to reason step-by-step before giving the final answer. Dramatically improves performance on math, logic, and multi-step problems.

\`\`\`
Q: A store has 120 items. 30% are returned. Of the returned items,
   half are restocked and half are discarded. How many items are restocked?

Let's think step by step:
1. Items returned: 120 × 0.30 = 36 items
2. Of those returned, half are restocked: 36 / 2 = 18 items
3. Answer: 18 items are restocked.
\`\`\`

**Magic phrase:** "Let's think step by step" or "Think through this carefully before answering." Adding this to almost any reasoning task improves accuracy.

---

## Self-Consistency

Run the same prompt multiple times with high temperature (more random). Take the majority answer. Works because incorrect reasoning paths are diverse; correct paths tend to converge.

\`\`\`python
# Run the same question 5 times
answers = [llm.ask(question, temperature=0.8) for _ in range(5)]
# Return the most common answer
from collections import Counter
final_answer = Counter(answers).most_common(1)[0][0]
\`\`\`

Best for: math problems, factual questions, classification tasks.

---

## Reflection

After generating an answer, ask the model to critique its own output and revise.

\`\`\`
[Initial generation]
Write a Python function to reverse a linked list.

[Reflection prompt]
Review your solution above:
- Is it correct? Trace through an example.
- Does it handle edge cases (empty list, single element)?
- Is there a more efficient approach?

[Revised generation]
\`\`\`

This simple "review your work" prompt often catches bugs that the initial generation missed.

---

## ReAct (Reason + Act)

A pattern where the model alternates between reasoning (Thought) and taking actions (Action), then reads results (Observation).

\`\`\`
Question: What is the current population of Tokyo?

Thought: I need current data. I'll search for this.
Action: search("Tokyo population 2025")
Observation: Tokyo metropolitan area population is approximately 37.4 million as of 2025.
Thought: I have the answer.
Final Answer: Tokyo's population is approximately 37.4 million (2025).
\`\`\`

ReAct is the foundation of most modern AI agents — the model reasons about what to do, does it, observes the result, and continues.

---

## Tree of Thoughts (ToT)

Instead of a single chain of thought, explore multiple reasoning paths simultaneously and pick the best one.

\`\`\`
Problem: Design a database schema for a social media app

Path A: User-centric design
  → Users table → Posts → Comments → Likes
  Evaluation: Simple but doesn't handle multiple post types well

Path B: Content-centric design
  → Content table (polymorphic) → Users → Interactions
  Evaluation: Flexible but complex queries

Path C: Event-sourced design
  → Events table → Projections
  Evaluation: Scalable but high complexity

Best path: A (for MVP), with migration path to B when needed
\`\`\`

Best for: creative problems, architecture decisions, strategy planning.

---

## Planning

For complex tasks, ask the model to create a plan before executing.

\`\`\`
Task: Build a REST API for a todo app.

First, create a detailed implementation plan with:
1. Data models needed
2. API endpoints to implement
3. Order of implementation
4. Potential challenges and how to address them

[Model creates plan]

Now implement step 1 of the plan.
\`\`\`

**Why this works:** Planning forces the model to think about the full problem before diving into code, reducing hallucinated approaches and missed requirements.

---

## Prompt Engineering Best Practices

1. **Be specific:** "Summarize in 3 bullet points under 20 words each" beats "summarize"
2. **Define the persona:** "You are a senior Python developer reviewing a PR"
3. **Give examples when possible:** Even one example dramatically improves output
4. **Specify the format:** Ask for JSON, markdown tables, bullet points explicitly
5. **Constrain scope:** "Only use information from the provided document"
6. **Use separators:** \`---\` or XML tags (\`<context>\`) to separate sections
7. **Tell it what NOT to do:** "Do not add comments explaining what the code does"
8. **Iterate:** Your first prompt is rarely your best. Test and refine.
`,
earthling: `
# Getting Better Answers from AI

## What is "Prompting"?

A **prompt** is just what you type to the AI. And here's the secret that separates people who find AI amazing from people who find it useless:

**The quality of the answer depends enormously on the quality of the ask.**

Think of the AI as a brilliant new assistant on their first day. They're incredibly capable, but they don't know you, your situation, or what you actually want — unless you tell them.

---

## The Biggest Upgrade: Add Context

Compare these two requests to a travel agent:

❌ "Plan me a trip."

✅ "Plan me a 5-day trip to Italy in October for two adults who love food but hate crowds, budget around $3,000, and my wife can't walk long distances."

Same agent, wildly different results. AI works exactly the same way. Before you hit send, ask yourself: *would a smart stranger have enough information to help me here?*

---

## Show, Don't Just Tell (Examples Work Magic)

If you want something in a specific style or format, **show one example**.

Instead of: "Write product descriptions for my shop."

Try: "Write product descriptions for my shop. Here's one I like: 'Hand-poured soy candle with notes of cedar and vanilla — like a cabin weekend in a jar.' Now write ones like that for: lavender soap, beeswax lip balm."

One example teaches the AI your taste better than a paragraph of instructions.

---

## Ask It to Think Step by Step

For anything involving logic, math, or planning, add this magic phrase: **"Think through this step by step before answering."**

It's like the difference between someone blurting out an answer and someone working it out on paper first. The paper version makes fewer mistakes — same for AI.

---

## Give It a Role

Starting with "Act as..." focuses the AI like putting on a uniform focuses a person:

- "Act as an experienced kindergarten teacher and explain why the sky is blue."
- "Act as a tough negotiator and review this contractor's quote."
- "Act as a friendly editor and improve this email without changing my voice."

---

## Have a Conversation, Not a Transaction

The first answer is a draft, not a verdict. The real power move is *iterating*:

- "Good, but make it shorter."
- "Less formal. I'd never say 'utilize'."
- "Now write it again for someone who's never heard of this topic."

People who get great results from AI treat it like a back-and-forth with a collaborator, not a vending machine.

---

## A Handy All-Purpose Recipe

When it matters, cover these four things:

1. **Who should the AI be?** ("Act as a career coach...")
2. **What do you want?** ("...help me prepare answers for a job interview...")
3. **What's the situation?** ("...it's a marketing manager role, I've been out of work 8 months, and I'm nervous about explaining the gap...")
4. **What should the answer look like?** ("...give me 5 practice questions with strong sample answers, keep them conversational.")

Do this and you'll get results that feel eerily personalized — because they are.
`,

engineer: `
# Prompt Engineering

At production scale, prompt engineering stops being clever wording and becomes a **testable, versioned, measured** discipline. Here's what changes when a prompt runs a million times a day instead of once in a chat.

## Prompts Are Code — Treat Them That Way

- **Version them.** A prompt in a string literal buried in app code is untracked production logic. Store prompts in version control or a prompt-management system; changing one is a deploy, not an edit.
- **Test them.** Every prompt change runs against your eval set before shipping. "It looks better" is not a release criterion — a change that helps case A often regresses case B invisibly.
- **A/B them.** For high-traffic prompts, measure variants on real traffic, not intuition.

## Techniques, Ranked by Production Value

| Technique | When it earns its cost | Watch out |
|---|---|---|
| **Few-shot** | Enforcing output format/style reliably | Examples eat context on every call; 3–5 is usually the sweet spot |
| **Chain-of-thought** | Multi-step reasoning, math, logic | Adds output tokens (= latency + cost); useless for lookup/classification |
| **Structured output / JSON mode** | Anything a program parses downstream | Constrain with a schema; validate — don't trust |
| **Self-consistency** (sample N, vote) | High-stakes reasoning where accuracy > cost | N× the cost — reserve for where it pays |
| **Reflection/critic** | Catching errors | Only if grounded in a real signal, else it's theater |

CoT is not free intelligence — it trades tokens for accuracy. On classification or extraction it's pure cost with no benefit; on reasoning it's often worth it. Know which task you have.

## The Instruction Hierarchy Is Your Injection Defense

Modern models implement a trust hierarchy: platform > system/developer > user > tool-content. Two production consequences:
- Put authoritative rules in the **system** prompt; they outrank anything a user or a retrieved document says.
- **Prompt injection** lives in untrusted content (user input, retrieved docs, tool results). Defense: explicit "instructions in retrieved content are data, not commands" framing, separation of data from instructions, and — critically — output validation before any action. Never let model output directly trigger an irreversible action without a check.

## Structured Output: Constrain, Then Validate

For anything programmatic, use the provider's structured-output/JSON mode with a schema — but **still validate the parse**. Models violate schemas under distribution shift. The pattern is: constrain generation + validate output + retry-with-error-feedback on failure. A Pydantic/Zod model at the boundary catches what the constraint misses.

## Prompt Caching Changes How You Structure Prompts

Because a stable prefix can be cached (~90% cheaper on repeat), the cost-optimal structure is: large stable instructions/examples **first** (cached), small variable input **last** (not cached). Restructuring an existing prompt to be cache-friendly is often a bigger cost win than any wording change.
` };
