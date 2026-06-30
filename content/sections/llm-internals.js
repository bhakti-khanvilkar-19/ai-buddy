SECTION_CONTENT['llm-internals'] = { default: `
# LLM Internals Deep Dive

## Tokenization in Depth

Before the model sees a single character, text is converted to integers.

**Byte Pair Encoding (BPE)** — used by GPT models:
1. Start with individual characters as vocabulary
2. Find the most frequent pair of adjacent tokens
3. Merge them into a new token
4. Repeat thousands of times
5. Result: a vocabulary of ~50K-100K tokens covering common word pieces

\`\`\`
"unhappiness" → ["un", "happiness"] → token IDs: [917, 8181]
"tokenization" → ["token", "ization"] → token IDs: [3642, 2065]
"\`\`\`python" → ["```", "python"] → token IDs: [7874, 29427]
\`\`\`

**Token efficiency matters:** Code, JSON, and non-English text tokenize less efficiently than English prose. A Python function might use 2x the tokens of equivalent English description.

**SentencePiece** (used by Claude, Llama): Similar concept but builds vocabulary from scratch using unigram language model, handles multiple languages more gracefully.

---

## Embeddings & Vectors

After tokenization, each token ID is looked up in an embedding table — a large matrix where each row is a 4096-dimensional (or similar) vector representing that token.

\`\`\`
token "dog" → embedding: [0.23, -0.51, 0.88, ..., 0.12]  # 4096 numbers
token "cat" → embedding: [0.21, -0.49, 0.91, ..., 0.14]  # very similar!
token "bank" → embedding: [0.67, 0.32, -0.41, ..., 0.79]  # different
\`\`\`

These vectors encode semantic relationships — words with similar meanings have similar vectors. This is learned entirely from predicting next tokens, not from any human-labeled relationships.

**Cosine similarity** measures how similar two vectors are:
\`\`\`python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Returns 1.0 for identical, 0 for unrelated, -1 for opposite
similarity("dog", "cat")    # ~0.85 (similar)
similarity("dog", "bank")   # ~0.12 (unrelated)
similarity("hot", "cold")   # ~0.31 (antonyms are still related)
\`\`\`

---

## Self-Attention: Q, K, V

The heart of the transformer. For each token, attention computes:
- **Query (Q):** "What am I looking for?"
- **Key (K):** "What do I have to offer?"
- **Value (V):** "What information do I carry?"

Every token's Query is compared against every other token's Key. The similarity scores (after softmax) determine how much each token contributes its Value.

\`\`\`python
import torch
import torch.nn.functional as F

def attention(Q, K, V, d_k):
    # Scale dot-product attention
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    weights = F.softmax(scores, dim=-1)  # sum to 1.0 across each row
    return torch.matmul(weights, V)
\`\`\`

**Intuition:** For the word "bank" in "river bank", the attention weights will be high for "river" and low for "deposit/money" — the mechanism learns which context tokens are relevant.

---

## Attention Scores & Softmax

Raw attention scores (dot products of Q and K) can be any magnitude. Softmax converts them to probabilities:

\`\`\`
Raw scores:  [2.1,  -0.5,  0.8,  3.2,  -1.1]
After softmax: [0.17,  0.01,  0.06,  0.72,  0.004]  ← sum = 1.0
\`\`\`

The token with score 3.2 gets 72% of the attention — it strongly influences the current token's representation.

**Why scale by √d_k?** In high dimensions (d_k = 64 or more), dot products grow large, pushing softmax into saturation (all weight on one token). Scaling keeps gradients healthy during training.

---

## Multi-Head Attention

Instead of one attention computation, run H parallel attention heads, each with different learned Q/K/V projections.

\`\`\`
Input embeddings (d_model = 4096)
    ↓
Split into H=32 heads (each d_k = 128)
    ↓
Head 1: attends to syntactic structure
Head 2: attends to semantic relationships
Head 3: attends to coreference (which "it" refers to)
...
Head 32: attends to positional patterns
    ↓
Concatenate all heads → Linear projection → output
\`\`\`

Different heads learn different types of relationships. This is why transformers are so powerful — they can simultaneously track syntax, semantics, and dozens of other patterns.

---

## Transformer Architecture

\`\`\`
Input tokens
    ↓
Token Embeddings + Positional Encoding
    ↓
[Transformer Block] × N (e.g., 96 layers in GPT-4)
    ├── Layer Norm
    ├── Multi-Head Self-Attention
    ├── Residual connection
    ├── Layer Norm
    └── Feed-Forward Network (FFN)
        ├── Linear (d_model → 4×d_model)
        ├── GELU activation
        └── Linear (4×d_model → d_model)
    ↓
Final Layer Norm
    ↓
Linear → Logits (vocabulary size: ~50K)
    ↓
Softmax → Probability distribution over next token
\`\`\`

---

## Positional Encoding

Attention has no inherent notion of order — "dog bit man" and "man bit dog" would look the same to pure attention. Positional encodings inject position information.

**Sinusoidal (original):** Fixed mathematical formulas using sin/cos at different frequencies.

**RoPE (Rotary Positional Encoding):** Used by most modern models (Llama, GPT-NeoX). Encodes position as a rotation in embedding space. Generalizes better to longer sequences.

---

## Feed-Forward Networks

After attention, each position independently passes through a 2-layer MLP:

\`\`\`
d_model=4096 → d_ff=16384 → d_model=4096
\`\`\`

This is where most of the model's "knowledge" is stored — facts and patterns that don't require cross-token attention. The FFN acts as a key-value memory: certain patterns in the input activate certain neurons that store specific knowledge.
` };
