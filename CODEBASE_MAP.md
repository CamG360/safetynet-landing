# Codebase Map

**Project**: SafetyNet Landing Page
**Type**: Static HTML/CSS/JS (Zero-build)
**Last Updated**: 2025-12-17

---

## High-Level Overview

- **What this repo does**:
  - Landing page for SafetyNet — a safety alert service for foreign workers in the UK
  - Collects waitlist emails via Supabase backend
  - Educates users on safety features through interactive content (FAQs, story, use cases)

- **Architectural Style**:
  - Vanilla JavaScript with ES6 modules (no framework, no build tools)
  - CDN-based dependencies (Tailwind CSS, Lucide icons)
  - Progressive enhancement (lazy loading, modal pre-loading)
  - Direct Supabase REST API integration (no SDK)

---

## Concept Index

### Use Cases / Features

#### Waitlist Registration Flow
- **Purpose**: Collect emails from interested users
- **Entry Points**:
  - Hero section email input → `index.html:142-162`
  - Nav/footer "Join Waitlist" buttons → `.open-registration-modal` class
- **Implementation**:
  - Modal version: `index.html:866-918` + `js/main.js:246-317`
  - Standalone page: `form.html` + `js/form.js`
  - Validation: `js/utils.js:12-15` (`validateEmail()`)
  - Submission: `js/utils.js:23-45` (`submitToWaitlist()`)
- **Backend**: Supabase `feedback` table (email + timestamp)
- **Config**: `js/config.js` (API credentials)

#### FAQ System
- **Purpose**: Answer common questions with category filtering
- **Source of Truth**: `data/faq.json` (13 FAQs, 6 categories)
- **Renderer**: `js/faq-renderer.js` (dynamic rendering + accordions)
- **Container**: `index.html:787-805`
- **Styling**: `styles/main.css:106-244`

#### Story Lazy Loading
- **Purpose**: Load extended founder story on demand
- **Truncated Version**: `index.html:750-768`
- **Extended Content**: `content/our-story-extended.html` (4 story cards)
- **Loader**: `js/story-loader.js:loadExtendedStory()`
- **Trigger**: "Read Full Story" button (`#read-full-story-btn`)

#### Modal System
- **Purpose**: Display overlays for registration, demos, legal docs
- **4 Modals**:
  1. Registration Modal (inline in `index.html:866-918`)
  2. Alert Demo (`modals/alert-demo.html`)
  3. Privacy Policy (`modals/privacy-policy.html`)
  4. Terms of Service (`modals/terms-of-service.html`)
- **Pre-loader**: `js/modal-loader.js` (fetches external modal HTML)
- **Manager**: `js/main.js:33-51` (`toggleModal()`)
- **Styling**: `styles/main.css:15-57`

---

### Pages / Routes

#### Main Landing Page
- **File**: `index.html` (936 lines)
- **Sections** (in order):
  1. Navigation (lines 16-61) — Fixed nav + mobile menu
  2. Hero/Waitlist (lines 64-181) — Email input + 3-step preview
  3. How It Works (lines 184-355) — Detailed 3-step flow
  4. The Problem (lines 358-426) — "Text me when safe" scenario
  5. Built for Privacy (lines 429-502) — 4 feature cards
  6. Use Cases (lines 505-638) — Running, First Date, Solo Travel
  7. Comparison Table (lines 641-721) — SafetyNet vs Others
  8. Our Story (lines 724-785) — Founder story + lazy-load button
  9. FAQ (lines 788-805) — Dynamic container
  10. Footer (lines 808-859) — Links + CTA
  11. Modals (lines 862-928) — 4 modal containers

#### Standalone Form Page
- **File**: `form.html` (80 lines)
- **Purpose**: Dedicated email collection (alternative to modal)
- **Script**: `js/form.js`
- **Styling**: `styles/form.css` (500 lines, custom CSS variables)

#### Design Documentation (Internal)
- **Visual Mockups**: `visual-mockups.html` (shield opacity variations)
- **Placement Recommendations**: `placement-recommendations.html` (logo placement strategy)
- **Note**: Not user-facing, development reference only

---

### Core Logic

#### JavaScript Modules (Dependency Order)

