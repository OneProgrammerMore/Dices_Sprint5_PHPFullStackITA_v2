import { test, expect } from '@playwright/test';

test('should add content before the text', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 800 });

  // Navigate to the page containing the component
  await page.goto('http://localhost:80/'); // Replace with the actual URL
  await expect(
    page.getByText('If the ruler does not know your name...')
  ).toBeVisible();

  // Ensure the element is rendered
  const element = await page.$('.icon-home');
  if (!element) {
    throw new Error('Element with class .icon-home not found');
  }

  // Get the computed style for the ::before pseudo-element content
  const beforeContent = await element.evaluate((el: Element) => {
    const computedStyle = getComputedStyle(el, ':before');
    return computedStyle.getPropertyValue('content');
  });

  // Ensure that the content is the Unicode character represented by \e9bd
  const expectedUnicodeChar = '\uE905'; // The actual character from Unicode escape sequence
  expect(beforeContent).toBe(`"${expectedUnicodeChar}"`);
});
