TASK
Update production hero to two-column light layout: copy left; clean riverwalk image
(SN_hero_centre_no-markings_1552.310526.webp) + live "how-it-works" card right. Keep copy B,
keep trust row, preserve waitlist CTA. Custom CSS only. Zero regression.

DONE
- index.html: replaced <header id="hero"> (previous background-image + 3 glass status cards
  layout) with new two-column grid layout. Left column: h1 + sub + #heroJoinWaitlistBtn CTA
  + trust row. Right column: <img> tag (width=1440 height=810, eager, high fetchpriority) +
  live how-it-works card (.hd-card). Hero header uses bg-slate-50 min-h-svh flex flex-col
  items-center justify-center — padding handled entirely in CSS.

- styles/main.css: replaced entire old HERO block (lines 460–529 — .hero-imgband,
  .hero-textcol, .hero-cta, .hero-cards etc.) with new scoped block. Includes: .hero-section
  padding (6rem/3rem base, 7rem/4rem at lg), .hero-grid responsive grid (1-col → 1.05fr/1fr
  at 1024px), .hero-copy flex column, .hero-title (max-width: 16ch + font-size 3.75rem at
  768px), trust row, .hero-media/.hero-image, all .hd-* live card classes including
  @keyframes hd-pulse and mobile reflow at max-width 1023px.

- Image dimensions verified: 1440×810 (brief stated 1700×956 — actual file is 1440×810;
  used correct values to prevent CLS).

- Missing Tailwind classes (pb-12, lg:pt-28, lg:pb-16, md:text-6xl, min-h-[44px]) not
  present in compiled tailwind.css — moved to custom CSS; not used in HTML.

- Card icon sizes set via inline style= (e.g. style="width:14px;height:14px;") since
  arbitrary Tailwind w-[Xpx] classes are not in compiled tailwind.css. CSP allows
  'unsafe-inline' for style-src.

SKIPPED / REJECTED
- phone-off icon: NOT in lucide bundle — substituted alert-triangle (present). Logged here.
- bell-ring icon: NOT in lucide bundle — substituted shield-alert (present). Logged here.
- Brief's image dimensions (1700×956): incorrect — actual file is 1440×810. Used actual.
- min-h-[44px] on button: not in tailwind.css — removed; py-4 provides sufficient height.
- npm run lint: pre-existing CRLF issue across all JS/test files (inherited from prior task,
  not caused by these changes). No JS files modified.

QUALITY GATES
G1 Waitlist conversion intact: PASS — #heroJoinWaitlistBtn present, open-registration-modal
   class on hero button and nav buttons intact, modal markup and Worker path untouched
G2 Icons render: PASS — clock, shield-check, check, arrow-right all in bundle; alert-triangle
   substituted for phone-off; shield-alert substituted for bell-ring (both in bundle)
G3 CSP-clean: PASS — no new external origins; inline style= permitted by unsafe-inline;
   no new inline onclick; all CSS in main.css
G4 No console errors: OPEN FOR REVIEWER — requires browser load
G5 Responsive + a11y: PASS (code review) — stacks <1024px via grid 1fr; card static below
   image at max-width 1023px; single <h1>; alt text present; CTA has py-4 (≥44px);
   text-black on bg-slate-50 exceeds AA contrast
G6 Build integrity: PASS — 117/117 tests green; tailwind.css not regenerated (git diff
   confirms); FAQ unchanged (git diff confirms); lint skipped (pre-existing CRLF issue)
G7 Performance/LCP: PASS (code review) — webp + loading=eager + fetchpriority=high +
   width/height=1440/810 set; no new external resources
G8 Visual parity: OPEN FOR REVIEWER — requires browser verification at desktop + 375px

OPEN FOR REVIEWER
- G4: Load index.html in browser; confirm clean console and modal opens on CTA click.
- G8: Confirm desktop shows copy left / image+card right; mobile shows single column with
  card below image (no horizontal overflow).
- Confirm icon substitutions acceptable: alert-triangle for phone-off, shield-alert for bell-ring.
- Confirm card-over-image placement at 1024–1280px (card absolute bottom-right of image).
- Confirm image is not awkwardly cropped at common breakpoints (100% width, height: auto).

BRANCH
agent/preparer @ <to-be-filled-after-commit>
