# Email Confirmation Trigger Diagnostic Report

**Date**: 2025-12-31
**Issue**: Confirmation emails not firing after waitlist signup
**Status**: 🔴 **CRITICAL - Root Cause Identified**

---

## Executive Summary

**Root Cause**: The Postgres trigger is configured on the **wrong table**.

- ✅ **Signups work**: Turnstile → Cloudflare Worker → Supabase insert successful
- ❌ **Emails don't fire**: Trigger is on `feedback` table, but data goes to `waitlist` table
- ❌ **No email service configured**: No SendGrid/Resend/Postmark/SMTP integration found
- ❌ **Function doesn't exist in codebase**: `handle_new_feedback_email()` not version-controlled

---

## Findings

### 1. Database Table Mismatch ⚠️ **CRITICAL**

**Current Trigger Configuration**:
```sql
CREATE TRIGGER "Waitlistconfirm"
AFTER INSERT ON feedback  -- ❌ WRONG TABLE
FOR EACH ROW
EXECUTE FUNCTION handle_new_feedback_email();
```

**Actual Data Flow**:
```
Browser → Cloudflare Worker → Supabase `waitlist` table
                                        ^^^^^^^^^
                                        Correct table
```

**Evidence**:
- **botprotADR.md:31**: Table is `waitlist`
- **CODEBASE_MAP.md:145**: Table is `waitlist`
- **js/config.js:8**: Worker endpoint is `https://safetynet-signup.campbell-mccord.workers.dev/signup`
- **Worker behavior** (per botprotADR.md): Inserts into `waitlist` table via REST API

**Impact**: Trigger never fires because inserts go to `waitlist`, not `feedback`

---

### 2. Postgres Function Not Found in Codebase

**Search Results**:
```bash
❌ No SQL files found in repository
❌ No Supabase directory found
❌ No references to "handle_new_feedback_email" in codebase
```

**What this means**:
- Function was likely created manually in Supabase SQL Editor
- Function definition is not version-controlled
- Cannot verify function logic without direct database access

**Required Actions**:
Run this query in Supabase SQL Editor to retrieve function definition:
```sql
SELECT routine_name, routine_definition
FROM information_schema.routines
WHERE routine_name = 'handle_new_feedback_email';
```

---

### 3. No Email Service Integration Found ❌

**Searched for**:
- SendGrid
- Resend
- Postmark
- SMTP/smtp
- Email API keys

**Results**:
- ❌ No email service libraries found
- ❌ No API key references in codebase
- ❌ No email service configuration files
- ❌ No `.env` files found (not in repo, as expected)

**Files checked**:
- All `.js` files
- All `.md` documentation
- All configuration files

**Implication**: Even if the trigger fires, there's no configured email service to send messages

---

### 4. No Supabase Edge Functions

**Search Results**:
```bash
❌ No supabase/ directory found
❌ No functions/ directory found
❌ No Edge Functions in repository
```

**Conclusion**: Email sending is NOT handled by Supabase Edge Functions

---

### 5. Current Architecture (Confirmed)

```
┌─────────────────────────────────────────────────────────────┐
│ CURRENT FLOW (Working)                                      │
└─────────────────────────────────────────────────────────────┘
   Browser (index.html)
       │
       │ 1. User submits email
       │ 2. Turnstile validates
       │
       ▼
   Cloudflare Worker
   (safetynet-signup.campbell-mccord.workers.dev/signup)
       │
       │ 3. Verifies Turnstile token
       │ 4. Normalizes email
       │ 5. POST to Supabase REST API
       │
       ▼
   Supabase `waitlist` table ✅ INSERTS SUCCEED
       │
       │ ❌ Trigger on `feedback` table never fires
       │    (Wrong table!)
       │
       ▼
   handle_new_feedback_email() ❌ NEVER EXECUTES
       │
       ▼
   📧 Email ❌ NEVER SENT

┌─────────────────────────────────────────────────────────────┐
│ EXPECTED FLOW (Not Working)                                 │
└─────────────────────────────────────────────────────────────┘
   Trigger should be on `waitlist` table, not `feedback`
```

**Files confirming architecture**:
- `js/config.js` - Worker endpoint configuration
- `botprotADR.md` - Complete architectural specification
- `CODEBASE_MAP.md` - Data flow documentation
- `TECHNICAL_CONTEXT.md` - Backend integration details

---

## Diagnostic Checklist Results

| Check | Status | Details |
|-------|--------|---------|
| Does function exist? | ❓ Unknown | Not in codebase; needs direct DB query |
| What does function do? | ❓ Unknown | Needs `SELECT routine_definition FROM information_schema.routines` |
| Is trigger enabled? | ❓ Unknown | Needs `SELECT tgname, tgenabled FROM pg_trigger WHERE tgname = 'Waitlistconfirm'` |
| Trigger on correct table? | ❌ **NO** | Trigger on `feedback`, data goes to `waitlist` |
| Edge Functions exist? | ❌ No | No `supabase/functions/` directory |
| Email service configured? | ❌ No | No SendGrid/Resend/Postmark/SMTP found |
| Email credentials configured? | ❓ Unknown | Needs Supabase Dashboard check |

---

## Recommended Fixes

