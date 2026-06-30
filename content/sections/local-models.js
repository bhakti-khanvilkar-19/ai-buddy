SECTION_CONTENT['local-models'] = { default: `
# Local Models

## Why Run Models Locally?

Local models run on your own hardware — no API calls, no data leaving your machine.

**Key reasons:**
- **Privacy:** Code, data, and conversations stay on your hardware
- **Cost:** No per-token charges after hardware investment
- **Latency:** No network round-trip (especially for small models)
- **Offline:** Works without internet
- **Customization:** Fine-tune freely, modify weights

**Trade-offs:** Requires capable hardware, no free lunch on quality vs size.

---

## Ollama (Recommended starting point)

The easiest way to run local models. One-line install, automatic model downloads.

\`\`\`bash
# Install
curl -fsSL https://ollama.com/install.sh | sh

# Pull and run a model
ollama run llama3.3          # 70B — best quality
ollama run qwen2.5:7b        # 7B — fast, good quality
ollama run codestral         # code-specialized
ollama run phi4              # 14B — good quality/size ratio

# Use as API (OpenAI-compatible endpoint)
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.3",
  "messages": [{"role": "user", "content": "Hello"}]
}'
\`\`\`

**Compatible with OpenAI SDK** — just change the base URL:
\`\`\`python
from openai import OpenAI
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
response = client.chat.completions.create(model="llama3.3", messages=[...])
\`\`\`

---

## LM Studio

Desktop GUI for running local models. Great for non-developers.

- Download models from Hugging Face with a search UI
- Built-in chat interface
- OpenAI-compatible local server
- Hardware resource monitoring

Best for: exploring models, non-technical users, quick experiments.

---

## llama.cpp

The low-level engine that most tools (including Ollama) are built on. Run quantized models in pure C++.

\`\`\`bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp && make

# Download a GGUF model from Hugging Face
# Run
./llama-cli -m models/llama-3.3-70b-q4_k_m.gguf -p "Hello" -n 200
\`\`\`

Best for: maximum control, embedded systems, custom integrations, minimum dependencies.

---

## vLLM

Production-grade inference server for GPUs. Best throughput for serving models at scale.

\`\`\`bash
pip install vllm
python -m vllm.entrypoints.openai.api_server \\
    --model meta-llama/Llama-3.3-70B-Instruct \\
    --tensor-parallel-size 2  # use 2 GPUs
\`\`\`

Best for: self-hosted production deployments, batch processing, high-throughput APIs.

---

## Open WebUI

A web-based chat interface for Ollama (and other backends). Looks like ChatGPT, runs locally.

\`\`\`bash
docker run -d -p 3000:8080 \\
  -v open-webui:/app/backend/data \\
  --add-host=host.docker.internal:host-gateway \\
  ghcr.io/open-webui/open-webui:main

# Visit http://localhost:3000
\`\`\`

Features: conversation history, model switching, RAG with document upload, user management.

---

## Quantization

Quantization reduces model size by storing weights in lower precision.

| Format | Size reduction | Quality loss |
|---|---|---|
| **FP16** (baseline) | 1x | None |
| **Q8_0** | ~2x | Minimal |
| **Q4_K_M** | ~4x | Small |
| **Q4_K_S** | ~4x | Small-medium |
| **Q2_K** | ~8x | Significant |

**Rule of thumb:** Use Q4_K_M as a default — good quality, fits in consumer VRAM.

A 70B model in Q4_K_M ≈ 40GB → needs a Mac with 48GB+ unified memory or 2x A40 GPUs.

---

## Hardware Requirements

| Model size | VRAM needed | Hardware option |
|---|---|---|
| 3B | 2-4 GB | Any modern GPU |
| 7-8B | 6-8 GB | RTX 3060, M1 Mac |
| 13-14B | 10-14 GB | RTX 3080, M2 Pro Mac |
| 34B | 24-28 GB | RTX 3090/4090 |
| 70B | 40-48 GB | 2x RTX 4090, Mac Studio M2 Ultra |
| 405B | 200GB+ | 8x A100, H100 cluster |

**Mac recommendation:** Apple Silicon Macs use unified memory — no separate VRAM limit. An M3 Max with 64GB can run 70B models comfortably.
` };
