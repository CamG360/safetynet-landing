# SafetyNet Project Brief — Generation Prompt (Red-Team Ready)

## How to use this

1. Paste the SafetyNet landing page content (and any other source material) into the INPUT section below.
2. Run this as a prompt in a generation session (any Claude model).
3. Take the resulting brief to Fable with an explicit instruction to red-team it — the closing "Red-Team Brief" section of the output gives Fable a starting angle of attack.

This prompt is domain-generic for a personal-safety app but not product-specific — reusable for future iterations of SafetyNet or a comparable product.

---

## PROMPT (copy everything below this line)

**Role:** You are converting a startup landing page into a structured project planning brief for a personal safety app. This brief will be handed to a separate adversarial review (Claude Fable) whose job is to stress-test the plan. Your job is not to make the plan look good — it is to make the plan *legible enough that gaps, unfounded assumptions, and risks are visible and attackable.*

**Ground rule:** For every claim you write, label it as one of:
- **Stated** — the source material says this directly
- **Inferred** — you're reading between the lines; say what you inferred and why
- **Absent** — the source material doesn't address this at all

Do not resolve an "absent" into a plausible-sounding "inferred." If the landing page is silent on something safety-critical, say so — that silence is exactly what a red-team needs to see.

**Input:**
```
[PASTE LANDING PAGE CONTENT HERE]
```

**Produce the brief with these sections, in this order:**

### 1. Problem & Target User
What problem, for whom, in what real-world scenario. Distinguish the stated user from any user the plan quietly assumes (e.g. marketed to "everyone" but implicitly designed for one demographic).

### 2. Core Concept & Mechanism
How the product actually works, not just what it promises. Flag any step in the "how" that's asserted but not explained.

### 3. Value Proposition & Differentiation
Why this vs. alternatives — named competitors *and* informal alternatives (calling a friend, phone OS safety features, sharing location via existing apps). Note whether differentiation is evidenced or just asserted.

### 4. Assumptions Register
An explicit, exhaustive list of load-bearing assumptions — behavioral ("users will pre-register contacts before a crisis"), technical, market, regulatory. This is the section Fable will attack hardest. Be exhaustive, not diplomatic — a short list here means the brief failed, not that the plan is assumption-free.

### 5. Threat Model / Misuse & Failure Scenarios
Mandatory for a personal-safety app. Cover:
- What happens when the app fails at the exact moment it's needed (dead battery, no signal, false negative)?
- What happens if it's misused (false alarms, stalking/surveillance misuse, coercive access by an abuser)?
- What is the blast radius of each failure mode — who's harmed, how badly, how would anyone know it happened?

### 6. Data, Privacy & Security
Mandatory. What data is collected (location, contacts, biometric?), who can access it, retention period, third-party sharing, regulatory exposure (e.g. GDPR for UK/EU users). If the source is silent on any of these, write "absent" — do not infer a safe-sounding default.

### 7. Dependencies
Technical (APIs, OS permissions, carrier/network reliability), third-party (any emergency-services integration?), regulatory, operational (who monitors/supports this, and when).

### 8. Success Criteria & Failure Definition
What "working" means, quantified where possible. Separate product failure, business failure, and safety failure — these are not the same thing and collapsing them hides risk.

### 9. Open Questions / Known Gaps
Everything a red-team would need answered that the source material doesn't cover. List these as gaps — do not fill them in.

### 10. Red-Team Brief (addressed directly to Fable)
Close with the 3–5 specific things you most want stress-tested, e.g. "attack the assumption in §4 that users pre-register emergency contacts before a crisis," "attack the blast radius of the false-negative failure mode in §5."

**Formatting constraint:** Bullet points over prose. This is a working planning document, not a pitch — no marketing polish.

---
<metadata>

― Reference ―
Title:      SafetyNet Project Brief — Generation Prompt
Artifact:   Prompt
Definition: A reusable prompt that specifies the mandatory structure of a SafetyNet-type project planning brief, designed to produce red-team-ready output (stated/inferred/absent labeling, explicit assumptions register, threat model) for adversarial review by Fable.
Logic Path: Product/ SafetyNet/ Planning Brief Prompt
Filepath:   /outputs/safetynet-project-brief-prompt.md

― Purpose ―
Purpose:    Ensure the landing page's marketing framing gets converted into a brief that survives adversarial red-teaming, rather than a restated pitch
Objective:  Specify every section a SafetyNet planning brief must cover, with explicit assumption/threat-model/data-privacy requirements
Outcome:    Running this prompt against source material produces a brief Fable can meaningfully attack, with gaps surfaced rather than smoothed over

― Quality ―
Preparer:   C1
Reviewer:   Pending
Confidence: 20% (draft) (do not change unless instructed)#constraint
Tested:     0
Testing notes: Not yet run against actual landing page content or reviewed by Fable.

― Classification ―
Level:      L2 (Operational/ Standards)

― Version ―
Timestamp:  #ver 15/07/26

</metadata>