```
main.js (entry point, 465 lines)
 ├── modal-loader.js → Pre-loads modals BEFORE main.js executes
 ├── config.js → Supabase credentials
 ├── utils.js → Validation + submission
 └── constants.js → Timing + messages + button text

form.js (standalone, 99 lines)
 ├── config.js
 ├── utils.js
 └── constants.js

faq-renderer.js (independent, 155 lines) → Auto-init on DOMContentLoaded
story-loader.js (independent, 113 lines) → Auto-init on DOMContentLoaded
```

#### Module Responsibilities

| File | Purpose | Key Exports/Functions |
|------|---------|----------------------|
| `js/main.js` | Primary orchestrator: modals, forms, accordions, mobile menu | `toggleModal()`, `resetRegistrationForm()` |
| `js/modal-loader.js` | Pre-load external modal HTML before main.js runs | `loadModalContent()`, `preloadAllModals()` |
| `js/form.js` | Standalone form page logic (mirrors modal form) | Auto-init form submission |
| `js/faq-renderer.js` | Dynamic FAQ rendering + category filtering | `loadFAQData()`, `renderFAQs()` |
| `js/story-loader.js` | Lazy-load extended story content | `loadExtendedStory()` |
| `js/utils.js` | Shared utilities (validation, Supabase API) | `validateEmail()`, `submitToWaitlist()` |
| `js/config.js` | Supabase configuration | `SUPABASE_CONFIG` object |
| `js/constants.js` | UI constants (timing, messages, labels) | `TIMING`, `MESSAGES`, `BUTTON_TEXT` |

---

### Data / Database

#### Schema (Supabase)
- **Table**: `feedback`
- **Columns**:
  - `email` (text)
  - `created_at` (timestamp)
- **Access**: Public insert-only via anon key (RLS-protected)

#### Data Files
- **FAQ Content**: `data/faq.json` (13 questions, 6 categories)
  - Structure: `{ categories: [...], faqs: [...] }`
  - Supports HTML in answers
  - Dynamically rendered by `faq-renderer.js`

#### Configuration
- **Supabase Credentials**: `js/config.js`
  - URL: `https://igzyfbzayuimdnjhapog.supabase.co`
  - Anon Key: `eyJhbGci...` (public, protected by Row Level Security)
  - Table: `feedback`
- **UI Constants**: `js/constants.js`
  - Auto-close timing: 4000ms
  - Modal transition: 200ms
  - FAQ transition: 300ms
  - Error/success messages

---

### Content Files

#### Extended Content (Lazy-Loaded)
- **Founder Story**: `content/our-story-extended.html` (183 lines)
  - Part 2: The Evidence (4 story cards)
  - Part 3: The Insight (2 philosophy cards)
  - Loaded on-demand by `story-loader.js`

#### Modal Content (Pre-Loaded)
- **Alert Demo**: `modals/alert-demo.html` (safety alert UI mockup)
- **Privacy Policy**: `modals/privacy-policy.html` (GDPR-compliant legal)
- **Terms of Service**: `modals/terms-of-service.html` (waitlist terms)
- **Note**: Pre-loaded by `modal-loader.js` before main.js executes

#### Assets
- **Images**: `images/campbell-mccord.png` (founder headshot, 400x400px)
- **Icons**: Lucide icons via CDN (no local assets)

---

### Styling

#### CSS Architecture
- **Main Stylesheet**: `styles/main.css` (659 lines)
  - Modal styles (15-57)
  - Mobile menu (59-98)
  - FAQ accordions (106-244)
  - Alert card styling (246-417)
  - SafetyNet visual branding (429-648)
  - Hero section refinements (631-659)

- **Form Stylesheet**: `styles/form.css` (500 lines)
  - CSS variables (`:root`) for colors, shadows, radii
  - Form-specific components
  - Error/success states
  - Responsive (mobile breakpoint: 600px)

- **Tailwind CSS**: CDN-loaded (no config file)
  - Utility classes used extensively in HTML
  - No build step, no purging

#### Design Patterns
- **Accordions**: `max-height` transitions (FAQ, use cases, features, story)
- **Modals**: Transform + opacity transitions
- **Mobile Menu**: Hamburger icon rotation animation
- **Hover Effects**: Transform-based (scale, translate)

