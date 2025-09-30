import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly homeButtonHeader: Locator;
  readonly cartItems: Locator;
  readonly removeItemButtons: Locator;
  readonly checkoutButton: Locator;
  readonly getBadgeCount: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // More flexible selectors
    this.homeButtonHeader = page.locator('a:has-text("Home")').first();
    this.cartItems = page.locator('.cart-item, [class*="cart-item"], .cart__item');
    this.removeItemButtons = page.locator('button:has-text("Remove"), [class*="remove"]');
    this.checkoutButton = page.locator('button:has-text("Checkout"), a:has-text("Checkout")');
    this.getBadgeCount = page.locator('.cart-count, [class*="badge"], [class*="count"]');
    this.emptyCartMessage = page.locator('text=Your cart is empty');
  }

  async goToHome(): Promise<void> {
    await this.homeButtonHeader.click();
    await this.page.waitForLoadState('networkidle');
  }

  async addBestSellersToCart(count: number) {
    // More flexible selector for best seller items
    const bestSellerItems = this.page.locator('.product-item, [class*="product"], .item').filter({
      has: this.page.locator('text=Add to Cart')
    });
    
    const totalItems = await bestSellerItems.count();
    console.log(`Found ${totalItems} best seller items`);
    
    // Get random indices
    const randomIndices = this.getRandomIndices(totalItems, count);
    
    for (const index of randomIndices) {
      const item = bestSellerItems.nth(index);
      await item.scrollIntoViewIfNeeded();
      await item.locator('text=Add to Cart').click();
      await this.page.waitForTimeout(5000); // Increased timeout for cart update
    }
  }

  private getRandomIndices(max: number, count: number): number[] {
    const indices = Array.from({length: max}, (_, i) => i);
    // Shuffle array and get first 'count' elements
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.slice(0, count);
  }

  async removeItemFromCart(index: number = 0) {
    const itemsCount = await this.removeItemButtons.count();
    if (itemsCount > index) {
      await this.removeItemButtons.nth(index).click();
      await this.page.waitForTimeout(5000);
    }
  }

  async validateCartItemCount(expectedCount: number) {
    if (expectedCount === 0) {
      await expect(this.emptyCartMessage).toBeVisible({ timeout: 5000 });
    } else {
      await expect(this.cartItems).toHaveCount(expectedCount, { timeout: 5000 });
    }
  }

  async getCartBadgeCount(): Promise<number> {
    try {
      await this.getBadgeCount.waitFor({ state: 'visible', timeout: 3000 });
      const text = await this.getBadgeCount.textContent();
      return Number(text?.trim() || 0);
    } catch {
      return 0; // Return 0 if badge not found
    }
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    // More flexible URL check
    await this.page.waitForURL(/.*(checkout|payment|gateway)/);
  }

  async goToCart() {
    await this.page.click('a[href*="cart"], [class*="cart"]');
    await this.page.waitForLoadState('networkidle');
  }
}