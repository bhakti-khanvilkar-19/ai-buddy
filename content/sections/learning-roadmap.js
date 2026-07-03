SECTION_CONTENT['learning-roadmap'] = { default: `
# Complete Learning Roadmap

## Beginner Path (4-6 weeks)

For anyone starting from scratch — no prior AI or ML experience needed.

### Week 1-2: Foundations
- [ ] What is AI, ML, and Deep Learning (AI Foundations section)
- [ ] What is Generative AI and why it matters
- [ ] Try Claude.ai and ChatGPT — use them every day
- [ ] Learn to write basic prompts (Zero-shot, One-shot)
- [ ] Understand tokens and context windows

### Week 3-4: Practical Skills
- [ ] Zero/One/Few-shot prompting
- [ ] Chain of Thought prompting
- [ ] Use AI for your actual work (writing, research, summarization)
- [ ] Understand what hallucination is and how to avoid it
- [ ] Learn the basic model landscape (what models exist, what they're good for)

### Week 5-6: First Projects
- [ ] Build something simple with AI (use Claude.ai or ChatGPT custom GPT)
- [ ] Try a coding assistant (GitHub Copilot free tier or Cursor)
- [ ] Complete the AI Terminology Dictionary
- [ ] Follow AI news for 2 weeks (subscribe to: Import AI, The Batch, Anthropic blog)

---

## Intermediate Path (6-8 weeks)

For developers who can code and want to build AI features.

### Month 1: APIs and Prompting
- [ ] Set up Anthropic or OpenAI API key
- [ ] Make your first API call in Python
- [ ] Learn prompt engineering formulas (COSTAR, RTF, RISEN)
- [ ] Implement Chain of Thought in code
- [ ] Build a simple Q&A bot over your own documents

### Month 2: RAG and Agents
- [ ] Understand embeddings and vector databases
- [ ] Build a basic RAG pipeline (Chroma + any LLM)
- [ ] Add semantic search to an existing project
- [ ] Build your first simple agent with 2-3 tools
- [ ] Learn the ReAct pattern and implement it

### Projects to build
1. **Document Q&A:** Upload PDFs, ask questions about them
2. **Simple agent:** Weather + web search + calculator
3. **Code reviewer:** Agent that reviews git diffs

---

## Advanced Path (3-6 months)

For engineers building production AI systems.

### Production fundamentals
- [ ] Set up proper observability (Langfuse or similar)
- [ ] Implement evals for your system
- [ ] Add prompt versioning to your workflow
- [ ] Implement cost tracking and optimization
- [ ] Add streaming to your API responses

### Agent systems
- [ ] Build a multi-step agent (5+ tool calls)
- [ ] Implement proper error handling and retry logic
- [ ] Add memory (short-term + long-term)
- [ ] Explore LangGraph for stateful agents
- [ ] Implement human-in-the-loop for critical actions

### Advanced topics
- [ ] MCP server development (connect your systems to Claude Code)
- [ ] Prompt caching implementation
- [ ] Parallel agent execution
- [ ] Hybrid search (semantic + keyword)
- [ ] Re-ranking for RAG quality improvement

---

## AI Engineer Path (6-12 months)

Systematic path to becoming a professional AI engineer.

### Core competencies
1. **API mastery** — deep knowledge of Claude/OpenAI APIs, all parameters
2. **Prompt engineering** — all major techniques, tested and benchmarked
3. **RAG systems** — chunking, embedding, retrieval, re-ranking, evaluation
4. **Agent development** — multi-step, multi-tool, multi-agent
5. **Evaluation** — building eval harnesses, LLM-as-judge, human eval
6. **Observability** — tracing, logging, monitoring production systems

### Certifications & Learning
- Anthropic's official documentation (thorough)
- DeepLearning.AI short courses (fast, practical)
- LangChain Academy (free, comprehensive)
- Build and publish 3+ AI projects publicly

---

## Agent Engineer Path (6-12 months)

Specialized in building autonomous agent systems.

### Foundation
- [ ] Master all prompting techniques
- [ ] Deep understanding of tool calling
- [ ] Build agents with 3+ different frameworks

### Intermediate
- [ ] Multi-agent orchestration (CrewAI, LangGraph)
- [ ] Agent memory systems (short/long-term)
- [ ] Agent evaluation and testing
- [ ] Security: prompt injection defense, trust levels

### Advanced
- [ ] Custom MCP server development
- [ ] A2A protocol implementation
- [ ] Production agent monitoring
- [ ] Agent cost optimization

---

## AI Architect Path

For senior engineers and technical leaders designing AI systems.

### System design skills
- [ ] RAG architecture patterns (naive → advanced → production)
- [ ] Multi-agent system design
- [ ] Data pipeline design for AI
- [ ] Model selection and cost architecture
- [ ] Privacy and security architecture

### Leadership skills
- [ ] Building and evaluating AI systems before building them
- [ ] Cost modeling for AI features
- [ ] Build vs buy decisions for AI components
- [ ] Communicating AI capabilities and limitations to stakeholders
- [ ] AI governance and responsible AI practices

### Capstone projects
1. Design a production RAG system for a 1M+ document corpus
2. Architect a multi-agent customer support system
3. Build a private AI deployment on-premises
4. Design an AI evaluation framework from scratch
`,
commander: `
# Complete Learning Roadmap

## What You Actually Need to Learn (and What You Don't)

You don't need to write a transformer from scratch or debug a CUDA kernel. You need enough fluency to: evaluate proposals critically, ask the right questions in reviews, set realistic budgets and timelines, and not get talked into (or out of) the wrong bets by whoever pitches the loudest. This roadmap is scoped to exactly that.

---

## Month 1: Fluency Foundation

**Goal:** Never get lost in a technical conversation about AI again.

- [ ] Understand the difference between traditional AI, generative AI, and agentic AI — and why each requires a different evaluation lens
- [ ] Learn what tokens, context windows, and model sizes actually mean for cost and capability (you don't need the math, just the implications)
- [ ] Understand the current model landscape well enough to ask "why this model and not a cheaper one?"
- [ ] Use Claude and ChatGPT daily for real work — the fastest way to build intuition is hands-on use, not reading about it

**Time investment:** 3-4 hours/week. This pays back immediately in every AI-related meeting you sit in.

---

## Month 2: Evaluating What Your Team Proposes

**Goal:** Ask questions that separate a solid AI proposal from a fragile one.

- [ ] Learn the difference between a chatbot, a workflow, and an agent — and which one a given proposal actually is (teams often mislabel)
- [ ] Understand RAG well enough to ask "what happens when the retrieved information is wrong or outdated?"
- [ ] Understand the cost model: per-token pricing, why agentic systems cost more than single-shot calls, what caching saves
- [ ] Learn to ask for eval scores, not demos, before approving launches

**Deliverable:** Sit in on one of your team's AI project reviews and ask three questions from this course instead of zero.

---

## Month 3: Risk, Governance, and Team Impact

**Goal:** Build the judgment to set policy, not just approve individual projects.

- [ ] Understand trust tiers for agentic systems and where your org's risk tolerance sits
- [ ] Understand the security-specific risks of AI (prompt injection, data exposure) well enough to ask your security team the right questions
- [ ] Understand vibe coding / AI-assisted development well enough to set a sane policy instead of an outright ban or a free-for-all
- [ ] Learn what "observability" and "evals" mean well enough to make them launch-blocking requirements

**Deliverable:** Draft (or contribute to) your team's first AI governance policy — even a one-pager beats nothing.

---

## Ongoing: Staying Current Without Drowning

The field moves fast, but you don't need to track every model release. A sustainable cadence:

- **Weekly:** 15 minutes skimming one AI newsletter (Anthropic's blog, or a curated digest)
- **Quarterly:** Re-review your org's model/tool choices — a "best" choice from two quarters ago may be stale
- **As-needed:** When your team proposes something genuinely new (a new architecture pattern, a new autonomy level), spend an hour understanding it deeply before approving

---

## What Good Looks Like After 3 Months

You should be able to walk into a project review and:
- Correctly identify whether a proposal is a chatbot, workflow, or agent — and whether that's the right choice
- Ask for an eval score and know what a good one looks like
- Ask "what's the failure mode and who's accountable" without an engineer having to explain why that question matters
- Set a realistic budget range based on architecture, not vibes

That's the bar. Everything past it is specialization you can delegate to your technical leads.
` };
