export const CONTACT_EMAIL = 'hello@safetynetbeta.com';

const contactEmailTemplate = document.createElement('template');

contactEmailTemplate.innerHTML = `
    <span class="contact-email inline-flex items-center gap-2">
        <a href="mailto:${CONTACT_EMAIL}" class="contact-email__text text-current no-underline">${CONTACT_EMAIL}</a>
        <button class="copy-email-btn inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all relative w-8 h-8" data-email="${CONTACT_EMAIL}" aria-label="Copy email address">
            <i data-lucide="copy" class="contact-email__icon w-4 h-4"></i>
            <span class="copy-tooltip hidden absolute -top-10 left-1/2 -translate-x-1/2 text-xs py-1 px-3 rounded whitespace-nowrap shadow-lg bg-slate-900 text-white">Copied!</span>
        </button>
    </span>
`;

/**
 * Creates a contact email fragment with customizable classes while preserving copy functionality.
 * @param {Object} [options]
 * @param {string} [options.containerClasses] - Additional classes for the container wrapper.
 * @param {string} [options.emailClasses] - Additional classes for the email text/link.
 * @param {string} [options.buttonClasses] - Additional classes for the copy button.
 * @param {string} [options.iconClasses] - Additional classes for the icon element.
 * @param {string} [options.tooltipClasses] - Additional classes for the tooltip.
 * @returns {DocumentFragment}
 */
export function createContactEmail(options = {}) {
    const {
        containerClasses = '',
        emailClasses = '',
        buttonClasses = '',
        iconClasses = '',
        tooltipClasses = '',
    } = options;

    const fragment = contactEmailTemplate.content.cloneNode(true);
    const container = fragment.querySelector('.contact-email');
    const email = fragment.querySelector('.contact-email__text');
    const button = fragment.querySelector('.copy-email-btn');
    const icon = fragment.querySelector('.contact-email__icon');
    const tooltip = fragment.querySelector('.copy-tooltip');

    container.className = ['contact-email inline-flex items-center gap-2', containerClasses].filter(Boolean).join(' ');
    email.className = ['contact-email__text text-current no-underline', emailClasses].filter(Boolean).join(' ');
    button.className = ['copy-email-btn inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all relative w-8 h-8', buttonClasses].filter(Boolean).join(' ');
    icon.className = ['contact-email__icon w-4 h-4', iconClasses].filter(Boolean).join(' ');
    tooltip.className = ['copy-tooltip hidden absolute -top-10 left-1/2 -translate-x-1/2 text-xs py-1 px-3 rounded whitespace-nowrap shadow-lg bg-slate-900 text-white', tooltipClasses].filter(Boolean).join(' ');

    return fragment;
}

/**
 * Replaces placeholder elements with hydrated contact email snippets.
 */
export function hydrateContactEmailPlaceholders() {
    const placeholders = document.querySelectorAll('[data-contact-email]');

    placeholders.forEach((placeholder) => {
        const options = {
            containerClasses: placeholder.getAttribute('data-container-class') || '',
            emailClasses: placeholder.getAttribute('data-email-class') || '',
            buttonClasses: placeholder.getAttribute('data-button-class') || '',
            iconClasses: placeholder.getAttribute('data-icon-class') || '',
            tooltipClasses: placeholder.getAttribute('data-tooltip-class') || '',
        };

        const contactEmail = createContactEmail(options);
        placeholder.replaceWith(contactEmail);
    });
}
