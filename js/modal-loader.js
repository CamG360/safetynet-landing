/**
 * Modal Lazy Loader
 * Loads modal content on-demand to reduce initial page tokens
 */

const modalCache = {};
const modalConfig = {
    'alertDemoModal': 'alert-demo',
    'registrationModal': 'registration',
    'privacyPolicyModal': 'privacy-policy',
    'termsOfServiceModal': 'terms-of-service'
};

/**
 * Load modal content from external file
 * @param {string} modalFileName - The modal file name (without extension)
 * @returns {Promise<string>} - The modal HTML content
 */
async function loadModalContent(modalFileName) {
    if (modalCache[modalFileName]) {
        return modalCache[modalFileName];
    }

    try {
        const response = await fetch(`/modals/${modalFileName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load modal: ${modalFileName}`);
        }
        const content = await response.text();
        modalCache[modalFileName] = content;
        return content;
    } catch (error) {
        console.error('Error loading modal:', error);
        return '<div class="p-8 text-center text-red-600">Error loading content. Please refresh the page.</div>';
    }
}

/**
 * Initialize modal content when opened
 * @param {string} modalId - The modal container ID
 */
async function initializeModal(modalId) {
    const modalContainer = document.getElementById(modalId);
    if (!modalContainer) return;

    // Check if content already loaded
    const contentContainer = modalContainer.querySelector('[data-modal-content]');
    if (contentContainer && contentContainer.innerHTML.trim()) {
        return; // Already loaded
    }

    const modalFileName = modalConfig[modalId];
    if (!modalFileName) return;

    const content = await loadModalContent(modalFileName);

    if (contentContainer) {
        contentContainer.innerHTML = content;

        // Reinitialize Lucide icons for the new content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Re-attach event listeners for close buttons
        attachModalCloseListeners(modalId);
    }
}

/**
 * Attach close button listeners for a specific modal
 * @param {string} modalId - The modal container ID
 */
function attachModalCloseListeners(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const closeButtons = modal.querySelectorAll('[id^="close"]');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Set up modal triggers on page load
 */
function setupModalTriggers() {
    // Alert Demo Modal triggers
    const alertDemoTriggers = document.querySelectorAll('#openAlertDemoBtn');
    alertDemoTriggers.forEach(trigger => {
        trigger.addEventListener('click', async () => {
            await initializeModal('alertDemoModal');
            document.getElementById('alertDemoModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    // Registration Modal triggers
    const registrationTriggers = document.querySelectorAll('.open-registration-modal');
    registrationTriggers.forEach(trigger => {
        trigger.addEventListener('click', async () => {
            await initializeModal('registrationModal');
            document.getElementById('registrationModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    // Privacy Policy Modal trigger
    const privacyTrigger = document.getElementById('openPrivacyPolicyBtn');
    if (privacyTrigger) {
        privacyTrigger.addEventListener('click', async (e) => {
            e.preventDefault();
            await initializeModal('privacyPolicyModal');
            document.getElementById('privacyPolicyModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    // Terms of Service Modal trigger
    const termsTrigger = document.getElementById('openTermsOfServiceBtn');
    if (termsTrigger) {
        termsTrigger.addEventListener('click', async (e) => {
            e.preventDefault();
            await initializeModal('termsOfServiceModal');
            document.getElementById('termsOfServiceModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupModalTriggers);
} else {
    setupModalTriggers();
}

// Export for use in other modules
export { loadModalContent, initializeModal };
