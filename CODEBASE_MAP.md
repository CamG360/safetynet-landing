# Codebase Map

**Project**: SafetyNet Landing Page
**Type**: Static HTML/CSS/JS with Build Step
**Last Updated**: 2025-12-27

---

## High-Level Overview

- **What this repo does**:
  - Landing page for SafetyNet — a safety alert service for everyday activities.
  - Collects waitlist emails via a Cloudflare Worker (writes to Supabase waitlist table)
  - Educates users on safety features through interactive content (FAQs, story, use cases)

- **Architectural Style**:
  - Vanilla JavaScript with ES6 modules (no framework)
  - Build system: npm scripts, Tailwind CSS compilation, FAQ baking
  - CDN-based runtime dependencies (Lucide icons)
  - Progressive enhancement (lazy loading, modal pre-loading)
  - Cloudflare Turnstile + Worker integration (client only calls Worker)
  - Security-hardened: Turnstile, SRI, CSP headers, honeypot protection

---

## Concept Index

### Use Cases / Features

#### Waitlist Registration Flow
- **Purpose**: Collect emails from interested users
- **Entry Points**:
  - Hero section email input → inline form
  - Nav/footer "Join Waitlist" buttons → `.open-registration-modal` class
- **Implementation**:
  - Modal version in [`index.html`](./index.html) + [`js/main.js`](./js/main.js)
  - Validation: [`js/utils.js`](./js/utils.js) (`validateEmail()`, honeypot check)
  - Submission: [`js/utils.js`](./js/utils.js) (`submitToWaitlist()`)
- **Security**:
  - Cloudflare Turnstile integration (invisible bot protection)
  - Honeypot field (hidden "website" field)
  - Rate limiting (client-side)
- **Backend**: Cloudflare Worker verifies Turnstile token, normalizes email, and writes to Supabase `waitlist` table
- **Config**: [`js/config.js`](./js/config.js) (Worker endpoint + Turnstile site key)

#### FAQ System
- **Purpose**: Answer common questions with category filtering
- **Source of Truth**: [`data/faq.json`](./data/faq.json) (FAQ content)
- **Build Process**: [`build-faqs.js`](./build-faqs.js) — Bakes FAQ HTML into `index.html` at build time
- **Client-Side**: [`js/faq-renderer.js`](./js/faq-renderer.js) — Handles category filtering + accordions
- **Container**: `#faq-container` in [`index.html`](./index.html) (pre-rendered FAQs)
- **Styling**: [`styles/main.css`](./styles/main.css)
- **Build Command**: `node build-faqs.js` (runs before deployment)

#### Story Lazy Loading
- **Purpose**: Load extended founder story on demand
- **Truncated Version**: in [`index.html`](./index.html)
- **Extended Content**: [`content/our-story-extended.html`](./content/our-story-extended.html) (story cards)
- **Loader**: [`js/story-loader.js`](./js/story-loader.js) (`loadExtendedStory()`)
- **Trigger**: "Read Full Story" button (`#read-full-story-btn`)

#### Modal System
- **Purpose**: Display overlays for registration, demos, legal docs
- **4 Modals**:
  1. Registration Modal (inline in [`index.html`](./index.html))
  2. Alert Demo ([`modals/alert-demo.html`](./modals/alert-demo.html))
  3. Privacy Policy ([`modals/privacy-policy.html`](./modals/privacy-policy.html))
  4. Terms of Service ([`modals/terms-of-service.html`](./modals/terms-of-service.html))
- **Pre-loader**: [`js/modal-loader.js`](./js/modal-loader.js) (fetches external modal HTML)
- **Manager**: [`js/main.js`](./js/main.js) (`toggleModal()`)
- **Styling**: [`styles/main.css`](./styles/main.css)

---

### Pages / Routes

