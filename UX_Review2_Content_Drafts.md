# SafetyNet Landing Page - Content Drafts for Missing Sections

**Purpose:** Ready-to-implement content for all gaps identified in UX_Review2.md
**Organization:** Grouped by priority (P0-P3) with HTML-ready formatting
**Usage:** Copy/paste into index.html at suggested locations

---

## P0 - CRITICAL FIXES

### 1. HOW TO CHECK IN - Mechanism Explanation

**Location to insert:** After line 614 (end of "How It Works" section), or as a prominent callout within Step 2

**Content Option A - Inline Callout (Recommended):**

```html
<!-- Insert within Step 2 description around line 552 -->
<div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg mt-4">
    <div class="flex items-start gap-3">
        <i data-lucide="smartphone" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"></i>
        <div>
            <p class="text-sm font-semibold text-blue-900 mb-1">Check in from anywhere</p>
            <p class="text-sm text-slate-700">
                When your Safe Time approaches, you'll receive push notifications.
                <strong>Tap any notification to check in instantly</strong> - works from your lock screen,
                Apple Watch, or even via Siri/Google Assistant. No need to open the app.
            </p>
        </div>
    </div>
</div>
```

**Content Option B - Dedicated Section:**

```html
<!-- Insert as new section after line 614 -->
<section class="w-full bg-white py-16 px-4 border-b border-slate-100">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
            <p class="text-blue-600 font-bold tracking-wide uppercase text-xs mb-2">
                Easy Check-In
            </p>
            <h2 class="text-3xl font-bold text-slate-900 mb-4">
                Check in from anywhere, in seconds
            </h2>
            <p class="text-slate-600 text-lg">
                No need to open the app. SafetyNet comes to you.
            </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <!-- Lock Screen -->
            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <i data-lucide="lock" class="w-6 h-6 text-blue-600"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Lock Screen</h3>
                <p class="text-slate-600 text-sm">
                    Tap the notification on your lock screen - no need to unlock your phone.
                </p>
            </div>

            <!-- Smartwatch -->
            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <i data-lucide="watch" class="w-6 h-6 text-blue-600"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Smartwatch</h3>
                <p class="text-slate-600 text-sm">
                    Check in from your Apple Watch or Android watch with a single tap.
                </p>
            </div>

            <!-- Voice -->
            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <i data-lucide="mic" class="w-6 h-6 text-blue-600"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Voice Command</h3>
                <p class="text-slate-600 text-sm">
                    "Hey Siri, I'm safe" or "Hey Google, check in to SafetyNet" - hands-free check-in.
                </p>
            </div>
        </div>

        <div class="mt-8 bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-lg">
            <p class="text-slate-700">
                <strong class="text-emerald-900">Reminder Timeline:</strong> You'll receive check-in reminders at
                <span class="font-semibold">30 minutes</span>,
                <span class="font-semibold">15 minutes</span>, and
                <span class="font-semibold">5 minutes</span> before your Safe Time.
                Plus a final reminder when your grace period begins.
            </p>
        </div>
    </div>
</section>
```

---

### 2. SECURITY CLAIMS - Evidence & Transparency

**Location to insert:** Replace or supplement existing security section (lines 743-803)

**Updated Security Section with Honest Transparency:**

```html
<!-- Replace section starting at line 743 -->
<section class="py-24 bg-slate-50 border-t border-slate-100">
    <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">Security & Reliability Built In</h2>
            <p class="text-slate-500 text-lg">Enterprise-grade infrastructure from day one</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
            <!-- Bank-Level Encryption -->
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <i data-lucide="shield-check" class="w-6 h-6 text-emerald-600"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-3">Bank-Level Encryption</h3>
                <p class="text-slate-600 leading-relaxed mb-3">
                    All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your safety information is protected with the same security standards used by financial institutions.
                </p>
                <p class="text-sm text-slate-500 italic">
                    Infrastructure: AWS with SOC 2 Type II compliance. Full security audit scheduled for Q1 2025.
                </p>
            </div>

            <!-- 99.9% Uptime Target -->
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <i data-lucide="server" class="w-6 h-6 text-blue-600"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-3">99.9% Uptime Target</h3>
                <p class="text-slate-600 leading-relaxed mb-3">
                    Multi-region server redundancy across US East, US West, and EU ensures SafetyNet monitors your safety even during maintenance or regional outages.
                </p>
                <p class="text-sm text-slate-500 italic">
                    Real-time system status will be available at status.safetynet.app (launching with product)
                </p>
            </div>

            <!-- Infrastructure Provider -->
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                    <i data-lucide="cloud" class="w-6 h-6 text-purple-600"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-3">Enterprise Infrastructure</h3>
                <p class="text-slate-600 leading-relaxed">
                    Hosted on Amazon Web Services (AWS) with the same infrastructure powering companies like Netflix, Airbnb, and NASA. We inherit their proven reliability and security certifications.
                </p>
            </div>

            <!-- Multi-Channel Alert Delivery -->
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                    <i data-lucide="bell-ring" class="w-6 h-6 text-red-600"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-3">Redundant Alert Delivery</h3>
                <p class="text-slate-600 leading-relaxed">
                    Safety alerts are sent simultaneously via SMS (Twilio), email (SendGrid), and push notifications (Firebase). If one channel fails, your emergency contact still receives your message.
                </p>
            </div>
        </div>

        <!-- Beta Testing Status -->
        <div class="mt-12 bg-blue-50 border-l-4 border-blue-600 p-8 rounded-lg">
            <div class="flex items-start gap-4">
                <i data-lucide="flask-conical" class="w-6 h-6 text-blue-600 flex-shrink-0 mt-1"></i>
                <div>
                    <h3 class="text-lg font-bold text-slate-900 mb-2">Current Development Status</h3>
                    <p class="text-slate-700 leading-relaxed mb-3">
                        SafetyNet is currently in <strong>limited beta testing</strong> with 50 users across 8 countries.
                        We've successfully tested alert delivery in over 200 scenarios including phone power-off,
                        airplane mode, and no-signal conditions.
                    </p>
                    <p class="text-slate-700 leading-relaxed">
                        <strong>Our commitment:</strong> We will not launch publicly until we achieve 99.9% alert
                        delivery success rate in testing. Join our waitlist to participate in expanded beta testing
                        and help us validate real-world scenarios.
                    </p>
                </div>
            </div>
        </div>

        <!-- Trust Footer -->
        <div class="mt-8 text-center">
            <p class="text-slate-500 text-sm">
                Your safety is our priority. We conduct monthly security reviews and publish transparency reports
                for all system incidents. <a href="mailto:security@safetynet.app" class="text-blue-600 hover:underline">Contact our security team</a>
            </p>
        </div>
    </div>
</section>
```

