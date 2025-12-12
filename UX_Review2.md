# SafetyNet Landing Page - Comprehensive UX Review

**Review Date:** December 12, 2025
**Reviewer:** Claude (AI UX Analysis)
**Page Reviewed:** index.html
**Focus Areas:** Core Functionality Comprehension, Concept Clarity, Value Proposition, Trust Building, Onboarding Clarity

---

## Executive Summary

The SafetyNet landing page demonstrates strong UX fundamentals with clear value proposition and compelling storytelling. However, there are critical gaps in helping users understand the core mechanism, technical requirements, and practical implementation that could hinder conversion and create friction during actual product usage.

**Overall Score: 7.5/10**

**Key Strengths:**
- Excellent emotional storytelling through founder narrative
- Clear problem/solution framing with "text me when you're safe" failure scenario
- Strong visual demonstrations of the 3-step process
- Comprehensive FAQ addressing common concerns

**Critical Issues:**
- Ambiguous "how to check in" mechanism (users may not understand they need the app open)
- Missing technical prerequisites and initial setup clarity
- Insufficient trust signals for a safety-critical application
- Limited guidance on emergency contact experience and responsibilities

---

## 1. User Comprehension of Core Functionality

### 🟢 What Works Well

**Clear 3-Step Process Visualization**
- The "How It Works" section (lines 443-614) provides excellent visual mockups of the app interface
- Step labels are clear: "Set your Safe Time," "SafetyNet stands guard," "SafetyNet speaks for you"
- Time display and progress bars help users understand countdown mechanism
- Interactive demo button for viewing sample safety alert is excellent

**"Works Offline" Messaging**
- Multiple mentions throughout the page (hero section, comparison table, FAQ)
- Clear explanation that monitoring happens "from the cloud, not your phone" (line 1171)
- Addresses critical use case where phone is dead/offline

### 🔴 Critical Comprehension Gaps

**1. HOW TO CHECK IN - Critically Unclear**

The page never explicitly explains HOW a user checks in when their Safe Time approaches. Users are left guessing:
- Do they need to open the app?
- Will a notification appear on their lock screen?
- Can they check in via SMS or voice command?
- Does it work if the app is closed/backgrounded?

**Location in code:** Line 543-546 shows "I'm Safe" button in mockup, but no explanation of how users ACCESS this button when the time comes.

**Recommended Fix:** Add a prominent callout:
```
"When your Safe Time approaches, SafetyNet sends you a reminder notification.
Simply tap it to check in - no need to open the app. You can even check in
from your lock screen, smartwatch, or by voice command via Siri/Google Assistant."
```

**2. Initial Setup Requirements - Not Explained**

Users won't understand they need to:
- Download an app (never explicitly stated until FAQ line 1277)
- Have internet connection to SET the safe time (mentioned only in limitations FAQ)
- Set up emergency contacts BEFORE using the feature
- Write custom messages BEFORE each use or have templates ready

**Location in code:** Hero section (lines 366-441) promises "Create your SafetyNet in under a minute" but doesn't explain what that minute involves.

**Recommended Fix:** Add an "Initial Setup" section or expand the FAQ to include:
- First-time setup steps
- What information you'll need
- How long it takes to configure your first SafetyNet

**3. Emergency Contact Experience - Underexplained**

While the alert demo is excellent (lines 1308-1370), users don't understand:
- Whether their emergency contact needs to install SafetyNet
- How contacts confirm they received the alert
- What contacts see if it's a false alarm
- How bi-directional communication works after an alert

**Location in code:** FAQ item at line 1254 mentions "confirmation request" but doesn't explain the contact's full experience.

**Recommended Fix:** Add section: "What Your Emergency Contact Experiences"
- They receive a one-time setup confirmation (no app needed)
- When an alert triggers, they get SMS + Email + Push (if they have the app)
- They can acknowledge receipt of the alert
- You can cancel a false alarm and they're instantly notified

### 🟡 Minor Issues

**Grace Period Explanation**
- Grace period is mentioned (lines 499-500, 1193) but calculation isn't clear
- Users won't know if it's 30 minutes AFTER the Safe Time or part of the countdown
- Example: "Safe by 10 PM + 30 min grace = you have until 10:30 PM to check in"

**Reminder Timing**
- FAQ mentions "reminder notifications" (line 1193) but doesn't specify when
- Users need to know: "You'll receive reminders at 30 min, 15 min, and 5 min before your Safe Time"

---

