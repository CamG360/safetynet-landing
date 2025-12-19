# reCAPTCHA v3 Setup Guide

This document explains how to set up Google reCAPTCHA v3 for the SafetyNet landing page.

## What's Been Implemented

The landing page now includes:
1. **Honeypot Field** - A hidden field that bots typically fill out but human users won't see
2. **reCAPTCHA v3** - Google's invisible CAPTCHA that scores user interactions

## Setup Instructions

### Step 1: Get Your reCAPTCHA v3 Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Click "Create" or "+" to add a new site
3. Fill in the form:
   - **Label**: SafetyNet Landing Page (or your preferred name)
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domain(s), e.g., `safetynetbeta.com`, `localhost` (for testing)
4. Accept the terms and click "Submit"
5. You'll receive two keys:
   - **Site Key** (public key - used in frontend)
   - **Secret Key** (private key - used in backend)

### Step 2: Update the Site Key in Your Code

1. Open `js/config.js`
2. Find the `RECAPTCHA_CONFIG` object
3. Replace the test site key with your actual site key:

```javascript
export const RECAPTCHA_CONFIG = {
    siteKey: 'YOUR_ACTUAL_SITE_KEY_HERE', // Replace this
    action: 'submit_waitlist'
};
```

4. Update the reCAPTCHA script URL in `index.html` (line 11):

```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_ACTUAL_SITE_KEY_HERE"></script>
```

### Step 3: Backend Verification (Important!)

The reCAPTCHA token is now being sent to your backend with the `recaptcha_token` field. You **must** verify this token on your backend:

#### Add a new column to your Supabase table:

```sql
ALTER TABLE feedback ADD COLUMN recaptcha_token TEXT;
ALTER TABLE feedback ADD COLUMN recaptcha_score FLOAT;
```

#### Verify the token on your backend:

You should create a Supabase Edge Function or use a server-side function to verify the token before accepting the submission. Here's example verification code:

```javascript
const verifyRecaptcha = async (token, secretKey) => {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`
    });

    const data = await response.json();
    return data;
};

// In your submission handler:
const result = await verifyRecaptcha(recaptchaToken, 'YOUR_SECRET_KEY');

if (result.success && result.score >= 0.5) {
    // Valid submission - allow it
    // Store result.score in your database for monitoring
} else {
    // Likely a bot - reject submission
}
```

#### Recommended Score Threshold:
- **0.0 - 0.3**: Likely a bot (reject)
- **0.3 - 0.5**: Suspicious (flag for review)
- **0.5 - 1.0**: Likely human (accept)

### Step 4: Testing

1. **Test with the test key** (currently in config):
   - The test key `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` always passes validation
   - Use this for local development

2. **Test honeypot**:
   - Open browser DevTools
   - Try filling the hidden "website" field manually
   - Submission should be silently rejected

3. **Test with your actual keys**:
   - Replace the test key with your real site key
   - Submit the form normally
   - Check browser console for any reCAPTCHA errors
   - Verify the token is sent to your backend

## How It Works

### Honeypot Protection
- A hidden field (`website`) is added to the form
- CSS makes it invisible and inaccessible to real users
- Bots typically auto-fill all fields, including hidden ones
- If the honeypot field has a value, the submission is silently rejected

### reCAPTCHA v3 Protection
- When the form is submitted, reCAPTCHA v3 executes in the background
- It analyzes user behavior (mouse movements, typing patterns, etc.)
- Returns a score (0.0 to 1.0) indicating likelihood the user is human
- The token and score must be verified on the backend

## Files Modified

1. `js/config.js` - Added reCAPTCHA configuration
2. `index.html` - Added reCAPTCHA script and honeypot field
3. `styles/main.css` - Added honeypot field styling
4. `js/utils.js` - Added reCAPTCHA execution and honeypot validation functions
5. `js/main.js` - Updated form submission to use honeypot and reCAPTCHA
6. `js/form.js` - Updated form submission to use honeypot and reCAPTCHA

## Important Security Notes

1. **Never expose your Secret Key** - Keep it on the backend only
2. **Always verify tokens server-side** - Client-side verification can be bypassed
3. **Monitor reCAPTCHA scores** - Adjust threshold based on your traffic patterns
4. **Keep the honeypot subtle** - Don't make it obvious in your HTML/CSS
5. **Use HTTPS** - reCAPTCHA requires secure connections in production

## Troubleshooting

### reCAPTCHA not loading
- Check browser console for errors
- Verify your site key is correct
- Ensure your domain is registered in reCAPTCHA admin console
- Check if ad blockers are interfering

### Submissions failing
- Check if honeypot field is being accidentally filled
- Verify reCAPTCHA token is being generated (check console)
- Ensure backend is properly verifying the token
- Check Supabase logs for errors

### Low reCAPTCHA scores
- Users with ad blockers may get lower scores
- VPN users may get lower scores
- Consider lowering threshold to 0.3-0.4 if legitimate users are being blocked

## Additional Resources

- [reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [Supabase Edge Functions Guide](https://supabase.com/docs/guides/functions)
