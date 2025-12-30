/**
 * SafetyNet Utilities
 *
 * Shared utility functions used across the application.
 */

/**
 * Validates an email address using RFC 5322 compliant regex.
 * @param {string} email - The email address to validate
 * @returns {boolean} True if the email is valid, false otherwise
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Cloudflare Turnstile integration utilities
 */
const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
let turnstileScriptPromise = null;
let turnstileWidgetId = null;
let pendingResolve = null;
let pendingReject = null;

function loadTurnstileScript(timeoutMs = 5000) {
    if (typeof window === 'undefined') {
        return Promise.reject(new Error('Turnstile is not available in this environment'));
    }

    if (window.turnstile) {
        return Promise.resolve();
    }

    if (!turnstileScriptPromise) {
        turnstileScriptPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = TURNSTILE_SCRIPT_URL;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Turnstile script'));
            document.head.appendChild(script);

            // Safety timeout
            setTimeout(() => reject(new Error('Loading Turnstile timed out')), timeoutMs);
        });
    }

    return turnstileScriptPromise;
}

/**
 * Executes Turnstile and returns a token.
 * Renders a single invisible widget and reuses it for subsequent submissions.
 * @param {object} config - Turnstile configuration ({ siteKey, action, widgetId, loadTimeoutMs })
 * @returns {Promise<string>} The Turnstile token
 */
export async function executeTurnstile(config) {
    const { siteKey, action, widgetId, loadTimeoutMs = 5000 } = config;

    await loadTurnstileScript(loadTimeoutMs);

    const turnstileInstance = window.turnstile;
    if (typeof turnstileInstance === 'undefined') {
        throw new Error('Turnstile failed to initialize');
    }

    const container = document.getElementById(widgetId);
    if (!container) {
        throw new Error('Turnstile container not found');
    }

    if (turnstileWidgetId === null) {
        turnstileWidgetId = turnstileInstance.render(`#${widgetId}`, {
            sitekey: siteKey,
            action,
            // Use a supported size value; appearance 'execute' keeps it programmatic
            size: 'flexible',
            appearance: 'execute',
            callback: (token) => {
                if (pendingResolve) {
                    pendingResolve(token);
                    pendingResolve = null;
                    pendingReject = null;
                }
            },
            'error-callback': () => {
                if (pendingReject) {
                    pendingReject(new Error('Turnstile error occurred'));
                    pendingResolve = null;
                    pendingReject = null;
                }
            },
            'timeout-callback': () => {
                if (pendingReject) {
                    pendingReject(new Error('Turnstile verification timed out'));
                    pendingResolve = null;
                    pendingReject = null;
                }
            }
        });
    }

    return new Promise((resolve, reject) => {
        pendingResolve = resolve;
        pendingReject = reject;
        turnstileInstance.execute(turnstileWidgetId);

        setTimeout(() => {
            if (pendingReject) {
                pendingReject(new Error('Turnstile verification timed out'));
                pendingResolve = null;
                pendingReject = null;
            }
        }, loadTimeoutMs);
    });
}

/**
 * Validates the honeypot field to detect bots.
 * @param {string} honeypotValue - The value of the honeypot field
 * @returns {boolean} True if the submission appears to be from a bot, false otherwise
 */
export function isBot(honeypotValue) {
    // If the honeypot field is filled, it's likely a bot
    return honeypotValue && honeypotValue.trim() !== '';
}

const RATE_LIMIT_STORAGE_KEY = 'waitlistRateLimit';

/**
 * Checks if the given email has been submitted within the rate limit window.
 * Uses localStorage to persist timestamps between sessions.
 * @param {string} email - The email address to check
 * @param {number} windowMs - Rate limit window in milliseconds
 * @returns {boolean} True if submission is blocked, false otherwise
 */
export function isRateLimited(email, windowMs) {
    if (!email || typeof window === 'undefined' || !window.localStorage) return false;

    try {
        const record = JSON.parse(localStorage.getItem(RATE_LIMIT_STORAGE_KEY)) || {};
        const lastSubmittedAt = record[email];
        if (!lastSubmittedAt) return false;

        return Date.now() - lastSubmittedAt < windowMs;
    } catch (error) {
        console.warn('Rate limit check failed, allowing submission:', error);
        return false;
    }
}

/**
 * Records the current time as the latest submission timestamp for the email.
 * @param {string} email - The submitted email address
 */
export function trackSubmission(email) {
    if (!email || typeof window === 'undefined' || !window.localStorage) return;

    try {
        const record = JSON.parse(localStorage.getItem(RATE_LIMIT_STORAGE_KEY)) || {};
        record[email] = Date.now();
        localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(record));
        console.log(`Rate limit applied for ${email}`);
    } catch (error) {
        console.warn('Failed to persist submission timestamp:', error);
    }
}

/**
 * Clears the rate limit timestamp for a specific email.
 * Used when a submission fails to ensure the user can retry immediately.
 * @param {string} email - The email address to clear
 */
export function clearRateLimit(email) {
    if (!email || typeof window === 'undefined' || !window.localStorage) return;

    try {
        const record = JSON.parse(localStorage.getItem(RATE_LIMIT_STORAGE_KEY)) || {};
        if (record[email]) {
            delete record[email];
            localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(record));
            console.log(`Rate limit cleared for ${email}`);
        }
    } catch (error) {
        console.warn('Failed to clear rate limit:', error);
    }
}

/**
 * Submits an email to the waitlist via the Cloudflare Worker.
 * @param {string} email - The email address to submit
 * @param {object} workerConfig - Worker configuration object
 * @param {string} turnstileToken - Optional Turnstile token
 * @returns {Promise<Response>} The fetch response
 * @throws {Error} If the submission fails (network error or non-2xx response)
 */
export async function submitToWaitlist(email, workerConfig, turnstileToken = null) {
    const payload = {
        email
    };

    if (turnstileToken) {
        payload.turnstileToken = turnstileToken;
    }

    const response = await fetch(workerConfig.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    // Defensive: explicit status validation before claiming success
    if (!response.ok || response.status < 200 || response.status >= 300) {
        const errorMsg = `Waitlist submission failed! HTTP ${response.status}`;
        console.error(errorMsg);
        const error = new Error(errorMsg);
        error.status = response.status;
        throw error;
    }

    // Log successful submission for debugging
    console.log(`Waitlist submission successful: ${response.status}`);

    return response;
}
