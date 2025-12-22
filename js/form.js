/**
 * SafetyNet Form Page JavaScript
 * Handles form validation and submission for the standalone form page
 */

import { SUPABASE_CONFIG, RECAPTCHA_CONFIG } from './config.js';
import { validateEmail, submitToWaitlist, executeRecaptcha, isBot, isRateLimited, trackSubmission } from './utils.js';
import { MESSAGES, BUTTON_TEXT, TIMING } from './constants.js';

// ============================================
// DOM Elements
// ============================================
const form = document.getElementById('registrationForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const submitBtn = document.getElementById('submitBtn');
const submitBtnText = document.getElementById('submitBtnText');
const submitSpinner = document.getElementById('submitSpinner');
const formError = document.getElementById('formError');
const formErrorMessage = document.getElementById('formErrorMessage');
const successMessage = document.getElementById('successMessage');

// ============================================
// Email Validation - Real-time
// ============================================
emailInput.addEventListener('blur', () => {
    const email = emailInput.value.trim();
    if (email && !validateEmail(email)) {
        emailError.classList.add('show');
        emailInput.classList.add('error');
    } else {
        emailError.classList.remove('show');
        emailInput.classList.remove('error');
    }
});

emailInput.addEventListener('input', () => {
    emailError.classList.remove('show');
    emailInput.classList.remove('error');
    formError.classList.remove('show');
});

// ============================================
// Form Submission
// ============================================
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous errors
    formError.classList.remove('show');
    emailError.classList.remove('show');
    emailInput.classList.remove('error');

    // Check honeypot field (if it exists on this form)
    const honeypotInput = document.getElementById('website');
    if (honeypotInput && isBot(honeypotInput.value)) {
        console.warn('Bot detected via honeypot');
        // Silently reject - don't show error to bot
        return;
    }

    // Get and validate email
    const email = emailInput.value.trim();

    if (!email) {
        emailError.textContent = MESSAGES.EMAIL_REQUIRED;
        emailError.classList.add('show');
        emailInput.classList.add('error');
        emailInput.focus();
        return;
    }

    if (!validateEmail(email)) {
        emailError.textContent = MESSAGES.EMAIL_INVALID;
        emailError.classList.add('show');
        emailInput.classList.add('error');
        emailInput.focus();
        return;
    }

    if (isRateLimited(email, TIMING.WAITLIST_RATE_LIMIT)) {
        emailError.textContent = MESSAGES.RATE_LIMIT;
        emailError.classList.add('show');
        emailInput.classList.add('error');
        emailInput.focus();
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtnText.textContent = BUTTON_TEXT.SUBMITTING;
    submitSpinner.style.display = 'inline-block';

    try {
        // Execute reCAPTCHA v3
        const recaptchaToken = await executeRecaptcha(RECAPTCHA_CONFIG.siteKey, RECAPTCHA_CONFIG.action);

        // Submit to waitlist with reCAPTCHA token
        // This will throw an error if the backend returns non-2xx status
        const response = await submitToWaitlist(email, SUPABASE_CONFIG, recaptchaToken);

        // CRITICAL: Only track submission AFTER verified success
        // This prevents rate-limiting users whose submissions actually failed
        if (response && response.ok) {
            trackSubmission(email);

            // Success - show success message
            form.style.display = 'none';
            successMessage.classList.add('show');
        } else {
            // This should never happen (submitToWaitlist should throw),
            // but defensive programming requires handling it
            throw new Error('Invalid response from server');
        }

    } catch (error) {
        console.error('Waitlist submission error:', error);

        formErrorMessage.textContent = MESSAGES.NETWORK_ERROR;
        formError.classList.add('show');

        // Reset button state
        submitBtn.disabled = false;
        submitBtnText.textContent = BUTTON_TEXT.SUBMIT;
        submitSpinner.style.display = 'none';

        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});
