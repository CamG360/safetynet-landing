# Technical Context - SafetyNet Landing Page

**Last Updated**: 2025-12-13
**Live URL**: https://safetynet-landing.vercel.app

---

## Tech Stack Overview

### Frontend
- **Type**: Static HTML (Single Page Application)
- **Framework**: None (Vanilla JavaScript)
- **Main File**: `index.html` (~1,765 lines)
- **Additional Files**: `form.html`, `images/`

### Styling & UI
- **CSS Framework**: Tailwind CSS (CDN)
  - URL: `https://cdn.tailwindcss.com`
  - Zero-config, no build step required
- **Custom CSS**: Inline `<style>` blocks in HTML
- **Typography**: Google Fonts - Inter (300, 400, 500, 600, 700 weights)
- **Icons**: Lucide Icons via unpkg CDN
  - URL: `https://unpkg.com/lucide@latest`

### JavaScript
- **Framework**: None
- **Approach**: Vanilla JavaScript with DOM manipulation
- **Key Features**:
  - Modal form handling
  - Mobile responsive navigation (hamburger menu)
  - FAQ accordion with category filtering
  - Form validation and submission
  - Smooth scroll navigation

---

## Build Tools & Pipeline

### Build Process
**None** - This is a zero-build static site
- No package.json
- No npm/yarn dependencies
- No bundler (no Vite, Webpack, Parcel, etc.)
- No transpilation or compilation step

### Development Workflow
1. Edit `index.html` directly
2. Open in browser or use local dev server
3. Push to Git
4. Vercel auto-deploys

---

## Hosting & Deployment

### Platform
**Vercel** (Zero-Config Deployment)
- Repository: `CamG360/safetynet-landing`
- Deployment: Automatic on push to main branch
- Configuration: None required (no `vercel.json`)
- Vercel automatically detects static HTML and serves it

### Domain
- Primary: `safetynet-landing.vercel.app`

### Deployment Process
- **Trigger**: Git push to repository
- **Build Command**: None (static files served as-is)
- **Output Directory**: Root (`/`)
- **Deploy Time**: ~10-30 seconds

---

## Project Structure

```
safetynet-landing/
├── index.html              # Main landing page (~1,765 lines)
├── form.html              # Standalone form page
├── images/                # Image assets
│   └── campbell-mccord.png
├── UX_REVIEW.md          # UX documentation
├── UX_Review2.md
├── UX_Review2_Content_Drafts.md
└── UX_Review2_Minimal_FAQ_Additions.md
```

---

## Dependencies (All CDN-based)

| Dependency | Version | Source | Purpose |
|------------|---------|--------|---------|
| Tailwind CSS | Latest | cdn.tailwindcss.com | Utility-first CSS framework |
| Lucide Icons | Latest | unpkg.com | Icon library |
| Google Fonts | - | fonts.googleapis.com | Inter typeface |

**Note**: All dependencies are loaded via CDN at runtime. No local node_modules or package management.

---

## Key Technical Characteristics

### Advantages
✅ Zero build complexity
✅ No dependency management
✅ Fast deployment (no build step)
✅ Easy to understand and modify
✅ Works anywhere (any web server)
✅ No JavaScript framework lock-in

### Limitations
⚠️ No TypeScript support
⚠️ No component reusability (manual HTML duplication)
⚠️ No hot module replacement
⚠️ No CSS preprocessing (Sass/Less)
⚠️ No image optimization pipeline
⚠️ CDN dependencies (requires internet for development)
⚠️ Large single file (~1,765 lines makes maintenance harder)

---

## Development Environment

### Local Development
```bash
# Option 1: Simple HTTP server (Python)
python3 -m http.server 8000

# Option 2: Node.js http-server (if installed)
npx http-server -p 8000

# Option 3: VS Code Live Server extension
# Just right-click index.html → "Open with Live Server"
```

### Testing
- Manual browser testing
- No automated test framework currently in place

---

## Potential Migration Paths

If the project grows, consider:

1. **Add Build Tools** (while staying static):
   - Vite for dev server + HMR
   - PostCSS for Tailwind (tree-shaking unused styles)
   - Image optimization

2. **Component Framework** (if scaling):
   - React + Vite
   - Vue + Vite
   - Astro (static site generator with islands architecture)

3. **Current Recommendation**:
   - Keep it simple for now
   - Consider refactoring if `index.html` exceeds 2,500 lines
   - Or if you need server-side functionality (forms, API)

---

## Contact Form Backend

**Current Implementation**: Unknown/TBD
- Form exists in UI but backend integration needs verification
- May require serverless function or third-party service (FormSpree, Netlify Forms, etc.)

---

## Performance Profile

- **First Contentful Paint**: Fast (minimal blocking resources)
- **Time to Interactive**: Fast (no framework bootstrap)
- **Bundle Size**: N/A (no bundle, direct HTML)
- **CDN Dependencies**: ~3 external resources to load
- **Optimization Status**: Minimal (no minification, no image optimization)
