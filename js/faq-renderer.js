/**
 * FAQ Dynamic Renderer
 * Loads FAQ data from JSON and renders with category filtering
 */

let faqData = null;
let currentCategory = 'all';

/**
 * Load FAQ data from JSON file
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
        return { categories: [], faqs: [] };
    }
}

/**
 * Render FAQ items based on selected category
 * @param {string} category - The category to filter by ('all' shows all)
 */
function renderFAQs(category = 'all') {
    const container = document.getElementById('faq-container');
    if (!container || !faqData) return;

    currentCategory = category;

    // Filter FAQs by category
    const filteredFAQs = category === 'all'
        ? faqData.faqs
        : faqData.faqs.filter(faq => faq.category === category);

    // Render FAQ items
    container.innerHTML = filteredFAQs.map((faq, index) => `
        <div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="${faq.category}" data-faq-id="${faq.id}">
            <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
                <h3 class="text-lg font-bold text-slate-900 pr-8">${faq.question}</h3>
                <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
            </button>
            <div class="faq-answer text-slate-600 leading-relaxed">
                ${faq.answer}
            </div>
        </div>
    `).join('');

    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize accordion functionality
    initFAQAccordions();
}

/**
 * Render category tabs
 */
function renderCategoryTabs() {
    const tabContainer = document.getElementById('faq-category-tabs');
    if (!tabContainer || !faqData) return;

    tabContainer.innerHTML = faqData.categories.map(cat => `
        <button class="faq-category-btn ${cat.id === currentCategory ? 'active' : ''} px-4 py-2 rounded-full text-sm font-semibold transition-all"
                data-category="${cat.id}">
            ${cat.label}
        </button>
    `).join('');

    // Add event listeners to category buttons
    const categoryButtons = tabContainer.querySelectorAll('.faq-category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Render FAQs for selected category
            const category = btn.dataset.category;
            renderFAQs(category);
        });
    });
}

/**
 * Initialize FAQ accordion functionality
 */
function initFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (!question || !answer) return;

        // Set initial state
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease, margin-top 0.3s ease';
        answer.style.marginTop = '0';

        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Collapse
                answer.style.maxHeight = '0';
                answer.style.marginTop = '0';
                question.setAttribute('aria-expanded', 'false');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            } else {
                // Expand
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.marginTop = '1rem';
                question.setAttribute('aria-expanded', 'true');
                if (icon) {
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
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        if (searchTerm === '') {
            // If search is empty, show current category
            renderFAQs(currentCategory);
            return;
        }

        // Filter FAQs by search term
        const filteredFAQs = faqData.faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm) ||
            faq.answer.toLowerCase().includes(searchTerm)
        );

        // Render filtered FAQs
        const container = document.getElementById('faq-container');
        if (!container) return;

        if (filteredFAQs.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 text-slate-500">
                    <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-4 text-slate-300"></i>
                    <p class="text-lg">No questions found matching "${searchTerm}"</p>
                    <p class="text-sm mt-2">Try different keywords or browse by category</p>
                </div>
            `;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            return;
        }

        container.innerHTML = filteredFAQs.map((faq, index) => `
            <div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="${faq.category}" data-faq-id="${faq.id}">
                <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
                    <h3 class="text-lg font-bold text-slate-900 pr-8">${faq.question}</h3>
                    <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
                </button>
                <div class="faq-answer text-slate-600 leading-relaxed">
                    ${faq.answer}
                </div>
            </div>
        `).join('');

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        initFAQAccordions();
    });
}

/**
 * Initialize FAQ section on page load
 */
async function initializeFAQSection() {
    await loadFAQData();
    renderCategoryTabs();
    renderFAQs(currentCategory);
    initFAQSearch();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFAQSection);
} else {
    initializeFAQSection();
}

// Export for use in other modules
export { loadFAQData, renderFAQs, initializeFAQSection };
