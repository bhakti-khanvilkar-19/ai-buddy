SECTION_CONTENT['llm-inference'] = { default: `
# LLM Inference Engine

## Request Lifecycle

When you send a message to an LLM API, here's what happens:

\`\`\`
1. Your HTTP request arrives at the API gateway
2. Tokenization: text → token IDs
3. Prefill: process all input tokens (parallel, fast)
4. KV Cache: store attention keys/values for input tokens
5. Decode loop: generate one token at a time
   → run forward pass → get logits → sample → next token
   → repeat until <end_of_text> or max_tokens
6. Detokenize: token IDs → text
7. Stream tokens back (or return all at once)
\`\`\`

The **prefill** phase is fast (parallel processing of all input tokens).
The **decode** phase is slow (one token per forward pass, auto-regressive).

This is why output length matters more for latency than input length.

---

## Logits & Probability

After the forward pass, the model outputs **logits** — one raw score per token in the vocabulary (~50K tokens).

\`\`\`python
logits = [2.1, 0.3, -1.5, 4.7, 0.8, ...]  # 50,000 values

# Softmax converts logits → probabilities
probs = softmax(logits)
# [0.008, 0.001, 0.0002, 0.47, 0.002, ...]  ← sums to 1.0

# The token with prob 0.47 is the most likely next token
# But we don't always pick the most likely one...
\`\`\`

---

## Temperature

Temperature controls how much randomness to inject when sampling.

\`\`\`python
def sample_with_temperature(logits, temperature):
    if temperature == 0:
        return argmax(logits)  # always pick highest probability (greedy)
    scaled_logits = logits / temperature
    probs = softmax(scaled_logits)
    return sample(probs)  # random sample weighted by probabilities
\`\`\`

| Temperature | Effect | Use case |
|---|---|---|
| **0.0** | Deterministic (always highest prob) | Code generation, extraction |
| **0.1-0.3** | Very focused, little variance | Factual Q&A, classification |
| **0.7-0.9** | Balanced creativity | General assistant, writing |
| **1.0** | Raw model distribution | Creative writing, exploration |
| **>1.0** | More random than the model intended | Usually not useful |

**Rule of thumb:** Use low temperature (0.0-0.3) for tasks that need consistent, correct answers. Use higher temperature (0.7-1.0) for creative tasks.

---

## Top-K Sampling

Before sampling, keep only the top K most probable tokens. Ignore the rest.

\`\`\`python
def top_k_sample(logits, k=50, temperature=1.0):
    # Zero out all but top-k probabilities
    top_k_logits = keep_top_k(logits, k)
    probs = softmax(top_k_logits / temperature)
    return sample(probs)
\`\`\`

With top-K=50: the model will only ever pick from the 50 most likely next tokens. This prevents bizarre low-probability tokens from being selected.

**Typical values:** K=40-100. Lower K = more focused. Most production APIs use top-K combined with top-P.

---

## Top-P / Nucleus Sampling

Instead of a fixed K, keep the smallest set of tokens whose cumulative probability exceeds P.

\`\`\`python
def nucleus_sample(logits, p=0.95, temperature=1.0):
    probs = softmax(logits / temperature)
    sorted_probs = sort_descending(probs)

    # Find cutoff: cumulative sum exceeds p
    cumsum = 0
    nucleus = []
    for token, prob in sorted_probs:
        nucleus.append(token)
        cumsum += prob
        if cumsum >= p:
            break

    # Sample from nucleus only
    return sample_from(nucleus)
\`\`\`

**Why this is better than top-K:** The nucleus size adapts to the situation.
- If the model is very confident (one token has 90% prob), the nucleus is tiny (just that token)
- If the model is uncertain, the nucleus expands to cover more options

**Typical values:** p=0.9-0.95. Lower = more focused, higher = more diverse.

---

## Frequency Penalty

Reduces the probability of tokens that have already appeared, proportional to how many times they've appeared.

\`\`\`python
# For each token that appeared n times, subtract: frequency_penalty × n
adjusted_logits = logits - frequency_penalty × appearance_counts
\`\`\`

**Effect:** Reduces repetition of specific words and phrases.
**Range:** 0.0 (no effect) to 2.0 (strong penalty).
**Use when:** The model keeps repeating the same words or phrases.

---

## Presence Penalty

Like frequency penalty, but a flat penalty for any token that has appeared at all (not proportional to count).

\`\`\`python
# For each token that appeared at least once, subtract: presence_penalty × 1
adjusted_logits = logits - presence_penalty × (1 if appeared else 0)
\`\`\`

**Effect:** Encourages the model to use new vocabulary and explore new topics.
**Use when:** You want diverse, non-repetitive content across a long generation.

---

## Stop Sequences

Strings that, when generated, cause the model to stop immediately.

\`\`\`python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    stop_sequences=["Human:", "---", "<END>"],
    messages=[...]
)
# Model stops as soon as it generates any of these strings
\`\`\`

**Use cases:**
- Stop before the model starts hallucinating a "Human:" turn in the conversation
- Stop after the model completes one JSON object: use \`}\` as stop sequence
- Stop after code block: use \`\\\`\\\`\\\`\` as stop sequence

---

## Streaming

Instead of waiting for the full response, tokens are sent as they're generated.

\`\`\`python
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Write a short story"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)  # tokens appear as generated
\`\`\`

**Why streaming matters:**
- Users see output immediately instead of waiting seconds
- Time-to-first-token (TTFT) is the key UX metric
- Allows cancellation mid-response
- Enables progressive rendering in UIs
` };
