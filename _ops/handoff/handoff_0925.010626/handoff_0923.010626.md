# SafetyNet Hero Update — Claude Code Handover

**Outcome:** Production hero updated to the approved two-column **light** composition — copy left, clean riverwalk image + **live** "how-it-works" card right — with **zero regression** to the waitlist conversion path.

**Repo:** `safetynet-landing` (static HTML/CSS/JS, compiled Tailwind, Vercel auto-deploy on `main`).
**Workflow:** preparer → reviewer → human, per `docs/safetynet-agent-handoff-workflow_1430.170526.md`.
**Operate only in** the `safetynet-landing-preparer` worktree on branch `agent/preparer`. Do **not** switch branches in the canonical repo or edit sibling worktrees (`CLAUDE.md`).

**Approved decisions (locked — do not revisit):**
1. Light hero (NOT dark/full-bleed). Nav stays as-is.
2. Keep the 3-item trust row.
3. Image = existing in-repo `images/SN_hero_centre_no-markings_1552.310526.webp`.
4. Card is **live HTML** (replaces the baked-in-image status cards).
5. Implement with **custom CSS in `styles/main.css`** — introduce **no new Tailwind utility classes** (Tailwind is compiled; new utilities won't exist without a rebuild). Reuse only utility classes already present in `index.html`.
6. Repo + npm available.

---

## PART A — PREPARER BRIEF

### Scope (in)
- Rewrite **only** `<header id="hero">…</header>` in `index.html` (currently ~lines 73–130).
- Append one scoped hero CSS block to `styles/main.css`.

### Scope (out — do not touch)
`config.js`, `utils.js`, `constants.js`, `main.js`, `data/faq.json`, `modals/`, `content/`, `vercel.json`, the nav, the registration modal, `styles/input.css` / `styles/tailwind.css` (no Tailwind rebuild). Keep the old image `images/City_riverwalk_clear-colour_EEG_1323.240526.png` on disk (do not delete).

### Pre-flight verification (BLOCKERS — resolve before editing)
1. **Icons exist in the self-hosted bundle.** The card uses `clock`, `phone-off`, `bell-ring`, `shield-check`, `check`; button uses `arrow-right`. Check:
   ```bash
   for i in clock phone-off bell-ring shield-check check arrow-right; do
     grep -q "\"$i\"\|$i:" js/vendor/lucide.min.js && echo "OK $i" || echo "MISSING $i"
   done
   ```
   If `phone-off` or `bell-ring` is MISSING: substitute with a present icon (`phone-off`→`phone`, `bell-ring`→`bell`) and **log the substitution in HANDOFF.md → SKIPPED/REJECTED**. Do not rebuild the bundle without flagging it.
2. **Image present:** confirm `images/SN_hero_centre_no-markings_1552.310526.webp` exists; note its intrinsic width/height for the `<img>` `width`/`height` attrs (prevents CLS).

### Step 1 — Replace the hero markup
Replace the entire `<header id="hero">…</header>` with:

```html
<!-- [SECTION 1: HERO] -->
<header id="hero" class="hero-section bg-slate-50 pt-24 pb-12 lg:pt-28 lg:pb-16 min-h-svh flex flex-col items-center justify-center">
  <div class="hero-content max-w-6xl w-full px-6">
    <div class="hero-grid">

      <!-- LEFT: copy (unchanged conversion CTA + trust row) -->
      <div class="hero-copy">
        <h1 class="hero-title text-4xl md:text-6xl font-extrabold text-black tracking-tight leading-tight">
          "Text me when you're safe" fails when you can't text.
        </h1>
        <p class="hero-sub text-2xl md:text-3xl font-normal text-slate-500 leading-relaxed">
          SafetyNet sends an alert for you.
        </p>

        <!-- DO NOT change this button's id/classes — it is the waitlist conversion trigger -->
        <button id="heroJoinWaitlistBtn" class="open-registration-modal bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 min-h-[44px] rounded-full transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl whitespace-nowrap text-lg">
          Get Early Access <i data-lucide="arrow-right" class="w-5 h-5"></i>
        </button>

        <div class="hero-trust">
          <div class="hero-trust-item">
            <span class="hero-trust-ic"><i data-lucide="check" class="w-3.5 h-3.5"></i></span>
            <span class="text-slate-700 font-medium text-sm">Automatic alerts</span>
          </div>
          <div class="hero-trust-item">
            <span class="hero-trust-ic"><i data-lucide="check" class="w-3.5 h-3.5"></i></span>
            <span class="text-slate-700 font-medium text-sm">Zero tracking</span>
          </div>
          <div class="hero-trust-item">
            <span class="hero-trust-ic"><i data-lucide="check" class="w-3.5 h-3.5"></i></span>
            <span class="text-slate-700 font-medium text-sm">Your plans private</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: clean image + live how-it-works card -->
      <div class="hero-media">
        <img src="images/SN_hero_centre_no-markings_1552.310526.webp"
             alt="A woman walking home along a riverside path at dusk inside a glowing SafetyNet protection sphere"
             class="hero-image" loading="eager" decoding="async" fetchpriority="high"
             width="1700" height="956" />

        <div class="hd-card" aria-label="SafetyNet check-in: you set a check-in time; if you don't check in, your contacts are alerted with your plans">
          <div class="hd-head">
            <span class="hd-brand"><span class="hd-sh"><i data-lucide="shield-check" class="w-[14px] h-[14px]"></i></span>SafetyNet</span>
            <span class="hd-live"><span class="hd-ld"></span>Active</span>
          </div>
          <div class="hd-flow">
            <span class="hd-line"></span>
            <div class="hd-step">
              <span class="hd-node hd-t"><i data-lucide="clock" class="w-[19px] h-[19px]"></i></span>
              <span class="hd-text"><span class="hd-label">You set a check-in time</span><span class="hd-value">Home by 11:30 PM</span></span>
            </div>
            <div class="hd-step">
              <span class="hd-node hd-a"><i data-lucide="phone-off" class="w-[18px] h-[18px]"></i></span>
              <span class="hd-text"><span class="hd-label">You don't check in</span><span class="hd-value hd-muted">No tap detected</span></span>
            </div>
            <div class="hd-step hd-payoff">
              <span class="hd-node hd-t"><i data-lucide="bell-ring" class="w-[18px] h-[18px]"></i></span>
              <span class="hd-text">
                <span class="hd-value" style="font-size:16px;">Your contacts are alerted</span>
                <span class="hd-avs">
                  <span class="hd-av" style="background:#0d9488;">M</span>
                  <span class="hd-av" style="background:#4f46e5;">A</span>
                  <span class="hd-sent"><i data-lucide="check" class="w-[12px] h-[12px]"></i> Sent</span>
                </span>
                <span class="hd-sub">with your plans</span>
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</header>
```

Notes:
- Copy B is already live — keep it verbatim.
- The button keeps its exact `id` + `open-registration-modal` class + `bg-blue-600` styling. **Do not restyle the CTA.**
- No location wording anywhere. Do not reintroduce "last location" / map-pin.

### Step 2 — Append hero CSS to `styles/main.css`
Append this block (custom CSS only — no Tailwind utilities, CSP-safe):

```css
/* ===== Hero: two-column light + live how-it-works card ===== */
.hero-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; width: 100%; }
.hero-copy { display: flex; flex-direction: column; gap: 1.25rem; align-items: center; text-align: center; }
.hero-title { max-width: 16ch; }
.hero-trust { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; margin-top: 0.5rem; }
.hero-trust-item { display: flex; align-items: center; gap: 0.5rem; }
.hero-trust-ic { flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 1.25rem; height: 1.25rem; border-radius: 9999px; background: #eff6ff; color: #0d9488; }
.hero-media { position: relative; }
.hero-media .hero-image { width: 100%; height: auto; border-radius: 1rem; box-shadow: 0 20px 50px -20px rgba(2,6,23,.35); display: block; }

@media (min-width: 1024px) {
  .hero-grid { grid-template-columns: 1.05fr 1fr; gap: 3.5rem; }
  .hero-copy { align-items: flex-start; text-align: left; }
  .hero-trust { justify-content: flex-start; }
}

/* live card */
.hd-card { position: absolute; right: 16px; bottom: 16px; width: min(360px, 88%);
  border-radius: 18px; padding: 14px 16px 16px; color: #0b1220;
  background: rgba(255,255,255,.97);
  backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255,255,255,.8);
  box-shadow: 0 30px 70px -26px rgba(11,18,32,.55);
  font-family: 'Inter', system-ui, -apple-system, sans-serif; }
.hd-head { display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid #eceae3; }
.hd-brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; letter-spacing: -.01em; }
.hd-sh { width: 22px; height: 22px; border-radius: 7px; background: rgba(13,148,136,.1); color: #0d9488; display: flex; align-items: center; justify-content: center; }
.hd-live { display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 700; color: #0f766e; background: rgba(13,148,136,.1); padding: 4px 9px; border-radius: 9999px; }
.hd-ld { width: 6px; height: 6px; border-radius: 9999px; background: #0d9488; animation: hd-pulse 2s infinite; }
@keyframes hd-pulse { 0%{box-shadow:0 0 0 0 rgba(13,148,136,.45);} 70%{box-shadow:0 0 0 7px rgba(13,148,136,0);} 100%{box-shadow:0 0 0 0 rgba(13,148,136,0);} }
.hd-flow { position: relative; display: flex; flex-direction: column; gap: 4px; }
.hd-line { position: absolute; left: 18px; top: 30px; bottom: 48px; width: 2px; background: linear-gradient(180deg,#0d9488,#d97706,#0d9488); opacity: .35; }
.hd-step { position: relative; display: flex; align-items: center; gap: 13px; padding: 7px 0; }
.hd-step.hd-payoff { align-items: flex-start; }
.hd-node { width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; z-index: 1; }
.hd-node.hd-t { background: rgba(13,148,136,.12); color: #0d9488; }
.hd-node.hd-a { background: rgba(217,119,6,.13); color: #d97706; }
.hd-step.hd-payoff .hd-node { box-shadow: 0 0 0 4px rgba(13,148,136,.08); }
.hd-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.hd-label { font-size: 12.5px; font-weight: 500; color: #6b7280; }
.hd-value { font-size: 15px; font-weight: 700; color: #0b1220; letter-spacing: -.01em; }
.hd-value.hd-muted { font-weight: 600; color: #9aa1ac; }
.hd-avs { display: flex; align-items: center; margin-top: 6px; }
.hd-av { width: 24px; height: 24px; border-radius: 9999px; border: 2px solid #fff; font-size: 10px; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; margin-left: -7px; box-shadow: 0 1px 3px rgba(0,0,0,.15); }
.hd-av:first-child { margin-left: 0; }
.hd-sent { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 700; color: #047857; background: rgba(5,150,105,.12); padding: 3px 8px; border-radius: 9999px; margin-left: 8px; }
.hd-sub { font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 3px; }

/* card reflows below the image on small screens (no overlap/overflow) */
@media (max-width: 1023px) {
  .hd-card { position: static; right: auto; bottom: auto; width: 100%; max-width: 360px;
    margin: -40px auto 0; }
}
```

### Step 3 — Verify (preparer, before HANDOFF)
```bash
npm run lint        # expect clean (only if you touched JS — you shouldn't have)
npm test            # SRI + rate-limit suites must stay green
```
- Do **NOT** run `npm run build:css` (no Tailwind classes added).
- Do **NOT** run `node build-faqs.js` unless your deploy pipeline mandates it; if you do, confirm `git diff` shows **no** FAQ changes.
- Manual: open `index.html`, DevTools console must be clean (no errors, **no CSP violations**); all hero icons paint; click "Get Early Access" → registration modal opens, Turnstile renders; resize to 375px → single column, card below image, no horizontal scroll, CTA ≥44px.

### Step 4 — Commit + HANDOFF
- `git status --short` → stage only `index.html`, `styles/main.css`, `HANDOFF.md`.
- Commit all three together. Put the commit ref in HANDOFF → BRANCH.

---

## PART B — QUALITY GATES (pass/fail)

| # | Gate | Pass condition |
|---|------|----------------|
| G1 | **Waitlist conversion intact** | Hero + nav + mobile "Get Early Access" still carry `open-registration-modal`; `#heroJoinWaitlistBtn` unchanged; modal opens; Turnstile renders; honeypot + Worker path untouched |
| G2 | **Icons render** | All hero lucide icons paint, no empty squares (esp. `phone-off`, `bell-ring`, or logged substitutions) |
| G3 | **CSP-clean** | Zero CSP violations in console; no new external origins; no new inline `onclick` |
| G4 | **No console errors** | Clean console on load and on modal open |
| G5 | **Responsive + a11y** | Stacks <1024px, no horizontal overflow, CTA ≥44px, single `<h1>`, `alt` present, hero text contrast ≥ AA |
| G6 | **Build integrity** | `npm test` green; `npm run lint` green; `tailwind.css` NOT regenerated; FAQ markers unchanged |
| G7 | **Performance/LCP** | Hero image stays webp + eager + `width`/`height` set; no LCP regression vs `docs/pagespeed.web.dev_after.pdf` baseline |
| G8 | **Visual parity** | Desktop + mobile match approved design (copy left, image+live card right; no location text; trust row present) |

---

## PART C — HANDOFF.md TEMPLATE (preparer fills + commits)

```
TASK
Update production hero to two-column light layout: copy left; clean riverwalk image
(SN_hero_centre_no-markings_1552.310526.webp) + live "how-it-works" card right. Keep copy B,
keep trust row, preserve waitlist CTA. Custom CSS only. Zero regression.

DONE
[Specific edits to index.html hero block + styles/main.css block. Note icon-verification result.]

SKIPPED / REJECTED
[Icon substitutions if any; anything not done and why — "none" if N/A]

QUALITY GATES
G1 Waitlist conversion intact: PASS/FAIL
G2 Icons render: PASS/FAIL
G3 CSP-clean: PASS/FAIL
G4 No console errors: PASS/FAIL
G5 Responsive + a11y: PASS/FAIL
G6 Build integrity: PASS/FAIL
G7 Performance/LCP: PASS/FAIL
G8 Visual parity: PASS/FAIL

OPEN FOR REVIEWER
[e.g. confirm card-over-image placement at 1024–1280px; confirm icon substitution acceptable]

BRANCH
agent/preparer @ <commit-sha>
```

---

## PART D — REVIEWER BRIEF + REVIEW.md

Read `HANDOFF.md` first. Make **no code changes** — assessment only. Check the diff for `index.html` + `styles/main.css`, run `npm test`, load the page, and exercise the hero (desktop + 375px). Verify each gate independently; pay special attention to **G1 (conversion)** and **G2 (icons)** — those are the regression-critical ones. Confirm **absence** items too: nav unchanged, no Tailwind rebuild, no FAQ diff, old image not deleted.

```
VERDICT: APPROVED / REJECTED

CHECKLIST
- G1 Waitlist conversion intact: YES/NO
- G2 Icons render: YES/NO
- G3 CSP-clean: YES/NO
- G4 No console errors: YES/NO
- G5 Responsive + a11y: YES/NO
- G6 Build integrity (tests green, no tailwind.css diff, no FAQ diff): YES/NO
- G7 Performance/LCP: YES/NO
- G8 Visual parity: YES/NO
- Scope discipline (only hero markup + main.css touched; nav & modal untouched): YES/NO

NOTES
[Material observations]

REJECTED ITEMS
[If rejected — specific reason + what preparer must address]
```
Commit `REVIEW.md` to `agent/preparer`.

---

## PART E — GUARDRAILS / IRREVERSIBLE OPS

- ⚠️ **Merging `agent/preparer` → `main` auto-deploys to the LIVE site (Vercel).** Only a **human** does this, **after** REVIEW = APPROVED. Preparer + reviewer never merge to `main`.
- ⚠️ Stay in the `safetynet-landing-preparer` worktree; never switch branches in the canonical repo; never edit sibling worktrees.
- ⚠️ If `npm run build:css` is ever run, it overwrites the generated `styles/tailwind.css` — don't, unless a Tailwind class was added (it shouldn't be); if so, commit the regenerated file in the same commit and re-run `npm test`.
- ✅ Fully git-reversible. No DB/data/destructive ops. Old hero image retained for instant revert.
- Rollback plan: `git revert <commit-sha>` on `agent/preparer` (pre-merge) or on `main` + redeploy (post-merge).
