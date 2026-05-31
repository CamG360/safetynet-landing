/* ============================================================
   SafetyNet — "First reactions" marquee controller
   Save as: js/reactions-marquee.js
   Load in index.html (defer, before </body>), matching the
   existing faq-renderer.js / story-loader.js pattern:
     <script type="module" src="js/reactions-marquee.js"></script>
   CSP-clean: no inline handlers, no inline styles.
   ============================================================ */

function initReactionsMarquee() {
    const marquee = document.getElementById('snMarquee');
    const pauseBtn = document.getElementById('snMarqueePause');
    if (!marquee || !pauseBtn) return;

    let paused = false;

    pauseBtn.addEventListener('click', () => {
        paused = !paused;
        marquee.classList.toggle('is-paused', paused);

        // swap icon + label
        pauseBtn.innerHTML = paused
            ? '<i data-lucide="play"></i>'
            : '<i data-lucide="pause"></i>';
        pauseBtn.setAttribute('aria-label', paused ? 'Play testimonials' : 'Pause testimonials');

        // re-materialize the swapped lucide icon (self-hosted lucide global)
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReactionsMarquee);
} else {
    initReactionsMarquee();
}

export { initReactionsMarquee };
