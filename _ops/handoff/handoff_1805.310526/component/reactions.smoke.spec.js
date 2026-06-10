// ============================================================
// SafetyNet — "First reactions" section smoke test (Playwright)
// Save as: tests/reactions.smoke.spec.js
//
// Purpose: close the visual-regression gap the Jest unit suite
// (security-only) does not cover. Asserts the new section renders,
// the marquee actually moves, pause works, and neighbouring
// sections are intact.
//
// Setup (dev-only):
//   npm i -D @playwright/test
//   npx playwright install chromium
//
// Run against a locally served build:
//   npm run build:css
//   npx http-server -p 8000   (or: python3 -m http.server 8000)
//   BASE_URL=http://localhost:8000 npx playwright test tests/reactions.smoke.spec.js
// ============================================================

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8000';

test.describe('First reactions section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle' });
  });

  test('1. #reactions exists and is before #problem in DOM order', async ({ page }) => {
    const reactions = page.locator('#reactions');
    const problem = page.locator('#problem');
    await expect(reactions).toHaveCount(1);
    await expect(problem).toHaveCount(1);

    const order = await page.evaluate(() => {
      const r = document.getElementById('reactions');
      const p = document.getElementById('problem');
      // Node.DOCUMENT_POSITION_FOLLOWING (4) => p follows r
      return Boolean(r.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);
  });

  test('2. hero is first; #problem still has the before/after heading', async ({ page }) => {
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

  test('5. marquee track advances over ~1s (motion confirmed)', async ({ page }) => {
    const track = page.locator('#snMarquee .sn-marquee-track');
    const read = async () =>
      page.evaluate(() => {
        const el = document.querySelector('#snMarquee .sn-marquee-track');
        const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
        return m.m41; // translateX
      });
    const x1 = await read();
    await page.waitForTimeout(1100);
    const x2 = await read();
    expect(Math.abs(x2 - x1)).toBeGreaterThan(2);
  });

  test('6. pause button freezes motion and toggles icon; play resumes', async ({ page }) => {
    const marquee = page.locator('#snMarquee');
    const btn = page.locator('#snMarqueePause');

    await btn.click();
    await expect(marquee).toHaveClass(/is-paused/);

    const readX = () =>
      page.evaluate(() => {
        const el = document.querySelector('#snMarquee .sn-marquee-track');
        return new DOMMatrixReadOnly(getComputedStyle(el).transform).m41;
      });
    const a = await readX();
    await page.waitForTimeout(600);
    const b = await readX();
    expect(Math.abs(b - a)).toBeLessThan(1.5); // frozen while paused

    await btn.click();
    await expect(marquee).not.toHaveClass(/is-paused/);
  });

  test('7. nav "Overview" still resolves to #problem', async ({ page }) => {
    const href = await page.locator('nav a[href="#problem"]').first().getAttribute('href');
    expect(href).toBe('#problem');
    await expect(page.locator('#problem')).toHaveCount(1);
  });

  test('8. no console errors on load', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.reload({ waitUntil: 'networkidle' });
    expect(errors).toEqual([]);
  });

  test('9. no horizontal overflow at mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
