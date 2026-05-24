```
<metadata>
Title:       SafetyNet — Context Brief
Artifact:    Working paper
Level:       L1
Filepath:    Claude Projects › SafetyNet
Preparer:    [confirm — C1 · G1 · VS · AG · H]
Confidence:  [confirm — 20% · 40% · 60% · 80% · 100%]
Definition:  Project context brief for SafetyNet — single source of truth for Claude Project Knowledge; not a strategy document or task list
Timestamp:   v2.0000.24/05/26
</metadata>
```

# SafetyNet — Context Brief
*Version 2.0 | May 2026 | For Claude Project Knowledge*

---

## What SafetyNet Is

A personal safety app built around an automatic alert mechanism — a dead man's switch in plain language. If a user fails to check in, SafetyNet sends an alert to their emergency contacts automatically. Core positioning: **"SafetyNet sends the alert for you."**

Explicit differentiators: not GPS tracking, not emergency services, not a panic button. It works even when the user can't act — phone dead, broken, or confiscated.

---

## Current State (as of May 2026)

- **Live landing page:** safetynetbeta.com
- **Active sprint:** 14-day demand validation sprint (6–20 May 2026)
- **Success criterion:** 100 sign-ups (proxy for validated demand)
- **Stack:** HTML/Tailwind landing page, Vercel deployment, GitHub version control, Supabase (email capture), Cloudflare Turnstile, Plausible analytics
- **Waitlist CTA:** "Get Early Access" — email capture only, no payment
- **Demo:** Alert demo modal live on site (`modals/alert-demo.html`)

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

## Open Items

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | Hero rebuild | 🔲 Blocked | Full-bleed rebuild via Claude Code. Blocked: correct repo not located. Sequence: Cowork → index repo → copy image → Claude Code |
| 2 | TikTok account setup | 🔲 Not started | Required before Video 1 can be published |
| 3 | TikTok Video 1 | 🔲 Not started | 5 scripts ready; produce via Seedance 2.0 in CapCut; faceless only |
| 4 | Demand sprint — 100 sign-ups | ⚠️ In progress | Gate criterion before further build investment |

---

## Visual Identity

- "Vigil Architecture" concept
- Electric blue palette, radar/dome metaphor, monitoring system aesthetic
- AI-generated video (Seedance 2.0) preferred over stock footage (stock rejected on quality grounds)
- Image brief criteria: urban date-night · confidence not fear · full sphere · legible card · visible face · production-ready

---

## Working Principles

- Validation before build — problem validation complete; demand sprint before scaling
- "Building on blocks rather than sand" — decisions locked in sequence before generation or implementation
- Cam's communication style: direct, stream-of-consciousness; expects Claude to synthesise into structured outputs
- Iteration sequence: brief → requirements → generation → assessment → implementation
- Brevity and precision non-negotiable; tables over prose for comparisons

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
| Windows / PowerShell | Dev environment |

---

*Update this brief when: hero rebuild is complete · TikTok goes live · demand sprint concludes · major product or positioning decisions are made.*
