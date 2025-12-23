/**
 * SafetyNet Configuration
 *
 * Supabase configuration for the waitlist form.
 * Note: The anon key is intentionally public and safe to expose in client-side code
 * as it's protected by Row Level Security (RLS) policies on the Supabase backend.
 */

export const SUPABASE_CONFIG = {
    url: 'https://igzyfbzayuimdnjhapog.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnenlmYnpheXVpbWRuamhhcG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNjA3MTcsImV4cCI6MjA3MDYzNjcxN30.3POIFC1Vs97GOPQCc0MJaM0GXs0f08kXcMHEWymn1Os',
    tableName: 'feedback'
};

/**
 * Cloudflare Turnstile Configuration
 *
 * Get your site key from: https://dash.cloudflare.com/ (Turnstile section)
 * Turnstile is GDPR-compliant, free, and provides invisible bot protection.
 * Note: This is the public site key and is safe to expose in client-side code.
 */
export const TURNSTILE_CONFIG = {
    siteKey: '1x00000000000000000000AA', // TEST key - replace with your actual Turnstile site key (always passes)
    action: 'submit_waitlist'
};

/**
 * Edge Function Configuration
 *
 * URL for the Supabase Edge Function that handles verification
 */
export const EDGE_FUNCTION_CONFIG = {
    verifySubmissionUrl: 'https://igzyfbzayuimdnjhapog.supabase.co/functions/v1/verify-waitlist-submission',
    verifyEmailUrl: 'https://igzyfbzayuimdnjhapog.supabase.co/functions/v1/verify-email'
};

/**
 * @deprecated Use TURNSTILE_CONFIG instead
 * Keeping for backward compatibility during migration
 */
export const RECAPTCHA_CONFIG = {
    siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    action: 'submit_waitlist'
};
