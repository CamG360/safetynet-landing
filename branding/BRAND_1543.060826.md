# SafetyNet — Brand & Style Reference

**Status:** Live (extracted from production CSS, August 2026)
**Date:** 2026-08-06
**Sources:** `styles/main.css`, `styles/input.css`, `styles/form.css`, `SScolour-audit.md`, `docs/design-brief-iteration-2_2605026.md`

---

## Design Principles

- **Minimal over decorated** — whitespace is the primary visual element
- **Single-composition hero** — image + UI overlay + copy as one unit; no separate sub-hero
- **Confidence, not fear** — imagery shows urban, real-life scenarios; women 25–40 primary audience
- **Clarity before cleverness** — Inter only; no display fonts, no decorative type

---

## Color System

### Brand tokens (CSS custom properties, `main.css:9–13`)

| Token | Hex | Use |
|-------|-----|-----|
| `--sn-primary` | `#0f766e` | CTA buttons, links, scroll progress bar, active states |
| `--sn-primary-hover` | `#115e59` | Hover states for all primary elements |
| `--sn-warm-bg` | `#faf7f2` | Body background, card backgrounds |

### Extended palette (key values in use)

| Role | Value | Where defined |
|------|-------|---------------|
| Dark text / navy | `#1a1a2e` (`--color-navy-900`) | `input.css` |
| Teal tint bg | `#f0fdfa` | `main.css:46` (overrides `bg-blue-50`) |
| Primary teal shadow | `rgba(15, 118, 110, 0.18)` | `main.css:55` |
| Focus ring (outer) | `#ffffff` 3px + `--sn-primary-hover` 5px spread | `main.css:72–76` |
| Disabled button bg | `#475569` (slate-600) | `main.css:226` |
| Dividers | `var(--color-slate-200)` | FAQ borders, separators |

### Alert card (demo component)

The alert card uses teal (not red) in the live build:

| Token | Value | Role |
|-------|-------|------|
| `--alert-red` | `#0D9488` | Alert header background (teal) |
| `--alert-red-light` | `#EAF8F6` | Light teal accent |
| `--alert-red-dark` | `#0B5351` | Dark teal accent |

> Note: variable names retain legacy `alert-red` naming but the palette is teal.

### Form page (isolated scope, `styles/form.css`)

The standalone form page does not inherit the warm-teal overrides. It uses its own blue palette:

| Token | Value |
|-------|-------|
| `--brand-blue` | `#3B82F6` |
| `--brand-blue-dark` | `#2563EB` |
| `--text-primary` | `#1a1a2e` |
| `--error-red` | `#dc2626` |
| `--success-green` | `#16a34a` |

---

## Typography

### Typeface

- **Inter** — sole typeface, applied globally
- Self-hosted: `fonts/inter-latin-300-700.woff2`
- Weight range: 300 (light) → 700 (bold)
- `font-display: swap`

```css
body { font-family: 'Inter', sans-serif; }
```

### Heading scale (extracted from `index.html`)

| Level | Role | Mobile | Desktop | Weight | Tracking / Leading | Color |
|-------|------|--------|---------|--------|--------------------|-------|
| H1 | Hero title | `text-4xl` (2.25rem) | `text-6xl` (3.75rem) | `font-extrabold` (800) | `tracking-tight leading-tight` | `text-slate-900` |
| H2 | Section heading (large) | `text-4xl` (2.25rem) | — | `font-extrabold` (800) | `tracking-tight` | `text-slate-900` |
| H2 | Section heading (standard) | `text-3xl` (1.875rem) | `text-4xl` (2.25rem) | `font-bold` (700) | — | `text-slate-900` |
| H2 | Section heading (responsive) | `text-xl` (1.25rem) | `lg:text-4xl` (2.25rem) | `font-bold` (700) | `leading-snug` | `text-slate-900` |
| H2 | Comparison banner | `text-4xl` (2.25rem) | `text-5xl` (3rem) | `font-bold` (700) | — | white (on teal bg) |
| H3 | Card / subsection | `text-xl` (1.25rem) | — | `font-bold` (700) | — | `text-slate-900` |
| H3 | Feature label | `text-lg` (1.125rem) | — | `font-bold` (700) | — | `text-slate-900` |

### Supporting text scale (extracted from `index.html`)

