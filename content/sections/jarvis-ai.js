SECTION_CONTENT['jarvis-ai'] = { default: `
# Jarvis-Style AI Assistants

## What is a Jarvis-Style Assistant?

Named after Tony Stark's AI in Iron Man, a Jarvis-style assistant is a **personal AI OS** — a continuously running agent that knows you, your work, your environment, and your devices, and can take actions across all of them.

The goal: an AI that feels like a capable, always-available personal assistant rather than a chatbot you have to use through an app.

---

## Personal AI OS Architecture

\`\`\`
Voice input / Text input
        ↓
Voice Pipeline (wake word → STT → text)
        ↓
Agent Brain (LLM + context)
        ↓
Planning Engine (what needs to be done?)
        ↓
Tool Router
    ├── Memory System (what do I know about this person?)
    ├── Home Automation (lights, temperature, locks)
    ├── Calendar / Email
    ├── Code tools (for developers)
    ├── Web search
    ├── File system
    └── Any API
        ↓
Text output → TTS → Audio output
\`\`\`

---

## Voice Pipeline

Making the AI voice-activated creates a fundamentally different UX — hands-free, natural, ambient.

### Components

**Wake word detection:** Lightweight on-device model listens continuously.
- Open source: openWakeWord, Porcupine
- Just detects "Hey Jarvis" (or any custom phrase), sends audio to next stage

**Speech-to-Text (STT):** Converts spoken audio to text.
\`\`\`python
import openai

client = openai.OpenAI()

def transcribe(audio_file_path: str) -> str:
    with open(audio_file_path, "rb") as audio:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio
        )
    return transcript.text
\`\`\`

Or run Whisper locally (fully private, no API cost):
\`\`\`python
import whisper
model = whisper.load_model("base.en")  # or "small", "medium", "large"
result = model.transcribe("audio.wav")
print(result["text"])
\`\`\`

---

## Agent Brain

The LLM that receives the transcribed text, reasons, and decides what to do.

\`\`\`python
import anthropic

client = anthropic.Anthropic()

JARVIS_SYSTEM = """
You are Jarvis, a personal AI assistant for [your name].

About your user:
- Software engineer, works in Python and TypeScript
- Home office setup with Philips Hue lights and Sonos speakers
- Uses Google Calendar and Gmail
- Current local time: {time}

You have access to tools: control_lights, play_music, read_calendar,
send_email, search_web, read_file, run_command, take_note

Be concise. Act immediately on clear requests. Clarify ambiguous ones.
"""

def process_request(user_text: str, context: dict) -> str:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=JARVIS_SYSTEM.format(time=context["time"]),
        tools=get_available_tools(),
        messages=[{"role": "user", "content": user_text}]
    )
    return handle_response(response)
\`\`\`

---

## Memory System

What makes a Jarvis assistant feel personal is memory — it knows your preferences, your projects, your context.

\`\`\`python
class JarvisMemory:
    def __init__(self, vector_db, postgres):
        self.facts = postgres      # structured facts: preferences, routines
        self.episodic = vector_db  # searchable memory of past interactions

    def remember(self, interaction: str, category: str = None):
        # Store in both
        self.facts.log_interaction(interaction)
        embedding = embed(interaction)
        self.episodic.upsert(embedding, {"text": interaction, "timestamp": now()})

    def recall(self, query: str) -> list[str]:
        relevant = self.episodic.search(embed(query), top_k=5)
        return [r.text for r in relevant]
\`\`\`

---

## Text-to-Speech

Convert the assistant's text response back to audio.

\`\`\`python
from openai import OpenAI
import pygame

client = OpenAI()

def speak(text: str, voice: str = "nova"):
    response = client.audio.speech.create(
        model="tts-1",         # or tts-1-hd for higher quality
        voice=voice,           # alloy, echo, fable, onyx, nova, shimmer
        input=text
    )
    # Play immediately
    response.stream_to_file("/tmp/response.mp3")
    pygame.mixer.music.load("/tmp/response.mp3")
    pygame.mixer.music.play()
\`\`\`

Local TTS alternatives (fully private):
- **Coqui TTS** — open source, many voices
- **Piper** — extremely fast, runs on Raspberry Pi
- **Kokoro** — high quality, open weights

---

## Local LLMs for Privacy

If you don't want your personal conversations going to a cloud API:

\`\`\`python
from openai import OpenAI  # Ollama is OpenAI-compatible

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

response = client.chat.completions.create(
    model="llama3.3",          # runs locally
    messages=[{"role": "user", "content": user_text}]
)
\`\`\`

**Hardware for local Jarvis:**
- Mac Mini M4 Pro (24GB) — quiet, efficient, good quality
- Mac Studio M3 Ultra — best local model quality
- NUC or mini PC with RTX 4090 eGPU — Windows/Linux option

---

## Home Automation Integration

\`\`\`python
import requests

# Philips Hue
def control_lights(room: str, action: str, brightness: int = None):
    bridge_ip = "192.168.1.x"
    username = "your-hue-username"

    if action == "on":
        requests.put(f"http://{bridge_ip}/api/{username}/groups/1/action",
                    json={"on": True, "bri": brightness or 254})
    elif action == "off":
        requests.put(f"http://{bridge_ip}/api/{username}/groups/1/action",
                    json={"on": False})
    elif action == "dim":
        requests.put(f"http://{bridge_ip}/api/{username}/groups/1/action",
                    json={"on": True, "bri": 50})

# Usage: "Jarvis, dim the office lights to 30%"
\`\`\`

---

## Implementation Roadmap

### Week 1: Text-based MVP
- [ ] Set up Anthropic API key
- [ ] Build basic chat loop with 2-3 tools (web search, note-taking, calculator)
- [ ] Run it from the terminal

### Week 2: Voice input
- [ ] Add Whisper STT (local)
- [ ] Add wake word detection (openWakeWord)
- [ ] Now it's voice-activated

### Week 3: Voice output + memory
- [ ] Add TTS (Piper for privacy, OpenAI TTS for quality)
- [ ] Add basic memory (notes + vector DB for recall)

### Week 4: Integration
- [ ] Connect calendar
- [ ] Add home automation (if applicable)
- [ ] Connect to your most-used tools

**Total hardware cost:** $0 extra if you use a spare Mac or PC you have. Add ~$20-50/month in API costs if using cloud LLMs.
` };
