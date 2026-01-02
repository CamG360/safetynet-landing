# Email Delivery Control & Reference Guide (Version 2.1)
#ver 1742.02/01/26 

## Purpose

This document defines **rules, definitions, and application guidance** for email delivery. It is designed to:

* Mitigate legal and deliverability risk
* Provide a clear decision framework
* Act as a standalone control reference for future use

Scope: waitlists, launch emails, and in-product emails.

---

## Compliance Philosophy

This document applies a **proportionate compliance approach** based on:

1. **Regulatory Intent:** Follow the purpose of laws (consumer protection, consent, transparency), not gold-plated interpretations

2. **Standard Practice:** Align with accepted industry norms for SaaS/waitlist communications as practiced by established providers

3. **Minimum Viable Compliance:** Meet all legal requirements without imposing unnecessary restrictions that exceed regulatory expectations

4. **Risk-Proportionate:** Tailor controls to actual enforcement patterns and business risk profile (e.g., low-volume waitlists vs. bulk marketing)

### What This Means

**We DO:**
- ✓ Classify emails based on actual content and purpose
- ✓ Provide functional unsubscribe in all emails
- ✓ Follow mailbox provider authentication requirements
- ✓ Document lawful basis for processing
- ✓ Honor user opt-outs immediately

**We DO NOT:**
- ✗ Require consent for genuinely transactional confirmations
- ✗ Apply marketing restrictions to service messages
- ✗ Implement controls beyond what regulators require
- ✗ Interpret ambiguous cases in the most restrictive way

### Regulatory Alignment

This approach aligns with:
- **ICO guidance:** "Don't confuse service messages with marketing"
- **FTC enforcement:** Focus on deception and harm, not technical classification
- **ePrivacy soft opt-in:** Allows relevant emails to existing customers
- **Industry consensus:** As demonstrated by major ESPs (Mailchimp, SendGrid, AWS SES)

### Risk Acceptance

By applying minimum viable compliance, we accept:
- **Low regulatory risk:** Standards met, enforcement unlikely
- **Low deliverability risk:** Technical requirements satisfied
- **Medium ambiguity risk:** Some edge cases remain judgment calls

This is appropriate for low-volume, permission-based waitlist communications.

---

## Core Definitions

### Transactional Email

An email that is **necessary to deliver what the user explicitly requested**.

Characteristics:

* Triggered by a user action or service state
* Fulfils an expectation set at signup
* Neutral, informational tone
* No persuasion or engagement-building

Examples:

* Waitlist confirmation (when primarily confirmatory)
* "Early access is ready" / account activation
* Password resets
* Safety or system alerts

### Marketing (or Promotional) Email

An email whose **primary purpose is to increase engagement, adoption, or excitement**.

Characteristics:

* Describes benefits or value propositions
* Uses narrative, persuasion, or social proof
* Encourages reply, sharing, or continued engagement
* Not strictly required to deliver the service

Examples:

* Product launch announcements with benefits
* Feature highlights or roadmap updates
* Founder stories or vision emails
* "What's coming next" emails

### Mixed-Purpose Email

An email that combines transactional content **and** marketing elements.

Rule:

* Mixed-purpose emails are treated as **marketing** for compliance purposes (CAN-SPAM).
* Under GDPR, each processing purpose requires its own lawful basis.

---

## Key Distinction (Primary Rule)

> **If the email is necessary to deliver what the user asked for, it is transactional.**
> **If the email tries to increase engagement beyond delivery, it is marketing.**

This distinction is used by regulators, courts, and mailbox providers.

### Important: Legal Classification vs. Inbox Placement

**Mailbox providers (Gmail, Yahoo) may apply more restrictive classification for filtering purposes than regulators apply for legal compliance.** 

This framework governs **legal classification** under CAN-SPAM, GDPR, and ePrivacy/PECR. Achieving optimal **inbox placement** may require additional technical measures beyond legal requirements (see Appendix: Mailbox Provider Requirements).

In practice: An email may be legally "transactional" but still benefit from RFC 8058 one-click unsubscribe headers for better deliverability.

