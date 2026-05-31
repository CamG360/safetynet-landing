# REVIEW — Hero light split layout (SN-LP-hero-light-001)

**Task ID:** SN-LP-hero-light-001
**Reviewer:** Claude Code reviewer session — agent/reviewer worktree
**Source under review:** PR #285 from agent/preparer (head d72d3a7)
**Reviewed against:** origin/main at c9f508f (merge-base 2f8dc6c)

---

## A. Independent gate re-run

| Gate | Command | Expected | Result | Notes |
|---|---|---|---|---|
| G1 Build | `npm run build:css` | exit 0 | PASS | |
| G2 Lint | `npm run lint` | 0 errors | PRE-EXISTING FAIL | CRLF in every repo JS/test file — present on main, not caused by this PR. No JS files were modified. |
| G3 Unit | `npm test` | 117 pass, unchanged | PASS — 117/117 | |
| G4 Smoke | `npx playwright test tests/reactions.smoke.spec.js` | 8/9 | 8/9 CONFIRMED | Test 6 (#snMarqueePause) pre-existing stale assertion — pause button removed in dd0388f. Independently reproduced. |

---

## B. Diff audit

Run `git diff --stat origin/main..HEAD` — files changed:

- [x] `index.html` — hero section replaced, no other section modified. DOM order confirmed: #hero (73) → #reactions (139) → #problem (209). ✓
- [x] `styles/main.css` — dead centered-hero rules removed; new Light hero block added. Both `url()` references use WebP filenames. ✓
- [x] `styles/input.css` — teal scale appended to `@theme`. ✓
- [x] `styles/tailwind.css` — rebuilt output only. ✓
- [x] `images/SN_hero_left_no-markings_1554.310526.webp` — new file (117 KB). ✓
- [x] `images/SN_hero_centre_no-markings_1552.310526.webp` — new file (124 KB). ✓
- [x] `HANDOFF.md` — new file. ✓
- [x] `images/SN_hero_left_no-markings_1554.310526.png` — **DELETED on merge** (2 MB source PNG uploaded to main at c9f508f, after this branch was cut). Accepted: WebP replacements are intentional per task brief. Cam to confirm source PNG archival is not needed before approving.
- [x] `images/SN_hero_centre_no-markings_1552.310526.png` — **DELETED on merge** — same as above.

Red flags — none found:
- [x] No changes to #problem, hero-to-reactions flow, nav, footer, or other sections
- [x] No new external URL in any script, style, font, or img
- [x] No changes to SRI hashes or vercel.json
- [x] No secrets, keys, or .env-like content
- [x] No stray/debug files

---

## C. CSP / security audit

- [x] No inline `style=` in inserted hero markup (`grep 'style=' index.html` in new block → none)
- [x] No inline `on*=` handlers in inserted markup
- [x] Marquee speed remains CSS var in `main.css`; pause (reactions) remains via `addEventListener` — hero changes do not touch reactions JS
- [x] No new `<script>` tags added
- [x] `sri.test.js` green (G3 confirmed) — CDN/SRI surface unchanged
- [ ] DevTools console check — **requires Vercel preview (Cam)**

---

## D. Content & governance audit

- [x] Hero headline verbatim: "Text me when you're safe" fails when you can't text.
- [x] Hero sub verbatim: SafetyNet sends an alert for you.
- [x] CTA: "Get Early Access" with arrow-right icon. `open-registration-modal` class preserved — modal hook intact.
- [x] Trust row retained: Automatic alerts / Zero tracking / Your plans private ✓
- [x] T11 (Cali, Colombia): `grep -in 'colombia\|cali' index.html` → not found ✓
- [x] Teal scoped to hero CSS classes only; blue-600 unchanged on all other sections

---

## E. Side effects (outside declared scope — accepted or flagged)

1. **Nav hover colour now resolves** — `hover:text-teal-600` appears in nav markup (lines 32, 55). Before this PR teal was undefined → rendered as default. Now teal-600 is defined so hover renders as teal. This is a cosmetic improvement, not a regression. **Accepted.**

2. **Stale comment in index.html:137** — reads "Accent = blue-600 (teal is NOT defined in @theme - do not use)." This is now incorrect; teal IS defined. Not a defect, but misleading. **Recommend fixing in a follow-up; not a blocker.**

3. **PNG source files deleted on merge** — see Section B. Raw 2 MB PNGs (uploaded to main at c9f508f) will be removed when this PR merges. WebP replacements serve the same function at 6% of the file size. **Flag for Cam's explicit acknowledgement before merge.**

---

## F. Visual gates — pending Cam on Vercel preview

| # | Check | Status |
|---|---|---|
| 1 | Section appears after hero, above #problem | Verified via Playwright (DOM order) |
| 2 | Split layout: text left, image band right | **Pending preview** |
| 3 | Three glass cards bottom-right of image band | **Pending preview** |
| 4 | Teal CTA button (~#0d9488) renders correctly | **Pending preview** |
| 5 | Cream left-edge feather on image band (desktop) | **Pending preview** |
| 6 | Mobile (≤767px): text stack top, image panel below, no overflow | **Pending preview** |
| 7 | All sections above and below render unchanged | **Pending preview** |
| 8 | Nav Overview still jumps to #problem | Verified via Playwright (test 7) |
| 9 | No console errors on load | Verified via Playwright (test 8) |
| 10 | No horizontal overflow at mobile | Verified via Playwright (test 9) |

---

## F. Verdict

- [x] **APPROVE (conditional)** — all machine gates pass or pre-existing; scope is clean; no regressions in tests or DOM structure. Three items require Cam's sign-off before merge:
  1. Confirm PNG source file deletion is acceptable (or preserve them separately).
  2. Verify visual gates (split layout, teal CTA, mobile stack) on the Vercel preview URL.
  3. Acknowledge stale comment at index.html:137 (recommend follow-up, not a blocker).

**Decision log:**
All machine-verifiable gates run independently and confirmed preparer's results. Pre-existing G2 (CRLF) and G4/test-6 (stale pause-button assertion) failures both confirmed pre-existing — not introduced by this PR. Diff scope is surgical: only hero, its CSS, teal tokens, two images, and HANDOFF.md. Side effects are minor and net-positive (nav hover now works correctly). PNG deletion on merge is intentional per the task brief (WebP conversion requested) but needs explicit human acknowledgement.

**Known residual risks accepted:**
- No automated visual baseline for the split layout — covered by pending preview review (Section F).
- CRLF normalisation is a separate repo housekeeping task.
- Stale pause-button smoke test should be cleaned up in a follow-up.
