// ============================================================
// SafetyNet — "First reactions" section smoke test (Playwright)
// Run: npm run test:smoke
// ============================================================

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8123';

// Returns viewport width synchronously — used to skip tier-mismatched tests.
function vw(page) { return page.viewportSize().width; }

test.describe('First reactions section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle' });
    });

    // ── content ────────────────────────────────────────────────
    test('1. #reactions section exists', async ({ page }) => {
        await expect(page.locator('#reactions')).toHaveCount(1);
    });

    test('2. hero exists; #problem has the before/after heading', async ({ page }) => {
        await expect(page.locator('#hero')).toHaveCount(1);
        await expect(page.locator('#problem')).toContainText('How SafetyNet protects you');
    });

    test('3. lead quote + all four attributions present', async ({ page }) => {
        const section = page.locator('#reactions');
        await expect(section).toContainText('five tracking apps');
        await expect(section).toContainText('Zolania');
        for (const name of ['Michael', 'Anna & Julia', 'Andrew', 'Jordan']) {
            await expect(section).toContainText(name);
        }
    });

    test('4. T11 (Cali, Colombia) is NOT present', async ({ page }) => {
        const body = (await page.locator('body').innerText()).toLowerCase();
        expect(body).not.toContain('colombia');
        expect(body).not.toContain('cali,');
    });

    // ── Desktop (≥ 1024 px): auto-scrolling marquee ───────────
    test('5. desktop: marquee track, two groups of 4 cards, and pause button present', async ({ page }) => {
        test.skip(vw(page) < 1024, 'desktop-only');
        await expect(page.locator('#snMarquee')).toHaveCount(1);
        await expect(page.locator('.sn-marquee-track')).toHaveCount(1);
        await expect(page.locator('.sn-marquee-group')).toHaveCount(2);
        await expect(page.locator('.sn-marquee-group:first-child .sn-mq-card')).toHaveCount(4);
        await expect(page.locator('#snMarqueePause')).toHaveCount(1);
    });

    test('6. desktop: marquee animates; pause button toggles is-paused', async ({ page }) => {
        test.skip(vw(page) < 1024, 'desktop-only');
        await page.locator('#reactions').scrollIntoViewIfNeeded();
        const animName = await page.locator('.sn-marquee-track').evaluate(
            el => getComputedStyle(el).animationName
        );
        expect(animName).toBe('sn-marquee-scroll');
        await page.locator('#snMarqueePause').click();
        const hasPaused = await page.locator('#snMarquee').evaluate(
            el => el.classList.contains('is-paused')
        );
        expect(hasPaused).toBe(true);
    });

    // ── Mobile / tablet (< 1024 px): scroll-snap swipe carousel ──
    test('7. mobile/tablet: scroll-snap carousel visible with all 4 cards', async ({ page }) => {
        test.skip(vw(page) >= 1024, 'mobile/tablet-only');
        await expect(page.locator('.sn-reactions-mobile')).toBeVisible();
        await expect(page.locator('.sn-reactions-mobile .sn-mq-card')).toHaveCount(4);
        const snapType = await page.locator('.sn-reactions-mobile').evaluate(
            el => getComputedStyle(el).scrollSnapType
        );
        expect(snapType).toMatch(/x/);
    });

    test('8. mobile/tablet: no CSS animation on swipe container; desktop marquee hidden', async ({ page }) => {
        test.skip(vw(page) >= 1024, 'mobile/tablet-only');
        await expect(page.locator('.sn-reactions-mobile')).toBeVisible();
        const animName = await page.locator('.sn-reactions-mobile').evaluate(
            el => getComputedStyle(el).animationName
        );
        expect(animName).toBe('none');
        await expect(page.locator('.sn-reactions-desktop')).not.toBeVisible();
    });

    // ── page health ────────────────────────────────────────────
    test('9. no console errors on load', async ({ page }) => {
        const errors = [];
        page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
        await page.reload({ waitUntil: 'networkidle' });
        expect(errors).toEqual([]);
    });

    test('10. no horizontal overflow at mobile width', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow).toBeLessThanOrEqual(1);
    });

    test('11. nav Overview resolves to #problem', async ({ page }) => {
        const href = await page.locator('nav a[href="#problem"]').first().getAttribute('href');
        expect(href).toBe('#problem');
    });
});
