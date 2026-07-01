import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
  await page.goto('https://demo.openboxes.com/openboxes/auth/login');
    await page.getByRole('textbox', { name: 'email or username' }).fill(process.env.EMAIL!);
    await page.getByRole('textbox', { name: 'password' }).fill(process.env.PASSWORD!);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*chooseLocation/);
  });
});