#### Main Landing Page
- **File**: [`index.html`](./index.html) (1193 lines)
- **Sections** (in order):
  1. Navigation — Fixed nav + mobile menu
  2. Hero/Waitlist — Email input + 3-step preview
  3. How It Works — Detailed 3-step flow
  4. The Problem — "Text me when safe" scenario
  5. Built for Privacy — 4 feature cards
  6. Use Cases — Running, First Date, Solo Travel
  7. Comparison Table — SafetyNet vs Others
  8. Our Story — Founder story + lazy-load button
  9. FAQ — Pre-rendered FAQ container
  10. Footer — Links + CTA
  11. Modals — 4 modal containers

#### Legal Pages
- **Privacy Policy**: [`privacy.html`](./privacy.html) (89 lines) — Standalone privacy policy page
- **Terms of Service**: [`terms.html`](./terms.html) (108 lines) — Standalone terms page
- **Source Files**: [`privacy.md`](./privacy.md), [`terms.md`](./terms.md) (Markdown sources)
- **Also Available**: As modals in [`modals/privacy-policy.html`](./modals/privacy-policy.html) and [`modals/terms-of-service.html`](./modals/terms-of-service.html)

#### Security Testing
- **SRI Browser Test**: [`sri-browser-test.html`](./sri-browser-test.html) (326 lines) — Browser-based SRI verification tool
- **Purpose**: Validate Subresource Integrity implementation in browser

#### Design Documentation (Internal)
- **Visual Mockups**: [`visual-mockups.html`](./visual-mockups.html) (380 lines) — Shield opacity variations
- **Placement Recommendations**: [`placement-recommendations.html`](./placement-recommendations.html) (478 lines) — Logo placement strategy
- **Note**: Not user-facing, development reference only

---

### Core Logic

#### JavaScript Modules (Dependency Order)

```
main.js (entry point, 604 lines)
 ├── modal-loader.js → Pre-loads modals BEFORE main.js executes
 ├── config.js → Worker endpoint + Turnstile credentials
 ├── utils.js → Validation + submission + security
 ├── constants.js → Timing + messages + button text
 └── contact-email.js → Contact email component with copy functionality

faq-renderer.js (independent, 222 lines) → Auto-init on DOMContentLoaded, handles filtering/accordions
story-loader.js (independent, 112 lines) → Auto-init on DOMContentLoaded
```

**Links**: [`js/main.js`](./js/main.js) | [`js/modal-loader.js`](./js/modal-loader.js) | [`js/config.js`](./js/config.js) | [`js/utils.js`](./js/utils.js) | [`js/constants.js`](./js/constants.js) | [`js/contact-email.js`](./js/contact-email.js) | [`js/faq-renderer.js`](./js/faq-renderer.js) | [`js/story-loader.js`](./js/story-loader.js)

#### Module Responsibilities

| File | Purpose | Key Exports/Functions |
|------|---------|----------------------|
| [`js/main.js`](./js/main.js) | Primary orchestrator: modals, forms, accordions, mobile menu | `toggleModal()`, `resetRegistrationForm()` |
| [`js/modal-loader.js`](./js/modal-loader.js) | Pre-load external modal HTML before main.js runs | `loadModalContent()`, `preloadAllModals()` |
| [`js/faq-renderer.js`](./js/faq-renderer.js) | Client-side FAQ filtering + accordions (FAQs pre-rendered) | Category filtering, accordion interactions |
| [`js/story-loader.js`](./js/story-loader.js) | Lazy-load extended story content | `loadExtendedStory()` |
| [`js/contact-email.js`](./js/contact-email.js) | Contact email component with copy-to-clipboard | `createContactEmail()`, `hydrateContactEmailPlaceholders()` |
| [`js/utils.js`](./js/utils.js) | Shared utilities (validation, Worker API, security) | `validateEmail()`, `submitToWaitlist()`, Turnstile execution, honeypot checks |
| [`js/config.js`](./js/config.js) | Worker + Turnstile configuration | `WORKER_CONFIG`, `TURNSTILE_CONFIG` |
| [`js/constants.js`](./js/constants.js) | UI constants (timing, messages, labels) | `TIMING`, `MESSAGES`, `BUTTON_TEXT` |

