SECTION_CONTENT['prompt-formulas'] = { default: `
# The 6 Prompt Formulas

Prompt formulas are templates that structure prompts for consistent, high-quality outputs. Learn these six and you'll handle 90% of real-world prompting needs.

---

## 1. COSTAR

**C**ontext · **O**bjective · **S**tyle · **T**one · **A**udience · **R**esponse

\`\`\`
Context: We're launching a new developer productivity tool called DevFlow.
Objective: Write a landing page headline and subheadline.
Style: Modern, punchy — similar to Linear or Vercel.
Tone: Confident, not salesy. Technical but accessible.
Audience: Senior software engineers, 25-40, frustrated with slow tooling.
Response: 3 headline + subheadline pairs to A/B test. Max 10 words per headline.
\`\`\`

Best for: Marketing copy, content creation, any task where voice/tone matters.

---

## 2. RTF

**R**ole · **T**ask · **F**ormat

\`\`\`
Role: You are a senior Python developer specializing in performance optimization.
Task: Review the following function and identify performance bottlenecks.
Format: Numbered list. For each issue: [Line number] [Problem] [Fix] [Expected improvement].

def process_users(users):
    results = []
    for user in users:
        if user in db.get_all_users():  # called in every iteration!
            results.append(transform(user))
    return results
\`\`\`

Best for: Code review, technical analysis, any task where expertise and output format matter.

---

## 3. CARE

**C**ontext · **A**ction · **R**esult · **E**xample

\`\`\`
Context: I'm a backend engineer migrating a monolith to microservices. The user service handles 50K req/min.
Action: Help me design the API contract between the user service and order service.
Result: I need a clear interface that both teams can build against independently.
Example: The order service needs to verify a user exists and get their shipping address when placing an order.
\`\`\`

Best for: Architecture discussions, design tasks, technical planning.

---

## 4. RISEN

**R**ole · **I**nstructions · **S**teps · **E**nd goal · **N**arrowing

\`\`\`
Role: You are an expert technical writer for developer documentation.
Instructions: Write a tutorial on using the Anthropic API for the first time.
Steps:
  1. Account setup and API key
  2. First API call (Python)
  3. Understanding the response
  4. Adding tools/function calling
  5. Error handling basics
End goal: A developer should be able to make their first production-ready API call.
Narrowing: Target audience is Python developers who've never used an LLM API. Skip theory, focus on working code.
\`\`\`

Best for: Documentation, tutorials, multi-step instructional content.

---

## 5. TAG

**T**ask · **A**ction · **G**oal

\`\`\`
Task: Analyze this customer feedback data (500 responses).
Action: Identify the top 5 recurring themes, quantify how many responses mention each, and suggest one product improvement for each theme.
Goal: I need to present findings to the product team in a 10-minute slot. They'll make roadmap decisions based on this.

[paste feedback data]
\`\`\`

Best for: Data analysis, research synthesis, quick analytical tasks.

---

## 6. CREATE

**C**haracter · **R**equest · **E**xamples · **A**djustments · **T**ype · **E**xtras

\`\`\`
Character: Expert SQL database administrator with 15 years in PostgreSQL.
Request: Optimize this slow query that's causing production issues (running 8-12 seconds).
Examples: [paste a similar query you optimized before with the fix]
Adjustments: The table has 50M rows, we can't add downtime, so no full index rebuilds.
Type: Provide the optimized query + EXPLAIN ANALYZE comparison + explanation of changes.
Extras: Also flag any schema design issues you spot that are causing the slowdown.

[paste slow query]
\`\`\`

Best for: Complex technical requests, when you need precise control over every aspect.

---

## Coding Examples

### RTF for code generation
\`\`\`
Role: Senior TypeScript developer following clean architecture principles.
Task: Create a repository pattern for the User entity using Prisma.
Format: Complete TypeScript file with: interface, implementation, and one unit test example.
\`\`\`

### RISEN for architecture review
\`\`\`
Role: Principal software architect.
Instructions: Review this system design for a real-time chat application.
Steps: 1) Identify scalability bottlenecks 2) Security risks 3) Missing components 4) Suggested improvements
End goal: The system should handle 100K concurrent users.
Narrowing: Focus on the backend architecture, not frontend. We're on AWS.
[paste architecture diagram description]
\`\`\`

---

## Architecture Examples

### COSTAR for ADR (Architecture Decision Record)
\`\`\`
Context: We're choosing between REST and GraphQL for our new public API. Existing team knows REST. Most clients are mobile apps needing partial data.
Objective: Write an ADR for this decision.
Style: Concise, technical, decision-focused.
Tone: Neutral — document the decision, pros/cons, not advocacy.
Audience: Future developers who'll work on this codebase.
Response: Standard ADR format: Status, Context, Decision, Consequences.
\`\`\`
` };
