# SafetyNet Landing Hero Repair Handover

**Date:** 2026-06-01
**Purpose:** Give the next implementer a clear, practical brief for repairing the landing-page hero.
**Status:** Ready for implementation planning; this document is the handover brief, not the implementation.
**Primary page:** `index.html`
**Target hero reference:** `images/design-log/yes/SN_light_desktop_1705.310526.png`
**Mobile reference:** `images/design-log/yes/SN_light_mobile_1705.310526.png`

---

## 1. Plain-English task

Update the SafetyNet landing-page hero so the top of the page visually matches the supplied **Light hero** target image.

The target hero shows:

- SafetyNet logo/navigation across the top.
- A cream/off-white left panel with the headline, subheading, CTA, and trust row.
- A right-side hero image panel showing the riverwalk/night safety visual.
- Three light/glass status cards over the lower-right area of the image.
- Teal used as the primary accent for the hero CTA and status-card highlights.

Do **not** treat the older `HANDOFF.md` as the implementation brief. It is a record of a previous attempt, not enough by itself to guide the repair.

---

## 2. Source-of-truth references

Use these files as the visual source of truth:

| Purpose | File |
|---|---|
| Desktop target hero | `images/design-log/yes/SN_light_desktop_1705.310526.png` |
| Mobile target hero | `images/design-log/yes/SN_light_mobile_1705.310526.png` |
| Current desktop hero asset | `images/SN_hero_left_no-markings_1554.310526.webp` |
| Current mobile/centre hero asset | `images/SN_hero_centre_no-markings_1552.310526.webp` |
| Source PNG, if needed | `images/SN_hero_left_no-markings_1554.310526.png` |
| Source PNG, if needed | `images/SN_hero_centre_no-markings_1552.310526.png` |

If a visual decision conflicts with an older written note, prefer the target images above and flag the conflict in the implementation summary.

---

## 3. Current repo state to be aware of

The current page already has a previous hero-light attempt in place:

- `index.html` contains a `header#hero` with `hero-imgband`, `hero-textcol`, `hero-cta`, `hero-trust`, and `hero-cards` markup.
- `styles/main.css` contains a `HERO (Light split layout)` block.
- `styles/input.css` defines teal theme tokens.
- `styles/tailwind.css` has been rebuilt with teal utilities.
- WebP hero assets exist and are currently referenced by the CSS.

However, the previous handover was not specific enough about how to judge the final visual result. The repair should compare the implementation against the target hero images directly.

---

## 4. Scope

### In scope

The implementation may edit these files if needed:

- `index.html`
- `styles/main.css`
- `styles/input.css` only if theme tokens need correction
- `styles/tailwind.css` if `styles/input.css` or Tailwind classes change and CSS rebuild is required
- hero image assets only if compression, format, or crop changes are explicitly required

### Out of scope unless explicitly approved

Do not change these areas unless the hero cannot be matched without doing so:

- sections below the hero, including `#reactions`, `#problem`, `#concept`, `#examples`, `#our-story`, `#faq`, and footer content
- JavaScript behavior unrelated to opening the existing registration modal
- form handling, Turnstile, SRI, security headers, Vercel config, or tests
- global copy outside the hero/nav area

### Navigation scope decision

The target screenshot visually includes the navigation at the top of the hero. The previous attempt treated the global sticky nav as mostly out of scope and left the desktop nav CTA blue.

For the repair, the implementer must make an explicit decision and document it:

- **If matching the screenshot strictly:** nav appearance, including the top-right CTA colour, is in scope.
- **If preserving existing site nav is preferred:** leave nav behavior/layout alone, but note that the result will intentionally differ from the target screenshot.

Do not silently change the nav without documenting why.

---

## 5. Required hero content

Use this content unless the product owner provides updated copy:

- Headline: `“Text me when you're safe” fails when you can't text.`
- Subheading: `SafetyNet sends an alert for you.`
- Primary CTA: `Get Early Access`
- Trust row:
  - `Automatic alerts`
  - `Zero tracking`
  - `Your plans private`
- Status cards:
  - `Check-in by:` / `11:30 PM`
  - `Connected to` / `emergency contacts`
  - `Automatic alert` / `ready`

The primary hero CTA must keep the `open-registration-modal` class so the existing registration modal still opens.

---

## 6. Visual acceptance criteria

### Desktop

At desktop width, the hero should match `SN_light_desktop_1705.310526.png` closely enough that the same structure is obvious at a glance:

- Left side is cream/off-white and contains the text content.
- Right side is dominated by the hero image.
- The image crop keeps the person and protective arc visually central/intentional.
- A soft cream feather/gradient blends the left panel into the image.
- The CTA is teal, pill-shaped, and visually prominent.
- Three light/glass cards sit over the lower-right image area.
- Cards should feel layered over the image, not like a normal page section below it.
- The hero should fill the first viewport or near-first viewport without awkward blank space.
- The next section should begin cleanly below the hero with no overlap or horizontal scroll.

### Mobile

At mobile width, the hero should match the mobile target direction:

- Text appears first.
- CTA remains easy to tap.
- Trust row remains readable or intentionally simplified.
- Image appears below the text.
- Status cards remain visible and do not overflow horizontally.
- No horizontal scrolling.
- No important subject matter is awkwardly cropped.

### Cross-browser/behavioral

- Lucide icons render correctly.
- The `Get Early Access` hero CTA opens the registration modal.
- Existing mobile nav still opens/closes.
- Existing anchor links still work.

---

## 7. Implementation guidance

Recommended approach:

1. Open the desktop and mobile target images before editing.
2. Compare the current `index.html` hero and `styles/main.css` hero block against the target.
3. Make the smallest focused changes needed to match the target.
4. Keep all hero-specific layout rules grouped in the existing hero CSS area where possible.
5. Avoid inline styles and inline event handlers.
6. If changing Tailwind theme tokens or classes, rebuild `styles/tailwind.css`.
7. Capture before/after screenshots if browser tooling is available.

Do not normalize repo-wide CRLF or reformat unrelated files as part of this task.

---

## 8. Quality gates for the implementation task

For a future code implementation, run:

| Gate | Command | Expected result |
|---|---|---|
| CSS build | `npm run build:css` | Pass |
| Unit tests | `npm test` | Pass |
| Lint | `npm run lint` | May show known pre-existing CRLF issue; do not fix globally unless separately approved |
| Reactions smoke | `npx playwright test tests/reactions.smoke.spec.js` | Known stale pause-button assertion may fail; document exact result |
| Visual check | screenshot/browser review | Desktop and mobile hero match target images |

For documentation-only updates to this handover, do not run full tests/linters unless requested. Use `git diff --check` and confirm only intended docs changed.

---

## 9. Known pre-existing issues

- `npm run lint` has previously reported CRLF line-ending issues across JS/test files. Treat that as pre-existing unless the implementation changes those files.
- `tests/reactions.smoke.spec.js` has previously had one stale assertion for a removed pause button. Treat that as pre-existing unless the implementation changes the reactions section.
- Older comments in `index.html` may say teal is not defined in `@theme`; teal is now defined. If a touched comment becomes misleading, update only that nearby comment.

---

## 10. Open questions for the owner

Before implementation, confirm if possible:

1. Should the top navigation CTA be changed from blue to teal to match the target screenshot?
2. Should the hero be treated as a strict pixel/visual match, or as a close implementation using the existing site nav?
3. Should the PNG source files remain in the repo for archival purposes, or are WebP assets sufficient?

If these are not answered, proceed conservatively and document the assumptions in the implementation summary.
