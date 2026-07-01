import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AUTH_MESSAGES } from '../test-data/messages';
import { URLS } from '../test-data/urls';

const validUsername = process.env.EMAIL!;
const validPassword = process.env.PASSWORD!;
let loginPage: LoginPage;

 

test.describe('Login flow', () => {
    test.beforeEach( async({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
    });
   
  test('[HP] - login with valid credentials - should land on location selection', {tag: ['@smoke', '@regression'],}, async ({ page }) => {

    await loginPage.login(validUsername, validPassword);

    await expect(page).toHaveURL(URLS.LOCATION_PATTERN);
  });

  test('[NEG] - login with valid username and incorrect password - should show an error message and user remains on the login page ', {tag: ['@negative', '@regression'],}, async ({ page }) => {

    await loginPage.login(validUsername, `${validPassword}x`);

    await expect(page).toHaveURL(URLS.LOGIN_PATTERN);
    expect(await loginPage.hasErrorMessage(AUTH_MESSAGES.INVALID_PASSWORD)).toBeTruthy();
  });

  test('[NEG]- login with non-existent username and valid password - should show an error message and user remains on the login page', {tag: ['@negative', '@regression'],}, async ({ page }) => {

    await loginPage.login('does-not-exist@example.com', 'Password123!');

    await expect(page).toHaveURL(URLS.LOGIN_PATTERN);
    expect(await loginPage.hasErrorMessage(AUTH_MESSAGES.INVALID_USERNAME)).toBeTruthy();
  });

  test('[NEG] - login with invalid credentials  - should show an error message and user remains on the login page', {tag: ['@negative', '@regression'],},async ({ page }) => {

    await loginPage.login('bad-user', 'bad-pass');

    await expect(page).toHaveURL(URLS.LOGIN_PATTERN);
    expect(await loginPage.hasErrorMessage(AUTH_MESSAGES.INVALID_CREDENTIALS)).toBeTruthy();
  });

  test('[NEG]  - login with empty fields - should show an error message and user remain on the login page', {tag: ['@negative', '@regression'],}, async ({ page }) => {
    // Don't fill any fields, just click login
    await loginPage.clickLoginBtn();

    await expect(page).toHaveURL(URLS.LOGIN_PATTERN);
    expect(await loginPage.hasErrorMessage(AUTH_MESSAGES.ACCOUNT_UNDER_REVIEW)).toBeTruthy();

  });
});