### Option 1: Fix Trigger Table (Quick Fix)

**IF** the trigger logic is correct, simply move it to the `waitlist` table:

```sql
-- 1. Drop old trigger
DROP TRIGGER IF EXISTS "Waitlistconfirm" ON feedback;

-- 2. Create trigger on correct table
CREATE TRIGGER "Waitlistconfirm"
AFTER INSERT ON waitlist  -- ✅ Correct table
FOR EACH ROW
EXECUTE FUNCTION handle_new_feedback_email();
```

**Steps**:
1. Run in Supabase SQL Editor
2. Test with new signup
3. Check if email sends

---

### Option 2: Full Diagnostic (Recommended)

Run these queries in Supabase SQL Editor to gather complete information:

```sql
-- 1. Check if function exists
SELECT routine_name, routine_definition, routine_type
FROM information_schema.routines
WHERE routine_name = 'handle_new_feedback_email';

-- 2. Check trigger status
SELECT
    tgname AS trigger_name,
    tgenabled AS enabled,
    tgrelid::regclass AS table_name
FROM pg_trigger
WHERE tgname = 'Waitlistconfirm';

-- 3. Verify waitlist table structure
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'waitlist'
ORDER BY ordinal_position;

-- 4. Check if feedback table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'feedback'
) AS feedback_table_exists;

-- 5. Check recent waitlist entries (verify data is arriving)
SELECT id, email, created_at
FROM waitlist
ORDER BY created_at DESC
LIMIT 5;
```

---

### Option 3: Configure Email Service (Required)

Even after fixing the trigger, you need an email service. Choose one:

#### A. Resend (Recommended for transactional emails)
```javascript
// Install in Postgres function or Edge Function
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'waitlist@safetynetbeta.com',
  to: email,
  subject: 'Welcome to SafetyNet Waitlist',
  html: '<p>Thanks for joining!</p>'
});
```

**Setup**:
1. Sign up at https://resend.com
2. Get API key
3. Add to Supabase secrets: `RESEND_API_KEY`
4. Verify domain `safetynetbeta.com`

---

#### B. SendGrid (Alternative)
```javascript
// In Postgres function (requires plv8 extension) or Edge Function
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: email,
  from: 'waitlist@safetynetbeta.com',
  subject: 'Welcome to SafetyNet',
  html: '<p>Thanks for joining!</p>'
});
```

---

#### C. Supabase Edge Function (Recommended Architecture)

Create `supabase/functions/send-waitlist-email/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const { email } = await req.json();

  // Send email using Resend
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`
    },
    body: JSON.stringify({
      from: 'waitlist@safetynetbeta.com',
      to: email,
      subject: 'Welcome to SafetyNet Waitlist',
      html: '<p>Thanks for joining the SafetyNet waitlist!</p>'
    })
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
});
```

**Then update trigger to call Edge Function**:
```sql
CREATE OR REPLACE FUNCTION handle_new_feedback_email()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://YOUR-PROJECT.supabase.co/functions/v1/send-waitlist-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := jsonb_build_object('email', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## Next Steps (Priority Order)

1. **Immediate** (5 minutes):
   - Run diagnostic queries in Supabase SQL Editor
   - Confirm `waitlist` table has recent entries
   - Check if `feedback` table exists at all

2. **Fix Trigger** (10 minutes):
   - Drop trigger from `feedback` table
   - Recreate trigger on `waitlist` table
   - Test with new signup

3. **Configure Email Service** (30-60 minutes):
   - Choose email provider (Resend recommended)
   - Get API key
   - Add to Supabase secrets
   - Verify domain ownership
   - Update `handle_new_feedback_email()` function to actually send emails

4. **Test End-to-End** (10 minutes):
   - Submit test email via form
   - Check Supabase logs for trigger execution
   - Verify email received

5. **Add to Version Control** (15 minutes):
   - Create `supabase/migrations/` directory
   - Export all schema, triggers, and functions to SQL files
   - Commit to repository

---

## Questions for Manual Verification

These require access to Supabase Dashboard:

1. **Does `feedback` table exist?** (Check Tables in Dashboard)
2. **Does `waitlist` table exist?** (Should be YES)
3. **Are there recent entries in `waitlist`?** (Check if signups are working)
4. **What does `handle_new_feedback_email()` actually do?** (View in SQL Editor)
5. **Is the trigger enabled?** (Check `tgenabled` in `pg_trigger`)
6. **Are there any error logs?** (Check Logs → Postgres Logs)
7. **Is there an email service API key in secrets?** (Check Project Settings → Secrets)

---

## Summary

**Problem**: Confirmation emails not sending
**Root Cause**: Postgres trigger configured on wrong table (`feedback` instead of `waitlist`)
**Secondary Issue**: No email service integration configured

**Fix**:
1. Move trigger to `waitlist` table
2. Configure email service (Resend/SendGrid/etc.)
3. Update function to actually send emails
4. Test end-to-end

**Estimated Time to Fix**: 1-2 hours (including email service setup)

---

## References

- Architecture: `botprotADR.md:31` (confirms `waitlist` table)
- Data flow: `CODEBASE_MAP.md:145-150`
- Worker config: `js/config.js:7-9`
- Database schema: `botprotADR.md:163-176`
