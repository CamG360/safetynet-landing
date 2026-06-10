# Claude Code Build Prompt — Hero (Light) Port

**Repo:** `safetynet-landing/` · **Worktree:** `safetynet-landing-preparer` · **Branch:** `agent/preparer`
**Scope:** Hero section only (`<header id="hero">`). Do not touch any other section.
**Source of truth for the design:** the approved *Light* hero in `Hero Options.html` (split layout: text left, image band + three glass status cards right). This supersedes `docs/hero-redesign-prompt-iteration-2_260526.md` (which described a dark, card-only hero and said "remove the trust row" — both are now overridden: **light layout, trust row KEPT**).

---

## Decisions already locked (do not re-litigate)

1. **Accent = teal.** The Light design is teal-keyed (`#0d9488`). The repo's `input.css` begins with `--color-*: initial`, which deletes all default colors, so `teal-*` utilities currently do **not** exist. **Add a teal scale to `@theme` and rebuild the CSS** (steps below). Leave blue-600 as-is everywhere else on the page — do not globally reskin.
2. **Trust row stays** — "Automatic alerts · Zero tracking · Your plans private".
3. **Images** — use `images/hero-riverwalk-left.png` (desktop image band) and `images/hero-riverwalk-centre.png` (mobile). These must be added to `safetynet-landing/images/` — they are NOT in the repo yet (see step 0).
4. Deliverable closes with a committed `HANDOFF.md` (repo rule).

---

## Step 0 — Add the two image assets

The crops `hero-riverwalk-left.png` and `hero-riverwalk-centre.png` are not in `safetynet-landing/images/`. Obtain them from the design project's `images/` folder (CM will drop them into `safetynet-landing/images/`) and confirm both exist before editing markup. If only `City_riverwalk_clear-colour_EEG_1323.240526.png` is available, STOP and flag — do not substitute silently.

Optimize to web weight if oversized (target < 400 KB each). Keep the exact filenames.

---

## Step 1 — Add teal tokens to `styles/input.css`

Inside the `@theme { … }` block (after the blue scale is fine), add:

```css
  --color-teal-50:  oklch(0.98 0.02 185);
  --color-teal-100: oklch(0.95 0.04 185);
  --color-teal-200: oklch(0.90 0.07 185);
  --color-teal-300: oklch(0.82 0.10 186);
  --color-teal-400: oklch(0.73 0.12 186);
  --color-teal-500: oklch(0.66 0.12 186);
  --color-teal-600: oklch(0.58 0.11 186);   /* ≈ #0d9488 — verify visually */
  --color-teal-700: oklch(0.50 0.09 187);
  --color-teal-800: oklch(0.42 0.07 187);
  --color-teal-900: oklch(0.38 0.06 188);
```

Verify `teal-600` renders as ~`#0d9488`; nudge lightness/chroma if it drifts. Then rebuild:

```bash
npm run build:css      # npx tailwindcss -i ./styles/input.css -o ./styles/tailwind.css --minify
```

Confirm `tailwind.css` now contains `--color-teal-600` and that `.bg-teal-600` / `.text-teal-600` classes are emitted (Tailwind only emits utilities that appear in scanned files — so add the markup in step 2 BEFORE rebuilding, or run the build after).

---

## Step 2 — Replace the hero markup

Replace the entire current `<header id="hero"> … </header>` block (the centered headline + full-width `hero-image-wrap` + CTA + trust row) with the split layout below. **Keep the global sticky `<nav>` exactly as-is — it is outside the header. Do not embed a nav inside the hero.** The header must still flow cleanly into `<section id="reactions">` immediately after it.

