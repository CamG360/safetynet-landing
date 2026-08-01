import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'node tests/static-server.mjs',
    url: 'http://127.0.0.1:8123/index.html',
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: {
        browserName: 'chromium',
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'chromium-mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'webkit-iphone14',
      use: { ...devices['iPhone 14'], browserName: 'webkit' },
    },
    {
      name: 'webkit-iphone13',
      use: { ...devices['iPhone 13'], browserName: 'webkit' },
    },
    {
      name: 'webkit-ipad-pro',
      use: { ...devices['iPad Pro 11'], browserName: 'webkit' },
    },
    {
      name: 'chromium-pixel5',
      use: { ...devices['Pixel 5'], browserName: 'chromium' },
    },
  ],
});
