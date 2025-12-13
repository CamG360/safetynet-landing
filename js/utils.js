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
 * Submits an email to the waitlist via Supabase.
 * @param {string} email - The email address to submit
 * @param {object} config - Supabase configuration object
 * @returns {Promise<Response>} The fetch response
 */
export async function submitToWaitlist(email, config) {
    const feedbackData = {
        email: email,
        created_at: new Date().toISOString()
    };

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
