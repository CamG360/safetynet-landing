# Product Requirements Document — Accommodation Credibility Platform

**Owner:** CM
**Status:** PRD — Ready for review
**Version:** 1.0
**Date:** 2026-03-27

---

## 1. Product Vision

A structured, independent credibility platform for short-term rental accommodations that surfaces what existing review systems suppress: accuracy, safety, financial integrity, and owner accountability — with first-class support for off-platform and direct bookings that have zero existing review infrastructure.

---

## 2. Target Users

### Primary: Guests

| Segment | Description | Key Need |
|---|---|---|
| **Digital nomads** | Remote workers rotating through SE Asia, Latin America, and similar hubs | Reliable wifi, workspace, accurate listings, landlord accountability |
| **Expats** | Longer-stay residents in non-western rental markets | Contract integrity, deposit protection, safety standards |
| **Tourists** | Short-stay travellers using platform and off-platform bookings | Listing accuracy, safety, value for money |
| **Business travellers** | Corporate stays in non-hotel accommodation | Consistency, reliability, security |

### Secondary: Property Owners / Operators

Owners are not the launch audience but become relevant at scale. The platform operates without owner participation initially (Glassdoor model) and introduces owner engagement features later.

---

## 3. Product Principles

1. **Independence over neutrality** — The platform exists to serve guests, not to balance guest and owner interests equally. Owner features come later.
2. **Structure over free-text** — Dimensional scoring produces comparable, aggregatable data. Free-text supplements but does not replace structured input.
3. **Evidence over opinion** — Photo evidence, receipts, and documentation elevate review credibility.
4. **Negative skew is a feature** — Complaint-driven submissions are treated as a calibration baseline, not a flaw. The system rebalances algorithmically.
5. **Off-platform first** — The hardest, most underserved segment (direct bookings, cash-only, no-contract) is the primary differentiator, not an afterthought.

---

## 4. Feature Requirements

### 4.1 Structured Review Submission (SOL1)

**Priority:** P0 — MVP

Guests submit reviews using a structured schema with dimensional scoring plus optional free-text and evidence.

#### Review Dimensions

Each dimension is scored on a 1–5 scale with mandatory selection and optional comment per dimension.

| Dimension | What It Captures | Maps To |
|---|---|---|
| **Accuracy** | Listing vs reality — photos, amenities, description | A1, A2 |
| **Safety** | Fire equipment, structural integrity, hazards, health | S1, S2, S3 |
| **Value** | Price fairness, hidden fees, overcharging | A3, F2 |
| **Honesty** | Deposit handling, contract integrity, transparency | F1, F2 |
| **Responsiveness** | Owner/operator remediation speed and quality | O1 |
| **Power Balance** | Guest felt safe to raise issues without fear of retaliation | O2 |
| **Environment** | Noise, neighbourhood accuracy, surroundings as described | O3 |

#### Evidence Upload

- Photo upload (listing vs reality side-by-side encouraged)
- Document upload (receipts, contracts, correspondence screenshots)
- Maximum 10 files per review, 10MB per file
- Accepted formats: JPEG, PNG, PDF

#### Free-Text Fields

- **Summary** (required, 50–500 characters): One-line experience summary
- **Detail** (optional, up to 2000 characters): Extended narrative
- **Advice to future guests** (optional, up to 500 characters): Practical tips

#### Submission Rules

- One review per property per stay (deduplicated by reviewer + property + date range)
- Reviews are published after a 48-hour moderation window
- Reviewer can edit within 7 days of submission; after that, review is locked

---

### 4.2 Reviewer Profile Capture (SOL7)

**Priority:** P0 — MVP

Every review is submitted with reviewer context to enable calibrated interpretation.

| Field | Type | Required |
|---|---|---|
| Reviewer type | Enum: digital nomad, tourist, business traveller, expat, other | Yes |
| Country of origin | Country selector | Yes |
| Length of stay | Enum: < 1 week, 1–4 weeks, 1–3 months, 3–6 months, 6+ months | Yes |
| Booking method | Enum: Airbnb, Booking.com, Agoda, other platform, direct/off-platform | Yes |
| Purpose | Enum: work, holiday, relocation, transit, other | Yes |

Reviewer profiles are anonymous by default. Display name is optional. No real name is ever publicly displayed.

---

### 4.3 Property Listing (Stack)

**Priority:** P0 — MVP

Each property has a structured profile page.

