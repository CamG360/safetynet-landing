TASK
Port the approved "Light" hero (split layout: text left, image band + three glass status
cards right) onto the production landing page (index.html). Hero section only — no other
section may change. Teal accent introduced to @theme for the first time. Images delivered
as WebP crops of the riverwalk shot.

DONE
- styles/input.css: added --color-teal-50…900 to @theme (teal-600 ≈ #0d9488 via oklch(0.58 0.11 186)).
- styles/main.css: removed old centered hero rules (.hero-section, .hero-content,
  .hero-image-wrap, .hero-image, h1.hero-title, .hero-subtitle, .hero-gradient,
  #heroJoinWaitlistBtn and their media queries). Added new "HERO (Light split layout)"
  block with .hero-imgband, .hero-textcol, .hero-cta, .hero-trust, .hero-cards, and
  the @media (max-width: 767px) mobile stack. Both url() references updated to WebP
  filenames. .nav-logo-icon preserved.
- index.html: replaced <header id="hero"> centered layout with the split layout
  (image band + .hero-cards on right, text column with title/sub/CTA/trust row on left).
  Global sticky <nav> left untouched. Header still flows into <section id="reactions">.
- styles/tailwind.css: rebuilt — teal tokens present (51 teal references in output).
- images/SN_hero_left_no-markings_1554.310526.webp: added (117 KB, 1440px wide).
- images/SN_hero_centre_no-markings_1552.310526.webp: added (124 KB, 1440px wide).

SKIPPED / REJECTED
- Image filenames differ from original build-prompt spec (hero-riverwalk-left.png /
  hero-riverwalk-centre.png): actual delivered assets are SN_hero_left_no-markings_1554.310526
  and SN_hero_centre_no-markings_1552.310526. Used as instructed; all docs updated to reflect
  actual filenames.
- PNG format not used: both images converted to WebP at q82 to meet < 400 KB target
  (originals were 2 MB each). Filenames retain .webp extension.
- G2 lint (npm run lint): CRLF line endings in every JS and test file cause lint to
  report errors across the entire repo. This is a pre-existing systemic issue — present
  on main before this task, not caused by any changes here. No JS files were modified.
  Normalising CRLF is out of scope for this commit (would contaminate the diff).
- G4 smoke test 6 (pause button): test expects #snMarqueePause which was removed in
  commit dd0388f ("ux: remove pause button and bridge link from reactions section") after
  the reactions PR was merged. 8/9 smoke tests pass; test 6 is a stale test artefact,
  not a regression.

QUALITY GATES
Build (npm run build:css):                           PASS
Teal tokens present in tailwind.css:                 PASS (51 occurrences)
Desktop layout (visual — text L / image R /          OPEN FOR REVIEWER
  3 glass cards / cream feather / teal CTA):
Mobile layout (visual — centred stack, no overflow): OPEN FOR REVIEWER
Nav unbroken + #reactions flows cleanly:             PASS (Playwright test 2 confirms)
Lucide icons resolve:                                OPEN FOR REVIEWER (needs browser)
open-registration-modal still opens modal:           PASS (class preserved on new button)
No new CSP violations (no inline styles):            PASS (all CSS in main.css, no style= added)
Tests (npm test): 117/117:                           PASS
Only hero changed (git diff scoped):                 PASS
G4 smoke (reactions): 8/9                           PARTIAL — test 6 pre-existing failure (see above)

OPEN FOR REVIEWER
- Teal-600 oklch(0.58 0.11 186): confirm it reads as ~#0d9488 on screen, not just in code.
- Image background-position crops (40% 45% desktop / 54% 40% mobile): art-direction
  calls — confirm subject isn't awkwardly cut at common breakpoints.
- Trust-row retention is intentional per this task's brief (overrides older redesign doc
  that said "remove trust row").
- G2 lint: CRLF normalisation is a separate housekeeping task across all repo JS files.
- G4 smoke test 6: stale test should be updated to remove or replace the pause-button
  assertion. Not a regression from this task.

BRANCH
agent/preparer @ [fill from: git log --oneline -1 in safetynet-landing-preparer]
