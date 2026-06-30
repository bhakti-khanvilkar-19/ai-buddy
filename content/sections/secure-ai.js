SECTION_CONTENT['secure-ai'] = { default: `
# AI in Secure Environments

## The Core Tension

AI is most powerful when it has access to your data. But your most valuable data is often your most sensitive. Finding the right deployment model means balancing capability against security requirements.

---

## Cloud AI

**What it is:** Using AI services hosted by providers (Anthropic, OpenAI, Google).

**Data flow:** Your data → Provider's servers → AI processes it → Response returned.

**Appropriate when:**
- Data is not sensitive (public info, non-proprietary)
- Provider has appropriate compliance certifications (SOC 2, HIPAA BAA, etc.)
- You've reviewed and accepted the provider's data handling policies

**Key questions:**
- Is your data used to train future models? (Most enterprise plans: No)
- Where is data processed? (Important for GDPR, data residency)
- What's the retention period for your data?

**Anthropic enterprise:** Data is NOT used for training, 30-day retention, SOC 2 Type 2 certified.

---

## Private AI

**What it is:** AI hosted by a provider but in a dedicated, isolated environment — not shared with other customers.

**Models:**
- **Anthropic on AWS Bedrock:** Claude models on your AWS account, data stays in your region
- **Azure OpenAI:** GPT/Claude on Microsoft Azure, enterprise SLAs
- **Google Vertex AI:** Gemini on your GCP project

**Appropriate when:**
- Need data residency guarantees
- Existing compliance with cloud provider (AWS/Azure/GCP)
- Enterprise-scale usage

---

## On-Premises AI

**What it is:** AI infrastructure deployed and managed within your own data center or private cloud.

**Options:**
- **NVIDIA NIM:** Enterprise packaging of AI models for on-prem GPU clusters
- **Ollama + Open models:** Self-hosted open-source models (Llama, Mistral)
- **vLLM:** Production inference server for on-prem deployment

**Architecture:**
\`\`\`
Your data center
    ├── GPU cluster (A100/H100 or RTX 4090 for smaller scale)
    ├── Inference server (vLLM or NVIDIA NIM)
    ├── Open model (Llama 3.3 70B, Mixtral, etc.)
    └── API gateway (same interface as cloud APIs)
\`\`\`

**Appropriate when:**
- Regulatory requirements prohibit cloud processing (some finance, healthcare, government)
- Highest data sensitivity requirements
- Large enough scale to justify infrastructure cost

**Trade-offs:** High upfront cost (GPUs), ongoing ops burden, slightly lower model quality than frontier cloud models.

---

## Air-Gapped AI

**What it is:** AI deployed in a network with no internet connectivity whatsoever.

**Use cases:**
- Defense/intelligence (classified networks)
- Critical infrastructure
- High-security manufacturing

**Implementation:**
\`\`\`
Classified/isolated network
    ├── Air-gapped GPU server
    ├── Model weights transferred via approved media
    │   (CD/DVD/USB with chain of custody)
    ├── Inference server (vLLM or llama.cpp)
    └── Internal API for approved applications
\`\`\`

**Model selection for air-gap:**
- Must be open weights (can be downloaded and transferred)
- Llama 3.3 70B is typical choice — best open quality
- Smaller models (Phi-4 14B, Llama 3.2 11B) if GPU resources limited

**Key challenges:**
- Model updates require physical media transfer
- No internet means no web search tools
- Fine-tuning is complex (data must also be on-net)

---

## IP Protection

When using cloud AI, your inputs and outputs leave your organization. For IP-sensitive work:

**Don't send to cloud AI:**
- Unreleased product source code
- Proprietary algorithms
- Trade secrets
- M&A information
- Personnel data

**Alternatives:**
- Use on-prem/air-gapped AI for sensitive work
- Anonymize/synthesize data before sending to cloud AI
- Use general AI for the "how" (approach, patterns) without the specific IP

---

## Enterprise Security Controls

When deploying AI at enterprise scale:

\`\`\`
Access controls:
- SSO integration (SAML/OIDC) for who can use the AI
- Role-based permissions (who can access which data)
- Audit logging (every query, every response, every user)

Data governance:
- DLP (Data Loss Prevention) scanning on AI outputs
- Content filtering on both input and output
- PII detection and masking before sending to LLM

Network security:
- Private endpoints (no public internet routing for AI API calls)
- Traffic inspection / CASB for cloud AI usage
- IP allowlisting for on-prem AI servers
\`\`\`
` };
