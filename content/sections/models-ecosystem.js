SECTION_CONTENT['models-ecosystem'] = { default: `
# AI Models Ecosystem

## The Model Landscape (2025)

The AI model ecosystem has consolidated around a few major providers, each with strengths in different areas. Choosing the right model matters — for cost, capability, latency, and privacy.

---

## GPT Models (OpenAI)

| Model | Context | Best for |
|---|---|---|
| **GPT-4o** | 128K | General purpose, multimodal (text + vision) |
| **GPT-4o mini** | 128K | Fast, cheap, good enough for most tasks |
| **o1** | 200K | Complex reasoning, math, science |
| **o3-mini** | 200K | Fast reasoning, coding |

**Strengths:** Huge ecosystem, best tool/function calling, excellent coding.
**Weaknesses:** Closed source, data goes to OpenAI.

---

## Claude Models (Anthropic)

| Model | Context | Best for |
|---|---|---|
| **Claude Opus 4.8** | 200K | Most capable, complex reasoning, long documents |
| **Claude Sonnet 4.6** | 200K | Best balance of intelligence and speed |
| **Claude Haiku 4.5** | 200K | Fastest, cheapest, high-volume tasks |
| **Fable 5** | 200K | Latest flagship model |

**Strengths:** Best for long documents (200K context), most honest about uncertainty, excellent instruction following, strong coding.
**Weaknesses:** API-only, no image generation.

**Extended Thinking:** Claude Opus and Sonnet support extended thinking — the model reasons internally before responding, dramatically improving complex problem solving.

---

## Gemini Models (Google)

| Model | Context | Best for |
|---|---|---|
| **Gemini 2.0 Flash** | 1M | Long-context tasks, speed |
| **Gemini 2.0 Pro** | 1M | Best quality in Google ecosystem |
| **Gemini 1.5 Pro** | 1M | Stable, production-ready |

**Strengths:** Massive context window (1M tokens = full codebases), Google ecosystem integration, multimodal.
**Weaknesses:** Can be verbose, less consistent than Claude/GPT.

---

## Llama Models (Meta)

| Model | Parameters | Best for |
|---|---|---|
| **Llama 3.3 70B** | 70B | Best open model for most tasks |
| **Llama 3.1 405B** | 405B | Approaches frontier quality |
| **Llama 3.2 11B** | 11B | Multimodal (vision), on-device |
| **Llama 3.2 3B** | 3B | Edge/mobile deployment |

**Strengths:** Open source (can run locally), no per-token costs, air-gapped deployments, fine-tuning freedom.
**Weaknesses:** Requires hardware to run large models, no official support.

---

## DeepSeek Models

| Model | Context | Best for |
|---|---|---|
| **DeepSeek V3** | 64K | Coding, math, cost-efficient |
| **DeepSeek R1** | 64K | Reasoning (rival to o1 at fraction of cost) |

**Strengths:** Exceptional cost efficiency, strong coding and math, R1 is genuinely competitive with frontier reasoning models.
**Origin:** Chinese company — data privacy concerns for enterprise use.

---

## Qwen Models (Alibaba)

Strong open-source models, especially for multilingual tasks and code.
- **Qwen2.5 72B:** Strong open alternative, excellent Chinese+English
- **Qwen2.5-Coder:** Specialized for code generation

---

## Mistral Models

European AI company, strong on efficiency and open source:
- **Mistral Large:** Frontier-class, European data sovereignty
- **Mistral Nemo 12B:** Small, fast, good quality
- **Codestral:** Best open model for code

---

## Phi Models (Microsoft)

Small but surprisingly capable models for edge/device deployment:
- **Phi-4 (14B):** Punches well above its size class
- **Phi-3.5 mini (3.8B):** Runs on mobile devices

---

## How to Choose

| Priority | Choose |
|---|---|
| Best quality, complex tasks | Claude Opus 4.8 or GPT-4o |
| Balance quality + cost | Claude Sonnet 4.6 or GPT-4o mini |
| Long documents (>128K) | Claude or Gemini |
| Reasoning / math | o1, o3, or DeepSeek R1 |
| Local / private / air-gapped | Llama 3.x or Mistral |
| Cost efficiency | DeepSeek V3, Haiku, GPT-4o mini |
| EU data sovereignty | Mistral Large |
| Coding | Claude Sonnet, Codestral, GPT-4o |
` };