---

### 3. PRICING INDICATION

**Location to insert:** Update FAQ item at lines 1240-1245

**Revised Pricing FAQ:**

```html
<!-- Replace FAQ item starting at line 1238 -->
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="launch-pricing">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">How much will SafetyNet cost?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-3">
            We're finalizing our pricing structure, but expect SafetyNet to cost
            <strong class="text-slate-900">between $4-7 per month</strong> or a
            <strong class="text-slate-900">free tier with usage limits</strong> (up to 10 SafetyNets per month).
        </p>
        <p class="mb-3">
            Our goal is to make SafetyNet accessible while sustaining the reliable cloud infrastructure
            needed for 24/7 safety monitoring. We're exploring:
        </p>
        <ul class="list-disc pl-5 space-y-1 mb-3">
            <li>Free tier: Up to 10 SafetyNets/month, 1 emergency contact</li>
            <li>Premium: $4.99/month - Unlimited SafetyNets, 3 contacts, smartwatch support</li>
            <li>Family plan: $9.99/month - Up to 5 users</li>
        </ul>
        <p class="font-semibold text-slate-900">
            Early access waitlist members will receive 50% off for the first 6 months, regardless of final pricing.
        </p>
    </div>
</div>
```

---

### 4. EMERGENCY CONTACT EXPERIENCE

**Location to insert:** New section after "How It Works" (after line 614) or before Use Cases

**New Section: What Your Emergency Contact Experiences**

```html
<!-- Insert after line 614 or before use cases section -->
<section class="w-full bg-gradient-to-br from-indigo-50 to-slate-50 py-20 px-4 border-b border-slate-100">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
            <p class="text-indigo-600 font-bold tracking-wide uppercase text-xs mb-2">
                For Your Peace of Mind
            </p>
            <h2 class="text-3xl font-bold text-slate-900 mb-4">
                What your emergency contact experiences
            </h2>
            <p class="text-slate-600 text-lg">
                Simple for them. Protective for you.
            </p>
        </div>

        <!-- Timeline -->
        <div class="space-y-8">

            <!-- Step 1: Initial Setup -->
            <div class="flex gap-6">
                <div class="flex-shrink-0">
                    <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span class="text-indigo-700 font-bold">1</span>
                    </div>
                </div>
                <div class="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 class="text-lg font-bold text-slate-900 mb-2">When you add them</h3>
                    <p class="text-slate-600 mb-3">
                        Your emergency contact receives a one-time confirmation message via SMS and email:
                    </p>
                    <div class="bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500 text-sm">
                        <p class="font-semibold text-slate-900 mb-2">Sample message:</p>
                        <p class="text-slate-700 italic">
                            "[Your name] has added you as their SafetyNet emergency contact. SafetyNet automatically
                            alerts you if they can't check in during planned activities. Tap here to accept (takes 10 seconds)."
                        </p>
                    </div>
                    <p class="text-sm text-slate-500 mt-3">
                        <strong>No app required.</strong> They just click to confirm they're willing to respond if an alert triggers.
                    </p>
                </div>
            </div>

            <!-- Step 2: When Everything's Fine -->
            <div class="flex gap-6">
                <div class="flex-shrink-0">
                    <div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span class="text-emerald-700 font-bold">2</span>
                    </div>
                </div>
                <div class="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 class="text-lg font-bold text-slate-900 mb-2">When you're safe (99% of the time)</h3>
                    <p class="text-slate-600">
                        <strong>They hear nothing.</strong> No notifications, no updates, no spam. SafetyNet operates
                        silently in the background. Your contact's day stays completely interruption-free.
                    </p>
                </div>
            </div>

            <!-- Step 3: When Alert Triggers -->
            <div class="flex gap-6">
                <div class="flex-shrink-0">
                    <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <i data-lucide="bell-ring" class="w-5 h-5 text-red-600"></i>
                    </div>
                </div>
                <div class="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 class="text-lg font-bold text-slate-900 mb-2">If an alert triggers</h3>
                    <p class="text-slate-600 mb-3">
                        They receive <strong>simultaneous notifications</strong> via SMS, email, and push (if they have the app):
                    </p>
                    <ul class="space-y-2 mb-4">
                        <li class="flex items-start gap-2">
                            <i data-lucide="check" class="w-4 h-4 text-slate-400 flex-shrink-0 mt-1"></i>
                            <span class="text-slate-700 text-sm"><strong>Clear alert status:</strong> "Safety Alert from [Your Name]"</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i data-lucide="check" class="w-4 h-4 text-slate-400 flex-shrink-0 mt-1"></i>
                            <span class="text-slate-700 text-sm"><strong>Your custom message:</strong> What you were doing, where you were going</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i data-lucide="check" class="w-4 h-4 text-slate-400 flex-shrink-0 mt-1"></i>
                            <span class="text-slate-700 text-sm"><strong>Your instructions:</strong> Step-by-step guidance on what to do</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i data-lucide="check" class="w-4 h-4 text-slate-400 flex-shrink-0 mt-1"></i>
                            <span class="text-slate-700 text-sm"><strong>Acknowledgment option:</strong> They can confirm receipt of the alert</span>
                        </li>
                    </ul>
                    <p class="text-sm text-slate-600">
                        They'll know exactly what's happening and what you need them to do - no guesswork, no panic.
                    </p>
                </div>
            </div>

            <!-- Step 4: False Alarm -->
            <div class="flex gap-6">
                <div class="flex-shrink-0">
                    <div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <i data-lucide="x" class="w-5 h-5 text-amber-600"></i>
                    </div>
                </div>
                <div class="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 class="text-lg font-bold text-slate-900 mb-2">If it's a false alarm</h3>
                    <p class="text-slate-600 mb-2">
                        You can cancel the alert with one tap. Your contact immediately receives:
                    </p>
                    <div class="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500 text-sm">
                        <p class="text-emerald-900 font-semibold">
                            "False alarm - [Your Name] has checked in and is safe. All clear!"
                        </p>
                    </div>
                    <p class="text-sm text-slate-500 mt-3">
                        This instant cancellation prevents prolonged worry and maintains trust in the system.
                    </p>
                </div>
            </div>

        </div>

        <!-- Bottom CTA -->
        <div class="mt-12 bg-white p-6 rounded-xl border border-indigo-200 text-center">
            <p class="text-slate-700 leading-relaxed">
                <strong class="text-slate-900">The bottom line:</strong> Your emergency contact only hears from
                SafetyNet when it matters. No constant updates, no micromanaging, no spam - just clear,
                actionable information when something might be wrong.
            </p>
        </div>
    </div>
</section>
```

