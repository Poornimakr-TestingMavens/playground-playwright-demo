// pages/LoginPage.ts
import { expect, Locator, Page } from '@playwright/test';
import testData from '../utils/data/test-data.json';

export class LoginPage {
  readonly page: Page;

  readonly accountButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginLink: Locator;
  readonly successText: Locator;
  readonly logoutVisibilty: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountButton = page.locator(
      '//div[@class="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative"]' +
      '//div[@class="flex items-center cursor-pointer space-x-2"]'
    );
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.successText = page.getByText(/Welcome/i);
    this.logoutVisibilty = page.locator('//li[text()="Log Out"]')
  }

  //  Navigate to the login page
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async loginWithCredentials(email: string, password: string): Promise<void> {
  await this.accountButton.click();
  await this.loginLink.click();
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.loginButton.click();

  await expect(this.successText).toBeVisible();
}
async loginValidation(): Promise<void> {
  await this.accountButton.click();
}
}
