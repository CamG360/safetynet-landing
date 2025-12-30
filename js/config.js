/**
 * SafetyNet Configuration
 *
 * Cloudflare Worker + Turnstile configuration for the waitlist form.
 * The Worker endpoint is the only backend surface the client should call.
 */
export const WORKER_CONFIG = {
    endpoint: 'https://safetynet-signup.campbell-mccord.workers.dev/signup'
};

/**
 * Cloudflare Turnstile Configuration
 *
 * The site key is public. Use the test key below for local development.
 */
export const TURNSTILE_CONFIG = {
    siteKey: '0x4AAAAAACJbesQT6JFzSu6u',
    action: 'waitlist_signup',
    widgetId: 'turnstile-widget',
    loadTimeoutMs: 5000
};
