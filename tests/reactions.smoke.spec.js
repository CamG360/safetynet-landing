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

    // ── Desktop (≥ 1024 px): carousel ──────────────────────────
    test('5. desktop: carousel track, 4 cards, and controls present', async ({ page }) => {
        test.skip(vw(page) < 1024, 'desktop-only');
        await expect(page.locator('#snCarouselTrack')).toHaveCount(1);
        await expect(page.locator('#snCarouselTrack .sn-mq-card')).toHaveCount(4);
        await expect(page.locator('#snCarouselPrev')).toHaveCount(1);
        await expect(page.locator('#snCarouselNext')).toHaveCount(1);
        await expect(page.locator('.sn-carousel-dot')).toHaveCount(4);
    });

    test('6. desktop: carousel advances on next click and updates active dot', async ({ page }) => {
        test.skip(vw(page) < 1024, 'desktop-only');
        // Scroll #reactions into viewport first — overflow:hidden on the section
        // prevents Playwright's implicit scroll from reaching the button otherwise.
        await page.locator('#reactions').scrollIntoViewIfNeeded();
        const track = page.locator('#snCarouselTrack');
        const before = await track.evaluate(el => getComputedStyle(el).transform);
        await page.locator('#snCarouselNext').click();
        await page.waitForTimeout(500); // allow transition
        const after = await track.evaluate(el => getComputedStyle(el).transform);
        expect(before).not.toBe(after);
        await expect(page.locator('.sn-carousel-dot').nth(1)).toHaveClass(/sn-carousel-dot--active/);
    });

    // ── Mobile / tablet (< 1024 px): static grid ───────────────
    test('7. mobile/tablet: static grid visible with all 4 cards', async ({ page }) => {
        test.skip(vw(page) >= 1024, 'mobile/tablet-only');
        await expect(page.locator('.sn-static-grid')).toBeVisible();
        await expect(page.locator('.sn-static-grid .sn-mq-card')).toHaveCount(4);
    });

    test('8. mobile/tablet: no CSS animation on static grid; desktop carousel hidden', async ({ page }) => {
        test.skip(vw(page) >= 1024, 'mobile/tablet-only');
        await expect(page.locator('.sn-static-grid')).toBeVisible();
        const animName = await page.locator('.sn-static-grid').evaluate(
            el => getComputedStyle(el).animationName
        );
        expect(animName).toBe('none');
        const carousel = page.locator('#snCarousel');
        if (await carousel.count() > 0) {
            await expect(carousel).not.toBeVisible();
        }
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
