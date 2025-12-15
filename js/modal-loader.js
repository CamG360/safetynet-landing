/**
 * Modal Content Preloader
 * Pre-loads all modal content on page load to ensure close buttons exist for main.js
 * This ensures compatibility with existing modal management in main.js
 */

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
    try {
        const response = await fetch(`/modals/${modalFileName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load modal: ${modalFileName}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading modal:', error);
        return '<div class="p-8 text-center text-red-600">Error loading content. Please refresh the page.</div>';
    }
}

/**
 * Pre-load all modal content on page load
 * This ensures close buttons exist when main.js initializes
 */
async function preloadAllModals() {
    const loadPromises = Object.entries(modalConfig).map(async ([modalId, fileName]) => {
        const modalContainer = document.getElementById(modalId);
        if (!modalContainer) return;

        const contentContainer = modalContainer.querySelector('[data-modal-content]');
        if (!contentContainer) return;

        // Load and inject content
        const content = await loadModalContent(fileName);
        contentContainer.innerHTML = content;
    });

    // Wait for all modals to load
    await Promise.all(loadPromises);

    // Reinitialize Lucide icons for all loaded content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    console.log('✅ All modal content pre-loaded');
}

// Pre-load modals immediately (blocks main.js from loading until ready)
// Uses top-level await to ensure content exists before main.js initializes
if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
}
await preloadAllModals();

// Export for use in other modules
export { loadModalContent, preloadAllModals };
