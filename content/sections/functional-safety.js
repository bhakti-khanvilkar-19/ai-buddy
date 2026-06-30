SECTION_CONTENT['functional-safety'] = { default: `
# Functional Safety & AI

## The Challenge

Functional safety standards were written for deterministic systems. AI — which is probabilistic, opaque, and can behave unexpectedly — creates genuine tension with these requirements.

This is one of the most important open problems in AI engineering.

---

## ISO 26262

**Standard for:** Functional safety of road vehicles.
**Defines:** ASIL (Automotive Safety Integrity Level) A through D.

| ASIL | Severity | Exposure | Controllability |
|---|---|---|---|
| QM (no ASIL) | Any | Any | Easy |
| ASIL A | Low | Low | Easy |
| ASIL B | Medium | Medium | Some difficulty |
| ASIL C | High | High | Difficult |
| ASIL D | Life-threatening | High | Uncontrollable |

**AI and ISO 26262:**
- Perception systems (cameras, lidar) classified as ASIL B-D
- AI-based perception must be validated for ASIL requirements
- Traditional requirements like MCDC (Modified Condition/Decision Coverage) don't apply to neural networks
- ISO 26262:2018 introduced Annex D for highly automated driving but doesn't fully address AI

**Emerging standard:** ISO PAS 8800 addresses AI-specific safety requirements for vehicles.

---

## ASPICE

**Automotive SPICE (Software Process Improvement and Capability dEtermination)**

A process framework for automotive software development. Defines maturity levels (1-5) for:
- Requirements engineering
- Software design
- Implementation
- Testing and integration
- Change management

**How AI fits:**
\`\`\`
Traditional ASPICE cycle:
Requirements → Design → Implementation → Verification → Validation

For AI:
Use case → Data collection → Training → Validation → Deployment → Monitoring

The training step doesn't fit neatly into traditional ASPICE processes.
AI-Augmented ASPICE (ongoing standardization work) is addressing this.
\`\`\`

---

## Safety-Critical Development Principles

These principles apply regardless of standard:

### 1. Defense in Depth
Never rely on a single safety mechanism. Multiple independent layers:
\`\`\`
AI perception → Rule-based plausibility check → Hardware safety monitor → Mechanical failsafe
\`\`\`

### 2. Fail-Safe
When something goes wrong, the system goes to a known safe state:
\`\`\`
AI perception fails → Vehicle slows and requests driver intervention
(not: vehicle stops suddenly causing accident)
\`\`\`

### 3. Freedom from Interference
A failure in one part of the system cannot corrupt a safety-critical part:
\`\`\`
AI feature (QM) must not be able to override ASIL D braking system
Memory partitioning, hypervisors, and hardware isolation implement this
\`\`\`

### 4. ALARP (As Low As Reasonably Practicable)
Risk must be reduced to the lowest level that is reasonably achievable.

---

## Verification

**Traditional software:** You can prove correctness from requirements + code.

**AI systems:** You can't prove correctness from the model — you can only test behavior on known inputs.

**Verification approaches for AI:**

| Method | What it checks | Limitation |
|---|---|---|
| **Test coverage** | Performance on known test data | Distribution shift |
| **Adversarial testing** | Robustness to edge cases | Can't test all adversarial inputs |
| **Formal verification** | Mathematical proof of properties | Only works for small, structured models |
| **Runtime monitoring** | Behavior in production | Can only detect, not prevent |
| **Shadow mode** | AI runs but doesn't control | Detects some issues before deployment |

---

## Validation

Validation answers: "Does this system do the right thing in the real world?"

For AI in safety-critical systems:

**Operational Design Domain (ODD):** Define precisely the conditions under which the AI is validated to operate:
\`\`\`
ODD example for a lane-keeping system:
- Highway driving only (not city streets)
- Clear lane markings visible
- Daylight or well-lit conditions
- No precipitation
- Speed 40-130 km/h
- Straight or gentle curves (radius > 500m)
\`\`\`

Behavior outside the ODD requires human intervention or system disengage.

---

## AI's Role in Functional Safety Development

Beyond being the *subject* of safety analysis, AI is a powerful *tool* for safety engineering:

**FMEA generation:**
\`\`\`
"Generate a Failure Mode and Effects Analysis for an automotive
radar sensor used for adaptive cruise control.
Cover: sensor failures, processing failures, environmental factors.
Format: FMEA table with Failure Mode, Effect, Cause, Detection, RPN."
\`\`\`

**Requirements review:**
\`\`\`
"Review these safety requirements for completeness and consistency.
Check for: ambiguous terms, missing test criteria, conflicting requirements.

[paste requirements]"
\`\`\`

**Test case generation:**
\`\`\`
"Generate edge case test scenarios for an ASIL B lane departure warning system.
Focus on: marginal marking visibility, temporary road markings, construction zones."
\`\`\`

**Hazard analysis:**
\`\`\`
"Perform a preliminary hazard analysis for adding an AI-based predictive
maintenance feature to an ASIL B automotive gateway ECU.
Identify potential interference with existing safety functions."
\`\`\`
` };
