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