## 2. User Comprehension of Concept

### 🟢 What Works Well

**Excellent Problem Framing**
- "Why 'text me when you're safe' can fail" section (lines 617-685) is exceptionally clear
- Two-column comparison (You vs. Friends & Family) effectively shows the communication breakdown
- The "Critical Flaw" box drives the point home powerfully

**Mental Model Building**
- The blue box at line 395-398 provides perfect conceptual summary:
  > "Set a 'Safe By' time. If you don't check in by then, SafetyNet automatically sends your pre-written message and instructions to your emergency contact."
- This single paragraph may be the strongest element on the entire page

**Comparison Table is Effective**
- Lines 881-962 clearly differentiate SafetyNet from location-sharing apps
- Three key differentiators: Automatic alerts, Essential context, Works offline
- Visual checkmarks vs. X marks are immediately scannable

### 🔴 Conceptual Confusion Risks

**1. "Silent Safeguard" May Backfire**

**Location:** Hero headline (line 378): "SafetyNet is your silent safeguard"

**Issue:** "Silent" could be misinterpreted as:
- It won't send notifications (bad for check-in reminders)
- It runs in the background without user knowing (privacy concern)
- It's passive and won't actually DO anything

**User mental model risk:** People might think they set it once and forget it, when actually they need to actively set Safe Times for each activity.

**Recommended Fix:** Replace "silent safeguard" with "automatic safeguard" or "standby safeguard"
- These suggest active protection without implying invisibility/passivity

**2. Recurring vs. One-Time SafetyNets**

The page never clarifies:
- Is SafetyNet a one-time setup per activity?
- Can you set recurring SafetyNets (e.g., "Every time I go running at 6 AM")?
- Do you need to manually activate it each time?

**Location:** Use cases section (lines 807-879) shows scenarios but not frequency patterns

**Recommended Fix:** Add to FAQ or "How It Works":
```
"Create a new SafetyNet each time you need protection, or set up recurring
SafetyNets for regular activities like your morning commute or weekly run."
```

**3. The "Monitoring" Metaphor Needs Refinement**

**Location:** Multiple places mention "monitoring" (line 770: "SafetyNet is always monitoring")

**Conceptual issue:** "Monitoring" implies surveillance, which conflicts with privacy messaging

**Better framing:**
- "SafetyNet tracks YOUR commitment to check in" (emphasizes user agency)
- "SafetyNet keeps time so you don't have to worry" (emphasizes service, not surveillance)

### 🟡 Minor Conceptual Issues

**Offline Capability Oversold**
- The page heavily emphasizes "Works Offline" (lines 428, 945-950)
- But FAQ reveals you need internet to SET the Safe Time (line 1206)
- This could feel like false advertising when users try to set a SafetyNet before going hiking with no cell service

**Recommendation:** Clarify as "Works AFTER you go offline" or "Continues monitoring even when your phone dies"

---

## 3. User Comprehension of Value

### 🟢 Strong Value Communication

**Emotional Value: Extremely Clear**
- The "Our Story" section (lines 965-1120) is the strongest value demonstration on the page
- Real scenarios (drink spiking, phone stolen, hiking accident) create immediate identification
- Founder credibility ("20 years building safeguards") adds weight
- The philosophy section (lines 1107-1116) beautifully frames value as "freedom enabler" not "restriction"

**Functional Value: Well Articulated**
- Use cases section (lines 807-879) shows practical applications
- Each use case demonstrates the SPECIFIC value: "If alerts trigger, friend gets..."
- Examples are concrete and relatable (solo travel, first date, morning run)

**Comparative Value: Clear Differentiation**
- Comparison table shows what competitors lack
- "Silent Failure" vs. "Alert Sent" is powerful contrast
- FAQ directly addresses "How is this different from Find My Friends?" (lines 1218-1223)

### 🟡 Value Gaps and Weaknesses

**1. Pricing Uncertainty Creates Value Anxiety**

**Location:** FAQ lines 1240-1245: "We're finalizing our pricing model"

**Issue:** Without ANY pricing indication, users can't assess value-for-money
- Is this $2/month or $20/month?
- Is it per-use or subscription?
- Are there free tiers?

**Psychology:** When safety is involved, pricing uncertainty creates distrust
- "Are they avoiding pricing because it's expensive?"
- "If I join the waitlist, am I committing to buy?"

**Recommended Fix:** Provide a range or anchor:
```
"Expected pricing: $4-7/month or free for limited use.
Early access members will receive special discounted pricing."
```

