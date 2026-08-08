# SafetyNet Landing — Colour Audit

Generated: 2026-05-09  
Working tree: `dazzling-ishizaka-53d36a`

---

## 1. Active colour system (warm-palette branch)

The warm-palette overrides (`styles/warm-palette-overrides.css`, imported first in `main.css`) are the **live** colours on the landing page. They replace the default blue theme.

```css
/* styles/warm-palette-overrides.css */
:root {
  --sn-warm-bg:       #FAF7F2;   /* body / card backgrounds */
  --sn-primary:       #0D9488;   /* Gemini teal — CTA buttons, links, progress bar */
  --sn-primary-hover: #0B5351;   /* darker teal for hover states */
}
```

| Tailwind class | Overridden to |
|---|---|
| `bg-white`, `bg-slate-50`, `bg-slate-50/50` | `#FAF7F2` |
| `bg-blue-600`, `hover:bg-blue-700`, `#scrollProgressBar` | `#0D9488` |
| `text-blue-600`, `hover:text-blue-600` | `#0D9488` |
| `bg-blue-50` | `#F0FDFA` (teal-tinted near-white) |
| `text-blue-700` | `#0B5351` |
| `.shadow-blue-200` | `rgba(13, 148, 136, 0.18)` |
| `.hero-gradient`, `.background-glow` | teal radial gradient |

---

## 2. Tailwind theme tokens (`styles/input.css`)

All tokens are defined via `@theme` in oklch. The only hex in the theme file is `--color-navy-900`.

```css
/* Blue scale — hue 250 */
--color-blue-50:  oklch(0.97 0.01 250)
--color-blue-100: oklch(0.93 0.03 250)
--color-blue-200: oklch(0.85 0.06 250)
--color-blue-300: oklch(0.75 0.11 250)
--color-blue-400: oklch(0.65 0.16 250)
--color-blue-500: oklch(0.57 0.20 250)
--color-blue-600: oklch(0.50 0.22 250)
--color-blue-700: oklch(0.43 0.20 250)
--color-blue-800: oklch(0.36 0.16 250)
--color-blue-900: oklch(0.30 0.12 250)

/* Slate scale — hue 240 */
--color-slate-50:  oklch(0.98 0.00 240)
--color-slate-100: oklch(0.96 0.01 240)
--color-slate-200: oklch(0.93 0.01 240)
--color-slate-300: oklch(0.87 0.01 240)
--color-slate-400: oklch(0.71 0.02 240)
--color-slate-500: oklch(0.54 0.03 240)
--color-slate-600: oklch(0.42 0.03 240)
--color-slate-700: oklch(0.35 0.03 240)
--color-slate-800: oklch(0.25 0.03 240)
--color-slate-900: oklch(0.16 0.03 240)

/* Red — hue 25 */
--color-red-50:  oklch(0.97 0.02 25)
--color-red-100: oklch(0.94 0.05 25)
--color-red-200: oklch(0.88 0.10 25)
--color-red-300: oklch(0.79 0.16 25)
--color-red-400: oklch(0.68 0.21 25)
--color-red-500: oklch(0.58 0.24 25)
--color-red-600: oklch(0.50 0.24 25)
--color-red-700: oklch(0.42 0.21 25)
--color-red-800: oklch(0.36 0.17 25)
--color-red-900: oklch(0.31 0.14 25)

/* Green — hue 145 */
--color-green-50:  oklch(0.97 0.02 145)
--color-green-100: oklch(0.94 0.05 145)
--color-green-200: oklch(0.88 0.10 145)
--color-green-300: oklch(0.79 0.16 145)
--color-green-400: oklch(0.68 0.21 145)
--color-green-500: oklch(0.58 0.24 145)
--color-green-600: oklch(0.50 0.24 145)
--color-green-700: oklch(0.42 0.21 145)
--color-green-800: oklch(0.36 0.17 145)
--color-green-900: oklch(0.31 0.14 145)

/* Emerald — hue 160 */
--color-emerald-50:  oklch(0.97 0.02 160)
--color-emerald-100: oklch(0.94 0.05 160)
--color-emerald-200: oklch(0.88 0.10 160)
--color-emerald-300: oklch(0.79 0.16 160)
--color-emerald-400: oklch(0.68 0.21 160)
--color-emerald-500: oklch(0.63 0.19 160)
--color-emerald-600: oklch(0.55 0.17 160)
--color-emerald-700: oklch(0.47 0.14 160)
--color-emerald-800: oklch(0.39 0.11 160)
--color-emerald-900: oklch(0.33 0.09 160)

/* Amber — hue 85/75/65/55 */
--color-amber-50:  oklch(0.98 0.02 85)
--color-amber-100: oklch(0.95 0.05 85)
--color-amber-200: oklch(0.90 0.10 85)
--color-amber-300: oklch(0.83 0.15 85)
--color-amber-400: oklch(0.76 0.18 85)
--color-amber-500: oklch(0.70 0.18 75)
--color-amber-600: oklch(0.62 0.17 65)
--color-amber-700: oklch(0.52 0.15 55)
--color-amber-800: oklch(0.44 0.13 55)
--color-amber-900: oklch(0.38 0.11 55)

/* Pink — hue 350 */
--color-pink-50:  oklch(0.97 0.02 350)
--color-pink-100: oklch(0.94 0.05 350)
--color-pink-200: oklch(0.88 0.10 350)
--color-pink-300: oklch(0.79 0.16 350)
--color-pink-400: oklch(0.68 0.21 350)
--color-pink-500: oklch(0.58 0.24 350)
--color-pink-600: oklch(0.50 0.24 350)
--color-pink-700: oklch(0.42 0.21 350)
--color-pink-800: oklch(0.36 0.17 350)
--color-pink-900: oklch(0.31 0.14 350)

/* Purple — hue 290 */
--color-purple-50:  oklch(0.97 0.02 290)
--color-purple-100: oklch(0.94 0.05 290)
--color-purple-200: oklch(0.88 0.10 290)
--color-purple-300: oklch(0.79 0.16 290)
--color-purple-400: oklch(0.68 0.21 290)
--color-purple-500: oklch(0.58 0.24 290)
--color-purple-600: oklch(0.50 0.24 290)
--color-purple-700: oklch(0.42 0.21 290)
--color-purple-800: oklch(0.36 0.17 290)
--color-purple-900: oklch(0.31 0.14 290)

/* Neutrals */
--color-white:     oklch(1 0 0)
--color-black:     oklch(0 0 0)
--color-navy-900:  #1a1a2e
```

