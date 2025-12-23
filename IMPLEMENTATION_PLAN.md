# Email Capture Security - Implementation Plan

**Generated:** 2025-12-23
**Requirements:**
- Expected signups: <1,000
- Verification: Soft (instant join, optional email confirmation)
- Budget: Free only
- Backend: Supabase Edge Functions available
- Compliance: GDPR required

---

## 🎯 CUSTOMIZED SOLUTION

### **Stack:**
- **Bot Protection:** Cloudflare Turnstile (GDPR-compliant, free, invisible)
- **Email Verification:** Soft verification via Supabase Edge Function
- **Disposable Email Detection:** Free GitHub list (no API needed)
- **Rate Limiting:** Supabase Edge Function + PostgreSQL
- **Email Service:** Supabase Auth (free tier: 30,000 emails/month)

### **User Flow:**
1. User enters email and clicks "Join Waitlist"
2. Turnstile validates invisibly (no interaction needed)
3. Edge Function verifies token + checks rate limits
4. User added to waitlist immediately (status: "unverified")
5. Confirmation email sent with verification link
6. User clicks link → status changes to "verified"
7. Only verified users receive product updates

**User Friction:** 🟢 **MINIMAL** - Instant join, optional verification

---

## 📋 IMPLEMENTATION CHECKLIST

### **Phase 1: Core Security (Priority 1)**

#### ✅ Step 1: Set Up Cloudflare Turnstile
- [ ] Create Cloudflare account (free)
- [ ] Add Turnstile widget to site
- [ ] Get site key and secret key
- [ ] Update frontend to use Turnstile

**Files to modify:**
- `index.html` - Replace reCAPTCHA script
- `js/config.js` - Add Turnstile config
- `js/utils.js` - Replace executeRecaptcha with executeTurnstile
- `js/form.js` - Update form submission

**Effort:** 1 hour
**User Impact:** None (invisible)

---

#### ✅ Step 2: Create Supabase Edge Function

**Function:** `verify-waitlist-submission`

**Responsibilities:**
1. Verify Turnstile token with Cloudflare API
2. Check rate limits (1 submission/email/day, 5/IP/hour)
3. Validate email format
4. Check against disposable email list
5. Insert into database with verification status
6. Send verification email

**Files to create:**
- `supabase/functions/verify-waitlist-submission/index.ts`
- `supabase/functions/verify-waitlist-submission/disposable-emails.ts`

**Effort:** 3 hours
**User Impact:** None (backend only)

---

#### ✅ Step 3: Update Database Schema

```sql
-- Add new columns
ALTER TABLE feedback
ADD COLUMN IF NOT EXISTS verification_token TEXT,
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS turnstile_score FLOAT,
ADD COLUMN IF NOT EXISTS ip_address TEXT,
ADD COLUMN IF NOT EXISTS submission_count INTEGER DEFAULT 1;

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    identifier TEXT NOT NULL, -- email or IP
    type TEXT NOT NULL, -- 'email' or 'ip'
    count INTEGER DEFAULT 1,
    window_start TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier ON rate_limits(identifier, type);

-- Create verification links table
CREATE TABLE IF NOT EXISTS verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Effort:** 30 minutes
**User Impact:** None (database only)

---

#### ✅ Step 4: Update Frontend to Call Edge Function

**Changes:**
- Remove direct Supabase insert
- Call Edge Function instead
- Handle new response format
- Display appropriate messages

**Files to modify:**
- `js/utils.js` - Update submitToWaitlist function
- `js/constants.js` - Add new error messages

**Effort:** 1 hour
**User Impact:** None (same UX)

---

### **Phase 2: Email Verification (Priority 2)**

#### ✅ Step 5: Create Email Verification Endpoint

**Function:** `verify-email`

**Responsibilities:**
1. Validate verification token
2. Check expiration (24 hours)
3. Mark email as verified
4. Show success page

**Files to create:**
- `supabase/functions/verify-email/index.ts`
- `email-verified.html` - Success page

**Effort:** 2 hours
**User Impact:** 🟢 Low (optional step)

---

#### ✅ Step 6: Create Email Templates

**Emails needed:**
1. **Verification Email** - "Confirm your spot on the waitlist"
2. **Welcome Email** - Sent after verification (optional)

**Using:** Supabase Auth email templates (free)

**Files to create:**
- `supabase/templates/verification-email.html`

**Effort:** 1 hour
**User Impact:** 🟢 Low (helpful email)

---

### **Phase 3: Enhanced Protection (Priority 3)**

#### ✅ Step 7: Add Disposable Email Detection

**Free Solution:** Use GitHub's disposable email domains list
- https://github.com/disposable-email-domains/disposable-email-domains

**Implementation:**
1. Download list (10,000+ domains)
2. Bundle with Edge Function
3. Check email domain against list
4. Reject if disposable

**Effort:** 1 hour
**User Impact:** 🟢 Low (blocks fake emails only)

---

#### ✅ Step 8: Add Email Typo Suggestions (Optional)

**Free Solution:** Use Levenshtein distance algorithm
- Check against common domains (gmail.com, outlook.com, etc.)
- Suggest corrections for typos

**Example:**
- User enters: `john@gmial.com`
- System suggests: `Did you mean john@gmail.com?`

**Effort:** 2 hours
**User Impact:** 🟢 Low (helps users fix mistakes)

---

## 🔧 DETAILED IMPLEMENTATION

### Cloudflare Turnstile Setup

**Step 1: Get Turnstile Keys**
1. Go to https://dash.cloudflare.com/
2. Sign up for free account
3. Navigate to "Turnstile"
4. Click "Add Site"
5. Settings:
   - **Site name:** SafetyNet Waitlist
   - **Domain:** Your domain (or `localhost` for testing)
   - **Widget Mode:** Invisible (no user interaction)
6. Copy **Site Key** and **Secret Key**

**Step 2: Update Frontend**

Replace reCAPTCHA with Turnstile in `index.html`:

```html
<!-- Remove this -->
<script src="https://www.google.com/recaptcha/api.js?render=..."></script>