---

### Configuration

#### Environment Variables
- **None** — All config hardcoded in `js/config.js`
- **Security**: Supabase anon key exposed in client code (normal for public forms)
- **Protection**: Row Level Security (RLS) policies in Supabase backend

#### Feature Flags
- **None** — No feature flagging system

#### Build Configuration
- **None** — Zero-build static site (no package.json, no bundler)

---

## Documentation Files

| File | Purpose | Key Sections |
|------|---------|--------------|
| `TECHNICAL_CONTEXT.md` | Tech stack, deployment, architecture | Supabase integration, data flow, zero-build rationale |
| `UX_REVIEW.md` | Initial UX analysis | Design decisions, user testing insights |
| `UX_Review2.md` | Second iteration recommendations | Content strategy improvements |
| `UX_Review2_Content_Drafts.md` | Content writing iterations | FAQ expansions, copy refinements |
| `UX_Review2_Minimal_FAQ_Additions.md` | FAQ improvements | New question suggestions |
| `PULL_REQUEST.md` | PR template | — |
| `privacy.md` | Privacy policy source | Markdown version of modal content |
| `terms.md` | Terms of service source | Markdown version of modal content |

---

## Navigation Cheat Sheet

**"I want to modify..."**

| Task | Primary Files | Supporting Files |
|------|---------------|------------------|
| **Waitlist form** | `index.html:866-918`, `form.html` | `js/main.js:246-317`, `js/form.js`, `js/utils.js` |
| **FAQ content** | `data/faq.json` | `js/faq-renderer.js` (auto-renders) |
| **Supabase config** | `js/config.js` | — |
| **Error messages** | `js/constants.js` (MESSAGES) | — |
| **Add new modal** | Create `modals/your-modal.html` | `js/modal-loader.js` (add to config), `index.html` (add container) |
| **Hero section** | `index.html:64-181` | `styles/main.css:631-659` |
| **3-step flow** | `index.html:94-137` (preview), `184-352` (detailed) | — |
| **Use cases** | `index.html:523-636` | Consider extracting to JSON |
| **Mobile menu** | `index.html:42-60` | `js/main.js:217-243`, `styles/main.css:59-98` |
| **Founder story** | `index.html:750-768`, `content/our-story-extended.html` | `js/story-loader.js` |
| **SafetyNet logo** | `styles/main.css:429-648` | Search `.safetynet-visual` |
| **Legal docs** | `modals/privacy-policy.html`, `modals/terms-of-service.html` | `privacy.md`, `terms.md` (source) |

---

## Fog Report

### 1. Accordion Logic Duplication
- **Issue**: Same accordion pattern repeated 4 times in `js/main.js:322-413`
- **Locations**: FAQ, use cases, features, story sections
- **Impact**: Maintenance burden, inconsistent behavior risk
- **Recommendation**: Create unified `initAccordion(selector, config)` utility

### 2. Modal Management Scattered
- **Issue**: No centralized modal registry
- **Files**: `js/modal-loader.js` (pre-loading), `js/main.js` (handlers), inline HTML (triggers)
- **Impact**: Hard to track all modals, no single source of truth
- **Recommendation**: Create `modalConfig` object listing all modals + metadata

### 3. Form Submission Logic Duplicated
- **Issue**: Registration form exists in 2 places (modal + standalone)
- **Duplication**:
  - Email validation (same logic in `main.js` and `form.js`)
  - Error handling (duplicated in both)
  - Success states (duplicated in both)
- **Partial Fix**: `utils.js` shares submission logic ✓
- **Recommendation**: Extract all form logic into reusable module

### 4. No Icon Registry
- **Issue**: Lucide icons used throughout, but no manifest
- **Problems**:
  - `lucide.createIcons()` called in 6 different places
  - Icon names hardcoded in HTML strings
  - No documentation of which icons exist where
- **Recommendation**: Create icon manifest + single initialization point

