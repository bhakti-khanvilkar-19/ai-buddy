# AI Engineering Academy

A personalized AI engineering learning platform — from "what even is AI?" to production agent architectures. One curriculum, five learning paths that adapt in depth, language, and examples to who you are.

**Live:** https://ai-buddy-zeta.vercel.app

## What this is

43 topics covering generative AI, LLM internals, prompt engineering, RAG, AI agents, context engineering, coding assistants, and production AI engineering — each one written for five different audiences:

| Persona | Who it's for |
|---|---|
| 🌱 Earthling | No technical background — plain English, real-life analogies |
| 🛸 Cadet | Developers building their first AI-powered features |
| 🌟 Commander | Engineering leaders who need strategic framing, not the math |
| 🤖 Engineer | AI/ML engineers who want internals and production tradeoffs |
| 🔧 Embedded | Firmware/hardware engineers — AI grounded in real constraints |

Pick a path from the home page, or jump straight to one via `index.html?for=<persona>`. Switch anytime from the persona badge in the header — nothing is lost.

## Tech stack

Deliberately dependency-light: **vanilla HTML/CSS/JS**, no framework, no build step. Content is authored in Markdown inside per-section JS files and rendered client-side with [marked](https://marked.js.org/) + sanitized with [DOMPurify](https://github.com/cure53/DOMPurify); diagrams render with [Mermaid](https://mermaid.js.org/). Both libraries are vendored locally in `vendor/` (not loaded from a CDN) so the app has no runtime network dependency.

## Running locally

No install or build step required — it's static files.

```bash
python3 -m http.server 8080
# then open http://localhost:8080/home.html
```

For content/lint checks (Node 22+):

```bash
npm install
npm run check:content   # verifies every content file loads and every section has content
npm run lint             # ESLint
npm run format:check     # Prettier
```

## Project structure

```
home.html               Marketing/entry page
index.html               The app — persona picker + learning platform
content/registry.js       Section metadata + per-persona nav/curriculum
content/sections/*.js     One file per topic, Markdown content keyed by persona
js/app.js                Nav building, content rendering, section loading
js/persona.js             Persona definitions, selection, switching
js/ui.js                 Theme toggle, search, interactive demos
styles/                  Design tokens, components, theme variants
vendor/                  Locally vendored Mermaid/marked/DOMPurify
```

## Adding a new section

1. Add an entry to `SECTIONS` in `content/registry.js` (id, title, which personas see it)
2. Create `content/sections/<id>.js` with `SECTION_CONTENT['<id>'] = { default: \`# Markdown here\` }`
3. Add a `<script src="content/sections/<id>.js"></script>` tag in `index.html`
4. Add the section `id` to whichever personas' `curriculum` arrays in `js/persona.js` should show it
5. Run `npm run check:content` to confirm it loads correctly

## Deployment

Deploys automatically via Vercel on push to `main` (see `vercel.json`). CI (`.github/workflows/ci.yml`) runs content integrity checks, linting, and format checks on every push.

## License

MIT — see [LICENSE](./LICENSE).
