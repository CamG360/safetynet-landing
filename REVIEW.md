# REVIEW — Hero full-bleed layout (SN-LP-hero-light-003)

VERDICT: APPROVED (conditional)

CHECKLIST
- G1 Waitlist conversion: YES
- G2 Icons render: YES
- G3 CSP-clean: YES
- G4 No console errors: PENDING
- G5 Responsive + a11y: YES
- G6 Build integrity: YES
- G7 Performance/LCP: YES
- G8 Visual parity: PENDING
- Scope discipline: YES (see note)
- h1.hero-title removed: YES
- No arbitrary Tailwind classes: YES

NOTES

G1: `id="heroJoinWaitlistBtn"` and `class="open-registration-modal"` both present and
unchanged on the hero CTA. `min-h-[44px]` preserved on button. `bg-blue-600` unchanged.

G2: Icon substitutions `phone-off` -> `alert-triangle` and `bell-ring` -> `shield-alert`
are logged in HANDOFF.md and both icons are confirmed present in the self-hosted Lucide
bundle. Compiled size classes `w-3.5 h-3.5`, `w-5 h-5`, `w-3 h-3` replace all
arbitrary `w-[Npx]` variants from the previous attempt.

G3: No new `<script>` tags introduced. No `onclick` or other inline event handlers added.
No new external origins. Hero card uses three `style=` inline attributes (font-size:16px
and two avatar background colours) — these are decorative/layout micro-overrides within
the card, do not introduce new network origins, and do not affect CSP. Flagged as minor
observation only; not a rejection.

G5: Single `<h1>` confirmed. Hero `<img>` has descriptive `alt` text. CTA has
`min-h-[44px]`. White/near-white text (#fff, rgba(255,255,255,.85)) on dark overlay
(rgba(2,6,23,.75-.92)) passes WCAG AA contrast. Text-shadow added for additional
legibility. Two-column layout collapses to single column below 1024px.

G6: 117/117 tests pass. `tailwind.css` not in diff. `data/faq.json` not in diff. No
`.js` files changed.

G7: Hero image is `.webp` format (126 KB). `loading="eager"`, `fetchpriority="high"`,
`width="1440"`, `height="810"` all set. Prevents layout shift and enables LCP
prioritisation.

Scope: The diff includes 3 images in `images/hero-candidates/` that were not introduced
by this task. They originate from commit `06cda14` ("Recover hero-candidate images from
corrupted filenames") which predates the hero full-bleed work and was already on
`agent/preparer` from the prior cycle. These files are binary additions with no
deletions, do not affect the build, HTML, or CSS, and carry no incomplete-task risk.
Treated as acceptable scope carry-forward. No preparer action required.

h1.hero-title: The `h1.hero-title { font-size; line-height; margin }` legacy block has
been removed from `main.css`. The selector `.hero-title` (no element qualifier) remains
as the new full-bleed rule — this is correct and intentional.

G4/G8: Both require browser/DevTools verification on a Vercel preview. Preparer has
correctly flagged these as open. Conditional approval is predicated on browser
verification confirming no console errors and correct full-bleed visual on mobile and
desktop.

REJECTED ITEMS
None. Conditional on G4 and G8 browser verification passing.
