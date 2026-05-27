```
<metadata>
Title:       SafetyNet — Context Brief
Artifact:    Working paper
Level:       L1
Filepath:    Claude Projects › SafetyNet
Preparer:    C1
Definition:  Single source of truth for SafetyNet AI context — product, owner, strategy, landing page, and working principles. Supersedes safetynet-context-brief_0928.240526.md and SAFETYNET_PROFILE_110526.md.
Timestamp:   v3.0000.27/05/26
</metadata>
```

# SafetyNet — Context Brief
*Version 3.0 | May 2026 | For Claude Project Knowledge*

---

## What SafetyNet Is

A personal safety platform built around an automatic alert mechanism — a dead man's switch in plain language. Two core features. Nothing else at MVP.

| Feature | What it does |
|---------|-------------|
| **Check-in mechanism** | User sets a check-in window. Miss it → emergency contacts notified with pre-set message and location. Timer-based. Works even when the user can't act — phone dead, broken, or confiscated. |
| **Vault** | Sensitive documents stored securely. Released to emergency contact if check-in alert triggers. "Safety deposit box you don't have to tell anyone about." |

Core positioning: **"SafetyNet sends the alert for you."**

Explicit differentiators: not GPS tracking, not emergency services, not a panic button.

---

## Owner

**Campbell (Cam) McCord** — CA-qualified (NZ/AUS/UK). Background in financial services risk, governance, and regulatory work (EY, PwC). Non-technical founder. Building solo with AI tools (Claude Code, Cursor) after two developer cycles that did not deliver.

Working style:
- Thinks in frameworks and diagnostics. Expects the same from AI.
- Define Done before starting any task. State what done looks like before writing code.
- Direct. No hedging. No over-explanation.
- ADHD wiring — strip-down structure works. Complex outputs are earned through dialogue, not pre-loaded.
- If something is unclear, ask one question. Not five.

---

## UX Problem Frame

SafetyNet is a modernised personal-safety dead man's switch adapted for everyday situations. The category has three structural UX problems:

1. Most users do not understand the concept immediately
2. Explaining the mechanics upfront creates cognitive friction
3. Most users do not realise the safety gap exists until it is pointed out

The current priority challenge is therefore **not** feature explanation, workflow education, or technical understanding.

The current priority challenge is: **helping users recognise a safety gap they already have, but have never consciously identified.**

Users must first realise: *"My current safety tools fail if I cannot use my phone."*

Only after that realization do the mechanics become intuitive. All copy, structure, and sequencing decisions flow from this.

---

## Current State (as of May 2026)

- **Live landing page:** safetynetbeta.com
- **Active sprint:** 14-day demand validation sprint (6–20 May 2026)
- **Success criterion:** 100 sign-ups (proxy for validated demand)
- **Stack:** HTML/Tailwind landing page, Vercel deployment, GitHub version control, Supabase (email capture + edge functions), Cloudflare Turnstile, Plausible analytics
- **Waitlist CTA:** "Get Early Access" — email capture only, no payment
- **Demo:** Alert demo modal live on site (`modals/alert-demo.html`)
- **Build approach:** Solo Claude Code-assisted build. No active developer.
- **Developer history:** Two developer cycles (including one with Pete). Both exited. Codebase ownership with Cam.

---

## MVP Scope

### In Scope
- Check-in mechanism (timer, alert, emergency contact notification)
- Vault (secure document storage, conditional release)
- In-product feedback mechanism (day one, not bolted on later)

### Out of Scope (do not build, do not suggest)
- Apple Watch app
- Android / iOS companion apps
- WhatsApp notifications
- Google / Apple SSO
- Premium tier for HNW individuals
- Anything not on the in-scope list above

---

## Hypotheses Being Tested

| # | Hypothesis | Signal |
|---|-----------|--------|
| H1 | SafetyNet MVP demonstrates enough value that users sign up and engage | Signups, usage, feedback quality |
| H2 | Solo AI-assisted build is viable for a non-technical founder | Build progress, documentation quality, maintainability |

---

## Target Market

- **Primary:** Women, urban dating contexts, 25–40
- **Acquisition channel:** TikTok (primary), faceless content only
- **Account setup:** Pending
- Women only for initial market — all creative direction shaped by this

---

## Product: How It Works (as built)

User sets a check-in time and emergency contacts. If they don't check in, SafetyNet automatically sends an alert. The alert includes: missed check-in time, plan context (e.g. "Date with James"), location (e.g. "The Bluebird Cafe, 14 Market St"), and instructions for the contact (call them, go to location, call emergency services if needed).

---

## Landing Page: User Flow

Visitor journey through safetynetbeta.com (section order as built):

| # | Section | Anchor | What It Does |
|---|---|---|---|
| 1 | Nav | — | Overview · How it Works · Examples · Our Story · FAQ · "Get Early Access" CTA |
| 2 | Hero | `#hero` | Headline + subheadline + 3 trust badges + primary "Get Early Access" CTA |
| 3 | Problem / Overview | `#problem` | Establishes the gap: "Text me when you're safe" fails when you can't text |
| 4 | How it Works | `#concept` | 3-step flow — "Create your SafetyNet in under a minute" + "See what your contacts receive" → opens alert demo modal |
| 5 | Examples | `#examples` | 3 use-case cards (Solo Travel + 2 others) — "Live your life. We've got your back." |
| 6 | First Reactions | `#beta-feedback` | Social proof / testimonials — "I never thought about what would happen if I couldn't reach my phone." |
| 7 | Comparison | `#comparison` | "More than just a dot on a map" — differentiates from location-sharing apps (Find My Friends, Life360) |
| 8 | Our Story | `#our-story` | Founder narrative |
| 9 | FAQ | `#faq` | 5 category tabs: Getting Started · How It Works · Privacy & Security · Why SafetyNet · Launch & Pricing |
| 10 | Footer | `#footer` | Secondary "Get Early Access" CTA + product/company links + Privacy Policy + Terms |

