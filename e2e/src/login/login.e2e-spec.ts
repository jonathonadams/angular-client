import { ClientFunction } from 'testcafe'; // first import testcafe selectors
import { waitForAngular } from 'testcafe-angular-selectors';
import { LoginPageObject } from './login.po';
import { SITE_URL } from '../../config.e2e';

fixture(`Login Fixture`)
  .page(`${SITE_URL}/login`)
  .beforeEach(async t => {
    t.ctx.loginPage = new LoginPageObject();
    await waitForAngular();
  });

const getPageUrl = ClientFunction(() => window.location.href);
const localStorageSet = ClientFunction((key, val) => localStorage.setItem(key, val));
const localStorageGet = ClientFunction(key => localStorage.getItem(key));

test('should log a user in and redirect to the home page', async t => {
  const page: LoginPageObject = t.ctx.loginPage;

  await t.expect(await localStorageGet('access_token')).notOk();
  await page.login();

  await t.expect(localStorageGet('access_token')).ok();
  await t.expect(localStorageGet('access_token')).typeOf('string');
  await t.expect(getPageUrl()).contains('home');
  await t.expect(getPageUrl()).notContains('login');
});

test('should not authenticate a user with incorrect credentials', async t => {
  const page: LoginPageObject = t.ctx.loginPage;

  await t
    .typeText(page.usernameInput, 'some user')
    .typeText(page.passwordInput, 'and one')
    .click(page.singInButton)
    .expect(getPageUrl())
    .contains('login')
    .expect(getPageUrl())
    .notContains('home');
});

test('should redirect to home if allready signed in', async t => {
  const page: LoginPageObject = t.ctx.loginPage;
  await page.login();

  await page.navigateTo();

  await t.expect(getPageUrl()).notContains('login');
  await t.expect(getPageUrl()).contains('home');
});
