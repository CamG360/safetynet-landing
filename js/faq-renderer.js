/**
 * FAQ Dynamic Renderer
 * Enhances pre-rendered FAQ HTML with interactivity (accordions, filtering, search)
 * 
 * IMPORTANT: FAQs are baked into index.html at build time via build-faqs.js
 * This script ENHANCES existing HTML — it does not create it.
 */

let faqData = null;
let currentCategory = 'all';

/**
 * Load FAQ data from JSON file (for search/filter functionality)
 */
async function loadFAQData() {
    if (faqData) return faqData;

    try {
        const response = await fetch('/data/faq.json');
        if (!response.ok) {
            throw new Error('Failed to load FAQ data');
        }
        faqData = await response.json();
        return faqData;
    } catch (error) {
        console.error('Error loading FAQ data:', error);
        // Return null — FAQ HTML is already in page, so basic accordions still work
        return null;
    }
}

/**
 * Filter visible FAQs by category (operates on existing DOM)
 * @param {string} category - The category to filter by ('all' shows all)
 */
function filterFAQsByCategory(category = 'all') {
    const container = document.getElementById('faq-container');
    if (!container) return;

    currentCategory = category;

    const faqItems = container.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = '';
            item.removeAttribute('hidden');
        } else {
            item.style.display = 'none';
            item.setAttribute('hidden', '');
        }
    });
}

/**
 * Initialize category tab click handlers
 */
function initCategoryTabs() {
    const tabContainer = document.getElementById('faq-category-tabs');
    if (!tabContainer) return;

    const categoryButtons = tabContainer.querySelectorAll('.faq-category-btn');
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter FAQs for selected category
            const category = btn.dataset.category;
            filterFAQsByCategory(category);
            
            // Clear search input when changing category
            const searchInput = document.getElementById('faq-search');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });
}

/**
 * Initialize FAQ accordion functionality on existing HTML
 */
function initFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (!question || !answer) return;

        // Set initial collapsed state
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease, margin-top 0.3s ease';
        answer.style.marginTop = '0';

        // Add click handler
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Collapse
                answer.style.maxHeight = '0';
                answer.style.marginTop = '0';
                question.setAttribute('aria-expanded', 'false');
                if (icon) {
                    icon.style.transition = 'transform 0.3s ease';
                    icon.style.transform = 'rotate(0deg)';
                }
            } else {
                // Expand
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.marginTop = '1rem';
                question.setAttribute('aria-expanded', 'true');
                if (icon) {
                    icon.style.transition = 'transform 0.3s ease';
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
}

/**
 * Initialize FAQ search functionality
 */
function initFAQSearch() {
    const searchInput = document.getElementById('faq-search');
    const container = document.getElementById('faq-container');
    if (!searchInput || !container) return;

    const removeNoResultsMessage = () => {
        const existingMessage = container.querySelector('#faq-no-results');
        if (existingMessage) {
            existingMessage.remove();
        }
    };

    searchInput.addEventListener('input', (e) => {
        const rawSearch = e.target.value.trim();
        const searchTerm = rawSearch.toLowerCase();
        const faqItems = container.querySelectorAll('.faq-item');

        if (searchTerm === '') {
            // If search is empty, restore category filter
            removeNoResultsMessage();
            filterFAQsByCategory(currentCategory);
            return;
        }

        // Filter by search term (searches question and answer text)
        let matchCount = 0;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3')?.textContent.toLowerCase() || '';
            const answer = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = '';
                item.removeAttribute('hidden');
                matchCount++;
            } else {
                item.style.display = 'none';
                item.setAttribute('hidden', '');
            }
        });

        // Show "no results" message if needed
        let noResultsEl = container.querySelector('#faq-no-results');
        
        if (matchCount === 0) {
            if (!noResultsEl) {
                noResultsEl = document.createElement('div');
                noResultsEl.id = 'faq-no-results';
                noResultsEl.className = 'text-center py-8 text-slate-500';
                noResultsEl.innerHTML = `
                    No questions found for "<span class="font-medium text-slate-700"></span>". Try a different keyword, or reach out to us at <a href="mailto:hello@safetynetbeta.com" class="text-blue-600 hover:underline">hello@safetynetbeta.com</a>.
                `;
                container.appendChild(noResultsEl);
            }

            const querySpan = noResultsEl.querySelector('span');
            if (querySpan) {
                querySpan.textContent = rawSearch;
            }
        } else {
            removeNoResultsMessage();
        }
    });
}

/**
 * Initialize FAQ section — enhances existing HTML
 */
async function initializeFAQSection() {
    // Initialize accordions immediately (works without JSON)
    initFAQAccordions();
    
    // Initialize category tabs (works without JSON)
    initCategoryTabs();
    
    // Initialize Lucide icons for FAQ section
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Load FAQ data for search functionality (non-blocking)
    await loadFAQData();
    
    // Initialize search (enhanced with JSON data)
    initFAQSearch();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFAQSection);
} else {
    initializeFAQSection();
}

// Export for use in other modules
export { loadFAQData, filterFAQsByCategory, initializeFAQSection };
