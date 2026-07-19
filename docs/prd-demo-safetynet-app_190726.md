# PRD — SafetyNet Interactive Demo App

**Status**: Draft  
**Author**: Campbell McCord (via Claude Code)  
**Date**: 2026-07-19

---

## 1. Context

SafetyNet's landing page (safetynetbeta.com) explains a product that is non-obvious to most visitors. The core UX challenge is not feature explanation — it's helping users recognise a safety gap they already have but have never consciously named: *"My current safety tools fail if I cannot use my phone."*

The existing landing page uses copy, diagrams, and a static alert-preview modal to bridge this gap. The next step is an interactive demo that lets visitors feel the product before signing up, and that investors and press can navigate to understand the product end-to-end.

**Problem this solves:**  
A static page cannot convey the "dead man's switch" mechanic intuitively. An interactive walkthrough puts the user in the driver's seat: they set a check-in, watch the timer run, and see what their contact receives — making the value proposition visceral rather than conceptual.

---

## 2. Audiences

| Audience | Goal | Entry point |
|----------|------|-------------|
| Prospective user (women 25–40, mobile) | Feel what it's like to use SafetyNet before committing to waitlist | Landing page CTA: "See how it works" |
| Investor / press | Self-navigate the full product loop in < 5 min | Shareable direct URL: `/demo` |

Both audiences use the same interactive demo. Investors get a "skip ahead" mechanism so they don't wait for a real-time countdown.

---

## 3. Form

**Interactive clickable walkthrough** — fully client-side.

- No real backend, no auth, no network calls.
- Pre-filled demo data throughout — visitor never types anything.
- Scripted state machine drives all transitions.
- Demo runs in a single page (`/demo` or `demo/index.html`).
- Embeddable on the landing page via the hero CTA.
- Standalone shareable URL for investor use.

---

## 4. Scope — User Flows

All four flows must be covered in a single linear walkthrough with optional branching at the "alert fires vs. check in" decision point.

### Flow 1 — Create a SafetyNet
User sees a pre-filled form:
- **Plan**: "Date with James"
- **Location**: "The Bluebird Cafe, 14 Market St"
- **Contact**: "Mum — +61 4XX XXX XXX"
- **Check-in deadline**: Tonight at 22:00
- **Vault document**: "Emergency_Contacts.pdf" (pre-selected)

User taps "Create SafetyNet" → state transitions to **Ready**.

> Pre-filled fields should be editable but the demo works if the user never changes anything. Editing is cosmetic only — it doesn't affect downstream state.

### Flow 2 — Start / Activate
User sees the ready state (plan summary, countdown to deadline).  
User taps "Start — I'm heading out now" → state transitions to **Active**.  
Countdown begins. Demo timer: 10 real seconds = alert fires (with a visible "x1 / x60 / SKIP" speed control for investors).

