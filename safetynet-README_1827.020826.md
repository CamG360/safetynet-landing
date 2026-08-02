# SafetyNet Project

| README Standard | v1.1 |
|---|---|
| Tier | T2 |
| Score | 19/22 |
| Verdict | Functional |
| Last Verified | 2026-08-02 |
| Verified By | OpenAI AI Audit |

SafetyNet is presented by its current landing-page sources as an early-access personal-safety service built around timed check-ins and automatic alerts to chosen contacts. This README gives human and AI operators a controlled orientation to the current landing-page project, its public proposition, its source basis, and its limits.

This README does **not** establish that the SafetyNet product, alerting system, mobile applications, security controls, reliability claims, market demand, commercial model, or safety outcomes have been implemented or independently verified.

## 1. Intended audience

| Audience | Use |
|---|---|
| Project owner | Understand the current public proposition, source hierarchy, gaps, and update controls. |
| Human collaborator | Orient to the landing-page project before reviewing or changing it. |
| AI agent | Work from explicit sources without treating marketing claims or older context as implementation evidence. |
| Visitor or tester | Locate and inspect the public landing-page entry point and early-access flow. |

## 2. Current project definition

SafetyNet addresses the situation in which a person is expected to check in but cannot use their phone to text, call, or ask for help. The public concept is that the user sets a Check-in Time, and a missed check-in causes SafetyNet to alert selected contacts with the user's plans, context, and instructions.

The intended outcome is that a trusted contact knows something may be wrong and has enough information to decide what action to take. The supplied sources establish this as the **landing page's public proposition**, not as verified operational capability.

## 3. Current reliance boundary

| Status | Meaning in this README |
|---|---|
| **VISIBLE** | Present in the inspected local landing-page source or reachable page surface. |
| **PUBLIC CLAIM** | Stated by the landing page but not independently verified. |
| **OLDER CONTEXT** | Present only in the May 2026 internal context and not reconfirmed by the July sources. |
| **NOT ESTABLISHED** | The supplied sources do not prove the matter. |

Use this README for project orientation and controlled landing-page review only. Do not use it as evidence that SafetyNet is operational, safe, secure, reliable, legally sufficient, or ready for user reliance.

## 4. Entry points and how to use them

### 4.1 Public landing page

