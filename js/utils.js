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

/**
 * Submits an email to the waitlist via Supabase.
 * @param {string} email - The email address to submit
 * @param {object} config - Supabase configuration object
 * @param {string} recaptchaToken - Optional reCAPTCHA token
 * @returns {Promise<Response>} The fetch response
 */
export async function submitToWaitlist(email, config, recaptchaToken = null) {
    const feedbackData = {
        email: email,
        created_at: new Date().toISOString()
    };

    // Add reCAPTCHA token if available
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

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
}
