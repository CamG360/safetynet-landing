# SafetyNet Project Brief — Landing-Page Basis

## 1. Brief purpose and reliance boundary

This brief converts the current SafetyNet landing page into planning-grade context for later review. The sole source used is the landing page content visible or reachable within the page surface: hero, overview, how-it-works, examples, reactions, comparison, founder story, FAQ, early-access form, alert demo, and footer.

The full local landing-page source was accessible. This brief can be relied on to describe what the page publicly communicates. It cannot be relied on as evidence that the claims, product capability, reliability, market need, commercial model, or safety outcomes are true.

## 2. Executive project definition

SafetyNet appears to be a personal-safety product that lets a user create a timed check-in for a planned activity. If the user does not check in by the chosen time, SafetyNet says it sends an automatic alert to chosen contacts with the user's plans, context, and instructions. The page frames the problem as the failure of "text me when you're safe" when someone cannot access their phone, has no signal, has a dead battery, is unconscious, or cannot ask for help.

The intended outcome is that someone knows something may be wrong and has enough information to act. The page positions SafetyNet as different from location-sharing apps because it does not rely on continuous tracking and because it sends an alert plus action guidance. The most material point not established is whether the alerting system exists, has been tested, is reliable in real-world safety-critical use, and produces appropriate contact action.

## 3. Core concept

| Element | Brief statement | Status | Landing-page basis |
|---|---|---:|---|
| Central concept | A missed check-in becomes the signal that help may be needed. | EXPLICIT | Hero card; FAQ "How does it work offline or with a dead battery?" |
| Product or service | A personal-safety app/service that runs a check-in countdown and sends alerts. | EXPLICIT / PUBLIC_CLAIM | "Create your SafetyNet"; FAQ device availability |
| User action | User creates a SafetyNet, sets a Check-in Time, adds contacts, and checks in safe. | EXPLICIT | How It Works; FAQ "How do I add my contact?" |
| SafetyNet action | SafetyNet reminds the user, waits for check-in, and sends a Safety Alert if missed. | PUBLIC_CLAIM | Hero; How It Works; FAQ |
| Trusted contact action | Contact receives context and instructions, then calls, goes to the location, contacts reception/bar, or calls emergency services if needed. | EXPLICIT / IMPLIED | Alert demo; examples; FAQ "What does my emergency contact need to do?" |
| Intended outcome | Contacts know something may be wrong, know the plan, and know what to do. | PUBLIC_CLAIM | Mental model; comparison; examples |
| Emergency-service response | Emergency services may be called by a contact if needed. | IMPLIED | Alert demo "Call emergency services if needed"; marketplace example "then 999" |

## 4. Background and rationale

The page states that SafetyNet was built from the insight that silence should trigger concern when a person was expected to check in but does not. The founder story says Campbell McCord spent 20 years designing control systems that catch problems before escalation and is applying a "silent safeguard" principle to personal safety.

The page gives scenarios behind the mission: unsafe dates, compromised states, solo accidents, false assumptions among groups, traveller uncertainty, and missing context when someone is reported missing. These are PUBLIC_CLAIM examples on the page, not validated evidence within the page.

## 5. Problem definition

The safety problem identified is that a person may be unable to text, call, send an SOS, or reach their phone, leaving contacts unaware that anything is wrong. Situations named include solo travel, modern dating, marketplace sales, hiking alone, business trips, unsafe social situations, being unconscious, no signal, dead battery, and missing-person scenarios.

What the page establishes: SafetyNet publicly frames the problem as missed communication plus missing context.

What it merely claims: Existing location-sharing apps "fail silently," SafetyNet reduces ambiguity, and contacts will know how to help.

What remains unknown: prevalence of the problem, user willingness to set check-ins, contact willingness to act, false-alarm rates, alert reliability, and whether the proposed pathway improves outcomes.

## 6. Intended users and roles

| Role | Role in concept | Status | Clearly defined? | Not established |
|---|---|---:|---|---|
| Primary user | Sets Check-in Time, plan, contacts, and checks in safe. | EXPLICIT | Partly | Whether this is one market segment or many. |
| Beneficiary | Same person appears to benefit from alerts if unable to act. | IMPLIED | Partly | Whether user and beneficiary can differ. |
| Emergency contact / trusted contact | Receives confirmation, then alert if triggered. | EXPLICIT | Partly | Duties, consent quality, liability, escalation expectations. |
| Responder | May be called by contact or may be a venue/reception/emergency service. | IMPLIED | No | No direct responder integration is established. |
| Purchaser / payer | Possibly the user; pricing mentions free and Premium tiers. | IMPLIED | No | Who pays and for what. |
| Operator | SafetyNet / Acorn 360 Ltd appears to operate the service. | IMPLIED | No | Operational model, support, monitoring, incident handling. |