---

## Content Assessment Methods

### Content Ratio Test (Operational Heuristic)

**CAN-SPAM "Primary Purpose" Assessment:**

CAN-SPAM § 7704(a)(5) requires determining whether the "primary purpose" of an email is commercial or transactional. The FTC considers the "relative proportion" of content types when making this determination, but **does not specify a numeric threshold**.

**Practical Guideline (not a legal requirement):**

As an operational heuristic to ensure consistency:

- If marketing content **significantly dominates** the message body, classify as marketing
- If transactional content clearly predominates, classify as transactional
- **For borderline cases (roughly 40-60% range):** Classify as marketing (conservative approach ensures compliance)

**Measurement Method:**

Count sentences or word count of distinct content types:
- **Transactional content:** Confirmation, next steps, service delivery information, access instructions
- **Marketing content:** Benefits, use cases, persuasion, engagement prompts, storytelling

**Example Application:**

```
Email A: 200 words confirmation + 50 words brief context
→ Transactional predominates → Transactional classification

Email B: 100 words confirmation + 300 words founder story/benefits
→ Marketing significantly dominates → Marketing classification

Email C: 120 words confirmation + 100 words mixed content
→ Borderline (apply conservative approach) → Marketing classification
```

**Important Notes:**

- This heuristic provides operational consistency but is **not a substitute for qualitative assessment** of the email's primary purpose
- Document your classification reasoning in all cases to support audit defense
- When in doubt, classify as marketing (ensures compliance with stricter standard)

**GDPR Consideration:** 

Under GDPR, each processing purpose requires separate lawful basis regardless of content ratio. Even if CAN-SPAM classifies an email as transactional, any marketing content within it requires appropriate GDPR basis (consent or soft opt-in).

---

## Lawful Bases (GDPR)

Lawful basis depends on the **purpose of the email**, not the timing.

### Transactional Emails

* Lawful basis: **Contractual necessity** (Art. 6(1)(b)) or **legitimate interest** (Art. 6(1)(f))
* Explicit consent: **Not required**
* Example: Waitlist confirmation email fulfills the "contract" of providing waitlist access

### Marketing / Mixed Emails

* Lawful basis: **Explicit consent** (Art. 6(1)(a))
* Explicit consent: **Required before sending**
* Exception: Soft opt-in (see below)

### Soft Opt-In (ePrivacy Exception)

**When Applicable:**

If user provided email during sale/negotiation for Product A, you may send marketing for similar Product B without fresh consent IF:

1. Products are **similar** in nature/purpose
2. User had clear opportunity to opt-out at collection
3. User can opt-out of each communication

**Waitlist Signup as "Negotiation" - Jurisdictional Variance:**

The question of whether waitlist signup constitutes "negotiation for sale" under ePrivacy/PECR is subject to different interpretations across EU member states.

**Permissive Interpretation (UK, likely France):**

**UK ICO Position:**
- ICO guidance explicitly accepts "browsing and providing email for future products" as within soft opt-in scope
- ICO example: "Someone providing their email to receive information about future products"
- Waitlist signup = expression of purchase intent = negotiation phase
- **Risk Level:** Low (established regulator position)

**French CNIL Position:**
- "Pre-contractual measures at the request of the data subject" may include waitlist
- Context-dependent: waitlist for specific paid product more defensible than general newsletter
- **Risk Level:** Low-Medium (context matters)

**Stricter Interpretation (Germany, potentially others):**

**German DPA Positions:**
- Some German state DPAs suggest soft opt-in requires concrete transactional steps
- Examples: account creation with payment info, initiated checkout process
- Waitlist = interest expression, not necessarily negotiation
- **Risk Level:** Medium (ambiguous, limited guidance)

**Recommended Approach by Business Scope:**

**For UK-only operations:**
- Apply soft opt-in to waitlist users (supported by ICO guidance and examples)
- Send similar product marketing with clear unsubscribe
- Document reliance on ICO position

**For EU-wide operations, choose one:**

