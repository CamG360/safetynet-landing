/**
 * Story Content Lazy Loader
 * Loads extended story content on demand with toggle support for mobile users
 */

let storyLoaded = false;
let storyExpanded = false;

/**
 * Load extended story content from external file
 */
async function loadExtendedStory() {
    if (!storyLoaded) {
        try {
            const response = await fetch('/content/our-story-extended.html');
            if (!response.ok) {
                throw new Error('Failed to load extended story');
            }

            const content = await response.text();
            const container = document.getElementById('story-extended');

            if (container) {
                container.innerHTML = content;

                // Reinitialize Lucide icons for the new content
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }

                // Reinitialize story toggle accordions
                initStoryToggles();

                storyLoaded = true;
            }
        } catch (error) {
            console.error('Error loading extended story:', error);
            return;
        }
    }

    // Toggle expanded state
    toggleStoryExpansion();
}

/**
 * Toggle story expansion/collapse
 */
function toggleStoryExpansion() {
    const container = document.getElementById('story-extended');
    const button = document.getElementById('read-full-story-btn');
    const buttonText = button?.querySelector('span');
    const buttonIcon = button?.querySelector('i');

    if (!container || !button) return;

    if (storyExpanded) {
        // Collapse
        container.classList.add('hidden');
        if (buttonText) buttonText.textContent = 'Read Full Story';
        if (buttonIcon) {
            buttonIcon.setAttribute('data-lucide', 'arrow-down');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Scroll back to the story section header
        const storySection = document.getElementById('our-story');
        if (storySection) {
            storySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        storyExpanded = false;
    } else {
        // Expand
        container.classList.remove('hidden');
        if (buttonText) buttonText.textContent = 'Read Less';
        if (buttonIcon) {
            buttonIcon.setAttribute('data-lucide', 'arrow-up');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Smooth scroll to the extended content
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });

        storyExpanded = true;
    }
}

/**
 * Initialize story toggle accordions for expanded content
 */
function initStoryToggles() {
    const storyItems = document.querySelectorAll('.story-item');

    storyItems.forEach(item => {
        const toggle = item.querySelector('.story-toggle');
        const details = item.querySelector('.story-details');
        const chevron = item.querySelector('.story-chevron');

        if (!toggle || !details) return;

        // Set initial state
        details.style.maxHeight = '0';
        details.style.overflow = 'hidden';
        details.style.transition = 'max-height 0.3s ease, margin-top 0.3s ease';
        details.style.marginTop = '0';

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Collapse
                details.style.maxHeight = '0';
                details.style.marginTop = '0';
                toggle.setAttribute('aria-expanded', 'false');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            } else {
                // Expand
                details.style.maxHeight = details.scrollHeight + 'px';
                details.style.marginTop = '0.5rem';
                toggle.setAttribute('aria-expanded', 'true');
                if (chevron) {
                    chevron.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
}

/**
 * Set up the "Read Full Story" button
 */
function setupStoryButton() {
    const button = document.getElementById('read-full-story-btn');
    if (button) {
        button.addEventListener('click', loadExtendedStory);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupStoryButton);
} else {
    setupStoryButton();
}

// Export for use in other modules
export { loadExtendedStory };
