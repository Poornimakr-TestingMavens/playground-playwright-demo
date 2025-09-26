// pages/CheckoutPage.ts
import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  // Page elements
  readonly checkoutHeader: Locator;
  readonly proceedToCheckoutBtn: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly phoneInput: Locator;
  readonly placeOrderBtn: Locator;
  readonly successMsg: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.checkoutHeader = page.locator('//h1[text()="Checkout"]');
    this.proceedToCheckoutBtn = page.locator('//button[text()="Proceed to Checkout"]');
    this.fullNameInput = page.getByLabel('Full Name');
    this.emailInput = page.getByLabel('Email');
    this.addressInput = page.getByLabel('Address');
    this.phoneInput = page.getByLabel('Phone');
    this.placeOrderBtn = page.getByRole('button', { name: /Place Order/i });
    this.successMsg = page.getByText(/Thank you for your order/i);
  }

  // Verify we are on checkout page
  async verifyOnCheckoutPage() {
    await expect(this.checkoutHeader).toBeVisible();
    await expect(this.page).toHaveURL(/.*checkout/);
  }

  // Click "Proceed to Checkout" button
  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
    await this.verifyOnCheckoutPage();
  }

  // Fill shipping details dynamically
  async fillShippingDetails(data: { fullName: string; email: string; address: string; phone: string }) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.addressInput.fill(data.address);
    await this.phoneInput.fill(data.phone);
  }

  // Place the order
  async placeOrder() {
    await this.placeOrderBtn.click();
  }

  // Verify order success
  async getSuccessMessage() {
  return this.successMsg;
}


  // Full flow: proceed → fill → place → verify
  async completeOrder(data: { fullName: string; email: string; address: string; phone: string }) {
    await this.proceedToCheckout();
    await this.fillShippingDetails(data);
    await this.placeOrder();
    
  }
}
