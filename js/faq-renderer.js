/**
 * FAQ Dynamic Renderer
 * Enhances pre-rendered FAQ HTML with interactivity (accordions, filtering, search)
 *
 * IMPORTANT: FAQs are baked into index.html at build time via build-faqs.js
 * This script ENHANCES existing HTML — it does not create it.
 */

let faqData = null;
let currentCategory = 'all';
let isGroupedView = false;
let groupedViewEl = null;

const CATEGORY_DEFS = [
    { key: 'getting-started', label: 'Getting Started' },
    { key: 'how-it-works',    label: 'How It Works' },
    { key: 'privacy',         label: 'Privacy & Security' },
    { key: 'why-safetynet',   label: 'Why SafetyNet' },
    { key: 'launch-pricing',  label: 'Launch & Pricing' },
];

/**
 * Load FAQ data from JSON file (for search/filter functionality)
 */
async function loadFAQData() {
    if (faqData) return faqData;

    try {
        const response = await fetch('/data/faq.json');
        if (!response.ok) throw new Error('Failed to load FAQ data');
        faqData = await response.json();
        return faqData;
    } catch (error) {
        console.error('Error loading FAQ data:', error);
        // Return null — FAQ HTML is already in page, so basic accordions still work
        return null;
    }
}

/**
 * Build the grouped "All" view by moving real FAQ DOM nodes into category group wrappers.
 * Moving nodes (not cloning) preserves existing accordion event listeners.
 */
function enterGroupedView(container) {
    if (isGroupedView) return;

    const allItems = Array.from(container.querySelectorAll('.faq-item'));

    // Reset any leftover display state before grouping
    allItems.forEach(item => {
        item.style.display = '';
        item.removeAttribute('hidden');
    });

    groupedViewEl = document.createElement('div');
    groupedViewEl.className = 'faq-grouped-view space-y-3';

    CATEGORY_DEFS.forEach(({ key, label }) => {
        const items = allItems.filter(item => item.dataset.category === key);
        if (items.length === 0) return;

        const count = items.length;

        const groupEl = document.createElement('div');
        groupEl.className = 'faq-group border border-slate-200 rounded-xl overflow-hidden';
        groupEl.dataset.group = key;

        const headerBtn = document.createElement('button');
        headerBtn.className = 'faq-group-header w-full flex justify-between items-center text-left px-6 py-5 bg-slate-50 hover:bg-teal-50 transition-colors';
        headerBtn.setAttribute('aria-expanded', 'false');
        headerBtn.innerHTML = `
            <div class="flex items-center gap-3">
                <h3 class="text-lg font-bold text-slate-900">${label}</h3>
                <span class="text-sm text-slate-500 font-normal">${count} question${count !== 1 ? 's' : ''}</span>
            </div>
            <i data-lucide="chevron-right" class="w-5 h-5 text-teal-500 faq-group-icon flex-shrink-0" style="transition: transform 0.3s ease;"></i>
        `;

        const bodyEl = document.createElement('div');
        bodyEl.className = 'faq-group-body';
        bodyEl.style.display = 'none';

        const innerEl = document.createElement('div');
        innerEl.className = 'space-y-3 p-4 pt-3 border-t border-slate-100 bg-white';

        // Move actual DOM nodes — preserves accordion listeners
        items.forEach(item => innerEl.appendChild(item));
        bodyEl.appendChild(innerEl);

        headerBtn.addEventListener('click', () => {
            const expanded = headerBtn.getAttribute('aria-expanded') === 'true';
            const icon = headerBtn.querySelector('.faq-group-icon');
            if (expanded) {
                bodyEl.style.display = 'none';
                headerBtn.setAttribute('aria-expanded', 'false');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                bodyEl.style.display = '';
                headerBtn.setAttribute('aria-expanded', 'true');
                if (icon) icon.style.transform = 'rotate(90deg)';
            }
        });

        groupEl.appendChild(headerBtn);
        groupEl.appendChild(bodyEl);
        groupedViewEl.appendChild(groupEl);
    });

    container.appendChild(groupedViewEl);

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    isGroupedView = true;
}

