TASK
Update production hero to two-column light layout: copy left; clean riverwalk image
(SN_hero_centre_no-markings_1552.310526.webp) + live "how-it-works" card right. Keep copy B,
keep trust row, preserve waitlist CTA. Custom CSS only. Zero regression.

DONE
index.html: Replaced <header id="hero">...</header> (old lines 72–129) with the approved
two-column grid layout. New markup: hero-grid / hero-copy (left: headline, sub, CTA, trust
row) / hero-media (right: <img> + .hd-card overlay). Button id/class unchanged. Old image
src (City_riverwalk_clear-colour_EEG_1323.240526.png) removed from hero only; file retained
on disk.

styles/main.css: Two edits.
(1) Deleted the h1.hero-title block (~line 524 in original) — this block had specificity
0,1,1 and forced margin-left/right: auto on the headline, overriding flex left-alignment on
desktop.
(2) Appended hero two-column CSS block at end of file: .hero-grid, .hero-copy, .hero-title,
.hero-trust, .hero-trust-item, .hero-trust-ic, .hero-media, .hero-media .hero-image (with
max-height: none and object-fit: initial to neutralise old .hero-image constraints), all
.hd-card / .hd-* card rules, @keyframes hd-pulse, and mobile reflow media query.

SKIPPED / REJECTED
phone-off: MISSING from lucide bundle — substituted alert-triangle (amber warning node,
step 2: "You don't check in"). Semantically coherent.
bell-ring: MISSING from lucide bundle — substituted shield-alert (teal active node, step 3:
"Your contacts are alerted"). Semantically coherent.
shield-check, arrow-right, clock, check: all present in bundle — used as specified.
Arbitrary icon size classes (w-[14px] etc.) from original spec: not compiled in tailwind.css
— substituted compiled equivalents: w-3.5 h-3.5 (14px), w-5 h-5 (18-19px), w-3 h-3 (12px).

QUALITY GATES
G1 Waitlist conversion intact: PASS — #heroJoinWaitlistBtn id unchanged, open-registration-modal
   class present, bg-blue-600 styling unchanged
G2 Icons render: PASS — clock, shield-check, check, arrow-right confirmed in bundle;
   phone-off → alert-triangle, bell-ring → shield-alert (substitutions logged above)
G3 CSP-clean: PASS — no new external origins; no inline onclick; inline style= on .hd-av
   and .hd-value are present in spec as written; no new <script> tags
G4 No console errors: OPEN FOR REVIEWER — requires browser/DevTools verification
G5 Responsive + a11y: PASS — stacks <1024px via grid-template-columns:1fr; .hd-card
   reflows to static below image at ≤1023px; CTA min-h-[44px] preserved; single <h1>;
   alt text present; text-black on bg-slate-50 passes AA contrast
G6 Build integrity: PASS — npm test 117/117; tailwind.css NOT modified; no FAQ changes;
   no JS files touched
G7 Performance/LCP: PASS — hero image is webp, loading="eager", fetchpriority="high",
   width/height set (1440×810); no LCP regression
G8 Visual parity: OPEN FOR REVIEWER — desktop split layout and mobile stack require
   browser preview verification

OPEN FOR REVIEWER
- Confirm card-over-image placement at 1024–1280px breakpoint (card bottom: 16px absolute
  positioning within image bounds).
- Confirm alert-triangle and shield-alert icon substitutions are acceptable.
- Confirm hero section height looks reasonable: existing .hero-section rule in main.css sets
  min-height: auto which overrides min-h-svh Tailwind class — section is content-height, not
  full-viewport-height. With two-column image this should look correct; verify on preview.
- G4 (no console errors) and G8 (visual parity) require browser verification.

BRANCH
agent/preparer @ PENDING
