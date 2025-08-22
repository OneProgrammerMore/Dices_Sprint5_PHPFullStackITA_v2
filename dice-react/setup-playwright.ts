import { expect } from '@playwright/test';

export default async ({ page }) => {
  // Your setup code here
  // Inject the CSS into the page
  await page.addStyleTag({ path: './src/styles.css' });
  // For example, you can set up CSS locators
  const button = page.locator('button');
  await expect(button).toHaveText('Submit');
};
