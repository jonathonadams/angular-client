import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '@auth/auth.service';
import { Login, LoginRedirect } from '@auth/auth.actions';
import { AppState } from '@store/reducers';
import { LoginCredentials } from '@app/auth/auth.model';
// import { LoginCredentials } from '@features/user';

@Component({
  selector: 'client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  title = 'BRANDING TITLE';

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])
      ]
    });

    // Check user is logged in.
    if (this.checkUserIsLoggedIn()) {
      this.store.dispatch(new LoginRedirect());
    }
  }

  checkUserIsLoggedIn(): boolean {
    return this.auth.checkUserIsLoggedIn();
  }

  reset() {
    this.loginForm.reset({
      username: '',
      password: ''
    });
  }

  public onSubmit({ value, valid }: { value: LoginCredentials; valid: boolean }): void {
    console.log(value, valid);
    if (valid) {
      this.store.dispatch(new Login(value));
    }
  }
}