---

### Data / Database

#### Schema (Supabase, behind Cloudflare Worker)
- **Table**: `waitlist`
- **Columns**:
  - `id` (bigserial primary key)
  - `email` (text, normalized, unique)
  - `created_at` (timestamp, default now)
- **Access**: Service role key via Worker only (RLS deny-by-default for anon)

#### Data Files
- **FAQ Content**: [`data/faq.json`](./data/faq.json)
  - Structure: `{ categories: [...], faqs: [...] }`
  - Supports HTML in answers
  - Baked into HTML by [`build-faqs.js`](./build-faqs.js)
  - Client-side filtering by [`faq-renderer.js`](./js/faq-renderer.js)

#### Configuration
- **Cloudflare Worker**: [`js/config.js`](./js/config.js)
  - Endpoint: `https://YOUR-WORKER.workers.dev/signup` (POST-only)
- **Cloudflare Turnstile**: [`js/config.js`](./js/config.js)
  - Site Key: `1x00000000000000000000AA` (test key)
  - Action: `waitlist_signup`
- **UI Constants**: [`js/constants.js`](./js/constants.js)
  - Auto-close timing: 4000ms
  - Modal transition: 200ms
  - FAQ transition: 300ms
  - Error/success messages

---

### Content Files

#### Extended Content (Lazy-Loaded)
- **Founder Story**: [`content/our-story-extended.html`](./content/our-story-extended.html)
  - Extended story sections
  - Loaded on-demand by [`story-loader.js`](./js/story-loader.js)

#### Modal Content (Pre-Loaded)
- **Alert Demo**: [`modals/alert-demo.html`](./modals/alert-demo.html) — Safety alert UI mockup
- **Privacy Policy**: [`modals/privacy-policy.html`](./modals/privacy-policy.html) — GDPR-compliant legal
- **Terms of Service**: [`modals/terms-of-service.html`](./modals/terms-of-service.html) — Waitlist terms
- **Note**: Pre-loaded by [`modal-loader.js`](./js/modal-loader.js) before main.js executes

#### Assets
- **Images**: [`images/campbell-mccord.png`](./images/campbell-mccord.png) — Founder headshot
- **Icons**: Lucide icons v0.294.0 via CDN (SRI-protected, no local assets)

---

### Styling

#### CSS Architecture
- **Main Stylesheet**: [`styles/main.css`](./styles/main.css) (778 lines)
  - Modal styles
  - Mobile menu
  - FAQ accordions
  - Alert card styling
  - SafetyNet visual branding
  - Hero section refinements
  - Honeypot field styling (security)

- **Form Stylesheet**: [`styles/form.css`](./styles/form.css) (499 lines)
  - CSS variables (`:root`) for colors, shadows, radii
  - Form-specific components
  - Error/success states
  - Responsive (mobile breakpoint: 600px)

- **Tailwind CSS**: Build process (not CDN)
  - **Source**: [`styles/input.css`](./styles/input.css) (94 lines)
  - **Output**: [`styles/tailwind.css`](./styles/tailwind.css) (compiled)
  - **Config**: [`tailwind.config.js`](./tailwind.config.js)
  - **Build**: `npm run build:css` (compiles Tailwind)
  - Utility classes used extensively in HTML

#### Design Patterns
- **Accordions**: `max-height` transitions (FAQ, use cases, features, story)
- **Modals**: Transform + opacity transitions
- **Mobile Menu**: Hamburger icon rotation animation
- **Hover Effects**: Transform-based (scale, translate)
- **Security**: Hidden honeypot field (visually hidden via CSS)

---

### Configuration

#### Environment Variables
- **None** — All config hardcoded in [`js/config.js`](./js/config.js)
- **Security**: Turnstile site key exposed in client code (public by design)
- **Protection**: Cloudflare Worker enforces POST-only + Turnstile verification; Supabase sits behind Worker with service role key

