/**
 * SafetyNet Main Page JavaScript
 * Handles modals, forms, navigation, and FAQ accordion
 */

import { SUPABASE_CONFIG } from './config.js';
import { validateEmail, submitToWaitlist } from './utils.js';
import { TIMING, MESSAGES, BUTTON_TEXT } from './constants.js';

// ============================================
// Icon Initialization
// ============================================
window.addEventListener('load', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error("Lucide icons failed to load.");
    }
});

// ============================================
// Modal Management
// ============================================

/**
 * Toggle modal visibility with keyboard support
 * @param {string} modalId - The ID of the modal to toggle
 * @param {boolean} show - Whether to show or hide the modal
 */
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (show) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            modal.classList.add('modal-active');
            // Focus first input or button in modal
            const firstFocusable = modal.querySelector('input, button, textarea, select');
            if (firstFocusable) firstFocusable.focus();
        }, 10);
    } else {
        modal.classList.remove('modal-active');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, TIMING.MODAL_TRANSITION);
    }
}

/**
 * Keyboard event handler for ESC key
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        // Check if any modal is open
        const alertModal = document.getElementById('alertDemoModal');
        const regModal = document.getElementById('registrationModal');
        const privacyModal = document.getElementById('privacyPolicyModal');
        const termsModal = document.getElementById('termsOfServiceModal');

        if (alertModal && !alertModal.classList.contains('hidden')) {
            toggleModal('alertDemoModal', false);
        } else if (regModal && !regModal.classList.contains('hidden')) {
            toggleModal('registrationModal', false);
        } else if (privacyModal && !privacyModal.classList.contains('hidden')) {
            toggleModal('privacyPolicyModal', false);
        } else if (termsModal && !termsModal.classList.contains('hidden')) {
            toggleModal('termsOfServiceModal', false);
        }
    }
});

// ============================================
// Alert Demo Modal
// ============================================
const alertModal = document.getElementById('alertDemoModal');
const openAlertBtn = document.getElementById('openAlertDemoBtn');
const heroSafetyAlertBtn = document.getElementById('heroSafetyAlertBtn');
const closeAlertBtn = document.getElementById('closeAlertDemoBtn');

if (closeAlertBtn && alertModal) {
    // Hero section button
    if (heroSafetyAlertBtn) {
        heroSafetyAlertBtn.addEventListener('click', (e) => {
            // Don't open modal if clicking the cancel button
            if (e.target.closest('button')) return;
            toggleModal('alertDemoModal', true);
        });
    }
    // "How it works" section button
    if (openAlertBtn) {
        openAlertBtn.addEventListener('click', (e) => {
            // Don't open modal if clicking the cancel button
            if (e.target.closest('button')) return;
            toggleModal('alertDemoModal', true);
        });
    }
    closeAlertBtn.addEventListener('click', () => toggleModal('alertDemoModal', false));
    alertModal.addEventListener('click', (e) => {
        if (e.target === alertModal) toggleModal('alertDemoModal', false);
    });
}

// ============================================
// Registration Form Management
// ============================================

/**
 * Reset registration form to initial state
 */
function resetRegistrationForm() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('submitSpinner');
    const emailError = document.getElementById('email-error');

    if (form && successMessage && submitBtn) {
        // Show form, hide success message
        form.style.display = 'block';
        successMessage.style.display = 'none';

        // Reset all form fields
        form.reset();

        // Reset button state
        submitBtn.disabled = false;
        const span = submitBtn.querySelector('span');
        if (span) span.textContent = BUTTON_TEXT.JOIN_THE_WAITLIST;
        if (spinner) spinner.style.display = 'none';

        // Clear any error messages
        if (emailError) emailError.classList.add('hidden');
    }
}

// Registration Modal
const regModal = document.getElementById('registrationModal');
const openRegBtns = document.querySelectorAll('.open-registration-modal');
const closeRegBtn = document.getElementById('closeRegistrationBtn');

if (regModal && closeRegBtn) {
    openRegBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            resetRegistrationForm(); // Reset form state before opening
            toggleModal('registrationModal', true);
        });
    });
    closeRegBtn.addEventListener('click', () => toggleModal('registrationModal', false));
    regModal.addEventListener('click', (e) => {
        if (e.target === regModal) toggleModal('registrationModal', false);
    });
}

// Hero Join Waitlist Button
const heroJoinBtn = document.getElementById('heroJoinWaitlistBtn');
const heroEmailInput = document.getElementById('heroEmailInput');
const modalEmailInput = document.getElementById('email');

if (heroJoinBtn && heroEmailInput && modalEmailInput) {
    heroJoinBtn.addEventListener('click', () => {
        // Reset form first
        resetRegistrationForm();

        // Pre-fill modal email if hero email has a value
        const heroEmail = heroEmailInput.value.trim();
        if (heroEmail) {
            modalEmailInput.value = heroEmail;
        }

        // Open the registration modal
        toggleModal('registrationModal', true);
    });
}

// ============================================
// Privacy Policy Modal
// ============================================
const privacyModal = document.getElementById('privacyPolicyModal');
const openPrivacyBtn = document.getElementById('openPrivacyPolicyBtn');
const closePrivacyBtn = document.getElementById('closePrivacyPolicyBtn');

