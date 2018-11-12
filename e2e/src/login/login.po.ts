import { t, Selector } from 'testcafe';
import { AngularSelector } from 'testcafe-angular-selectors';

export class LoginPageObject {
  constructor(
    public usernameInput = Selector('input[formcontrolname="username"]'),
    public passwordInput = Selector('input[formcontrolname="password"]'),
    public singInButton = Selector('button[type="submit"]')
  ) {}

  public async login() {
    return await t
      .typeText(this.usernameInput, 'admin')
      .typeText(this.passwordInput, 'secret')
      .click(this.singInButton);
  }

  async navigateTo() {
    return await t.navigateTo('login');
  }
}
