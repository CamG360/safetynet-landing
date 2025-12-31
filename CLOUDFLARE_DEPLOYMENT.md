# Cloudflare Worker Deployment Guide

This is your **LEDGER** - every item must be checked and balanced on both sides.

## Prerequisites

- [ ] Cloudflare account created
- [ ] Supabase project created
- [ ] Node.js installed (for Wrangler CLI)

## Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

## Step 2: Login to Cloudflare

```bash
wrangler login
```

## Step 3: Get Cloudflare Turnstile Keys

1. Go to: https://dash.cloudflare.com/?to=/:account/turnstile
2. Click "Add Site"
3. Enter domain or use "localhost" for testing
4. Copy the **Site Key** (public) - This goes in `js/config.js`
5. Copy the **Secret Key** (private) - This goes in worker secrets

## Step 4: Get Supabase Credentials

1. Go to your Supabase project settings: https://app.supabase.com/project/_/settings/api
2. Copy **URL** (looks like: `https://abcdefghijklm.supabase.co`)
3. Copy **service_role key** (starts with `eyJ...`)

## Step 5: Configure wrangler.toml

Edit `wrangler.toml` and replace `YOUR-PROJECT` with your actual Supabase URL:

```toml
[vars]
SUPABASE_URL = "https://YOUR-ACTUAL-PROJECT.supabase.co"
```

## Step 6: Set Worker Secrets

```bash
# Set Turnstile secret key
wrangler secret put TURNSTILE_SECRET_KEY
# Paste your Turnstile secret key when prompted

# Set Supabase service role key
wrangler secret put SUPABASE_SERVICE_KEY
# Paste your Supabase service_role key when prompted
```

## Step 7: Deploy the Worker

```bash
wrangler deploy
```

The output will show your worker URL, like:
```
Published safetynet-signup (X.XX sec)
  https://safetynet-signup.YOUR-SUBDOMAIN.workers.dev
```

## Step 8: Update Client Configuration

Edit `js/config.js` and update:

```javascript
export const WORKER_CONFIG = {
    endpoint: 'https://safetynet-signup.YOUR-SUBDOMAIN.workers.dev/signup'
};

export const TURNSTILE_CONFIG = {
    siteKey: 'YOUR-TURNSTILE-SITE-KEY', // From Step 3
    action: 'waitlist_signup',
    widgetId: 'turnstile-widget',
    loadTimeoutMs: 5000
};
```

## Step 9: Create Supabase Database Table

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance index
CREATE INDEX idx_waitlist_created ON waitlist(created_at DESC);

-- Enable RLS (deny all anon access)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- No policies needed: service_role bypasses RLS
```

## Step 10: Test the Integration

### Test 1: Form Submission
1. Open your landing page
2. Enter an email in the waitlist form
3. Submit
4. Should see success message

### Test 2: Verify Database
1. Go to Supabase Table Editor
2. Check `waitlist` table
3. Email should appear (normalized to lowercase)

### Test 3: Duplicate Prevention
1. Submit the same email again
2. Should succeed (UNIQUE constraint handles duplicates silently)

### Test 4: Bot Detection
1. Try submitting without completing Turnstile
2. Should fail with 403 error

## Verification Ledger

This is your "debit and credit" matrix - everything must match:

| Component | Client Side | Worker Side | Supabase Side | Status |
|-----------|-------------|-------------|---------------|--------|
| **Email normalization** | `.toLowerCase().trim()` | `.toLowerCase().trim()` | `UNIQUE` constraint | ⬜ |
| **Turnstile site key** | `config.js` siteKey | - | - | ⬜ |
| **Turnstile secret** | - | Worker secret | - | ⬜ |
| **Supabase URL** | - | `wrangler.toml` vars | - | ⬜ |
| **Service role key** | - | Worker secret | API settings | ⬜ |
| **Worker endpoint** | `config.js` endpoint | Deployed URL | - | ⬜ |
| **HTTP method** | POST | POST only | - | ⬜ |
| **Status codes** | 200/400/403/500 | 200/400/403/405/500 | - | ⬜ |
| **Table name** | - | `/rest/v1/waitlist` | `waitlist` table | ⬜ |
| **Email field** | `{email}` | `{email}` | `email` column | ⬜ |
| **Token field** | `{turnstileToken}` | `{turnstileToken}` | - | ⬜ |

## Troubleshooting

### Error: "Missing email or turnstileToken"
- **Cause**: Client not sending correct payload
- **Fix**: Check `js/utils.js` submitToWaitlist function

### Error: "Turnstile verification failed"
- **Cause**: Invalid or expired token, or wrong secret key
- **Fix**: Verify TURNSTILE_SECRET_KEY matches your Turnstile dashboard

### Error: "Database write failed"
- **Cause**: Supabase credentials wrong or RLS blocking
- **Fix**: Verify SUPABASE_SERVICE_KEY and SUPABASE_URL
- **Note**: Service role key bypasses RLS, so RLS with no policies is correct

### Error: "Method not allowed"
- **Cause**: Client using wrong HTTP method
- **Fix**: Ensure client uses POST, not GET

## Success Criteria

✅ All items in Verification Ledger checked
✅ Email submitted successfully
✅ Email appears in Supabase database (lowercase)
✅ Duplicate submission handled gracefully
✅ No console errors

## Your Next Steps

1. Complete Steps 1-10 above
2. Check all boxes in Verification Ledger
3. Test the flow end-to-end
4. If anything fails, check Troubleshooting section

This is deterministic. Every input has a matching output. No vibe coding needed.
