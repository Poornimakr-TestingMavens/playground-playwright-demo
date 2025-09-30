import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutHeader: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly phoneInput: Locator;
  readonly placeOrderBtn: Locator;
  readonly successMsg: Locator;
  readonly shippingForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shippingForm = page.locator('//form[@class="space-y-6"]');

    this.checkoutHeader = page.locator('//h1[text()="Checkout"]');
    this.fullNameInput = page.getByLabel('Full Name');
    this.emailInput = page.getByLabel('Email');
    this.addressInput = page.getByLabel('Address');
    this.phoneInput = page.getByLabel('Phone');
    this.placeOrderBtn = page.getByRole('button', { name: /Place Order/i });
    this.successMsg = page.getByText('Your order has been placed successfully!');
  }

  async verifyOnCheckoutPage() {
    await expect(this.checkoutHeader).toBeVisible();
    await expect(this.page).toHaveURL(/.*paymentgateway/);
  }

  async fillShippingDetails(data: { fullName: string; email: string; address: string; phone: string }) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.addressInput.fill(data.address);
    await this.phoneInput.fill(data.phone);
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }

  async getSuccessMessage(): Promise<Locator> {
    return this.successMsg;
  }
}
