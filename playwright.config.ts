import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: false,
    screenshot: 'only-on-failure',
  }
});
