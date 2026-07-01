import {test as base} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
    authenticatedPage: LoginPage;
}

export const test = base.extend<MyFixtures>({
    authenticatedPage: async ({page}, use) => {
       const loginPage = new LoginPage(page);   
       await loginPage.open();
       await loginPage.login(
        process.env.EMAIL!,
        process.env.PASSWORD!
       );

       await use(loginPage);
    } 
})

export {expect} from '@playwright/test';

