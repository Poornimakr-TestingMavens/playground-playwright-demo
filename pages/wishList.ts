// // pages/WishlistPage.ts
// import { expect, Locator, Page } from '@playwright/test';
// import { commonPage } from './commonPage';
// const productList = require('../utils/data/product-list.json');

// export class WishlistPage {
//   readonly page: Page;
//   readonly common: commonPage;
//   readonly shopByCategoryLink: Locator;
//   readonly wishListHeader: Locator;
//   readonly categoryCheckboxes: { [key: string]: Locator };
//   readonly filterValidation: Locator;
//   readonly wishlistBadge: Locator; // badge showing total count
//   readonly resetWishListButton: Locator;

//   constructor(page: Page) {
//     this.page = page;
//     this.common = new commonPage(page);

//     this.shopByCategoryLink = page.locator('//span[text()="Shop by Category"]');
//     this.wishListHeader = page.locator('//h1[text()="Wishlist"]');
//     //this.wishlistBadge = page.locator('//a[@href="/wishlist"]//span[@class="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white"]');

//     // Dynamically store checkboxes for categories
//     this.categoryCheckboxes = {
//       Headsets: page.locator('//input[@id="Headsets"]'),
//       Laptops: page.locator('//input[@id="Laptops"]'),
//       Mobiles: page.locator('//input[@id="Mobiles"]'),
//       TVs: page.locator('//input[@id="TVs"]')
//     };

//     this.filterValidation = page.locator('//h2[text()="Sony WH-1000XM4"]'); // optional placeholder
//     this.resetWishListButton = page.locator('//button[text()="Reset Wishlist"]');

//     // Wishlist badge element
//     this.wishlistBadge = page.locator(
//       '//a[@href="/wishlist"]//span[contains(@class,"bg-primeColor") and contains(@class,"rounded-full")]'
//     );
//   }

//   // Dynamic locator for wishlist button of a product
//   wishListButton(productName: string): Locator {
//     return this.page.locator(
//       `//div[contains(@class,'group')][.//h2[text()='${productName}']]//button[contains(., 'Wish List')]`
//     );
//   }


//   async clickWithWait(element: Locator, message: string, timeout = 5000): Promise<void> {
//     await element.waitFor({ state: 'visible', timeout });
//     console.log(message);
//     await element.click();
//   }

//   async open(): Promise<void> {
//     await this.common.shopButtonHeader.click();
//     await this.clickWithWait(this.shopByCategoryLink, 'Clicked on Shop By Category link');
//   }

//   // Select multiple categories
//   async selectCategories(categories: string[]): Promise<void> {
//     for (const category of categories) {
//       const checkbox = this.categoryCheckboxes[category];
//       if (!checkbox) throw new Error(`Category "${category}" does not exist`);
//       await checkbox.waitFor({ state: 'visible', timeout: 5000 });
//       console.log(`Selecting category: ${category}`);
//       await checkbox.check();
//     }
//   }

//   // Clear all selected categories
//   async clearCategories(): Promise<void> {
//     for (const key in this.categoryCheckboxes) {
//       const checkbox = this.categoryCheckboxes[key];
//       if (await checkbox.isChecked()) {
//         console.log(`Unchecking category: ${key}`);
//         await checkbox.uncheck();
//       }
//     }
//   }

//   // Validate products for a single category
//   async validateCategoryProducts(category: string): Promise<void> {
//     const productsLocator = this.page.locator('div.group h2.text-lg.font-bold.text-gray-800');
//     await productsLocator.first().waitFor({ state: 'visible', timeout: 5000 });

//     const visibleProducts = await productsLocator.allTextContents();
//     const expectedProducts = productList[category];

//     for (const product of visibleProducts) {
//       if (!expectedProducts.includes(product)) {
//         throw new Error(`Product "${product}" is not expected in category: ${category}`);
//       }
//     }

//     expect(visibleProducts.length).toBeGreaterThan(0);
//   }

//   // Add products to wishlist (avoid duplicates)
//   async addProductsToWishlist(
//     categories: string[],
//     productsPerCategory: number = 1
//   ): Promise<string[]> {
//     const addedProducts: string[] = [];

//     for (const category of categories) {
//       const expectedProducts = productList[category];
//       if (!expectedProducts) throw new Error(`No products found for category: ${category}`);