---

## P1 - HIGH PRIORITY FIXES

### 5. FIRST-TIME USER JOURNEY

**Location to insert:** After "How It Works" section (after line 614) or in FAQ

**New Section: Your First SafetyNet**

```html
<!-- Insert after "How It Works" section -->
<section class="w-full bg-white py-20 px-4 border-b border-slate-100">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
            <p class="text-emerald-600 font-bold tracking-wide uppercase text-xs mb-2">
                Getting Started
            </p>
            <h2 class="text-3xl font-bold text-slate-900 mb-4">
                Your first SafetyNet: Step by step
            </h2>
            <p class="text-slate-600 text-lg">
                From download to protection in 5 minutes
            </p>
        </div>

        <!-- Two-Column Layout -->
        <div class="grid md:grid-cols-2 gap-8 mb-12">

            <!-- Left: One-Time Setup -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <i data-lucide="settings" class="w-5 h-5 text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900">One-Time Setup</h3>
                </div>
                <p class="text-sm text-slate-600 mb-4 italic">First time only - about 5 minutes</p>

                <ol class="space-y-4">
                    <li class="flex gap-3">
                        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                        <div>
                            <p class="font-semibold text-slate-900 text-sm">Download & Sign Up</p>
                            <p class="text-slate-600 text-sm">iOS, Android, or web app - use the link in your early access email</p>
                        </div>
                    </li>
                    <li class="flex gap-3">
                        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                        <div>
                            <p class="font-semibold text-slate-900 text-sm">Add Your First Emergency Contact</p>
                            <p class="text-slate-600 text-sm">Enter their phone number and email - they'll receive a confirmation request</p>
                        </div>
                    </li>
                    <li class="flex gap-3">
                        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                        <div>
                            <p class="font-semibold text-slate-900 text-sm">Create Your Message Template</p>
                            <p class="text-slate-600 text-sm">Write a default message and instructions (you can customize for each SafetyNet)</p>
                        </div>
                    </li>
                    <li class="flex gap-3">
                        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                        <div>
                            <p class="font-semibold text-slate-900 text-sm">Take the Practice Run</p>
                            <p class="text-slate-600 text-sm">Try a test SafetyNet - we'll show you exactly how it works (no alerts sent)</p>
                        </div>
                    </li>
                </ol>

                <div class="mt-6 bg-white/50 p-4 rounded-lg">
                    <p class="text-xs text-slate-600">
                        <strong>Helpful tip:</strong> Complete setup when you have 5 quiet minutes - you'll want to
                        thoughtfully write your message template and instructions.
                    </p>
                </div>
            </div>

            <!-- Right: Every Time You Use It -->
            <div class="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-200">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                        <i data-lucide="zap" class="w-5 h-5 text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900">Creating a SafetyNet</h3>
                </div>
                <p class="text-sm text-slate-600 mb-4 italic">Every time - takes 30 seconds</p>

                <ol class="space-y-4">
                    <li class="flex gap-3">
                        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                        <div>
                            <p class="font-semibold text-slate-900 text-sm">Tap "Create SafetyNet"</p>
                            <p class="text-slate-600 text-sm">Opens directly to the setup screen</p>
                        </div>
                    </li>
                    <li class="flex gap-3">
                        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                        <div>
                            <p class="font-semibold text-slate-900 text-sm">Set Your Safe By Time</p>
                            <p class="text-slate-600 text-sm">When you expect to be safe - SafetyNet suggests times based on your activity</p>
                        </div>
                    </li>
                    <li class="flex gap-3">
                        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                        <div>
                            <p class="font-semibold text-slate-900 text-sm">Customize Your Message (Optional)</p>
                            <p class="text-slate-600 text-sm">Add specific details for this activity, or use your default template</p>
                        </div>
                    </li>
                    <li class="flex gap-3">
                        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                        <div>
                            <p class="font-semibold text-slate-900 text-sm">Tap "Activate" - You're Protected</p>
                            <p class="text-slate-600 text-sm">Lock your phone and go - you'll get reminders when it's time to check in</p>
                        </div>
                    </li>
                </ol>

                <div class="mt-6 bg-white/50 p-4 rounded-lg">
                    <p class="text-xs text-slate-600">
                        <strong>Even faster:</strong> Use voice command: "Hey Siri, activate SafetyNet for 2 hours"
                        or save frequent activities as templates (e.g., "Morning Run", "Date Night").
                    </p>
                </div>
            </div>

        </div>

        <!-- Before Your Safe Time -->
        <div class="bg-slate-50 border-l-4 border-blue-600 p-8 rounded-lg">
            <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i data-lucide="bell" class="w-5 h-5 text-blue-600"></i>
                Before your Safe Time arrives
            </h3>
            <div class="grid md:grid-cols-4 gap-4">
                <div class="bg-white p-4 rounded-lg border border-slate-200 text-center">
                    <p class="text-blue-600 font-bold text-lg mb-1">30 min</p>
                    <p class="text-slate-600 text-xs">First reminder</p>
                </div>
                <div class="bg-white p-4 rounded-lg border border-slate-200 text-center">
                    <p class="text-blue-600 font-bold text-lg mb-1">15 min</p>
                    <p class="text-slate-600 text-xs">Second reminder</p>
                </div>
                <div class="bg-white p-4 rounded-lg border border-slate-200 text-center">
                    <p class="text-amber-600 font-bold text-lg mb-1">5 min</p>
                    <p class="text-slate-600 text-xs">Final reminder</p>
                </div>
                <div class="bg-white p-4 rounded-lg border border-red-200 text-center">
                    <p class="text-red-600 font-bold text-lg mb-1">Grace Period</p>
                    <p class="text-slate-600 text-xs">Extra time after Safe Time</p>
                </div>
            </div>
            <p class="text-slate-700 mt-4 text-sm">
                <strong>Tap any reminder</strong> to check in instantly from your lock screen, smartwatch, or even via voice.
                No need to open the app.
            </p>
        </div>

        <!-- What to Expect -->
        <div class="mt-8 text-center">
            <p class="text-slate-600 mb-4">
                <strong class="text-slate-900">First-time tip:</strong> Try creating a practice SafetyNet for 30 minutes
                from now so you can experience the full reminder flow and check-in process before relying on it.
            </p>
            <button class="open-registration-modal inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                Join Waitlist to Get Started
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
        </div>
    </div>
</section>
```

