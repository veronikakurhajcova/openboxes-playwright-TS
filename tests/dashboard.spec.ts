import { test, expect } from '../fixtures';
import { ChooseLocationPage } from '../pages/ChooseLocationPage';
import { URLS } from '../test-data/urls';

test.describe('Dashboard tests', () => {
  test('[HP] - should land on choose location after login', async ({ authenticatedPage, page }) => {
    void authenticatedPage;

    const chooseLocationPage = new ChooseLocationPage(page);

    await chooseLocationPage.waitForPageToLoad();
    await expect(page).toHaveURL(URLS.LOCATION_PATTERN);

    await chooseLocationPage.chooseLocation('Test');
    await expect(page).toHaveURL(URLS.LOCATION_PATTERN);
  });
});