## 7. Proposed user pathway

| Stage | Actor | Action | Required capability | Status | Missing or unclear step |
|---|---|---|---|---:|---|
| Need or concern | User | Wants safety cover for an activity. | Recognise a check-in use case. | IMPLIED | Trigger for habit formation unknown. |
| Discovery | Visitor | Encounters landing page. | Landing page and CTA. | EXPLICIT | Channel source unknown. |
| Sign-up or entry | Visitor | Clicks "Get Early Access" and submits email. | Waitlist form. | EXPLICIT | Demand and conversion unknown. |
| Set-up | User | Adds contact, message, instructions, Check-in Time. | App/web setup flow. | PUBLIC_CLAIM | Actual shipped flow not established. |
| Active use | SafetyNet/user | Server countdown runs; user receives reminders. | Cloud timer and reminder delivery. | PUBLIC_CLAIM | Reliability and edge cases unknown. |
| Trigger | SafetyNet | Missed check-in triggers alert after extra time. | Trigger logic. | PUBLIC_CLAIM | Grace-period logic not specified. |
| Alert transfer | SafetyNet | Sends SMS/email/push with context. | Multi-channel delivery. | PUBLIC_CLAIM | Delivery verification unknown. |
| Contact action | Contact | Calls user, goes to location, calls others/emergency services if needed. | Contact comprehension and willingness. | IMPLIED | No protocol or accountability established. |
| Intended outcome | User/contact | Faster awareness and response. | Alert received and acted on. | PUBLIC_CLAIM | Outcome evidence not established. |

## 8. Value proposition

Primary apparent value proposition: automatic safety alerts when the user cannot text or reach their phone.

Supporting propositions: contacts receive plans, location/context, and instructions; the system runs from the cloud rather than the phone; the user's phone only needs to work at setup and check-in; contacts do not need the app; contacts are not notified unless an alert triggers.

Privacy/trust propositions: zero tracking, no continuous GPS, no background data collection, information private until alert, no data sale, user-selected contacts.

Emotional reassurance propositions: freedom protected, peace of mind, "live your life," reduced ambiguity for contacts.

Differentiation claims: unlike Find My Friends or Life360, SafetyNet says it detects missed check-ins and sends context plus instructions rather than showing only last location.

TENSION: the page combines no-tracking/privacy positioning with location/context availability during alerts. It also combines safety-critical reassurance with limitations that no system is foolproof.

## 9. Product and scope signals

Explicitly described capabilities: set Check-in Time, create SafetyNet, add/select contacts, custom messages/instructions, reminders, extra time, automatic alert, alert cancellation, SMS/email delivery, optional push notification, web/mobile management, early-access form.

Implied capabilities: cloud countdown, contact confirmation, alert templates, stored safety plans, support for multiple activity contexts, contact-side comprehension.

Future or aspirational signals: "launching soon," "will be available on iOS, Android, and web browsers," "will be built with enterprise-grade security and reliability," Premium tier.

Exclusions or non-goals: no continuous location tracking, no background GPS, does not prevent emergencies, not a replacement for backup safety plans or common-sense practices.

Unresolved scope questions: whether location is manually entered or captured; whether contacts can update status; whether emergency services are integrated; whether there is live monitoring; how false alarms, missed alerts, cancellation, and escalation work.

## 10. Trust, safety, privacy, and reliance signals

The page communicates privacy through "zero tracking," no continuous location tracking, no background data collection, no selling data, and sharing only with chosen contacts when an alert triggers. It communicates security through future-oriented claims about encryption, cloud infrastructure, backup systems, and multi-channel alert delivery.

Reliance limits are also stated: SafetyNet requires initial internet connection, relies on contacts receiving SMS or email, cannot prevent emergencies, is not 100% foolproof, and should be an additional layer.

Planning-critical unknowns: what happens if an alert fails; what happens if a false alert is sent; what happens if the contact ignores, misunderstands, or cannot act; whether users may rely on SafetyNet too heavily; how stored plans and locations are protected; whether the service could be mistaken as emergency-service response; whether delivery success is measured.

## 11. Market and distribution signals

The page signals use contexts including solo travel, dating, marketplace sales, hiking, business trips, running new routes, moving to a new city, and social/group travel. Reactions name students, solo travellers, parents, and friends using location sharing.

