```markdown
# Image Doom Loop Prevention Guide
*Mental Model for Web Image Troubleshooting*
:contentReference[oaicite:0]{index=0}

---

## The Three Layers

| Layer | What It Controls | Examples | When to Change |
|------|------------------|----------|---------------|
| **1. Image File (The Source)** | Visual quality, file size, load time | PNG, WebP, AVIF; 700×700px; 75% compression | Image blurry/pixelated; page loads slowly; file too large |
| **2. HTML Attributes (The Bridge)** | Space reservation, layout shift prevention, browser hints | `width="700"` `height="700"` `loading="lazy"` | Layout shifts during load *(never for display size)* |
| **3. CSS (The Display)** | Visual size on screen, responsiveness, cropping/overflow | `w-48 md:w-64`, `h-full`, `object-contain`, `transform: scale()` | Image too big/small; breakpoint-specific sizing |

---

## Doom Loop Matrix: Cross-Layer Side Effects

Shows how changes in one layer unexpectedly affect another.

| You Change… | Image File | HTML Attributes | CSS |
|------------|------------|-----------------|-----|
| **Image File** (resize, recompress) | — | May need to update `width/height` | **No effect** on display size |
| **HTML Attributes** (`width`, `height`) | No effect | — | **No effect** on display size |
| **CSS Display Size** (`w-64`, `h-48`) | No effect | No effect | — |
| **CSS Container** (parent size) | No effect | No effect | May clip if `overflow:hidden` |
| **CSS Transform** (`scale`, `rotate`) | No effect | No effect | Visual size changes, layout unchanged → misalignment |

**Key insight:** Changing image file dimensions does **not** change display size.
CSS controls display size. This mismatch causes most doom loops.

---

## Decision Tree: Diagnose → Fix at the Right Layer

### Step 1: Identify the Symptom

| Symptom | Root Cause Layer | Action |
|-------|------------------|--------|
| Image blurry/pixelated | Image File | Export higher resolution (≈2× display for retina) |
| Page loads slowly | Image File | Compress, convert to WebP, reduce dimensions |
| Image wrong size on screen | CSS | Adjust `w-XX` / `h-XX` on `<img>` |
| Image cut off/cropped | CSS (Container) | Remove `overflow:hidden` or increase container |
| Layout jumps during load | HTML Attributes | Add `width` and `height` |
| Different sizes mobile/desktop | CSS | Use responsive classes (`w-48 md:w-64`) |

---

## Step 2: Preferred Fix Pattern (Sustainable)

| Principle | Implementation |
|---------|----------------|
| Control size on `<img>` | `class="w-48 md:w-64"` |
| Remove fixed container heights | Replace `<div class="h-48">` with `<div>` |
| Avoid transforms for sizing | Remove `transform: scale()` |
| Match HTML attrs to file | `width="700" height="700"` |
| Prefer width-based sizing | Width scales predictably; height depends on aspect ratio |

---

## The Golden Rule

**One thing controls display size: CSS on the `<img>` tag.**

- Image file → quality & load time
- HTML `width/height` → space reservation only
- Container CSS → constraints/clipping
- `<img>` CSS (`w-XX`, `h-XX`) → **actual display size**

---

## Quick Reference: Optimal Setup

```html
<div class="flex justify-center mb-8">
  <img
    src="images/example.webp"
    alt="Description"
    class="w-48 md:w-64"   <!-- CSS controls display size -->
    width="700"            <!-- Matches file, prevents layout shift -->
    height="700"
    loading="lazy"
  >
</div>

```

**To adjust size:** change `w-48 / md:w-64` only. One place. No cascading effects.

```

---

### Takeaways
- Display size is a CSS concern, not an image-file concern.
- HTML attributes prevent layout shift; they don’t resize visuals.
- Most “image bugs” are cross-layer mismatches.

### Next steps
- Drop this Markdown into your docs/Notion.
- Add it as a checklist to image-related PR reviews.
- If you want, I can refactor this into a one-page printable cheat sheet or a lint-style rule set.

```
