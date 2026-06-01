// ============================================================
// SafetyNet — "First reactions" section smoke test (Playwright)
// Run: npm run test:smoke
// ============================================================

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8123';

// Shared geometry helper — reads layout facts the browser has computed.
async function marqueeGeometry(page) {
    return page.evaluate(() => {
        const track  = document.querySelector('.sn-marquee-track');
        const groups = document.querySelectorAll('.sn-marquee-group');
        const cards  = document.querySelectorAll('.sn-mq-card');
        if (!track || groups.length < 2 || cards.length < 2) return null;
        const rects  = Array.from(cards).map(c => c.getBoundingClientRect());
        return {
            trackScrollWidth:  track.scrollWidth,
            group0Width:       groups[0].scrollWidth,
            group1Width:       groups[1].scrollWidth,
            card0Top:          rects[0].top,
            card1Top:          rects[1].top,   // second card — same row if marquee is horizontal
            card0Width:        rects[0].width,
        };
    });
}

// Shared motion helper — reads translateX twice and returns delta.
async function translateXDelta(page, waitMs = 1100) {
    const readX = () => page.evaluate(() => {
        const el = document.querySelector('.sn-marquee-track');
        if (!el) return 0;
        return new DOMMatrixReadOnly(getComputedStyle(el).transform).m41;
    });
    const x1 = await readX();
    await page.waitForTimeout(waitMs);
    const x2 = await readX();
    return Math.abs(x2 - x1);
}

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

    // ── marquee geometry (desktop 1280×800) ────────────────────
    test('5. desktop: two groups are equal-width and track = 2× one group', async ({ page }) => {
        const g = await marqueeGeometry(page);
        expect(g).not.toBeNull();
        // Each group must have real width
        expect(g.group0Width).toBeGreaterThan(300);
        // Both groups must be the same width (duplicates)
        expect(Math.abs(g.group0Width - g.group1Width)).toBeLessThan(5);
        // Track must be ~2× one group — this is what makes -50% loop correctly
        expect(Math.abs(g.trackScrollWidth - g.group0Width * 2)).toBeLessThan(10);
        // Cards must sit on the same horizontal row (not stacked)
        expect(Math.abs(g.card0Top - g.card1Top)).toBeLessThan(5);
    });

    test('6. desktop: marquee animates over 1s', async ({ page }) => {
        const delta = await translateXDelta(page);
        expect(delta).toBeGreaterThan(5);
    });

    // ── marquee geometry (mobile 390×844) ──────────────────────
    test('7. mobile: two groups equal-width and track = 2× one group', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.reload({ waitUntil: 'networkidle' });
        const g = await marqueeGeometry(page);
        expect(g).not.toBeNull();
        expect(g.group0Width).toBeGreaterThan(200);
        expect(Math.abs(g.group0Width - g.group1Width)).toBeLessThan(5);
        expect(Math.abs(g.trackScrollWidth - g.group0Width * 2)).toBeLessThan(10);
        // Cards on same row
        expect(Math.abs(g.card0Top - g.card1Top)).toBeLessThan(5);
    });

    test('8. mobile: marquee animates over 1s', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.reload({ waitUntil: 'networkidle' });
        const delta = await translateXDelta(page);
        expect(delta).toBeGreaterThan(5);
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
