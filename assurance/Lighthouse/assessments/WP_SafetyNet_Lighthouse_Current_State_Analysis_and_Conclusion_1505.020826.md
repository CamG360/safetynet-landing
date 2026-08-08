# SafetyNet Lighthouse Current-State Analysis and Conclusion — 1505.020826

## Document control

| Field | Value |
|---|---|
| System | SafetyNet beta landing page |
| URL assessed | `https://safetynetbeta.com/` |
| Deliverable assessed | Current Lighthouse-assessed production state and the decision whether further Lighthouse remediation is justified |
| Assessment basis | Post-remediation production Lighthouse reports retained for Mobile and Desktop |
| Measurement date | 1 August 2026 |
| Conclusion date | 2 August 2026 |
| Lighthouse version | 13.3.0 |
| Fit-for-purpose method | `STD_Fit-for-Purpose_OpenAI-Equivalent_UNREVIEWED_1951.050726.md` — MVO / pending Lab validation |
| Assessment depth | Standard, with evidence traceability treated deeply |
| Verdict | **Fit for purpose within the stated Lighthouse-only scope, subject to the conditions in Section 11** |

## 1. Objective and scope

### 1.1 Objective

Determine and document whether the current production landing page requires further Lighthouse remediation against the applicable Lighthouse requirements.

The analysis must allow a later reviewer to understand the evidence, reproduce the calculations, distinguish measured results from judgment, and understand why the remediation cycle was closed.

### 1.2 In scope

- Current production state measured by the two post-remediation Lighthouse reports.
- Performance, Accessibility, Best Practices and SEO categories selected in those reports.
- The stated performance, accessibility and SEO acceptance criteria.
- The proportionality of further Lighthouse remediation.
- Reperformance from the retained reports and later remeasurement.

### 1.3 Out of scope

- Pre-remediation results or the magnitude of remediation improvement.
- Full WCAG conformance.
- Functional or visual regression testing.
- Agentic Browsing, which was not selected in the retained reports.
- End-to-end security of `Browser → Cloudflare → landing page → Turnstile → Cloudflare Worker → Supabase`.
- Worker validation, Turnstile server-side enforcement, rate limiting, secrets, Supabase permissions, logging, dependency risk and controlled negative endpoint tests.

These matters require their own evidence and specialist assessment method. They cannot be inferred from Lighthouse scores.

## 2. Fit-for-purpose assessment contract

| Contract field | Established answer |
|---|---|
| Objective | Determine and document whether further Lighthouse remediation is justified for the current production landing page. |
| Outcome | An evidence-backed, reproducible decision to close, continue or reopen the Lighthouse remediation cycle. |
| Audience / operator | SafetyNet project owner and later reviewer using the retained Lighthouse JSON reports and the reperformance procedure. The audience is inferred from the working paper’s stated purpose and metadata. |
| Failure definition | Material metric or source error; unsupported closure; treating a literal criterion miss as a pass; concealing uncertainty; or extending the conclusion to WCAG, functionality, security or other untested domains. |
| Contract gate | **Pass** — all four fields are established. |

## 3. Proportionality calibration

**Assessment depth: Standard, with deep evidence traceability.**

The working paper supports a reusable operational closure decision. The decision is reversible because a later Lighthouse run can reopen the assessment, but inaccurate closure could hide a material performance regression or create an unsupported assurance claim.

Accordingly:

- all six fit-for-purpose lenses are applied;
- measured facts, judgments and residual uncertainty are separated;
- material results are traceable to named JSON fields;
- broader specialist domains are routed out of scope;
- further remediation is assessed against expected benefit and regression risk.

## 4. Assessment basis and applicable requirements

### 4.1 Retained evidence

| Device | Source report | Production run time (Vietnam, UTC+7) | Configuration |
|---|---|---:|---|
| Mobile | `safetynetbeta.com-20260801T184908_mobile_1849.010826.json` | 18:49:08, 1 August 2026 | Mobile; simulated throttling |
| Desktop | `safetynetbeta.com-20260801T184947_desktop_1850.010826.json` | 18:49:47, 1 August 2026 | Desktop; simulated throttling |

Both reports:

- tested `https://safetynetbeta.com/`;
- used Lighthouse 13.3.0;
- selected Performance, Accessibility, Best Practices and SEO;
- recorded one lab run for their respective device configuration.

### 4.2 Applicable acceptance criteria

