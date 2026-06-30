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
` };
