# SafetyNet Landing Page — Design Brief: Iteration 2

**Date:** 2026-05-26
**Context:** First test run of claude.ai/design for SafetyNet landing page prototyping. This brief captures learnings from `index (4).html` and sets direction for the next iteration.

---

## What the test run established

claude.ai/design produces a prototype artifact — single-file HTML, Tailwind via CDN, all CSS/JS inline. It is not operational, not integrated, not functional. It is used to inform the build. The prototype is structurally close enough to production (for a static landing page) that the gap is mostly build tooling + form wiring, not a full rebuild.

---

## Issues identified in index (4).html

- **Font use** — prototype uses three fonts (Instrument Serif, Plus Jakarta Sans, JetBrains Mono); current live site uses Inter only; iteration 2 reverts to Inter throughout
- **Too busy** — too many sections, too much visual noise, overdesigned
- **Not minimalist** — the aesthetic ambition outpaces the product stage
- **Copy corrections** — see section below

---

## Copy decisions

### Hero subtitle — confirmed
> "Text me when you're safe" fails when you can't text. SafetyNet sends an alert for you.

Kept for emotional recognition — it names a behaviour the reader has said or heard, then shows the flaw in it.

### Hero headline — dropped
"Your silent safeguard for everyday life" is removed. The image + UI overlay makes it redundant.

### Launch date — resolve inconsistency
Hero and footer say "mid-2026". FAQ says "early 2026". Pick one and apply consistently.

### Emergency number — resolve inconsistency
Some steps use "999", others "911 / 999". Decide target market and standardise.

### "Dead man's switch" framing — review
Currently used as a mono label in the hero. Too technical/morbid for a consumer product at first impression.

### "v2.0 · BETA" — review
Monitoring strip shows this. Pre-launch product claiming v2.0 feels inconsistent.

### Testimonials — confirm or replace
Three quotes (Zolania, Catherine, David) — confirm these are real before any public use.

---

## Key design insight

**The hero image should do the full job on first impression.**

The current prototype uses a three-step cognitive sequence:
1. Hero (dark photo + headline)
2. Sub-hero (explanation)
3. Image/concept demo (how it works)

This makes the visitor work to understand the product. The solution is one unified hero composition:

- **Image** — real person, real situation; the image carries the concept
- **UI overlay on the image** — the SafetyNet interface showing check-in time, connected contacts, alert ready; the product demo is *in* the scene, not below it
- **Copy over the image** — `"Text me when you're safe" fails when you can't text. SafetyNet sends an alert for you.`
- **Headline removed** — the image + UI overlay makes a separate headline redundant

The floating status card already in the prototype (`Check-in by 11:30 PM`, bottom-right of hero) is the seed of this — it becomes the centrepiece rather than a decorative detail.

**UI card — three status lines (exact copy):**
- "Check-in by: 11:30 PM"
- "Connected to emergency contacts"
- "Automatic alert ready"

---

## Direction for iteration 2

- Fewer sections — strip to the essential minimum
- Cleaner typography — revisit font choices, reduce variety
- Single unified hero — image + UI overlay + copy as one composition; no separate sub-hero or concept demo section
- Minimalist aesthetic — whitespace over decoration
- Copy corrections applied per section above

---

## Quality Gates

| Gate | Status | Notes |
|------|--------|-------|
| Hero copy confirmed | PASSED | `"Text me when you're safe" fails when you can't text. SafetyNet sends an alert for you.` |
| Hero headline dropped | PASSED | "Your silent safeguard for everyday life" removed |
| UI card copy confirmed | PASSED | Three lines: Check-in by / Connected to emergency contacts / Automatic alert ready |
| Font decision confirmed | PASSED | Inter only — consistent with live site |
| Remove list specific and actionable | PASSED | Six named elements to strip |
| Aesthetic direction clear | PASSED | Minimal, dark image, white text, one card, one button |
| Hero image sourced | UNCERTAIN | Prompt describes the shot; claude.ai/design will generate a placeholder — real image needs to be sourced or commissioned |
| CTA button destination specified | UNCERTAIN | "Get Early Access" button behaviour not defined in prompt — opens registration modal, or links to form? |
| Launch date inconsistency resolved | FAILED | "mid-2026" (hero, footer) vs "early 2026" (FAQ) — not yet decided |
| Emergency number standardised | FAILED | "999" vs "911 / 999" — target market not confirmed |
| Testimonials confirmed | FAILED | Zolania, Catherine, David — real or placeholder not confirmed |
| "v2.0 · BETA" resolved | FAILED | Pre-launch version claim not addressed |

---

## Reference

- Prototype file: `safetynet-landing/html/index (4).html`
- claude.ai/design prompt: `docs/hero-redesign-prompt-iteration-2_260526.md`
- Inventory: `docs/landingpage_inventory_130526.md`