#### Feature Flags
- **None** — No feature flagging system

#### Build Configuration
- **Package Manager**: npm via [`package.json`](./package.json)
- **Build Scripts**:
  - `npm run build:css` — Compile Tailwind CSS
  - `npm run build:css:watch` — Watch mode for Tailwind
  - `npm test` — Run Jest tests
  - `npm run lint` — ESLint checks
  - `node build-faqs.js` — Bake FAQs into HTML (run before deploy)
- **Dev Dependencies**: Tailwind CSS, Jest, ESLint
- **No Bundler**: ES6 modules loaded directly by browser

---

## Documentation Files

| File | Purpose | Key Sections |
|------|---------|--------------|
| [`CODEBASE_MAP.md`](./CODEBASE_MAP.md) | This file — comprehensive codebase documentation | Architecture, file structure, navigation |
| [`TECHNICAL_CONTEXT.md`](./TECHNICAL_CONTEXT.md) | Tech stack, deployment, architecture | Worker + Supabase data flow |
| [`RECAPTCHA_SETUP.md`](./RECAPTCHA_SETUP.md) | Legacy reCAPTCHA v3 guide (superseded by Turnstile) | Setup, configuration, backend verification |
| [`SRI-IMPLEMENTATION.md`](./SRI-IMPLEMENTATION.md) | Subresource Integrity implementation | CDN protection, hash generation, testing |
| [`SRI-LIMITATIONS.md`](./SRI-LIMITATIONS.md) | SRI limitations and trade-offs | When not to use SRI, exemptions |
| [`UX_REVIEW.md`](./UX_REVIEW.md) | Initial UX analysis | Design decisions, user testing insights |
| [`UX_Review2.md`](./UX_Review2.md) | Second iteration recommendations | Content strategy improvements |
| [`UX_Review2_Content_Drafts.md`](./UX_Review2_Content_Drafts.md) | Content writing iterations | FAQ expansions, copy refinements |
| [`UX_Review2_Minimal_FAQ_Additions.md`](./UX_Review2_Minimal_FAQ_Additions.md) | FAQ improvements | New question suggestions |
| [`PULL_REQUEST.md`](./PULL_REQUEST.md) | PR template | — |
| [`privacy.md`](./privacy.md) | Privacy policy source | Markdown version of HTML pages |
| [`terms.md`](./terms.md) | Terms of service source | Markdown version of HTML pages |

---

## Security Infrastructure

### Bot Protection
- **Cloudflare Turnstile**: [`js/config.js`](./js/config.js), [`js/utils.js`](./js/utils.js)
  - Invisible bot detection
  - Token sent to Worker for verification
  - Documentation: [`systeminv.md`](./systeminv.md) (inventory checklist)
- **Honeypot Field**: [`js/utils.js`](./js/utils.js), [`styles/main.css`](./styles/main.css)
  - Hidden "website" field
  - Silently rejects submissions if filled
- **Client-Side Rate Limiting**: [`js/utils.js`](./js/utils.js)
  - Prevents rapid-fire submissions

### CDN Security
- **Subresource Integrity (SRI)**: [`index.html`](./index.html), all HTML files
  - SHA-384 hashes for CDN resources
  - Protects against CDN tampering
  - Documentation: [`SRI-IMPLEMENTATION.md`](./SRI-IMPLEMENTATION.md)
  - Protected Resources:
    - Tailwind CSS 3.4.10
    - Lucide Icons 0.294.0
  - Testing: [`tests/sri.test.js`](./tests/sri.test.js), [`sri-browser-test.html`](./sri-browser-test.html)
  - Tools: [`generate-sri-hashes.js`](./generate-sri-hashes.js), [`verify-sri.sh`](./verify-sri.sh)

### HTTP Security Headers
- **CSP (Content Security Policy)**: [`vercel.json`](./vercel.json)
- **X-Frame-Options**: DENY
- **X-Content-Type-Options**: nosniff
- **HSTS**: Strict-Transport-Security
- **Referrer-Policy**: strict-origin-when-cross-origin