//       const productsLocator = this.page.locator('div.group h2.text-lg.font-bold.text-gray-800');
//       await productsLocator.first().waitFor({ state: 'visible', timeout: 5000 });
//       const visibleProducts = await productsLocator.allTextContents();

//       let count = 0;
//       for (const product of visibleProducts) {
//         if (
//           expectedProducts.includes(product) &&
//           count < productsPerCategory &&
//           !addedProducts.includes(product) // avoid duplicates
//         ) {
//           console.log(`Adding ${product} from ${category} to wishlist`);

//           const button = this.wishListButton(product);
//           await button.waitFor({ state: 'visible', timeout: 5000 });
//           await button.click();

//           count++;
//           addedProducts.push(product);
//         }
//       }
//     }

//     return addedProducts;
//   }

//   // Validate wishlist badge count
//   async validateWishlistBadge(expectedCount: number): Promise<void> {
//     await expect(this.wishlistBadge).toHaveText(String(expectedCount));
//   }

//   // Open wishlist page
//   async openWishlistPage(): Promise<void> {
//     const wishlistLink = this.page.locator('a[href="/wishlist"]');
//     await wishlistLink.click();
//     await this.page.waitForURL('**/wishlist');
//   }

//   // Get all product names currently visible in wishlist
//   async getWishlistProductNames(): Promise<string[]> {
//     const productLocators = this.page.locator(
//       '//div[@class="w-full relative group p-4 flex border rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"]//h2'
//     );
//     const count = await productLocators.count();
//     if (count === 0) return [];

//     const rawTexts = await productLocators.allTextContents();
//     return rawTexts.map(t => t.trim());
//   }

//   // Validate products in wishlist
//   async validateWishlistProducts(products: string[]): Promise<void> {
//     const wishlistProducts = await this.getWishlistProductNames();

//     for (const product of products) {
//       if (!wishlistProducts.includes(product)) {
//         throw new Error(`Product "${product}" is not present in wishlist`);
//       }
//     }

//     expect(wishlistProducts.length).toBeGreaterThan(0);
//   }
//   // inside WishlistPage class
// async getWishlistBadgeCount(): Promise<number> {
//   const text = await this.wishlistBadge.textContent();
//   return Number(text?.trim() || 0);
// }


//   // Reset wishlist by clicking reset button
//   async resetWishlist(): Promise<void> {
//     console.log('Resetting wishlist...');
//     await this.resetWishListButton.click();
//     await this.page.waitForTimeout(1000); // wait for reset to complete
//   }
// }
// import { expect, Locator, Page } from '@playwright/test';
// import { commonPage } from './commonPage';
// const productList = require('../utils/data/product-list.json');

// export class WishlistPage {
//   readonly page: Page;
//   readonly common: commonPage;
//   readonly shopByCategoryLink: Locator;
//   readonly wishListHeader: Locator;
//   readonly categoryCheckboxes: { [key: string]: Locator };
//   readonly filterValidation: Locator;
//   readonly wishlistBadge: Locator;
//   readonly resetWishListButton: Locator;

//   constructor(page: Page) {
//     this.page = page;
//     this.common = new commonPage(page);

//     this.shopByCategoryLink = page.locator('//span[text()="Shop by Category"]');
//     this.wishListHeader = page.locator('//h1[text()="Wishlist"]');

//     // Category checkboxes
//     this.categoryCheckboxes = {
//       Headsets: page.locator('//input[@id="Headsets"]'),
//       Laptops: page.locator('//input[@id="Laptops"]'),
//       Mobiles: page.locator('//input[@id="Mobiles"]'),
//       TVs: page.locator('//input[@id="TVs"]')
//     };

//     this.filterValidation = page.locator('//h2[text()="Sony WH-1000XM4"]');
//     this.resetWishListButton = page.locator('//button[text()="Reset Wishlist"]');

//     this.wishlistBadge = page.locator(
//       '//a[@href="/wishlist"]//span[contains(@class,"bg-primeColor") and contains(@class,"rounded-full")]'
//     );
//   }

//   wishListButton(productName: string): Locator {
//     return this.page.locator(
//       `//div[contains(@class,'group')][.//h2[text()='${productName}']]//button[contains(., 'Wish List')]`
//     );
//   }

//   async clickWithWait(element: Locator, message: string, timeout = 5000): Promise<void> {
//     await element.waitFor({ state: 'visible', timeout });
//     console.log(message);
//     await element.click();
//   }

