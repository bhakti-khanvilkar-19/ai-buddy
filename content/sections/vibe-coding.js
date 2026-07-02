SECTION_CONTENT['vibe-coding'] = { default: `
# Vibe Coding

## What is Vibe Coding?

Vibe coding is the practice of **building software primarily through natural language conversation with AI**, where you describe what you want and the AI writes the code. You "vibe" — you describe the feel and intent — and the AI handles the implementation.

The term was coined by Andrej Karpathy in 2025. It describes a paradigm shift: instead of writing code and using AI to help, you describe intent and use code to verify.

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists." — Andrej Karpathy

---

## Benefits

**Speed:** Building prototypes in hours instead of days. A solo developer can build what previously took a team.

**Accessibility:** People who understand a domain but can't code can now build tools for their domain.

**Exploration:** Try 5 different approaches in the time it used to take to try 1.

**Focus on what matters:** Spend time on product decisions, not boilerplate.

---

## Risks

**Hallucinated code:** The AI confidently writes code that looks correct but has subtle bugs.

**Security vulnerabilities:** AI-generated code often has security issues — hardcoded secrets, SQL injection risks, missing input validation.

**Technical debt:** Code that works but is unmaintainable, undocumented, or poorly structured.

**Loss of understanding:** If you don't understand the code, you can't debug it, optimize it, or know when it's wrong.

---

## Limitations

- AI makes more mistakes on complex domain-specific logic
- Generated code may use deprecated APIs or outdated patterns
- Consistency breaks down across a large codebase without guidance
- Testing is often sparse unless explicitly requested
- Security review is your responsibility, not the AI's

---

## Best Practices

1. **Stay in control:** Review every file the AI creates or modifies before running it
2. **Test everything:** Never ship AI code without testing the happy path AND edge cases
3. **Understand the core:** Don't vibe code security-critical logic you don't understand
4. **Provide context:** Good instructions = much better code. A CLAUDE.md or \`.cursorrules\` file prevents many mistakes
5. **Iterate in small steps:** Don't ask for a whole application at once — build one feature at a time
6. **Security audit:** Specifically ask the AI to review its own code for security issues
7. **Commit often:** Small commits make it easy to roll back when AI code breaks something
` };