### Testing
- **Jest Test Suite**: [`tests/`](./tests/) directory
  - `sri.test.js` — SRI implementation tests (39 tests)
  - `rateLimiting.test.js` — Rate limiting tests
  - `formRateLimiting.test.js` — Form-specific rate limiting
- **Run Tests**: `npm test`
- **Linting**: `npm run lint` (ESLint)

---

## Navigation Cheat Sheet

**"I want to modify..."**

| Task | Primary Files | Supporting Files |
|------|---------------|------------------|
| **Waitlist form** | [`index.html`](./index.html) (registration modal) | [`js/main.js`](./js/main.js), [`js/utils.js`](./js/utils.js) |
| **FAQ content** | [`data/faq.json`](./data/faq.json) | [`build-faqs.js`](./build-faqs.js) (run to bake into HTML), [`js/faq-renderer.js`](./js/faq-renderer.js) (filtering) |
| **Worker/Turnstile config** | [`js/config.js`](./js/config.js), [`index.html`](./index.html) (Turnstile script) | [`systeminv.md`](./systeminv.md) |
| **Error messages** | [`js/constants.js`](./js/constants.js) (MESSAGES) | — |
| **Add new modal** | Create `modals/your-modal.html` | [`js/modal-loader.js`](./js/modal-loader.js) (add to config), [`index.html`](./index.html) (add container) |
| **Hero section** | [`index.html`](./index.html) (hero section) | [`styles/main.css`](./styles/main.css) |
| **3-step flow** | [`index.html`](./index.html) (preview + detailed sections) | — |
| **Use cases** | [`index.html`](./index.html) (use cases section) | Consider extracting to JSON |
| **Mobile menu** | [`index.html`](./index.html) (mobile menu) | [`js/main.js`](./js/main.js), [`styles/main.css`](./styles/main.css) |
| **Founder story** | [`index.html`](./index.html), [`content/our-story-extended.html`](./content/our-story-extended.html) | [`js/story-loader.js`](./js/story-loader.js) |
| **SafetyNet logo** | [`styles/main.css`](./styles/main.css) | Search `.safetynet-logo` or `.safetynet-visual` |
| **Legal docs** | [`privacy.html`](./privacy.html), [`terms.html`](./terms.html), [`modals/`](./modals/) | [`privacy.md`](./privacy.md), [`terms.md`](./terms.md) (sources) |
| **Security (SRI)** | [`index.html`](./index.html), all HTML files | [`generate-sri-hashes.js`](./generate-sri-hashes.js), [`SRI-IMPLEMENTATION.md`](./SRI-IMPLEMENTATION.md) |
| **Build process** | [`package.json`](./package.json), [`build-faqs.js`](./build-faqs.js), [`tailwind.config.js`](./tailwind.config.js) | [`styles/input.css`](./styles/input.css) |

---

## Canonical Sources of Truth

This table identifies the authoritative file/folder for each major concept. When in doubt, consult these locations first.

