# Cloudflare Integration Checklist - THE LEDGER

This is your **double-entry bookkeeping** for Cloudflare integration. Every debit must have a matching credit.

## ACCOUNT 1: Turnstile (Bot Detection)

| Entry | Location | Value | Verified |
|-------|----------|-------|----------|
| **DEBIT** (Public Key) | `js/config.js` → `TURNSTILE_CONFIG.siteKey` | `0x4AAAAAACJbesQT6JFzSu6u` | ⬜ |
| **CREDIT** (Secret Key) | Worker secret `TURNSTILE_SECRET_KEY` | (hidden) | ⬜ |
| **ACCOUNT BALANCE** | Turnstile dashboard shows both keys for same site | Match confirmed | ⬜ |

## ACCOUNT 2: Worker Endpoint

| Entry | Location | Value | Verified |
|-------|----------|-------|----------|
| **DEBIT** (Client calls) | `js/config.js` → `WORKER_CONFIG.endpoint` | `https://safetynet-signup.campbell-mccord.workers.dev/signup` | ⬜ |
| **CREDIT** (Worker serves) | Deployed worker URL + `/signup` route | Same URL | ⬜ |
| **ACCOUNT BALANCE** | Client POST to endpoint returns 200 | Match confirmed | ⬜ |

## ACCOUNT 3: Supabase URL

| Entry | Location | Value | Verified |
|-------|----------|-------|----------|
| **DEBIT** (Worker sends to) | `wrangler.toml` → `vars.SUPABASE_URL` | `https://YOUR-PROJECT.supabase.co` | ⬜ |
| **CREDIT** (Supabase accepts) | Supabase project settings → API URL | Same URL | ⬜ |
| **ACCOUNT BALANCE** | Worker can POST to `/rest/v1/waitlist` | Match confirmed | ⬜ |

## ACCOUNT 4: Supabase Service Key

| Entry | Location | Value | Verified |
|-------|----------|-------|----------|
| **DEBIT** (Worker authenticates) | Worker secret `SUPABASE_SERVICE_KEY` | `eyJ...` | ⬜ |
| **CREDIT** (Supabase validates) | Supabase project settings → service_role key | Same key | ⬜ |
| **ACCOUNT BALANCE** | Worker bypasses RLS, writes succeed | Match confirmed | ⬜ |

## ACCOUNT 5: Email Normalization

| Entry | Location | Value | Verified |
|-------|----------|-------|----------|
| **DEBIT** (Client sends) | `js/form.js:63` → `.toLowerCase().trim()` | Normalized | ⬜ |
| **CREDIT** (Worker normalizes) | `worker.js:82` → `.toLowerCase().trim()` | Normalized | ⬜ |
| **CREDIT** (DB enforces) | Supabase `UNIQUE` constraint on `email` | Enforced | ⬜ |
| **ACCOUNT BALANCE** | No duplicate emails, case-insensitive | Match confirmed | ⬜ |

## ACCOUNT 6: Request/Response Schema

| Field | Client Sends | Worker Expects | Worker Returns | Client Handles | Verified |
|-------|--------------|----------------|----------------|----------------|----------|
| `email` | ✅ String | ✅ Required | - | - | ⬜ |
| `turnstileToken` | ✅ String | ✅ Required | - | - | ⬜ |
| HTTP 200 | - | - | ✅ Success | ✅ Show success message | ⬜ |
| HTTP 400 | - | - | ✅ Missing fields | ✅ Show "missing fields" | ⬜ |
| HTTP 403 | - | - | ✅ Turnstile failed | ✅ Show "verification failed" | ⬜ |
| HTTP 405 | - | - | ✅ Wrong method | (N/A - client uses POST) | ⬜ |
| HTTP 500 | - | - | ✅ DB error | ✅ Show "try again" | ⬜ |

## ACCOUNT 7: Data Flow Sequence

| Step | Component | Action | Next Step | Verified |
|------|-----------|--------|-----------|----------|
| 1 | Browser | User enters email | → | ⬜ |
| 2 | Browser | Submit form | → | ⬜ |
| 3 | `js/form.js` | Execute Turnstile | → | ⬜ |
| 4 | Turnstile | Return token | → | ⬜ |
| 5 | `js/utils.js` | POST {email, turnstileToken} to Worker | → | ⬜ |
| 6 | Worker | Verify token with Turnstile API | → | ⬜ |
| 7 | Worker | Normalize email | → | ⬜ |
| 8 | Worker | POST to Supabase `/rest/v1/waitlist` | → | ⬜ |
| 9 | Supabase | Check UNIQUE constraint | → | ⬜ |
| 10 | Supabase | Insert or ignore duplicate | → | ⬜ |
| 11 | Worker | Return 200 to client | → | ⬜ |
| 12 | `js/form.js` | Show success message | ✓ | ⬜ |

## GENERAL LEDGER BALANCE CHECK

### Assets (What you have)
- ✅ Worker code (`worker.js`)
- ✅ Worker config (`wrangler.toml`)
- ✅ Client code (`js/form.js`, `js/utils.js`, `js/config.js`)
- ✅ Deployment guide (`CLOUDFLARE_DEPLOYMENT.md`)
- ✅ Specification (`testmapmatrix.md`, `botprotADR.md`)

### Liabilities (What you need to provide)
- ⬜ Cloudflare account
- ⬜ Turnstile site keys
- ⬜ Deployed worker
- ⬜ Worker secrets set
- ⬜ Supabase project
- ⬜ Supabase database table
- ⬜ Supabase credentials

### Equity (What must balance)
**Assets = Liabilities**

If all checkboxes above are ✅, the ledger balances and integration is complete.

## HOW TO USE THIS CHECKLIST

1. **Before deployment**: All items in "Assets" should be ✅
2. **During deployment**: Work through "Liabilities", checking each ⬜
3. **After deployment**: Work through each ACCOUNT, verifying balances
4. **Final check**: All ⬜ become ✅ = Integration complete

## SUCCESS CRITERIA

🎯 All 7 accounts balanced
🎯 12-step sequence verified end-to-end
🎯 No console errors
🎯 Email appears in Supabase database

---

**This is not probabilistic. This is deterministic.**

Every input matches its output. Every client call has a worker response. Every worker write has a database confirmation.

The doom loop ends when the ledger balances.