//   async open(): Promise<void> {
//     await this.common.shopButtonHeader.click();
//     await this.clickWithWait(this.shopByCategoryLink, 'Clicked on Shop By Category link');
//   }

//   async selectCategories(categories: string[]): Promise<void> {
//     for (const category of categories) {
//       const checkbox = this.categoryCheckboxes[category];
//       if (!checkbox) throw new Error(`Category "${category}" does not exist`);
//       await checkbox.waitFor({ state: 'visible', timeout: 5000 });
//       console.log(`Selecting category: ${category}`);
//       await checkbox.check();
//     }
//   }

//   async clearCategories(): Promise<void> {
//     for (const key in this.categoryCheckboxes) {
//       const checkbox = this.categoryCheckboxes[key];
//       if (await checkbox.isChecked()) {
//         console.log(`Unchecking category: ${key}`);
//         await checkbox.uncheck();
//       }
//     }
//   }

//   async validateCategoryProducts(category: string): Promise<void> {
//     const productsLocator = this.page.locator('div.group h2.text-lg.font-bold.text-gray-800');
//     await productsLocator.first().waitFor({ state: 'visible', timeout: 5000 });

//     const visibleProducts = (await productsLocator.allTextContents()).map(t => t.trim());
//     const expectedProducts = productList[category];

//     for (const product of visibleProducts) {
//       if (!expectedProducts.includes(product)) {
//         throw new Error(`Product "${product}" is not expected in category: ${category}`);
//       }
//     }

//     expect(visibleProducts.length).toBeGreaterThan(0);
//   }

//   async addProductsToWishlist(categories: string[], productsPerCategory: number = 1): Promise<string[]> {
//     const addedProducts: string[] = [];

//     for (const category of categories) {
//       const expectedProducts = productList[category];
//       if (!expectedProducts) throw new Error(`No products found for category: ${category}`);

//       const productsLocator = this.page.locator('div.group h2.text-lg.font-bold.text-gray-800');
//       await productsLocator.first().waitFor({ state: 'visible', timeout: 5000 });
//       const visibleProducts = (await productsLocator.allTextContents()).map(t => t.trim());

//       let count = 0;
//       for (const product of visibleProducts) {
//         if (expectedProducts.includes(product) && count < productsPerCategory && !addedProducts.includes(product)) {
//           console.log(`Adding ${product} from ${category} to wishlist`);
//           const button = this.wishListButton(product);
//           await button.waitFor({ state: 'visible', timeout: 5000 });
//           await button.click();

//           // Wait for badge count to update
//           await expect(this.wishlistBadge).toHaveText(String(addedProducts.length + 1), { timeout: 5000 });

//           count++;
//           addedProducts.push(product);
//         }
//       }
//     }

//     return addedProducts;
//   }

//   async validateWishlistBadge(expectedCount: number): Promise<void> {
//     await expect(this.wishlistBadge).toHaveText(String(expectedCount), { timeout: 5000 });
//   }

//   async openWishlistPage(): Promise<void> {
//     const wishlistLink = this.page.locator('a[href="/wishlist"]');
//     await wishlistLink.click();
//     await this.page.waitForURL('**/wishlist');
//   }

//   async getWishlistProductNames(): Promise<string[]> {
//     const productLocators = this.page.locator(
//       '//div[@class="w-full relative group p-4 flex border rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"]//h2'
//     );
//     const count = await productLocators.count();
//     if (count === 0) return [];

//     const rawTexts = await productLocators.allTextContents();
//     return rawTexts.map(t => t.trim());
//   }

//   async validateWishlistProducts(products: string[]): Promise<void> {
//     const wishlistProducts = await this.getWishlistProductNames();

//     for (const product of products) {
//       if (!wishlistProducts.includes(product)) {
//         throw new Error(`Product "${product}" is not present in wishlist`);
//       }
//     }

//     expect(wishlistProducts.length).toBeGreaterThan(0);
//   }

//   async getWishlistBadgeCount(): Promise<number> {
//     const text = await this.wishlistBadge.textContent();
//     return Number(text?.trim() || 0);
//   }

//   async resetWishlist(): Promise<void> {
//     console.log('Resetting wishlist...');
//     await this.resetWishListButton.click();
//     await this.page.waitForTimeout(1000);
//   }
// }
import { expect, Locator, Page } from '@playwright/test';
import { commonPage } from './commonPage';
const productList = require('../utils/data/product-list.json');