```html
<!-- [SECTION 1: HERO] -->
<header id="hero" class="hero-section relative overflow-hidden min-h-svh">

  <!-- Image band: right half on desktop, becomes lower panel on mobile -->
  <div class="hero-imgband" role="img"
       aria-label="A woman walking home at dusk along a riverwalk, protected by SafetyNet">
    <!-- Status cards overlaid on the image (desktop: bottom-right of band) -->
    <div class="hero-cards">
      <div class="hero-card">
        <span class="hero-card-ic"><i data-lucide="clock"></i></span>
        <span class="hero-card-txt">
          <span class="hero-card-k">Check-in by:</span>
          <span class="hero-card-v">11:30 PM</span>
        </span>
      </div>
      <div class="hero-card">
        <span class="hero-card-ic"><i data-lucide="users"></i></span>
        <span class="hero-card-txt">
          <span class="hero-card-k">Connected to</span>
          <span class="hero-card-link">emergency contacts</span>
        </span>
      </div>
      <div class="hero-card">
        <span class="hero-card-ic"><i data-lucide="shield-check"></i></span>
        <span class="hero-card-txt">
          <span class="hero-card-k">Automatic alert</span>
          <span class="hero-card-ready"><span class="hero-card-dot"></span>ready</span>
        </span>
      </div>
    </div>
  </div>

  <!-- Text column: left half on desktop, top on mobile -->
  <div class="hero-textcol">
    <div class="hero-textcol-inner">
      <h1 class="hero-title text-black tracking-tight">
        &ldquo;Text me when you&rsquo;re safe&rdquo; fails when you can&rsquo;t text.
      </h1>
      <p class="hero-sub text-slate-600">
        SafetyNet sends an alert for you.
      </p>
      <button class="open-registration-modal hero-cta">
        Get Early Access <i data-lucide="arrow-right" class="w-5 h-5"></i>
      </button>

      <div class="hero-trust">
        <span class="hero-trust-item">
          <span class="hero-trust-chk"><i data-lucide="check"></i></span>Automatic alerts
        </span>
        <span class="hero-trust-item">
          <span class="hero-trust-chk"><i data-lucide="check"></i></span>Zero tracking
        </span>
        <span class="hero-trust-item">
          <span class="hero-trust-chk"><i data-lucide="check"></i></span>Your plans private
        </span>
      </div>
    </div>
  </div>

</header>
```

Notes:
- Keep `open-registration-modal` on the CTA — that's the existing hook that opens the registration modal (`js/modal-loader.js`). Do not invent a new handler.
- Status-card copy is **verbatim and locked**: `Check-in by: 11:30 PM`, `Connected to / emergency contacts`, `Automatic alert / ● ready`.
- Headline & sub copy unchanged from current live page.

---

## Step 3 — Hero CSS in `styles/main.css`

Find and **remove** the now-dead rules: `.hero-section`, `.hero-content`, `.hero-image`, `.hero-image-wrap`, `.hero-title` (the old centered layout). Replace with the block below. (Inline `<style>` is avoided to stay CSP-clean — see `docs/CSP-AUDIT-REPORT.md`.)

