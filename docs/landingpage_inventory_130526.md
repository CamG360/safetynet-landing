# SafetyNet Landing Page — Section Inventory
**Date:** 13 May 2026
**Source:** `index.html` on branch `fix/section-numbering-and-anchor-ids`

---

## Sections

| # | Name | `id` | Line | Description |
|---|---|---|---|---|
| 1 | HERO | `hero` | L72 | Two-column layout. Left: headline ("Your silent safeguard for everyday life"), "Get Early Access" CTA, three trust bullets (Automatic alerts / No phone needed / Customizable). Right: Run-shop-walk triptych image. |
| 2 | MENTAL MODEL | `problem` | L134 | Side-by-side "Without SafetyNet / With SafetyNet" comparison. Illustrations + 3 icon-text rows each side (notification, calendar, list). Subheading: "Automatic protection when you can't reach your phone". |
| 3 | WHY JOIN NOW | `why-now` | L260 | Single-line banner strip. Copy: "Early members get first access and lifetime discounts." No CTA button — social proof nudge only. |
| 4 | HOW IT WORKS | `concept` | L271 | 3-step flow with mock phone UI cards: (1) Set Check-in Time, (2) SafetyNet Active — tap "I'm Safe", (3) Alert Sent — contacts notified automatically. "See what your contacts receive" demo button. |
| 5 | EXAMPLES | `examples` | L432 | 3 use-case cards in a grid: Solo Travel, Modern Dating, Marketplace Sales. Each shows Check-in Time + Info + Action fields. Tagline: "Live your life. We've got your back." |
| 6 | FIRST REACTIONS | `beta-feedback` | L572 | Testimonials. 3 quote cards: Zolania (student, London), Catherine (mother, Houston), David (risk manager, Auckland). Label: "First Reactions". |
| 7 | COMPARISON | `comparison` | L663 | SafetyNet vs standard location apps. Header div (dark teal): "More than just a dot on a map." Table (desktop) / stacked cards (mobile). 3 features: Automatic Safety Alerts, Essential Info Shared, Action Plan. |
| 8 | OUR STORY | `our-story` | L898 | Founder section. Photo + bio (Campbell McCord). Narrative: "Why I Built SafetyNet" — control systems background applied to personal safety. Pull quote in teal callout block. |
| 9 | FAQ | `faq` | L950 | Searchable, filterable accordion. 5 category tabs: Getting Started, How It Works, Privacy & Security, Why SafetyNet, Launch & Pricing. 21 questions total. Contact callout at bottom. |
| 10 | FOOTER | `footer` | L1231 | Dark (slate-900) footer. Top: "Secure Your Spot" CTA + "Get Early Access" button. Grid: Product / Company / Legal columns. Copyright: © 2026 Acorn 360 Ltd. |

---

## Modals

| # | Name | Trigger |
|---|---|---|
| 1 | Demo Alert | "See what your contacts receive" button (Section 4) |
| 2 | Registration / Waitlist | All "Get Early Access" CTAs (nav, hero, footer, sticky mobile button) |
| 3 | Privacy Policy | Footer Legal link |
| 4 | Terms of Service | Footer Legal link |

---

## Navigation anchors

| Label | `href` | Resolves to |
|---|---|---|
| Overview | `#problem` | Section 2 — Mental Model |
| How it Works | `#concept` | Section 4 — How It Works |
| Examples | `#examples` | Section 5 — Examples |
| Our Story | `#our-story` | Section 8 — Our Story |
| FAQ | `#faq` | Section 9 — FAQ |