| Requirement | Acceptance criterion |
|---|---:|
| Performance score | At least 90 |
| Mobile Largest Contentful Paint | At most 2.5 seconds |
| Cumulative Layout Shift | At most 0.1 |
| Total Blocking Time | At most 200 milliseconds |
| Accessibility | 100 |
| SEO | 100 |

Best Practices is assessed and explained, but no separate minimum score was specified in the applicable criteria. It is therefore contextual evidence, not an independent pass/fail gate.

## 5. Current measured results

### 5.1 Category scores

| Category | Mobile | Desktop | Criterion | Result |
|---|---:|---:|---:|---|
| Performance | **96** | **99** | ≥90 | Pass |
| Accessibility | **100** | **100** | 100 | Pass in the Lighthouse-tested state |
| Best Practices | **81** | **81** | No gate specified | Contextual finding; see Section 8 |
| SEO | **100** | **100** | 100 | Pass |

### 5.2 Performance metrics

| Metric | Mobile | Desktop | Criterion | Result |
|---|---:|---:|---:|---|
| First Contentful Paint | 1.997 s | 0.717 s | Informational | Acceptable diagnostic |
| Largest Contentful Paint | **2.519 s** | **0.860 s** | Mobile ≤2.5 s | **Literal mobile criterion miss; accepted exception—see Section 7** |
| Speed Index | 1.997 s | 0.733 s | Informational | Acceptable diagnostic |
| Total Blocking Time | **42 ms** | **0 ms** | ≤200 ms | Pass |
| Cumulative Layout Shift | **0** | **0** | ≤0.1 | Pass |

The reports recorded 25 network requests and approximately 207 KB transferred for each configuration. These are supporting diagnostics, not acceptance gates.

## 6. Fit-for-purpose findings

| ID | Lens / criterion | Severity | Finding | Treatment / remediation | Status |
|---|---|---:|---|---|---|
| F1 | Completeness | Low | The original working paper contained the evidence, criteria, limitations and reperformance procedure, but did not state the full assessment contract required by the fit-for-purpose standard. | Added objective, outcome, audience/operator and failure definition in Section 2. | Closed |
| F2 | Accuracy | Medium | Mobile LCP is 2.519 seconds against a criterion of at most 2.5 seconds. It is inaccurate to record the criterion itself as passed, even though the 19 ms variance is judged immaterial. | Record a literal criterion miss and a separately reasoned accepted exception. | Closed with accepted exception |
| F3 | Operational Viability | Medium | The conclusion relies on one Mobile and one Desktop lab run. This is adequate for the retained current-state decision but does not establish performance variability or real-user experience. | Bound reliance to the retained runs and add reopening triggers in Section 11. | Residual limitation |
| F4 | Failure Handling | Low | A later material regression, changed page, changed Lighthouse version or materially worse rerun could invalidate the closure decision. | Reperformance and reopening conditions are specified in Sections 11 and 12. | Closed |
| F5 | Coherence | Medium | A fit-for-purpose conclusion could appear inconsistent with a literal LCP threshold miss unless criterion compliance and the proportionality judgment are distinguished. | Separate measured compliance from the overall fitness verdict; map the exception to F2. | Closed |
| F6 | Proportionality | Low | Further critical-CSS changes may create visual or layout regression for an expected benefit smaller than normal single-run lab variation. | Do not undertake another remediation cycle on the current evidence; reopen only on a stated trigger. | Closed |

### 6.1 Lens coverage result

| Lens | Result |
|---|---|
| Completeness | No blocking finding remains after F1 remediation. |
| Accuracy | No blocking finding remains; F2 is retained as an explicit accepted exception. |
| Operational Viability | Fit for the retained current-state decision; broader or repeated reliance is limited by F3. |
| Failure Handling | Reperformance, preservation and reopening controls are present. |
| Coherence | Measured compliance, judgment and verdict are now separated. |
| Proportionality | Further remediation is not justified on the current evidence. |

No Critical or High finding remains.

## 7. Finding F2: Largest Contentful Paint

**LCP** means **Largest Contentful Paint**. It measures how long the largest visible page element takes to appear.

The Mobile LCP is **2.519 seconds** against a target of **2.5 seconds**. The literal variance is:

- **0.019 seconds**;
- **19 milliseconds**;
- **0.77%** above the criterion.

The LCP element is the main headline:

> “Text me when you're safe” fails when you can't text.

The Mobile report attributes approximately:

