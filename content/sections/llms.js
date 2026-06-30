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
` };
