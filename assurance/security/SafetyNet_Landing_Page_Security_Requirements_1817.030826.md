# SafetyNet Landing Page Security Requirements

## Document status

| Field | Value |
|---|---|
| Artefact | Security requirements and assurance baseline |
| System | SafetyNet landing page, signup and transactional welcome-email pathway |
| Date | 3 August 2026 |
| Overall security status | **Not fully assessed** |
| Status basis | Lighthouse confirms limited browser-facing controls only; the Worker, Turnstile server validation, rate limiting, secrets, Supabase permissions, database webhook, `send-welcome-email` Edge Function, Resend integration, dependency risk, logging and production abuse controls remain unverified |


## Index

| Section                   | Title                               | Purpose                                                                                           |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| Document status           | Current assessment position         | Records system scope, date, security status and evidence limitations.                             |
| C.1                       | Objective                           | Defines the security objective and full pathway boundary.                                         |
| C.2                       | Standard and assurance level        | Establishes the applicable OWASP baseline and assurance level.                                    |
| C.2.1                     | Scope, testing and control reliance | Allocates responsibilities across SafetyNet-owned and managed-platform components.                |
| C.X                       | Security assurance hierarchy        | Separates scope, standard, testing, evidence and residual-risk acceptance.                        |
| C.3                       | Minimum viable requirements         | Sets out controls C1–C17, acceptance tests and launch gates.                                      |
| C.4                       | Quality gate                        | Defines pass conditions, gate levels and minimum launch blockers.                                 |
| C.5                       | Tools and required evidence         | Identifies the required testing tools and evidence sources.                                       |
| C.6                       | Current evidence                    | Records established, unverified and not-assessed controls.                                        |
| C.7                       | Evidence sources                    | Lists project evidence and authoritative security guidance.                                       |
| Audit trail — 1809.020826 | Proportionality patch               | Records the risk-, ownership- and reliance-based assurance correction.                            |
| Audit trail — 1817.030826 | Resend architecture scope patch     | Records extension of the security boundary through the webhook, Edge Function and Resend pathway. |
| Takeaways                 | Current assurance conclusion        | Summarises the governing security position and principal unverified risks.                        |
| Next steps                | Required assurance work             | Identifies the evidence and testing required before launch reliance.                              |
| Metadata                  | Governance and control record       | Records identity, location, assurance basis, lifecycle state and review triggers.                 |




## C.1 Objective

Ensure the SafetyNet landing page, signup pathway and transactional welcome-email pathway:

- Protect information in transit and at rest.
- Resist common web attacks, automated abuse and configuration failures.
- Expose no credentials or unnecessary personal information.
- Limit third-party and software-supply-chain risk.
- Fail safely and produce sufficient evidence for detection and remediation.

Security scope must cover the complete pathway:

`Browser → Cloudflare → landing page → Turnstile → Cloudflare Worker → Supabase waitlist → Supabase database webhook → send-welcome-email Edge Function → Resend API → recipient mailbox`

Assessing only the static page would not establish that signup data is secure. Security scope includes both signup collection and the automated welcome-email pathway. A successful database insert does not establish that the webhook, Edge Function or Resend delivery path operated securely or successfully.

## C.2 Standard and assurance level

Use the following hierarchy:

1. **Primary requirements standard:** OWASP ASVS 5.0.
2. **Minimum level:** ASVS Level 1 for the static public page.
3. **Targeted higher level:** Applicable ASVS Level 2 controls for the Worker, signup endpoint, Supabase database and webhook configuration, `send-welcome-email` Edge Function, secrets and external email-delivery integration because email addresses are personal data and are transferred to an external processor.
4. **Risk coverage:** OWASP Top 10:2025.
5. **Testing method:** OWASP Web Security Testing Guide.