Distribution signal: early-access waitlist via email form. Pricing signal: early members get first access and lifetime discounts; the FAQ says there will be a forever-free plan and a Premium tier for advanced automation and extended history.

Not established: selected initial segment, demand, willingness to use, willingness to pay, conversion performance, channel viability, geographic scope, or launch sequence.

## 12. Current-state signals

| Claimed asset or state | Status | Landing-page basis |
|---|---:|---|
| Landing page exists | VISIBLE ON PAGE | Full page inspected |
| Early-access form exists | VISIBLE ON PAGE | "Get Early Access" modal |
| Product is launching soon | CLAIMED ON PAGE | FAQ "When will SafetyNet be available?" |
| Success message says "Launching early 2026" | VISIBLE ON PAGE | Registration success state |
| Alert demo exists | VISIBLE ON PAGE | "Safety Alert" modal |
| iOS, Android, and web availability | CLAIMED ON PAGE | FAQ devices |
| Forever-free plan and Premium tier | CLAIMED ON PAGE | FAQ pricing |
| Testimonials / first reactions | CLAIMED ON PAGE | "First reactions before launch" |
| Operational product, app build, testing, uptime controls | NOT ESTABLISHED | Not proven by page |

## 13. Apparent project objectives

Public-facing product objective: help people create timed personal-safety alerts that activate when they cannot check in. Status: IMPLIED.

Intended user outcome: someone knows if something may be wrong and has context for action. Status: EXPLICIT / PUBLIC_CLAIM.

Landing-page conversion objective: collect early-access sign-ups by email. Status: EXPLICIT.

Broader project objective explicitly stated: protect freedom without restricting life. Status: PUBLIC_CLAIM.

## 14. Planning assumptions and unknowns

| ID | Proposition the concept appears to depend on | Status | Landing-page basis | What is not established | Why it matters for planning |
|---|---|---:|---|---|---|
| A1 | Users will set Check-in Times before risk contexts. | IMPLIED | How It Works, examples | Habit formation | Without use, alerts never trigger. |
| A2 | Missed check-in is a useful danger signal. | PUBLIC_CLAIM | FAQ offline/dead battery | False positive/negative rate | Core trigger logic depends on it. |
| A3 | Contacts will accept the role. | PUBLIC_CLAIM | FAQ contact confirmation | Consent depth and burden | Contact action is essential. |
| A4 | Contacts will understand instructions. | PUBLIC_CLAIM | Alert demo | Comprehension under stress | Bad action could reduce value. |
| A5 | Alerts will be delivered reliably. | PUBLIC_CLAIM | Security/reliability FAQ | Measured delivery success | Safety reliance depends on it. |
| A6 | No tracking is compatible with useful intervention. | TENSION | Privacy FAQ; examples with location | How location/context is obtained | Affects product scope and trust. |
| A7 | Early-access users want discounts and first access. | IMPLIED | Why join now; footer | Conversion evidence | Affects launch strategy. |
| A8 | Free plus Premium model is viable. | PUBLIC_CLAIM | Pricing FAQ | Costs and willingness to pay | Affects sustainability. |
| A9 | SafetyNet can avoid false reassurance. | UNKNOWN | Limitations FAQ | User understanding of limits | Safety-critical trust risk. |
| A10 | Multiple use contexts can be served by one product. | IMPLIED | Examples/story | Initial segment choice | Scope may become too broad. |

## 15. Internal tensions and ambiguities

| Tension or ambiguity | Status | Landing-page basis |
|---|---:|---|
| Privacy/no tracking versus sharing location, plans, and activities during alerts. | TENSION | Hero trust row; FAQ privacy; alert demo |
| Cloud reliability and safety reassurance versus "no system is 100% foolproof." | TENSION | FAQ security and limitations |
| Simple "under a minute" setup versus contact confirmation, custom instructions, and reliability needs. | TENSION | How It Works; FAQ contact setup |
| Multiple target contexts with no selected launch market. | TENSION | Examples; reactions; story |
| "Emergency contact" framing versus "not a replacement" limitation. | TENSION | FAQ contact/limitations; alert demo |
| "Launching soon" versus success message "Launching early 2026." | TENSION | FAQ; registration success message |

## 16. Questions the brief creates for planning

Problem and user: Who is the first target user segment? How often does the missed-check-in problem occur? What motivates users to set a SafetyNet before an activity?

