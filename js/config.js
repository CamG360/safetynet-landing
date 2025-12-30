/**
 * SafetyNet Configuration
 *
 * Cloudflare Worker + Turnstile configuration for the waitlist form.
 * The Worker endpoint is the only backend surface the client should call.
 */
export const WORKER_CONFIG = {
    endpoint: 'https://YOUR-WORKER.workers.dev/signup'
};

/**
 * Cloudflare Turnstile Configuration
 *
 * The site key is public. Use the test key below for local development.
 */
export const TURNSTILE_CONFIG = {
    siteKey: '1x00000000000000000000AA', // Cloudflare Turnstile test key; replace for production
    action: 'waitlist_signup',
    widgetId: 'turnstile-widget',
    loadTimeoutMs: 5000
};
