# HANDOFF — "First reactions" recognition section

**Task ID:** SN-LP-recognition-001
**Prepared by:** Design (external) → for Claude Code **preparer** session
**Target repo:** `safetynet-landing`
**Branch:** `agent/preparer` (worktree — do NOT work in canonical checkout)
**Deploy impact:** adds one section to `index.html`. No backend, no CDN, no SRI change.

---

## 1. Define Done

A new **"First reactions"** section is live on the landing page, inserted **directly after the hero and above the existing `#problem` ("How SafetyNet protects you") section**. It contains: a small eyebrow label, a short headline, the Zolania lead quote, an auto-scrolling **quote-card marquee** (4 approved reactions, looping) with a working **pause/play** control, and a text bridge link down to `#problem`. It matches production styling (Inter, blue/slate, existing section rhythm), is CSP-clean, passes all gates in §6, and ships via PR — never a direct push to `main`.

**Strategic intent (do not "improve" away):** this section sells *problem-recognition + social proof BEFORE mechanism*. It is intentionally placed above the before/after demo. The before/after section is **kept**, not replaced.

---

## 2. Files in this package

| File | Destination in repo | Action |
|---|---|---|
| `component/reactions-section.html` | inline into `index.html` | paste markup at insertion point (§3) |
| `component/reactions-marquee.css` | `styles/main.css` | **append** to end of file |
| `component/reactions-marquee.js` | `js/reactions-marquee.js` | **new file** |
| `tests/reactions.smoke.spec.js` | `tests/` (or `e2e/`) | **new file** — Playwright smoke (§7) |

---

## 3. Exact insertion point

In `index.html`, the hero `<header id="hero">…</header>` is immediately followed by:

```html
    <!-- [SECTION 2: MENTAL MODEL] -->
    <section id="problem" class="py-10 … bg-slate-50 text-center">
      …  How SafetyNet protects you  …
```

Insert the entire contents of `component/reactions-section.html` **between** the closing `</header>` and the `<!-- [SECTION 2: MENTAL MODEL] -->` comment.

Then add the script tag near the other module scripts before `</body>` (alongside `faq-renderer.js` / `story-loader.js`):

```html
<script type="module" src="js/reactions-marquee.js"></script>
```

**Do not** renumber or alter the `#problem` section. The nav "Overview" link (`href="#problem"`) remains correct — we inserted *above* it, so it still resolves.

---

## 4. Design-token rules (why it looks right)

- **Font:** Inter only. The headline uses `font-bold`, the lead quote `font-light` — hierarchy by weight, **no serif, no mono**. Do not add a font.
- **Accent color:** `blue-600`. **Do NOT use `teal`** — `teal` is referenced in legacy HTML but is **not defined in `@theme` (`styles/input.css`)**; relying on it risks an uncolored class. If you want to confirm teal is safe project-wide, that's a separate task — for this component, blue-600 only.
- **Background:** section is `bg-white` so it separates cleanly from the hero (`bg-slate-50`) above and the `#problem` section (`bg-slate-50`) below — white between two slate-50 bands. Keep it.
- **Section rhythm:** uses the same `py-10 sm:py-12 md:py-15 lg:py-20` padding scale and `max-w-[900px] mx-auto` container as `#problem`.

---

## 5. CSP / security constraints (must hold)

- **No new external resources.** No CDN, no font, no image. → **SRI surface unchanged; `tests/sri.test.js` must stay green untouched.**
- **No inline `style=` attributes** and **no inline `on*` handlers** in the markup. Marquee speed is a CSS variable (`--sn-marquee-dur`) set **in the stylesheet**, not inline. The pause control is wired in `js/reactions-marquee.js` via `addEventListener`. If your project CSP blocks inline styles/scripts, this component is already compliant — keep it that way.
- **Lucide:** icons are self-hosted (`js/vendor/lucide.min.js`). After the pause/play icon swap the controller calls `window.lucide.createIcons()` — do not remove that call.

---

## 6. Quality gates (run in order, on `agent/preparer`)

