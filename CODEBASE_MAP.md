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
  - Hero section email input → [`index.html#L142-L162`](./index.html#L142-L162)
  - Nav/footer "Join Waitlist" buttons → `.open-registration-modal` class
- **Implementation**:
  - Modal version: [`index.html#L866-L918`](./index.html#L866-L918) + [`js/main.js#L246-L317`](./js/main.js#L246-L317)
  - Standalone page: [`form.html`](./form.html) + [`js/form.js`](./js/form.js)
  - Validation: [`js/utils.js#L12-L15`](./js/utils.js#L12-L15) (`validateEmail()`)
  - Submission: [`js/utils.js#L23-L45`](./js/utils.js#L23-L45) (`submitToWaitlist()`)
- **Backend**: Supabase `feedback` table (email + timestamp)
- **Config**: [`js/config.js`](./js/config.js) (API credentials)

#### FAQ System
- **Purpose**: Answer common questions with category filtering
- **Source of Truth**: [`data/faq.json`](./data/faq.json) (13 FAQs, 6 categories)
- **Renderer**: [`js/faq-renderer.js`](./js/faq-renderer.js) (dynamic rendering + accordions)
- **Container**: [`index.html#L787-L805`](./index.html#L787-L805)
- **Styling**: [`styles/main.css#L106-L244`](./styles/main.css#L106-L244)

#### Story Lazy Loading
- **Purpose**: Load extended founder story on demand
- **Truncated Version**: [`index.html#L750-L768`](./index.html#L750-L768)
- **Extended Content**: [`content/our-story-extended.html`](./content/our-story-extended.html) (4 story cards)
- **Loader**: [`js/story-loader.js`](./js/story-loader.js) (`loadExtendedStory()`)
- **Trigger**: "Read Full Story" button (`#read-full-story-btn`)

#### Modal System
- **Purpose**: Display overlays for registration, demos, legal docs
- **4 Modals**:
  1. Registration Modal (inline in [`index.html#L866-L918`](./index.html#L866-L918))
  2. Alert Demo ([`modals/alert-demo.html`](./modals/alert-demo.html))
  3. Privacy Policy ([`modals/privacy-policy.html`](./modals/privacy-policy.html))
  4. Terms of Service ([`modals/terms-of-service.html`](./modals/terms-of-service.html))
- **Pre-loader**: [`js/modal-loader.js`](./js/modal-loader.js) (fetches external modal HTML)
- **Manager**: [`js/main.js#L33-L51`](./js/main.js#L33-L51) (`toggleModal()`)
- **Styling**: [`styles/main.css#L15-L57`](./styles/main.css#L15-L57)

---

### Pages / Routes

#### Main Landing Page
- **File**: [`index.html`](./index.html) (936 lines)
- **Sections** (in order):
  1. Navigation ([lines 16-61](./index.html#L16-L61)) — Fixed nav + mobile menu
  2. Hero/Waitlist ([lines 64-181](./index.html#L64-L181)) — Email input + 3-step preview
  3. How It Works ([lines 184-355](./index.html#L184-L355)) — Detailed 3-step flow
  4. The Problem ([lines 358-426](./index.html#L358-L426)) — "Text me when safe" scenario
  5. Built for Privacy ([lines 429-502](./index.html#L429-L502)) — 4 feature cards
  6. Use Cases ([lines 505-638](./index.html#L505-L638)) — Running, First Date, Solo Travel
  7. Comparison Table ([lines 641-721](./index.html#L641-L721)) — SafetyNet vs Others
  8. Our Story ([lines 724-785](./index.html#L724-L785)) — Founder story + lazy-load button
  9. FAQ ([lines 788-805](./index.html#L788-L805)) — Dynamic container
  10. Footer ([lines 808-859](./index.html#L808-L859)) — Links + CTA
  11. Modals ([lines 862-928](./index.html#L862-L928)) — 4 modal containers

#### Standalone Form Page
- **File**: [`form.html`](./form.html) (80 lines)
- **Purpose**: Dedicated email collection (alternative to modal)
- **Script**: [`js/form.js`](./js/form.js)
- **Styling**: [`styles/form.css`](./styles/form.css) (500 lines, custom CSS variables)

#### Design Documentation (Internal)
- **Visual Mockups**: [`visual-mockups.html`](./visual-mockups.html) (shield opacity variations)
- **Placement Recommendations**: [`placement-recommendations.html`](./placement-recommendations.html) (logo placement strategy)
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

**Links**: [`js/main.js`](./js/main.js) | [`js/modal-loader.js`](./js/modal-loader.js) | [`js/config.js`](./js/config.js) | [`js/utils.js`](./js/utils.js) | [`js/constants.js`](./js/constants.js) | [`js/form.js`](./js/form.js) | [`js/faq-renderer.js`](./js/faq-renderer.js) | [`js/story-loader.js`](./js/story-loader.js)

#### Module Responsibilities

| File | Purpose | Key Exports/Functions |
|------|---------|----------------------|
| [`js/main.js`](./js/main.js) | Primary orchestrator: modals, forms, accordions, mobile menu | `toggleModal()`, `resetRegistrationForm()` |
| [`js/modal-loader.js`](./js/modal-loader.js) | Pre-load external modal HTML before main.js runs | `loadModalContent()`, `preloadAllModals()` |
| [`js/form.js`](./js/form.js) | Standalone form page logic (mirrors modal form) | Auto-init form submission |
| [`js/faq-renderer.js`](./js/faq-renderer.js) | Dynamic FAQ rendering + category filtering | `loadFAQData()`, `renderFAQs()` |
| [`js/story-loader.js`](./js/story-loader.js) | Lazy-load extended story content | `loadExtendedStory()` |
| [`js/utils.js`](./js/utils.js) | Shared utilities (validation, Supabase API) | `validateEmail()`, `submitToWaitlist()` |
| [`js/config.js`](./js/config.js) | Supabase configuration | `SUPABASE_CONFIG` object |
| [`js/constants.js`](./js/constants.js) | UI constants (timing, messages, labels) | `TIMING`, `MESSAGES`, `BUTTON_TEXT` |

---

### Data / Database

#### Schema (Supabase)
- **Table**: `feedback`
- **Columns**:
  - `email` (text)
  - `created_at` (timestamp)
- **Access**: Public insert-only via anon key (RLS-protected)

#### Data Files
- **FAQ Content**: [`data/faq.json`](./data/faq.json) (13 questions, 6 categories)
  - Structure: `{ categories: [...], faqs: [...] }`
  - Supports HTML in answers
  - Dynamically rendered by [`faq-renderer.js`](./js/faq-renderer.js)

#### Configuration
- **Supabase Credentials**: [`js/config.js`](./js/config.js)
  - URL: `https://igzyfbzayuimdnjhapog.supabase.co`
  - Anon Key: `eyJhbGci...` (public, protected by Row Level Security)
  - Table: `feedback`
- **UI Constants**: [`js/constants.js`](./js/constants.js)
  - Auto-close timing: 4000ms
  - Modal transition: 200ms
  - FAQ transition: 300ms
  - Error/success messages

---

### Content Files

#### Extended Content (Lazy-Loaded)
- **Founder Story**: [`content/our-story-extended.html`](./content/our-story-extended.html) (183 lines)
  - Part 2: The Evidence (4 story cards)
  - Part 3: The Insight (2 philosophy cards)
  - Loaded on-demand by [`story-loader.js`](./js/story-loader.js)

#### Modal Content (Pre-Loaded)
- **Alert Demo**: [`modals/alert-demo.html`](./modals/alert-demo.html) (safety alert UI mockup)
- **Privacy Policy**: [`modals/privacy-policy.html`](./modals/privacy-policy.html) (GDPR-compliant legal)
- **Terms of Service**: [`modals/terms-of-service.html`](./modals/terms-of-service.html) (waitlist terms)
- **Note**: Pre-loaded by [`modal-loader.js`](./js/modal-loader.js) before main.js executes

#### Assets
- **Images**: [`images/campbell-mccord.png`](./images/campbell-mccord.png) (founder headshot, 400x400px)
- **Icons**: Lucide icons via CDN (no local assets)

---

### Styling

#### CSS Architecture
- **Main Stylesheet**: [`styles/main.css`](./styles/main.css) (659 lines)
  - Modal styles ([15-57](./styles/main.css#L15-L57))
  - Mobile menu ([59-98](./styles/main.css#L59-L98))
  - FAQ accordions ([106-244](./styles/main.css#L106-L244))
  - Alert card styling ([246-417](./styles/main.css#L246-L417))
  - SafetyNet visual branding ([429-648](./styles/main.css#L429-L648))
  - Hero section refinements ([631-659](./styles/main.css#L631-L659))

- **Form Stylesheet**: [`styles/form.css`](./styles/form.css) (500 lines)
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
- **None** — All config hardcoded in [`js/config.js`](./js/config.js)
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
| [`TECHNICAL_CONTEXT.md`](./TECHNICAL_CONTEXT.md) | Tech stack, deployment, architecture | Supabase integration, data flow, zero-build rationale |
| [`UX_REVIEW.md`](./UX_REVIEW.md) | Initial UX analysis | Design decisions, user testing insights |
| [`UX_Review2.md`](./UX_Review2.md) | Second iteration recommendations | Content strategy improvements |
| [`UX_Review2_Content_Drafts.md`](./UX_Review2_Content_Drafts.md) | Content writing iterations | FAQ expansions, copy refinements |
| [`UX_Review2_Minimal_FAQ_Additions.md`](./UX_Review2_Minimal_FAQ_Additions.md) | FAQ improvements | New question suggestions |
| [`PULL_REQUEST.md`](./PULL_REQUEST.md) | PR template | — |
| [`privacy.md`](./privacy.md) | Privacy policy source | Markdown version of modal content |
| [`terms.md`](./terms.md) | Terms of service source | Markdown version of modal content |

---

## Navigation Cheat Sheet

**"I want to modify..."**

| Task | Primary Files | Supporting Files |
|------|---------------|------------------|
| **Waitlist form** | [`index.html#L866-L918`](./index.html#L866-L918), [`form.html`](./form.html) | [`js/main.js#L246-L317`](./js/main.js#L246-L317), [`js/form.js`](./js/form.js), [`js/utils.js`](./js/utils.js) |
| **FAQ content** | [`data/faq.json`](./data/faq.json) | [`js/faq-renderer.js`](./js/faq-renderer.js) (auto-renders) |
| **Supabase config** | [`js/config.js`](./js/config.js) | — |
| **Error messages** | [`js/constants.js`](./js/constants.js) (MESSAGES) | — |
| **Add new modal** | Create `modals/your-modal.html` | [`js/modal-loader.js`](./js/modal-loader.js) (add to config), [`index.html`](./index.html) (add container) |
| **Hero section** | [`index.html#L64-L181`](./index.html#L64-L181) | [`styles/main.css#L631-L659`](./styles/main.css#L631-L659) |
| **3-step flow** | [`index.html#L94-L137`](./index.html#L94-L137) (preview), [`#L184-L352`](./index.html#L184-L352) (detailed) | — |
| **Use cases** | [`index.html#L523-L636`](./index.html#L523-L636) | Consider extracting to JSON |
| **Mobile menu** | [`index.html#L42-L60`](./index.html#L42-L60) | [`js/main.js#L217-L243`](./js/main.js#L217-L243), [`styles/main.css#L59-L98`](./styles/main.css#L59-L98) |
| **Founder story** | [`index.html#L750-L768`](./index.html#L750-L768), [`content/our-story-extended.html`](./content/our-story-extended.html) | [`js/story-loader.js`](./js/story-loader.js) |
| **SafetyNet logo** | [`styles/main.css#L429-L648`](./styles/main.css#L429-L648) | Search `.safetynet-visual` |
| **Legal docs** | [`modals/privacy-policy.html`](./modals/privacy-policy.html), [`modals/terms-of-service.html`](./modals/terms-of-service.html) | [`privacy.md`](./privacy.md), [`terms.md`](./terms.md) (source) |

---

## Canonical Sources of Truth

This table identifies the authoritative file/folder for each major concept. When in doubt, consult these locations first.

| Concept | Canonical Source | Notes |
|---------|------------------|-------|
| **FAQ Content** | [`data/faq.json`](./data/faq.json) | All FAQ questions, answers, and categories. Dynamically rendered by [`js/faq-renderer.js`](./js/faq-renderer.js) |
| **Use Cases** | [`index.html#L505-L638`](./index.html#L505-L638) | Hardcoded in HTML. Consider extracting to JSON for consistency |
| **Modal Definitions** | [`modals/`](./modals/) directory + [`index.html#L866-L918`](./index.html#L866-L918) (registration) | 3 external files + 1 inline. See [Fog Report #6](#6-unclear-content-ownership) for inconsistency |
| **Modal Management** | [`js/modal-loader.js`](./js/modal-loader.js) (pre-loading) + [`js/main.js#L33-L51`](./js/main.js#L33-L51) (handlers) | Scattered across 2 files. No centralized registry |
| **Supabase Configuration** | [`js/config.js`](./js/config.js) | API URL, anon key, table name |
| **UI Copy / Messages** | [`js/constants.js`](./js/constants.js) | Error messages, success messages, button text, timing values |
| **Founder Story (Extended)** | [`content/our-story-extended.html`](./content/our-story-extended.html) | Lazy-loaded content. Truncated version in [`index.html#L750-L768`](./index.html#L750-L768) |
| **Legal Documents** | [`modals/privacy-policy.html`](./modals/privacy-policy.html), [`modals/terms-of-service.html`](./modals/terms-of-service.html) | Rendered versions. Markdown sources: [`privacy.md`](./privacy.md), [`terms.md`](./terms.md) |
| **Form Validation Logic** | [`js/utils.js#L12-L15`](./js/utils.js#L12-L15) | `validateEmail()` function |
| **Waitlist Submission Logic** | [`js/utils.js#L23-L45`](./js/utils.js#L23-L45) | `submitToWaitlist()` function (shared by modal + standalone form) |
| **CSS Variables** | [`styles/form.css`](./styles/form.css) `:root` | Colors, shadows, radii for form page. Main page uses hardcoded values (see [Fog Report #5](#5-configuration-split)) |
| **Design Rationale** | [`visual-mockups.html`](./visual-mockups.html), [`placement-recommendations.html`](./placement-recommendations.html) | Internal design docs (not user-facing) |

---

## Fog Report

| # | Issue | Severity | Impact | Files Involved | Recommendation |
|---|-------|----------|--------|----------------|----------------|
| **1** | Accordion Logic Duplication | **Medium** | Maintenance burden, inconsistent behavior risk | [`js/main.js#L322-L413`](./js/main.js#L322-L413) | Create unified `initAccordion(selector, config)` utility |
| **2** | Modal Management Scattered | **Medium** | Hard to track all modals, no single source of truth | [`js/modal-loader.js`](./js/modal-loader.js), [`js/main.js`](./js/main.js), inline HTML triggers | Create `modalConfig` object listing all modals + metadata |
| **3** | Form Submission Logic Duplicated | **Medium** | Duplicate email validation, error handling, success states | [`js/main.js`](./js/main.js), [`js/form.js`](./js/form.js) | Extract all form logic into reusable module. **Partial fix**: [`utils.js`](./js/utils.js) shares submission logic ✓ |
| **4** | No Icon Registry | **Low** | `lucide.createIcons()` called 6x, icon names hardcoded, no manifest | [`index.html`](./index.html), [`js/main.js`](./js/main.js) | Create icon manifest + single initialization point |
| **5** | Configuration Split | **Medium** | Config values scattered: Supabase centralized ✓, UI constants centralized ✓, colors/spacing hardcoded ✗ | [`js/config.js`](./js/config.js), [`js/constants.js`](./js/constants.js), [`styles/main.css`](./styles/main.css) | Consolidate colors/spacing into CSS variables (`:root`) like [`styles/form.css`](./styles/form.css) |
| **6** | Unclear Content Ownership | **High** | Inconsistent patterns: FAQ external ✓, 3 modals external + 1 inline ✗, story split ✗, use cases inline ✗ | [`data/faq.json`](./data/faq.json), [`modals/`](./modals/), [`index.html`](./index.html), [`content/`](./content/) | Move registration modal to [`modals/`](./modals/) for consistency. Create content manifest |
| **7** | No Error Boundary for Modal Loading | **Low** | If [`modal-loader.js`](./js/modal-loader.js) fails: generic error, no retry, no user notification | [`js/modal-loader.js`](./js/modal-loader.js) | Add error handling UI + retry logic with exponential backoff |
| **8** | Missing Registry Files | **Medium** | No manifest for modals, icons, content, components | N/A | Create `REGISTRY.md` documenting: modal registry, icon registry, content manifest, component registry |
| **9** | Naming Inconsistencies | **Low** | Mix of kebab-case, camelCase, BEM, underscores | All files | Document naming conventions in style guide |
| **10** | Hardcoded Magic Numbers | **Low** | `max-height: 500px`, `setTimeout(4000)`, color hex codes scattered | [`styles/main.css#L132`](./styles/main.css#L132), [`styles/main.css#L158`](./styles/main.css#L158), [`js/main.js#L302`](./js/main.js#L302) | Extract to [`js/constants.js`](./js/constants.js) or CSS variables |

---

## Naming Conventions (Project Standard)

This section documents **current conventions as they exist** in the codebase. This is descriptive, not prescriptive.

### File Names
- **JavaScript**: `kebab-case.js` (e.g., [`modal-loader.js`](./js/modal-loader.js), [`faq-renderer.js`](./js/faq-renderer.js))
- **CSS**: `kebab-case.css` (e.g., [`main.css`](./styles/main.css), [`form.css`](./styles/form.css))
- **HTML**: `kebab-case.html` (e.g., [`alert-demo.html`](./modals/alert-demo.html), [`our-story-extended.html`](./content/our-story-extended.html))
- **Documentation**: `SCREAMING_SNAKE_CASE.md` (e.g., [`TECHNICAL_CONTEXT.md`](./TECHNICAL_CONTEXT.md), [`UX_REVIEW.md`](./UX_REVIEW.md))
  - Exception: [`CODEBASE_MAP.md`](./CODEBASE_MAP.md) (this file)
- **Data**: `kebab-case.json` (e.g., [`faq.json`](./data/faq.json))

### CSS Selectors
- **Classes**:
  - `kebab-case` (e.g., `.mobile-menu`, `.faq-item`)
  - BEM-style for components (e.g., `.alert-card`, `.alert-header`)
  - Mix of both patterns (no strict standard)
- **IDs**:
  - `camelCase` (e.g., `#heroEmailInput`, `#mobileMenuBtn`)
  - `kebab-case` (e.g., `#alert-demo`, `#faq-container`)
  - Mix of both patterns (no strict standard)

### JavaScript
- **Variables/Functions**: `camelCase` (e.g., `validateEmail()`, `submitToWaitlist()`, `toggleModal()`)
- **Constants (exported)**: `SCREAMING_SNAKE_CASE` objects with `camelCase` properties
  - Example: `SUPABASE_CONFIG`, `TIMING`, `MESSAGES`, `BUTTON_TEXT` (see [`js/constants.js`](./js/constants.js), [`js/config.js`](./js/config.js))
- **Module Imports**: ES6 `import`/`export` syntax

### HTML Attributes
- **Data attributes**: `data-kebab-case` (e.g., `data-modal-content`, `data-lucide`)
- **Event handlers**: Inline `onclick` attributes (mixed with addEventListener in JS)

### Inconsistencies Observed
- **Classes vs IDs**: No clear pattern for `camelCase` vs `kebab-case`
- **File naming**: Documentation uses underscores (`UX_REVIEW.md`) vs standard Markdown convention (kebab-case)
- **Component naming**: Mix of BEM-style (`.alert-card__header`) and flat kebab-case (`.mobile-menu`)

**Recommendation**: See [Fog Report #9](#9-naming-inconsistencies) for cleanup suggestions

---

## Project Stats

| Metric | Count | Notes |
|--------|-------|-------|
| **HTML Pages** | 4 | 2 user-facing, 2 design docs |
| **JavaScript Modules** | 8 | 1 entry point, 7 supporting |
| **CSS Files** | 2 | Main (659 lines), Form (500 lines) |
| **Data Files** | 1 | [`faq.json`](./data/faq.json) |
| **Content Files** | 4 | 1 extended story, 3 modals |
| **Documentation** | 8 | 1 technical, 4 UX, 2 legal, 1 PR template |
| **Total Lines (JS)** | ~1,000 | Across 8 modules |
| **Total Lines (CSS)** | ~1,200 | Across 2 stylesheets |
| **Main HTML File** | 936 lines | [`index.html`](./index.html) |

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
1. **Add FAQ**: Edit [`data/faq.json`](./data/faq.json)
2. **Change copy**: Edit [`index.html`](./index.html) (search for text)
3. **Update Supabase**: Edit [`js/config.js`](./js/config.js)
4. **Add modal**: Create `modals/your-modal.html`, wire up in [`modal-loader.js`](./js/modal-loader.js)
5. **Modify styling**: Edit [`styles/main.css`](./styles/main.css) or [`styles/form.css`](./styles/form.css)

---

**End of Codebase Map**