| Field | Required | Detail |
|---|---|---|
| Property name | Yes | Current listing name |
| Former name(s) | No | Previous names if rebranded (surfaced to prevent reputation laundering) |
| Owner / operator | Yes | Name or alias as known to guests |
| Location | Yes | City, district/neighbourhood, country |
| Google Maps link | Yes | Pinned location |
| Platform link(s) | No | Airbnb, Agoda, Booking.com listing URLs |
| Website | No | Direct site if applicable |
| Phone | No | Contact number |
| Property type | Yes | Enum: apartment, house, room, hostel, guesthouse, hotel, other |
| Notes | No | Freeform (e.g. cash-only, no contract, no receipt) |

#### Property Creation

- Any registered user can create a property listing
- Duplicate detection by location + name fuzzy matching
- Properties are never deleted; they can be flagged as closed/renamed

---

### 4.4 Owner Credibility Score (SOL2)

**Priority:** P1 — Post-MVP

An aggregated score per owner, derived from all properties linked to that owner.

#### Calculation

- Weighted average of dimensional scores across all reviews for all linked properties
- Recency weighting: reviews from the last 12 months count 2x vs older reviews
- Verification weighting: reviews with evidence uploads score 1.5x vs no evidence
- Minimum threshold: score not displayed until 3+ reviews exist for the owner

#### Display

- Overall credibility score (1–5, one decimal)
- Per-dimension breakdown
- Review count and date range
- Trend indicator (improving / declining / stable over last 6 months)

---

### 4.5 Catfish Detection (SOL3)

**Priority:** P1 — Post-MVP

Side-by-side comparison of listing photos vs guest-uploaded photos for the same property.

#### Requirements

- Guest tags uploaded photos by room/area (bedroom, bathroom, kitchen, exterior, common area)
- System displays listing photos (scraped or user-submitted) alongside guest photos for the same area
- Catfish severity indicator: percentage of reviews that flag listing accuracy as 1 or 2 out of 5

---

### 4.6 Risk Flags (SOL4)

**Priority:** P1 — Post-MVP

Automated pattern detection that surfaces warnings on property and owner profiles.

| Flag | Trigger | Display |
|---|---|---|
| **Deposit risk** | 3+ reviews mentioning deposit issues (F1) | "Multiple guests report deposit problems" |
| **Safety concern** | 2+ reviews scoring Safety at 1–2 | "Recurring safety concerns reported" |
| **Cash-only / no receipt** | 2+ reviews flagging cash-only or no receipt | "Operates cash-only with no documentation" |
| **Retaliation risk** | 2+ reviews scoring Power Balance at 1–2 | "Guests report fear of raising issues" |
| **Catfish alert** | 3+ reviews scoring Accuracy at 1–2 | "Listing may not match reality" |

Flags are system-generated, not user-applied. They appear/disappear based on current review data.

---

### 4.7 Review Calibration (SOL6)

**Priority:** P1 — Post-MVP

The platform's review population skews toward negative experiences by design (complaint-driven submissions). Calibration adjusts aggregate scores to account for this known bias.

#### Mechanism

- Baseline negativity ratio is established per geography and property type from early data
- Aggregate scores are adjusted upward by a calibration factor derived from the baseline
- Calibration factor is transparent: displayed as "Adjusted score" with tooltip explaining methodology
- Raw (unadjusted) scores are always available alongside adjusted scores

---

### 4.8 Google Review Bridge (SOL5)

**Priority:** P2 — Future

For properties with no native review platform (direct bookings, off-platform), the platform generates a structured review template that users can paste into Google Reviews.

#### Requirements

- One-click generation of a formatted Google Review from the structured review data
- Template includes dimensional scores in a standardised format (e.g. "Accuracy: 2/5 | Safety: 4/5 | ...")
- Link to full review on the platform included in the template
- Serves dual purpose: seeds Google with structured data and drives traffic back to the platform

---

### 4.9 Search and Discovery

**Priority:** P0 — MVP

| Feature | Detail |
|---|---|
| **Search by location** | City, country, or neighbourhood |
| **Search by property name** | Exact and fuzzy match |
| **Search by owner** | Name or alias |
| **Filter by score** | Minimum credibility score threshold |
| **Filter by reviewer type** | Show reviews from specific reviewer segments |
| **Sort** | By recency, score, review count |

---

### 4.10 User Accounts

**Priority:** P0 — MVP

| Feature | Detail |
|---|---|
| **Registration** | Email + password or OAuth (Google, Apple) |
| **Gated access** | Users must submit at least 1 review to access full review detail on other properties (Glassdoor model — solves cold start) |
| **Profile** | Reviewer type, country of origin, review history (private by default) |
| **Anonymity** | All reviews are anonymous by default; optional display name |

