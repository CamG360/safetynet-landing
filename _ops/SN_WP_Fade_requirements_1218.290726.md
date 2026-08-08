# SN Hero Overlay Fade — Requirements & Calibration Reference
`SN_WP_Fade_requirements_1218.290726`

**Status:** Work in progress — fade removed from live build pending visual recalibration against updated hero image.

---

## Context

The hero section (`#hero`, Section 1) uses a full-bleed background image with a `.hero-overlay` div layered above it (z-index 1). The overlay's role is a **text protection scrim**: the left side of the hero carries white copy (headline, subhead, CTA, trust badges) which requires sufficient contrast against a photographic background.

Current hero image: `images/SN_hero_centre_no-markings_light_GPT_1151.290726.webp` (1672×941, high-key, bright daytime/dusk palette).

---

## Original Fade Specification (tuned for old dark image)

```css
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    105deg,
    rgba(2,6,23,.92)  0%,
    rgba(2,6,23,.75) 40%,
    rgba(2,6,23,.35) 70%,
    rgba(2,6,23,.10) 100%
  );
}
```

**Colour:** `rgb(2,6,23)` — near-black navy, matching the site's dark palette token.

**Direction:** 105° — left-heavy with a slight diagonal, following the hero grid layout (copy left, image subject right).

**Stop intent:**

| Stop | Opacity | Zone |
|---|---|---|
| 0% | .92 | Far left — full text legibility; near-opaque |
| 40% | .75 | Copy tail / transition; still heavily darkened |
| 70% | .35 | Image begins to show through |
| 100% | .10 | Far right — near-transparent; image subject reads cleanly |

**Original image context:** `SN_hero_centre_no-markings_1552.310526.webp` — dark, moody dusk scene. The heavy overlay blended naturally into the image's own darkness.

---

## Why It Failed on the New Image

`SN_hero_centre_no-markings_light_GPT_1151.290726.webp` is a high-key, bright image. Applying a .92 opacity scrim at the left produced a visibly crushed, over-darkened result inconsistent with the source image's tone.

**Interim fix applied (commit `2c888ba`):** overlay set to `background: none` — fade removed entirely. Image renders raw. Copy legibility not yet validated at all viewport widths.

---

## Requirements for Re-tuned Fade

The same structural shape is correct — left-dark, right-open, 105° diagonal. The opacity values need to come down to suit the brighter source.

**Starting point for calibration:**

```css
background: linear-gradient(
  105deg,
  rgba(2,6,23,.55)  0%,
  rgba(2,6,23,.40) 40%,
  rgba(2,6,23,.18) 70%,
  rgba(2,6,23,.05) 100%
);
```

**Constraints:**
- White headline and subhead must pass WCAG AA contrast (4.5:1) against the left zone at all tested viewport widths.
- The woman and glowing sphere on the right must remain clearly visible — do not let the 70% stop creep above ~.25.
- Test at: desktop (1440px), tablet (iPad Pro), mobile (iPhone 13/14, Pixel 5).

**Open question:** At narrow viewports the layout collapses to single-column (copy above image). Confirm whether the overlay still applies at mobile or whether it should be suppressed below a breakpoint when the image is below the copy.

---

## File References

| Asset | Path |
|---|---|
| Hero image (live) | `images/SN_hero_centre_no-markings_light_GPT_1151.290726.webp` |
| Overlay CSS | `styles/main.css` line ~855 (`.hero-overlay`) |
| Hero `<img>` | `index.html` line 74–78 |

---

*Preparer: C1 (Claude Sonnet 4.6) · 1218.290726*