export class WishlistPage {
  readonly page: Page;
  readonly common: commonPage;
  readonly shopByCategoryLink: Locator;
  readonly categoryCheckboxes: { [key: string]: Locator };
  readonly wishlistBadge: Locator;
  readonly resetWishListButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.common = new commonPage(page);

    this.shopByCategoryLink = page.locator('//span[text()="Shop by Category"]');

    this.categoryCheckboxes = {
      Headsets: page.locator('//input[@id="Headsets"]'),
      Laptops: page.locator('//input[@id="Laptops"]'),
      Mobiles: page.locator('//input[@id="Mobiles"]'),
      TVs: page.locator('//input[@id="TVs"]')
    };

    this.resetWishListButton = page.locator('//button[text()="Reset Wishlist"]');
    this.wishlistBadge = page.locator(
      '//a[@href="/wishlist"]//span[contains(@class,"bg-primeColor") and contains(@class,"rounded-full")]'
    );
  }

  // Dynamic product locator (first visible button only)
  wishListButton(productName: string): Locator {
    return this.page.locator(
      `//div[contains(@class,'group')][.//h2[text()='${productName}']]//button[contains(., 'Wish List')]`
    ).first();
  }

  async clickWithWait(element: Locator, message: string, timeout = 5000): Promise<void> {
    await element.waitFor({ state: 'visible', timeout });
    console.log(message);
    await element.click();
  }

  async open(): Promise<void> {
    await this.common.shopButtonHeader.click();
    await this.clickWithWait(this.shopByCategoryLink, 'Clicked on Shop By Category link');
  }

  async selectCategories(categories: string[]): Promise<void> {
    for (const category of categories) {
      const checkbox = this.categoryCheckboxes[category];
      if (!checkbox) throw new Error(`Category "${category}" does not exist`);
      await checkbox.waitFor({ state: 'visible', timeout: 5000 });
      await checkbox.check();
      console.log(`Selected category: ${category}`);
    }
  }

  async clearCategories(): Promise<void> {
    for (const key in this.categoryCheckboxes) {
      const checkbox = this.categoryCheckboxes[key];
      if (await checkbox.isChecked()) {
        await checkbox.uncheck();
        console.log(`Cleared category: ${key}`);
      }
    }
  }

  async addProductsToWishlist(categories: string[], productsPerCategory: number = 1): Promise<string[]> {
    const addedProducts: string[] = [];

    for (const category of categories) {
      const expectedProducts = productList[category];
      if (!expectedProducts) throw new Error(`No products found for category: ${category}`);

      const productsLocator = this.page.locator('div.group h2.text-lg.font-bold.text-gray-800');
      await productsLocator.first().waitFor({ state: 'visible', timeout: 5000 });
      const visibleProducts = (await productsLocator.allTextContents()).map(t => t.trim());

      let count = 0;
      for (const product of visibleProducts) {
        if (expectedProducts.includes(product) && count < productsPerCategory && !addedProducts.includes(product)) {
          const button = this.wishListButton(product);
          await button.waitFor({ state: 'visible', timeout: 5000 });

          if (await button.isVisible()) {
            await button.click();
            await expect(this.wishlistBadge).toHaveText(String(addedProducts.length + 1), { timeout: 5000 });

            count++;
            addedProducts.push(product);
            console.log(`Added ${product} from ${category} to wishlist`);
          }
        }
      }
    }

    return addedProducts;
  }

  async validateWishlistBadge(expectedCount: number): Promise<void> {
    await expect(this.wishlistBadge).toHaveText(String(expectedCount), { timeout: 5000 });
  }

  async openWishlistPage(): Promise<void> {
    const wishlistLink = this.page.locator('a[href="/wishlist"]');
    await wishlistLink.click();
    await this.page.waitForURL('**/wishlist');
  }

  async getWishlistProductNames(): Promise<string[]> {
    const productLocators = this.page.locator(
      '//div[@class="w-full relative group p-4 flex border rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"]//h2'
    );
    const count = await productLocators.count();
    if (count === 0) return [];
    return (await productLocators.allTextContents()).map(t => t.trim());
  }

  async resetWishlist(): Promise<void> {
    await this.resetWishListButton.click();
    await this.page.waitForTimeout(1000);
    console.log('Wishlist reset');
  }
}
