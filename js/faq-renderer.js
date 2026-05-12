let currentCategory = 'all';

function getSections() { return [...document.querySelectorAll('.faq-category-section')]; }
function getItems() { return [...document.querySelectorAll('.faq-item')]; }

function setVisible(el, show) {
  el.style.display = show ? '' : 'none';
  if (show) el.removeAttribute('hidden'); else el.setAttribute('hidden', '');
}

function filterFAQsByCategory(category = 'all') {
  currentCategory = category;
  const sections = getSections();
  const isAll = category === 'all';

  sections.forEach((section) => {
    const matchesSection = section.dataset.categoryGroup === category;
    const heading = section.querySelector('.faq-category-heading');

    if (isAll) {
      setVisible(section, true);
      if (heading) setVisible(heading, true);
      section.querySelectorAll('.faq-item').forEach((item) => setVisible(item, true));
    } else {
      setVisible(section, matchesSection);
      if (heading) setVisible(heading, false);
      if (matchesSection) section.querySelectorAll('.faq-item').forEach((item) => setVisible(item, true));
    }
  });
}

function setActiveButton(btns, active) {
  btns.forEach((b) => {
    const on = b === active;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

function initCategoryTabs() {
  const tabContainer = document.getElementById('faq-category-tabs'); if (!tabContainer) return;
  const btns = [...tabContainer.querySelectorAll('.faq-category-btn')];
  btns.forEach((btn) => btn.addEventListener('click', () => {
    const previousCategory = currentCategory;
    const category = btn.dataset.category;
    setActiveButton(btns, btn);
    filterFAQsByCategory(category);
    const searchInput = document.getElementById('faq-search'); if (searchInput) searchInput.value = '';
    if (previousCategory === 'all' && category !== 'all') {
      const map = { privacy: 'privacy-security' };
      const anchor = map[category] || category;
      const target = document.getElementById(`faq-heading-${anchor}`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }));
}

function initFAQAccordions() { getItems().forEach((item) => { const q=item.querySelector('.faq-question'); const a=item.querySelector('.faq-answer'); const i=item.querySelector('.faq-icon'); if(!q||!a)return; a.style.maxHeight='0'; a.style.overflow='hidden'; a.style.transition='max-height 0.3s ease, margin-top 0.3s ease'; a.style.marginTop='0'; q.addEventListener('click',()=>{const ex=q.getAttribute('aria-expanded')==='true'; a.style.maxHeight=ex?'0':`${a.scrollHeight}px`; a.style.marginTop=ex?'0':'1rem'; q.setAttribute('aria-expanded', ex?'false':'true'); if(i){i.style.transition='transform 0.3s ease'; i.style.transform=ex?'rotate(0deg)':'rotate(180deg)';}});}); }

function showNoResults(show) {
  const container = document.getElementById('faq-container'); if (!container) return;
  let el = container.querySelector('.faq-no-results');
  if (!el) {
    el = document.createElement('div');
    el.className = 'faq-no-results text-center py-12 text-slate-500';
    el.innerHTML = '<p class="text-lg">No results found</p><button type="button" class="faq-clear-filters mt-4 px-4 py-2 rounded-full bg-slate-100">Clear Filters</button>';
    container.appendChild(el);
    el.querySelector('.faq-clear-filters').addEventListener('click', () => {
      const searchInput = document.getElementById('faq-search'); if (searchInput) searchInput.value = '';
      const allBtn = document.querySelector('.faq-category-btn[data-category="all"]'); if (allBtn) allBtn.click();
      filterFAQsByCategory('all');
      showNoResults(false);
    });
  }
  setVisible(el, show);
}

function initFAQSearch() {
  const input = document.getElementById('faq-search'); if (!input) return;
  input.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    if (!term) { showNoResults(false); filterFAQsByCategory(currentCategory); return; }
    let count = 0;
    getSections().forEach((section) => {
      const matchesSection = currentCategory === 'all' || section.dataset.categoryGroup === currentCategory;
      setVisible(section, matchesSection);
      section.querySelectorAll('.faq-item').forEach((item) => {
        if (!matchesSection) return setVisible(item, false);
        const q = item.querySelector('.faq-question h3')?.textContent.toLowerCase() || '';
        const a = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
        const ok = q.includes(term) || a.includes(term);
        setVisible(item, ok);
        if (ok) count += 1;
      });
    });
    showNoResults(count === 0);
  });
}

function initializeFAQSection(){initFAQAccordions();initCategoryTabs();if(typeof lucide!=='undefined') lucide.createIcons();initFAQSearch();filterFAQsByCategory('all');}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeFAQSection); else initializeFAQSection();
