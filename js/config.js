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
 * reCAPTCHA v3 Configuration
 *
 * Get your site key from: https://www.google.com/recaptcha/admin/create
 * Choose reCAPTCHA v3 when creating your key.
 * Note: This is the public site key and is safe to expose in client-side code.
 */
export const RECAPTCHA_CONFIG = {
    siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // TEST key - replace with your actual reCAPTCHA v3 site key
    action: 'submit_waitlist'
};
