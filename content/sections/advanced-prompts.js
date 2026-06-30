SECTION_CONTENT['advanced-prompts'] = { default: `
# Advanced Prompt Engineering

## Zero / One / Few Shot (Review)

- **Zero-shot:** No examples. Relies on model knowledge.
- **One-shot:** One example. Model mimics the pattern.
- **Few-shot:** 3-10 examples. Best for teaching format and style.

The more consistent your output format needs to be, the more examples you should provide.

---

## Chain of Thought (CoT)

Force the model to show its reasoning before answering. Dramatically improves accuracy on complex problems.

**Basic:** Add "Think step by step" or "Let's reason through this."

**Structured CoT:**
\`\`\`
Before answering, analyze this in three parts:
1. UNDERSTAND: What exactly is being asked?
2. APPROACH: What method will you use and why?
3. EXECUTE: Show the work step by step.
4. VERIFY: Check your answer makes sense.
\`\`\`

**When to use:** Math, logic, multi-step debugging, architecture decisions.
**When NOT to:** Simple lookups, sentiment classification, short Q&A — CoT adds tokens without benefit.

---

## Self-Consistency

Run the same prompt multiple times, take the majority vote. Exploits the fact that wrong answers are diverse but right answers converge.

\`\`\`python
import anthropic
from collections import Counter

client = anthropic.Anthropic()

def self_consistent_answer(question: str, runs: int = 5) -> str:
    answers = []
    for _ in range(runs):
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=500,
            temperature=0.8,  # higher temp = more diverse
            messages=[{"role": "user", "content": f"{question}\\nThink step by step, then give a final answer."}]
        )
        # Extract final answer (implement extraction logic)
        answers.append(extract_final_answer(response.content[0].text))
    return Counter(answers).most_common(1)[0][0]
\`\`\`

---

## ReAct

Interleave reasoning and actions in a loop. The model thinks, then acts, then thinks about the result.

\`\`\`
Question: Is the PyPI package "requests" safe to use for production?

Thought: I need to check the package's maintenance status and security history.
Action: search_web("requests PyPI package security vulnerabilities 2025")
Observation: No known CVEs. Last release 2 months ago. 50M+ weekly downloads.

Thought: Also check for open critical issues.
Action: fetch_url("https://github.com/psf/requests/issues?q=is:open+label:security")
Observation: 0 open security issues.

Thought: The package is well-maintained and widely used. Safe to recommend.
Answer: Yes, the requests library is safe for production use. Active maintenance, no known CVEs, 50M+ weekly downloads.
\`\`\`

---

## Tree of Thoughts (ToT)

Explore multiple reasoning branches simultaneously. A "search" over the reasoning space.

\`\`\`python
def tree_of_thoughts(problem: str, branches: int = 3, depth: int = 3) -> str:
    # Generate multiple approaches
    approaches = generate_approaches(problem, n=branches)

    # Evaluate each approach at each depth
    for d in range(depth):
        evaluated = [(approach, score_approach(approach)) for approach in approaches]
        # Prune: keep only the top half
        approaches = [a for a, s in sorted(evaluated, key=lambda x: x[1], reverse=True)[:branches//2+1]]
        # Expand: generate next steps for each surviving approach
        approaches = [expand_approach(a) for a in approaches]

    # Return best final approach
    return max(approaches, key=score_approach)
\`\`\`

**Practical use:** For architecture decisions, ask the model to generate 3 different approaches, evaluate each, then pick the best.

---

## Graph of Thoughts

Like Tree of Thoughts but allows non-linear exploration — thoughts can merge, split, and recombine.

\`\`\`
Thought A ──→ Thought C ──→ Thought E (merge)
                              ↑
Thought B ──→ Thought D ──────┘

Thought E explores the combined insight from both branches.
\`\`\`

Useful for complex problems where insights from different approaches inform each other.

---

## Constitutional Prompting

Give the model explicit principles to follow, then have it self-critique against those principles.

\`\`\`
Principles for this task:
1. Every claim must be supported by the provided data
2. Avoid speculation — say "unknown" if data is insufficient
3. Be quantitative where possible (use numbers, not "many" or "few")
4. Flag any conflicts in the data explicitly

Now analyze the sales report. After your analysis, check it against each principle
and revise anything that violates them.
\`\`\`

---

## Critic-Reviewer Pattern

Two-stage prompt: generate, then critique.

\`\`\`
Stage 1 (Generator):
Write a Python function to validate email addresses.

Stage 2 (Critic) — separate prompt:
Review the following Python function:
[paste function]

Check for:
- Correctness (does it handle edge cases?)
- Security (any injection risks?)
- Performance (efficient for large inputs?)
- Pythonic style

Then provide an improved version.
\`\`\`

The key: Stage 2 is a fresh prompt, not continuing the same conversation. A fresh context is more likely to spot errors.

---

## Generator-Evaluator Pattern

Especially useful for code generation:

\`\`\`python
def generate_and_evaluate(task: str, max_iterations: int = 3) -> str:
    code = generate_code(task)

    for i in range(max_iterations):
        # Evaluate
        issues = evaluate_code(code, criteria=[
            "correctness", "edge_cases", "security", "efficiency"
        ])

        if not issues:
            return code  # passes all checks

        # Improve based on issues
        code = improve_code(code, issues)

    return code  # return best version after max iterations
\`\`\`
` };