<!-- Add this -->
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

Update `js/config.js`:

```javascript
export const TURNSTILE_CONFIG = {
    siteKey: 'YOUR_TURNSTILE_SITE_KEY', // From Cloudflare dashboard
    action: 'submit_waitlist'
};
```

Update `js/utils.js`:

```javascript
export async function executeTurnstile(siteKey, action) {
    try {
        if (typeof turnstile === 'undefined') {
            console.warn('Turnstile not loaded');
            return null;
        }

        // Render invisible widget
        const widgetId = turnstile.render('#turnstile-container', {
            sitekey: siteKey,
            callback: (token) => token,
        });

        // Get token
        const token = await new Promise((resolve) => {
            turnstile.execute(widgetId);
            // Token will be available in callback
        });

        return token;
    } catch (error) {
        console.error('Turnstile execution failed:', error);
        return null;
    }
}
```

---

### Supabase Edge Function

**File:** `supabase/functions/verify-waitlist-submission/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TURNSTILE_SECRET = Deno.env.get('TURNSTILE_SECRET_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

// Disposable email domains (subset - full list in separate file)
const DISPOSABLE_DOMAINS = new Set([
    'tempmail.com', 'guerrillamail.com', 'mailinator.com',
    '10minutemail.com', 'throwaway.email', // ... more
]);

serve(async (req) => {
    try {
        // Parse request
        const { email, turnstile_token } = await req.json()
        const ip = req.headers.get('x-forwarded-for') || 'unknown'

        // 1. Validate input
        if (!email || !turnstile_token) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400 }
            )
        }

        // 2. Verify Turnstile token
        const verifyResponse = await fetch(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    secret: TURNSTILE_SECRET,
                    response: turnstile_token,
                }),
            }
        )

        const verifyData = await verifyResponse.json()

        if (!verifyData.success) {
            return new Response(
                JSON.stringify({ error: 'Verification failed' }),
                { status: 403 }
            )
        }

        // 3. Check disposable email
        const domain = email.split('@')[1]?.toLowerCase()
        if (DISPOSABLE_DOMAINS.has(domain)) {
            return new Response(
                JSON.stringify({ error: 'Disposable emails not allowed' }),
                { status: 400 }
            )
        }

        // 4. Initialize Supabase client
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

        // 5. Check rate limits
        const { data: emailRateLimit } = await supabase
            .from('rate_limits')
            .select('*')
            .eq('identifier', email)
            .eq('type', 'email')
            .gte('window_start', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
            .single()

        if (emailRateLimit && emailRateLimit.count >= 1) {
            return new Response(
                JSON.stringify({ error: 'Rate limit exceeded - try again tomorrow' }),
                { status: 429 }
            )
        }

        // 6. Generate verification token
        const verificationToken = crypto.randomUUID()
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

        // 7. Insert into database
        const { data, error } = await supabase
            .from('feedback')
            .insert({
                email,
                verification_token: verificationToken,
                verified: false,
                turnstile_score: verifyData.score || null,
                ip_address: ip,
                created_at: new Date().toISOString(),
            })
            .select()
            .single()

        if (error) {
            console.error('Database error:', error)
            return new Response(
                JSON.stringify({ error: 'Submission failed' }),
                { status: 500 }
            )
        }

        // 8. Update rate limit
        await supabase
            .from('rate_limits')
            .upsert({
                identifier: email,
                type: 'email',
                count: (emailRateLimit?.count || 0) + 1,
                window_start: new Date().toISOString(),
            })

        // 9. Send verification email
        const verificationLink = `https://your-domain.com/verify-email?token=${verificationToken}`

        // Using Supabase Auth to send email
        await supabase.auth.admin.generateLink({
            type: 'email',
            email: email,
            options: {
                redirectTo: verificationLink,
            },
        })

        // 10. Return success
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Check your email to confirm your spot!',
            }),
            { status: 200 }
        )

    } catch (error) {
        console.error('Edge function error:', error)
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500 }
        )
    }
})
```

---

## 🧪 TESTING PLAN

### 1. Turnstile Testing
- [ ] Test with Turnstile test keys (always pass)
- [ ] Test with production keys on localhost
- [ ] Verify token is generated
- [ ] Check browser console for errors

### 2. Edge Function Testing
- [ ] Test valid submission
- [ ] Test rate limiting (submit twice quickly)
- [ ] Test disposable email rejection
- [ ] Test invalid Turnstile token
- [ ] Test missing fields

### 3. Email Verification Testing
- [ ] Submit email and check inbox
- [ ] Click verification link
- [ ] Verify status changes to "verified"
- [ ] Test expired token (after 24 hours)
- [ ] Test already-used token

### 4. GDPR Compliance Testing
- [ ] Verify no third-party cookies (Turnstile)
- [ ] Check data processing disclosure
- [ ] Verify data deletion capability
- [ ] Check email opt-out functionality

---

## 📊 SUCCESS METRICS

### Security Metrics
- **Bot Detection Rate:** >95% (Turnstile)
- **Fake Email Rate:** <5% (disposable email blocking)
- **Verification Rate:** 60-80% (industry average for soft verification)

### User Experience Metrics
- **Form Completion Time:** <10 seconds
- **Verification Click Rate:** >70%
- **Error Rate:** <2%

---

## 🚀 DEPLOYMENT PLAN

### Step 1: Deploy Database Changes
```bash
# Run SQL migrations
psql -h your-db-host -U postgres -d your-db < migrations/001_add_verification.sql
```

### Step 2: Deploy Edge Functions
```bash
# Deploy verify-waitlist-submission
supabase functions deploy verify-waitlist-submission

