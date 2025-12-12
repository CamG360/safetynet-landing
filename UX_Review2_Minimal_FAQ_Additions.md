# SafetyNet Landing Page - Minimal FAQ Additions

**Purpose:** Lean FAQ additions for beta/waitlist landing page
**Focus:** Concept validation, not product documentation
**Implementation:** 15-30 minutes total

---

## 1. CHECK-IN CLARIFICATION

**Add to existing Step 2 description (around line 552):**

```html
<p class="text-slate-500 text-sm text-center leading-relaxed px-2">
    If you are okay, just tap the button. You'll receive reminder notifications -
    <strong class="text-slate-700">tap any notification to check in instantly</strong>. Nothing else happens.
</p>
```

**OR add simple FAQ:**

```html
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="how-it-works">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">How do I check in when my Safe Time arrives?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        You'll receive reminder notifications before your Safe Time. Simply tap any notification to check in -
        works from your lock screen, no need to open the app. You can also check in via the app or voice command.
    </div>
</div>
```

---

## 2. SECURITY - BETA-APPROPRIATE FAQ

**Replace or supplement existing security section (lines 743-803) with FAQ:**

```html
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="privacy">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">What security and reliability measures will SafetyNet have?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-3">
            SafetyNet is currently in beta testing with 50 users. We're building on enterprise-grade infrastructure:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-3">
            <li>Hosted on Amazon Web Services (AWS) with multi-region redundancy</li>
            <li>Bank-level encryption in transit (TLS 1.3) and at rest (AES-256)</li>
            <li>Multi-channel alert delivery (SMS, email, push notifications)</li>
            <li>99.9% uptime target with continuous monitoring</li>
        </ul>
        <p class="text-sm text-slate-700">
            <strong>Our commitment:</strong> We will not launch publicly until we achieve 99.9% alert delivery
            success rate in testing. Security audit scheduled for Q1 2025.
        </p>
    </div>
</div>
```

**Optional: Remove existing security section entirely** and rely on this FAQ.

---

## 3. PRICING - SIMPLE EXPECTATION SETTING

**Replace existing pricing FAQ (lines 1240-1245):**

```html
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="launch-pricing">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">Will SafetyNet be free?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-3">
            We're evaluating pricing options to make SafetyNet accessible while sustaining reliable 24/7 monitoring.
            We expect to offer both free and paid tiers.
        </p>
        <p class="font-semibold text-slate-900">
            Early access waitlist members will receive special benefits and discounted pricing, regardless of final structure.
        </p>
    </div>
</div>
```

---

## 4. EMERGENCY CONTACT - ENHANCED FAQ

**Replace existing FAQ at lines 1248-1257:**

```html
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="getting-started">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">What does my emergency contact need to do?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-3">
            When you add an emergency contact, they receive a one-time confirmation message explaining SafetyNet
            and asking them to accept. Takes 10 seconds, no app required.
        </p>
        <p class="mb-3">
            <strong>After that:</strong> They hear nothing unless an alert triggers. No spam, no updates,
            no interruptions - SafetyNet operates silently unless you need help.
        </p>
        <p class="text-sm text-slate-700">
            <strong>If an alert triggers:</strong> They receive your custom message and instructions via SMS,
            email, and push notification (if they have the app). They'll know exactly what's happening and what to do.
        </p>
    </div>
</div>
```

**Add second FAQ for "what they see":**

```html
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="getting-started">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">Will my emergency contact get spammed with notifications?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-2">
            <strong>No.</strong> Your emergency contact only receives notifications if a safety alert triggers.
            99% of the time, they never hear from SafetyNet.
        </p>
        <p class="text-sm text-slate-600">
            When you check in safely (which is the normal case), nothing is sent to your contact.
            SafetyNet is designed for peace of mind without interrupting anyone's day.
        </p>
    </div>
</div>
```

---

## 5. CONTACT INFO - FOOTER UPDATE

**Update footer (around lines 1294-1305):**

```html
<div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
    <div class="mb-4 md:mb-0">
        <span class="text-white font-bold text-xl tracking-tight">SafetyNet</span>
        <p class="text-sm mt-2">© 2025 SafetyNet App. All rights reserved.</p>
        <p class="text-sm mt-1 text-slate-400">
            <a href="mailto:hello@safetynet.app" class="hover:text-white transition">hello@safetynet.app</a>
        </p>
    </div>
    <div class="flex space-x-6 text-sm">
        <a href="#" class="hover:text-white transition">Privacy Policy</a>
        <a href="#" class="hover:text-white transition">Terms of Service</a>
        <a href="mailto:hello@safetynet.app" class="hover:text-white transition">Contact</a>
    </div>
</div>
```

---

## 6. BETA STATUS TRANSPARENCY

**Add to "Our Story" section or create small banner:**

**Option A - Subtle banner at top of page:**

```html
<!-- Insert after nav, before hero section (around line 364) -->
<div class="bg-blue-50 border-b border-blue-100 py-2 px-4 text-center">
    <p class="text-sm text-slate-700">
        <span class="inline-flex items-center gap-2">
            <i data-lucide="flask-conical" class="w-4 h-4 text-blue-600"></i>
            <strong class="text-blue-900">Currently in Beta:</strong>
            Join the waitlist to help test SafetyNet before public launch
        </span>
    </p>
</div>
```

**Option B - Add to existing "When will SafetyNet be available?" FAQ (line 1227):**

```html
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="launch-pricing">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">When will SafetyNet be available?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-3">
            We're currently in limited beta testing with 50 users, validating alert delivery and user experience
            across different scenarios.
        </p>
        <p class="mb-3">
            Join the waitlist to be among the first to use SafetyNet when we expand access. Early access members
            will get priority access and the opportunity to shape the product with their feedback.
        </p>
        <p class="text-sm text-slate-700">
            <strong>Our commitment:</strong> We won't launch publicly until we achieve 99.9% alert delivery
            reliability in testing.
        </p>
    </div>
</div>
```

---

## IMPLEMENTATION CHECKLIST

**Quick wins (15 minutes):**
- [ ] Add check-in clarification to Step 2 description OR simple FAQ
- [ ] Add email to footer (hello@safetynet.app)
- [ ] Update pricing FAQ with simple expectation setting

**Essential fixes (30 minutes):**
- [ ] Replace/move security section to FAQ with beta-appropriate language
- [ ] Enhance emergency contact FAQ
- [ ] Add "no spam" FAQ
- [ ] Update availability FAQ with beta status

**Total time: 30-45 minutes**

---

## WHAT TO REMOVE

If keeping it minimal for beta/waitlist:

1. **Remove or significantly reduce:** Current security section (lines 743-803) - too detailed for beta
2. **Simplify:** Use cases can be shorter (lines 807-879) - consider reducing from 3 to 2
3. **Consider removing:** "Built for Privacy, Not Spam" section (lines 687-741) - could be FAQ instead

This keeps focus on **concept validation** rather than **product documentation**.

---

## SUMMARY

**Total additions:** 6 FAQ items + 1 footer update + 1 optional banner
**Total removals:** 1 section (security) moved to FAQ
**Net change:** Leaner, more appropriate for beta stage
**Implementation time:** 30-45 minutes

All content is:
- ✅ HTML-ready
- ✅ Beta-appropriate (no overpromising)
- ✅ Honest about development status
- ✅ Focused on concept validation
- ✅ Maintains trust without false authority