| Concept | Canonical Source | Notes |
|---------|------------------|-------|
| **FAQ Content** | [`data/faq.json`](./data/faq.json) | All FAQ questions, answers, and categories. Baked into HTML by [`build-faqs.js`](./build-faqs.js), filtered by [`js/faq-renderer.js`](./js/faq-renderer.js) |
| **Use Cases** | [`index.html`](./index.html) | Hardcoded in HTML. Consider extracting to JSON for consistency |
| **Modal Definitions** | [`modals/`](./modals/) directory + [`index.html`](./index.html) (registration) | 3 external files + 1 inline. See [Fog Report #6](#6-unclear-content-ownership) |
| **Modal Management** | [`js/modal-loader.js`](./js/modal-loader.js) (pre-loading) + [`js/main.js`](./js/main.js) (handlers) | Scattered across 2 files. No centralized registry |
| **Worker/Turnstile Configuration** | [`js/config.js`](./js/config.js) | Worker endpoint, Turnstile site key/action |
| **UI Copy / Messages** | [`js/constants.js`](./js/constants.js) | Error messages, success messages, button text, timing values |
| **Founder Story (Extended)** | [`content/our-story-extended.html`](./content/our-story-extended.html) | Lazy-loaded content. Truncated version in [`index.html`](./index.html) |
| **Legal Documents** | [`privacy.html`](./privacy.html), [`terms.html`](./terms.html) | Standalone pages. Also available as modals. Markdown sources: [`privacy.md`](./privacy.md), [`terms.md`](./terms.md) |
| **Form Validation Logic** | [`js/utils.js`](./js/utils.js) | `validateEmail()`, honeypot check, rate limiting |
| **Waitlist Submission Logic** | [`js/utils.js`](./js/utils.js) | `submitToWaitlist()` function with Turnstile integration |
| **Security Configuration** | [`js/utils.js`](./js/utils.js), [`vercel.json`](./vercel.json) | Honeypot, rate limiting, CSP headers |
| **CSS Variables** | [`styles/form.css`](./styles/form.css) `:root` | Colors, shadows, radii for form page. Main page uses hardcoded values (see [Fog Report #5](#5-configuration-split)) |
| **Design Rationale** | [`visual-mockups.html`](./visual-mockups.html), [`placement-recommendations.html`](./placement-recommendations.html) | Internal design docs (not user-facing) |
| **Build Process** | [`package.json`](./package.json), [`build-faqs.js`](./build-faqs.js), [`tailwind.config.js`](./tailwind.config.js) | npm scripts, FAQ baking, Tailwind compilation |

---

## Fog Report

| # | Issue | Severity | Impact | Files Involved | Recommendation |
|---|-------|----------|--------|----------------|----------------|
| **1** | Accordion Logic Duplication | **Medium** | Maintenance burden, inconsistent behavior risk | [`js/main.js`](./js/main.js) | Create unified `initAccordion(selector, config)` utility |
| **2** | Modal Management Scattered | **Medium** | Hard to track all modals, no single source of truth | [`js/modal-loader.js`](./js/modal-loader.js), [`js/main.js`](./js/main.js), inline HTML triggers | Create `modalConfig` object listing all modals + metadata |
| **3** | Form Submission Logic | **Resolved** | Form logic centralized | [`js/utils.js`](./js/utils.js) | **Fixed**: All form validation and submission logic in [`utils.js`](./js/utils.js) ✓ |
| **4** | No Icon Registry | **Low** | `lucide.createIcons()` called multiple times, icon names hardcoded | [`index.html`](./index.html), [`js/main.js`](./js/main.js) | Create icon manifest + single initialization point |
| **5** | Configuration Split | **Medium** | Config values scattered: Worker/Turnstile centralized ✓, UI constants centralized ✓, colors/spacing hardcoded ✗ | [`js/config.js`](./js/config.js), [`js/constants.js`](./js/constants.js), [`styles/main.css`](./styles/main.css) | Consolidate colors/spacing into CSS variables (`:root`) like [`styles/form.css`](./styles/form.css) |
| **6** | Unclear Content Ownership | **High** | Inconsistent patterns: FAQ external ✓, 3 modals external + 1 inline ✗, story split ✗, use cases inline ✗ | [`data/faq.json`](./data/faq.json), [`modals/`](./modals/), [`index.html`](./index.html), [`content/`](./content/) | Move registration modal to [`modals/`](./modals/) for consistency. Create content manifest |
| **7** | No Error Boundary for Modal Loading | **Low** | If [`modal-loader.js`](./js/modal-loader.js) fails: generic error, no retry, no user notification | [`js/modal-loader.js`](./js/modal-loader.js) | Add error handling UI + retry logic with exponential backoff |
| **8** | Missing Registry Files | **Medium** | No manifest for modals, icons, content, components | N/A | Create `REGISTRY.md` documenting: modal registry, icon registry, content manifest, component registry |
| **9** | Naming Inconsistencies | **Low** | Mix of kebab-case, camelCase, BEM, underscores | All files | Document naming conventions in style guide |
| **10** | Hardcoded Magic Numbers | **Low** | `max-height`, `setTimeout`, color hex codes scattered | [`styles/main.css`](./styles/main.css), [`js/main.js`](./js/main.js) | Extract to [`js/constants.js`](./js/constants.js) or CSS variables |

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
| **HTML Pages** | 6 | 3 user-facing (index, privacy, terms), 3 internal (design docs, SRI test) |
| **JavaScript Modules** | 9 | 1 entry point (main.js), 8 supporting |
| **Build Scripts** | 3 | FAQ baking, SRI generation, SRI verification |
| **CSS Files** | 4 | Main (778 lines), Form (499 lines), Input (94 lines), Tailwind (compiled) |
| **Data Files** | 1 | [`faq.json`](./data/faq.json) |
| **Content Files** | 4 | 1 extended story, 3 modals |
| **Documentation** | 12 | 1 codebase map, 1 technical, 3 security, 4 UX, 2 legal, 1 PR template |
| **Test Files** | 3 | SRI tests (39), rate limiting tests |
| **Total Lines (JS)** | ~1,433 | Across 9 modules |
| **Total Lines (CSS)** | ~1,374 | Main + Form + Input (excluding compiled Tailwind) |
| **Main HTML File** | 1,193 lines | [`index.html`](./index.html) |

---

## Key Architectural Decisions

1. **Minimal Build System**: npm for Tailwind CSS compilation and FAQ baking, but no bundler
2. **ES6 Modules**: Modern JavaScript loaded directly by browser (no bundler)
3. **Build-Time Content Baking**: FAQs baked into HTML at build time for performance
4. **Progressive Enhancement**: Lazy loading (story), pre-loading (modals)
5. **Worker Gateway**: Cloudflare Worker fronting Supabase (no client-side Supabase SDK)
6. **Security-First**: Turnstile, SRI, CSP headers, honeypot, rate limiting
7. **Hybrid CSS**: Compiled Tailwind + custom CSS for flexibility
8. **Comprehensive Testing**: Jest unit tests for critical security features

---

## Quick Start for New Developers

### Local Development
```bash
# Install dependencies
npm install

# Option 1: Python (for viewing only)
python3 -m http.server 8000

# Option 2: Node.js (for viewing only)
npx http-server -p 8000

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

### Build Process
```bash
# Compile Tailwind CSS (required before first run)
npm run build:css

# Bake FAQs into HTML (required after editing data/faq.json)
node build-faqs.js

# Watch mode for Tailwind during development
npm run build:css:watch

# Run tests
npm test

# Lint code
npm run lint
```

### Deployment
- **Automatic**: Push to branch → Vercel auto-deploys
- **Build steps**: FAQ baking should be done before commit
- **Deploy time**: ~10-30 seconds

### Common Tasks
1. **Add FAQ**: Edit [`data/faq.json`](./data/faq.json), then run `node build-faqs.js`
2. **Change copy**: Edit [`index.html`](./index.html) (search for text)
3. **Update Worker endpoint**: Edit [`js/config.js`](./js/config.js)
4. **Update Turnstile keys**: Edit [`js/config.js`](./js/config.js) and Turnstile script tag in [`index.html`](./index.html)
5. **Add modal**: Create `modals/your-modal.html`, wire up in [`modal-loader.js`](./js/modal-loader.js)
6. **Modify styling**: Edit [`styles/main.css`](./styles/main.css) or [`styles/input.css`](./styles/input.css) (Tailwind source)
7. **Update CDN resources**: Update URL, regenerate SRI hash with [`generate-sri-hashes.js`](./generate-sri-hashes.js)

---

**End of Codebase Map**