### Flow 3a — Alert Fires (missed check-in)
Timer reaches zero. Grace period: 5 real seconds with a "5… 4… 3…" countdown and a "snooze 30 min" button (tapping it extends, but still fires in the demo to keep the flow moving).  
Alert fires → full-screen split view:
- Left / top (user's phone): "Alert sent — your contact has been notified"
- Right / bottom (contact's perspective): Mock SMS/email received — reuses content from existing `modals/alert-demo.html`

Vault panel slides in: "Emergency_Contacts.pdf shared with Mum"

CTA: "Want this for real? Get Early Access →" (email capture modal)

### Flow 3b — Check In (happy path)
From the Active state, a persistent "I'm Safe" button is visible.  
User taps it → confirmation screen: "SafetyNet cancelled. Mum won't be alerted."  
CTA: "Ready to set one up for real? Get Early Access →"

### Flow 4 — Vault Document Release (embedded in Flow 3a)
On alert fire, vault document release is shown as a panel/card:
- Document name, unlock icon animation
- "Mum can now access Emergency_Contacts.pdf"
- No real file upload or retrieval — cosmetic state only

> Vault is not a separate flow; it's a consequence of alert firing. Keep it visually integrated.

---

## 5. State Machine

```
SETUP → READY → ACTIVE → CHECKED_IN
                       ↘ ALERT_FIRED → VAULT_RELEASED
```

All state lives in a plain JS object. No localStorage. Demo resets on "Start over" or page refresh.

---

## 6. UX Requirements

### Navigation
- Step indicator: dots or numbered progress bar (1 Create → 2 Active → 3 Resolution)
- "Start over" button always visible (top-right, low visual weight)
- Speed control for timer: ×1 / ×60 / Skip (visible from Active state onward)

### Mobile-first layout
- Primary viewport: 390px (iPhone 14)
- Demo simulates a phone UI — wrap content in a phone-frame shell on desktop
- On mobile: full-screen, no phone frame

### Screens required (minimum)
| Screen | State |
|--------|-------|
| Create form | SETUP |
| Ready summary | READY |
| Active countdown | ACTIVE |
| Alert fired — dual view | ALERT_FIRED |
| Check-in confirmed | CHECKED_IN |
| Vault released panel | VAULT_RELEASED (child of ALERT_FIRED) |

### Micro-interactions
- Timer countdown: large, prominent, red when < grace period
- Alert fire: brief pulse/vibration animation before split view
- Vault unlock: lock icon animates open
- Transitions: slide or fade between states (100–200ms)

### CTA placement
- After CHECKED_IN: inline CTA card
- After ALERT_FIRED/VAULT_RELEASED: full-width CTA bar at bottom
- Both CTAs open the existing waitlist email capture modal

---

## 7. Content — Demo Data

| Field | Value |
|-------|-------|
| Plan name | Date with James |
| Location | The Bluebird Cafe, 14 Market St |
| Emergency contact name | Mum |
| Emergency contact number | +61 4XX XXX XXX |
| Check-in deadline | Tonight at 22:00 |
| Vault document | Emergency_Contacts.pdf |
| Alert headline (contact view) | Safety Alert: Emma hasn't checked in |
| Alert body (contact view) | Reuse text from `modals/alert-demo.html` |

"Emma" is the demo persona name — used in the contact's alert view only. The user-facing UI uses "you / your".

---

## 8. Technical Requirements

### Stack
- Vanilla JS (ES6 modules) — matches existing landing page codebase
- Tailwind CSS — matches existing setup
- No framework, no build step beyond what already exists
- Single entrypoint: `demo/index.html` (or `demo.html` at root)
- State machine: `js/demo.js` — exports a `DemoApp` class or plain object

### File structure
```
demo/
  index.html        ← demo shell + phone frame
js/
  demo.js           ← state machine + event handlers
  demo-timer.js     ← countdown logic, speed multiplier
```
Reuse existing:
- `modals/alert-demo.html` content (import or inline)
- Tailwind config / CDN already loaded
- Waitlist modal + email capture (existing JS)

### No backend calls
- No Supabase, no Cloudflare Worker, no auth
- Timer fires client-side only
- Email capture on the final CTA uses existing waitlist endpoint (already live)

### Routing
- Standalone: `/demo` (add to Vercel routing if needed)
- Landing page entry: existing "See how it works" CTA or new "Try the demo" button near hero

---

## 9. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Load time | < 2s on 4G mobile |
| Mobile support | iOS Safari 16+, Chrome Android |
| Accessibility | Keyboard navigable, ARIA labels on state transitions |
| No auth dependency | Must work with zero cookies / session |
| Analytics | Fire Plausible events: `demo_started`, `demo_alert_fired`, `demo_cta_clicked` |
| Reset behaviour | "Start over" returns to SETUP with pre-filled data intact |

---

## 10. Out of Scope

- Real backend or database
- Real email/SMS delivery
- Multi-contact support
- Editing/cancelling after alert fires
- Account creation within the demo
- Vault file upload (cosmetic only)
- Internationalization / timezones

---

## 11. Success Metrics

| Metric | Target |
|--------|--------|
| Demo → waitlist conversion rate | > 15% of demo starters submit email |
| Demo completion rate | > 60% of starters reach ALERT_FIRED or CHECKED_IN |
| Investor self-navigation | Stakeholder can complete unaided in < 5 min |
| CTA click-through | > 30% of completers click final CTA |

Baseline: current landing page waitlist conversion rate (pre-demo).

---

## 12. Delivery

**Output files:**
- `demo/index.html`
- `js/demo.js`
- `js/demo-timer.js`

**Entry points:**
- `safetynetbeta.com/demo` — standalone
- Landing page hero: new secondary CTA "Try the interactive demo"

**Definition of done:**
- All 5 screens render correctly on iPhone 14 viewport
- State machine covers all transitions (SETUP → READY → ACTIVE → both resolution states)
- Timer speed control works (×1, ×60, Skip)
- Alert view reuses existing alert-demo content
- Vault release panel appears on ALERT_FIRED
- Both CTAs open existing waitlist modal
- Plausible events fire on demo_started and demo_cta_clicked
- No console errors on iOS Safari