**2. False Alarm Cost Not Addressed**

**Location:** Line 714 mentions "No False Alarms" but doesn't address the social cost

**Missing value consideration:**
- What happens to my relationships if I accidentally trigger multiple false alarms?
- Will my emergency contact stop taking alerts seriously?
- Is there a "boy who cried wolf" problem?

**Recommended addition to FAQ:**
```
Q: What if I trigger false alarms repeatedly?
A: We designed SafetyNet to minimize false alarms through grace periods and
reminders. If a false alarm does occur, you can instantly cancel it and send
a "false alarm - I'm safe" notification. Your emergency contact sees this
immediately, so there's no prolonged worry. We also provide usage analytics
to help you optimize your Safe Times and grace periods to reduce future
false alarms.
```

**3. Limited Explanation of "Essential Context" Value**

**Location:** Lines 922-936 in comparison table mention "Custom messages & instructions"

**Issue:** The DEMO is excellent (lines 1344-1366), but the VALUE isn't explicitly stated

**Missing messaging:**
- WHY is context valuable? (Because location alone doesn't tell your emergency contact if you're in danger or just lost track of time)
- WHAT can context prevent? (Hours of uncertainty, calling police unnecessarily, not knowing where to start looking)
- HOW does context speed up response? (Your contact knows exactly what to do first)

**Recommended fix:** Add a value-focused section:
```
"Why Context Matters: Your Last Location vs. Your Full Story

Location sharing shows WHERE you were last.
SafetyNet provides the CONTEXT your emergency contact needs to help:
- Your plans (so they know what you were doing)
- Specific instructions (so they know what to do first)
- Contact information (so they can reach venues, friends, or authorities)

In an emergency, this context can save hours or even be life-saving."
```

### 🟢 Value Propositions That Excel

**1. The "Text Me When You're Safe" Fails Scenario**
- This is marketing gold
- Everyone immediately relates to it
- The problem visualization (lines 631-683) is perfectly executed

**2. Freedom-Enabling Philosophy**
- Lines 1109-1114: "SafetyNet doesn't restrict your freedom - it enables it"
- This reframes safety from limiting to empowering
- Addresses potential objection that safety apps are "helicopter parenting"

**3. Founder Story Authenticity**
- The real situations (lines 1014-1078) feel genuine, not manufactured
- Specific details (drink spiked at corporate event, Airbnb hostage situation) create credibility
- This is significantly more valuable than generic "we care about safety" messaging

---

## 4. Trust Building Elements for Safety-Critical App

### 🔴 Critical Trust Deficits

**1. No Proof of Concept or Beta Testing Mentioned**

**Major issue:** This is a pre-launch waitlist for a SAFETY-CRITICAL application, yet there's no indication of:
- Has this system been tested?
- Are there any beta users who've used it successfully?
- Has a safety alert ever actually been sent in testing?
- What testing has been done to ensure alerts ALWAYS get through?

**Location:** The entire page positions this as in-development (line 1233: "currently in development")

**Trust gap:** Users are asked to trust their safety to an untested system

**Recommended fix:** Add a "Development & Testing" section:
```
"Current Status: Limited Beta Testing

SafetyNet is currently in limited beta testing with 50 users who've created
over 200 test SafetyNets. We've successfully tested alert delivery across
multiple scenarios including phone power-off, airplane mode, and no signal
conditions.

Join the waitlist to participate in our expanded beta and help us test real-world
scenarios before public launch.

Safety first: We will not launch publicly until we've achieved 99.9% alert
delivery success rate in testing."
```

**2. Security & Reliability Claims Lack Evidence**

**Location:** Lines 743-803 make strong claims:
- "Bank-Level Encryption" (TLS 1.3, AES-256)
- "99.9% Uptime Guarantee"
- "SOC 2 Compliant Infrastructure"

**Trust issue:** These are serious security certifications and guarantees, but there's no evidence:
- Do you currently have SOC 2 certification? (Unlikely for a pre-launch startup)
- Where is the uptime monitored? (No status page link)
- What infrastructure provider? (AWS, GCP, Azure?)

**Risk:** Sophisticated users will see through unsubstantiated claims, damaging credibility

**Recommended fixes:**
- If you DON'T have SOC 2 yet: "Built on SOC 2-compliant infrastructure (AWS/GCP) with certification planned for Q2 2025"
- Add infrastructure transparency: "Hosted on Amazon Web Services with multi-region redundancy"
- Link to a status page: "Real-time system status: status.safetynet.app"
- Be honest about uptime: "Target 99.9% uptime (monitored from day one, guaranteed after 90 days of operation)"