Value proposition: Is the lead proposition automatic alerting, privacy, context transfer, or freedom/reassurance? Which proposition converts and which drives retained use?

Product scope and pathway: What exact setup flow is required? How are location and plans captured? How does cancellation work after alert? What counts as a missed check-in?

Safety, trust, and privacy: What reliability standard is required? How are false alarms handled? How are contacts prepared? How is sensitive context protected? How are limits made clear?

Market and distribution: Which acquisition channel is intended? What early-access cohort is being sought? What does "lifetime discounts" mean?

Evidence and validation: What evidence is needed for user demand, contact action, comprehension, reliability, and willingness to pay?

Delivery and operations: Who operates alert infrastructure? What support exists during incidents? What happens during outages, delivery failures, or abuse?

## 17. Fable context handoff

| ID | Landing-page proposition or gap | Source status | Why it matters to later red-team review | Planning area affected |
|---|---|---:|---|---|
| F1 | Missed check-in triggers safety alert. | PUBLIC_CLAIM | Core causal mechanism to challenge. | Product/safety |
| F2 | Contacts know exactly what to do. | PUBLIC_CLAIM | Depends on human behaviour. | User pathway |
| F3 | No tracking while still sharing context/location. | TENSION | Privacy and usefulness may conflict. | Trust/privacy |
| F4 | Works when phone dies or no signal. | PUBLIC_CLAIM | Depends on prior setup and server delivery. | Reliability |
| F5 | Not a replacement for emergency services. | EXPLICIT | Boundary may be misunderstood. | Safety/legal |
| F6 | Multiple broad use cases. | IMPLIED | May diffuse launch focus. | Market |
| F7 | Free and Premium tiers. | PUBLIC_CLAIM | Sustainability not established. | Commercial |
| F8 | Early reactions before launch. | PUBLIC_CLAIM | Not demand evidence. | Validation |

## 18. Source traceability

| Brief area | Landing-page location |
|---|---|
| Core proposition | Hero: "Text me when you're safe..."; hero live card |
| Mental model | "How SafetyNet protects you" section |
| User pathway | "How It Works / Create your SafetyNet in under a minute" |
| Use contexts | "Examples / Live your life" |
| Differentiation | "Why SafetyNet / Location sharing apps aren't safety apps"; FAQ Life360 |
| Background rationale | Founder Story; "Why did you start SafetyNet?" FAQ |
| Privacy and tracking | Hero trust row; FAQ Privacy & Security |
| Reliability and limitations | FAQ "security and reliability"; FAQ "limitations" |
| Contact role | FAQ "What does my emergency contact need to do?" |
| Devices | FAQ "What devices does SafetyNet work on?" |
| Pricing and launch | "Why join now?"; FAQ Launch & Pricing; registration modal |
| Conversion mechanism | "Get Early Access" buttons and registration modal |
| Current-state signals | Alert demo modal; footer; registration success state |

## 19. Bottom line

The landing page clearly establishes that SafetyNet publicly presents itself as an early-access personal-safety service built around timed check-ins, automatic alerts, trusted contacts, and shared context/instructions.

It only implies or claims that the system is available, reliable, secure, commercially viable, behaviorally effective, and able to improve safety outcomes.

The three most material matters not established are: alert reliability in real-world conditions; whether trusted contacts will understand and act appropriately; and which initial user segment and use case SafetyNet is actually prioritising.

Status: READY WITH SOURCE LIMITATIONS

## Quality-gate table

| Gate | Result | Basis |
|---|---:|---|
| Sole-source compliance | Pass | Brief uses only landing-page content and page-surface modals/fragments. |
| Full-page access | Pass | Full local landing-page source was accessible. |
| Source fidelity | Pass | Explicit, implied, public claim, unknown, and tension are separated. |
| No gap filling | Pass | Missing planning information is marked as unknown/not established. |
| Traceability | Pass | Material statements map to landing-page sections or UI elements. |
| Neutrality | Pass | Promotional copy is converted into neutral planning language. |
| Capability discipline | Pass | Intended, claimed, visible, and not-established states are separated. |
| Safety boundary | Pass | Emergency, privacy, reliance, and contact-action limits are not overstated. |
| Planning usefulness | Pass | Key assumptions, gaps, tensions, and questions are exposed. |
| Scope control | Pass | This is not a business plan, product specification, market assessment, or red-team report. |

Final status: READY WITH SOURCE LIMITATIONS

Limitation: this brief is based on the local landing-page source and landing-page UI surfaces available in the workspace, not an independently verified live deployed webpage.
