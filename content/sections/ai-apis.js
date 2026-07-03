SECTION_CONTENT['ai-apis'] = { default: `
# AI APIs & Integration

## Anthropic API

The most capable API for production coding, reasoning, and long-document tasks.

\`\`\`python
import anthropic

client = anthropic.Anthropic(api_key="your-key")  # or ANTHROPIC_API_KEY env var

# Basic message
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a helpful assistant.",
    messages=[
        {"role": "user", "content": "Explain the difference between TCP and UDP"}
    ]
)
print(response.content[0].text)

# With tools
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=[{
        "name": "get_weather",
        "description": "Get the current weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {"location": {"type": "string"}},
            "required": ["location"]
        }
    }],
    messages=[{"role": "user", "content": "What's the weather in London?"}]
)
\`\`\`

**Models:** claude-sonnet-4-6, claude-opus-4-8, claude-haiku-4-5-20251001, claude-fable-5

**Pricing (approximate):** Haiku is cheapest (~$0.25/M input tokens), Sonnet is mid-tier, Opus is highest quality.

---

## OpenAI API

The widest ecosystem, most tool integrations. Excellent for GPT-4o and o1/o3 reasoning models.

\`\`\`python
from openai import OpenAI

client = OpenAI(api_key="your-key")  # or OPENAI_API_KEY env var

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a haiku about Python"}
    ],
    max_tokens=100,
    temperature=0.7
)
print(response.choices[0].message.content)
\`\`\`

---

## Gemini API

Google's API. Best for long-context tasks (1M tokens) and Google ecosystem integration.

\`\`\`python
import google.generativeai as genai

genai.configure(api_key="your-key")
model = genai.GenerativeModel("gemini-2.0-flash")

response = model.generate_content("Summarize the key points of the attached document")
print(response.text)
\`\`\`

---

## DeepSeek API

OpenAI-compatible API. Excellent price-to-performance ratio.

\`\`\`python
from openai import OpenAI  # DeepSeek is OpenAI-compatible

client = OpenAI(
    api_key="your-deepseek-key",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",  # or "deepseek-reasoner" for R1
    messages=[{"role": "user", "content": "Solve this math problem step by step..."}]
)
\`\`\`

---

## Groq API

Not a model provider — a hardware/inference provider. Runs open models (Llama, Mixtral) at extreme speed (100-500 tokens/second vs typical 30-60).

\`\`\`python
from groq import Groq

client = Groq(api_key="your-key")
response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "Hello"}]
)
\`\`\`

**Best for:** Real-time applications, streaming demos, low-latency requirements.

---

## OpenRouter

A routing layer that provides access to 100+ models through one API. Automatic fallback, cost comparison, routing by model capabilities.

\`\`\`python
from openai import OpenAI  # OpenRouter is OpenAI-compatible

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="your-openrouter-key"
)

# Use any model by ID
response = client.chat.completions.create(
    model="anthropic/claude-sonnet-4-6",  # or "meta-llama/llama-3.3-70b"
    messages=[{"role": "user", "content": "Hello"}]
)
\`\`\`

**Best for:** Prototyping across models, fallback routing, comparing model outputs.

---

## Authentication & Keys

**Always use environment variables — never hardcode keys in code:**

\`\`\`bash
# .env file (add to .gitignore!)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# Load in Python
from dotenv import load_dotenv
import os
load_dotenv()
api_key = os.getenv("ANTHROPIC_API_KEY")
\`\`\`

**In production:** Use a secrets manager (AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault). Never pass keys through environment variables in production containers if you can avoid it.

---

## Rate Limits

Every API has rate limits. Handle them gracefully:

\`\`\`python
import time
from anthropic import RateLimitError

def call_with_retry(client, **kwargs, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.messages.create(**kwargs)
        except RateLimitError as e:
            if attempt == max_retries - 1:
                raise
            wait = 2 ** attempt  # exponential backoff: 1s, 2s, 4s
            time.sleep(wait)
\`\`\`

**Common limits:**
- **Requests per minute (RPM):** How many API calls per minute
- **Tokens per minute (TPM):** Total tokens (input + output) per minute
- **Tokens per day (TPD):** Daily token budget (new accounts often start low)

---

## Cost Optimization

\`\`\`python
# 1. Use the cheapest model that works for the task
# Haiku for classification, extraction, simple Q&A
# Sonnet for complex reasoning, coding
# Opus for most complex tasks only

# 2. Cache repetitive prompts (Anthropic prompt caching)
system_with_cache = [{
    "type": "text",
    "text": long_system_prompt,
    "cache_control": {"type": "ephemeral"}  # 5-minute TTL, 90% token discount
}]

# 3. Batch API for non-real-time tasks (50% cheaper)
batch = client.messages.batches.create(
    requests=[
        {"custom_id": f"req_{i}", "params": {"model": "claude-haiku-4-5-20251001", ...}}
        for i in range(1000)
    ]
)
\`\`\`

---

## Python Code Examples

### Parallel API calls (async)
\`\`\`python
import asyncio
import anthropic

async def process_item(client, item):
    response = await client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=200,
        messages=[{"role": "user", "content": f"Classify: {item}"}]
    )
    return response.content[0].text

async def process_batch(items):
    client = anthropic.AsyncAnthropic()
    tasks = [process_item(client, item) for item in items]
    return await asyncio.gather(*tasks)

results = asyncio.run(process_batch(items))  # runs all in parallel
\`\`\`
`,
embedded: `
# AI APIs & Integration

## The Air-Gap Question Comes First

Before choosing an API provider, answer the question that doesn't come up in typical web development: **is this development machine allowed to reach the internet at all?**

Many embedded projects — defense, industrial control, automotive pre-production — work on networks that are partially or fully isolated. This changes the entire integration approach.

| Environment | AI integration approach |
|---|---|
| Standard dev laptop, internet access | Cloud API (Anthropic, OpenAI) — simplest, best quality |
| Corporate network, outbound HTTPS allowed | Cloud API through proxy — verify with IT before assuming it works |
| Isolated lab network, no internet | Local model via Ollama/llama.cpp on a machine with the weights pre-loaded |
| Fully air-gapped (classified/ITAR) | Local model only, weights transferred via approved media, no exceptions |

See the "AI in Secure Environments" section for the full decision framework — but the short version for embedded engineers: check your network policy before you architect anything.

---

## Calling Claude/GPT for Embedded-Adjacent Tasks

For teams that do have API access, the pattern for embedded-adjacent work (log analysis, driver generation, datasheet Q&A) is the same tool-calling pattern used everywhere, with your embedded artifacts as the payload:

\`\`\`python
import anthropic

client = anthropic.Anthropic()

def diagnose_boot_failure(serial_log: str, device_tree: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        system="""You are an embedded Linux bring-up engineer.
Analyze boot failures using the provided serial console output and
device tree. Be specific about which driver or subsystem is failing
and cite the exact log lines that support your conclusion.""",
        messages=[{"role": "user", "content": f"""
Serial console output:
{serial_log}

Relevant device tree node:
{device_tree}

The board hangs after "Starting kernel...". Diagnose the failure.
"""}]
    )
    return response.content[0].text

# Usage in a bring-up script
with open("serial_capture.log") as f:
    log = f.read()
with open("board.dts") as f:
    dts = f.read()

print(diagnose_boot_failure(log, dts))
\`\`\`

This is a genuinely useful pattern to wire into a bring-up script — capture serial output automatically on every boot attempt, and have a diagnosis ready before you've even reached for the scope.

---

## Local Models for Sensitive Embedded Work

When code or hardware details can't leave your network (proprietary silicon, unreleased product, export-controlled), local models via Ollama give you the same coding-assistant workflow without the data leaving your machine:

\`\`\`bash
ollama run codestral      # code-specialized, good for driver/firmware code
ollama run llama3.3       # best general open-source quality

# OpenAI-compatible endpoint — same code as above, just point base_url locally
\`\`\`

Quality is lower than frontier cloud models, but for grounded tasks (you provide the datasheet, the driver skeleton generation, log triage) the gap matters less than for open-ended reasoning.

---

## Rate Limits and Batch Processing for Log Analysis

If you're running AI-assisted analysis across a fleet's worth of logs (field returns, CI test logs from a hardware-in-the-loop rig), batch APIs are the right tool — real-time isn't needed and the cost savings are significant:

\`\`\`python
# Analyze 500 field-return logs overnight instead of one at a time
batch = client.messages.batches.create(
    requests=[
        {"custom_id": f"log_{i}", "params": {
            "model": "claude-haiku-4-5-20251001",
            "max_tokens": 500,
            "messages": [{"role": "user", "content": f"Summarize the failure in this log: {log}"}]
        }}
        for i, log in enumerate(field_logs)
    ]
)
\`\`\`

---

## The One-Sentence Takeaway

Before wiring any AI API into an embedded workflow, confirm your network policy allows it — cloud APIs are simplest when permitted, local models via Ollama are the right fallback for air-gapped or sensitive hardware work, and either way the highest-value use is grounding the model in your actual serial logs, device trees, and datasheets rather than asking generic questions.
` };
