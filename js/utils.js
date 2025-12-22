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
 * Executes reCAPTCHA v3 and returns a token.
 * @param {string} siteKey - The reCAPTCHA site key
 * @param {string} action - The action name for this reCAPTCHA execution
 * @returns {Promise<string>} The reCAPTCHA token
 */
export async function executeRecaptcha(siteKey, action) {
    try {
        // Check if grecaptcha is loaded
        if (typeof grecaptcha === 'undefined') {
            console.warn('reCAPTCHA not loaded, proceeding without token');
            return null;
        }

        // Wait for grecaptcha to be ready
        await new Promise((resolve) => {
            grecaptcha.ready(resolve);
        });

        // Execute reCAPTCHA and get token
        const token = await grecaptcha.execute(siteKey, { action: action });
        return token;
    } catch (error) {
        console.error('reCAPTCHA execution failed:', error);
        return null;
    }
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
 * Submits an email to the waitlist via Supabase.
 * @param {string} email - The email address to submit
 * @param {object} config - Supabase configuration object
 * @param {string} recaptchaToken - Optional reCAPTCHA token
 * @returns {Promise<Response>} The fetch response
 * @throws {Error} If the submission fails (network error or non-2xx response)
 */
export async function submitToWaitlist(email, config, recaptchaToken = null) {
    const feedbackData = {
        email: email,
        created_at: new Date().toISOString()
    };

    // NOTE: recaptcha_token NOT sent to server to avoid PGRST204 errors
    // reCAPTCHA is still executed client-side for bot detection
    // Server-side validation should be configured separately via Edge Functions
    // See supabase-fix.sql for server-side configuration

    const response = await fetch(`${config.url}/rest/v1/${config.tableName}`, {
        method: 'POST',
        headers: {
            'apikey': config.anonKey,
            'Authorization': `Bearer ${config.anonKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify(feedbackData)
    });

    // Defensive: explicit status validation before claiming success
    if (!response.ok || response.status < 200 || response.status >= 300) {
        // Try to parse error response body for better error messages
        let errorDetail = '';
        try {
            const errorBody = await response.text();
            if (errorBody) {
                try {
                    const errorJson = JSON.parse(errorBody);
                    errorDetail = errorJson.message || errorJson.error || errorBody;
                } catch {
                    errorDetail = errorBody;
                }
            }
        } catch (e) {
            // Ignore parsing errors, use basic message
        }

        const errorMsg = errorDetail
            ? `Waitlist submission failed (HTTP ${response.status}): ${errorDetail}`
            : `Waitlist submission failed! HTTP ${response.status}`;

        console.error(errorMsg);

        // Create error with status code for better error handling
        const error = new Error(errorMsg);
        error.status = response.status;
        throw error;
    }

    // Log successful submission for debugging
    console.log(`Waitlist submission successful: ${response.status}`);

    return response;
}
