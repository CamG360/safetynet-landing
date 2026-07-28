/**
 * Modal Content Loader
 * Keeps the registration modal ready for the existing form wiring while loading
 * secondary modals only when visitors open them.
 */

const modalConfig = {
    'alertDemoModal': 'alert-demo',
    'registrationModal': 'registration',
    'privacyPolicyModal': 'privacy-policy',
    'termsOfServiceModal': 'terms-of-service'
};

const modalLoadPromises = new Map();

/**
 * Load modal content from external file
 * @param {string} modalFileName - The modal file name (without extension)
 * @returns {Promise<string>} - The modal HTML content
 */
async function loadModalContent(modalFileName) {
    try {
        // Use a path relative to the current page so it works when the site is hosted in a subdirectory
        const modalUrl = new URL(`modals/${modalFileName}.html`, window.location.href);
        const response = await fetch(modalUrl);
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
 * Ensure a modal's remote content has been loaded into its container.
 * @param {string} modalId - The modal wrapper ID
 * @returns {Promise<boolean>} - Whether content exists or was loaded
 */
async function ensureModalContentLoaded(modalId) {
    const modalContainer = document.getElementById(modalId);
    const modalFileName = modalConfig[modalId];

    if (!modalContainer || !modalFileName) return false;

    const contentContainer = modalContainer.querySelector('[data-modal-content]');
    if (!contentContainer) return false;

    if (contentContainer.dataset.loaded === 'true') return true;
    if (modalLoadPromises.has(modalId)) return modalLoadPromises.get(modalId);

    const loadPromise = (async () => {
        contentContainer.setAttribute('aria-busy', 'true');
        const content = await loadModalContent(modalFileName);
        contentContainer.innerHTML = content;
        contentContainer.dataset.loaded = 'true';
        contentContainer.removeAttribute('aria-busy');

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        return true;
    })();

    modalLoadPromises.set(modalId, loadPromise);
    return loadPromise;
}

/**
 * Pre-load selected modal content.
 * @param {string[]} modalIds - Modal IDs to preload
 */
async function preloadModals(modalIds = Object.keys(modalConfig)) {
    await Promise.all(modalIds.map(ensureModalContentLoaded));
}

// Keep the registration form available before main.js binds form handlers.
if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
}
await preloadModals(['registrationModal']);

// Export for use in other modules
export { ensureModalContentLoaded, loadModalContent, preloadModals };
