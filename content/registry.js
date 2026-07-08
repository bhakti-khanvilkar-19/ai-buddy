/* ── Navigation sections registry ──────────────────────── */
/* Each section lists which personas have content ready.   */
/* 'personas' controls visibility in the nav per persona.  */

const SECTIONS = [
  {
    id: 'ai-foundations',
    title: '1. AI Foundations',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['What is AI','History of AI','Narrow AI','General AI','Super Intelligence','Machine Learning','Deep Learning','Neural Networks','Training','Inference']
  },
  {
    id: 'generative-ai',
    title: '2. Generative AI',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['What is Generative AI','Text Generation','Image Generation','Audio Generation','Video Generation','Multimodal AI']
  },
  {
    id: 'llms',
    title: '3. Large Language Models',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['What is an LLM','Tokens','Tokenization','Context Window','Embeddings','Vector Representations','Transformers','Self Attention','Multi Head Attention','Positional Encoding','Pretraining','Fine Tuning','RLHF','Inference'],
    itemsByPersona: {
      earthling: ['What is an LLM','Tokens','Context Window'],
      embedded:  ['What is an LLM','Tokens','Context Window','Inference']
    }
  },
  {
    id: 'models-ecosystem',
    title: '4. AI Models Ecosystem',
    personas: ['cadet','commander','engineer'],
    items: ['GPT Models','Claude Models','Gemini Models','Llama Models','DeepSeek Models','Qwen Models','Mistral Models','Phi Models']
  },
  {
    id: 'local-models',
    title: '5. Local Models',
    personas: ['cadet','engineer'],
    items: ['What are Local Models','Why Run Models Locally','Ollama','LM Studio','llama.cpp','vLLM','Open WebUI','Quantization','Hardware Requirements']
  },
  {
    id: 'prompt-engineering',
    title: '6. Prompt Engineering',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['Zero Shot Prompting','One Shot Prompting','Few Shot Prompting','Chain of Thought','Self Consistency','Reflection','ReAct','Tree of Thoughts','Planning']
  },
  {
    id: 'context-engineering',
    title: '7. Context Engineering',
    personas: ['cadet','commander','engineer','embedded'],
    items: ['What is Context','Context Windows','Context Management','Grounding','Memory Types','Retrieval','Knowledge Injection']
  },
  {
    id: 'rag',
    title: '8. RAG',
    personas: ['cadet','commander','engineer'],
    items: ['Embeddings','Chunking','Semantic Search','Hybrid Search','Re-ranking','Vector Databases','Implementation']
  },
  {
    id: 'ai-agents',
    title: '9. AI Agents',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['What is an Agent','Agent vs Chatbot','Agent vs Workflow','Agent Loop','Observe-Think-Plan-Act-Reflect']
  },
  {
    id: 'agentic-ai',
    title: '10. Agentic AI',
    personas: ['cadet','commander','engineer','embedded'],
    items: ['Autonomous Systems','Planning','Reasoning','Tool Usage','Multi-Step Execution','Reflection','Recovery']
  },
  {
    id: 'agent-components',
    title: '11. Agent Components',
    personas: ['cadet','engineer'],
    items: ['Instructions','Tools','Memory','Knowledge','Planning']
  },
  {
    id: 'skills',
    title: '12. Skills',
    personas: ['cadet','engineer'],
    items: ['What are Skills','Reusable Capabilities','Tool Skills','Domain Skills','Knowledge Skills']
  },
  {
    id: 'sub-agents',
    title: '13. Sub Agents',
    personas: ['cadet','engineer'],
    items: ['Multi-Agent Systems','Agent Orchestration','Coordinator Patterns']
  },
  {
    id: 'workflows',
    title: '14. Workflows & Automations',
    personas: ['cadet','commander','engineer'],
    items: ['Scripts vs Workflows','Triggers','Conditions','Actions','State Management','Error Handling','Tools Comparison']
  },
  {
    id: 'frameworks',
    title: '15. AI Development Frameworks',
    personas: ['cadet','engineer'],
    items: ['LangChain','LangGraph','CrewAI','AutoGen','Semantic Kernel','OpenAI Agents SDK','PydanticAI']
  },
  {
    id: 'coding-assistants',
    title: '16. AI Coding Assistants',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['ChatGPT','Claude','Claude Code','Gemini','GitHub Copilot','Cursor','Windsurf','Continue.dev']
  },
  {
    id: 'claude-code',
    title: '17. Claude Code Deep Dive',
    personas: ['cadet','engineer','embedded'],
    items: ['Architecture','Context Handling','Codebase Understanding','Tool Usage','Terminal Integration','Git Integration','Workflows']
  },
  {
    id: 'vibe-coding',
    title: '18. Vibe Coding',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['What is Vibe Coding','Benefits','Risks','Limitations','Best Practices']
  },
  {
    id: 'first-agent',
    title: '19. Building Your First Agent',
    personas: ['cadet','engineer'],
    items: ['Define Goal','Select Model','Create Instructions','Add Tools','Add Memory','Add Knowledge','Evaluation','Observability']
  },
  {
    id: 'ai-engineering',
    title: '20. AI Engineering',
    personas: ['cadet','commander','engineer'],
    items: ['Evaluations','Observability','Tracing','Prompt Versioning','Cost Optimization','Latency Optimization','Security','Guardrails']
  },
  {
    id: 'developer-use-cases',
    title: '21. Developer Use Cases',
    personas: ['cadet','commander','engineer'],
    items: ['Backend Engineers','Frontend Engineers','DevOps Engineers','QA Engineers','Architects','Platform Engineers','Data Engineers']
  },
  {
    id: 'embedded-ai',
    title: '22. Embedded Engineering AI',
    personas: ['engineer','embedded'],
    items: ['Embedded Linux','Firmware Development','Device Drivers','Board Bring-up','BSP Development','Power Management','Protocol Development','System Integration','Root Cause Analysis']
  },
  {
    id: 'embedded-handbook',
    title: '23. Embedded Linux Handbook',
    personas: ['engineer','embedded'],
    items: ['dmesg Analysis','journalctl Analysis','Kernel Logs','Crash Dumps','Stack Traces','Memory Leaks','Driver Probe Failures','Build System Issues','Yocto & Buildroot']
  },
  {
    id: 'sil-platforms',
    title: '24. SIL & Hardware Platforms',
    personas: ['engineer','embedded'],
    items: ['SIL0/SIL1/SIL2','Development Boards','Validation Boards','Production Hardware','Board Bring-up','Power Sequencing','Boot Flows']
  },
  {
    id: 'secure-ai',
    title: '25. AI in Secure Environments',
    personas: ['commander','engineer','embedded'],
    items: ['Cloud AI','Private AI','On-Prem AI','Air-Gapped AI','IP Protection','Enterprise Security']
  },
  {
    id: 'functional-safety',
    title: '26. Functional Safety & AI',
    personas: ['commander','engineer','embedded'],
    items: ['ISO 26262','ASPICE','Safety-Critical Development','Verification','Validation']
  },
  {
    id: 'agentic-use-cases',
    title: '27. Agentic AI Use Cases',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['Research Agent','Documentation Agent','Code Review Agent','Bug Investigation Agent','Customer Support Agent','Knowledge Assistant']
  },
  {
    id: 'automation-expert',
    title: '28. Becoming an AI Automation Expert',
    personas: ['cadet','commander','engineer'],
    items: ['Learning Roadmap','Skills Development','Tools Mastery','Project Ideas','Career Paths']
  },
  {
    id: 'glossary',
    title: '29. AI Terminology Dictionary',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['A-Z Glossary','Common Terms','Technical Concepts']
  },
  {
    id: 'learning-roadmap',
    title: '30. Complete Learning Roadmap',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['Beginner Path','Intermediate Path','Advanced Path','AI Engineer Path','Agent Engineer Path','AI Architect Path']
  },
  {
    id: 'llm-internals',
    title: '31. LLM Internals Deep Dive',
    personas: ['cadet','engineer'],
    items: ['Tokenization','BPE / WordPiece / SentencePiece','Token Limits & Efficiency','Embeddings & Vectors','Cosine Similarity','Self-Attention Q K V','Attention Scores & Softmax','Multi-Head Attention','Transformer Architecture','Positional Encoding','Feed Forward Networks']
  },
  {
    id: 'llm-inference',
    title: '32. LLM Inference Engine',
    personas: ['cadet','engineer'],
    items: ['Request Lifecycle','Logits & Probability','Temperature','Top-K Sampling','Top-P / Nucleus Sampling','Frequency Penalty','Presence Penalty','Stop Sequences','Streaming']
  },
  {
    id: 'system-prompts',
    title: '33. System Prompts & Hierarchy',
    personas: ['cadet','commander','engineer','embedded'],
    items: ['Instruction Hierarchy','System Prompt','Developer Prompt','User Prompt','Conversation History','Conflict Resolution','Prompt Injection Defense']
  },
  {
    id: 'advanced-prompts',
    title: '34. Advanced Prompt Engineering',
    personas: ['cadet','commander','engineer'],
    items: ['Zero / One / Few Shot','Chain of Thought','Self Consistency','ReAct','Tree of Thoughts','Graph of Thoughts','Constitutional Prompting','Critic-Reviewer Pattern','Generator-Evaluator Pattern']
  },
  {
    id: 'context-eng-deep',
    title: '35. Context Engineering Deep Dive',
    personas: ['cadet','engineer'],
    items: ['Why Context > Prompt','Context Assembly','Context Compression','Context Pruning','Dynamic Injection','Memory Retrieval','Agent Context Construction']
  },
  {
    id: 'prompt-formulas',
    title: '36. The 6 Prompt Formulas',
    personas: ['cadet','commander','engineer'],
    items: ['COSTAR Formula','RTF Formula','CARE Formula','RISEN Formula','TAG Formula','CREATE Formula','Coding Examples','Architecture Examples']
  },
  {
    id: 'socratic-reasoning',
    title: '37. Socratic AI Reasoning',
    personas: ['cadet','commander','engineer'],
    items: ['Socratic Questioning','Guided Discovery','Root Cause Analysis','5-Why Framework','Debugging Applications','Architecture Reviews']
  },
  {
    id: 'agent-protocols',
    title: '38. Agent Communication Protocols',
    personas: ['cadet','engineer'],
    items: ['MCP (Model Context Protocol)','A2A (Agent-to-Agent)','Tool Calling','Function Calling','Structured Outputs','JSON Mode']
  },
  {
    id: 'ai-apis',
    title: '39. AI APIs & Integration',
    personas: ['cadet','engineer','embedded'],
    items: ['OpenAI API','Anthropic API','Gemini API','DeepSeek API','Groq API','OpenRouter','Authentication & Keys','Rate Limits','Cost Optimization','Python Examples']
  },
  {
    id: 'jarvis-ai',
    title: '40. Jarvis-Style AI Assistants',
    personas: ['engineer'],
    items: ['Personal AI OS Architecture','Voice Pipeline','Speech-to-Text','Agent Brain','Planning Engine','Memory System','Text-to-Speech','Local LLMs','Home Automation','Implementation Roadmap']
  },
  {
    id: 'vibe-coding-master',
    title: '41. Vibe Coding Masterclass',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['What is Vibe Coding','Human-in-the-Loop Development','Rapid Prototyping','vs Professional Engineering','Hallucinated Code Risks','Security Issues','Technical Debt','Enterprise Guidelines']
  },
  {
    id: 'prod-stack',
    title: '42. AI Engineering Production Stack',
    personas: ['cadet','commander','engineer'],
    items: ['End-to-End Architecture','Frontend Layer','API Gateway','Agent Layer','RAG Layer','Memory Layer','Vector Database','LLM Layer','Observability','Evaluation','Monitoring']
  },
  {
    id: 'ai-tools-playbook',
    title: '43. AI Tools Playbook',
    personas: ['earthling','cadet','commander','engineer','embedded'],
    items: ['Which Tool When','Which Model When','Using AI Efficiently','How to Prompt Well','Template Prompts'],
    itemsByPersona: {
      earthling: ['ChatGPT vs Claude vs Gemini vs Copilot','Which Model to Pick','Using It Efficiently','How to Talk to It','Everyday Template Prompts'],
      cadet:     ['Choosing Your Daily Driver','Which Model & What "Auto" Means','Giving Real Context','Ask/Plan/Agent Modes & Credits','Compact, Clear, Fork & Cost Commands','Coding Template Prompts','Custom Instructions'],
      commander: ['Which Tool for Which Task','Which Model & What It Costs','Prompting Like an Executive','A Cost Norm for Your Team','Leadership Template Prompts'],
      engineer:  ['Chat UI vs API vs Claude Code','Model & Reasoning-Effort Selection','Working Efficiently: Modes & Context Budgeting','Compact, Clear, Fork & Cost Commands','Anatomy of a Production Prompt','When to Turn a Prompt into a Skill','Advanced Template Prompts'],
      embedded:  ['Grounding Beats Tool Choice','Chat UI vs Local/Air-Gapped','Model & Reasoning Effort for Firmware','Working Efficiently & Commands','Hardware Template Prompts']
    }
  }
];
