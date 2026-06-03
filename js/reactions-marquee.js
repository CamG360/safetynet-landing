function initReactionsCarousel() {
    const track   = document.getElementById('snCarouselTrack');
    const prevBtn = document.getElementById('snCarouselPrev');
    const nextBtn = document.getElementById('snCarouselNext');
    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.sn-mq-card');
    const dots  = document.querySelectorAll('.sn-carousel-dot');
    const GAP   = 18;
    let idx     = 0;

    function cardStep() {
        return cards[0].offsetWidth + GAP;
    }

    function goTo(n) {
        idx = Math.max(0, Math.min(n, cards.length - 1));
        track.style.transform = `translateX(-${idx * cardStep()}px)`;
        dots.forEach((d, i) => d.classList.toggle('sn-carousel-dot--active', i === idx));
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = idx === cards.length - 1;
    }

    prevBtn.addEventListener('click', () => goTo(idx - 1));
    nextBtn.addEventListener('click', () => goTo(idx + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    window.addEventListener('resize', () => goTo(idx), { passive: true });

    goTo(0);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReactionsCarousel);
} else {
    initReactionsCarousel();
}

export { initReactionsCarousel };
