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
`,
earthling: `
# Vibe Coding

## What On Earth is "Vibe Coding"?

It's the new name for building software by *describing the vibe* of what you want, and letting AI handle the technical part.

You: "I want a cheerful little website where my book club can vote on next month's book."

AI: *builds it.*

You: "Ooh, can the winning book get a little crown on it?"

AI: *adds the crown.*

No programming knowledge involved. You're the director; the AI is the film crew. The term was coined by a famous AI researcher (Andrej Karpathy) in 2025, and it stuck because it captures the feeling — you're going by vibes, not blueprints.

---

## Why It's Exciting

- **Ideas stop dying in notebooks.** That app idea you've had for years? You can now try it this weekend.
- **It's fast.** Prototypes in an afternoon that used to take a professional team weeks.
- **It's for everyone.** Teachers building classroom tools, shop owners building inventory trackers, hobbyists building game aids.

---

## Why It's Also a Bit Dangerous

Here's the honest part. When AI builds something for you, it's like moving into a house you didn't build and can't inspect:

- **Hidden flaws.** The AI occasionally writes code that *looks* right but has subtle problems — like a beautiful staircase with one slightly-off step.
- **Security gaps.** The house might have a back door you don't know exists. If your creation handles passwords, payments, or private info, this really matters.
- **You can't fix what you don't understand.** When it breaks (things always break), you're dependent on the AI to fix it.

---

## Sensible Rules for Vibe Coders

1. **Test it like a skeptic.** Click everything. Type nonsense in the forms. Try to break it — better you than a stranger.
2. **Go step by step.** Ask for one feature at a time, not the whole dream at once. Small steps are easier to check.
3. **Keep private data out** of hobby projects. Book club votes? Fine. Friends' credit cards? Absolutely not.
4. **Save your progress** before big changes, so a bad change can be undone.
5. **Know when to call a pro.** The moment real money or other people's personal information is involved, get a professional review. Vibe-built is fine for the garden shed — not for the bridge.

---

## The One-Sentence Takeaway

Vibe coding lets anyone turn ideas into working software by chatting — thrilling and genuinely useful, as long as you test what you build and keep anything sensitive in professional hands.
` };