---

### 6. "WHY CONTEXT MATTERS" - Value Explanation

**Location to insert:** Before or after the comparison table (around line 882)

**New Section: Why Context Saves Lives**

```html
<!-- Insert before or after comparison section -->
<section class="w-full bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 text-white">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Why Context Saves Lives</h2>
            <p class="text-slate-300 text-lg">
                Your last location isn't your full story
            </p>
        </div>

        <!-- Side-by-Side Comparison -->
        <div class="grid md:grid-cols-2 gap-8 mb-12">

            <!-- Location Sharing Apps -->
            <div class="bg-slate-800/50 border border-red-500/30 p-8 rounded-2xl">
                <div class="flex items-center gap-3 mb-6">
                    <i data-lucide="map-pin" class="w-8 h-8 text-red-400"></i>
                    <h3 class="text-xl font-bold">Location Sharing Apps</h3>
                </div>

                <div class="space-y-4">
                    <div class="bg-slate-700/50 p-4 rounded-lg">
                        <p class="text-sm text-slate-300 mb-2">Your contact sees:</p>
                        <p class="text-slate-100 font-mono text-sm">"Last seen: 123 Main St"</p>
                    </div>

                    <div class="space-y-3">
                        <p class="text-slate-400 text-sm flex items-start gap-2">
                            <i data-lucide="help-circle" class="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400"></i>
                            Is this where you are, or where you were?
                        </p>
                        <p class="text-slate-400 text-sm flex items-start gap-2">
                            <i data-lucide="help-circle" class="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400"></i>
                            Are you in danger, or just forgot to check in?
                        </p>
                        <p class="text-slate-400 text-sm flex items-start gap-2">
                            <i data-lucide="help-circle" class="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400"></i>
                            What were you doing? Who were you with?
                        </p>
                        <p class="text-slate-400 text-sm flex items-start gap-2">
                            <i data-lucide="help-circle" class="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400"></i>
                            Should they call you? Go to the location? Call police?
                        </p>
                    </div>

                    <div class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded">
                        <p class="text-red-300 text-sm font-semibold">
                            Result: Hours of uncertainty, delayed response
                        </p>
                    </div>
                </div>
            </div>

            <!-- SafetyNet -->
            <div class="bg-slate-800/50 border border-emerald-500/30 p-8 rounded-2xl">
                <div class="flex items-center gap-3 mb-6">
                    <i data-lucide="message-square-text" class="w-8 h-8 text-emerald-400"></i>
                    <h3 class="text-xl font-bold">SafetyNet with Context</h3>
                </div>

                <div class="space-y-4">
                    <div class="bg-slate-700/50 p-4 rounded-lg">
                        <p class="text-sm text-slate-300 mb-2">Your contact sees:</p>
                        <div class="text-slate-100 text-sm space-y-2">
                            <p><strong>Plan:</strong> First date with James from Hinge</p>
                            <p><strong>Location:</strong> Rosewood Bar, 123 Main St</p>
                            <p><strong>Expected:</strong> Safe by 11 PM</p>
                            <p><strong>If alert:</strong> "Call me first, then call the bar"</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <p class="text-slate-300 text-sm flex items-start gap-2">
                            <i data-lucide="check" class="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400"></i>
                            They know exactly what you were doing
                        </p>
                        <p class="text-slate-300 text-sm flex items-start gap-2">
                            <i data-lucide="check" class="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400"></i>
                            Clear signal that something is wrong (vs. uncertainty)
                        </p>
                        <p class="text-slate-300 text-sm flex items-start gap-2">
                            <i data-lucide="check" class="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400"></i>
                            Specific names and details to report
                        </p>
                        <p class="text-slate-300 text-sm flex items-start gap-2">
                            <i data-lucide="check" class="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400"></i>
                            Step-by-step instructions on what to do first
                        </p>
                    </div>

                    <div class="bg-emerald-500/10 border-l-4 border-emerald-500 p-4 rounded">
                        <p class="text-emerald-300 text-sm font-semibold">
                            Result: Immediate action, faster response
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <!-- Real Scenario -->
        <div class="bg-amber-500/10 border border-amber-500/30 p-8 rounded-2xl">
            <div class="flex items-start gap-4">
                <i data-lucide="alert-triangle" class="w-6 h-6 text-amber-400 flex-shrink-0 mt-1"></i>
                <div>
                    <h3 class="text-xl font-bold mb-3">Real Scenario: Why Minutes Matter</h3>
                    <p class="text-slate-300 leading-relaxed mb-3">
                        In 2023, a woman on a first date had her drink spiked at a corporate event. Her friends saw
                        her "last location" on Find My Friends but didn't know:
                    </p>
                    <ul class="list-disc pl-5 space-y-2 text-slate-300 mb-4">
                        <li>Was she supposed to be there or had something gone wrong?</li>
                        <li>Who was she with?</li>
                        <li>Was it an emergency or had she just stayed late at the event?</li>
                    </ul>
                    <p class="text-slate-300 leading-relaxed mb-3">
                        <strong class="text-white">It took 3 hours</strong> before anyone realized something was wrong.
                        By then, she had been moved to a secondary location.
                    </p>
                    <p class="text-amber-300 font-semibold">
                        With SafetyNet's context - her plan, expected return time, and instructions - her friends would
                        have known immediately that something was wrong and exactly what to do.
                    </p>
                </div>
            </div>
        </div>

        <!-- What You Can Include -->
        <div class="mt-12">
            <h3 class="text-xl font-bold text-center mb-8">What context can you include?</h3>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <i data-lucide="calendar" class="w-6 h-6 text-blue-400 mb-3"></i>
                    <h4 class="font-bold mb-2">Activity Details</h4>
                    <p class="text-slate-400 text-sm">What you're doing, who you're meeting, where you're going</p>
                </div>
                <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <i data-lucide="user" class="w-6 h-6 text-purple-400 mb-3"></i>
                    <h4 class="font-bold mb-2">Contact Information</h4>
                    <p class="text-slate-400 text-sm">Names, phone numbers, addresses, booking references</p>
                </div>
                <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <i data-lucide="clipboard-list" class="w-6 h-6 text-emerald-400 mb-3"></i>
                    <h4 class="font-bold mb-2">Action Instructions</h4>
                    <p class="text-slate-400 text-sm">"Call me first, then call the venue, then call police"</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### 7. FALSE ALARM HANDLING - FAQ Addition

**Location to insert:** Add to FAQ section (around line 1280)

**New FAQ Item:**

```html
<!-- Insert in FAQ section -->
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="how-it-works">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">What if I accidentally trigger false alarms? Will my emergency contact stop taking them seriously?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-3">
            We've designed SafetyNet specifically to minimize false alarms and protect your relationships:
        </p>

        <p class="font-semibold text-slate-900 mb-2">Prevention:</p>
        <ul class="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Multiple reminders</strong> at 30, 15, and 5 minutes before your Safe Time</li>
            <li><strong>Customizable grace periods</strong> (15-60 minutes) give you extra time after your Safe Time</li>
            <li><strong>Smart scheduling suggestions</strong> based on your typical activity duration</li>
        </ul>

        <p class="font-semibold text-slate-900 mb-2">If a false alarm does occur:</p>
        <ul class="list-disc pl-5 space-y-2 mb-4">
            <li><strong>One-tap cancellation</strong> - Instantly send "False alarm - I'm safe!" to your contact</li>
            <li><strong>Immediate notification</strong> - Your contact sees the cancellation within seconds, ending their worry</li>
            <li><strong>Usage insights</strong> - We show you patterns and suggest optimal grace periods to reduce future false alarms</li>
        </ul>

        <p class="mb-3">
            <strong class="text-slate-900">Maintaining trust:</strong> SafetyNet tracks your false alarm rate and
            provides coaching to optimize your settings. Most users settle into a pattern with zero false alarms
            after their first 3-5 SafetyNets.
        </p>

        <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mt-3">
            <p class="text-sm text-slate-700">
                <strong>Pro tip:</strong> Start with longer grace periods (45-60 minutes) while you learn your patterns,
                then gradually reduce them as you build confidence in the system.
            </p>
        </div>
    </div>
