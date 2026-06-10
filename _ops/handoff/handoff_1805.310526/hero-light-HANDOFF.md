TASK
Port the approved "Light" hero (split layout: text left, image band + three glass status
cards right) from the design project's Hero Options.html onto the production landing page
(index.html). Hero section only — no other section may change. Locked decisions: accent =
teal; trust row kept; images = hero-riverwalk-left.png (desktop) / hero-riverwalk-centre.png
(mobile). Supersedes docs/hero-redesign-prompt-iteration-2_260526.md.

DONE
[Fill in specifics after execution. Expected:]
- styles/input.css: added --color-teal-50…900 to @theme (teal-600 ≈ #0d9488).
- Rebuilt CSS via `npm run build:css`; styles/tailwind.css now emits teal tokens + utilities.
- index.html: replaced <header id="hero"> centered layout with the split layout
  (image band + .hero-cards over it, text column with title/sub/CTA/trust row). Global
  sticky <nav> left untouched. Header still flows into <section id="reactions">.
- styles/main.css: removed dead .hero-content/.hero-image/.hero-image-wrap rules; added the
  "HERO (Light split layout)" block (image band, text column, teal CTA, trust row, glass
  cards, mobile stack @max-width:767px).
- images/: added hero-riverwalk-left.png and hero-riverwalk-centre.png (optimized < 400 KB).

SKIPPED / REJECTED
- No global reskin: blue-600 remains the accent on every other section. Teal is scoped to
  the hero only.
- Did NOT follow the dark/card-only direction or "remove trust row" instruction from
  docs/hero-redesign-prompt-iteration-2_260526.md — explicitly overridden by this task.
- [If image assets were unavailable and a placeholder was used — state it here. Omitting an
  omission is a failure mode.]

QUALITY GATES
Build (npm run build:css):                    PASS / FAIL
Teal tokens present in tailwind.css:          PASS / FAIL
Desktop layout (≥1280: text L / image R /     PASS / FAIL
  3 glass cards / cream feather / teal CTA):
Mobile layout (390: centred stack + image      PASS / FAIL
  panel, no overflow, tap targets ≥44px):
Nav unbroken + #reactions flows cleanly:       PASS / FAIL
Lucide icons resolve (clock/users/shield-      PASS / FAIL
  check/check/arrow-right):
open-registration-modal still opens modal:     PASS / FAIL
No new CSP violations (no inline styles):      PASS / FAIL
Tests (npm test) green:                         PASS / FAIL
Only hero changed (git diff scoped):           PASS / FAIL

OPEN FOR REVIEWER
- Teal-600 oklch value is an approximation of #0d9488 — confirm it reads correctly on screen,
  not just in code.
- Image background-position crops (40% 45% desktop / 54% 40% mobile) are art-direction calls —
  confirm the subject isn't awkwardly cut at common breakpoints.
- Confirm trust-row retention is intended (it contradicts the older redesign doc, kept per
  this task's brief).

BRANCH
agent/preparer @ <commit-hash>   ← fill in actual hash; commit HANDOFF.md in the same commit.
