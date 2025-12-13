/**
 * SafetyNet Form Page JavaScript
 * Handles form validation and submission for the standalone form page
 */

import { SUPABASE_CONFIG } from './config.js';
import { validateEmail, submitToWaitlist } from './utils.js';
import { MESSAGES, BUTTON_TEXT } from './constants.js';

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

    // Show loading state
    submitBtn.disabled = true;
    submitBtnText.textContent = BUTTON_TEXT.SUBMITTING;
    submitSpinner.style.display = 'inline-block';

    try {
        await submitToWaitlist(email, SUPABASE_CONFIG);

        // Success - show success message
        form.style.display = 'none';
        successMessage.classList.add('show');

    } catch (error) {
        console.error('Submission error:', error);

        formErrorMessage.textContent = MESSAGES.NETWORK_ERROR;
        formError.classList.add('show');

        // Reset button state
        submitBtn.disabled = false;
        submitBtnText.textContent = BUTTON_TEXT.SUBMIT;
        submitSpinner.style.display = 'none';

        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});