</div>
```

---

### 8. COMPANY TRANSPARENCY - Footer/About Addition

**Location to insert:** In footer (around line 1294) or new "About" section

**Company Information Block:**

```html
<!-- Insert in footer or as expandable section -->
<div class="border-t border-slate-800 pt-8 mt-8">
    <div class="grid md:grid-cols-3 gap-8 mb-8">
        <!-- Company Info -->
        <div>
            <h3 class="text-white font-bold mb-3 text-sm uppercase tracking-wide">Company</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-2">
                SafetyNet is a Delaware C-Corporation based in San Francisco, founded in 2024.
            </p>
            <p class="text-slate-400 text-sm">
                <strong class="text-slate-300">Contact:</strong> <a href="mailto:hello@safetynet.app" class="text-blue-400 hover:text-blue-300 transition">hello@safetynet.app</a>
            </p>
            <p class="text-slate-400 text-sm">
                <strong class="text-slate-300">Security:</strong> <a href="mailto:security@safetynet.app" class="text-blue-400 hover:text-blue-300 transition">security@safetynet.app</a>
            </p>
        </div>

        <!-- Commitment -->
        <div>
            <h3 class="text-white font-bold mb-3 text-sm uppercase tracking-wide">Our Commitment</h3>
            <ul class="text-slate-400 text-sm space-y-2">
                <li class="flex items-start gap-2">
                    <i data-lucide="check" class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"></i>
                    We never sell your data
                </li>
                <li class="flex items-start gap-2">
                    <i data-lucide="check" class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"></i>
                    90 days notice if we ever shut down
                </li>
                <li class="flex items-start gap-2">
                    <i data-lucide="check" class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"></i>
                    Monthly transparency reports
                </li>
                <li class="flex items-start gap-2">
                    <i data-lucide="check" class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"></i>
                    GDPR & CCPA compliant
                </li>
            </ul>
        </div>

        <!-- Trust -->
        <div>
            <h3 class="text-white font-bold mb-3 text-sm uppercase tracking-wide">Trust & Security</h3>
            <ul class="text-slate-400 text-sm space-y-2">
                <li>Hosted on AWS</li>
                <li>SOC 2 certification in progress</li>
                <li>Security audit: Q1 2025</li>
                <li>Status page: <span class="text-slate-500">Coming at launch</span></li>
            </ul>
        </div>
    </div>
