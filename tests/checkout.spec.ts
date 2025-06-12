import { test, expect } from '@playwright/test';

test('Star Tech - Basic Search and Product Detail Test', async ({ page }) => {
  // 1. Go to Star Tech homepage
  await page.goto('https://www.startech.com.bd');

  // 2. Accept cookies if present
  const cookieBtn = page.locator('text=Got It');
  if (await cookieBtn.isVisible()) {
    await cookieBtn.click();
  }

  // 3. Search for "laptop"
  await page.fill('input[name="search"]', 'laptop');
  await page.press('input[name="search"]', 'Enter');

  // 4. Wait for and click the first product
  const firstProduct = page.locator('.p-item .p-item-name a').first();
  await expect(firstProduct).toBeVisible({ timeout: 10000 });
  await firstProduct.click();
  await page.waitForLoadState('networkidle');

  // 5. Validate product title is visible
  const productTitle = page.locator('h1.product-name');
  await expect(productTitle).toBeVisible({ timeout: 15000 });
});
