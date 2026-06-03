function initReactionsMarquee() {
    const btn = document.getElementById('snMarqueePause');
    const marquee = document.getElementById('snMarquee');
    if (!btn || !marquee) return;

    btn.addEventListener('click', () => {
        const paused = marquee.classList.toggle('is-paused');
        btn.classList.toggle('is-paused', paused);
        btn.setAttribute('aria-label', paused ? 'Play testimonials' : 'Pause testimonials');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReactionsMarquee);
} else {
    initReactionsMarquee();
}

export { initReactionsMarquee };
