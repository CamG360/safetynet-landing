# SafetyNet Landing — Decision Log

---

## ADR-001: T01 (Michael) — "I'm in." removed from public copy

**Date:** 2026-06-01  
**Status:** Decided  
**Section:** Section 6 — Social Proof (reactions marquee)

### Problem
Source quote (T01, testimonial-universe_270526.md) ends with "I'm in." — a buy-in signal. The v2 UX primitives doc classifies T01's key insight as "Problem recognition + immediate buy-in," making "I'm in." load-bearing for accuracy.

### Options considered
1. Retain "I'm in." — preserves full source fidelity and buy-in signal.
2. Drop "I'm in." — ends the quote on the recognition beat ("Now I can't stop thinking about it."), which is stronger for landing-page impact and fits the polished tone.

### Solution
Drop "I'm in." from the public landing-page copy.

### Rationale
The quote's job in the marquee is Recognition, not conversion signalling. "Now I can't stop thinking about it." is the stronger emotional endpoint. "I'm in." is informal signup language that reads as out-of-place in a polished context. Brevity and impact outweigh strict verbatim fidelity here.

### Reuse instructions
When pulling T01 for ad copy or early-adopter/conversational contexts, restore "I'm in." — it is the appropriate tone for those placements.

### Artefacts
- Source: `testimonial-universe_270526.md` — T01 (full verbatim)
- UX planning: `testimonial-universe_ux-primitives_v2_270526.md` — §3, §9
- Applied in: `index.html` Section 6 (marquee, both set 1 and set 2)

---

## ADR-002: T10 (Anna & Julia) — "Berlin" omitted from attribution

**Date:** 2026-06-01  
**Status:** Decided  
**Section:** Section 6 — Social Proof (reactions marquee)

### Solution
Attribution reads "Germany" not "Berlin, Germany."

### Rationale
Deliberate design choice. Country-only attribution confirmed by user.

---

## Quality Gate: Section 6 Testimonial Attribution

**Applies to:** any edit to Section 6 quote text or attributions in `index.html`

Before committing any change to a quote or attribution, verify each field against the source document (`testimonial-universe_270526.md` or `testimonial-universe_ux-primitives_v2_270526.md`) and record the outcome:

| Check | Rule |
|---|---|
| Quote text | Match source exactly, or document deviation in this file |
| Name | Match source exactly |
| City | Match source exactly, or document deliberate omission/change here |
| Country | Match source exactly, or document deliberate omission/change here |
| Both marquee sets | Any text change must be applied to set 1 AND set 2 |

Do not infer, correct, or substitute cities or countries based on general knowledge. If the source appears to contain an error, flag it to the user — do not silently change it.

### Open attribution questions (pending user confirmation)

| Quote | Source | Current HTML | Question |
|---|---|---|---|
| T01 Michael | Leon, France | Leon, France | Is "Leon" correct, or should it be "Lyon"? Source may contain a typo. |
| T02 Zolania | London, UK | Student, London | Was "UK" deliberately omitted? |
| T05 Jordan | San Francisco, USA | Parent, San Francisco | Was "USA" deliberately omitted? |