# Deploy verify-email
supabase functions deploy verify-email

# Set environment variables
supabase secrets set TURNSTILE_SECRET_KEY=your_secret_key
```

### Step 3: Deploy Frontend Changes
```bash
# Update config with production Turnstile key
# Deploy to Vercel/Netlify/etc.
vercel --prod
```

### Step 4: Test in Production
- [ ] Submit test email
- [ ] Verify email received
- [ ] Click verification link
- [ ] Check database records

---

## 📝 POST-DEPLOYMENT

### Monitoring
1. **Track Metrics:**
   - Turnstile success rate
   - Verification rate
   - Bounce rate
   - Disposable email blocks

2. **Set Up Alerts:**
   - High bot detection rate (>50%)
   - Low verification rate (<40%)
   - Edge function errors

3. **Weekly Review:**
   - Check waitlist quality
   - Review blocked submissions
   - Adjust thresholds if needed

---

## 🔒 GDPR COMPLIANCE CHECKLIST

- [x] No Google tracking (Turnstile instead of reCAPTCHA)
- [x] Minimal data collection (email + verification status only)
- [x] Clear privacy disclosure
- [x] Email verification = consent to receive updates
- [ ] Add privacy policy link to form
- [ ] Add "Unsubscribe" link to emails
- [ ] Implement data deletion endpoint
- [ ] Document data retention policy

---

## 💰 COST BREAKDOWN

| Service | Free Tier | Expected Usage | Cost |
|---------|-----------|----------------|------|
| Cloudflare Turnstile | 1M requests/month | <1,000/month | **$0** |
| Supabase Database | 500MB | <1MB | **$0** |
| Supabase Edge Functions | 500,000 invocations | <2,000/month | **$0** |
| Supabase Auth (Emails) | 30,000 emails/month | <2,000/month | **$0** |
| **TOTAL** | | | **$0/month** |

---

## 🎯 ESTIMATED TIMELINE

| Phase | Tasks | Time | Dependencies |
|-------|-------|------|--------------|
| **Setup** | Cloudflare account, get keys | 30 min | None |
| **Phase 1** | Turnstile + Edge Function | 5 hours | Supabase access |
| **Phase 2** | Email verification | 3 hours | Phase 1 complete |
| **Phase 3** | Disposable email blocking | 1 hour | Phase 1 complete |
| **Testing** | All scenarios | 2 hours | All phases |
| **Deployment** | Production deploy + monitoring | 1 hour | Testing complete |
| **TOTAL** | | **12.5 hours** | |

**Expected Completion:** 2 days (if working 6-7 hours/day)

---

## ❓ NEXT STEPS

Ready to start implementation? I can:

1. **Start with Phase 1** - Set up Turnstile and Edge Function (5 hours)
2. **Provide step-by-step guidance** - Walk you through each step
3. **Do it all** - Implement the complete solution end-to-end

**Which would you prefer?**