if (privacyModal && openPrivacyBtn && closePrivacyBtn) {
    openPrivacyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal('privacyPolicyModal', true);
    });
    closePrivacyBtn.addEventListener('click', () => toggleModal('privacyPolicyModal', false));
    privacyModal.addEventListener('click', (e) => {
        if (e.target === privacyModal) toggleModal('privacyPolicyModal', false);
    });
}

// ============================================
// Terms of Service Modal
// ============================================
const termsModal = document.getElementById('termsOfServiceModal');
const openTermsBtn = document.getElementById('openTermsOfServiceBtn');
const closeTermsBtn = document.getElementById('closeTermsOfServiceBtn');

if (termsModal && openTermsBtn && closeTermsBtn) {
    openTermsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal('termsOfServiceModal', true);
    });
    closeTermsBtn.addEventListener('click', () => toggleModal('termsOfServiceModal', false));
    termsModal.addEventListener('click', (e) => {
        if (e.target === termsModal) toggleModal('termsOfServiceModal', false);
    });
}

// ============================================
// Mobile Menu
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// ============================================
// Registration Form Submission
// ============================================
const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');
let autoCloseTimer = null;

// Close success message button handler
if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
        if (autoCloseTimer) clearTimeout(autoCloseTimer);
        resetRegistrationForm();
    });
}

if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const spinner = document.getElementById('submitSpinner');
        const span = submitBtn.querySelector('span');
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');

        // Validate email
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            emailError.textContent = MESSAGES.EMAIL_INVALID;
            emailError.classList.remove('hidden');
            emailInput.focus();
            return;
        }

        // Hide any previous errors
        emailError.classList.add('hidden');

        // Disable button and show loading state
        submitBtn.disabled = true;
        const originalText = span.textContent;
        span.textContent = BUTTON_TEXT.SUBMITTING;
        spinner.style.display = 'block';

        try {
            await submitToWaitlist(email, SUPABASE_CONFIG);

            // Success State - Hide form, show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';

            // Reinitialize icons in success message
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Auto-close after configured time
            autoCloseTimer = setTimeout(() => {
                resetRegistrationForm();
            }, TIMING.AUTO_CLOSE_MODAL);

        } catch (error) {
            console.error("Error:", error);
            emailError.textContent = MESSAGES.SUBMISSION_ERROR;
            emailError.classList.remove('hidden');

            // Reset Button
            submitBtn.disabled = false;
            span.textContent = originalText;
            spinner.style.display = 'none';
        }
    });
}

// ============================================
// FAQ Accordion
// ============================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ============================================
// Use Case Accordions
// ============================================
const useCaseToggles = document.querySelectorAll('.use-case-toggle');

useCaseToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        const useCaseItem = toggle.closest('.use-case-item');
        const isActive = useCaseItem.classList.contains('active');

        // Toggle current item (independent toggles - multiple can be open)
        if (isActive) {
            useCaseItem.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            useCaseItem.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
        }

        // Reinitialize Lucide icons for the chevron
        lucide.createIcons();
    });
});

// ============================================
// Feature Accordions
// ============================================
const featureToggles = document.querySelectorAll('.feature-toggle');

featureToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        const featureItem = toggle.closest('.feature-item');
        const isActive = featureItem.classList.contains('active');

        // Toggle current item (independent toggles - multiple can be open)
        if (isActive) {
            featureItem.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            featureItem.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
        }

        // Reinitialize Lucide icons for the chevron
        lucide.createIcons();
    });
});

// ============================================
// Story Accordions
// ============================================
const storyToggles = document.querySelectorAll('.story-toggle');

storyToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        const storyItem = toggle.closest('.story-item');
        const isActive = storyItem.classList.contains('active');

        // Toggle current item (independent toggles - multiple can be open)
        if (isActive) {
            storyItem.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            storyItem.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
        }

        // Reinitialize Lucide icons for the chevron
        lucide.createIcons();
    });
});

// ============================================
// FAQ Category Filter
// ============================================
const faqCategoryBtns = document.querySelectorAll('.faq-category-btn');
const faqItems = document.querySelectorAll('.faq-item');

/**
 * Filter FAQs by category
 * @param {string} selectedCategory - The category to filter by ('all' or specific category)
 */
function filterFAQs(selectedCategory) {
    faqItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');

        if (selectedCategory === 'all') {
            // Show all items
            item.classList.remove('hidden-faq');
        } else if (itemCategory === selectedCategory) {
            // Show items matching the selected category
            item.classList.remove('hidden-faq');
        } else {
            // Hide items that don't match
            item.classList.add('hidden-faq');
            // Also close any open FAQ items when hiding
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
    });
}

// Initialize on page load - filter based on active button
const activeBtn = document.querySelector('.faq-category-btn.active');
if (activeBtn) {
    const initialCategory = activeBtn.getAttribute('data-category');
    filterFAQs(initialCategory);
}

// Add click event listeners
faqCategoryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const selectedCategory = btn.getAttribute('data-category');

        // Update active button state
        faqCategoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter FAQ items
        filterFAQs(selectedCategory);
    });
});
