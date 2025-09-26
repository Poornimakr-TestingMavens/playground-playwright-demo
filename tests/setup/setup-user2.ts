import { chromium } from '@playwright/test';
import testData from '../../utils/data/test-data.json';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(testData.playgroundWebsite);

  // Login
  await page.fill('input[name="email"]', 'pattirujehe-2255@yopmail.com');
  await page.fill('input[name="password"]', 'Sample@123');
  await page.click('button[type="submit"]');

  // Wait for some element that confirms login
  await page.waitForSelector('selector-for-logged-in-element');

  // Save storage state
  await context.storageState({ path: 'storage-pattirujehe.json' });
  console.log('Pattirujehe storage state saved!');

  await browser.close();
})();
