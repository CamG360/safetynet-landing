/**
 * Ad-hoc verification: mobile menu height fix on safetynetbeta.com
 * Run: node verify-screenshots/verify-mobile-menu.mjs
 */
import { chromium, webkit, devices } from '@playwright/test';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
mkdirSync(__dir, { recursive: true });

const URL = 'https://safetynetbeta.com';

async function verify(browserType, deviceConfig, label) {
  const browser = await browserType.launch();
  const ctx = await browser.newContext({ ...deviceConfig });
  const page = await ctx.newPage();

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Open hamburger menu
  const hamburger = page.locator('#hamburger, [aria-label="Open menu"], button[aria-controls="mobileMenu"]').first();
  await hamburger.click();
  await page.waitForTimeout(400); // animation settle

  // Measure menu element
  const metrics = await page.evaluate(() => {
    const menu = document.getElementById('mobileMenu');
    if (!menu) return { error: 'mobileMenu not found' };
    const rect = menu.getBoundingClientRect();
    const computed = getComputedStyle(menu);
    return {
      rectHeight: Math.round(rect.height),
      rectBottom: Math.round(rect.bottom),
      viewportHeight: window.innerHeight,
      maxHeight: computed.maxHeight,
      minHeight: computed.minHeight,
      inset: computed.inset,
    };
  });

  const screenshotPath = join(__dir, `menu-${label}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  await browser.close();

  const vh = metrics.viewportHeight;
  const mh = metrics.rectHeight;
  const gap = vh - mh;
  const pass = mh < vh * 0.7; // content should be < 70% of viewport

  console.log(`\n[${label}]`);
  console.log(`  Viewport:    ${vh}px`);
  console.log(`  Menu height: ${mh}px  (gap: ${gap}px)`);
  console.log(`  maxHeight:   ${metrics.maxHeight}`);
  console.log(`  minHeight:   ${metrics.minHeight}`);
  console.log(`  Screenshot:  ${screenshotPath}`);
  console.log(`  Result:      ${pass ? 'PASS — content-fit' : 'FAIL — menu still fills viewport'}`);
  return pass;
}

const iphone14 = devices['iPhone 14'];

const results = await Promise.all([
  verify(webkit,   { ...iphone14 },                         'webkit-iphone14'),
  verify(chromium, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, 'chromium-mobile'),
]);

const allPass = results.every(Boolean);
console.log(`\n${'─'.repeat(40)}`);
console.log(allPass ? 'ALL PASS' : 'SOME FAILURES');
process.exit(allPass ? 0 : 1);