---

## 5. Content Moderation

### Automated

- Profanity filter on free-text fields
- Spam detection (duplicate content, suspicious patterns)
- Photo NSFW detection

### Community

- Flag button on every review for other users to report
- Flagged reviews enter moderation queue

### Manual

- Moderation queue reviewed within 48 hours
- Moderation decisions: approve, request edit, remove with reason
- Appeals process: reviewer can appeal removal once; second review is final

### Policy

- Reviews must describe a real stay (no speculative or second-hand reviews)
- Evidence-backed claims are given higher weight in disputes
- No personally identifiable information about other guests
- Owner names/aliases are permitted (they are business operators, not private individuals in this context)

---

## 6. Data Model (Core Entities)

```
Property
├── property_id (PK)
├── name
├── former_names[]
├── owner_id (FK → Owner)
├── location { city, district, country, lat, lng }
├── google_maps_url
├── platform_links[]
├── website
├── phone
├── property_type
├── notes
├── status (active | closed | renamed)
├── created_at
└── updated_at

Owner
├── owner_id (PK)
├── name_or_alias
├── properties[] (FK → Property)
├── credibility_score (computed)
├── review_count (computed)
└── created_at

Review
├── review_id (PK)
├── property_id (FK → Property)
├── reviewer_id (FK → User)
├── stay_date_range { start, end }
├── scores { accuracy, safety, value, honesty, responsiveness, power_balance, environment }
├── summary
├── detail
├── advice
├── evidence[] (FK → Evidence)
├── status (pending | published | removed)
├── created_at
├── updated_at
└── locked_at

Reviewer (extends User)
├── user_id (PK)
├── reviewer_type
├── country_of_origin
├── reviews[] (FK → Review)
└── created_at

Evidence
├── evidence_id (PK)
├── review_id (FK → Review)
├── file_url
├── file_type
├── area_tag (bedroom | bathroom | kitchen | exterior | common_area | other)
├── uploaded_at
└── moderation_status

ReviewerStayContext (per review)
├── reviewer_type
├── country_of_origin
├── length_of_stay
├── booking_method
└── purpose
```

---

## 7. User Flows

### 7.1 Submit a Review

1. User logs in / registers
2. Searches for property → if not found, creates property listing
3. Enters stay date range
4. Scores each dimension (1–5)
5. Writes summary (required) and optional detail / advice
6. Uploads evidence (optional)
7. Completes reviewer context for this stay
8. Submits → review enters 48-hour moderation window
9. Review published or flagged for manual review

### 7.2 Search for a Property

1. User enters location, property name, or owner name
2. Results displayed with: property name, location, overall score, review count, risk flags
3. User clicks property → sees full profile, dimensional breakdown, individual reviews
4. If gated: user sees preview (score + flag summary) but must submit a review to unlock full detail

### 7.3 Gated Access (Cold-Start Mechanism)

1. New user searches and finds a property
2. Sees: overall score, review count, risk flag summary
3. Prompted: "Submit a review to unlock full details"
4. After submitting 1 review: full access to all review detail, evidence, and dimensional breakdowns across the platform

---

## 8. Success Metrics

### Launch (0–6 months)

| Metric | Target |
|---|---|
| Registered users | 1,000 |
| Reviews submitted | 500 |
| Properties listed | 300 |
| Geographies with 10+ reviews | 3 |

### Growth (6–18 months)

| Metric | Target |
|---|---|
| Monthly active users | 5,000 |
| Reviews submitted (cumulative) | 5,000 |
| Gated access conversion (search → submit review) | 15% |
| Repeat reviewers (2+ reviews) | 25% of reviewer base |

### Quality

| Metric | Target |
|---|---|
| Reviews with evidence uploaded | 30% |
| Moderation removal rate | < 5% |
| Average review completion time | < 8 minutes |

---

## 9. Launch Geography

**Initial target:** Vietnam (Ho Chi Minh City, Da Nang, Hanoi)

**Rationale:**
- High concentration of digital nomads and expats
- Predominantly off-platform, cash-only rental market
- Zero existing review infrastructure for direct bookings
- Acute pain point: no contracts, no receipts, no recourse
- English-speaking nomad community provides early adopter base

**Expansion sequence:** Thailand → Mexico → Colombia → Portugal (following nomad hub density)

---

## 10. Revenue Model (Hypothesis)

Revenue is not a launch requirement. The following are hypotheses to validate post-traction.

