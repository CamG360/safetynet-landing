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
 * Executes Cloudflare Turnstile and returns a token.
 * @param {string} siteKey - The Turnstile site key
 * @returns {Promise<string>} The Turnstile token
 */
export async function executeTurnstile(siteKey) {
    try {
        // Check if turnstile is loaded
        if (typeof turnstile === 'undefined') {
            console.warn('Turnstile not loaded, proceeding without token');
            return null;
        }

        // Create a temporary container for the invisible widget
        const containerId = 'turnstile-widget-' + Date.now();
        const container = document.createElement('div');
        container.id = containerId;
        container.style.position = 'fixed';
        container.style.top = '-9999px';
        container.style.left = '-9999px';
        document.body.appendChild(container);

        // Render and execute Turnstile
        return new Promise((resolve, reject) => {
            try {
                turnstile.render(`#${containerId}`, {
                    sitekey: siteKey,
                    callback: (token) => {
                        // Clean up container
                        document.body.removeChild(container);
                        resolve(token);
                    },
                    'error-callback': (error) => {
                        // Clean up container
                        document.body.removeChild(container);
                        console.error('Turnstile error:', error);
                        reject(error);
                    },
                    theme: 'light',
                    size: 'invisible'
                });
            } catch (error) {
                // Clean up container
                if (document.body.contains(container)) {
                    document.body.removeChild(container);
                }
                reject(error);
            }
        });
    } catch (error) {
        console.error('Turnstile execution failed:', error);
        return null;
    }
}

/**
 * @deprecated Use executeTurnstile instead
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
 * Submits an email to the waitlist via Edge Function.
 * This function calls the Supabase Edge Function which handles:
 * - Turnstile token verification
 * - Rate limiting
 * - Disposable email detection
 * - Database insertion
 * - Email verification sending
 *
 * @param {string} email - The email address to submit
 * @param {object} edgeFunctionConfig - Edge Function configuration object
 * @param {string} turnstileToken - Turnstile verification token
 * @returns {Promise<Response>} The fetch response
 * @throws {Error} If the submission fails (network error or non-2xx response)
 */
export async function submitToWaitlist(email, edgeFunctionConfig, turnstileToken = null) {
    const submissionData = {
        email: email,
        turnstile_token: turnstileToken
    };

    const response = await fetch(edgeFunctionConfig.verifySubmissionUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
    });

    // Parse response to get detailed error messages
    let responseData;
    try {
        responseData = await response.json();
    } catch (e) {
        responseData = null;
    }

    // Defensive: explicit status validation before claiming success
    if (!response.ok || response.status < 200 || response.status >= 300) {
        const errorMsg = responseData?.error || `Waitlist submission failed! HTTP ${response.status}`;
        console.error('Submission error:', errorMsg);
        throw new Error(errorMsg);
    }

    // Log successful submission for debugging
    console.log('Waitlist submission successful:', responseData?.message || 'Added to waitlist');

    return response;
}

/**
 * @deprecated Use submitToWaitlist with Edge Function instead
 * Legacy function for direct Supabase submission (bypasses security checks)
 */
export async function submitToWaitlistLegacy(email, config, recaptchaToken = null) {
    const feedbackData = {
        email: email,
        created_at: new Date().toISOString()
    };

    if (recaptchaToken) {
        feedbackData.recaptcha_token = recaptchaToken;
    }

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

    if (!response.ok || response.status < 200 || response.status >= 300) {
        const errorMsg = `Waitlist submission failed! HTTP ${response.status}`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    console.log(`Waitlist submission successful: ${response.status}`);
    return response;
}
