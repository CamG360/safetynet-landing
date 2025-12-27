#!/usr/bin/env node
/**
 * Build script: Bakes FAQ content from data/faq.json into index.html
 * Run before deploy: node build-faqs.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const FAQ_JSON_PATH = path.join(__dirname, 'data', 'faq.json');
const INDEX_HTML_PATH = path.join(__dirname, 'index.html');

// Markers in index.html
const FAQ_CONTAINER_START = '<div id="faq-container" class="space-y-4">';
const FAQ_CONTAINER_END = '</div>\n\n            <!-- Contact Callout -->';

const CATEGORY_TABS_START = '<div id="faq-category-tabs" class="flex flex-wrap justify-center gap-2 mb-8">';
const CATEGORY_TABS_END = '</div>\n\n            <!-- FAQ Container';

/**
 * Generate HTML for a single FAQ item
 */
function generateFAQItemHTML(faq) {
    return `
                <div class="faq-item bg-white rounded-xl border border-slate-200 p-6" data-category="${faq.category}" data-faq-id="${faq.id}">
                    <button class="faq-question w-full flex justify-between items-center text-left" aria-expanded="false">
                        <h3 class="text-lg font-bold text-slate-900 pr-8">${faq.question}</h3>
                        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 faq-icon flex-shrink-0"></i>
                    </button>
                    <div class="faq-answer text-slate-600 leading-relaxed">
                        ${faq.answer}
                    </div>
                </div>`;
}

/**
 * Generate HTML for category tabs
 */
function generateCategoryTabsHTML(categories) {
    return categories.map(cat => `
                <button class="faq-category-btn ${cat.id === 'all' ? 'active' : ''} px-4 py-2 rounded-full text-sm font-semibold transition-all"
                        data-category="${cat.id}">
                    ${cat.label}
                </button>`).join('');
}

/**
 * Main build function
 */
function buildFAQs() {
    console.log('📖 Reading FAQ data...');
    
    // Read FAQ JSON
    let faqData;
    try {
        const faqJSON = fs.readFileSync(FAQ_JSON_PATH, 'utf8');
        faqData = JSON.parse(faqJSON);
    } catch (error) {
        console.error('❌ Failed to read faq.json:', error.message);
        process.exit(1);
    }

    console.log(`   Found ${faqData.faqs.length} FAQs in ${faqData.categories.length} categories`);

    // Read index.html
    let indexHTML;
    try {
        indexHTML = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
    } catch (error) {
        console.error('❌ Failed to read index.html:', error.message);
        process.exit(1);
    }

    // Generate FAQ HTML
    console.log('🔨 Generating FAQ HTML...');
    const faqItemsHTML = faqData.faqs.map(generateFAQItemHTML).join('\n');
    const categoryTabsHTML = generateCategoryTabsHTML(faqData.categories);

    // Replace FAQ container content
    console.log('📝 Injecting into index.html...');
    
    // Find and replace FAQ container
    const faqContainerRegex = new RegExp(
        escapeRegex(FAQ_CONTAINER_START) + '[\\s\\S]*?' + escapeRegex(FAQ_CONTAINER_END),
        'g'
    );
    
    const newFAQContainer = FAQ_CONTAINER_START + '\n' + faqItemsHTML + '\n            ' + FAQ_CONTAINER_END;
    
    if (!faqContainerRegex.test(indexHTML)) {
        console.error('❌ Could not find FAQ container markers in index.html');
        process.exit(1);
    }
    
    indexHTML = indexHTML.replace(faqContainerRegex, newFAQContainer);

    // Find and replace category tabs
    const categoryTabsRegex = new RegExp(
        escapeRegex(CATEGORY_TABS_START) + '[\\s\\S]*?' + escapeRegex(CATEGORY_TABS_END),
        'g'
    );
    
    const newCategoryTabs = CATEGORY_TABS_START + categoryTabsHTML + '\n            ' + CATEGORY_TABS_END;
    
    if (!categoryTabsRegex.test(indexHTML)) {
        console.error('❌ Could not find category tabs markers in index.html');
        process.exit(1);
    }
    
    indexHTML = indexHTML.replace(categoryTabsRegex, newCategoryTabs);

    // Write updated index.html
    try {
        fs.writeFileSync(INDEX_HTML_PATH, indexHTML, 'utf8');
    } catch (error) {
        console.error('❌ Failed to write index.html:', error.message);
        process.exit(1);
    }

    console.log('✅ FAQs baked into index.html successfully!');
    console.log(`   - ${faqData.faqs.length} FAQ items`);
    console.log(`   - ${faqData.categories.length} category tabs`);
}

/**
 * Escape special regex characters in a string
 */
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run
buildFAQs();