| Gate | Command | Pass criteria |
|---|---|---|
| **G1 Build** | `npm run build:css` | exits 0; `styles/tailwind.css` regenerated with any new utility classes |
| **G2 Lint** | `npm run lint` | 0 errors (includes the new `js/reactions-marquee.js`) |
| **G3 Unit** | `npm test` | all existing Jest tests green — **SRI (39) and rate-limiting unchanged** |
| **G4 Smoke** | `npx playwright test tests/reactions.smoke.spec.js` | all assertions pass (§7) |
| **G5 Self-check** | manual, this checklist | every box in §8 ticked |

Then: commit only the intended files (`git status --short` first), push `agent/preparer`, open a PR. **Do not merge.** Hand to the reviewer (`REVIEW.md`).

---

## 7. Playwright smoke test (closes the visual-regression gap)

The unit suite covers security, not layout. This smoke test asserts the section renders, the marquee actually moves, pause works, and the neighbouring sections are intact. Full spec in `tests/reactions.smoke.spec.js` (shipped in this package). It checks:

1. `#reactions` exists and is positioned **before** `#problem` in DOM order.
2. The hero (`#hero`) is still the first section; `#problem` still contains "How SafetyNet protects you".
3. The lead quote text and all four attributions are present.
4. The marquee track's `transform` advances over ~1s (motion confirmed).
5. Clicking `#snMarqueePause` adds `is-paused` and freezes the transform; clicking again resumes.
6. Nav `a[href="#problem"]` still resolves to a real element.
7. No console errors on load.

> Playwright is not currently a dependency. Install dev-only: `npm i -D @playwright/test && npx playwright install chromium`. If the team prefers not to add it this sprint, the reviewer performs steps 1–7 manually on the Vercel preview (see REVIEW.md) — but installing it is recommended and is part of Define Done (A1 approved).

---

## 8. Preparer self-check (G5)

- [ ] Section inserted between `</header>` and `<!-- [SECTION 2: MENTAL MODEL] -->`
- [ ] `styles/main.css` appended with marquee CSS (not edited elsewhere)
- [ ] `js/reactions-marquee.js` created; `<script type="module">` added before `</body>`
- [ ] No inline `style=` / `on*=` introduced
- [ ] No new external resource / no SRI hash change
- [ ] Accent is `blue-600`; no `teal` used
- [ ] Approved quotes only — Zolania lead + Michael / Anna & Julia / Andrew / Jordan. **T11 (Cali, Colombia) NOT present.**
- [ ] Reduced-motion: marquee stops (verified by toggling OS setting or DevTools)
- [ ] G1–G4 all green
- [ ] PR opened on `agent/preparer`; **not merged**

---

## 9. Content — exact, approved (do not paraphrase)

**Eyebrow:** First reactions · before launch
**Headline:** Most people don't realise.
**Lead quote:** "I have five tracking apps. None of them help if I can't reach my phone." — **Zolania**, Student, London

**Marquee cards (order):**
1. "I never thought about what would happen if I couldn't reach my phone. Now I can't stop thinking about it." — **Michael**, Solo traveller, France
2. "We always share our locations and plans with our friends. We didn't realise we weren't covered." — **Anna & Julia**, Germany
3. "I often wonder how anyone would know if something happened to me. This is the first app that actually addresses that." — **Andrew**, Solo traveller, Cape Town
4. "I want to know if something's wrong — I don't need updates every hour. This would be a relief." — **Jordan**, Parent, San Francisco

**Bridge:** See how SafetyNet closes the gap → `#problem`

> Framing rule: these are **first reactions from pre-launch interviews**, never "reviews." The eyebrow "before launch" carries that honesty. **T11 is excluded from all public surfaces.**

---

## 10. Known risks / notes for the decision log

- **Teal vs blue:** legacy HTML uses `text-teal-600`; `@theme` doesn't define teal. Component uses blue-600 deliberately. Flag for a future palette-audit task.
- **Auto-deploy:** `main` auto-deploys to production via Vercel. This is why the work is on `agent/preparer` → PR → reviewer → human approval on the **preview** deployment before merge.
- **Marquee speed:** default 64s/loop. Tune via `--sn-marquee-dur` in the CSS if review finds it too fast/slow. Slower = more readable.
- **Reduced-motion:** with motion disabled the row is static and shows the first ~3–4 cards; that's acceptable (all four are also reachable in DOM for AT). If product wants full access without motion, a future enhancement is to add prev/next buttons in the reduced-motion case.