`tailwind.config.js` has no `theme.colors` block — all tokens come from `@theme` in `input.css`.

---

## 3. Hardcoded hex / rgba in `styles/main.css`

| Line | Value | Context |
|---|---|---|
| 24 | `rgba(37, 99, 235, 0.1)` | `.form-input:focus` ring (legacy blue-600, not teal-overridden) |
| 177 | `#E53935` | `--alert-red` (alert card header bg) |
| 178 | `#FFEBEE` | `--alert-red-light` (progress bar bg, instruction number bg) |
| 179 | `#C62828` | `--alert-red-dark` (unused in CSS, defined for JS) |
| 203 | `rgba(255, 255, 255, 0.2)` | `.alert-icon` background |
| 386 | `rgba(59, 130, 246, 0.18/0.06/0)` | `.safetynet-visual .background-glow` (overridden by warm-palette) |
| 429 | `rgba(59, 130, 246, 0.18/0.06/0)` | `.safetynet-logo .background-glow` (overridden by warm-palette) |

---

## 4. Standalone form page (`styles/form.css`)

This file is scoped to the standalone form page only and has its own `:root` — it is **not** affected by warm-palette-overrides.

```css
:root {
  --brand-blue:       #3B82F6;
  --brand-blue-dark:  #2563EB;
  --brand-blue-light: #60A5FA;
  --text-primary:     #1a1a2e;
  --text-secondary:   #64648c;
  --text-muted:       #9494b8;
  --border-color:     #e2e2f0;
  --border-focus:     #3B82F6;
  --bg-white:         #ffffff;
  --bg-light:         #f8f9fc;
  --bg-blue-tint:     #f0f4ff;
  --error-red:        #dc2626;
  --error-bg:         #fef2f2;
  --success-green:    #16a34a;
  --success-bg:       #f0fdf4;
}
```

Additional inline values:
| Line | Value | Context |
|---|---|---|
| 58–59 | `#60A5FA → #3B82F6 → #2563EB` | form header gradient |
| 66 | `#ffffff` | form header h1 colour |
| 73 | `rgba(255, 255, 255, 0.9)` | form header p colour |
| 121 | `rgba(59, 130, 246, 0.12)` | input focus ring |
| 129 | `rgba(220, 38, 38, 0.12)` | error input focus ring |
| 197 | `#ffffff` | `.btn-primary` text colour |
| 209 | `rgba(59, 130, 246, 0.3)` | `.btn-secondary` border |
| 357 | `rgba(59, 130, 246, 0.2)` | `.user-testing-box` border |
| 377 | `rgba(220, 38, 38, 0.2)` | `.form-error` border |
| 399 | `#991b1b` | form error heading colour |
| 405 | `#b91c1c` | form error body colour |

---

## 5. Quick-reference summary

| Token / value | Hex approx | Where used |
|---|---|---|
| `--sn-primary` | `#0D9488` | CTA buttons, links, scroll bar (landing page) |
| `--sn-primary-hover` | `#0B5351` | Hover states (landing page) |
| `--sn-warm-bg` | `#FAF7F2` | Body / card backgrounds (landing page) |
| `--color-navy-900` | `#1a1a2e` | Dark text |
| `--alert-red` | `#E53935` | Safety alert card |
| `--alert-red-light` | `#FFEBEE` | Alert card accents |
| `--brand-blue` | `#3B82F6` | Form page primary (not overridden) |
| `--error-red` | `#dc2626` | Form validation errors |
| `--success-green` | `#16a34a` | Form success state |
