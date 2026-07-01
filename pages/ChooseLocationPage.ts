import { type Locator, type Page } from '@playwright/test';
import { URLS } from '../test-data/urls';

export class ChooseLocationPage {
  private readonly pageTitle: Locator;
  private readonly locationLinks: Locator;
  private readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.pageTitle = page.getByRole('heading', { name: /choose location/i });
    this.locationLinks = page.locator('a[href^="#organization-"]');
    this.logoutLink = page.getByRole('link', { name: /logout/i });
  }

  async open(): Promise<void> {
    await this.page.goto(URLS.DASHBOARD_LOCATION);
    await this.waitForPageToLoad();
  }

  async waitForPageToLoad(): Promise<void> {
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.locationLinks.first().waitFor({ state: 'visible' });
  }

  async chooseLocation(locationName: string): Promise<void> {
    const targetLink = this.locationLinks.filter({ hasText: locationName });
    await targetLink.first().waitFor({ state: 'visible' });
    await targetLink.first().click();
  }

  async getAvailableLocations(): Promise<string[]> {
    return this.locationLinks.allInnerTexts();
  }

  async isLogoutVisible(): Promise<boolean> {
    return this.logoutLink.isVisible();
  }
}
