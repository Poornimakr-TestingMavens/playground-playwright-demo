// pages/HomePage.ts
import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly buyNowButton: Locator;
  readonly shopByCategory: Locator;
  readonly cartButton: Locator;
  readonly searchBar: Locator;
  readonly newArrivalsProducts: Locator;
  readonly ourBestSellersProducts: Locator;
  readonly bestSellerItems: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;

    this.buyNowButton = page.locator('//div[@class="flex justify-center items-center"]');
    this.shopByCategory = page.locator('//p[text()="Shop by Category"]');
    this.cartButton = page.locator(
      '//a[@href="/cart"]//span[@class="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white"]'
    );
    this.searchBar = page.locator('//input[@placeholder="Search your products here"]');
    this.newArrivalsProducts = page.locator('//div[@class="w-full pb-16"]//div[@class="slick-list"]');
    this.ourBestSellersProducts = page.locator('//div[@class="w-full pb-20"]');
    this.bestSellerItems = page.locator('//div[@class="w-full pb-20"]//div[contains(@class,"product-item")]');
    this.searchResults = page.locator('//div[contains(@class,"product-item")]');
    
  }

  // Search for a product and assert results exist
  async searchProduct(productName: string): Promise<number> {
    await this.searchBar.fill(productName);
    await this.searchBar.press('Enter');

    const resultsCount = await this.searchResults.count();
    expect(resultsCount).toBeGreaterThan(0);

    return resultsCount;
  }

  // Pick a random product from Best Sellers and open it
  async selectRandomBestSeller(): Promise<void> {
    const count = await this.bestSellerItems.count();
    expect(count).toBeGreaterThan(0);

    const randomIndex = Math.floor(Math.random() * count);
    const product = this.bestSellerItems.nth(randomIndex);

    await product.click();
    await expect(this.page.locator('.product-title')).toBeVisible();
  }
}