- 127 ms to time to first byte; and
- 302 ms to element render delay.

The LCP element is text, not the hero image. The report identifies the two stylesheets as render-blocking requests, but does not provide a specific estimated LCP saving attributable to changing them in this run.

Further work would principally require changing how critical CSS is loaded. That may introduce unstyled-content, visual or layout regression. The expected benefit cannot be established as material from a single 19 ms threshold variance.

### 7.1 Criterion result

**Technical result: Fail by 19 ms.**

### 7.2 Fitness judgment

**Accepted as an immaterial exception for the current Lighthouse closure decision.**

This is a judgment, not a conversion of the failed criterion into a pass. The basis is:

- the variance is 0.77%;
- Lighthouse is a lab measurement and only one Mobile run is retained;
- all other stated performance gates pass materially;
- no high-value, low-regression remediation is identified by the evidence;
- another CSS remediation cycle would be disproportionate to the demonstrated benefit.

## 8. Best Practices result

The Best Practices score is **81** in both reports. No Best Practices acceptance gate was specified, so the score does not independently determine the verdict.

The deprecated-API audit found three warnings:

1. Shared Storage API deprecation.
2. `StorageType.persistent` deprecation.
3. Protected Audience API deprecation.

All three warnings identify this resource:

`/cdn-cgi/challenge-platform/scripts/jsd/main.js`

The reports attribute the warnings to a Cloudflare-managed path, not to identified first-party application code. Changing landing-page code solely to chase the score is not supported by the retained evidence.

The finding should be reopened if Cloudflare changes the script, exposes a relevant configuration control, or a future report attributes the warnings to first-party code.

## 9. Other residual diagnostics

Lighthouse identifies small remaining opportunities, including approximately 2 KiB each of unminified CSS and JavaScript, 11–12 KiB affected by cache lifetimes, render-blocking requests and a network dependency-chain diagnostic.

These findings:

- do not breach a stated acceptance gate;
- do not establish a material user-facing defect;
- do not justify another remediation cycle on the current evidence.

## 10. Uncertainty and residual limitations

| ID | Uncertainty / limitation | Effect on reliance |
|---|---|---|
| U1 | Only one Mobile and one Desktop lab run are retained. | The paper does not establish run-to-run variability. A later materially worse run may change the conclusion. |
| U2 | Lighthouse uses simulated lab conditions. | The paper does not establish field performance or real-user Core Web Vitals. |
| U3 | Accessibility score 100 reflects only automated audits in the tested page state. | It is not a complete WCAG conformance assessment. |
| U4 | Agentic Browsing was not selected. | No conclusion is made about that category. |
| U5 | Best Practices has no stated acceptance criterion. | The score is contextual and cannot be represented as a formal pass or fail. |
| U6 | The applied fit-for-purpose standard is marked unreviewed and states that it is MVO / pending Lab validation. | It is used as a structured assessment method, not represented as a final or externally authoritative standard. |
| U7 | Lighthouse does not test the complete signup security pathway. | Security clearance must come from the separate security assessment and access-required evidence. |

No uncertainty is resolved by assumption beyond the inferred audience/operator recorded in Section 2.

## 11. Verdict, rationale and conditions for reliance

### 11.1 Verdict

**Fit for purpose within the stated Lighthouse-only scope.**

The verdict means that the retained evidence is sufficient to support the operational decision that no further Lighthouse remediation is justified now. It does not mean every numerical criterion passed, nor does it establish broader quality, accessibility, functional or security assurance.

### 11.2 Rationale

The verdict is supported by:

- Performance scores of 96 Mobile and 99 Desktop, both above 90.
- Total Blocking Time of 42 ms Mobile and 0 ms Desktop, both below 200 ms.
- Cumulative Layout Shift of 0 on both configurations, below 0.1.
- Accessibility and SEO scores of 100 in both Lighthouse-tested states.
- A Mobile LCP criterion miss of 19 ms, explicitly recorded under F2 and accepted as immaterial for the closure decision.
- A Best Practices score affected by three warnings from a Cloudflare-managed resource, with no stated Best Practices gate.
- No Critical or High fit-for-purpose finding.

### 11.3 Conditions for reliance

