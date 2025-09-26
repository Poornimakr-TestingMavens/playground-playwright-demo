// pages/CartPage.ts
import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  // Header & navigation
  readonly homeButtonHeader: Locator;

  // Cart locators
  readonly cartItems: Locator;
  readonly removeItemButtons: Locator;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homeButtonHeader = page.locator(
      '//div[@class="flex items-center justify-between h-full"]//li//a[text()="Home"]'
    );

    this.cartItems = page.locator('//div[contains(@class,"cart-item")]');
    this.removeItemButtons = page.locator('//button[contains(@class,"remove-item")]');
    this.checkoutButton = page.locator('//a[text()="Checkout"]');
    this.emptyCartMessage = page.locator('//p[text()="Your cart is empty"]');
  }

  // Navigate to homepage
  async goToHome() {
    await this.homeButtonHeader.click();
  
  }

  // Add multiple products from Best Sellers
  async addBestSellersToCart(count: number) {
    const bestSellerItems = this.page.locator('//div[@class="w-full pb-20"]//div[contains(@class,"product-item")]');
    const totalItems = await bestSellerItems.count();

    for (let i = 0; i < Math.min(count, totalItems); i++) {
      await bestSellerItems.nth(i).locator('text=Add to Cart').click();
    }
  }

  // Remove an item from cart (by index)
  async removeItemFromCart(index: number = 0) {
    const itemsCount = await this.removeItemButtons.count();
    if (itemsCount > index) {
      await this.removeItemButtons.nth(index).click();
    }
  }

  // Validate items in cart
  async validateCartItemCount(expectedCount: number) {
    const count = await this.cartItems.count();
    expect(count).toBe(expectedCount);
  }

  // Proceed to checkout
  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/.*checkout/);
  }
}
