import { Locator, Page } from '@playwright/test';
export class commonPage {
    
readonly page: Page;
    readonly homeButtonHeader: Locator;
    readonly shopButtonHeader: Locator;
    readonly componentsButtonHeader: Locator;
    readonly aboutButtonHeader: Locator;
    readonly contactButtonHeader: Locator;

    readonly footerAccessories: Locator;
    readonly footerClothes: Locator;
    readonly footerElectronics: Locator;
    readonly footerHomeAppliances: Locator;
    readonly footerNewArrivals: Locator;
    readonly footerProfile: Locator;
    readonly footerOrders: Locator;
    readonly footerAddresses: Locator;
    readonly footerAccountDetails: Locator;
    readonly footerPaymentOptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeButtonHeader = page.locator('//div[@class="flex items-center justify-between h-full"]//li//a[text()="Home"]');
        this.shopButtonHeader = page.locator('//a[contains(text(),"Shop")]');
        this.componentsButtonHeader = page.locator('//div[@class="flex items-center justify-between h-full"]//li//a[text()="Components"]');
        this.aboutButtonHeader = page.locator('//div[@class="flex items-center justify-between h-full"]//li//a[text()="About"]');
       
        this.contactButtonHeader = page.locator('//div[@class="flex items-center justify-between h-full"]//li//a[text()="Contact"]');
            // Shop
        this.footerAccessories = page.locator('//li[text()="Accesories"]');
        this.footerClothes = page.locator('//li[text()="Clothes"]');
        this.footerElectronics = page.locator('//li[text()="Electronics"]');
        this.footerHomeAppliances = page.locator('//li[text()="Home appliances"]');
        this.footerNewArrivals = page.locator('//li[text()="New Arrivals"]');

        // Your account
        this.footerProfile = page.locator('//li[text()="Profile"]');
        this.footerOrders = page.locator('//li[text()="Orders"]');
        this.footerAddresses = page.locator('//li[text()="Addresses"]');
        this.footerAccountDetails = page.locator('//li[text()="Account Details"]');
        this.footerPaymentOptions = page.locator('//li[text()="Payment Options"]');

}
}