| Condition ID | Condition | Related finding / limitation |
|---|---|---|
| C1 | Use this conclusion only for the production state measured on 1 August 2026 by the named reports. | F3, U1 |
| C2 | Do not represent the Mobile LCP criterion itself as passed; represent it as a 19 ms accepted exception. | F2 |
| C3 | Do not extend this conclusion to full WCAG, field performance, functionality, visual regression, Agentic Browsing or end-to-end security. | U2–U4, U7 |
| C4 | Reopen the assessment after a material page change, Lighthouse/Chrome methodology change, materially worse rerun, user-reported performance problem or field-data concern. | F4, U1–U2 |
| C5 | Preserve the two source JSON reports and this working paper so the decision remains reproducible. | F4 |
| C6 | Treat the applied fit-for-purpose standard as an MVO method pending its own review and Lab validation. | U6 |

### 11.4 Decision

**Close the current Lighthouse remediation cycle.**

No further Lighthouse remediation is justified on the evidence assessed. The decision must be reopened if a condition in C4 occurs.

## 12. Reperformance and failure procedure

### 12.1 Reperform this paper from the retained reports

1. Obtain the two JSON reports listed in Section 4.1.
2. Confirm for each report:
   - `requestedUrl` and `finalDisplayedUrl` equal `https://safetynetbeta.com/`;
   - `lighthouseVersion` equals `13.3.0`;
   - `configSettings.formFactor` is `mobile` or `desktop` as labelled;
   - `configSettings.onlyCategories` contains Performance, Accessibility, Best Practices and SEO.
3. Extract category scores from `categories.*.score` and multiply by 100.
4. Extract metrics from:
   - `audits.first-contentful-paint.numericValue`;
   - `audits.largest-contentful-paint.numericValue`;
   - `audits.speed-index.numericValue`;
   - `audits.total-blocking-time.numericValue`;
   - `audits.cumulative-layout-shift.numericValue`.
5. Convert millisecond metrics to seconds where shown.
6. Identify the LCP element and timing breakdown in `audits.lcp-breakdown-insight.details.items`.
7. Review `audits.deprecations.details.items` for warning text and source URLs.
8. Compare the extracted values with Sections 4 and 5.
9. Confirm the Mobile LCP is recorded as a technical miss and an accepted exception, not as a pass.
10. Reproduce the F2 proportionality judgment and the verdict conditions in Section 11.

Example extraction command:

```bash
jq '{
  fetchTime,
  lighthouseVersion,
  formFactor: .configSettings.formFactor,
  categories: (.categories | with_entries(.value = (.value.score * 100))),
  metrics: {
    fcp_ms: .audits["first-contentful-paint"].numericValue,
    lcp_ms: .audits["largest-contentful-paint"].numericValue,
    speed_index_ms: .audits["speed-index"].numericValue,
    tbt_ms: .audits["total-blocking-time"].numericValue,
    cls: .audits["cumulative-layout-shift"].numericValue
  }
}' REPORT.json
```

### 12.2 Perform a new current-state measurement

1. Run Chrome Lighthouse against `https://safetynetbeta.com/`.
2. Run Mobile and Desktop analyses with Performance, Accessibility, Best Practices and SEO selected.
3. Record Lighthouse and Chrome versions, URL, run time and device configuration.
4. Save new JSON reports without overwriting the reports assessed here.
5. Apply the criteria in Section 4.2.
6. Do not carry forward the accepted LCP exception automatically; assess the new result on its own evidence.
7. Reopen remediation if a stated gate is materially missed, a regression is repeated, or a new first-party defect is identified.

### 12.3 Failure handling

| Failure condition | Required action |
|---|---|
| Source report identity or configuration does not match Section 4.1 | Stop; do not reproduce the conclusion from that report. |
| Extracted value differs materially from Section 5 | Stop; correct the working paper before reliance. |
| New run is materially worse or repeatedly breaches a gate | Reopen the Lighthouse remediation assessment. |
| Warning source changes from Cloudflare-managed to first-party code | Investigate and reassess Best Practices treatment. |
| Evidence is used to support WCAG, functional or security clearance | Reject the extension and route to the relevant specialist assessment. |

## 13. Quality gate