The [OWASP Top 10:2025](https://owasp.org/Top10/2025/) is a risk-awareness document, not a complete pass/fail checklist. [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) provides testable requirements.

> **Note — OWASP Top 10 relevance**
>
> * `OWASP Top 10:2025` is the current released edition as at 3 August 2026.
> * Fundamental security harms remain broadly stable; technology changes the threats, vulnerabilities, exposure, likelihood and impact through which they arise.
> * For the nature and limited scope of this pathway, the current OWASP Top 10 is considered a reasonable and sufficient risk reference.
> * OWASP ASVS 5.0 remains the primary source of testable security requirements.
> * Review the cited Top 10 edition when OWASP publishes a successor.



### C.2.1 Scope, testing and control reliance

Security scope covers the full signup pathway:

`Browser → Cloudflare → landing page → Turnstile → Cloudflare Worker → Supabase waitlist → Supabase database webhook → send-welcome-email Edge Function → Resend API → recipient mailbox`

This does **not** mean every layer must be independently security-tested by the project.

The purpose of full-pathway scope is to identify every layer that could affect signup confidentiality, integrity, availability, abuse resistance or evidence quality.

Testing depth is determined by ownership, configurability, risk and available evidence.

| Layer | SafetyNet responsibility | Minimum assurance approach |
|---|---|---|
| Browser / landing page | Page code, scripts, form behaviour, CSP/header compatibility and no exposed secrets. | Direct inspection and observable tests. |
| Cloudflare edge controls | Correct configuration for TLS, HSTS, WAF/rate limits, challenge behaviour, routing and headers. | Verify configuration and observable behaviour; rely on Cloudflare platform controls where enabled and suitable. |
| Turnstile | Correct client integration and mandatory server-side token validation. | Verify Siteverify integration, expected hostname/action where applicable, expiry/failure handling and no bypass. |
| Cloudflare Worker | SafetyNet-owned endpoint logic, validation, CORS, errors, secrets and rate-limit integration. | Direct code/config review and controlled endpoint tests. |
| Supabase | Project permissions, keys, RLS/access model, data minimisation, retention and logging. | Verify project configuration and integration behaviour; rely on Supabase platform controls where correctly configured. |
| Supabase database webhook | Correct trigger table/event, destination, invocation configuration, failure behaviour and access restrictions. | Review dashboard configuration and controlled behaviour; retain screenshots or exported evidence because the configuration is not held in the repository. |
| `send-welcome-email` Edge Function | SafetyNet-owned payload parsing, email validation, secret use, request construction, error handling, logging and deployment configuration. | Direct source/configuration review and controlled tests. Treat the function as SafetyNet-owned code even though its source is stored in Supabase rather than GitHub. |
| Resend | SafetyNet-controlled account configuration, verified sender/domain, API-key permissions, data transfer, logs, retention and delivery evidence relevant to the pathway. | Verify SafetyNet-controlled account and integration configuration; rely on Resend platform controls only where documentation, applicability and retained configuration evidence support reliance. |
| Vendor/platform internals | Not owned by SafetyNet. | Do not retest platform internals; record reliance basis and exceptions. |

Reliance on a platform control is acceptable only where:

1. the control is provided by the platform or vendor;
2. the relevant feature is enabled or applies by default to this pathway;
3. SafetyNet has not bypassed or weakened it through custom code or configuration;
4. evidence is retained, such as dashboard screenshots, exported settings, documentation link, command output or observed behaviour; and
5. any residual risk is documented if the control is material to launch reliance.

A missing test is not automatically a failure where a managed control can be evidenced. A missing evidence basis is **Not established**.

## C.X Security assurance hierarchy

Security assurance for the SafetyNet landing-page signup and welcome-email pathway is organised through four separate concepts: **scope**, **standard**, **testing**, and **evidence**.

| Concept  | Meaning                                                                            | SafetyNet application                                                                                                                                      |
| -------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope    | The full risk boundary that could affect signup security.                          | `Browser → Cloudflare → landing page → Turnstile → Cloudflare Worker → Supabase waitlist → Supabase database webhook → send-welcome-email Edge Function → Resend API → recipient mailbox`                                                                           |
| Standard | The control baseline used to decide what security requirements matter.             | OWASP ASVS 5.0 applicable controls, applied proportionately to the landing page and signup pathway.                                                        |
| Testing  | The procedures used to check whether applicable controls work.                     | Minimum viable tests, OWASP WSTG-informed where useful, limited by ownership, risk, and side effects.                                                      |
| Evidence | The proof retained to support reliance, pass/fail, or not-established conclusions. | Direct test output, code/config review, platform configuration evidence, logs, dashboard evidence, scanner output, or documented residual-risk acceptance. |

Security requirements are ASVS-led, but security assurance for this landing-page signup and welcome-email pathway is based on the following hierarchy:

1. **SafetyNet-specific risk scope and launch decision criteria.**
   The first control is the project-specific risk boundary and launch decision. The full signup pathway is in scope because each layer could affect confidentiality, integrity, availability, abuse resistance, signup reliability, or evidence quality.

2. **OWASP ASVS 5.0 applicable controls as the primary control baseline.**
   ASVS is used to identify the relevant security controls. It is not applied wholesale. Controls are included only where applicable to the SafetyNet landing page, signup endpoint, Turnstile integration, Cloudflare configuration, Worker logic, Supabase data path and webhook configuration, Edge Function execution, outbound API calls, Resend account and sender configuration, email-message construction, external disclosure of signup email addresses, delivery logging and failure handling, secrets, dependencies, and change control.

3. **OWASP WSTG and minimum viable test procedures as test-method guidance.**
   Testing is used to verify the applicable controls. Testing depth is proportionate to ownership, configurability, risk, and side effects. SafetyNet-owned code and configuration are tested directly. Vendor/platform internals are not independently retested unless SafetyNet configuration or integration creates a specific pathway risk.

4. **Cloudflare, Turnstile, Supabase and Resend documentation/configuration evidence for managed platform controls.**
   Managed controls may be relied on where the control is provided by the platform, applies to the SafetyNet pathway, is not bypassed or weakened by SafetyNet configuration, and supporting evidence is retained. Platform reliance does not cover SafetyNet-controlled integration code, webhook configuration, secrets, sender identity, payload composition, account permissions or logging settings.

5. **Direct evidence from SafetyNet-owned code, deployed headers, endpoint behaviour, dependency scans, secret scans, logs and manual account review.**
   SafetyNet-owned implementation and configuration require direct evidence. Acceptable evidence includes source review, deployed header output, TLS/header checks, endpoint negative tests, dependency triage, secret scans, log samples, dashboard screenshots, exported settings, or controlled manual review.

6. **Documented residual-risk acceptance where a requirement is not fully tested but platform reliance or low materiality supports proceeding.**
   A requirement is not passed merely because a platform exists. It is passed only where the applicable control is directly tested, evidenced through configuration, supported by documented platform reliance, or accepted as a residual risk with rationale, owner, and review date.

OWASP ASVS 5.0 is therefore the primary security control baseline. It is not the whole security assurance model. The full assurance model is:

`SafetyNet risk scope → ASVS applicable controls → proportionate testing → platform reliance evidence → direct implementation evidence → launch decision / residual-risk acceptance`


## C.3 Minimum viable requirements

| ID | Requirement | Minimum acceptance test | Gate |
|---:|---|---|---|
| C1 | **Security boundary** | Architecture identifies every system receiving, processing, transmitting, logging or storing signup information, including the Supabase webhook, Edge Function, Resend API and relevant delivery logs. Trust boundaries, data fields and responsible owners are recorded. | Required |
| C2 | **HTTPS and TLS** | All page, asset, API, webhook and Edge Function-to-Resend traffic uses authenticated HTTPS; HTTP redirects to HTTPS; no mixed content; valid certificate chain; TLS 1.2/1.3 only; SSL Labs grade **A or better** for the public endpoint. | Launch blocker |
| C3 | **HSTS** | HSTS is enabled with a staged, tested `max-age`. Target ≥31,536,000 seconds. `includeSubDomains` is added only after confirming every subdomain supports HTTPS. Preloading is optional, not an automatic launch requirement. | Required |
| C4 | **Content Security Policy** | CSP is used to reduce browser-side injection, clickjacking, unexpected third-party loading and unauthorised data destinations on the landing page and signup flow. The policy is based on the actual resource inventory. Minimum evidence includes current CSP/header output; an approved source list; confirmation that signup, Turnstile and approved analytics still work; no `unsafe-eval`; no unnecessary third-party scripts; `object-src 'none'`; `base-uri 'self'`; and clickjacking protection through `frame-ancestors`. Inline scripts are removed, nonce/hash-protected, or documented as a temporary accepted risk if no user-controlled input can reach script execution. | Launch blocker only if absent, materially overbroad, unsafe for script execution/framing/data destinations, or breaking required functionality. Otherwise Required / Hardening. |
| C5 | **Browser security headers** | `X-Content-Type-Options: nosniff`; appropriate `Referrer-Policy`; restrictive `Permissions-Policy`; clickjacking protection through CSP `frame-ancestors`; COOP enabled unless a tested integration requires an exception. | Required |
| C6 | **Input handling** | Email and campaign parameters are validated server-side for type, length and permitted format. Unexpected fields are rejected or ignored. Database operations cannot be manipulated through user input. The Edge Function independently validates the webhook payload and email field before making the Resend request and does not trust the payload solely because it originated from Supabase. Client-side validation alone is insufficient. | Launch blocker |
| C7 | **Signup endpoint controls** | Endpoint accepts only required methods and content types; body size is limited; malformed requests fail safely; CORS is restricted to approved origins; duplicate and replay behaviour is controlled. Controls on the public signup endpoint do not replace controls on the webhook-triggered email path. | Launch blocker |
| C8 | **Automated-abuse protection** | Rate limiting exists independently of the browser. Turnstile tokens are verified by the Worker using Siteverify, checked for expected hostname/action, and cannot be reused. Failure, expiry and timeout paths deny submission safely. | Launch blocker |
| C9 | **Data protection** | Only necessary signup data is collected and transferred. Supabase access follows least privilege. The Edge Function sends Resend only the fields required to deliver the welcome email. Administrative/service credentials, Turnstile data, internal database metadata and unnecessary webhook content are not included. Retention and deletion requirements cover Supabase, Edge Function logs and Resend-held data. Logs do not contain secrets or unnecessary raw personal data. | Launch blocker |
| C10 | **Secrets management** | No production secrets exist in HTML, JavaScript, repository files, build output or Git history. Secrets are stored in the relevant hosting platform’s protected secret store. `RESEND_API_KEY` is stored only in the protected Supabase secret store, is absent from client-visible code and repository files, is not emitted in logs or errors, and can be rotated or revoked. Secret scanning and push protection are enabled where available. | Launch blocker |
| C11 | **Dependency security** | Dependencies and lockfiles are inventoried and scanned. Findings are triaged by deployed-path relevance, including the production dependency tree, deployed bundle, Worker runtime, Edge Function runtime/imports, email templating or HTML-generation dependencies if used, and build/deploy path. A critical/high finding is launch-blocking only where vulnerable code is reachable or plausibly triggerable; exposure affects signup, data, secrets, page integrity, email-path integrity or deployment integrity; and no mitigation or documented non-reachability rationale exists. Development-only findings are recorded and remediated before reliance where they can affect build integrity, secrets, deployment output or supply-chain control. | Launch blocker for unmitigated critical/high findings affecting the deployed path. Otherwise Required with documented triage. |
| C12 | **Third-party controls** | Every external script, iframe, font, analytics service, challenge service and external processor has a documented purpose, owner and data exposure. Resend evidence identifies its transactional-email purpose, data disclosed, account owner, sender/domain, applicable privacy/contractual reliance and configurable retention/logging settings. Unnecessary services are removed; necessary services load or receive data only when needed where practicable. | Required |
| C13 | **Error handling** | User responses do not disclose stack traces, internal endpoints, database details, credentials or security decisions. Worker, database, webhook, Edge Function and Resend failures produce controlled outcomes and sufficient internal diagnostic evidence without exposing secrets or unnecessary personal data. A stored signup is not represented as proof that welcome-email delivery succeeded. | Launch blocker |
| C14 | **Logging and monitoring** | The signup and welcome-email pathway produces enough evidence to detect broken signup, obvious abuse, Turnstile validation failures, rate-limit activity, Worker/backend errors, webhook invocation failures, Edge Function failures and Resend API rejection. Minimum evidence includes Worker or equivalent platform error logs; successful submission count; failed Turnstile-validation evidence where available; rate-limit/challenge evidence where configured; webhook and Edge Function success/failure evidence; Resend API acceptance/rejection evidence; delivery/bounce evidence where available and proportionate; and a lightweight review process capable of reconciling waitlist inserts, webhook invocations, email API outcomes and material failures. Logs do not expose secrets or unnecessary raw email addresses. Alerting may be manual or low-frequency while traffic is low, with clear triggers for urgent review. | Required. Launch blocker only if failures are invisible, signup success cannot be confirmed, required welcome-email failures cannot be distinguished from successful processing, logs expose secrets/personal data, or abuse/security-control failures cannot be distinguished from normal traffic. |
| C15 | **Minimum security testing** | Testing is limited to the SafetyNet-owned landing page and full signup/email pathway, plus reliance evidence for managed platform controls. Required evidence includes deployed HTTPS/TLS check; deployed headers/CSP check; source/build review for exposed secrets; dependency scan with deployed-path triage; Worker/signup negative tests for malformed input, direct endpoint calls, Turnstile failure, duplicate/replay and excessive requests; confirmation that Supabase credentials and permissions are not exposed to the browser; review of webhook configuration and Edge Function source/deployment settings; malformed, missing and invalid webhook-payload tests; direct or unauthorised function-invocation tests where applicable; confirmation that arbitrary recipients or content cannot be injected; controlled duplicate-invocation and provider-failure tests; confirmation that the Resend payload is minimal and logs do not expose secrets; and sender/domain configuration evidence. Passive DAST may be used if safely scoped and low side-effect. Active vulnerability testing is not required for MVP launch unless performed against an authorised preview/staging environment. Production email testing must not send unintended messages or damage sender reputation. | Launch blocker only where a required minimum test fails, a critical/high deployed-path issue is unresolved, secrets are exposed, Turnstile/server validation is bypassable, the signup endpoint cannot be safely verified, or the webhook/Edge Function can be abused to send unauthorised email. |
| C16 | **Change control** | Security-impacting changes to Cloudflare, Worker, dependencies, headers, CSP, Supabase permissions, database webhook configuration, Edge Function source/configuration, `RESEND_API_KEY`, Resend account, sender/domain or email template require proportionate regression testing. Results are retained with date, environment and tool version. | Required |
| C17 | **Transactional email pathway** | Confirm that a valid waitlist insert triggers only the intended webhook and Edge Function; the function accepts only the expected event and payload; validates the recipient email; sends only approved content and minimum data to Resend; uses an authorised sender/domain; handles provider rejection, timeout and duplicate invocation safely; and retains evidence linking the database insert to the email API outcome without exposing secrets or unnecessary personal data. | Required. Launch blocker where the function can be invoked or manipulated to send unauthorised email, secrets are exposed, arbitrary recipients/content can be supplied, or failures materially undermine the signup pathway without detection. |

Cloudflare states that [server-side Turnstile validation is mandatory](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/); the client widget alone does not protect the form.

Recommended header values should be derived from the site’s actual resource inventory, rather than copied blindly. The [OWASP HTTP Headers guidance](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) provides the baseline.

## C.4 Quality gate

The landing-page and welcome-email pathway passes only when the full architecture through Resend has been considered and each control has either direct test evidence, configuration evidence, or a documented platform-reliance basis.

### Gate definitions

| Gate | Meaning | Launch effect |
|---|---|---|
| Launch blocker | Must pass before relying on public signup collection and required welcome-email processing. Failure creates material risk to user data, endpoint or email-path integrity, secrets, abuse resistance, production configuration, or evidence of signup and email-processing outcomes. | Do not rely on public signup or required welcome-email processing until fixed, mitigated, or explicitly de-scoped. |
| Required | Must be addressed or evidenced, but may proceed with documented rationale if risk is low, platform reliance is sufficient, or the item is not material to the immediate signup pathway. | May proceed only with owner, rationale and review trigger. |
| Hardening | Valuable improvement but not required for MVP landing-page launch unless risk changes. | Track separately; do not block MVP solely on this item. |

### Minimum launch blockers

The following conditions block reliance on public signup collection and required welcome-email processing:

1. HTTPS/TLS failure affecting the page, assets, form, Worker, webhook, Edge Function or Edge Function-to-Resend API calls.
2. Production secret, including `RESEND_API_KEY`, is exposed in browser code, repository files, build output, logs or client-visible responses.
3. Signup endpoint accepts unsafe input or permits direct bypass of required controls.
4. Turnstile server-side validation is absent, bypassable, not checked for expected hostname/action where applicable, or fail-open.
5. No effective rate-limit or abuse control exists for the signup endpoint, unless a Cloudflare/platform control is evidenced as applying to the pathway.
6. Supabase/admin/service credentials are exposed, permissions allow unauthorised read/write beyond the intended signup and email path, or webhook/function configuration is accessible beyond intended administration.
7. The webhook or Edge Function can be abused to send email to arbitrary recipients, inject unauthorised content, or invoke Resend outside the intended waitlist-insert pathway.
8. The Resend integration exposes signup email addresses, secrets or internal payload data beyond what is necessary for delivery.
9. Unmitigated critical/high dependency vulnerability affects the deployed path.
10. User-facing or backend errors expose internals, credentials, database details or security decisions.
11. A security control breaks the signup path and prevents valid signups from being recorded.
12. Required welcome-email failures are invisible or cannot be distinguished from successful signup processing.
13. Production configuration materially differs from the tested configuration with no reliance evidence.

Medium findings may be accepted only with documented owner, rationale, compensating control where applicable and review date.

A scan finding without deployed-path relevance is not automatically launch-blocking. A platform control does not need to be retested internally where its configuration, applicability and reliance basis are evidenced.

## C.5 Tools and required evidence

| Area | Primary tool or evidence |
|---|---|
| Requirements | OWASP ASVS 5.0 control matrix |
| Threat coverage | OWASP Top 10:2025 |
| Test cases | OWASP Web Security Testing Guide |
| TLS | [Qualys SSL Labs](https://www.ssllabs.com/ssltest/) |
| Headers | OWASP Secure Headers, Mozilla Observatory, SecurityHeaders.com and direct `curl` evidence |
| CSP | Browser console, CSP reporting and Lighthouse diagnostics |
| Dependencies | Dependabot, dependency review and package-manager audit |
| Secrets | GitHub secret scanning plus TruffleHog or Gitleaks |
| Static analysis | CodeQL or equivalent targeted rules |
| Passive DAST | [OWASP ZAP Baseline](https://www.zaproxy.org/docs/docker/baseline-scan/) |
| Active DAST | ZAP against an authorized non-production environment |
| Abuse controls | Turnstile test keys, endpoint tests and rate-limit tests |
| Backend/data | Worker configuration, Supabase permissions/RLS, database webhook configuration, Edge Function source/deployment evidence and controlled integration tests |
| Transactional email | Supabase webhook configuration, Edge Function source and logs, Supabase secret evidence, Resend account/API-key settings, sender/domain verification evidence, controlled delivery results and failure-path evidence |

ZAP Baseline spiders and passively scans without performing active attacks, but its scope and form behaviour should still be controlled.

## C.6 Current evidence

The supplied [desktop Lighthouse report](project_sources/01-safetynetbeta.com-20260801T101639_Desk-top_1021.010826.json) and [mobile Lighthouse report](project_sources/02-safetynetbeta.com-20260801T102227_mobile_1023.010826.json) show:

- **Pass:** HTTPS resources.
- **Action required:** CSP permits `unsafe-inline` scripts and relies on source allowlists.
- **Action required:** COOP is absent.
- **Hardening candidate:** Trusted Types is absent.
- **Review required:** HSTS lacks `preload`; this should not be enabled until subdomain readiness is verified.
- **Review required:** Four third-party cookies originate through Turnstile. This is principally a privacy/compatibility finding, not proof of an exploitable vulnerability.
- **Not established:** Clickjacking protection—the Lighthouse audit being “not applicable” is not affirmative evidence.
- **Not assessed:** Worker validation, rate limiting, secrets, Supabase permissions, database webhook configuration, Edge Function security, `RESEND_API_KEY` protection, Resend sender/account configuration, email-data minimisation, email-path logging, failure handling, dependency risk and production abuse controls.

The supplied [remediation results](project_sources/04-Codex_Lighthouse_Remediation_Results_1250.010826.txt) explicitly record security, privacy, dependency-security and abuse assessments as outside the completed remediation. They also record eleven pre-existing npm audit findings without establishing whether any affect the deployed path.

The [SafetyNet Project README](safetynet-README_1827.020826.md) establishes that the current signup architecture includes a Supabase database webhook, `send-welcome-email` Edge Function and Resend API. It does not independently establish that those components are securely configured, tested, monitored or reliable.

Therefore, the present evidence does **not** support a security pass. The appropriate status is **Not fully assessed**.

## C.7 Evidence sources

### Project evidence

1. [SafetyNet Landing-Page Remediation Plan](project_sources/03-PLAN.md)
2. [Desktop Lighthouse report](project_sources/01-safetynetbeta.com-20260801T101639_Desk-top_1021.010826.json)
3. [Mobile Lighthouse report](project_sources/02-safetynetbeta.com-20260801T102227_mobile_1023.010826.json)
4. [Codex Lighthouse Remediation Results](project_sources/04-Codex_Lighthouse_Remediation_Results_1250.010826.txt)
5. [SafetyNet Project README](safetynet-README_1827.020826.md) — current architecture source for the Supabase webhook, Edge Function and Resend email path.

### Authoritative standards and guidance

1. [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
2. [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
3. [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
4. [OWASP HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
5. [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
6. [OWASP ZAP Baseline Scan](https://www.zaproxy.org/docs/docker/baseline-scan/)

## Audit trail — proportionality patch 1809.020826

| Field | Value |
|---|---|
| Patch timestamp | 2026-08-02 18:09 Asia/Ho_Chi_Minh |
| Source file | `/mnt/data/SafetyNet_Landing_Page_Security_Requirements_010826.md` |
| Output file | `/mnt/data/SafetyNet_Landing_Page_Security_Requirements_PATCHED_1809.020826.md` |
| Patch type | Additive/refining copy; original source file preserved unchanged. |
| Governing correction | Full pathway is the risk scope. Testing depth is risk-based, ownership-based and reliance-based. |
| Standard applied | `STD_Fit-for-Purpose_OpenAI-Equivalent_UNREVIEWED_1951.050726.md` proportionality, operational viability, failure handling and uncertainty controls. |
| Live security testing | Not performed. |
| Platform access | No Cloudflare, Supabase, GitHub or production configuration access used. |
| Configuration changes | None. |
| Security status after patch | **Not fully assessed** remains unchanged. |

### Change log

| Area | Change | Rationale |
|---|---|---|



## Audit trail — Resend architecture scope patch 1817.030826

| Field | Value |
|---|---|
| Patch timestamp | 2026-08-03 18:17 Asia/Ho_Chi_Minh |
| Source file | `/mnt/data/SafetyNet_Landing_Page_Security_Requirements_PATCHED_1809.020826(2).md` |
| Architecture source | `/mnt/data/safetynet-README_1827.020826.md` |
| Output file | `/mnt/data/SafetyNet_Landing_Page_Security_Requirements_PATCHED_1817.030826.md` |
| Patch type | Additive/refining copy; source files preserved unchanged. |
| Governing correction | Security scope extended from Supabase through the database webhook, SafetyNet-owned Edge Function, Resend API and recipient-mailbox boundary. |
| Standard applied | `STD_Fit-for-Purpose_OpenAI-Equivalent_UNREVIEWED_1951.050726.md` completeness, accuracy, operational viability, failure handling, coherence, proportionality and regression controls. |
| Live security testing | Not performed. |
| Platform access | No Cloudflare, Supabase, Resend, GitHub or production configuration access used. |
| Configuration changes | None. |
| Security status after patch | **Not fully assessed** remains unchanged. |

### Change log — 1817.030826

| Area | Change | Rationale |
|---|---|---|
| Scope | Extended the pathway through the Supabase webhook, Edge Function, Resend API and recipient-mailbox boundary. | README 1827 establishes that signup processing continues beyond Supabase storage. |
| Ownership and reliance | Separated SafetyNet-controlled webhook, Edge Function, secrets, sender and account settings from managed-platform internals. | Platform existence is not evidence that SafetyNet-controlled integration is secure. |
| Requirements | Extended C1–C16 where consequential and added C17 for the transactional email pathway. | The email path introduces a distinct processor, secret, execution path, data disclosure and abuse/failure surface. |
| Evidence and launch gate | Added webhook, Edge Function and Resend evidence, tests, monitoring and blockers. | Signup-recording success must not be conflated with secure or successful email processing. |
| Governance | Updated current evidence, sources, conclusions, next steps and metadata. | Maintain consistency with the expanded security boundary. |

## Takeaways

The minimum credible standard is ASVS-based verification across the signup pathway, applied proportionately by ownership, configurability, risk and reliance evidence—not a good Lighthouse or SecurityHeaders score alone.

The largest unverified SafetyNet-owned or configured risks remain behind the landing page: Worker controls, Turnstile server validation, rate limiting, secrets, Supabase permissions, database webhook configuration, Edge Function logic, Resend integration and end-to-end failure visibility. Cloudflare, Supabase and Resend platform internals may be reliance points; SafetyNet-controlled integration and account configuration still require direct evidence.

## Next steps

1. Map every requirement to direct test evidence, configuration evidence or platform-reliance evidence.
2. Verify the database webhook, Edge Function, Supabase secret handling and Resend configuration, then reconcile a controlled waitlist insert with the resulting email API and delivery evidence.
3. Run the minimum viable security test set before relying on public signup collection.
4. Keep the status as **Not fully assessed** until the evidence exists.



<metadata>

― Reference ―
ID:         SN-SEC-REQ-001
Title:      SafetyNet Landing Page Security Requirements
Artifact:   Security requirements / assurance baseline
Definition: Proportionate security requirements for the SafetyNet landing page, early-access signup pathway and transactional welcome-email pathway, covering scope, standard, testing, evidence, external processing, platform reliance, launch blockers, and residual-risk handling.
Level:      L1
Preparer:   OpenAI AI Audit
Confidence: High for requirements framing, architecture-source alignment and proportionality; low for implemented security status because live configuration, Worker behaviour, Supabase permissions, database webhook, Edge Function behaviour, `RESEND_API_KEY`, Resend account/sender settings, rate limiting, logging, delivery failure handling and production abuse controls remain unverified.
Timestamp:  v1.0001.03/08/26 18:17 ICT

― Location ―
Current Filepath: /mnt/data/SafetyNet_Landing_Page_Security_Requirements_PATCHED_1817.030826.md
Source Filepath:  /mnt/data/SafetyNet_Landing_Page_Security_Requirements_PATCHED_1809.020826(2).md
Target Placement: SafetyNet project security / assurance folder, alongside executable test evidence and launch-decision records
System Under Assessment: SafetyNet landing page, signup and transactional welcome-email pathway
Security Pathway: Browser → Cloudflare → landing page → Turnstile → Cloudflare Worker → Supabase waitlist → Supabase database webhook → send-welcome-email Edge Function → Resend API → recipient mailbox
Public URL: https://safetynetbeta.com

― Governance ―
Primary Control Baseline: OWASP ASVS 5.0 applicable controls
Risk Framing: OWASP Top 10:2025
Testing Guidance: OWASP WSTG-informed minimum viable tests
Platform Reliance: Cloudflare, Turnstile, Supabase and Resend documentation/configuration evidence where applicable; direct evidence required for SafetyNet-controlled code, secrets, webhook, sender and account configuration
Assessment Standard: Fit-for-Purpose OpenAI-Equivalent Standard — 1951.050726
Assurance Rule: Full-pathway scope; testing depth determined by ownership, configurability, material risk, side effects, and available reliance evidence
Lifecycle State: Candidate security baseline / not yet security-assessed
Security Status: Not fully assessed
Launch Reliance Status: Do not rely on public signup collection or required welcome-email processing until launch-blocking controls have direct test evidence, configuration evidence, or documented platform-reliance evidence.

― Audit ―
Patch Timestamp: 2026-08-03 18:17 Asia/Ho_Chi_Minh
Metadata Timestamp: 2026-08-03 18:17 Asia/Ho_Chi_Minh
Patch Type: Additive/refining copy; original source preserved unchanged
Live Security Testing: Not performed
Platform Access: No Cloudflare, Supabase, Resend, GitHub, or production configuration access used
Configuration Changes: None
Primary Change Basis: Extended the full-pathway risk scope through the Supabase webhook, SafetyNet-owned Edge Function and Resend integration while preserving risk-based, ownership-based and reliance-based testing
Review Trigger: Update this metadata when requirements, pathway scope, Cloudflare/Supabase/Resend configuration, Worker or Edge Function logic, webhook settings, `RESEND_API_KEY`, sender/domain, email payload/template, delivery monitoring, signup endpoint behaviour, evidence status, launch gate, or governing standards change.

</metadata>
