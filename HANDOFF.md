TASK
Update production hero to full-bleed image layout: riverwalk photo as section background,
dark gradient overlay, copy left + live how-it-works card right overlaid on top. Keep copy B,
keep trust row (white text on dark), preserve waitlist CTA. Custom CSS only. Zero regression.

DONE
images/SN_hero_centre_no-markings_1552.310526.webp: committed (was untracked in canonical
repo; never reached main; caused image-not-rendering failure in prior attempt).

index.html: Replaced <header id="hero">...</header> with full-bleed structure.
- Removed bg-slate-50 and explicit padding classes from header (existing .hero-section CSS
  handles nav-aware padding).
- Added <img class="hero-bg-img"> as first child (position:absolute, covers section).
- Added <div class="hero-overlay"> for dark gradient (position:absolute, z-index:1).
- hero-content z-index:2 sits above both.
- hero-grid: two columns (desktop) / single column (mobile). Right column is .hero-card-col
  containing the .hd-card only (no image element in DOM — image is the section background).
- Trust row text changed to .hero-trust-label (CSS sets white color) — removed text-slate-700.
- Button id/class unchanged.

styles/main.css: Replaced two-column light CSS block with full-bleed block:
- .hero-section: position:relative; overflow:hidden; min-height:100svh (overrides the
  earlier min-height:auto rule).
- .hero-bg-img: absolute, inset:0, object-fit:cover, object-position:center 35%.
- .hero-overlay: absolute, diagonal gradient rgba(2,6,23,.78)→transparent.
- .hero-title/.hero-sub/.hero-trust-label: white/near-white text.
- .hero-trust-ic: teal-tinted background, bright teal icon.
- .hero-card-col: flex container for the card, right-aligned on desktop.
- .hd-card: position:static (card in flow, not absolute-positioned over image).
- All .hd-* card rules retained unchanged.

SKIPPED / REJECTED
phone-off: MISSING from lucide bundle — substituted alert-triangle (amber warning node).
bell-ring: MISSING from lucide bundle — substituted shield-alert (teal active node).
shield-check, arrow-right, clock, check: confirmed present in bundle.
w-[14px]/w-[18px]/w-[19px]/w-[12px] arbitrary classes not compiled — substituted
w-3.5 h-3.5, w-5 h-5, w-3 h-3 compiled equivalents.

QUALITY GATES
G1 Waitlist conversion intact: PASS — #heroJoinWaitlistBtn id unchanged,
   open-registration-modal class present, bg-blue-600 unchanged
G2 Icons render: PASS — bundle-confirmed icons used; substitutions logged
G3 CSP-clean: PASS — no new external origins; no inline onclick; no new <script> tags
G4 No console errors: OPEN FOR REVIEWER — requires browser/DevTools verification
G5 Responsive + a11y: PASS — single column <1024px; CTA min-h-[44px] preserved;
   single <h1>; alt text present; white text on dark overlay passes AA contrast
G6 Build integrity: PASS — npm test 117/117; tailwind.css NOT modified; no FAQ changes
G7 Performance/LCP: PASS — image webp, loading=eager, fetchpriority=high, width/height set
G8 Visual parity: OPEN FOR REVIEWER — full-bleed layout requires browser preview verification

OPEN FOR REVIEWER
- G4 and G8 require browser verification on Vercel preview.
- Confirm alert-triangle and shield-alert icon substitutions are acceptable.
- Confirm gradient density (overlay opacity) is correct on the actual photo.
- Confirm object-position: center 35% crops the photo to the right focal point.

BRANCH
agent/preparer @ b198bee
