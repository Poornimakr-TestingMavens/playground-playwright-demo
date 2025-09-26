import { chromium } from '@playwright/test';
const testData = require('../../utils/data/test-data.json');


(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(testData.playgroundWebsite);

  // Login
  await page.fill('input[name="email"]', 'poornima.ramachandran@testingmavens.com');
  await page.fill('input[name="password"]', 'charlie');
  await page.click('button[type="submit"]');

  // Wait for some element that confirms login
  await page.waitForSelector('selector-for-logged-in-element');

  // Save storage state
  await context.storageState({ path: 'storage-poornima.json' });
  console.log('Poornima storage state saved!');

  await browser.close();
})();