1. **Conservative (lowest risk):** Require explicit consent checkbox at signup for all marketing
2. **Pragmatic (balanced):** Apply soft opt-in, monitor complaint rates, adjust if issues arise
3. **Hybrid (targeted):** 
   - Use soft opt-in ONLY for core product launch/access emails
   - Require consent for broader marketing (newsletters, feature updates, etc.)

**Enforcement Reality:**

- No known DPA enforcement actions against legitimate waitlist marketing emails with functional unsubscribe
- Risk is primarily theoretical based on DPA interpretation variance
- **Practical risk level: Low** for similar product marketing with clear opt-out

**Example - SafetyNet Application:**

- User signs up for SafetyNet waitlist
- **May send under soft opt-in:** SafetyNet launch notification, pricing, core features, early access
- **May NOT send without consent:** Partner products, unrelated services, broad promotional content

**Does NOT apply to:** Cold contacts, purchased lists, unrelated products

**Applies to:** EU (ePrivacy Directive Recital 41), UK (PECR Regulation 22(3))

**Important:** Soft opt-in is permission to send marketing to existing customers based on the business relationship. It's not "no consent needed" - it's "consent inferred from the relationship and user's reasonable expectations."

### Key Points

* Unsubscribe ≠ withdrawal of consent for transactional emails
* Right to erasure is separate from unsubscribe
* Document lawful basis for each email type

---

## Practical Rules (Operational)

### Rule 1 — Purpose First

Classify every email by purpose before sending:

* Delivery / access → transactional
* Engagement / persuasion → marketing

### Rule 2 — Content Determines Classification

Intent does not matter. **Content does**.

If content includes:

* Benefits or value propositions
* Multiple use cases or scenarios
* Storytelling or founder narratives
* Engagement prompts (feedback, surveys, "hit reply")

→ Likely marketing (apply content ratio assessment)

### Rule 3 — Consent Unlocks Marketing, Not Delivery

* Users may always receive emails required to deliver what they signed up for
* Consent (or soft opt-in) unlocks **non-essential** communication

### Rule 4 — No Retroactive Fixes

* You cannot send a marketing email and "fix it later" with consent
* Consent must exist **before** sending

---

## Examples (Clear Cases)

### Allowed Without Explicit Consent

**Pure Transactional (No Consent Required):**
* "You're on the waitlist."
* "Early access is now available. Activate here: [link]"
* Login instructions
* Service downtime alerts
* Password reset confirmations
* Security notifications

**Transactional with Minimal Context (No Consent Required):**
* "You're on the SafetyNet waitlist. SafetyNet provides automatic safety check-ins. We'll email you when ready."

