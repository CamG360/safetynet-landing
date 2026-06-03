import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  projects: [
    {
      name: 'chromium-desktop',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 800 },
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
