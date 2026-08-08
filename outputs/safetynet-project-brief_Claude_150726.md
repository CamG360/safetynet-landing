# SafetyNet — Project Planning Brief (Red-Team Ready)

*Generated from: `index.html` (safetynetbeta.com) + `docs/context/safetynet-context-brief_270526.md`*
*Produced: 2026-07-15 | For adversarial review by Fable*

---

## 1. Problem & Target User

**Stated problem:**
- "Text me when you're safe" fails when the user cannot reach their phone (dead battery, no signal, phone confiscated, phone broken)
- Existing safety tools (Find My Friends, Life360) fail silently — contacts see a stopped dot, not an alert
- In a crisis, the user may be unable to call for help — so the alert must be pre-configured and server-initiated

**Stated target user:**
- General framing: anyone in everyday situations with a safety risk (solo travel, dating, marketplace sales)
- Three example use-cases on the page: Solo Travel, Modern Dating, Marketplace Sales

**Inferred target user (from context brief, not landing page):**
- Primary: women, urban dating contexts, 25–40
- Acquisition channel: TikTok, faceless content only
- Inference: all creative direction and copy defaults to this demographic even though the landing page markets to "everyone"

**Absent:**
- No stated geography — FAQ uses UK emergency services code "999" in one example but this is never confirmed as the primary market
- No stated minimum age
- No stated consideration for domestic violence / coercive control contexts — a structurally high-risk user group for this category
- No stated consideration for users with disabilities (cognitive, physical) who may face different failure modes

---

## 2. Core Concept & Mechanism

**Stated:**
- User sets a check-in time and adds emergency contact(s) with plan context (who, where, what to do if alert fires)
- Server-side countdown timer runs independently of the user's device
- If user doesn't check in by the deadline → alert fires to contacts via SMS and email
- Reminders sent before deadline
- Customizable extra time built in (grace period)
- One-tap cancel if alert fires incorrectly
- Emergency contacts receive no app download requirement — SMS/email only
- Contact gets a one-time confirmation message before being registered

**Asserted but not explained (mechanism unclear):**
- How the server-side timer is structured — "our servers" is the only description; no detail on infrastructure, provider, redundancy
- What "customizable extra time" means operationally — is it set at creation or extendable at the moment the alert is about to fire?
- How the cancel-alert flow works — specifically, whether the cancel button is accessible on a locked phone, or requires authentication
- How location is attached to the alert — the examples show a static address entered at setup (e.g. "The Bluebird Cafe, 14 Market St"), not a live GPS coordinate; but this is never explicitly stated
- How the Vault works — mentioned in context brief as a core MVP feature (conditional document release on alert trigger); entirely absent from the landing page

**Absent:**
- Authentication mechanism — no mention of login, 2FA, or account security
- What happens if a contact declines the consent request
- What happens if a contact unsubscribes from SMS (regulatory opt-out)
- Whether multiple contacts can be added to a single SafetyNet
- What the alert content looks like in full (demo modal exists but is loaded dynamically — content not extractable from HTML)

---

## 3. Value Proposition & Differentiation

**Stated differentiation vs. location-sharing apps (Find My Friends, Life360):**
- Standard apps fail silently when phone dies; SafetyNet server fires automatically — **stated**
- Location apps show where you are; SafetyNet tells contacts when you're not safe and what to do — **stated**
- No background GPS → no battery drain — **stated**
- Contacts receive contextual info and action instructions, not just a location dot — **stated**

**Stated differentiation vs. manual safety check ("text me when you're safe"):**
- No action required from user at trigger time — automatic — **stated**
- Contact doesn't need to ask or chase — **inferred from product mechanic**

**Absent — direct competitors not acknowledged:**
- **Kitestring** (kitestring.io): near-identical dead-man's switch mechanic; predates SafetyNet; not mentioned anywhere
- **bSafe**: direct personal-safety app with check-in, live following, SOS — not mentioned
- **Noonlight**: panic button + monitoring center — not mentioned
- **Circle of 6**: personal-safety app for assault prevention contexts — not mentioned
- **iOS Safety Check** (iOS 16+): built-in Apple safety tool for DV situations — not mentioned
- **iOS Crash Detection / Fall Detection** (Apple Watch, iPhone 14+): automatic emergency contact on detected crash — not mentioned
- **Google Personal Safety**: Android equivalent — not mentioned