**3. No Third-Party Validation**

**Missing trust signals:**
- No security audits mentioned
- No partnerships with safety organizations
- No endorsements from personal safety experts
- No advisory board members listed
- No press coverage or media mentions

**Recommended additions:**
- "Security audit by [firm] scheduled for Q1 2025 - results will be published"
- "Advised by [name], former safety director at [organization]"
- "As featured in [publication]" (even if it's just a startup directory)
- Link to a "Trust Center" page with security documentation

**4. Founder Photo Could Be Stock Image**

**Location:** Line 976 - Campbell McCord photo

**Trust issue:** Without LinkedIn verification or external proof, users might question if this is a real person

**Recommended addition:**
- Add LinkedIn profile link
- Add founder email or contact method
- Link to any published articles, interviews, or press
- Show team page (even if it's just the founder) with real names and backgrounds

### 🟡 Moderate Trust Issues

**1. Privacy Policy and Terms of Service Are Dead Links**

**Location:** Footer lines 1300-1302

**Issue:** For a safety app collecting emergency contact info, having placeholder links (href="#") erodes trust

**Fix:** Even a draft privacy policy is better than nothing. Add:
```
"Privacy Policy (Draft) - We're finalizing our legal docs and will publish them before launch.
Key principles:
- We never sell your data
- We only contact your emergency contacts if an alert triggers
- You can delete all your data at any time
- We are GDPR and CCPA compliant"
```

**2. No Information About the Company**

**Missing:**
- Where is SafetyNet based? (Country, state)
- Is it incorporated? (LLC, Corp, or just a solo project?)
- How is it funded? (Bootstrapped, VC-backed, grants?)
- What's the long-term viability?

**Trust issue:** For a safety-critical service, users need to know the company will exist long-term

**Recommended addition to "Our Story" or footer:**
```
"SafetyNet is a Delaware C-Corporation based in [City], founded in 2024 and
backed by [funding source]. We're committed to long-term operation and will
provide 90 days notice if we ever need to shut down the service."
```

**3. Contact Information is Placeholder**

**Location:** Footer line 1302 - "Contact" link goes nowhere

**Fix:** Provide real contact:
- Email: hello@safetynet.app or support@safetynet.app
- Or at minimum: "Contact: Join our waitlist and you'll receive our founder's email in your welcome message"

### 🟢 Trust Elements That Work Well

**1. Founder Story Builds Personal Trust**
- The detailed personal narrative (lines 995-1116) creates authenticity
- Specific scenarios (not generic platitudes) feel real
- Professional background (20 years in risk management) is highly relevant
- Vulnerability in sharing personal experiences builds connection

**2. Transparency About Limitations**
- FAQ item at lines 1198-1213 honestly discusses limitations
- Acknowledging "no system is 100% foolproof" actually builds trust
- Shows realistic expectations, not overpromising

**3. No Spam Positioning**
- Section at lines 729-738 addresses a key concern
- "No continuous location tracking, no background data collection" (line 1160) is reassuring
- Shows respect for user privacy

**4. Clear Emergency Use Case Focus**
- The entire page maintains focus on genuine safety scenarios
- Not positioned as a surveillance or control tool
- This builds trust that the motivation is authentic

---

## 5. Onboarding Clarity

### 🔴 Critical Onboarding Gaps

**1. No Clear "What Happens After I Join the Waitlist?"**

**Location:** Success message at lines 1402-1422 provides some info, but it's only visible AFTER signup

**Missing from the main page:**
- Timeline expectations (When will I get access?)
- What the email will contain
- Whether there's any action required
- If beta testing is involved

**Current message (line 1408):** "Expect an email from us within 24 hours"

**Issues:**
- What happens after that email?
- Is there an onboarding process?
- Will I be able to use it immediately or is it rolling access?

**Recommended fix:** Add to the FAQ:
```
Q: What happens after I join the waitlist?
A: Within 24 hours, you'll receive a welcome email with:
1. Our current launch timeline
2. Invitation to our beta testing program (optional)
3. Early access link when we launch
4. Opportunity to provide input on features

When we launch, you'll receive a setup email with a one-time link to download
the app and complete your initial setup (takes about 5 minutes).
```

**2. First-Time User Journey Not Described**

**Major gap:** A user who gets early access won't know:
- Step 1: What to do first? (Download app, create account, set up emergency contact?)
- Step 2: How long does initial setup take?
- Step 3: Can I test it without triggering a real alert?
- Step 4: What happens during my first SafetyNet activation?

**Recommended addition:** New section after "How It Works":

```
## Your First SafetyNet: Step by Step

**First-time setup (5 minutes)**
1. Download the app and create your account
2. Add your first emergency contact (they'll receive a confirmation request)
3. Write your default message template
4. Test the system with a practice SafetyNet (we'll guide you through it)

**Creating your first real SafetyNet (30 seconds)**
1. Tap "Create SafetyNet"
2. Set your Safe By time
3. Customize your message if needed (or use your template)
4. Activate - you're protected

**Before your Safe Time**
You'll receive reminder notifications at 30 min, 15 min, and 5 min before your
Safe Time. Just tap "I'm Safe" on any reminder to check in.
```

**3. Emergency Contact Onboarding Not Explained**

**User anxiety:** "If I add my mom as my emergency contact, will she get bombarded with setup steps? Will it be confusing for her?"

**Missing information:**
- What does the contact receive when you add them?
- Do they need to install anything?
- What if they ignore the setup request?
- Can you use someone as an emergency contact without their explicit consent?

**Recommended addition to FAQ:**
```
Q: What does my emergency contact need to do?
A: When you add an emergency contact, they receive a one-time confirmation
message via SMS and email explaining:
- You've added them as your SafetyNet emergency contact
- What SafetyNet is and how it works
- They need to click "Accept" to confirm (takes 10 seconds)
- They don't need to install any app

If they don't accept within 48 hours, you'll be notified to choose a different
contact. This ensures your emergency contact is aware and willing to respond
if an alert triggers.
```

### 🟡 Moderate Onboarding Issues

**1. No Onboarding Preview**

The page shows what the app looks like during use (the 3 mockups in "How It Works"), but doesn't show:
- What the onboarding screens look like
- How complex the initial setup is
- Whether there are tutorials or guides

**Recommendation:** Add mockup or description of onboarding flow

**2. Unclear Platform Priority**

**Location:** FAQ line 1277 mentions iOS, Android, and web

**Onboarding question:**
- Which platform should I choose?
- Are all features available on all platforms?
- Can I set a SafetyNet from my laptop?

**Recommendation:** Clarify platform recommendations:
```
"For full functionality, we recommend the mobile app (iOS or Android). The web
version allows you to manage settings, create SafetyNets, and check in from
any browser - perfect as a backup if your phone is unavailable."
```

**3. No Sample/Practice Mode Mentioned**

**User fear:** "What if I mess up and accidentally trigger a real alert to my emergency contact?"

**Missing reassurance:** No mention of practice/test mode

**Recommended addition:**
- "Try SafetyNet risk-free with Practice Mode - test the full experience without
alerting your emergency contact. Your first SafetyNet setup will guide you through
a practice run."

### 🟢 Onboarding Elements That Work

**1. "Under a Minute" Promise**
- Line 453: "Create your SafetyNet in under a minute"
- Sets clear expectation for speed
- Reduces perceived friction

**2. Simple 3-Step Process**
- The visual demonstration (lines 458-610) serves as effective onboarding preview
- Users can see exactly what they'll be doing

**3. Use Case Examples Provide Onboarding Templates**
- Lines 815-877 show specific scenarios
- Users can mentally map "first date" or "morning run" to their own needs
- This reduces cognitive load during initial setup

**4. Email Capture is Low-Friction**
- Hero section email input (lines 406-414) is simple and fast
- Secondary CTA ("See how it works") provides non-committal option
- Good balance of urgency and information

---

## Additional Recommendations

### Mobile vs. Desktop Experience

**Current design:** Single responsive design serves both

**Potential issue:** The page is very long (1766 lines) and may feel overwhelming on mobile

**Recommendation:**
- Add a "Quick Overview" section at the top for mobile users with expandable details
- Consider a mobile-specific hero that focuses on single CTA (waitlist) without as much explanation
- Test scroll depth analytics to see where mobile users drop off

### Accessibility Concerns

**Positive elements:**
- Good use of ARIA labels (line 342, 1309, 1373)
- Keyboard support for modals (lines 1462-1475)
- Semantic HTML structure

**Areas for improvement:**
- Color contrast on blue-on-white text should be checked for WCAG AA compliance
- No skip-to-content link for keyboard users
- Icon-only buttons (hamburger menu) have aria-label but could benefit from visible text on focus
- FAQ accordions should announce expanded state to screen readers

### Conversion Optimization

**Strong elements:**
- Multiple CTAs throughout (not just one hero CTA)
- Modal registration form is well-designed
- Success message provides clear next steps

**Recommendations:**
- Add social proof: "Join 1,000+ people on the waitlist" (if true)
- Consider exit-intent modal for users about to leave
- A/B test hero CTA: "Join Waitlist" vs. "Get Early Access" vs. "Reserve Your Spot"

### Content Hierarchy

**Well-structured:**
1. Hero with clear promise
2. How it works (mechanism)
3. Problem statement (motivation)
4. Privacy reassurance
5. Security details
6. Use cases (application)
7. Comparison (differentiation)
8. Founder story (trust)
9. FAQ (objection handling)

**Recommendation:** Consider moving "Our Story" earlier (possibly #3 or #4) as it's the strongest trust-building element and provides emotional motivation

---

## Priority Fixes (In Order of Impact)

### P0 - Critical (Fix Before Launch)
1. **Clarify "how to check in" mechanism** - Users need to understand how they'll access the "I'm Safe" button
2. **Add evidence for security claims** - SOC 2 and 99.9% uptime need qualification or evidence
3. **Show beta testing or proof of concept** - Safety-critical app needs trust signals
4. **Provide pricing indication or range** - Complete uncertainty creates anxiety

### P1 - High Priority (Fix Before Scaling)
5. **Explain emergency contact experience** - Users need to know what they're asking contacts to do
6. **Clarify initial setup requirements** - What do users need before creating first SafetyNet?
7. **Add contact information** - Real email address or contact method
8. **Create real Privacy Policy** - Even draft version with key principles

### P2 - Medium Priority (Optimize for Conversion)
9. **Add "first-time user journey" section** - Step-by-step onboarding preview
10. **Clarify recurring vs. one-time SafetyNets** - Usage pattern expectations
11. **Address false alarm social cost** - How are relationships protected?
12. **Add practice/test mode info** - Reduce fear of accidental alerts

### P3 - Lower Priority (Polish)
13. **Refine "silent safeguard" language** - May imply passivity
14. **Add third-party validation** - Security audit, advisors, partnerships
15. **Clarify offline capability** - "Works AFTER you go offline" is more accurate
16. **Company information** - Location, structure, funding for transparency

---

## Conclusion

SafetyNet's landing page demonstrates excellent UX storytelling and problem framing. The emotional resonance of the founder story and the clear articulation of the "text me when you're safe" failure point are genuine strengths.

However, as a **safety-critical application**, the page has notable gaps in technical clarity, trust-building, and onboarding guidance that could:
1. **Reduce conversion** - Users may be hesitant to commit without understanding requirements
2. **Create post-signup disappointment** - Expectations set on landing page may not match reality
3. **Increase support burden** - Unclear mechanics will generate user questions
4. **Damage trust** - Unsubstantiated security claims could backfire with technical users

The highest-impact improvements focus on **operational transparency** and **mechanism clarity**. Users don't just need to understand WHY SafetyNet is valuable - they need to understand HOW it works in practice, WHAT it requires from them and their contacts, and WHY they should trust it with their safety.

The foundation is strong. With the recommended clarifications, this landing page could convert significantly higher while setting accurate expectations for the actual product experience.

---

## Appendix: Questions to Resolve Before Launch

These questions arose during the UX review and should be answered in the product design:

1. Can users check in via lock screen notification, or must they open the app?
2. Do users set SafetyNets one-time per activity or can they create recurring patterns?
3. What happens if the user's phone is off when the Safe Time is set, then turned on after?
4. Does the emergency contact need to acknowledge receipt of an alert, or is it fire-and-forget?
5. Can users have multiple emergency contacts for different scenarios?
6. What's the maximum Safe Time duration (1 hour? 24 hours? A week?)
7. If a user manually cancels a SafetyNet before the Safe Time, what notification does the emergency contact get (if any)?
8. Are there usage limits (e.g., number of SafetyNets per month on free tier)?
9. What prevents malicious use (e.g., someone setting a SafetyNet for another person without consent)?
10. How is the system tested to ensure 100% alert delivery?

These operational details don't all need to be on the landing page, but they should be documented for product development and potentially added to an extended FAQ or help documentation.