### 5. Configuration Split
- **Issue**: Config values scattered across multiple files
- **Current State**:
  - Supabase: `js/config.js` ✓ (centralized)
  - UI constants: `js/constants.js` ✓ (centralized)
  - Colors: Hardcoded in `styles/main.css` ✗
  - Spacing: Mix of Tailwind utilities + hardcoded CSS ✗
- **Recommendation**: Consolidate all colors/spacing into CSS variables (`:root`)

### 6. Unclear Content Ownership
- **Issue**: Content lives in multiple formats with no clear pattern
- **Inconsistencies**:
  - FAQ: External JSON file ✓
  - Modals: 3 external HTML files, 1 inline in `index.html` (registration) ✗
  - Story: Split between `index.html` (truncated) + `content/` (extended) ✗
  - Use cases: Hardcoded in `index.html` ✗
- **Missing**: Content manifest documenting all external content
- **Recommendation**: Move registration modal to `modals/` for consistency

### 7. No Error Boundary for Modal Loading
- **Issue**: If `modal-loader.js` fails to fetch modal HTML:
  - Generic error message shown
  - No retry mechanism
  - No user-facing notification
- **Recommendation**: Add error handling UI + retry logic with exponential backoff

### 8. Missing Registry Files
- **What's Missing**:
  - Modal registry (which modals exist, their triggers, content sources)
  - Icon registry (which icons used where)
  - Content manifest (all external content files)
  - Component registry (all accordion sections)
- **Recommendation**: Create `REGISTRY.md` documenting these

### 9. Naming Inconsistencies
- **Classes**: Mix of kebab-case (`.mobile-menu`) and BEM-style (`.alert-card`)
- **IDs**: Mix of camelCase (`#heroEmailInput`) and kebab-case (`#alert-demo`)
- **Files**: Mix of kebab-case (`modal-loader.js`) and underscores (`UX_REVIEW.md`)
- **Recommendation**: Document naming conventions in style guide

### 10. Hardcoded Magic Numbers
- **Examples**:
  - `max-height: 500px` (FAQ accordion, `main.css:132`)
  - `max-height: 300px` (use case accordion, `main.css:158`)
  - `setTimeout(4000)` (auto-close, `main.js:302`)
  - Color hex codes scattered throughout CSS
- **Recommendation**: Extract to `constants.js` or CSS variables

---

## Project Stats

| Metric | Count | Notes |
|--------|-------|-------|
| **HTML Pages** | 4 | 2 user-facing, 2 design docs |
| **JavaScript Modules** | 8 | 1 entry point, 7 supporting |
| **CSS Files** | 2 | Main (659 lines), Form (500 lines) |
| **Data Files** | 1 | `faq.json` |
| **Content Files** | 4 | 1 extended story, 3 modals |
| **Documentation** | 8 | 1 technical, 4 UX, 2 legal, 1 PR template |
| **Total Lines (JS)** | ~1,000 | Across 8 modules |
| **Total Lines (CSS)** | ~1,200 | Across 2 stylesheets |
| **Main HTML File** | 936 lines | `index.html` |

---

## Key Architectural Decisions

1. **Zero-Build Philosophy**: Intentional simplicity for easy deployment/modification
2. **ES6 Modules**: Modern JavaScript without bundler complexity
3. **Progressive Enhancement**: Lazy loading (story), pre-loading (modals)
4. **Direct REST API**: Supabase without SDK for minimal dependencies
5. **CDN Dependencies**: No npm, all dependencies loaded at runtime
6. **Hybrid CSS**: Tailwind utilities + custom CSS (not Tailwind config)
7. **Dual Form Strategy**: Modal + standalone page for flexibility

---

## Quick Start for New Developers

### Local Development
```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

### Deployment
- **Automatic**: Push to `main` branch → Vercel auto-deploys
- **No build step**: Static files served as-is
- **Deploy time**: ~10-30 seconds

### Common Tasks
1. **Add FAQ**: Edit `data/faq.json`
2. **Change copy**: Edit `index.html` (search for text)
3. **Update Supabase**: Edit `js/config.js`
4. **Add modal**: Create `modals/your-modal.html`, wire up in `modal-loader.js`
5. **Modify styling**: Edit `styles/main.css` or `styles/form.css`

---

**End of Codebase Map**
