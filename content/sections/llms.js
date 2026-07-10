SECTION_CONTENT['llms'] = { default: `
# Large Language Models

## What is an LLM?

A **Large Language Model** is a neural network trained on massive amounts of text to predict the next token in a sequence. That simple objective — "what word comes next?" — when scaled to hundreds of billions of parameters and trained on the internet, produces systems that can write code, reason through problems, translate languages, and answer questions.

"Large" refers to both the training data (trillions of tokens) and the model parameters (billions to trillions of numbers that define how the model transforms input to output).

---

## Tokens

LLMs don't work with words — they work with **tokens**. A token is a chunk of text, roughly:
- 1 word ≈ 1-2 tokens
- 1 character ≈ 0.25 tokens
- "Hello, world!" = 4 tokens: ["Hello", ",", " world", "!"]

Why tokens? Words have too many variations (capitalized, hyphenated, misspelled). Characters create very long sequences. Tokens are a sweet spot — common subword chunks that cover any text efficiently.

**Cost implication:** You pay per token. 1M tokens ≈ 750,000 words ≈ a full novel.

---

## Tokenization

Converting text to tokens (and back) is called tokenization. Different models use different tokenizers:

- **GPT/OpenAI:** tiktoken (BPE — Byte Pair Encoding)
- **Claude:** SentencePiece-based
- **Llama:** SentencePiece

The same text produces different token counts in different models — important for cost estimation.

\`\`\`python
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")  # GPT-4 tokenizer
tokens = enc.encode("Hello, how are you?")
print(len(tokens))  # 6 tokens
\`\`\`

---

## Context Window

The context window is the **maximum amount of text the model can see at once**. Everything — your instructions, the conversation history, retrieved documents, tool results — must fit inside it.

| Model | Context window |
|---|---|
| GPT-4o | 128K tokens |
| Claude Sonnet 4.x | 200K tokens |
| Claude Opus 4.x | 200K tokens |
| Gemini 2.0 Flash | 1M tokens |
| Llama 3.1 405B | 128K tokens |

**200K tokens ≈ 150,000 words.** That's enough to hold your entire codebase for most projects.

---

## Embeddings

Embeddings are **numerical representations of meaning**. Text is converted to a list of numbers (a vector) where similar meanings produce similar vectors.

\`\`\`
"I love dogs"  → [0.23, -0.51, 0.88, 0.12, ...]  (1536 numbers)
"I enjoy dogs" → [0.24, -0.50, 0.87, 0.13, ...]  (very similar!)
"The stock fell" → [-0.41, 0.32, -0.19, 0.67, ...]  (very different)
\`\`\`

**Uses:**
- Semantic search (find docs by meaning, not keywords)
- RAG (retrieve relevant context)
- Clustering (group similar items)
- Recommendation systems

---

## Transformers

The transformer is the neural network architecture that powers almost every modern LLM. Introduced in the 2017 paper "Attention Is All You Need."

Key innovation: **attention mechanism** — instead of processing tokens one by one, transformers process all tokens simultaneously and learn which tokens to pay attention to for each prediction.

This parallelism made it possible to train on much larger datasets and produced massive quality improvements.

---

## Self-Attention

Self-attention lets each token look at every other token in the sequence to understand context.

\`\`\`
Input: "The bank can guarantee deposits will eventually cover future tuition costs"

The word "bank" is ambiguous — financial institution or riverbank?
Self-attention lets "bank" attend to "deposits", "guarantee", "costs" →
determines this is about a financial institution, not geography.
\`\`\`

---

## Pretraining

LLMs are trained in two phases:

**1. Pretraining (self-supervised)**
Train on trillions of tokens from the web, books, code. The model learns language, facts, and reasoning from predicting next tokens. This phase is enormously expensive — millions of dollars, thousands of GPUs, months of compute.

**2. Post-training (alignment)**
Fine-tune with human feedback (RLHF) to make the model helpful, harmless, and honest. Teach it to follow instructions, decline harmful requests, format responses well.

---

## Fine-Tuning

**Fine-tuning** adapts a pretrained model to a specific task or domain by training further on a smaller, curated dataset.

| Method | When to use | Cost |
|---|---|---|
| **Full fine-tune** | Complete behavior change | Very high |
| **LoRA / QLoRA** | Efficient adaptation, specific domain | Medium |
| **Instruction tuning** | Better instruction following | Medium |
| **RLHF** | Human preference alignment | High |

**When NOT to fine-tune:** Most applications are better served by good prompts + RAG. Fine-tuning is for when you need a fundamentally different behavior or proprietary domain knowledge baked into weights.

---

## RLHF (Reinforcement Learning from Human Feedback)

The technique that transformed GPT-3 into ChatGPT.

1. Generate many responses to many prompts
2. Have humans rank the responses (which is better?)
3. Train a "reward model" to predict human preference
4. Use RL to optimize the LLM toward higher reward

Result: a model that's dramatically more helpful and safe than the base pretrained model.

Modern variants: RLAIF (AI feedback instead of human), DPO (Direct Preference Optimization — simpler, no reward model needed).

---

## Inference

**Inference** is using a trained model to generate outputs. Unlike training (one-time, expensive), inference happens every time a user sends a message.

**Inference cost factors:**
- Model size (larger = more memory, slower)
- Input token count (prompt length)
- Output token count (response length)
- Hardware (GPU vs CPU, quantization)

**Inference optimization techniques:**
- **Quantization:** Use INT8/INT4 instead of FP32 weights (4-8x smaller)
- **Speculative decoding:** Small model drafts, large model verifies (2-3x faster)
- **KV caching:** Cache attention keys/values across requests
- **Batching:** Process multiple requests together
`,
earthling: `
# Large Language Models

## What is an LLM?

LLM stands for Large Language Model — it's the engine inside tools like Claude and ChatGPT.

Here's the surprising truth about how it works: an LLM is, at heart, an extremely sophisticated **auto-complete**. You know how your phone suggests the next word when you're texting? An LLM does that — but it's read a library's worth of text millions of times over, so its "next word guesses" are so good they add up to essays, answers, and conversations.

> **The parrot vs. the professor:** A parrot repeats phrases it has heard. An LLM is more like a professor who has read everything — it doesn't repeat, it *recombines* everything it learned into new answers tailored to your question.

---

## Tokens — The AI's Bite Sizes

AI doesn't read whole words or whole sentences. It chews text in small chunks called **tokens** — roughly three-quarters of a word each.

Why should you care? Two reasons:

1. **Pricing.** AI services charge by the token — like a taxi meter that ticks per chunk of text. Longer conversations cost more.
2. **Counting quirks.** Ever notice AI is oddly bad at counting letters in a word? It's because it doesn't see letters — it sees tokens. Asking it how many R's are in "strawberry" is like asking someone to count the grains of rice in a bite they already swallowed.

---

## The Context Window — The AI's Working Memory

The **context window** is how much the AI can "keep in mind" at once — like the size of its desk. Everything it's currently working with has to fit on that desk: your question, the conversation so far, any documents you shared.

Modern AI desks are big — Claude can hold about a novel and a half's worth of text at once. But here's the key thing most people don't know:

**When your conversation ends, the desk is wiped clean.** The AI doesn't remember you between chats (unless the app specifically saves and reloads notes about you). Each new conversation starts fresh. It's not being rude — it's just how the machinery works.

---

## How Did It Get So Smart? (Training)

Two phases, like raising a brilliant child:

**Phase 1 — Reading everything.** The model "reads" a giant chunk of the internet, books, and articles, playing one game trillions of times: *guess the next word*. Getting good at this game secretly requires learning grammar, facts, logic, and even some reasoning. This takes months and costs millions of dollars in computing power.

**Phase 2 — Finishing school.** The raw model knows a lot but has no manners or judgment. So humans rate its answers — "this one's helpful, that one's rude, this one's dangerous" — and the model learns to be helpful, honest, and safe. This is why Claude answers politely instead of like a random internet forum.

---

## The One-Sentence Takeaway

An LLM is a supercharged auto-complete that read a library, got coached by humans on how to be helpful, thinks in word-chunks called tokens, and keeps everything on a big-but-temporary desk that gets wiped after every conversation.
`,

engineer: `
# Large Language Models

You know what an LLM is. This is about the parts that bite you in production.

## Tokens Are a Cost and Latency Model, Not Trivia

Every architectural decision downstream is governed by token economics:

| Fact | Production consequence |
|---|---|
| ~4 chars/token (English), worse for code/JSON | Your token estimates from prose don't hold for structured payloads — budget 1.5–2× |
| You pay input **and** output tokens, output ~3–5× the price | Long system prompts on every call are a recurring tax; a verbose model is expensive twice |
| Non-English tokenizes 2–3× worse | Multilingual apps cost more and hit context limits sooner than you'd expect |
| Tokenization is model-specific | Never reuse a token count across providers for billing math |

**KV cache is the real latency story.** Prefill (processing your prompt) is parallel and fast; decode (generating output) is sequential — one forward pass per token. This is why **output length dominates latency**, not input length, and why streaming exists. A 200-token answer to a 10K-token prompt feels slow because of the 200 sequential decode steps, not the 10K-token prefill.

## Context Window: the "Lost in the Middle" Tax

A 200K context window does not mean 200K tokens of *equally usable* attention. Models attend most reliably to the **start and end** of the context; information buried in the middle is measurably more likely to be ignored. Practical rules:

- Put the most critical instructions/data at the **top or bottom**, never the middle of a long context.
- More context is not free accuracy — beyond a point, recall *degrades*. Retrieval + reranking to fit less, better-ordered context often beats stuffing everything in.
- Prompt caching (Anthropic/OpenAI) makes a large static prefix cheap on repeat calls (~90% discount on cached tokens) — architect your prompt so the stable part is cacheable and the variable part is small and last.

## Fine-Tuning vs RAG vs Prompting — the Decision You'll Actually Make

The most common expensive mistake is fine-tuning when you needed RAG.

| Need | Reach for |
|---|---|
| Model doesn't *know* a fact (private/current data) | **RAG** — fine-tuning does NOT reliably teach new facts, it teaches *behavior/format* |
| Wrong output *format* or *style* | Few-shot prompting first; fine-tune only if prompting plateaus at high volume |
| Consistent domain *behavior* at scale, latency/cost of long prompts hurts | **Fine-tune** (LoRA/QLoRA) — bakes behavior in, shortens prompts |
| One-off or low-volume | **Prompting** — never fine-tune what a good prompt solves |

Fine-tuning teaches the model *how to behave*, not *what is true*. If your failure mode is "it doesn't know X," fine-tuning will happily produce confident, well-formatted wrong answers.

## RLHF / DPO — Why the Model Refuses or Sycophants

Post-training shapes the failure modes you debug: sycophancy (agreeing with a wrong premise you assert), over-refusal, and verbosity are all RLHF artifacts, not prompting bugs. Newer alignment (DPO, RLAIF) trades the reward-model complexity of classic RLHF for a simpler preference objective. When a model won't stop hedging or apologizing, that's a trained prior — steer it explicitly in the system prompt rather than assuming your prompt is malformed.

## Numbers Worth Memorizing

- Frontier context: 200K (Claude), 128K (GPT-4o), 1M (Gemini)
- Rough output/input price ratio: 3–5×
- Prompt cache discount: ~90% on cached prefix, 5-min TTL
- "Lost in the middle": accuracy on mid-context facts can drop 20+ points vs edges
` };
