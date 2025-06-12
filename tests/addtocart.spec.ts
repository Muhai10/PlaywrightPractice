import { test, expect } from '@playwright/test';

test('Star Tech - Full Product Flow', async ({ page }) => {
  // Visit homepage
  await page.goto('https://www.startech.com.bd');

  // Accept cookies if visible
  const cookieBtn = page.locator('text=Got It');
  if (await cookieBtn.isVisible()) {
    await cookieBtn.click();
  }

  // Search for a laptop
  await page.fill('input[name="search"]', 'laptop');
  await page.press('input[name="search"]', 'Enter');

  // Click the first product
  const firstProduct = page.locator('.p-item .p-item-name a').first();
  const productName = await firstProduct.innerText();
  await firstProduct.click();
  await page.waitForLoadState('networkidle');

  // Ensure product page loaded
  const productTitle = page.locator('h1.product-name');
  await expect(productTitle).toBeVisible();

  // Click Buy Now
  const buyNowBtn = page.getByRole('button', { name: 'Buy Now' });
  await expect(buyNowBtn).toBeVisible({ timeout: 10000 });
  await buyNowBtn.click();

  // Wait for "View Cart" button in modal and click it
  const viewCartBtn = page.getByRole('button', { name: 'View Cart' });
  await expect(viewCartBtn).toBeVisible({ timeout: 10000 });
  await viewCartBtn.click();

  // Verify product is in cart
  const cartItem = page.locator('table a', {
    hasText: productName
  });
  await expect(cartItem).toBeVisible();


  // Take a screenshot
  await page.screenshot({ path: 'cart-screenshot.png', fullPage: true });
});