/**
 * Tear down the grouped view, returning all FAQ nodes to the flat container.
 */
function exitGroupedView(container) {
    if (!isGroupedView || !groupedViewEl) return;

    Array.from(groupedViewEl.querySelectorAll('.faq-item')).forEach(item => {
        item.style.display = '';
        item.removeAttribute('hidden');
        container.appendChild(item);
    });

    groupedViewEl.remove();
    groupedViewEl = null;
    isGroupedView = false;
}

/**
 * Filter visible FAQs by category.
 * 'all' → grouped view with collapsible category sections.
 * specific category → flat list of matching items.
 */
function filterFAQsByCategory(category = 'all') {
    const container = document.getElementById('faq-container');
    if (!container) return;

    currentCategory = category;

    if (category === 'all') {
        if (!isGroupedView) {
            enterGroupedView(container);
        }
        return;
    }

    if (isGroupedView) {
        exitGroupedView(container);
    }

    container.querySelectorAll('.faq-item').forEach(item => {
        if (item.dataset.category === category) {
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
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterFAQsByCategory(btn.dataset.category);

            const searchInput = document.getElementById('faq-search');
            if (searchInput) searchInput.value = '';
        });
    });
}

/**
 * Initialize FAQ accordion functionality on existing HTML
 */
function initFAQAccordions() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer   = item.querySelector('.faq-answer');
        const icon     = item.querySelector('.faq-icon');

        if (!question || !answer) return;

        answer.style.maxHeight  = '0';
        answer.style.overflow   = 'hidden';
        answer.style.transition = 'max-height 0.3s ease, margin-top 0.3s ease';
        answer.style.marginTop  = '0';

        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                answer.style.maxHeight = '0';
                answer.style.marginTop = '0';
                question.setAttribute('aria-expanded', 'false');
                if (icon) {
                    icon.style.transition = 'transform 0.3s ease';
                    icon.style.transform  = 'rotate(0deg)';
                }
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.marginTop = '1rem';
                question.setAttribute('aria-expanded', 'true');
                if (icon) {
                    icon.style.transition = 'transform 0.3s ease';
                    icon.style.transform  = 'rotate(180deg)';
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
    const container   = document.getElementById('faq-container');
    if (!searchInput || !container) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        if (searchTerm === '') {
            // Exit grouped view so items are flat before re-applying category filter
            if (isGroupedView) exitGroupedView(container);
            filterFAQsByCategory(currentCategory);
            return;
        }

        // Flatten grouped view for search
        if (isGroupedView) {
            exitGroupedView(container);
        }

        // Show all items first, then hide non-matches
        const faqItems = container.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.style.display = '';
            item.removeAttribute('hidden');
        });

        let matchCount = 0;
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3')?.textContent.toLowerCase() || '';
            const answer   = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';

            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = '';
                item.removeAttribute('hidden');
                matchCount++;
            } else {
                item.style.display = 'none';
                item.setAttribute('hidden', '');
            }
        });

        let noResultsEl = container.querySelector('.faq-no-results');

        if (matchCount === 0) {
            if (!noResultsEl) {
                noResultsEl = document.createElement('div');
                noResultsEl.className = 'faq-no-results text-center py-12 text-slate-500';
                noResultsEl.innerHTML = `
                    <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-4 text-slate-300"></i>
                    <p class="text-lg">No questions found</p>
                    <p class="text-sm mt-2">Try different keywords or browse by category</p>
                `;
                container.appendChild(noResultsEl);
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
            noResultsEl.style.display = '';
        } else if (noResultsEl) {
            noResultsEl.style.display = 'none';
        }
    });
}

/**
 * Initialize FAQ section — enhances existing HTML
 */
async function initializeFAQSection() {
    // Accordions first (works without JSON, must run before grouped view)
    initFAQAccordions();

    // Category tabs
    initCategoryTabs();

    // Lucide icons for existing HTML
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Start in grouped "all" view
    filterFAQsByCategory('all');

    // Load JSON data (non-blocking)
    await loadFAQData();

    // Search (enhanced with JSON data)
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
