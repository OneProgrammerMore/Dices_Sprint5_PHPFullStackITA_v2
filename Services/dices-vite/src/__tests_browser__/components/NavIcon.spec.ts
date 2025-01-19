/*
import { test, expect } from '@playwright/test';

test('should add content before the text', async ({ page }) => {
  
  await page.setViewportSize({ width: 600, height: 800 });
  
    // Navigate to the page containing the component
  await page.goto('http://localhost:80/'); // Replace with the actual URL

  // Injecting CSS directly into the test
  await page.addStyleTag({
    content: `
      .test-div::before {
        content: 'e9bd';
      }
    `
  });

  // Ensure the element is rendered
  const element = await page.$('.icon-home');
  if (!element) {
    throw new Error('Element with class .icon-menu not found');
  }
  //console.log(element);
  // Log the inner HTML of the element
    const elementHTML = await element.evaluate(el => el.innerHTML);
    console.log('Element HTML:', elementHTML);
  // Get the computed style for the ::before pseudo-element content
  const beforeContent = await element.evaluate((el: Element) => {
    const computedStyle = getComputedStyle(el);
    return computedStyle.getPropertyValue('content');
  });

  // Ensure that the content is the Unicode character represented by \e9bd
  const expectedUnicodeChar = '\uE905';  // The actual character from Unicode escape sequence "\e905"
  expect(beforeContent).toBe(`"${expectedUnicodeChar}"`);
});*/

import { test, expect } from '@playwright/test';

test('should add content before the text', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 800 });

  // Navigate to the page containing the component
  await page.goto('http://localhost:80/'); // Replace with the actual URL
  await expect(
    page.getByText('If the ruler does not know your name...')
  ).toBeVisible();

  /*
  // Injecting CSS directly into the test
  await page.addStyleTag({
    content: `
      .icon-home::before {
        content: '\\e9bd';
      }
    `
  });
  */
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