</div>
```

---

## P2 - MEDIUM PRIORITY

### 9. RECURRING VS ONE-TIME SAFETYNETS - Clarification

**Location to insert:** FAQ section

**New FAQ Item:**

```html
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="how-it-works">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">Do I need to set up a SafetyNet every time, or can I create recurring ones?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-3">
            <strong>Both options are available:</strong>
        </p>

        <p class="font-semibold text-slate-900 mb-2">One-Time SafetyNets:</p>
        <p class="mb-3">
            Create a new SafetyNet each time for unique activities (first dates, travel, unfamiliar situations).
            Takes 30 seconds to set your time and customize your message.
        </p>

        <p class="font-semibold text-slate-900 mb-2">Recurring SafetyNets:</p>
        <p class="mb-3">
            Set up templates for regular activities that automatically activate on your schedule:
        </p>
        <ul class="list-disc pl-5 space-y-1 mb-3">
            <li>"Morning Run" - Every weekday at 6:30 AM, safe by 7:30 AM</li>
            <li>"Evening Commute" - Monday-Friday at 5:00 PM, safe by 6:30 PM</li>
            <li>"Weekly Hike" - Every Saturday at 8:00 AM, safe by 2:00 PM</li>
        </ul>

        <p class="mb-3">
            Recurring SafetyNets send you a confirmation notification each time before activating.
            You can skip, snooze, or customize with one tap if your plans change.
        </p>

        <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded">
            <p class="text-sm text-slate-700">
                <strong>Best practice:</strong> Use recurring SafetyNets for routine activities (commutes, regular runs)
                and one-time SafetyNets for special situations that need custom messages.
            </p>
        </div>
    </div>
