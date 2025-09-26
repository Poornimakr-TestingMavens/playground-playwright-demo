import { test as base } from '@playwright/test';


import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { WishlistPage } from '../pages/wishList';
import { CartPage } from '../pages/cartPage';
import {CheckoutPage} from '../pages/checkoutPage';

const test = base.extend<{
  home: HomePage;
  login: LoginPage;
  wishlist: WishlistPage;
  cart: CartPage;
  checkout: CheckoutPage;
 
}>({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },


  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  wishlist: async ({ page }, use) => {
    await use(new WishlistPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  }
});

export { test };
export const expect = test.expect;
