// import { test, expect } from '../pages/pageFixtures';
// import testData from '../utils/data/test-data.json';
// import checkOutData from '../utils/data/checkout-data.json';
// test.describe('End-to-End Purchase Flow', () => {

//   test('User completes order for multiple categories', async ({ login, wishlist, cart, checkout }) => {

//     // Step 1: Navigate to application URL
//     await test.step('1. Navigate to application URL', async () => {
//       await login.goto(testData.playgroundWebsite);
//       await expect(cart.homeButtonHeader).toBeVisible();
//     });

//     // Step 2: Login with valid credentials
//     await test.step('2. Login with valid credentials', async () => {
//       await login.loginWithCredentials(testData.Email, testData.Password);
//       await login.loginValidation();
//       await expect(login.logoutVisibilty).toBeVisible();
//     });

//     // Step 3: Add products from categories one by one to Wishlist
//     await test.step('3. Add products from categories to Wishlist', async () => {
//       await wishlist.open();

//       // Headsets 
//       await wishlist.clearCategories();
//       await wishlist.selectCategories(["Headsets"]);
//       const headsetsAdded = await wishlist.addProductsToWishlist(["Headsets"], 1);
//       await wishlist.validateCategoryProducts("Headsets");

//       // Laptops
//       await wishlist.clearCategories();
//       await wishlist.selectCategories(["Laptops"]);
//       const laptopsAdded = await wishlist.addProductsToWishlist(["Laptops"], 1);
//       await wishlist.validateCategoryProducts("Laptops");

//       // Combine dynamically added products
//       const allAddedProducts = [...headsetsAdded, ...laptopsAdded];

//       // Validate wishlist badge
//       await wishlist.validateWishlistBadge(allAddedProducts.length);

//       // Open wishlist page and wait for items
//       await wishlist.openWishlistPage();
      

//       // Get all product names visible in wishlist
//       const visibleWishlistProducts = await wishlist.getWishlistProductNames();
//       const normalizedVisible = visibleWishlistProducts.map(p => p.trim());
//       const normalizedAdded = allAddedProducts.map(p => p.trim());

//       console.log('Expected products:', normalizedAdded);
//       console.log('Visible products:', normalizedVisible);

//       // Final expect: all added products are present
//       expect(normalizedVisible).toEqual(expect.arrayContaining(normalizedAdded));
//       await wishlist.validateWishlistBadge(allAddedProducts.length);
//     });

//     // Step 4: Add multiple Best Sellers to Cart, remove one, and proceed to checkout
//     await test.step('4. Add Best Sellers to Cart and Checkout', async () => {
//       // Go to homepage
//       await cart.goToHome();
//       await expect(cart.page).toHaveURL(testData.playgroundWebsite);

//       // Add 3 best sellers
//       await cart.addBestSellersToCart(3);

//       // Validate 3 items in cart
//       await cart.validateCartItemCount(3);

//       // Remove first item
//       await cart.removeItemFromCart(0);

//       // Validate 2 items remaining
//       await cart.validateCartItemCount(2);

//       // Proceed to checkout
//       await cart.proceedToCheckout();

//       // Verify checkout page is visible
//       await checkout.verifyOnCheckoutPage();
//       await expect(checkout.page).toHaveURL(/.*checkout/);

//       // Optionally, fill shipping details and place order
//       await checkout.fillShippingDetails({
//         fullName: checkOutData.shippingDetails.fullName,
//         email: checkOutData.shippingDetails.email,
//         address:checkOutData.shippingDetails.address,
//         phone: checkOutData.shippingDetails.phone
//       });

//       await checkout.placeOrder();
//       await expect(await checkout.getSuccessMessage()).toBeVisible();
//       await expect(await checkout.getSuccessMessage()).toHaveText('Your order has been placed successfully!');

//     });

//   });

// });

import { test, expect } from '../pages/pageFixtures';
import testData from '../utils/data/test-data.json';

test.describe('E2E Purchase Flow for Poornima', () => {
  test.use({ storageState: 'storage-poornima.json' });

  test('Poornima completes purchase', async ({ page }) => {
    await page.goto(testData.playgroundWebsite);
    // Add your wishlist, cart, checkout steps here
  });
});

test.describe('E2E Purchase Flow for Pattirujehe', () => {
  test.use({ storageState: 'storage-pattirujehe.json' });

  test('Pattirujehe completes purchase', async ({ page }) => {
    await page.goto(testData.playgroundWebsite);
    // Add the same steps here
  });
});