| Entry point | Location | Evidence status |
|---|---|---|
| SafetyNet landing page | [https://safetynetbeta.com](https://safetynetbeta.com) | Landing page existence is supported by the inspected July source; the live deployment was not independently rechecked for this README. |
| Primary local page source | `Safetynet-landing/safetynet-landing/index.html` | Identified by the 2026-07-19 extraction brief; the raw repository was not supplied for this audit. |

Expected landing-page path from the inspected source:

1. Open the SafetyNet landing page.
2. Read the problem statement and three-step Check-in Time explanation.
3. Select `See what your contacts receive` to open the alert demonstration.
4. Select `Get Early Access` to open the registration form.
5. Submit an email address if conducting an authorised form test.
6. Record the observed result; do not assume successful submission proves the wider product exists.

### 4.2 Operator or AI-agent workflow

1. Read Section 5 before relying on any project fact.
2. Inspect the current `index.html` and deployed page before making changes.
3. Separate visible interface content from product, reliability, privacy, security, and pricing claims.
4. Treat older internal context as non-current unless a newer source reconfirms it.
5. Update this README whenever a current source, implementation state, dependency, or reliance boundary changes.
6. Re-run the README and fit-for-purpose assessments before treating the revised file as a project control.

## 5. Source authority

Project facts are governed by recency and source directness.

| Priority | Source | Date | Authority and use |
|---:|---|---:|---|
| 1 | `SN_Brief-landing_based_190726.md` | 2026-07-19 | Most recent direct extraction from the local landing-page source. Primary basis for current page content. |
| 2 | `safetynet-project-brief_landing-page-basis_GPT_150726.md` | 2026-07-15 | Analytical project brief based solely on the landing-page surface. Primary basis for reliance limits, unknowns, and tensions. |
| 3 | `safetynet-context-brief_270526.md` | 2026-05-27 | Older internal project context. Use only where not contradicted and label as older or unconfirmed. |
| Control | `STD_ReadMe_v1.1_040626.md` | 2026-04-06 | README structure, completeness, accuracy, usability, certification, naming, and placement criteria. |
| Control | `STD_Fit-for-Purpose_OpenAI-Equivalent_UNREVIEWED_1951.050726.md` | 2026-07-05 | Governing assessment method for contract, proportionality, findings, uncertainty, and verdict. Current lifecycle state is MVO / pending Lab validation. |

When sources conflict, prefer the newer direct landing-page source. Do not silently merge older internal statements into the current public state.

## 6. Public landing-page proposition

### 6.1 Core pathway

| Stage | Publicly described action | Evidence status |
|---|---|---|
| Set-up | User sets a Check-in Time and supplies contact and plan information. | PUBLIC CLAIM |
| Active period | A countdown runs and the user can select `I'm Safe`. | PUBLIC CLAIM |
| Missed check-in | SafetyNet says it automatically sends an alert. | PUBLIC CLAIM |
| Contact response | Chosen contacts receive context and instructions and decide what to do. | PUBLIC CLAIM / IMPLIED |
| Early access | A visitor selects `Get Early Access` and submits an email address. | VISIBLE |

### 6.2 Public value claims

| Claim | Status | Reliance limit |
|---|---|---|
| Automatic alerts | PUBLIC CLAIM | Delivery logic and reliability were not verified. |
| Works when the user's phone is unavailable after setup | PUBLIC CLAIM | Server operation, trigger execution, and alert delivery were not verified. |
| Zero continuous tracking | PUBLIC CLAIM | Data flows and implementation were not inspected. |
| Plans remain private until an alert | PUBLIC CLAIM | Storage, access control, and release behaviour were not inspected. |
| Contacts need no application | PUBLIC CLAIM | SMS and email delivery were not tested. |
| Fast setup and false-alarm controls | PUBLIC CLAIM | The shipped setup, reminder, grace-period, and cancellation flows were not established. |
| Free and Premium tiers | PUBLIC CLAIM | Pricing and commercial implementation were not established. |

## 7. Current-state evidence

| Item | Current source status |
|---|---|
| Landing-page source and page structure | VISIBLE in the supplied July extraction and analysis. |
| Early-access form | VISIBLE on the inspected page surface. |
| Alert demonstration | VISIBLE on the inspected page surface. |
| Product described as launching soon | PUBLIC CLAIM. |
| `iOS`, `Android`, and web availability | PUBLIC CLAIM. |
| Operational alerting product | NOT ESTABLISHED. |
| Real-world alert reliability | NOT ESTABLISHED. |
| Security controls and backup systems | NOT ESTABLISHED. |
| Demand, conversion, and willingness to pay | NOT ESTABLISHED. |
| Improved safety outcomes | NOT ESTABLISHED. |

## 8. Scope and boundaries

### 8.1 In scope for this README

- Current landing-page proposition and visible user journey.
- Early-access conversion entry point.
- Publicly stated check-in and contact-alert concept.
- Source hierarchy and reliance labels.
- Known gaps, tensions, failure modes, and update controls.

### 8.2 Out of scope for this README

- Certification of production readiness or operational capability.
- Security, privacy, legal, regulatory, accessibility, performance, or safety assurance.
- Proof of alert delivery, server-side countdowns, contact response, or emergency outcomes.
- Complete repository inventory, build procedure, deployment procedure, or dependency lockfile.
- Confirmation of current target market, acquisition channel, Vault scope, or pricing model where only older context supports the statement.
- Replacement for emergency services, personal safety planning, or professional safety advice.

## 9. Older internal context not reconfirmed

The May 2026 context brief records additional project details, including a Vault feature, an initial target of women aged 25–40 in urban dating contexts, TikTok as a primary acquisition channel, and a stack involving HTML/Tailwind, Vercel, GitHub, Supabase, Cloudflare Turnstile, and Plausible.

These details are not treated as current in this README because the July landing-page sources do not reconfirm all of them. The confirmed current stack is documented in Section 10.

**Plausible (flagged):** Referenced in `privacy.html` and `modals/privacy-policy.html` as "privacy-friendly analytics (Plausible) which does not use cookies and does not collect personal data." No Plausible script tag is present in `index.html` or any other page source. Analytics is **NOT currently active** on the site. The legal text references a capability not yet implemented.

## 10. Repository, architecture, and dependencies

| Requirement | Current status |
|---|---|
| Complete project file inventory | ESTABLISHED — see `CODEBASE_MAP.md` |
| Current build and run commands | ESTABLISHED — see Section 10.0 |
| Current deployment architecture | ESTABLISHED — see Section 10.0 |
| External dependencies | ESTABLISHED — see Section 10.0 |
| Current data flow | ESTABLISHED — see Sections 10.1 and 10.2 |
| Email delivery implementation | ESTABLISHED — Supabase edge function + Resend API (see Section 10.2) |

### 10.0 Tech stack

| Layer | Technology | Detail |
|---|---|---|
| Frontend | Static HTML / Tailwind CSS / Vanilla JS | ES6 modules, no bundler |
| Hosting | Vercel | Auto-deploys on push to `main` |
| Source control | GitHub | Private repo: `CamG360/safetynet-landing` |
| Bot protection | Cloudflare Turnstile + Worker | Widget in browser; Worker verifies token and writes to Supabase |
| Database | Supabase (PostgreSQL) | Project: `igzyfbzayuimdnjhapog.supabase.co` |
| Email delivery | Resend | Called from Supabase edge function via `RESEND_API_KEY` secret |
| Analytics | Plausible | Referenced in legal text only — NOT loaded on page (see Section 9) |

### 10.0.1 Build commands

```bash
npm install               # Install dependencies
npm run build:css         # Compile Tailwind CSS (required before first run)
node build-faqs.js        # Bake FAQ content into index.html (run after editing data/faq.json)
npm run build:css:watch   # Watch mode for Tailwind during development
npm test                  # Run Jest unit tests
npx playwright test       # Run Playwright smoke tests
npm run lint              # ESLint checks
```

### 10.0.2 Deployment

Push to `main` on `CamG360/safetynet-landing` → Vercel auto-deploys in ~10–30 seconds. No manual build step at deploy time — Vercel runs the configured build command.

### 10.1 Cloudflare Integration

SafetyNet uses two Cloudflare products: **Turnstile** (bot detection) and a **Worker** (API gateway between the browser and Supabase).

#### Components

| Component | Purpose | Location |
|---|---|---|
| Turnstile widget | Renders bot-detection challenge in the browser | `index.html` — `<div class="cf-turnstile" data-sitekey="...">` |
| Turnstile JS | Loads widget, fires `onTurnstileSuccess` callback | CDN: `https://challenges.cloudflare.com/turnstile/v0/api.js` |
| Cloudflare Worker | Verifies Turnstile token, normalises email, writes to Supabase | `worker.js` |
| Worker config | Deployment settings, non-secret vars | `wrangler.toml` |

#### Data flow

```
Browser
  └─ POST /signup {email, turnstileToken}
       ↓
  Cloudflare Worker (safetynet-signup.campbell-mccord.workers.dev)
    1. Verify token → POST https://challenges.cloudflare.com/turnstile/v0/siteverify
    2. Normalise email (toLowerCase + trim)
    3. INSERT into Supabase waitlist table via REST API (service_role key)
       ↓
  Supabase (waitlist table)
    - UNIQUE constraint rejects duplicates silently
    - RLS enabled, no anon policies — direct client access blocked
       ↓
  Supabase database webhook → send-welcome-email edge function → Resend API
  (see Section 10.2)
```

#### Worker endpoint

| Method | Endpoint | Notes |
|---|---|---|
| `POST` | `https://<worker>.workers.dev/signup` | Only accepted method |
| `GET/PUT/DELETE` | — | Returns `405` |

**Response codes:**

| Code | Meaning |
|---|---|
| `200` | Token verified, email written |
| `400` | Missing email or token |
| `403` | Turnstile verification failed (bot) |
| `405` | Wrong HTTP method |
| `500` | Supabase write failed |

#### Configuration

**`wrangler.toml`**
```toml
name = "safetynet-signup"
main = "worker.js"
compatibility_date = "2025-12-30"

[vars]
SUPABASE_URL = "https://<project>.supabase.co"
```

**Secrets (set via Wrangler CLI — never committed):**
```
TURNSTILE_SECRET_KEY   # Cloudflare dashboard → Turnstile → secret key
SUPABASE_SERVICE_KEY   # Supabase dashboard → Project Settings → service_role key
```

#### Key files

| File | Role |
|---|---|
| `worker.js` | Worker source — verify, normalise, write |
| `wrangler.toml` | Wrangler deployment config |
| `js/config.js` | Client-side Turnstile site key and Worker URL |
| `js/form.js` | Form submit handler, token capture, error display |
| `botprotADR.md` | Full architectural decision record for this integration |

### 10.2 Email — Supabase Webhook + Resend

A Supabase database webhook fires on every `INSERT` into the `waitlist` table and calls the `send-welcome-email` edge function.

#### Components

| Component | Location | Purpose |
|---|---|---|
| Database webhook | Supabase dashboard → Database → Webhooks | Fires on `waitlist` INSERT; calls edge function |
| `send-welcome-email` | Supabase edge function (`index.ts`) | Parses `payload.record.email`; calls Resend API |
| `RESEND_API_KEY` | Supabase Secrets | API key for Resend — never committed |

#### Data flow

```
Supabase (waitlist INSERT)
  └─ Database webhook fires
       ↓
  send-welcome-email edge function
    1. Parse payload.record.email
    2. Validate email format
    3. POST https://api.resend.com/emails
         from:     Campbell @ SafetyNet <team@notifications.safetynetbeta.com>
         reply-to: hello@safetynetbeta.com
         subject:  "You're in (SafetyNet Early Access)"
       ↓
  Resend API → welcome email delivered to user
```

#### Notes

- Edge function source is **not committed to this repo** — it lives in the Supabase dashboard.
- Database webhook configuration is in the **Supabase dashboard only** — not in code.
- Duplicate signups are rejected by the `waitlist` UNIQUE constraint before the webhook fires.

## 11. Known risks, tensions, and failure modes

| ID | Condition | Risk | Required response |
|---|---|---|---|
| R1 | Landing-page claim is treated as implemented capability. | False operational or safety reliance. | Label the statement `PUBLIC CLAIM` until implementation and test evidence exist. |
| R2 | The page promises no tracking while alerts contain location or plan context. | Privacy and product-scope ambiguity. | Document exactly how context is collected, stored, accessed, and released. |
| R3 | A missed check-in is treated as a reliable danger signal. | False positives, false negatives, or inappropriate response. | Define trigger, grace period, cancellation, escalation, and contact-response rules. |
| R4 | An alert fails, is delayed, or is not acted on. | User or contact may assume protection that did not operate. | Establish delivery monitoring, failure notification, recovery, and reliance warnings. |
| R5 | `Get Early Access` appears to submit successfully but data is not recorded. | Invalid validation data and lost sign-ups. | Verify the current form destination, response handling, stored record, and error state. |
| R6 | Older project context is treated as current. | Scope, market, architecture, or status drift. | Reconfirm against current source or mark as `OLDER CONTEXT`. |
| R7 | The README is placed away from the project it documents. | Operators may use a stale or disconnected copy. | Place `safetynet-README.md` in the project root and maintain it with the project. |

## 12. Troubleshooting and verification

| Symptom | Minimum check | Do not conclude without evidence |
|---|---|---|
| Landing page does not load | Check the current deployment and domain status. | That the product or backend is necessarily down. |
| Alert demo does not open | Compare the deployed page with the current local source and record console or interface evidence. | That the alerting product itself is broken. |
| Early-access form fails | Test the authorised form path and verify whether a record is stored. | That sign-up demand is absent. |
| Page copy conflicts with this README | Apply the source hierarchy and update the README from the newer direct source. | That the older README statement remains authoritative. |
| Product capability is requested | Locate implementation and test evidence or mark the capability `NOT ESTABLISHED`. | That landing-page copy proves implementation. |
| Dependency or deployment question is requested | Inspect current manifests and platform configuration. | That the May 2026 stack remains current. |

## 13. How to update or extend this project documentation

1. Identify the changed object: landing-page copy, user flow, implementation, deployment, dependency, market decision, or safety claim.
2. Capture the current direct source and its date.
3. Compare it with the authority table in Section 5.
4. Update only the affected sections; preserve explicit status labels.
5. Add new files, commands, dependencies, versions, and expected outputs only after verifying that they resolve in the current repository.
6. Add or update failure handling whenever a new capability, dependency, or user reliance path is introduced.
7. Re-score all 22 README criteria.
8. Re-run the six fit-for-purpose lenses.
9. Update the certification block and metadata timestamp.

## 14. Update triggers

Review this README when any of the following occurs:

- Landing-page copy, structure, CTA, form, or demonstration changes.
- SafetyNet moves from early access to an operational product state.
- Alerting, privacy, security, pricing, or device claims are implemented or revised.
- The repository, architecture, deployment, or dependency evidence becomes available.
- The target market, acquisition channel, or MVP scope is formally reconfirmed.
- A test, incident, or user report contradicts the README.
- Either governing standard is superseded.

## 15. Residual limitations

- Stack, data flow, and deployment architecture are now confirmed (Section 10). Product implementation (alerting, mobile apps) remains NOT ESTABLISHED.
- The July sources describe the landing-page surface; they do not prove operational implementation.
- The older May context contains broader project statements that may now be stale.
- Plausible analytics is referenced in legal text but not loaded on the page — this gap is flagged but not resolved (Section 9).
- The fit-for-purpose standard used for this audit is itself marked `MVO / pending Lab validation` and has an `UNREVIEWED` source filename.

## 16. README assessment summary

| Dimension | Result | Basis |
|---|---:|---|
| Identity | Pass | Project, purpose, audience, and scope boundaries are explicit. |
| Structure | Pass | Consistent headings, tables for multi-attribute content, technical strings formatted, metadata included. |
| Completeness | Partial | Usage, limitations, sources, and maintenance are covered; repository inventory and dependency versions are unavailable. |
| Accuracy | Partial | Statements are traceable to supplied briefs and status-labelled; raw implementation and file resolution were not fully verified. |
| Usability | Pass | Visitor and operator workflows, examples, troubleshooting, and update instructions are sequential. |

Verdict under `README-STD-001`: **Functional**. The README cannot be Comprehensive until current repository and implementation evidence resolves the remaining T1 accuracy limitations and T2 completeness gaps.

<metadata>

― Reference ―
ID:         SN-README-001
Title:      SafetyNet Project README
Artifact:   Project / README
Definition: Controlled orientation to the current SafetyNet landing-page project, its public proposition, source basis, operating limits, known gaps, and maintenance procedure.
Level:      L1
Preparer:   OpenAI AI Audit (original); C1 (stack + email flow additions, 1216.020826)
Confidence: High for supplied-source representation and confirmed implementation state
Timestamp:  1216.020826

― Location ―
Current Filepath: safetynet-landing/safetynet-README_1827.020826.md
Target Placement: safetynet-landing/README.md
Primary Source:   Safetynet-landing/safetynet-landing/index.html
Public URL:       https://safetynetbeta.com

― Governance ―
README Standard: README-STD-001 v1.1
Assessment Standard: Fit-for-Purpose OpenAI-Equivalent Standard — 1951.050726
Lifecycle State: Functional / fit for limited project-orientation purpose

</metadata>