| Role | Size | Weight | Color | Notes |
|------|------|--------|-------|-------|
| Eyebrow / label | `text-xs` (0.75rem) | `font-bold` | `text-teal-600` | `uppercase tracking-wide/widest` |
| Hero subtitle | `1.125rem` | — | `text-slate-600` | `max-width: 600px` (from main.css) |
| Body lead | `text-lg` → `text-xl` | — | `text-slate-600` | Section intros |
| Body standard | `text-sm` → `text-base` | — | `text-slate-500` | Card body, supporting copy |
| Body emphasis | `text-sm` → `text-base` | `font-medium` | `text-slate-800` | Inline emphasis |
| Testimonial quote | `text-xl` → `text-3xl` | `font-semibold` | `text-slate-900` | `leading-snug` |
| Card micro-label | `text-[10px]` | `font-bold` | `text-slate-400` | `uppercase tracking-wider` |
| Alert title | `14px` | 600 | white | `letter-spacing: 0.5px`, uppercase (from main.css) |

### CSS-defined values (from main.css)

| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| Alert body text | `15px` | — | — |
| Alert label | `13px` | 600 | — |
| Alert value | `16px` | — | — |
| Pulse timestamp | `12px` | 700 | — |

---

## Spacing & Layout

### Navigation

| Property | Value |
|----------|-------|
| Nav height | `--nav-height` CSS variable (set in JS) |
| Scroll indicator height | `--scroll-indicator-height` |
| Mobile menu trigger | fixed, `inset: 80px 0 auto` |
| Mobile nav logo spacing | `margin-right: 8px` |

### Hero section padding (responsive)

| Breakpoint | Padding-top formula |
|------------|---------------------|
| Mobile | `var(--nav-height) + var(--scroll-indicator-height) + env(safe-area-inset-top)` |
| `≥768px` | + `clamp(24px, 4vh, 44px)` |
| `≥1024px` | + `clamp(28px, 4.5vh, 52px)` |
| `≥1024px` + short viewport (`≤820px`) | flat `20px`, `pb: 32px` |

### Founder photo

| Property | Value |
|----------|-------|
| Size desktop | `140 × 140px` |
| Size mobile | `120 × 120px` |
| Border-radius | `12px` |
| Shadow | `0 4px 20px rgba(0, 0, 0, 0.1)` |

---

## Motion & Animation

| Pattern | Duration | Easing |
|---------|----------|--------|
| Modal scale-in | `0.2s ease-in-out` | — |
| Mobile menu slide | `0.3s ease-in-out` | — |
| Accordion expand | `0.3s ease` | — |
| Form input focus | `0.2s ease` | — |
| Spinner | `0.8s linear infinite` | — |
| Scroll progress bar | CSS variable driven | — |

---

## Logo

The SVG logo renders as a "bubble" network node. In the nav it is scaled:

```css
.nav-logo-icon {
    transform: scale(0.45);
    transform-origin: center;
    margin-right: 8px;
}
```

Icon color follows `var(--sn-primary)`.

---

## Component States

### CTA button (primary)

- Background: `var(--sn-primary)` → hover `var(--sn-primary-hover)`
- Text: white
- Disabled: `background #475569`, text white, `cursor: not-allowed`

### Focus ring (global, all interactive elements)

```css
outline: 3px solid #ffffff;
outline-offset: 2px;
box-shadow: 0 0 0 5px var(--sn-primary-hover);
```

### FAQ category button

- Default: `bg: var(--color-slate-100)`, `color: var(--color-slate-500)`
- Hover: `bg: var(--color-slate-200)`
- Active: `bg: var(--sn-primary)`, `color: white`, `border: var(--sn-primary)`

---

## Known Gaps

| Gap | Status |
|-----|--------|
| Heading type scale extracted from index.html — not enforced via tokens | Documented above; token consolidation open |
| Form page (form.css) uses separate blue palette — not unified with warm-teal | By design, not yet reviewed |
| Context brief Visual Identity section updated August 2026 — warm-teal confirmed canonical | Resolved |
| No logo clearance or misuse rules documented | Open |
| No spacing scale (8pt grid or equivalent) | Open |

---

## Source map

| Topic | File |
|-------|------|
| Full color audit | `SScolour-audit.md` (superseded snapshot — values in this doc are authoritative) |
| Token definitions (oklch scale) | `styles/input.css` |
| Live overrides | `styles/main.css:1–76` |
| Form page palette | `styles/form.css` |
| Design direction | `docs/design-brief-iteration-2_2605026.md` |
| Product & market context | `docs/context/safetynet-context-brief_0928.240526.md` |
