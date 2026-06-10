# KICKOFF — paste to Claude Code (preparer session)

You are the **preparer** for task **SN-LP-recognition-001** in the `safetynet-landing` repo.

Work ONLY in the `agent/preparer` git worktree (per this repo's `CLAUDE.md`). Do not touch the canonical checkout or the reviewer worktree. Do not merge.

## Your job
Insert a new **"First reactions"** section into `index.html`, directly after the hero `</header>` and ABOVE the existing `<!-- [SECTION 2: MENTAL MODEL] -->` (`#problem`, "How SafetyNet protects you"). Keep the `#problem` section unchanged.

## Read first
`HANDOFF.md` (in this package) is the source of truth — read it fully before editing. It defines the exact insertion point (§3), token rules (§4), CSP constraints (§5), quality gates (§6), the Playwright smoke test (§7), your self-check (§8), and the approved content (§9). Do not deviate from §9 copy.

## Apply these files
1. Inline `component/reactions-section.html` at the insertion point in `index.html`.
2. Append `component/reactions-marquee.css` to the END of `styles/main.css`.
3. Create `js/reactions-marquee.js` from `component/reactions-marquee.js`, and add
   `<script type="module" src="js/reactions-marquee.js"></script>` before `</body>`,
   next to the existing `faq-renderer.js` / `story-loader.js` includes.
4. Create `tests/reactions.smoke.spec.js` from `component/reactions.smoke.spec.js`.
   If `@playwright/test` isn't installed: `npm i -D @playwright/test && npx playwright install chromium`.

## Hard rules (do not break)
- Inter only; accent `blue-600`; **never `teal`** (not in `@theme`).
- No inline `style=` or `on*=` handlers. No new external resource. Don't touch SRI hashes or `vercel.json`.
- Approved quotes only (HANDOFF §9). **T11 / Cali, Colombia must NOT appear.**

## Gates — run in order, all must pass
1. `npm run build:css`
2. `npm run lint`
3. `npm test`   (existing SRI 39 + rate-limiting must stay green, unchanged)
4. `npm run build:css` then serve locally and `npx playwright test tests/reactions.smoke.spec.js`

## Finish
- `git status --short`; stage ONLY: `index.html`, `styles/main.css`, `styles/tailwind.css` (rebuilt), `js/reactions-marquee.js`, `tests/reactions.smoke.spec.js` (+ `package.json`/lock only if you added Playwright).
- Complete the §8 self-check in `HANDOFF.md`.
- Push `agent/preparer`, open a PR titled `feat: first-reactions recognition section (SN-LP-recognition-001)`, and write a short PR body summarising the change + linking the Vercel preview.
- **Stop. Do not merge.** Hand to the reviewer (`REVIEW.md`).
