import { type Locator, type Page, expect } from '@playwright/test';
import {URLS } from '../test-data/urls'

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessageContainer: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByRole('textbox', { name: /email or username/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.errorMessageContainer = page.locator('body');
  }

  /**
   * Navigate to the login page
   */
  async open():Promise<void> {
    await this.page.goto(URLS.LOGIN);
    await this.waitForPageToLoad();
  }

  /**
   * Wait for the login page to load and all form elements to be visible
   */
  async waitForPageToLoad():Promise<void>{
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Log in with the provided credentials
   * @param username - The username or email
   * @param password - The password
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickLoginBtn():Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Get the error message text from the page
   * @returns The error message text
   */
  async getErrorMessage(): Promise<string> {
    return this.errorMessageContainer.innerText();
  }

  /**
   * Check if an error message is visible
   * @param errorPattern - A regex pattern to match against the error message
   * @returns True if the error message matches the pattern
   */
  async hasErrorMessage(errorPattern: RegExp): Promise<boolean> {
    return errorPattern.test(await this.getErrorMessage());
  }

  /**
   * Get the current page URL
   * @returns The current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Check if the page URL matches a pattern
   * @param urlPattern - A regex pattern to match against the URL
   * @returns True if the URL matches the pattern
   */
  async hasUrlPattern(urlPattern: RegExp): Promise<boolean> {
    return urlPattern.test(this.page.url());
  }

  /**
   * Wait for the URL to match a pattern
   * @param urlPattern - A regex pattern to match against the URL
   */
  async waitForUrlPattern(urlPattern: RegExp) {
    await this.page.waitForURL(urlPattern);
  }
}
