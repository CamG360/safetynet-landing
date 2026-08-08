import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:18123';

async function expectNoWcagViolations(page) {
    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
}

async function mockTurnstile(page) {
    await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js', async (route) => {
        await route.fulfill({
            contentType: 'text/javascript',
            body: `window.turnstile = {
                render: function (_selector, options) { window.__turnstileOptions = options; return 'mock-widget'; },
                execute: function () { window.__turnstileOptions.callback('mock-turnstile-token'); }
            };`,
        });
    });
}

async function openRegistration(page) {
    const opener = page.locator('.open-registration-modal:visible').first();
    await opener.click();
    await expect(page.locator('#registrationModal')).toBeVisible();
    await expect(page.locator('#email')).toBeFocused();
    return opener;
}

test.describe('Landing-page assurance', () => {
    test.beforeEach(async ({ page }) => {
        await mockTurnstile(page);
        await page.goto(`${BASE_URL}/index.html?utm_source=tiktok&utm_campaign=assurance`, {
            waitUntil: 'domcontentloaded',
        });
        await expect(page.locator('#hero')).toBeVisible();
    });

    test('initial interface has no known automated WCAG A/AA violations', async ({ page }) => {
        await expectNoWcagViolations(page);
    });

    test('mobile menu and campaign-preserving internal navigation work', async ({ page }) => {
        test.skip(page.viewportSize().width >= 768, 'mobile-only');
        const menuButton = page.locator('#mobileMenuBtn');
        await menuButton.click();
        await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator('#mobileMenu')).toHaveClass(/active/);
        await expectNoWcagViolations(page);

        await page.locator('#mobileMenu a[href="#problem"]').click();
        await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        await expect(page).toHaveURL(/utm_source=tiktok.*#problem$/);
    });

    test('registration modal traps focus, reports validation, and restores focus', async ({ page }) => {
        const opener = await openRegistration(page);
        const email = page.locator('#email');
        await expectNoWcagViolations(page);

        await page.locator('#registrationForm').evaluate((form) => form.requestSubmit());
        await expect(email).toHaveAttribute('aria-invalid', 'true');
        await expect(page.locator('#email-error')).toBeVisible();
        await expectNoWcagViolations(page);

        await page.locator('#closeRegistrationBtn').focus();
        await page.keyboard.press('Shift+Tab');
        await expect(page.locator('#submitBtn')).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(page.locator('#registrationModal')).toBeHidden();
        await expect(opener).toBeFocused();
    });

    test('mocked Turnstile and Worker success preserve the submission contract', async ({ page }) => {
        let requestBody;
        await page.route('https://safetynet-signup.campbell-mccord.workers.dev/signup', async (route) => {
            requestBody = route.request().postDataJSON();
            await new Promise((resolve) => setTimeout(resolve, 150));
            await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
        });

        const opener = await openRegistration(page);
        await page.locator('#email').fill('Assurance@Example.com');
        await page.locator('#submitBtn').click();
        await expect(page.locator('#submitBtn')).toBeDisabled();
        await expectNoWcagViolations(page);
        await expect(page.locator('#successMessage')).toBeVisible();
        await expect(page.locator('#closeSuccessBtn')).toBeFocused();
        expect(requestBody).toEqual({
            email: 'assurance@example.com',
            turnstileToken: 'mock-turnstile-token',
        });
        await expectNoWcagViolations(page);
        await page.locator('#closeSuccessBtn').click();
        await expect(page.locator('#registrationModal')).toBeHidden();
        await expect(opener).toBeFocused();
    });

    test('mocked verification failure is exposed and remains retryable', async ({ page }) => {
        let attempts = 0;
        await page.route('https://safetynet-signup.campbell-mccord.workers.dev/signup', async (route) => {
            attempts += 1;
            if (attempts === 1) {
                await route.fulfill({ status: 403, contentType: 'application/json', body: '{"error":"verification"}' });
            } else {
                await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
            }
        });

        await openRegistration(page);
        await page.locator('#email').fill('retry@example.com');
        await page.locator('#submitBtn').click();
        await expect(page.locator('#email-error')).toBeVisible();
        await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true');
        await expect(page.locator('#submitBtn')).toBeEnabled();
        await expectNoWcagViolations(page);

        await page.locator('#submitBtn').click();
        await expect(page.locator('#successMessage')).toBeVisible();
        expect(attempts).toBe(2);
    });

    test('FAQ controls retain conventional expanded state', async ({ page }) => {
        const question = page.locator('.faq-question:visible').first();
        await question.click();
        await expect(question).toHaveAttribute('aria-expanded', 'true');
        await question.press('Enter');
        await expect(question).toHaveAttribute('aria-expanded', 'false');
    });

    test('founder image stays off the initial path and loads its responsive derivative on demand', async ({ page }) => {
        const initialFounderRequests = await page.evaluate(() => performance.getEntriesByType('resource')
            .filter((entry) => entry.name.includes('campbell-mccord')).length);
        expect(initialFounderRequests).toBe(0);

        const founderImage = page.locator('img[alt="Campbell McCord"]');
        await founderImage.scrollIntoViewIfNeeded();
        await expect.poll(() => founderImage.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
        await expect.poll(() => founderImage.evaluate((image) => image.currentSrc)).toMatch(/campbell-mccord-(160|320)\.webp$/);
    });
});