**Requirements for minimal context:**
- Limited to 2-3 sentences maximum
- **Must be factual and non-persuasive**
- Explains what user signed up for (not why it's amazing)

**Acceptable example:** 
✓ "SafetyNet provides automatic safety check-ins when you can't respond"

**Unacceptable examples:**
✗ "SafetyNet is the revolutionary, life-saving app that gives unprecedented peace of mind"
✗ Superlatives, emotional appeals, testimonials, competitive claims

### Requires Explicit Consent (or Soft Opt-In)

**Clear Marketing:**
* "We're excited to launch SafetyNet!"
* "Here's why SafetyNet matters" (extended value proposition)
* Feature descriptions or roadmap (beyond basic product definition)
* Requests for feedback or replies
* Founder story emails (beyond brief attribution)
* Product update newsletters

### Borderline Cases (Apply Content Ratio Test)

**Acceptable Context in Transactional Emails (Remains Transactional):**
* Brief product description (2-3 sentences maximum, factual and non-persuasive)
* Minimal founder signature (name and title only, e.g., "— Campbell, Founder")
* Single use-case example (if necessary to clarify what user requested)
* Expected timeline (e.g., "We'll contact you in Q2 2025")

**Triggers Marketing Classification:**
* Extended founder narratives (>50 words of storytelling or personal background)
* Multiple use-case scenarios or benefit lists
* Engagement solicitation (feedback requests, surveys, "What made you sign up? Hit reply")
* Persuasive language, social proof, or emotional appeals
* Marketing content that significantly dominates the message body

**Decision Rule for Borderline Cases:**
1. Apply the one-line classifier (see below)
2. Apply content ratio assessment (does marketing significantly dominate?)
3. When in doubt, classify as marketing (conservative approach ensures compliance)

---

## What This Means for Setup

### Signup (CTA)

* Email input (required)
* Reassurance text allowed
* **Optional, unchecked consent checkbox** for marketing emails beyond transactional confirmations

Example:

> ☐ I'd like to receive launch updates and product news about SafetyNet. I can unsubscribe at any time.

**Critical Implementation Rules:**

The checkbox state must NOT affect:
- **Waitlist signup submission** (must succeed whether checked or unchecked)
- **Transactional confirmation email delivery** (sent regardless of checkbox state)

The checkbox controls ONLY future marketing emails (product updates, feature news, founder letters, etc.).

**UX Anti-Patterns to Avoid:**

❌ "Please check the box to continue" (makes consent mandatory, violates GDPR)
❌ Disabling submit button until checked (coerces consent)
❌ Pre-checked checkbox (invalid consent under GDPR)

✓ **Correct approach:** Allow signup with or without checkbox (genuine choice)

**Note:** Checkbox is for **future marketing emails**, not for the transactional waitlist confirmation.

### Confirmation Email

* Must be **primarily transactional** if sent without prior consent
* Brief product context acceptable (2-3 sentences, factual, non-persuasive)
* No extended persuasion, stories, or engagement prompts
* If marketing content significantly dominates, requires prior consent or soft opt-in

### Follow-Up Emails

| Consent Status | Emails Allowed            |
| ------------- | ------------------------- |
| No consent given | Transactional only        |
| Consent given | Transactional + marketing |
| Soft opt-in applies | Transactional + similar product marketing |

### Infrastructure

* Single sending domain is acceptable at low volume
* Suppression list must be checked before send
* Unsubscribe must always be functional (footer link + RFC 8058 for deliverability)
* SPF, DKIM, DMARC authentication required

---

## Risk Control Summary

| Risk                | Control                      |
| ------------------- | ---------------------------- |
| GDPR non-compliance | Purpose-based classification |
| ePrivacy violations | Soft opt-in for similar products (with jurisdictional awareness) |
| Spam complaints     | Clear consent boundaries + functional unsubscribe |
| Deliverability      | Authentication + RFC 8058 headers |
| Over-friction       | Transactional confirmations without consent requirement |
| Future flexibility  | Content-gated sending logic  |
| Coerced consent     | Checkbox state cannot block signup or confirmation |

---

## Final Control Statement

> **Email legality and deliverability are governed by purpose, not intent or timing.**
> **Deliver what the user asked for without consent.**
> **Use soft opt-in for similar product marketing to existing customers (with awareness of jurisdictional variance).**
> **Ask explicit consent only to go beyond that.**

---

## Decision Tree (Operational)

**Step 1 — Why is this email being sent?**

* To deliver something the user explicitly requested → go to Step 2
* To inform, persuade, excite, or engage beyond delivery → **Marketing**

**Step 2 — Is the email strictly necessary to fulfil that request?**

* Yes → go to Step 3
* No / includes extras → **Marketing**

**Step 3 — Does the content include any of the following?**

* Extended benefits or value propositions (>3 sentences)
* Multiple use-case scenarios
* Storytelling or credibility-building (>50 words)
* Engagement prompts (reply, feedback, sharing)
* Marketing content that significantly dominates the message body
* Persuasive or emotional language (vs. factual statements)

If **yes** to any → **Marketing**
If **no** to all → **Transactional**

---

## One-Line Classifier Checklist

> **If removing this email would prevent the user from accessing or using what they signed up for, it is transactional. Otherwise, it is marketing.**

---

## Implementation Requirements (Summary)

To apply this framework, systems must:

1. **Classify each email** before sending (use decision tree)
2. **Store consent status** (for marketing emails requiring explicit consent)
3. **Check suppression list** (all emails, honor unsubscribes immediately)
4. **Provide functional unsubscribe** (footer link in all emails)
5. **Document lawful basis** (GDPR requirement - contractual, legitimate interest, or consent)
6. **Implement authentication** (SPF, DKIM, DMARC for deliverability)
7. **Ensure checkbox independence** (signup must succeed regardless of checkbox state)

*Detailed technical implementation is covered in separate operational documentation.*

---

## Appendix — Complete Regulatory Framework

### United States

**CAN-SPAM Act (15 U.S.C. §7701–7713)**

- **Primary Purpose Test (§7704(a)(5)):** Mixed-content emails classified by dominant purpose
- **Transactional Definition (§7702(17)):** "Facilitates, completes, or confirms a commercial transaction that the recipient has already agreed to enter into"
- **Requirements:** Accurate headers, physical address, functional opt-out, no deceptive subject lines
- **Enforcement:** FTC focuses on deceptive practices, spam operations; rarely enforces classification ambiguity for legitimate senders

**FTC Compliance Guidance:**

"The primary purpose of the message is the deciding factor. If the message contains only content that facilitates a commercial transaction, it's transactional. If it contains only content that advertises or promotes, it's commercial."

**FTC Staff Commentary (2008) on Mixed Content:**

"In some cases... the answer will be obvious. In others, it will be a closer call, and the relative proportion of transactional or relationship content and commercial content will be relevant."

### European Union

**GDPR (Regulation 2016/679)**

**Article 6(1)(b) - Contractual Necessity:**
"Processing is necessary for the performance of a contract to which the data subject is party"
- Applies to: Service emails, account notifications, delivery of requested service
- Example: Waitlist confirmation email fulfills contract of providing waitlist access

**Article 6(1)(a) - Consent:**
"The data subject has given consent to the processing of his or her personal data for one or more specific purposes"
- Applies to: Marketing emails, newsletters, promotional content
- Requirements: Freely given, specific, informed, unambiguous indication of wishes

**Article 7 - Conditions for Consent:**
Consent must be demonstrable, withdrawable, and cannot be bundled with service delivery

**Recital 32 - Conditions for Consent:**
"Silence, pre-ticked boxes or inactivity should not constitute consent"

**ePrivacy Directive (2002/58/EC as amended by 2009/136/EC)**

**Article 13 - Unsolicited Communications:**
"The use of electronic mail for the purposes of direct marketing may only be allowed in respect of subscribers who have given their **prior consent**."

**Recital 41 - Soft Opt-In Exception:**
"Where a natural or legal person obtains from its customers their electronic contact details for electronic mail, in the context of the sale of a product or service, the same natural or legal person may use these electronic contact details for **direct marketing of its own similar products or services** provided that customers are clearly and distinctly given the opportunity to object, free of charge and in an easy manner, to such use."

**Application:**
- Marketing emails to EU users require prior consent OR soft opt-in
- Transactional/service emails exempt from consent requirement  
- Unsubscribe must be available in all marketing communications
- Soft opt-in only applies to similar products/services
- Interpretation of "negotiation for sale" varies by member state DPA

**Reference:** Directive 2002/58/EC, OJ L 201, 31.7.2002

### United Kingdom (Post-Brexit)

**Privacy and Electronic Communications Regulations 2003 (UK PECR)**

**Regulation 22 - Use of Electronic Mail for Direct Marketing:**
"A person shall not use electronic mail for direct marketing purposes unless:
(a) the recipient has **previously notified** the sender that they consent, or
(b) the soft opt-in conditions are met"

**Regulation 22(3) - Soft Opt-In Conditions:**
- Contact details obtained in course of sale or negotiations for sale
- Marketing is for seller's **similar products or services**  
- Recipient given clear opportunity to refuse marketing at time of collection and in every subsequent communication

**Post-Brexit Status:** 
PECR remains UK law post-Brexit as retained EU law. UK maintains equivalence with EU ePrivacy standards.

**ICO Direct Marketing Guidance:**

"Service messages sent to existing customers are not marketing if they relate to the service being provided. You should be able to send these even if someone has opted out of marketing."

**ICO Position on Soft Opt-In:**
ICO guidance accepts "browsing and providing email for future products" as within soft opt-in scope, suggesting permissive interpretation of "negotiations for sale."

**Reference:** SI 2003/2426 (as amended by SI 2018/1123, SI 2019/1470)

### Mailbox Provider Requirements (Technical)

**Important Distinction:**
Legal compliance (CAN-SPAM, GDPR, PECR) ≠ Deliverability compliance

Mailbox providers apply their own classification systems for filtering that may be more restrictive than legal requirements.

**Google Bulk Sender Guidelines (February 2024)**
- **Authentication Required:** SPF, DKIM, and DMARC for domains sending >5,000 emails/day
- **One-Click Unsubscribe (RFC 8058):** Required for promotional/marketing emails
- **Spam Complaint Rate:** Must remain below 0.3%
- **Classification:** "Promotional" in Google's terms = any non-critical account email
- **Visible Unsubscribe:** Footer link required in addition to one-click header

**Yahoo/AOL Sender Requirements**
- Similar authentication requirements (SPF, DKIM, DMARC)
- One-click unsubscribe for "commercial" mail
- DMARC policy of p=quarantine or p=reject recommended for sending domains
- Complaint rate monitoring and enforcement

**RFC 8058 - One-Click Unsubscribe**
Technical standard for List-Unsubscribe-Post header enabling inbox-level unsubscribe button

**Key Differences: Legal vs. Provider Requirements**

| Aspect | Legal Requirement | Provider Requirement |
|--------|------------------|---------------------|
| **Classification** | Content/purpose based | Engagement/relationship based |
| **Consent** | Required for marketing (EU/UK) | Improves deliverability/reputation |
| **Unsubscribe** | Footer link required (CAN-SPAM) | RFC 8058 + footer link (deliverability) |
| **Authentication** | Not legally required | SPF/DKIM/DMARC required for delivery |
| **Enforcement** | Regulators (FTC, ICO, DPAs) | Spam folder/domain blocking |

**Practical Implication:**

Even if an email is legally classified as "transactional," implementing RFC 8058 one-click unsubscribe improves deliverability. Providers may treat emails without established sender reputation as "promotional" for filtering purposes regardless of legal classification.

**This framework governs legal compliance; consult provider documentation for optimal inbox placement.**

**References:**
- https://support.google.com/a/answer/81126
- https://senders.yahooinc.com/best-practices/
- https://datatracker.ietf.org/doc/html/rfc8058

### Industry & ESP Guidance

**Twilio SendGrid - Transactional vs Marketing Email**
Content-based classification guidance: "If the email's primary purpose is to facilitate or confirm a transaction the user initiated, it's transactional. If it's to advertise or promote, it's marketing."

**Mailchimp - Email Types**
"Transactional emails are triggered by a user's action and contain information to complete that action. Marketing emails are sent to multiple recipients to promote products or services."

**AWS SES - Types of Email**
Confirms purpose-based distinction and advises separate suppression lists for transactional vs. marketing

**Postmark - Transactional Email Best Practices**
"Keep transactional emails focused on their core purpose. Don't mix in marketing content that could trigger spam filters."

---

## Appendix — Control Use Note

This document is intended to be:

* Used pre-send as a classification check
* Referenced when designing signup flows
* Relied upon as evidence of proportionate compliance

It should be updated only if:

* Regulatory guidance changes materially
* Sending patterns materially change (e.g., transitioning to bulk marketing)
* Enforcement patterns shift (e.g., new ICO guidance, FTC actions)
* DPA interpretations on soft opt-in for waitlists become clarified

**Document Version:** 2.1  
**Last Updated:** 2 January 2026  

**Next Review:** Annually or upon regulatory change

---


---

## Document Status

**Version:** 2.1  
**Status:** Ready for implementation bridge  
**Remaining gaps:** None identified within control document scope  
**Next step:** Create separate operational implementation guide with database schemas, code examples, and technical configuration

**The control document is now complete and production-ready.**
