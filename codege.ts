import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.openboxes.com/openboxes/auth/signup');
  await page.getByRole('textbox', { name: 'First name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last name' }).fill('Tester')
  await page.getByRole('textbox', { name: 'Email' }).fill('test.user@gmail.com');
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Heslo12345');
  await page.getByRole('textbox', { name: 'Confirm password' }).fill('Heslo12345');
  await page.getByRole('button', { name: 'Create a new account' }).dblclick();
});


//login
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.openboxes.com/openboxes/auth/login');
  await page.getByRole('textbox', { name: 'email or username' }).fill('test.user@gmail.com');
  await page.getByRole('textbox', { name: 'password' }).fill('Heslo12345');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('dashboard/chooseLocation');
});
