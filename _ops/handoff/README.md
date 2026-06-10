# SafetyNet — "First reactions" section · Claude Code handoff

Production change package for inserting the recognition/social-proof section
(Variant C: quote-card marquee) into the `safetynet-landing` repo.

**Placement:** new section directly after the hero, **above** the existing
`#problem` ("How SafetyNet protects you") before/after section. The before/after
section is **kept**, not replaced.

---

## What's in here

```
handoff/
├── README.md                       ← you are here
├── KICKOFF.md                      ← paste this to the Claude Code preparer session
├── HANDOFF.md                      ← full spec: insertion point, tokens, CSP, gates, content
├── REVIEW.md                       ← independent reviewer checklist (agent/reviewer)
└── component/
    ├── reactions-section.html      ← markup to inline into index.html
    ├── reactions-marquee.css       ← append to styles/main.css
    ├── reactions-marquee.js        ← new file → js/reactions-marquee.js
    └── reactions.smoke.spec.js     ← new file → tests/reactions.smoke.spec.js
```

## How to run it (recommended path)

1. **Preparer** (Claude Code, `agent/preparer` worktree): paste `KICKOFF.md`.
   It follows `HANDOFF.md`, runs gates G1–G4, opens a PR. Does **not** merge.
2. **Vercel** builds a **preview** deployment from the PR branch (independent build).
3. **Reviewer** (a *separate* Claude Code session, `agent/reviewer` worktree):
   works through `REVIEW.md` — re-runs gates from a clean checkout, audits the
   diff, CSP, content, and the live preview. Verdict: APPROVE / REQUEST CHANGES.
4. **You (Cam):** open the Vercel preview URL, eyeball it, approve the PR → merge
   → production deploys.

No single actor reaches production alone: preparer → machine gates → independent
reviewer → human approval on a reproducible preview.

## Key constraints (the things that bite if ignored)

- **Inter only.** No serif/mono. Hierarchy by font-weight.
- **Accent = `blue-600`.** `teal` is NOT defined in `@theme` — don't use it.
- **CSP-clean.** No inline `style=` / `on*=`. Marquee speed is a CSS var in the
  stylesheet; pause is wired via `addEventListener`.
- **No new external resource** → SRI surface unchanged → `sri.test.js` stays green.
- **T11 (Cali, Colombia) excluded** from all public surfaces.
- **Ship via PR on `agent/preparer`** — `main` auto-deploys to production.

See `HANDOFF.md` §4–§6 for the full rules and the quality-gate table.