**Modals (overlay, not sections):** Alert Demo · Registration (email capture) · Privacy Policy · Terms of Service

---

## Landing Page: Key Value Items

Core claims and proof points as stated on the page:

| Value Item | Copy / Evidence |
|---|---|
| Automatic alerts | "SafetyNet sends an alert for you" — fires even when user can't act |
| Works without phone | Alert sent by servers, not device — dead battery, no signal, phone confiscated all covered |
| Zero tracking | No background GPS — monitoring timer runs server-side; no battery drain |
| Plans stay private | Safety info only shared with contacts if alert triggers |
| No app required for contacts | Emergency contacts receive alerts via SMS or email — no download needed |
| Fast setup | "Create your SafetyNet in under a minute" |
| False alarm protection | Reminders before alert + customisable extra time + one-tap cancel |
| Actionable alert | Alert includes: plan context, location, step-by-step instructions — not just a notification |
| Differentiation | "Location sharing apps aren't safety apps" — explicit contrast with Find My Friends / Life360 |
| Social proof | "I have five tracking apps. I just realised none of them help if I can't reach my phone." |

---

## User Voice

*First reactions from user interviews. Pre-launch — not product reviews.*

**Core problem**
> "I never thought about what would happen if I couldn't reach my phone. Now I can't stop thinking about it. I'm in."
> — Michael, Solo Traveller • Leon, France

**Why existing tools don't cover this**
> "I have five tracking apps. I just realised none of them help if I can't reach my phone."
> — Zolania, Student • London, UK

**The contact's side**
> "I just want to know if something's wrong — without the back-and-forth of 'text me when you're home.' I'm too busy for that."
> — Catherine, Mother & Business Owner • Houston, USA

**Privacy (Vault anchor)**
> "My private plans stay private until I get in trouble — that's the balance I need."
> — Julie, Student • San Diego, USA

*Full testimonial universe: SafetyNet_OS vault — `04_Validation/Feedback/testimonial-universe_270526.md`*

---

## Locked Design & Copy Decisions

| Element | Decision |
|---|---|
| Hero headline | "Your silent safeguard for everyday life" |
| Sub-headline | "Text me when you're safe" fails when you can't text. / SafetyNet sends an alert for you. |
| Trust badges | Automatic alerts · Zero tracking · Your plans private |
| UI card text | "Connected to emergency contacts" |
| Visual metaphor | Full sphere (node-network, teal) — not hemisphere/dome |
| Privacy symbol ranking | Lock (1st), eye-slash (2nd), sealed envelope (3rd) |
| Hero image | `CitystreetdateOnightout_GPT_2253_140526.png` — woman, date-night, city street, full sphere, correct card |
| Hero architecture | Full-bleed background image (rebuild from contained card format) |
| Timer/privacy features | De-prioritised from hero |

---

## Visual Identity

- "Vigil Architecture" concept
- Electric blue palette, radar/dome metaphor, monitoring system aesthetic
- AI-generated video (Seedance 2.0) preferred over stock footage (stock rejected on quality grounds)
- Image brief criteria: urban date-night · confidence not fear · full sphere · legible card · visible face · production-ready

---

## Open Items

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | Hero rebuild | 🔲 Blocked | Full-bleed rebuild via Claude Code. Sequence: Cowork → index repo → copy image → Claude Code |
| 2 | TikTok account setup | 🔲 Not started | Required before Video 1 can be published |
| 3 | TikTok Video 1 | 🔲 Not started | 5 scripts ready; produce via Seedance 2.0 in CapCut; faceless only |
| 4 | Demand sprint — 100 sign-ups | ⚠️ In progress | Gate criterion before further build investment |
| 5 | Landing page rebrand | ⚠️ Validation-first | Current version flagged as too blue / generic |
| 6 | User flows and wireframes | 🔲 Pending | Inventory required — confirm what's current before rebuilding |
| 7 | Unit economics | 🔲 Pending | Cost per user/month must be modelled before launch |

---

## How to Work

1. **Define Done first.** Before writing any code or making any change, state what done looks like. One sentence. Then proceed.
2. **Stay in scope.** If something is out of scope, say so and stop. Do not build it.
3. **Flag the stack.** If a decision is required, surface it as a decision — do not assume.
4. **Document as you go.** Cam is the sole operator. Every function, file, and decision needs to be readable without context. Write it as if you will not be in the next session.
5. **No planning high.** If you find yourself designing architecture instead of moving code, stop. Ask: "Is this a problem I'm having, or a problem I'm imagining?"
6. **Validation before build.** Problem validation complete; demand sprint before scaling.
7. **"Building on blocks rather than sand."** Decisions locked in sequence before generation or implementation.
8. **Iteration sequence:** brief → requirements → generation → assessment → implementation.
9. **Brevity and precision non-negotiable.** Tables over prose for comparisons.

---

## Tools & Resources

| Tool | Purpose |
|---|---|
| OpenAI Pro (GPT Images) | Hero image generation |
| CapCut + Seedance 2.0 | AI video production |
| Claude Code | Landing page implementation |
| Vercel | Deployment |
| GitHub | Version control |
| Cowork | File indexing / repo location |
| Claude Design | UI/UX design (claude.ai/design) |
| Windows / PowerShell | Dev environment |

---

## Key Diagnostic

> *"Did something actually move, or did I just feel like it did?"*

If a session ends without a file written, a function built, or a decision made — it didn't move.

---

*Update this brief when: hero rebuild is complete · TikTok goes live · demand sprint concludes · major product or positioning decisions are made.*
