SECTION_CONTENT['generative-ai'] = { default: `
# Generative AI

## What is Generative AI?

Generative AI refers to AI systems that **create new content** — text, images, audio, video, code — rather than just classifying or predicting from existing data.

Traditional AI: "Is this email spam or not?" (classification)
Generative AI: "Write me a professional email declining this meeting." (creation)

The underlying capability: these models learn the statistical patterns of human-created content so deeply that they can produce new content that looks, sounds, or reads like the real thing.

---

## Text Generation

The dominant use case. Large language models (LLMs) generate text one token at a time, predicting what comes next based on everything that came before.

**What it can do:**
- Write code in any language
- Draft emails, reports, documentation
- Translate between languages
- Summarize long documents
- Answer questions based on provided context
- Have natural conversations

**Key models:** Claude (Anthropic), GPT-4o (OpenAI), Gemini (Google), Llama 3.x (Meta)

---

## Image Generation

Models trained on billions of image-text pairs can generate photorealistic images, illustrations, and art from text descriptions.

**How it works (Diffusion models):**
1. Start with random noise
2. Iteratively "denoise" it guided by your text prompt
3. After ~20-50 steps, a coherent image emerges

**Key models:** DALL-E 3, Midjourney, Stable Diffusion, Flux, Imagen

\`\`\`
Prompt: "A photorealistic image of a red fox sitting in a snowy pine forest,
        golden hour lighting, National Geographic style"
→ Generates the image
\`\`\`

---

## Audio Generation

**Text-to-speech:** Convert written text to natural human-sounding voice.
- ElevenLabs, OpenAI TTS, Azure Neural Voice, Google WaveNet

**Music generation:** Generate original music from text descriptions.
- Suno, Udio, MusicGen (Meta)

**Voice cloning:** Clone a specific person's voice from a short sample.
- Used in accessibility tools, dubbing, personalization

**Speech-to-text:** Transcribe spoken audio to text.
- Whisper (OpenAI) — runs locally, very accurate

---

## Video Generation

The newest frontier. Models that generate video clips from text prompts or images.

**Key models (2024-2025):**
- **Sora (OpenAI):** Up to 60-second realistic video clips
- **Runway Gen-3:** Professional video generation
- **Kling:** High-quality video with good physics
- **Pika:** Quick video generation, good for short clips

Current limitations: max ~60 seconds, can have inconsistencies, expensive to generate.

---

## Multimodal AI

Modern models work across multiple modalities — they can see, hear, and generate text, images, and audio together.

| Model | Can do |
|---|---|
| **GPT-4o** | Text + images → text |
| **Claude Sonnet 4.x** | Text + images + PDFs → text |
| **Gemini 2.0** | Text + images + audio + video → text |
| **GPT-4o audio** | Text + audio → text + audio |

**Multimodal use cases:**
- Screenshot → code (show UI, get the React component)
- Photo of a chart → data analysis
- Voice question → text answer → spoken response
- PDF document → summary + question answering

---

## How Generative AI is Different

| Traditional AI | Generative AI |
|---|---|
| Needs labeled training data | Can learn from unlabeled data |
| Produces one output type | Produces open-ended content |
| Deterministic outputs | Probabilistic, creative outputs |
| Task-specific | General purpose |
| Small models (MBs) | Massive models (billions of parameters) |

---

## Risks and Limitations

- **Hallucination:** Confidently generating false information
- **Bias:** Reflects biases present in training data
- **Copyright:** May reproduce copyrighted content
- **Deepfakes:** Audio/video can be used to impersonate people
- **Inconsistency:** Different runs produce different outputs
- **Cost:** Large models are expensive to run

The field is developing rapidly — most of these limitations are being actively addressed.
` };
