SECTION_CONTENT['glossary'] = { default: `
# AI Terminology Dictionary

## A

**Agent** — An AI system that perceives its environment, makes decisions, and takes actions autonomously to achieve a goal. Unlike a chatbot, an agent can use tools, plan multi-step tasks, and self-correct.

**Agentic AI** — AI systems that operate with autonomy over multiple steps. The agent decides the intermediate steps, not just responses.

**Attention** — The mechanism in transformers that lets each token "look at" other tokens to understand context. Self-attention is what makes LLMs understand relationships between words.

**A2A (Agent-to-Agent)** — Google's open protocol for AI agents to discover and communicate with each other.

---

## B

**BPE (Byte Pair Encoding)** — A tokenization algorithm that builds a vocabulary by iteratively merging the most frequent pairs of characters/subwords. Used by GPT models.

**Batch API** — An API feature that processes multiple requests asynchronously, usually at 50% lower cost but with higher latency (hours instead of seconds).

---

## C

**Chain of Thought (CoT)** — A prompting technique where you ask the model to reason step-by-step before giving a final answer. Dramatically improves performance on reasoning tasks.

**Chunking** — Splitting documents into smaller pieces before embedding them for RAG. Chunk size and overlap significantly affect retrieval quality.

**Context Engineering** — The discipline of deciding what information goes into an LLM's context window to maximize output quality.

**Context Window** — The maximum amount of text (measured in tokens) that an LLM can process at once. Everything the model "sees" at inference time.

**Constitutional AI** — Anthropic's technique for training AI to follow a set of principles (a "constitution"), improving safety and harmlessness.

---

## D

**Diffusion Model** — A type of generative model (used for images) that learns to reverse a process of adding noise. Starting from random noise, it gradually denoises into a coherent image.

**DPO (Direct Preference Optimization)** — A technique for aligning LLMs to human preferences without needing a separate reward model. Simpler alternative to RLHF.

---

## E

**Embedding** — A numerical vector representation of text where similar meanings produce similar vectors. Used for semantic search, RAG, and clustering.

**Evals (Evaluations)** — Tests that measure whether an AI system is actually doing what you want. The AI equivalent of unit tests.

**Extended Thinking** — Claude's ability to reason internally (in "thinking" blocks) before producing a visible response. Improves performance on complex problems.

---

## F

**Fine-tuning** — Training a pretrained model further on a smaller, specific dataset to adapt it to a particular task or domain.

**Function Calling** — Same as tool calling. The LLM requests to call a function; the application executes it and returns the result.

---

## G

**Grounding** — Providing factual, up-to-date context to an LLM so it doesn't hallucinate. RAG is the most common grounding technique.

**Guardrails** — Filters and checks that prevent an AI system from producing harmful, incorrect, or off-policy outputs.

---

## H

**Hallucination** — When an LLM confidently generates false information. A fundamental risk of generative AI.

**HuggingFace** — The GitHub of AI — hosts models, datasets, and code. The hub where most open-source models are published.

---

## I

**Inference** — Using a trained model to generate outputs. Happens every time a user sends a message. (Contrast with training, which happens once.)

**Instruction Tuning** — Fine-tuning a model on instruction-following examples to make it better at following user directions.

---

## J

**JSON Mode** — Forcing an LLM to output only valid JSON. Useful when you need structured, parseable output.

---

## K

**KV Cache (Key-Value Cache)** — Stores the attention keys and values computed during the prefill phase, so they don't need to be recomputed for every generated token. Critical for inference efficiency.

---

## L

**LLM (Large Language Model)** — A neural network trained on massive text data to predict next tokens. Foundation of modern AI assistants.

**LoRA (Low-Rank Adaptation)** — An efficient fine-tuning technique that adds small trainable matrices to the model, dramatically reducing the number of parameters to train.

---

## M

**MCP (Model Context Protocol)** — Anthropic's open protocol standardizing how AI models connect to external tools and data sources.

**Memory** — In agent systems: how agents store and retrieve information across steps or sessions. Types: in-context, short-term, long-term, semantic.

**Multimodal** — AI systems that can work with multiple types of data (text, images, audio, video).

---

## N

**Nucleus Sampling (Top-P)** — A sampling strategy that only considers tokens whose cumulative probability reaches a threshold P. Adaptively picks the most likely vocabulary subset.

---

## O

**Orchestrator** — An agent that plans and delegates work to other (worker) agents. The "manager" in a multi-agent system.

---

## P

**Perplexity** — A measure of how well a language model predicts a sample of text. Lower perplexity = better model.

**Positional Encoding** — A mechanism that injects token position information into transformer embeddings, since attention has no inherent notion of order.

**Prompt** — The input text given to an LLM. Includes the system prompt (developer instructions) and the user message.

**Prompt Injection** — An attack where malicious content in user input or tool results tries to override the system prompt and hijack agent behavior.

---

## Q

**Quantization** — Reducing model weight precision (e.g., FP32 → INT4) to decrease model size and improve inference speed, with some quality trade-off.

---

## R

**RAG (Retrieval-Augmented Generation)** — Augmenting LLM responses by retrieving relevant documents from an external knowledge base and injecting them into the prompt.

**ReAct** — A prompting pattern that interleaves Reasoning (Thought) and Action steps. The foundation of most AI agent architectures.

**RLHF (Reinforcement Learning from Human Feedback)** — Technique used to align LLMs with human preferences by training a reward model on human rankings, then optimizing the LLM toward that reward.

**RoPE (Rotary Positional Encoding)** — An improved positional encoding scheme that encodes position as rotations in embedding space. Used by Llama and most modern open models.

---

## S

**Semantic Search** — Finding documents by meaning rather than keyword matching. Uses embeddings + cosine similarity to find semantically similar content.

**Self-Consistency** — Running the same prompt multiple times and taking the majority answer. Improves accuracy on reasoning tasks by averaging out incorrect paths.

**Skill** — A named, reusable capability that an agent can invoke. Higher-level than tools — a skill often chains multiple tools together.

**Softmax** — A function that converts a vector of raw scores (logits) into probabilities that sum to 1.0.

**Streaming** — Returning LLM output tokens as they're generated rather than waiting for the complete response. Improves perceived latency.

**Sub-agent** — An AI agent spawned by another agent (orchestrator) to handle a specific subtask.

**System Prompt** — Instructions provided by the developer that define the AI's role, behavior, and constraints. Processed before user messages.

---

## T

**Temperature** — A parameter controlling randomness in LLM output. 0 = deterministic/greedy, 1 = standard sampling, >1 = more random.

**Token** — The basic unit of text that LLMs process. Roughly 0.75 words or 4 characters on average.

**Tool Calling** — The mechanism by which an LLM requests to call an external function, which is then executed and the result returned to the model.

**Top-K** — Sampling only from the K most probable next tokens.

**Transformer** — The neural network architecture underlying almost all modern LLMs. Key innovation: self-attention mechanism.

---

## V

**Vector Database** — A database optimized for storing and querying high-dimensional embedding vectors. Powers semantic search in RAG systems. Examples: Pinecone, Qdrant, Weaviate, pgvector.

---

## W

**Weights** — The billions of numerical parameters in a neural network that encode everything the model learned during training.

---

## Z

**Zero-Shot** — Asking a model to perform a task with no examples. Relies entirely on the model's pretrained knowledge.
` };