| Gate | Result | Basis |
|---|---|---|
| Object defined | Pass | Deliverable, system and assessment contract are explicit. |
| Scope bounded | Pass | In-scope and out-of-scope domains are stated. |
| Authority caveat | N/A / controlled | This is not an OpenAI Skill; the applied standard’s MVO/unreviewed status is explicit. |
| Instructions coherent | Pass | Criterion compliance, accepted exception and overall verdict are separated. |
| Lens coverage | Pass | All six lenses are recorded in Section 6. |
| Findings traceable | Pass | Findings map to contract, criteria, JSON evidence or stated limitations. |
| Uncertainty separated | Pass | Section 10 contains decision-relevant unknowns and limitations. |
| Verdict discipline | Pass | No Critical/High finding remains; F2 and F3 bound the verdict. |
| Safety controls | N/A / controlled | Assessment and reperformance are read-only; no deployment, data write or configuration change is authorised. |
| Tests/evals | Pass for current purpose | Two retained production lab reports are verified; repeat-run variability remains U1. Golden-prompt testing applies to the standard itself, not this Lighthouse paper. |
| Metadata control | Pass | Heading, filepath and version timestamp are aligned at `1505.020826`. |
| MVOC | Pass | Further remediation burden is disproportionate to the evidenced 19 ms variance and regression risk. |

## Takeaways

The current Lighthouse-assessed state supports closure of the Lighthouse remediation cycle.

The Mobile LCP does not technically pass the 2.5-second criterion. It misses by 19 ms and is accepted as an immaterial exception for this current-state decision.

The verdict is limited to the retained Lighthouse evidence and cannot be extended to full WCAG, field performance, functionality, Agentic Browsing or end-to-end security.

## Next steps

Close the Lighthouse remediation assessment, preserve the evidence set, and continue the separate functional and end-to-end security checks. Reopen this assessment only on a trigger listed in Condition C4.

<metadata>

― Reference ―
ID:         Pending — allocate via Governance/Artefact Control Index 2.md
Title:      SafetyNet Lighthouse Current-State Analysis and Conclusion — 1505.020826
Artifact:   Analysis
Definition: A fit-for-purpose current-state analysis of the SafetyNet beta landing page against the stated Lighthouse requirements, based on retained Mobile and Desktop production reports. It records a 19 ms Mobile LCP criterion miss as an accepted exception and is not a complete WCAG, functional, field-performance or end-to-end security assessment.
Logic Path: SafetyNet/ Landing Page/ Lighthouse/ Current-State Analysis
Filepath:   /SN_Checks_010826/WP_SafetyNet_Lighthouse_Current_State_Analysis_and_Conclusion_1505.020826.md

― Problem ―
Problem:    The current Lighthouse results and closure rationale required a controlled fit-for-purpose contract, traceable findings, separate uncertainty, verdict conditions and explicit treatment of the literal Mobile LCP criterion miss.

― Approach ―
Approach Type: Raft

― Purpose ―
Purpose:    Preserve an evidence-backed, reproducible record of the current Lighthouse-assessed state and closure decision.
Objective:  Document the contract, applicable criteria, measured results, six-lens assessment, findings, uncertainty, verdict, reliance conditions and reperformance procedure.
Outcome:    A later reviewer can reproduce the assessment, understand the accepted LCP exception and determine when the Lighthouse remediation decision must be reopened.

― Quality ―
Preparer:   G1
Reviewer:   Pending
Confidence: Moderate — evidence verified; reviewer pending; single-run lab limitation retained
Tested:     1
Testing notes: Source report identities, URLs, Lighthouse version, selected categories, form factors, category scores, performance metrics, request counts, transfer sizes, Mobile LCP element and breakdown, and deprecated-API source paths checked against both retained JSON reports. Fit-for-purpose contract, all six lenses, severity, uncertainty, verdict conditions, failure handling, quality gate and metadata alignment checked against the cited MVO standard.

― Classification ―
Level:      L3

― Sources ―
- /SN_Checks_010826/safetynetbeta.com-20260801T184908_mobile_1849.010826.json — current Mobile production measurement (primary source)
- /SN_Checks_010826/safetynetbeta.com-20260801T184947_desktop_1850.010826.json — current Desktop production measurement (primary source)
- /SN_Checks_010826/PLAN.md — applicable Lighthouse requirements and procedure (primary source)
- /SN_Checks_010826/STD_Fit-for-Purpose_OpenAI-Equivalent_UNREVIEWED_1951.050726.md — fit-for-purpose assessment method; MVO / pending Lab validation (implements)
- /Testing-Control_110726/STD_Metadata_definition_1800.110726_L2.md — metadata structure and naming control (implements)
- /SN_Checks_010826/SafetyNet_Landing_Page_Security_Requirements_010826(1).md — boundary between Lighthouse and end-to-end security conclusions (references)

― Version ―
Timestamp:  #ver 1505.020826

</metadata>
