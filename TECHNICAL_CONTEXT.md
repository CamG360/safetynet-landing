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

### Backend & Data
- **Database**: Supabase (PostgreSQL)
  - Project ID: `igzyfbzayuimdnjhapog`
  - URL: `https://igzyfbzayuimdnjhapog.supabase.co`
  - Dashboard: https://supabase.com/dashboard/project/igzyfbzayuimdnjhapog
- **API**: Supabase REST API (direct fetch calls, no SDK)
- **Authentication**: Anon key (public API key for client-side access)
- **Table**: `feedback`
- **Data Collected**: Email addresses + timestamps

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
| Supabase | REST API | igzyfbzayuimdnjhapog.supabase.co | Backend database (PostgreSQL) |

**Note**: All frontend dependencies are loaded via CDN at runtime. No local node_modules or package management. Supabase is accessed via direct REST API calls (no JS SDK).

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

## Backend Architecture

### Supabase Integration

**Database**: PostgreSQL (via Supabase)
- **Project**: `igzyfbzayuimdnjhapog`
- **Region**: Auto-assigned by Supabase
- **Tier**: Free tier (likely)

**API Implementation**:
```javascript
// Configuration (hardcoded in both index.html and form.html)
const SUPABASE_URL = 'https://igzyfbzayuimdnjhapog.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGci...'; // Public anon key
const TABLE_NAME = 'feedback';

// Form submission (vanilla fetch)
const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
    method: 'POST',
    headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ email, created_at: new Date().toISOString() })
});
```

**Data Schema** (`feedback` table):
- `email` (text): User email address
- `created_at` (timestamp): Submission timestamp

**Security Considerations**:
- ⚠️ Anon key is **exposed in client-side code** (normal for public forms)
- ⚠️ Should have Row Level Security (RLS) policies enabled in Supabase
- ⚠️ Should restrict INSERT-only access for public users
- ⚠️ Consider rate limiting to prevent spam

**Files with Supabase Integration**:
- `index.html:1435-1680` - Registration modal form
- `form.html:575-670` - Standalone form page

---

## Data Flow Architecture

```
User Browser
    │
    ├─── Loads HTML/CSS/JS from Vercel CDN
    │    └─── index.html (static file)
    │         ├─── Tailwind CSS (cdn.tailwindcss.com)
    │         ├─── Lucide Icons (unpkg.com)
    │         └─── Google Fonts
    │
    └─── Form Submission (JavaScript fetch)
         │
         └─── POST https://igzyfbzayuimdnjhapog.supabase.co/rest/v1/feedback
              │
              └─── Supabase PostgreSQL Database
                   └─── feedback table
                        ├─── email (text)
                        └─── created_at (timestamp)
```

**Request Flow**:
1. User visits `safetynet-landing.vercel.app`
2. Vercel serves static `index.html`
3. Browser loads CSS/JS dependencies from CDNs
4. User fills out registration form (modal or standalone)
5. JavaScript validates email input
6. Form submits via `fetch()` to Supabase REST API
7. Data stored in `feedback` table
8. Success message displayed to user

---

## Performance Profile

- **First Contentful Paint**: Fast (minimal blocking resources)
- **Time to Interactive**: Fast (no framework bootstrap)
- **Bundle Size**: N/A (no bundle, direct HTML)
- **CDN Dependencies**: ~3 external resources to load
- **Optimization Status**: Minimal (no minification, no image optimization)
