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
`,
earthling: `
# Generative AI

## What is Generative AI?

You've seen AI that *recognizes* things — your phone unlocking when it sees your face, or your email sorting out spam. Generative AI is different: it *creates* things.

Think of it like this:

- **Old AI** is like a bouncer at a club: it looks at things and makes a judgment. "You're on the list. You're not."
- **Generative AI** is like a talented chef: you describe what you're craving, and it makes something new from scratch.

Ask it for a poem about your dog, a birthday card message, a vacation plan, or a summary of a long document — and it creates one, right there, that never existed before.

---

## How Does It "Create"?

Here's the kitchen analogy again. A chef doesn't invent cooking from nothing — they've tasted thousands of dishes, learned patterns (what flavors go together, what textures work), and use that experience to create new dishes.

Generative AI learned from an enormous amount of human writing, art, and conversation. It absorbed the *patterns* of how we express things. When you ask it for something, it uses those patterns to produce something new — not copied, but composed, the way a chef composes a new dish from familiar ingredients.

---

## What Can It Make?

**Writing** — This is the big one. Emails, summaries, stories, explanations, translations. Tools like Claude and ChatGPT are essentially master writers you can talk to.

**Images** — Describe a picture in words ("a cozy cabin in the snow at sunset, painted like a watercolor") and tools like Midjourney or DALL-E paint it in seconds.

**Voices and music** — AI can now read text aloud in a natural voice, clone voices (with permission!), and even compose original songs from a description.

**Video** — The newest frontier. Type a description, get a short movie clip. Still early, but improving fast.

---

## The "Multimodal" Thing

You might hear the word *multimodal*. It just means one AI that can handle several formats at once — it can look at a photo AND talk about it, or listen to you AND write back.

Real example: snap a photo of a rash on your arm and ask "should I be worried about this?" — the AI can see the image and respond in words. (It'll rightly tell you to see a doctor, but it can tell you what it looks like.)

---

## What to Watch Out For

**It makes things up sometimes.** Confidently. This is called "hallucination." The AI is a pattern-maker, not a fact-checker — think of it as a brilliant friend who occasionally bluffs. Double-check anything important.

**It reflects what it learned.** If the writing it learned from had biases, some of that seeps through.

**Fakes are getting good.** AI can imitate voices and faces well enough to fool people. If "your relative" calls asking for money urgently, verify through another channel. Seriously — this scam exists today.

---

## The One-Sentence Takeaway

Generative AI is a creation machine: you describe what you want in plain language, and it makes a brand-new version of it — usually impressive, occasionally wrong, and always worth double-checking for anything that matters.
` };