| Model | Description | Timing |
|---|---|---|
| **Freemium access** | Basic scores free; full detail / evidence / dimensional breakdown behind paywall or gated access | Post-launch |
| **Owner tier** | Owners claim profiles, respond to reviews, access analytics — paid subscription | Post-MVP |
| **Data licensing** | Aggregated credibility data licensed to relocation services, corporate travel, insurance | Scale |
| **Affiliate** | Referral links to vetted/high-scoring properties on booking platforms | Scale |

---

## 11. Legal & Compliance Requirements

| Requirement | Detail |
|---|---|
| **Defamation mitigation** | Structured dimensional scoring reduces free-text defamation surface. Evidence upload supports truth defence. Platform operates as intermediary, not publisher (Section 230 / EU equivalent positioning) |
| **Data protection** | GDPR compliance for EU users. Local data protection compliance per launch geography. Anonymisation by default. Right to deletion for reviewer accounts |
| **Terms of service** | Clear TOS establishing: reviews reflect personal experience, platform is not liable for user content, dispute process for owners who contest reviews |
| **Owner notification** | Owners are not notified of individual reviews at launch. Notification is introduced with owner engagement features (P1) |
| **Jurisdiction** | Platform entity registered in a jurisdiction with strong intermediary liability protections |

---

## 12. Technical Requirements (Non-Functional)

| Requirement | Detail |
|---|---|
| **Performance** | Property pages load in < 2 seconds on 3G connections (target market often has slow connectivity) |
| **Mobile-first** | Primary interface is mobile web; native apps are not in scope for MVP |
| **Offline review drafting** | Users can draft reviews offline; submission requires connectivity |
| **Image optimisation** | Evidence uploads compressed and served via CDN |
| **Search** | Full-text search with fuzzy matching on property names, owner names, locations |
| **Internationalisation** | English only at launch; architecture supports future localisation |
| **Availability** | 99.5% uptime target |

---

## 13. Risks and Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| **Cold start** | High | Gated access model (submit to see); seed Vietnam market first; target nomad communities directly; Google Review Bridge extends reach |
| **Defamation claims** | Medium | Structured scoring over free-text; evidence upload; intermediary liability positioning; legal review of TOS pre-launch |
| **Review manipulation** | Medium | Reviewer profiling; calibration mechanism; one-review-per-stay deduplication; moderation pipeline |
| **Owner retaliation** | Medium | Anonymity by default; 48-hour delayed publication; no owner notification at launch |
| **Platform competition** | Low | Off-platform segment is structurally unaddressable by booking platforms (conflicting incentives); first-mover advantage in no-platform environments |
| **Scope creep** | Medium | Booking engine, dispute resolution, and general travel reviews are explicitly out of scope. Uncertain boundaries are flagged, not committed |

---

## 14. Phasing

### Phase 0 — MVP

- Structured review submission with dimensional scoring
- Reviewer profile capture
- Property listing creation and search
- User accounts with gated access
- Content moderation pipeline
- Mobile-first web app
- Launch: Vietnam (HCMC, Da Nang, Hanoi)

### Phase 1 — Post-MVP

- Owner credibility score (aggregated)
- Catfish detection (photo comparison)
- Risk flags (automated pattern detection)
- Review calibration mechanism
- Owner engagement features (claim profile, respond to reviews)

### Phase 2 — Scale

- Google Review Bridge
- Expansion to Thailand, Mexico, Colombia, Portugal
- Revenue model activation (freemium / owner tier)
- Data licensing exploration
- Localisation

---

## 15. Open Decisions

| ID | Decision | Owner | Deadline |
|---|---|---|---|
| OD1 | Rating language: "credibility score", "trust rating", or something else? Framing sets tone, legal exposure, and owner engagement | CM | Before MVP design |
| OD2 | Owner response mechanism: allow at launch or introduce later? | CM | Before MVP design |
| OD3 | User acquisition channel: nomad forums, SEO, co-working partnerships, or other? | CM | Before launch |
| OD4 | Cultural calibration: how to handle norms that vary by market (e.g. cash-only standard in Vietnam)? | CM | Before expansion |
| OD5 | Platform entity jurisdiction | CM | Before launch |

---

## 16. Dependencies

| Dependency | Detail |
|---|---|
| **Legal counsel** | TOS, defamation risk assessment, intermediary liability positioning — required before launch |
| **Moderation capacity** | At minimum 1 moderator for 48-hour review window at launch scale |
| **Cloud infrastructure** | Image storage, CDN, search index, database — standard web stack |
| **Design** | Mobile-first UI/UX for review submission and property discovery flows |

---

**Document status:** PRD complete. Ready for stakeholder review.
**Next action:** Design review of core user flows (submit review, search property, gated access).