```css
/* ===== HERO (Light split layout) ===== */
.hero-section { background: #faf9f6; }

/* Image band — right 56% on desktop */
.hero-imgband {
  position: absolute; right: 0; top: 0; bottom: 0; width: 56%;
  background-image: url('../images/hero-riverwalk-left.png');
  background-size: cover; background-position: 40% 45%;
}
.hero-imgband::before {   /* feather the left edge into the cream */
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, #faf9f6 0%, rgba(250,249,246,0.4) 14%, rgba(250,249,246,0) 32%);
}

/* Text column — left 52%, clears the 80px sticky nav */
.hero-textcol {
  position: absolute; left: 0; top: 0; bottom: 0; width: 52%;
  display: flex; align-items: center;
}
.hero-textcol-inner { padding: 5rem 4rem 0; max-width: 560px; }
.hero-title { font-size: clamp(2rem, 4vw, 3.375rem); font-weight: 800; line-height: 1.03; margin: 0 0 1.25rem; text-wrap: balance; }
.hero-sub   { font-size: clamp(1.125rem, 1.6vw, 1.4375rem); font-weight: 400; line-height: 1.4; margin: 0 0 2rem; }

/* CTA — teal pill */
.hero-cta {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 15px 26px; border-radius: 999px; font-size: 16px; font-weight: 700;
  border: 0; cursor: pointer; color: #fff; background: #0d9488; /* teal-600 */
  box-shadow: 0 14px 34px -12px rgba(13,148,136,0.6);
  transition: transform .15s ease, box-shadow .15s ease; margin-bottom: 1.625rem;
}
.hero-cta:hover { transform: translateY(-1px); background: #0f766e; }

/* Trust row */
.hero-trust { display: flex; flex-wrap: wrap; gap: 16px; font-size: 13.5px; font-weight: 500; color: #334155; }
.hero-trust-item { display: flex; align-items: center; gap: 7px; }
.hero-trust-chk  { width: 18px; height: 18px; border-radius: 999px; display: flex; align-items: center; justify-content: center; background: rgba(13,148,136,0.12); color: #0f766e; }
.hero-trust-chk svg { width: 11px; height: 11px; }

/* Status cards (glass, light) */
.hero-cards { position: absolute; right: 40px; bottom: 48px; display: flex; flex-direction: column; gap: 10px; width: 300px; }
.hero-card {
  display: flex; align-items: center; gap: 12px; padding: 12px 15px; border-radius: 14px;
  background: rgba(255,255,255,0.94); color: #0b1220;
  backdrop-filter: blur(18px) saturate(140%); -webkit-backdrop-filter: blur(18px) saturate(140%);
  border: 1px solid rgba(255,255,255,0.7); box-shadow: 0 18px 44px -20px rgba(11,18,32,0.3);
}
.hero-card-ic { width: 38px; height: 38px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: rgba(13,148,136,0.1); color: #0d9488; }
.hero-card-ic svg { width: 19px; height: 19px; }
.hero-card-txt { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.hero-card-k { font-size: 12px; font-weight: 500; opacity: 0.62; }
.hero-card-v { font-size: 17px; font-weight: 700; letter-spacing: -0.01em; font-variant-numeric: tabular-nums; }
.hero-card-link { font-size: 14px; font-weight: 600; color: #0d9488; }
.hero-card-ready { font-size: 14px; font-weight: 700; color: #059669; }
.hero-card-dot { width: 7px; height: 7px; border-radius: 999px; display: inline-block; margin-right: 6px; vertical-align: middle; background: #059669; }

/* ---- Mobile: stack text over a centred image panel ---- */
@media (max-width: 767px) {
  .hero-section { display: flex; flex-direction: column; }
  .hero-imgband {
    position: relative; width: 100%; flex: 1; min-height: 320px; order: 2;
    background-image: url('../images/hero-riverwalk-centre.png'); background-position: 54% 40%;
  }
  .hero-imgband::before { display: none; }
  .hero-textcol { position: relative; width: 100%; order: 1; }
  .hero-textcol-inner { padding: 6.5rem 1.5rem 1.25rem; text-align: center; max-width: none; }
  .hero-cta { width: 100%; justify-content: center; }
  .hero-trust { justify-content: center; }
  .hero-cards { position: absolute; left: 20px; right: 20px; bottom: 18px; width: auto; transform: scale(0.92); transform-origin: bottom center; }
}
```

Adjust `background-position` per art direction if the subject is cropped awkwardly.

---

## Step 4 — Verify

- `npm run build:css` succeeds; `tailwind.css` contains the teal tokens.
- Desktop (≥1280): text left, image right, three glass cards bottom-right of the band, cream feather on the image's left edge, teal CTA. Nav still sticky and unbroken.
- Mobile (390): headline + sub + CTA + trust centred on cream at top; image panel below with cards overlaid; nothing overflows; tap targets ≥44px.
- Lucide icons resolve (clock, users, shield-check, check, arrow-right) — `lucide.createIcons()` runs on load via existing `js/main.js`.
- The `#reactions` section directly follows with no gap/overlap.
- No new CSP violations (no inline styles added; all CSS in `main.css`).
- `open-registration-modal` still opens the registration modal.
- Existing tests still pass: `npm test`. SRI test (`tests/sri.test.js`) — only relevant if any `<script>`/`<link>` hashes changed (they shouldn't here).

---

## Step 5 — HANDOFF.md (required, same commit)

Produce `HANDOFF.md` at repo root using the structure in `docs/safetynet-agent-handoff-workflow_1430.170526.md` and commit it in the same commit as the work. A filled draft is provided alongside this prompt (`hero-light-HANDOFF.md`) — update its DONE / QUALITY GATES / BRANCH fields with the actual commit hash before committing.

**Commit scope:** one task = one logical commit. Stage only: `index.html`, `styles/input.css`, `styles/tailwind.css`, `styles/main.css`, the two `images/hero-riverwalk-*.png`, and `HANDOFF.md`. Run `git status --short` first and stage nothing else.