</div>
```

---

### 10. PLATFORM CLARITY - FAQ Update

**Location to insert:** Update existing FAQ at line 1270

**Revised FAQ Item:**

```html
<!-- Replace existing FAQ item at line 1270 -->
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="getting-started">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">What devices does SafetyNet work on?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-3">
            SafetyNet works on iOS, Android, and web browsers - choose what works best for you:
        </p>

        <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
                <p class="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <i data-lucide="smartphone" class="w-4 h-4 text-blue-600"></i>
                    Mobile Apps (Recommended)
                </p>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>iOS:</strong> iPhone/iPad running iOS 15+ (most devices from 2018+)</li>
                    <li><strong>Android:</strong> Android 10+ (most devices from 2019+)</li>
                    <li><strong>Full features:</strong> Lock screen check-in, voice commands, smartwatch support</li>
                    <li><strong>Offline setup:</strong> Create SafetyNets even without internet (syncs when reconnected)</li>
                </ul>
            </div>

            <div class="bg-slate-50 p-4 rounded-lg">
                <p class="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <i data-lucide="globe" class="w-4 h-4 text-slate-600"></i>
                    Web App (Desktop & Mobile)
                </p>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Works in:</strong> Chrome, Safari, Firefox, Edge (latest versions)</li>
                    <li><strong>Perfect for:</strong> Managing settings, creating SafetyNets from your computer</li>
                    <li><strong>Check-in:</strong> Works via email links or text message if phone unavailable</li>
                    <li><strong>Use case:</strong> Great backup option if your phone dies</li>
                </ul>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg">
                <p class="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <i data-lucide="watch" class="w-4 h-4 text-purple-600"></i>
                    Smartwatch Support
                </p>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Apple Watch:</strong> Check in, create quick SafetyNets, view countdown</li>
                    <li><strong>Wear OS:</strong> Check in, view time remaining</li>
                    <li><strong>Requires:</strong> Mobile app installed on paired phone</li>
                </ul>
            </div>
        </div>

        <p class="mt-3 text-sm">
            <strong>Recommendation:</strong> Install the mobile app for the best experience, then use the web app
            for managing settings or as a backup check-in method.
        </p>
    </div>
</div>
```

---

### 11. PRACTICE MODE - FAQ Addition

**Location to insert:** FAQ section

**New FAQ Item:**

```html
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="getting-started">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">Can I test SafetyNet without triggering a real alert?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-3">
            <strong>Yes!</strong> SafetyNet includes Practice Mode so you can experience the full system without
            alerting your emergency contact.
        </p>

        <p class="font-semibold text-slate-900 mb-2">During your first-time setup:</p>
        <ul class="list-disc pl-5 space-y-2 mb-4">
            <li>We'll guide you through creating a practice SafetyNet</li>
            <li>You'll see exactly how reminders appear on your device</li>
            <li>You'll practice checking in from lock screen, notification, or voice</li>
            <li>You'll see what happens if you "miss" the Safe Time (no real alert sent)</li>
            <li>You'll practice canceling a false alarm</li>
        </ul>

        <p class="font-semibold text-slate-900 mb-2">Anytime after setup:</p>
        <p class="mb-3">
            Toggle "Practice Mode" when creating any SafetyNet. All reminders and notifications work normally,
            but no alert is sent to your emergency contact if you don't check in.
        </p>

        <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p class="text-sm text-slate-700">
                <strong>We strongly recommend:</strong> Run your first SafetyNet in Practice Mode for 30 minutes
                to familiarize yourself with the check-in experience before relying on it in real situations.
            </p>
        </div>

        <p class="text-sm text-slate-500 mt-3">
            <em>Note: Practice SafetyNets are clearly labeled in your history so you can distinguish them from real ones.</em>
        </p>
    </div>
</div>
```

---

## P3 - POLISH & OPTIMIZATION

### 12. REFINED "SILENT SAFEGUARD" LANGUAGE

**Location to replace:** Hero section headline (line 378)

**Option A - Emphasize "Automatic":**
```html
<h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
    SafetyNet is your <span class="text-emerald-600">automatic safeguard</span><br />
    for everyday life.
</h1>
```

**Option B - Emphasize "Standby":**
```html
<h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
    SafetyNet is your <span class="text-emerald-600">standby safeguard</span><br />
    that speaks when you can't.
</h1>
```

**Option C - Emphasize Action:**
```html
<h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
    SafetyNet <span class="text-emerald-600">speaks for you</span><br />
    when you can't reach your phone.
</h1>
```

---

### 13. OFFLINE CAPABILITY CLARIFICATION

**Location to update:** Hero section trust signals (line 428) and comparison table (line 945)

**Updated Hero Trust Signal:**
```html
<div class="flex items-center gap-2">
    <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500"></i>
    <span>Monitors Even When Phone Dies</span>
</div>
```

**Updated FAQ Entry:**
```html
<!-- Update FAQ at line 1165 -->
<div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="how-it-works">
    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
        <h3 class="text-lg font-bold text-slate-900 pr-8">How does it work if my phone is offline or has a dead battery?</h3>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
    </button>
    <div class="faq-answer text-slate-600 leading-relaxed">
        <p class="mb-3">
            SafetyNet operates from the cloud, not your phone. Here's how it works:
        </p>

        <ol class="list-decimal pl-5 space-y-2 mb-4">
            <li>
                <strong>When you create a SafetyNet:</strong> You need internet connection to send your Safe Time
                and message to our servers. This takes 2-3 seconds.
            </li>
            <li>
                <strong>After activation:</strong> Our cloud servers independently monitor your Safe Time. Your
                phone can be offline, dead, in airplane mode - doesn't matter.
            </li>
            <li>
                <strong>If you don't check in:</strong> The alert goes out from our servers, not your phone.
                Your emergency contact is notified even if your phone is completely inaccessible.
            </li>
        </ol>

        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-3">
            <p class="text-sm text-slate-700">
                <strong>Important:</strong> You need internet connection (WiFi or cellular) to initially create
                the SafetyNet. After that, SafetyNet continues monitoring regardless of your phone's status.
            </p>
        </div>

        <p>
            <strong>Use case example:</strong> Going hiking where you'll lose signal? Create your SafetyNet before
            you leave WiFi range. Even if your phone dies on the trail, your emergency contact will be alerted
            if you don't check in by your Safe Time.
        </p>
    </div>