**Differentiation evidenced vs. asserted:**
- The core differentiator (server-fires-when-you-don't-check-in) is architecturally real and described — **evidenced in principle**
- No evidence that the contextual alert (plans + instructions) is implemented or tested — **asserted, product not built**
- No evidence that differentiation is defensible — a copy of this feature in an existing app (Apple, Google, Life360) would neutralize it

---

## 4. Assumptions Register

**Behavioral:**
- A1. Users will proactively set up a SafetyNet *before* entering the dangerous situation — the product cannot be activated retroactively
- A2. Users will remember to activate a SafetyNet on any given occasion where it would be relevant — the tool is opt-in per trip, not persistent
- A3. Users will set a realistic check-in time — too conservative → false alarms; too generous → delayed response
- A4. Emergency contacts will accept the consent request and remain reachable at the time an alert fires
- A5. Emergency contacts will act on the alert when received — the product has no escalation path if they don't respond
- A6. The instructions in the alert are actionable enough that contacts know what to do without additional context
- A7. Users in genuine distress will have set up a SafetyNet in advance — the product only covers situations the user anticipated
- A8. Users will trust the app with sensitive plan details (who they're meeting, location) despite an unclear data posture
- A9. Users will not set and forget — i.e., they will check in when safe, keeping false alarm rates manageable

**Technical:**
- T1. SMS and email are reliable enough to serve as safety-critical delivery channels (SMS is ~95–98% delivery, not guaranteed; email is lower and subject to spam filtering)
- T2. Server uptime is sufficient for safety-critical use — acknowledged as a risk in FAQ but no SLA stated and no mitigation described
- T3. Location entered at setup is accurate and useful to contacts at alert time — static entry, not live GPS
- T4. A solo non-technical founder with AI tooling can build to production-grade reliability standards required for a safety product

**Market:**
- M1. 100 sign-ups in a 14-day sprint is a valid proxy for demand and willingness to use the product in safety-critical scenarios
- M2. TikTok is the right acquisition channel for the primary demographic
- M3. The target demographic will use an app for safety purposes rather than informal alternatives (iOS Safety Check, calling a friend)
- M4. "Free forever" plan is sustainable — unit economics not modelled

**Regulatory:**
- R1. Operating an automated alert service to civilians is permissible in the UK without triggering emergency-dispatch regulation
- R2. Collecting and storing third-party contact data (non-users' phone numbers and emails) is GDPR-compliant under the current data posture
- R3. Operating a personal-safety service does not create a statutory duty of care or tort liability when the service fails and a user is harmed

---

## 5. Threat Model / Misuse & Failure Scenarios

### App fails at the exact moment it's needed

**F1 — Server outage / alert not sent**
- User doesn't check in; server fails to fire alert
- Blast radius: user in danger, no one knows, no escalation path
- Detection: only if contact independently reaches out
- Stated in FAQ limitations ("no system is 100% foolproof") — no mitigation or fallback described

**F2 — SMS/email delivery failure**
- Alert fires from server but SMS gateway drops it or email goes to spam
- Blast radius: same as F1 — zero-coverage failure
- No fallback channel described beyond "SMS and email"

**F3 — Contact unreachable / alert not acted on**
- Alert delivered but contact's phone is off, they're asleep, or they ignore it
- No escalation path (no second contact, no emergency services notification)
- Blast radius: alert sent, no response, no way for the system to know

**F4 — Structural gap: danger arrives before setup window**
- User is attacked or incapacitated immediately on arrival, before the check-in window opens
- SafetyNet provides zero coverage in this scenario — it is a structural limitation, not a bug
- The product's positioning ("protects you when you can't protect yourself") is technically true but doesn't cover the full risk surface

**F5 — Check-in window too generous**
- User sets a 4-hour window for a 30-minute meeting; danger occurs at the start
- Hours pass before alert fires; response too late
- No guidance on window sizing; no system nudge toward appropriate window length

### Misuse

**M1 — Abuser/stalker as emergency contact**
- User is coerced or deceived into adding an abusive partner as their emergency contact
- Alert delivers plan context, location, and instructions directly to the threat
- Blast radius: product's core function weaponized against the user; victim's safety information handed to their attacker
- No design guardrail exists for this scenario

**M2 — Attacker cancels the alert**
- User's phone is taken but not destroyed; attacker is present when the app is unlocked
- One-tap cancel allows attacker to suppress the alert before contacts act
- The cancel feature, designed to reduce false alarms, becomes a suppression mechanism
- No authentication required for cancel (inferred from "one-tap" description)

**M3 — Alarm fatigue via repeated false alarms**
- User (or attacker in M2) repeatedly triggers and cancels alerts
- Contacts learn to ignore SafetyNet notifications
- When a genuine alert fires, it's treated as another false alarm

**M4 — Contact misuses plan details**
- Alert contains who you're meeting, where, and what to do — sensitive personal data
- Contact could use this information for purposes beyond responding to the alert
- No data minimization on the contact's side; no instruction to contacts about confidentiality

---

## 6. Data, Privacy & Security

**Stated:**
- No continuous location tracking — **stated**
- No background data collection — **stated**
- Data stored: check-in times, emergency contacts, custom messages — **stated**
- Data not sold — ever — **stated**
- "Industry-standard encryption" — **stated, future tense ("will include")**
- "Reliable cloud infrastructure with backup systems" — **stated, future tense**
- "Multi-channel alert delivery" — **stated, future tense**
- Plans/location shared with contacts only when alert triggers — **stated**

**Absent:**
- Data retention period for check-in records, alert history, contact information — **absent**
- Third-party data sharing: by definition, the SMS gateway provider receives contact phone numbers; this sharing is never disclosed — **absent**
- GDPR / UK GDPR lawful basis for processing user data — **absent**
- GDPR / UK GDPR lawful basis for processing emergency contact data (third parties who have not consented to be in the platform) — **absent**
- Data storage jurisdiction — **absent**
- What happens to data if Acorn 360 Ltd closes or is acquired — **absent**
- Breach notification protocol — **absent**
- Account takeover protection (2FA, session management) — **absent**
- Vault data: how documents are encrypted, who can access them, under what conditions they are released — **absent from landing page**; this is a stated MVP feature per context brief
- Whether plan context (name of person you're meeting, venue) is classified as sensitive personal data under UK GDPR — **absent**

---

## 7. Dependencies

**Technical:**
- SMS gateway provider: unnamed; critical path for alert delivery; single point of failure
- Email delivery provider: unnamed; secondary channel; subject to spam filtering
- Supabase (from context brief): backend database, edge functions, email capture
- Vercel: deployment platform
- Cloudflare Turnstile: bot protection on registration
- Push notifications: requires OS permission at setup; referenced in FAQ as optional for contacts
- Internet connection: explicitly required at setup time; alert server-side but setup is not offline-capable

**Third-party / integration:**
- No emergency services integration — explicitly stated as out of scope
- No integration with statutory safety infrastructure (police, ambulance, 999/112/911)
- Alert reaches only the contacts the user pre-registered — no institutional escalation path

**Regulatory:**
- Acorn 360 Ltd (UK company) — subject to UK GDPR, UK Consumer Duty, potentially FCA if categorized as a financial service (unlikely but worth checking if vault handles financial documents)
- If users are in the EU: EU GDPR applies
- If users are in California: CCPA/CPRA applies
- Automated messaging to non-subscribers (contacts): subject to UK/EU ePrivacy Directive / PECR

**Operational:**
- Solo non-technical founder; no on-call engineer; no 24/7 support coverage
- No stated SLA for uptime — acknowledged in FAQ, unquantified
- No stated incident response plan
- No stated monitoring or alerting for service health

---

## 8. Success Criteria & Failure Definition

**Product success (stated):**
- 100 sign-ups (email captures) in 14-day demand validation sprint
- H1: SafetyNet demonstrates enough value that users sign up and engage

**Product failure (stated):**
- Fewer than 100 sign-ups → demand not validated → no further build investment

**Safety failure (absent — not defined anywhere):**
- No explicit definition of what constitutes a safety failure
- No threshold for acceptable false-positive rate (false alarms per user per month)
- No threshold for acceptable false-negative rate (alert not sent when it should be)
- No criteria for when the service should be taken offline due to unreliability
- No incident classification framework

**Business failure (largely absent):**
- Unit economics: not modelled (flagged as open item in context brief)
- No stated cost per user per month
- "Free forever" plan: no path to sustainable revenue articulated
- No stated break-even sign-up volume or revenue target

**Structural conflation risk:**
- 100 sign-ups = demand signal, not a product safety signal
- A user can sign up out of interest and never activate SafetyNet in a real scenario
- The validation sprint cannot distinguish "this product seems useful" from "I would actually stake my safety on this"

---

## 9. Open Questions / Known Gaps

- Q1. What SMS gateway is used, what is its stated delivery SLA, and what is the fallback if it fails?
- Q2. What exactly is "customizable extra time" — how is it set, what is the default, and can it be extended after the check-in window opens?
- Q3. Does the one-tap cancel require authentication? What prevents an attacker holding the user's unlocked phone from cancelling the alert?
- Q4. What happens if an emergency contact declines the consent request or later unsubscribes from SMS?
- Q5. What data retention policy applies to check-in records, alert history, and contact information?
- Q6. What GDPR lawful basis covers processing emergency contact data — data subjects who never consented to being enrolled in the platform?
- Q7. What is Acorn 360 Ltd's jurisdiction for data processing, and what regulatory framework governs the automated messaging to contacts?
- Q8. Does the product create a duty of care? What is the legal liability exposure if a SafetyNet alert fails to fire and a user is harmed?
- Q9. How does the Vault work — encryption at rest, access mechanism, conditions for release, who holds the decryption key?
- Q10. What is the uptime target for alert delivery, and what is the incident response plan when the target is breached?
- Q11. Kitestring offers near-identical functionality. What is the specific, evidenced differentiation that makes SafetyNet defensible?
- Q12. What is the design response to M1 (abuser-as-contact) — is there any guardrail, or is this out of scope?
- Q13. Can multiple contacts be added to a single SafetyNet? What is the escalation order if the first contact doesn't respond?

---

## 10. Red-Team Brief — For Fable

**1. Attack A1: behavioral assumption that users set up SafetyNet before the dangerous situation**
The entire product is opt-in per trip. Attack the evidence that the primary target demographic (women, first dates, 25–40) will consistently remember and bother to activate a SafetyNet before each relevant situation — and what fraction of real dangerous situations are covered by a product that requires pre-registration and forethought.

**2. Attack F1–F3: the "works even when your phone is dead" claim**
The server fires the alert — but the failure chain (server outage → SMS delivery failure → contact doesn't respond → no escalation) is unbroken. Attack the claim that server-side initiation meaningfully reduces the probability of a complete coverage failure, given that the user has no way to verify the service is working at the moment they need it.

**3. Attack M1 + M2: coercive control misuse**
The product's core mechanic delivers the user's location, plans, and instructions to whoever they designated as a contact. Attack whether any design element prevents an abusive partner from being the designated contact, and whether the one-tap cancel is an active suppression mechanism in a coercive situation. This is the highest blast-radius misuse scenario.

**4. Attack the differentiation claim vs. Kitestring**
Kitestring (and functionally equivalent services) have existed for over a decade. Attack whether SafetyNet's claimed differentiation (contextual alert, action instructions, no-app-for-contacts) is evidenced in the product (pre-launch), defensible against copies, and sufficient to win against a service that is already free and established.

**5. Attack R2/R3: regulatory and liability exposure**
SafetyNet collects third-party contact data (phone numbers and emails of non-users who have not signed a privacy policy or terms of service with Acorn 360 Ltd). It also makes implicit reliability guarantees in a safety-critical context. Attack whether the current data posture is UK GDPR-compliant, and whether operating this service exposes Acorn 360 Ltd to liability in the event of a safety failure — especially given the "no system is 100% foolproof" disclaimer already in the FAQ.

---

<metadata>

― Reference ―
Title:      SafetyNet — Project Planning Brief (Red-Team Ready)
Artifact:   Planning brief
Definition: Structured brief generated from safetynetbeta.com landing page and context brief, using the SafetyNet Project Brief Generation Prompt. Uses stated/inferred/absent labeling throughout. Intended for adversarial review by Fable.
Logic Path: Product/ SafetyNet/ Planning Brief
Filepath:   outputs/safetynet-project-brief_150726.md
Source:     index.html (safetynetbeta.com) + docs/context/safetynet-context-brief_270526.md
Prompt:     outputs/safetynet-project-brief-prompt.md

― Purpose ―
Purpose:    Surface gaps, unfounded assumptions, and risks in the SafetyNet plan before further build investment
Objective:  Give Fable a legible, attackable brief — not a restated pitch
Outcome:    Red-team identifies highest-risk assumptions before validation sprint concludes

― Quality ―
Preparer:   C1
Reviewer:   Pending (Fable)
Confidence: 70% (generated from available source material; gaps are documented as absent, not filled)
Tested:     0

― Classification ―
Level:      L1 (Operational)

― Version ―
Timestamp:  #ver 15/07/26

</metadata>
