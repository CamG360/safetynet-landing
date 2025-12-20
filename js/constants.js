/**
 * SafetyNet Constants
 *
 * Centralized constants used throughout the application.
 */

export const TIMING = {
    // Auto-close modal after successful submission (milliseconds)
    AUTO_CLOSE_MODAL: 4000,

    // Spinner animation duration (milliseconds)
    SPINNER_ANIMATION: 800,

    // Modal transition duration (milliseconds)
    MODAL_TRANSITION: 200,

    // FAQ accordion transition (milliseconds)
    FAQ_TRANSITION: 300,

    // Mobile menu transition (milliseconds)
    MOBILE_MENU_TRANSITION: 300,

    // Time window to throttle repeat waitlist submissions (milliseconds)
    WAITLIST_RATE_LIMIT: 30000
};

export const MESSAGES = {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    SUBMISSION_ERROR: 'Something went wrong. Please try again.',
    NETWORK_ERROR: 'Unable to submit. Please check your connection and try again.',
    RATE_LIMIT: 'Please wait before submitting again.',
    SUCCESS_TITLE: "You're on the waitlist!",
    SUCCESS_MESSAGE: "We'll be in touch soon with updates on SafetyNet."
};

export const BUTTON_TEXT = {
    SUBMIT: 'Join Waitlist',
    SUBMITTING: 'Submitting...',
    JOIN_THE_WAITLIST: 'Join the Waitlist'
};