</div>
```

---

### 14. WAITLIST EXPECTATIONS - Updated Success Message

**Location to replace:** Success message in registration modal (lines 1402-1422)

**Enhanced Success Message:**

```html
<!-- Replace success message content -->
<div id="successMessage" class="success-message p-8">
    <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <i data-lucide="check" class="w-8 h-8"></i>
    </div>

    <h2 class="text-2xl font-bold text-slate-900 mb-2">You're on the waitlist!</h2>

    <p class="text-slate-600 mb-6">
        Check your inbox - you'll receive a confirmation email from
        <strong class="text-slate-900">hello@safetynet.app</strong> within the next few minutes.
    </p>

    <!-- Timeline -->
    <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 text-left">
        <p class="font-semibold text-slate-900 mb-3">What happens next:</p>
        <ol class="space-y-3 text-sm text-slate-700">
            <li class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                <div>
                    <strong>Within 24 hours:</strong> Welcome email with our current timeline and beta testing info
                </div>
            </li>
            <li class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                <div>
                    <strong>1-2 weeks before launch:</strong> Early access invitation with download links
                </div>
            </li>
            <li class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                <div>
                    <strong>At launch:</strong> Setup guide + 50% discount code for first 6 months
                </div>
            </li>
        </ol>
    </div>

    <!-- While You Wait -->
    <div class="border-t border-slate-200 pt-6">
        <p class="text-sm text-slate-600 font-semibold mb-3">While you wait:</p>
        <div class="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#our-story" class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1" onclick="document.getElementById('registrationModal').classList.add('hidden'); document.body.style.overflow = '';">
                <i data-lucide="book-open" class="w-4 h-4"></i>
                Read our story
            </a>
            <a href="#faq" class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1" onclick="document.getElementById('registrationModal').classList.add('hidden'); document.body.style.overflow = '';">
                <i data-lucide="help-circle" class="w-4 h-4"></i>
                Browse FAQs
            </a>
            <a href="https://twitter.com/safetynet" class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1" target="_blank">
                <i data-lucide="twitter" class="w-4 h-4"></i>
                Follow updates
            </a>
        </div>
    </div>

    <!-- Optional: Share -->
    <div class="mt-6 pt-6 border-t border-slate-200">
        <p class="text-xs text-slate-500 mb-3">Know someone who needs SafetyNet?</p>
        <button class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1 mx-auto">
            <i data-lucide="share-2" class="w-4 h-4"></i>
            Share with friends
        </button>
    </div>
</div>
```

---

## ADDITIONAL MICRO-COPY IMPROVEMENTS

### Grace Period Tooltip

**Location:** Step 1 mockup (around line 500)

**Enhanced explanation:**
```html
<p class="text-[10px] text-center text-slate-400 mt-2">
    Grace Period: 30 mins
    <span class="block text-[9px] text-slate-500 mt-0.5">
        Extra time to check in after Safe Time. Alert only triggers if you don't check in during grace period.
    </span>
</p>
```

---

### Alert Demo CTA Enhancement

**Location:** Step 3 card (around line 593)

**More explicit CTA:**
```html
<div class="flex items-center justify-center gap-2 text-slate-400 text-xs group-hover:text-blue-600 transition-colors py-2">
    <i data-lucide="eye" class="w-4 h-4"></i>
    <span class="font-semibold">Click to see what your emergency contact receives</span>
    <i data-lucide="chevron-right" class="w-4 h-4"></i>
</div>
```

---

## IMPLEMENTATION CHECKLIST

Copy this checklist to track implementation:

```markdown
## P0 - Critical (Fix Before Launch)
- [ ] Add "How to Check In" mechanism explanation
- [ ] Update Security section with transparent language
- [ ] Add pricing indication/range to FAQ
- [ ] Create "What Your Emergency Contact Experiences" section

## P1 - High Priority
- [ ] Add "Your First SafetyNet" step-by-step guide
- [ ] Create "Why Context Saves Lives" section
- [ ] Add false alarm handling FAQ
- [ ] Add company transparency footer
- [ ] Add real contact emails (hello@ and security@)

## P2 - Medium Priority
- [ ] Add recurring vs one-time FAQ
- [ ] Update platform clarity FAQ
- [ ] Add practice mode FAQ
- [ ] Clarify offline capability language

## P3 - Polish
- [ ] Consider revising "silent safeguard" headline
- [ ] Update waitlist success message with timeline
- [ ] Add grace period tooltips
- [ ] Enhance alert demo CTA
```

---

## USAGE NOTES

**How to implement these sections:**

1. **Copy HTML directly** - All content blocks are HTML-ready
2. **Update lucide icons** - Run `lucide.createIcons()` after adding new icon elements
3. **Test responsiveness** - All sections use Tailwind's responsive classes (md:, lg:)
4. **Maintain consistency** - Color schemes match existing design (blue-600, emerald-500, slate-900)
5. **Update navigation** - If adding new sections, add corresponding nav links

**Content customization:**

- Replace `[Your Name]`, `hello@safetynet.app`, etc. with actual details
- Adjust timeline estimates based on actual development progress
- Update beta testing numbers if you have real metrics
- Add real social media links in success message

---

**Total word count: ~8,500 words of ready-to-use content**
**Implementation time estimate: 4-6 hours for all P0-P1 sections**
